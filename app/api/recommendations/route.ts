import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { retryWithBackoff } from "@/lib/utils/retry";
import { aiRateLimiter } from "@/lib/utils/rate-limiter";
import { geminiCircuitBreaker } from "@/lib/utils/circuit-breaker";
import { fetchRecommendationImage } from "@/lib/services/image-service";
import type { Recommendation } from "@/lib/types";

// ─── Zod schemas ────────────────────────────────────────────────────────────

const recommendationItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.enum(["attraction", "hotel", "restaurant"]),
  estimatedDuration: z.number().int().positive(),
  priceRange: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  location: z.object({
    address: z.string(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
  }),
  openingHours: z.string(),
  culturalNotes: z.string(),
  tags: z.array(z.string()),
});

const aiResponseSchema = z.object({
  recommendations: z.array(recommendationItemSchema),
});

const requestSchema = z.object({
  destination: z.string().min(2),
  startDate: z.string(),
  endDate: z.string(),
  travelers: z.number().int().min(1).default(1),
  preferences: z.object({
    travelStyle: z.array(z.string()),
    budget: z.enum(["budget", "moderate", "luxury"]),
    transportation: z.array(z.string()),
    groupDynamics: z.enum(["solo", "family", "pets"]),
    pace: z.number().min(0).max(100),
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
});

type RequestData = z.infer<typeof requestSchema>;

// ─── Request coalescing ──────────────────────────────────────────────────────

// Module-level map deduplicates concurrent identical requests within a server instance
const inFlightRequests = new Map<string, Promise<EnrichedResult>>();

function buildCoalescingKey(destination: string, preferences: RequestData["preferences"]): string {
  return `${destination}:${JSON.stringify(preferences)}`;
}

// ─── Gemini AI ───────────────────────────────────────────────────────────────

const ai = new GoogleGenAI({});

async function generateAIRecommendations(
  destination: string,
  startDate: string,
  endDate: string,
  preferences: RequestData["preferences"]
): Promise<z.infer<typeof aiResponseSchema>> {
  const prompt = `Generate travel recommendations for ${destination} from ${startDate} to ${endDate}.

User preferences:
- Travel style: ${preferences.travelStyle.join(", ")}
- Budget: ${preferences.budget}
- Group: ${preferences.groupDynamics}
- Transportation: ${preferences.transportation.join(", ")}
- Pace: ${preferences.pace}/100 (0=rushed, 100=leisurely)

Provide exactly: 8 attractions, 3 hotels, and 5 restaurants that best match these preferences.
Format as JSON with a "recommendations" array. Each item must have:
  name, description, category (attraction|hotel|restaurant), estimatedDuration (minutes as integer),
  priceRange (1|2|3), location (address string, coordinates {lat, lng}),
  openingHours, culturalNotes, tags (string array).

DO NOT include imageUrl — images are fetched separately.
Keep descriptions concise (1-2 sentences). Be specific and authentic.
Return only valid JSON, no markdown code fences.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" },
  });

  const text = response.text ?? "";
  const parsed: unknown = JSON.parse(text);
  return aiResponseSchema.parse(parsed);
}

// ─── Image enrichment ────────────────────────────────────────────────────────

interface EnrichedResult {
  recommendations: Recommendation[];
  partial: boolean;
}

async function enrichWithImages(
  rawItems: z.infer<typeof aiResponseSchema>["recommendations"],
  destination: string
): Promise<EnrichedResult> {
  const results = await Promise.allSettled(
    rawItems.map(async (item, index): Promise<Recommendation> => {
      const image = await fetchRecommendationImage(item.name, destination, item.category);
      return {
        ...item,
        id: `rec-${index}-${Date.now()}`,
        imageUrl: image.imageUrl,
        imageSource: image.imageSource,
        blurDataURL: image.blurDataURL,
      };
    })
  );

  const recommendations = results
    .filter((r): r is PromiseFulfilledResult<Recommendation> => r.status === "fulfilled")
    .map((r) => r.value);

  return { recommendations, partial: recommendations.length < rawItems.length };
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { destination, startDate, endDate, preferences } = parsed.data;
  const coalescingKey = buildCoalescingKey(destination, preferences);

  // Return cached in-flight response if one exists for the same request
  const existing = inFlightRequests.get(coalescingKey);
  if (existing) {
    try {
      const { recommendations, partial } = await existing;
      return NextResponse.json({ recommendations, partial });
    } catch {
      // The original request failed; fall through to retry
    }
  }

  const promise = (async (): Promise<EnrichedResult> => {
    try {
      await aiRateLimiter.throttle();
      const aiData = await geminiCircuitBreaker.execute(() =>
        retryWithBackoff(
          () =>
            generateAIRecommendations(destination, startDate, endDate, preferences),
          3,
          1000
        )
      );
      return enrichWithImages(aiData.recommendations, destination);
    } finally {
      inFlightRequests.delete(coalescingKey);
    }
  })();

  inFlightRequests.set(coalescingKey, promise);

  try {
    const { recommendations, partial } = await promise;
    return NextResponse.json({ recommendations, partial });
  } catch (error) {
    inFlightRequests.delete(coalescingKey);
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Circuit breaker is open") {
      return NextResponse.json(
        { error: "AI service temporarily unavailable. Please try again shortly." },
        { status: 503 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "AI returned unexpected data format" },
        { status: 502 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
