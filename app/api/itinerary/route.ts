import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chatComplete, MODEL_STRUCTURED } from "@/lib/utils/watsonx";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";
import { trackAPICall } from "@/lib/analytics/cost-tracking";
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

  // Compact list for the prompt — bracket notation makes it harder for the model to confuse
  // the ID with the name
  const recIndex = selectedRecommendations
    .filter((r): r is RawRec => typeof r === "object" && r !== null)
    .map((r) => {
      const loc = r.location as Record<string, unknown> | undefined;
      const coords = loc?.coordinates as Record<string, unknown> | undefined;
      return `[${r.id}] ${r.name} | ${r.category} | ${r.estimatedDuration}min | lat=${coords?.lat ?? 0},lng=${coords?.lng ?? 0} | ${r.openingHours ?? ""}`;
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
  // Allow enough tokens for full JSON output. ~500 tokens per day is safe for Granite.
  const maxOutputTokens = Math.min(3000, Math.max(1500, numDays * 500));

  const prompt = `Plan a trip to ${destination} (${startDate} to ${endDate}) for ${travelers} person(s).

Available places — use the ID inside brackets as recId, never the place name:
${recIndex}

Prefs: style=${preferences.travelStyle?.join(",") ?? "general"}, budget=${preferences.budget ?? "moderate"}, transport=${transportMode}, group=${preferences.groupDynamics ?? "solo"}, pace=${pace}, breakfast=${preferences.mealTimes?.breakfast ?? "08:00"}, lunch=${preferences.mealTimes?.lunch ?? "12:00"}, dinner=${preferences.mealTimes?.dinner ?? "19:00"}, diet=${preferences.dietaryRestrictions?.join(",") ?? "none"}

RULES:
1. CRITICAL: The recId field MUST be copied EXACTLY from inside the brackets, e.g. "attraction-abc-0". NEVER use a place name as recId.
2. Every recId must appear AT MOST ONCE across the ENTIRE trip.
3. You have ${selectedRecommendations.filter((r): r is RawRec => typeof r === "object" && r !== null && (r as RawRec).category === "restaurant").length} restaurant(s). Each may be used AT MOST ONCE. Spread across days. If no unused restaurant is available for a meal slot, use recId="empty".
4. Restaurants go at meal times only (breakfast ~08:00, lunch ~12:00, dinner ~19:00).
5. If no place fits a slot, use recId="empty". Never invent IDs.
6. duration must be a plain integer (minutes), not a string like "30min".
7. ${pace === "relaxed" ? "Include mid-afternoon rest." : pace === "fast" ? "Back-to-back, minimal gaps." : "Balance activity with free time."}
8. Keep all summaries under 10 words.

Output ONLY this JSON (no markdown, no extra fields):
{"id":"trip-1","destination":"${destination}","startDate":"${startDate}","endDate":"${endDate}","summary":"Brief summary","days":[{"date":"YYYY-MM-DD","summary":"Day summary","activities":[{"id":"a1","time":"HH:MM","duration":NUMBER,"type":"attraction|meal|rest|travel|empty","recId":"EXACT_BRACKET_ID"}]}],"metadata":{"createdAt":"${new Date().toISOString()}","updatedAt":"${new Date().toISOString()}","version":1}}`;

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
    duration: number | string; // model sometimes outputs "30min" — coerced below
    type: string;
    recId: string;
    culturalContext?: string;
    attireSuggestion?: string;
    travelTime?: number;
    notes?: string;
  }
  function expandActivity(act: SlimActivity): Record<string, unknown> {
    // Coerce string durations like "30min" / "1h" / "120" to a plain number
    let durationMinutes: number;
    if (typeof act.duration === "number") {
      durationMinutes = act.duration;
    } else {
      const raw = String(act.duration);
      const minMatch = raw.match(/(\d+)\s*min/i);
      const hrMatch = raw.match(/(\d+)\s*h(?:our)?/i);
      if (minMatch) durationMinutes = parseInt(minMatch[1]!, 10);
      else if (hrMatch) durationMinutes = parseInt(hrMatch[1]!, 10) * 60;
      else durationMinutes = parseInt(raw, 10) || 60;
    }
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
        estimatedDuration: durationMinutes,
        priceRange: 1,
        location: { address: "", coordinates: { lat: 0, lng: 0 } },
        openingHours: "",
        culturalNotes: "",
        imageUrl: "",
        tags: [],
      };
    }
    return { ...rest, duration: durationMinutes, recommendation: rec };
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
      timeLimitMs: 90_000,
    });

    // Strip markdown fences in case the model adds them despite instructions
    const stripped = responseText
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/, "")
      .trim();

    // Robust JSON extraction: find the outermost {...} object so trailing text doesn't break parse
    let cleaned = stripped;
    const firstBrace = stripped.indexOf("{");
    if (firstBrace !== -1) {
      let depth = 0;
      let lastClose = -1;
      for (let i = firstBrace; i < stripped.length; i++) {
        if (stripped[i] === "{") depth++;
        else if (stripped[i] === "}") {
          depth--;
          if (depth === 0) { lastClose = i; break; }
        }
      }
      if (lastClose !== -1) cleaned = stripped.slice(firstBrace, lastClose + 1);
    }

    let slim: { days?: Array<{ date?: string; activities?: SlimActivity[] }> } & Record<
      string,
      unknown
    >;
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

    // Track used recIds across ALL days so duplicate recIds from the AI are collapsed to empty
    const usedRecIds = new Set<string>();

    const itinerary: Itinerary = {
      ...(slim as Omit<Itinerary, "days">),
      days: (slim.days ?? []).map((day) => {
        const expandedActivities = (day.activities ?? []).map((act, actIdx) => {
          const isSpecial =
            act.recId === "empty" ||
            act.recId.startsWith("hotel-") ||
            act.recId.startsWith("empty");
          // If AI reused a recId already seen, collapse to empty
          const dedupedAct =
            !isSpecial && usedRecIds.has(act.recId) ? { ...act, recId: "empty" } : act;
          if (!isSpecial) usedRecIds.add(act.recId);
          return {
            ...expandActivity(dedupedAct),
            id: `${day.date ?? "d"}-act-${actIdx}`,
          };
        }) as unknown as Itinerary["days"][number]["activities"];

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
        } as Itinerary["days"][number];
      }),
    };

    void trackAPICall("watsonx");
    return NextResponse.json({ itinerary });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/itinerary] Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Made with Bob
