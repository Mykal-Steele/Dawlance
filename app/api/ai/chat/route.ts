import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI, type Interactions } from "@google/genai";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";
import { geminiCircuitBreaker } from "@/lib/utils/circuit-breaker";

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
});

// ─── System instruction builder ───────────────────────────────────────────────

function buildSystemInstruction(context: z.infer<typeof requestSchema>["context"]): string {
  const itineraryStr = context.itinerary ? JSON.stringify(context.itinerary) : "Not generated yet";
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

Never assume details that aren't explicitly in the context. If preferences say "pet-friendly" don't say "your dog" — you don't know what pet they have. If budget isn't set, don't assume cheap or expensive. Stick exactly to what's provided.`;
}

// ─── Gemini client ────────────────────────────────────────────────────────────

const ai = new GoogleGenAI({});

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

  const { message, context, previousInteractionId } = parsed.data;

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

        await geminiCircuitBreaker.execute(async () => {
          // Build streaming params inline so TypeScript picks the streaming overload
          const createParams = {
            model: "gemini-3-flash-preview" as const,
            input: message,
            stream: true as const,
            system_instruction: systemInstruction,
            ...(previousInteractionId ? { previous_interaction_id: previousInteractionId } : {}),
          };

          const geminiStream = (await ai.interactions.create(
            createParams
          )) as unknown as AsyncIterable<Interactions.InteractionSSEEvent>;

          let interactionId = "";

          for await (const chunk of geminiStream) {
            if (
              chunk.event_type === "content.delta" &&
              chunk.delta?.type === "text" &&
              "text" in chunk.delta
            ) {
              send({ type: "delta", text: (chunk.delta as unknown as { text: string }).text });
            } else if (chunk.event_type === "interaction.complete") {
              interactionId = chunk.interaction?.id ?? "";
            }
          }

          send({ type: "done", interactionId });
        });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "AI service error";
        const isCircuitOpen = errMsg === "Circuit breaker is open";
        send({
          type: "error",
          message: isCircuitOpen
            ? "The AI assistant is temporarily unavailable. Please try again in a moment."
            : "Something went wrong. Please try again.",
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
