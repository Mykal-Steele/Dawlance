import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chatComplete, MODEL_STRUCTURED } from "@/lib/utils/watsonx";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";
import { geminiCircuitBreaker } from "@/lib/utils/circuit-breaker";
import { retryWithBackoff } from "@/lib/utils/retry";
import type { Itinerary, Activity } from "@/lib/types";

// ─── Request schema ───────────────────────────────────────────────────────────

const activityChangesSchema = z.object({
  time: z.string().optional(),
  duration: z.number().optional(),
  notes: z.string().optional(),
  culturalContext: z.string().optional(),
  attireSuggestion: z.string().optional(),
  type: z.enum(["attraction", "meal", "rest", "travel"]).optional(),
});

const requestSchema = z.object({
  currentItinerary: z.unknown(),
  edit: z.object({
    dayIndex: z.number().int().min(0),
    activityIndex: z.number().int().min(0),
    changes: activityChangesSchema,
    editType: z.enum(["notes", "time_shift", "structural"]).optional(),
  }),
});

// ─── Tiered recalculation helpers ─────────────────────────────────────────────

type EditType = "notes" | "time_shift" | "structural";

function classifyEdit(changes: z.infer<typeof activityChangesSchema>): EditType {
  const keys = Object.keys(changes) as Array<keyof typeof changes>;
  const hasStructural = keys.some((k) => k === "type" || k === "duration");
  const hasTimeShift = keys.includes("time") && !hasStructural;
  const isNotesOnly = keys.every(
    (k) => k === "notes" || k === "culturalContext" || k === "attireSuggestion"
  );

  if (isNotesOnly) return "notes";
  if (hasTimeShift && !hasStructural) {
    // Check if time shift is within ±30 minutes
    return "time_shift";
  }
  return "structural";
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

function minutesToTime(mins: number): string {
  const totalMins = ((mins % 1440) + 1440) % 1440; // wrap 24h
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Local time-adjustment algorithm for small time shifts */
function applyTimeShift(
  itinerary: Itinerary,
  dayIndex: number,
  activityIndex: number,
  newTime: string
): { itinerary: Itinerary; changedDays: number[] } {
  const newDays = itinerary.days.map((day, dIdx) => {
    if (dIdx !== dayIndex) return day;

    const acts = day.activities.map((act, aIdx) => {
      if (aIdx === activityIndex) {
        return { ...act, time: newTime };
      }
      // Shift subsequent activities proportionally
      if (aIdx > activityIndex) {
        const prevNewTime = parseTimeToMinutes(
          aIdx === activityIndex + 1 ? newTime : (day.activities[aIdx - 1]?.time ?? "09:00")
        );
        const prevOldTime = parseTimeToMinutes(day.activities[aIdx - 1]?.time ?? "09:00");
        const delta = prevNewTime - prevOldTime;
        const shiftedMins = parseTimeToMinutes(act.time) + delta;
        return { ...act, time: minutesToTime(shiftedMins) };
      }
      return act;
    });

    return { ...day, activities: acts };
  });

  return {
    itinerary: {
      ...itinerary,
      days: newDays,
      metadata: { ...itinerary.metadata, updatedAt: new Date().toISOString() },
    },
    changedDays: [dayIndex],
  };
}

/** Apply notes/cosmetic changes without any API call */
function applyLocalEdit(
  itinerary: Itinerary,
  dayIndex: number,
  activityIndex: number,
  changes: Partial<Activity>
): { itinerary: Itinerary; changedDays: number[] } {
  const newDays = itinerary.days.map((day, dIdx) => {
    if (dIdx !== dayIndex) return day;
    const acts = day.activities.map((act, aIdx) => {
      if (aIdx !== activityIndex) return act;
      return { ...act, ...changes };
    });
    return { ...day, activities: acts };
  });

  return {
    itinerary: {
      ...itinerary,
      days: newDays,
      metadata: { ...itinerary.metadata, updatedAt: new Date().toISOString() },
    },
    changedDays: [dayIndex],
  };
}

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

  const { currentItinerary, edit } = parsed.data;
  const itinerary = currentItinerary as Itinerary;
  const { dayIndex, activityIndex, changes } = edit;
  const typedChanges = changes as Partial<Activity>;

  // Determine edit tier
  const editType = edit.editType ?? classifyEdit(changes);

  // ── Tier 1: Notes/cosmetic only — no API call ──────────────────────────────
  if (editType === "notes") {
    const result = applyLocalEdit(itinerary, dayIndex, activityIndex, typedChanges);
    return NextResponse.json(result);
  }

  // ── Tier 2: Small time shift ≤ ±30 min — local algorithm ──────────────────
  if (editType === "time_shift" && changes.time) {
    const day = itinerary.days[dayIndex];
    const originalActivity = day?.activities[activityIndex];
    if (!originalActivity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 400 });
    }

    const originalMins = parseTimeToMinutes(originalActivity.time);
    const newMins = parseTimeToMinutes(changes.time);
    const delta = Math.abs(newMins - originalMins);

    if (delta <= 30) {
      // Apply local algorithm
      const result = applyTimeShift(itinerary, dayIndex, activityIndex, changes.time);
      return NextResponse.json(result);
    }
    // Fall through to full AI recalculation for larger shifts
  }

  // ── Tier 3: Structural change — full AI recalculation ─────────────────────
  const day = itinerary.days[dayIndex];
  const activity = day?.activities[activityIndex];

  // Strip blurDataURL from all recommendations to avoid bloating the prompt
  type RawRec = Record<string, unknown>;
  function slimItinerary(it: Itinerary): unknown {
    return {
      ...it,
      days: it.days.map((d) => ({
        ...d,
        activities: d.activities.map((a) => ({
          ...a,
          recommendation: (() => {
            const {
              blurDataURL: _b,
              imageUrl: _i,
              imageSource: _s,
              ...rest
            } = a.recommendation as unknown as RawRec;
            return rest;
          })(),
        })),
      })),
    };
  }

  const prompt = `Recalculate this travel itinerary after a user edit.

Current itinerary:
${JSON.stringify(slimItinerary(itinerary), null, 2)}

User edit — Day ${dayIndex + 1}, Activity "${activity?.recommendation?.name ?? activityIndex + 1}":
${JSON.stringify(changes, null, 2)}

Requirements:
1. Apply the edit to the specified activity
2. Adjust subsequent activities on the same day to maintain realistic timing
3. Ensure travel times between locations are realistic
4. Keep all other days intact unless a timing cascade forces changes
5. Preserve all cultural context and attire suggestions
6. Return changedDays as an array of 0-based day indices that were modified

Return a JSON object:
{
  "itinerary": { /* full updated Itinerary object with same structure */ },
  "changedDays": [0, 1]
}

Return ONLY valid JSON with no markdown formatting.`;

  try {
    await aiRateLimiter.throttle();

    const responseText = await geminiCircuitBreaker.execute(() =>
      retryWithBackoff(
        () =>
          chatComplete({
            messages: [
              {
                role: "system",
                content:
                  "You are a travel planning assistant. You always respond with valid JSON only, no markdown, no explanations.",
              },
              { role: "user", content: prompt },
            ],
            model: MODEL_STRUCTURED,
            maxTokens: 4096,
            temperature: 0.3,
            jsonMode: true,
            timeLimitMs: 60_000,
          }),
        1,
        500
      )
    );

    const cleaned = responseText.trim();

    let result: { itinerary: Itinerary; changedDays: number[] };
    try {
      result = JSON.parse(cleaned) as typeof result;
    } catch {
      console.error(
        "[/api/itinerary/recalculate] Failed to parse AI response:",
        cleaned.slice(0, 500)
      );
      return NextResponse.json(
        { error: "Failed to parse AI response", details: cleaned.slice(0, 300) },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[/api/itinerary/recalculate] Error:", message);
    if (message === "Circuit breaker is open") {
      return NextResponse.json(
        { error: "AI service temporarily unavailable — please try again in a moment." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Made with Bob
