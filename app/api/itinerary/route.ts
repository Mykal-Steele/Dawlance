import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chatComplete, MODEL_STRUCTURED } from "@/lib/utils/watsonx";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";
import type { Itinerary } from "@/lib/types";

// ─── Request schema ───────────────────────────────────────────────────────────

const requestSchema = z.object({
  destination: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  travelers: z.number().int().min(1).default(1),
  preferences: z.object({
    travelStyle: z.array(z.string()).optional(),
    budget: z.enum(["budget", "moderate", "luxury"]).optional(),
    transportation: z.array(z.string()).optional(),
    groupDynamics: z.string().optional(),
    pace: z.number().optional(),
    mealTimes: z
      .object({
        breakfast: z.string().optional(),
        lunch: z.string().optional(),
        dinner: z.string().optional(),
      })
      .optional(),
    dietaryRestrictions: z.array(z.string()).optional(),
    accessibilityNeeds: z.array(z.string()).optional(),
  }),
  selectedRecommendations: z.array(z.unknown()),
});

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { destination, startDate, endDate, travelers, preferences, selectedRecommendations } =
    parsed.data;

  // Build lookup map: id → full rec (used to expand slim model output back to full objects)
  type RawRec = Record<string, unknown>;
  const recMap = new Map<string, RawRec>();
  for (const rec of selectedRecommendations) {
    if (typeof rec === "object" && rec !== null) {
      const r = rec as RawRec;
      if (typeof r.id === "string") recMap.set(r.id, r);
    }
  }

  // Compact list for the prompt — one line per place to minimise input tokens
  const recIndex = selectedRecommendations
    .filter((r): r is RawRec => typeof r === "object" && r !== null)
    .map((r) => {
      const loc = r.location as Record<string, unknown> | undefined;
      const coords = loc?.coordinates as Record<string, unknown> | undefined;
      return `${r.id}|${r.name}|${r.category}|${r.estimatedDuration}min|${coords?.lat ?? 0},${coords?.lng ?? 0}|${r.openingHours ?? ""}`;
    })
    .join("\n");

  const transportMode = preferences.transportation?.join(", ") ?? "any";
  const pace =
    preferences.pace !== undefined
      ? preferences.pace < 33
        ? "relaxed"
        : preferences.pace < 66
          ? "balanced"
          : "fast"
      : "balanced";

  const numDays = Math.max(
    1,
    Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
    ) + 1
  );
  // granite-3-8b generates ~30 tok/sec; vllm deadline is ~90s → cap at 1500 tokens (~50s)
  const maxOutputTokens = Math.min(1500, Math.max(800, numDays * 6 * 45));

  const prompt = `Plan a trip to ${destination} (${startDate} to ${endDate}) for ${travelers} person(s).

Places (id|name|category|duration|lat,lng|hours):
${recIndex}

Prefs: style=${preferences.travelStyle?.join(",") ?? "general"}, budget=${preferences.budget ?? "moderate"}, transport=${transportMode}, group=${preferences.groupDynamics ?? "solo"}, pace=${pace}, breakfast=${preferences.mealTimes?.breakfast ?? "08:00"}, lunch=${preferences.mealTimes?.lunch ?? "12:00"}, dinner=${preferences.mealTimes?.dinner ?? "19:00"}, diet=${preferences.dietaryRestrictions?.join(",") ?? "none"}

RULES:
1. Use each place id exactly once across all days. Never invent new places.
2. Restaurants go at meal times only.
3. If no place fits a slot, use recId="empty".
4. ${pace === "relaxed" ? "Include mid-afternoon rest." : pace === "fast" ? "Back-to-back, minimal gaps." : "Balance activity with free time."}
5. Keep all summaries under 10 words.

Output ONLY this JSON (no markdown, no extra fields):
{"id":"trip-1","destination":"${destination}","startDate":"${startDate}","endDate":"${endDate}","summary":"Brief summary","days":[{"date":"YYYY-MM-DD","summary":"Day summary","activities":[{"id":"a1","time":"HH:MM","duration":NUMBER,"type":"attraction|meal|rest|travel|empty","recId":"PLACE_ID"}]}],"metadata":{"createdAt":"${new Date().toISOString()}","updatedAt":"${new Date().toISOString()}","version":1}}`;

  // ── Synthetic full recommendation objects for special recIds ─────────────────
  function makeHotelRec(name: string, actId: string): RawRec {
    return {
      id: actId,
      name,
      description: "",
      category: "travel",
      estimatedDuration: 0,
      priceRange: 0,
      location: { address: "Hotel", coordinates: { lat: 0, lng: 0 } },
      openingHours: "",
      culturalNotes: "",
      imageUrl: "",
      tags: [],
    };
  }
  function makeEmptyRec(): RawRec {
    return {
      id: "empty",
      name: "Free time",
      description: "Open slot — ask the AI assistant for suggestions.",
      category: "attraction",
      estimatedDuration: 120,
      priceRange: 1,
      location: { address: "", coordinates: { lat: 0, lng: 0 } },
      openingHours: "",
      culturalNotes: "",
      imageUrl: "",
      tags: [],
    };
  }

  // ── Expand slim activity (recId) → full activity (recommendation) ────────────
  interface SlimActivity {
    id: string;
    time: string;
    duration: number;
    type: string;
    recId: string;
    culturalContext?: string;
    attireSuggestion?: string;
    travelTime?: number;
    notes?: string;
  }
  function expandActivity(act: SlimActivity): Record<string, unknown> {
    const { recId, ...rest } = act;
    let rec: RawRec;
    if (recId === "hotel-depart" || recId.startsWith("hotel-depart")) {
      rec = makeHotelRec("Depart Hotel", act.id);
    } else if (recId === "hotel-return" || recId.startsWith("hotel-return")) {
      rec = makeHotelRec("Return to Hotel", act.id);
    } else if (recId === "empty" || recId.startsWith("empty")) {
      rec = makeEmptyRec();
    } else {
      rec = recMap.get(recId) ?? {
        id: recId,
        name: recId,
        category: "attraction",
        estimatedDuration: act.duration,
        priceRange: 1,
        location: { address: "", coordinates: { lat: 0, lng: 0 } },
        openingHours: "",
        culturalNotes: "",
        imageUrl: "",
        tags: [],
      };
    }
    return { ...rest, recommendation: rec };
  }

  // ── Time helpers ─────────────────────────────────────────────────────────────
  function addMinutes(time: string, minutes: number): string {
    const [h, m] = time.split(":").map(Number);
    const total = (h ?? 0) * 60 + (m ?? 0) + minutes;
    const hh = Math.min(23, Math.floor(total / 60));
    const mm = total % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
  }

  try {
    await aiRateLimiter.throttle();

    const responseText = await chatComplete({
      messages: [
        {
          role: "system",
          content:
            "You are a travel planning assistant. You always respond with valid JSON only, no markdown, no explanations.",
        },
        { role: "user", content: prompt },
      ],
      model: MODEL_STRUCTURED,
      maxTokens: maxOutputTokens,
      temperature: 0.3,
      jsonMode: true,
      timeLimitMs: 60_000,
    });

    // Strip markdown fences in case the model adds them despite instructions
    const cleaned = responseText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    let slim: { days?: Array<{ activities?: SlimActivity[] }> } & Record<string, unknown>;
    try {
      slim = JSON.parse(cleaned) as typeof slim;
    } catch {
      console.error("[/api/itinerary] Failed to parse AI response:", cleaned.slice(0, 500));
      return NextResponse.json(
        { error: "Failed to parse AI response", details: cleaned.slice(0, 300) },
        { status: 502 }
      );
    }

    // Expand recId → full recommendation for each activity, then inject hotel bookends
    const hotelRec = [...recMap.values()].find((r) => r.category === "hotel");
    const hotelCoords = ((hotelRec?.location as Record<string, unknown> | undefined)
      ?.coordinates as Record<string, unknown> | undefined) ?? { lat: 0, lng: 0 };
    const hotelAddress =
      ((hotelRec?.location as Record<string, unknown> | undefined)?.address as string) ??
      "Your Hotel";

    function makeHotelActivity(
      type: "depart" | "return",
      date: string,
      time: string,
      travelTime: number
    ): Record<string, unknown> {
      const name = type === "depart" ? "Depart Hotel" : "Return to Hotel";
      const desc = type === "depart" ? "Head out for the day" : "Head back for the night";
      return {
        id: `hotel-${type}-${date}`,
        time,
        duration: 0,
        type: "travel",
        recommendation: {
          id: `hotel-${type}`,
          name,
          description: desc,
          category: "travel",
          estimatedDuration: 0,
          priceRange: 0,
          location: { address: hotelAddress, coordinates: hotelCoords },
          openingHours: "",
          culturalNotes: "",
          imageUrl: "",
          tags: [],
        },
        culturalContext: "",
        attireSuggestion: "",
        travelTime,
        notes: "",
      };
    }

    const itinerary: Itinerary = {
      ...(slim as Omit<Itinerary, "days">),
      days: (slim.days ?? []).map((day) => {
        const expandedActivities = (day.activities ?? []).map((act) =>
          expandActivity(act)
        ) as Itinerary["days"][number]["activities"];

        // Strip any model-generated hotel bookends — we'll inject our own
        const stripped = expandedActivities.filter((a) => {
          const name = (a.recommendation?.name ?? "").toLowerCase();
          return !(
            a.type === "travel" &&
            (name.includes("depart hotel") || name.includes("return to hotel"))
          );
        });

        const firstTime = stripped[0]?.time ?? "09:00";
        const lastTime = stripped[stripped.length - 1]?.time ?? "20:00";

        return {
          ...day,
          activities: [
            makeHotelActivity("depart", day.date as string, "08:00", 15),
            ...stripped,
            makeHotelActivity(
              "return",
              day.date as string,
              addMinutes(
                lastTime,
                (stripped[stripped.length - 1]?.duration as number | undefined) ?? 0
              ),
              15
            ),
          ] as Itinerary["days"][number]["activities"],
        };
      }),
    };

    return NextResponse.json({ itinerary });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/itinerary] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Made with Bob
