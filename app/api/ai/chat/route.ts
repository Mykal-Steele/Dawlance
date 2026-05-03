import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { streamChat, MODEL_CHAT, type ChatMessage } from "@/lib/utils/watsonx";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";

// ─── Validation schema ────────────────────────────────────────────────────────

const requestSchema = z.object({
  message: z.string().min(1).max(2000),
  context: z.object({
    currentStep: z.enum(["destination", "weather", "preferences", "discovery", "itinerary"]),
    itinerary: z.unknown().optional(),
    selectedRecommendations: z.array(z.unknown()).optional(),
    preferences: z.unknown().optional(),
    destination: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    travelers: z.number().optional(),
  }),
  previousInteractionId: z.string().optional(),
  conversationHistory: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .optional(),
});

// ─── System instruction builder ───────────────────────────────────────────────

function slimItinerary(itinerary: unknown): unknown {
  if (!itinerary || typeof itinerary !== "object") return itinerary;
  const itin = itinerary as Record<string, unknown>;
  const days = itin.days as Array<Record<string, unknown>> | undefined;
  if (!days) return itinerary;
  return {
    destination: itin.destination,
    startDate: itin.startDate,
    endDate: itin.endDate,
    summary: itin.summary,
    days: days.map((day) => ({
      date: day.date,
      summary: day.summary,
      activities: ((day.activities as Array<Record<string, unknown>>) ?? []).map((a) => {
        const rec = a.recommendation as Record<string, unknown> | undefined;
        const loc = rec?.location as Record<string, unknown> | undefined;
        return {
          id: a.id,
          time: a.time,
          duration: a.duration,
          type: a.type,
          name: rec?.name,
          address: (loc?.address as string | undefined) || undefined,
          coordinates: loc?.coordinates,
        };
      }),
    })),
  };
}

function buildSystemInstruction(context: z.infer<typeof requestSchema>["context"]): string {
  const itineraryStr = context.itinerary
    ? JSON.stringify(slimItinerary(context.itinerary))
    : "Not generated yet";
  const selectionsStr =
    context.selectedRecommendations && context.selectedRecommendations.length > 0
      ? JSON.stringify(context.selectedRecommendations)
      : "None selected";
  const prefsStr = context.preferences ? JSON.stringify(context.preferences) : "Not specified";
  const today = new Date().toISOString().split("T")[0];
  const tripDates =
    context.startDate && context.endDate ? `${context.startDate} to ${context.endDate}` : "not set";
  const travelers = context.travelers ? `${context.travelers} person(s)` : "not set";

  return `You are a well-travelled friend who knows ${context.destination ?? "the destination"} well and has been following along with this person's trip planning. You genuinely care about making their trip good.

You know their full situation:
- Today's date: ${today}
- Destination: ${context.destination ?? "not set yet"}
- Trip dates: ${tripDates}
- Travelers: ${travelers}
- Where they are in planning: ${context.currentStep}
- Their itinerary so far: ${itineraryStr}
- Places they've picked: ${selectionsStr}
- Their travel style and preferences: ${prefsStr}

How you talk:
You text like a friend — short, warm, natural. You never sound like an assistant or a chatbot. You don't use filler phrases like "Great!", "Sure!", "Of course!", "Absolutely!", or "I'd be happy to". You don't use bullet points for simple things, no markdown, no headers.

Match the user's energy and register. If they're casual and informal, match that. If they're more composed, be a bit more composed too. Never sound warmer or more enthusiastic than the person you're talking to.

When someone sends a casual greeting or small talk with no actual question — don't mirror the greeting back, and don't narrate your own inner state or thoughts. Instead, drop into something specific and real from their trip context, naturally, the way a friend would if they happened to know your plans. Keep it brief.

When someone asks a real question, answer it directly and concisely. Only go long if the question genuinely needs it.

Use the context you have. Don't ask generic questions that could apply to any trip — make it specific to them.

Never assume details that aren't explicitly in the context. If preferences say "pet-friendly" don't say "your dog" — you don't know what pet they have. If budget isn't set, don't assume cheap or expensive. Stick exactly to what's provided.

## Filling empty slots in the itinerary

The itinerary may have activities with type "empty" — these are unplanned time slots the user needs to fill. When the user asks you to fill a slot (e.g. "for tomorrow afternoon, I want to visit X", "fill my open slots", "add a museum for Day 3"), you MUST include a structured action in your response JSON so the app can update the plan automatically.

To fill a slot, include an action of type "fill_slot" in your actions array:
{
  "type": "fill_slot",
  "label": "Add <place name>",
  "payload": {
    "dayIndex": <0-based day number>,
    "slotId": "<id of the empty activity, e.g. empty-20260505-14>",
    "place": {
      "name": "<place name>",
      "address": "<full address>",
      "coordinates": { "lat": <number>, "lng": <number> },
      "type": "attraction" | "meal" | "rest",
      "duration": <minutes as number>,
      "culturalContext": "<optional cultural tip>",
      "attireSuggestion": "<optional attire>"
    }
  }
}

You can also use type "add_activity" with the same payload shape to append a new activity to a day (when there is no specific empty slot to replace).

CRITICAL: Only fill one slot per action object. If you need to fill multiple slots, include one action per slot.

CRITICAL: Never modify activities that are NOT empty unless the user explicitly asks to change them. Only touch the specific empty slot the user mentioned.

## Actions format

When you want to perform an action (fill a slot, add an activity, adjust a time), write your natural language reply first, then append a special block at the very end of your message, separated by a newline:

---ACTIONS---
[
  {
    "type": "fill_slot",
    "label": "Add <place name>",
    "payload": { ... }
  }
]

The content of the message before ---ACTIONS--- is what gets displayed to the user. The JSON array after it is parsed by the app and never shown. Do NOT include any markdown or other text after the JSON array.

Only append ---ACTIONS--- when you are actually taking an action. For regular chat, omit it entirely.`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<Response> {
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

  const { message, context, conversationHistory } = parsed.data;

  // Apply rate limiter before streaming
  await aiRateLimiter.throttle();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(data: Record<string, unknown>): void {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      try {
        const systemInstruction = buildSystemInstruction(context);

        // Build messages array: system + conversation history + current user message
        const messages: ChatMessage[] = [
          { role: "system", content: systemInstruction },
          ...(conversationHistory ?? []).map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user", content: message },
        ];

        const watsonxStream = await streamChat({
          messages,
          model: MODEL_CHAT,
          maxTokens: 700,
          temperature: 0.7,
        });

        const reader = watsonxStream.getReader();
        const dec = new TextDecoder();
        let buffer = "";
        let fullText = "";
        let streamCutoff = false; // stop sending deltas once ---ACTIONS--- is found

        // Parse SSE: split on \n\n (event boundaries per SSE spec and skill §6)
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += dec.decode(value, { stream: true });

          let idx: number;
          while ((idx = buffer.indexOf("\n\n")) >= 0) {
            const event = buffer.slice(0, idx).trim();
            buffer = buffer.slice(idx + 2);

            if (!event.startsWith("data:")) continue;
            const raw = event.slice(5).trim();
            if (raw === "[DONE]") break;

            let chunk: unknown;
            try {
              chunk = JSON.parse(raw);
            } catch {
              continue;
            }

            const choices = (
              chunk as { choices?: Array<{ delta?: { content?: string }; finish_reason?: string }> }
            ).choices;
            if (!Array.isArray(choices) || choices.length === 0) continue;

            const delta = choices[0].delta?.content;
            if (delta) {
              fullText += delta;
              // Stop streaming to client once ---ACTIONS--- marker is detected
              if (!streamCutoff) {
                if (/\n?---ACTIONS---/.test(fullText)) {
                  streamCutoff = true;
                } else {
                  send({ type: "delta", text: delta });
                }
              }
            }
          }
        }

        // Parse and strip ---ACTIONS--- block (flexible: with or without leading newline)
        const markerRe = /\n?---ACTIONS---\s*/;
        const markerMatch = markerRe.exec(fullText);
        let cleanText: string | undefined;
        let parsedActions: unknown[] | undefined;

        if (markerMatch) {
          cleanText = fullText.slice(0, markerMatch.index).trim();
          const actionsJson = fullText.slice(markerMatch.index + markerMatch[0].length).trim();
          try {
            const maybeActions = JSON.parse(actionsJson);
            if (Array.isArray(maybeActions)) parsedActions = maybeActions;
          } catch {
            // Malformed JSON — ignore
          }
        }

        // Fallback: synthesize a message when cleanText is empty but actions exist
        if (markerMatch && !cleanText && parsedActions?.length) {
          const first = parsedActions[0] as {
            type?: string;
            payload?: { place?: { name?: string } };
          };
          const placeName = first?.payload?.place?.name;
          if (first?.type === "fill_slot" && placeName) {
            cleanText = `Added ${placeName} to your plan.`;
          } else if (first?.type === "add_activity" && placeName) {
            cleanText = `Added ${placeName} to your itinerary.`;
          } else {
            cleanText = "Done! I've updated your plan.";
          }
        }

        send({
          type: "done",
          ...(cleanText !== undefined ? { cleanText } : {}),
          ...(parsedActions !== undefined ? { actions: parsedActions } : {}),
        });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "AI service error";
        console.error("[/api/ai/chat] Error:", errMsg);
        send({
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
