import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchPlacesPhotoByRef, fetchRecommendationImage } from "@/lib/services/image-service";
import { trackAPICall } from "@/lib/analytics/cost-tracking";
import type { Recommendation } from "@/lib/types";

// ─── Google Places setup ─────────────────────────────────────────────────────

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.priceLevel",
  "places.photos",
  "places.types",
  "places.editorialSummary",
  "places.regularOpeningHours",
].join(",");

const NOISE_TYPES = new Set([
  "point_of_interest",
  "establishment",
  "premise",
  "geocode",
  "lodging",
  "food",
]);

// ─── Request schema ───────────────────────────────────────────────────────────

const requestSchema = z.object({
  destination: z.string().min(2),
  // Kept for API compat — not used for Places query
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  travelers: z.number().int().min(1).optional(),
  preferences: z
    .object({
      budget: z.enum(["budget", "moderate", "luxury"]).optional(),
      travelStyle: z.array(z.string()).optional(),
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
    })
    .optional(),
});

// ─── Places API types ─────────────────────────────────────────────────────────

interface GooglePlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  location?: { latitude: number; longitude: number };
  priceLevel?: string;
  photos?: Array<{ name: string }>;
  types?: string[];
  editorialSummary?: { text: string };
  regularOpeningHours?: { weekdayDescriptions?: string[] };
}

interface GooglePlacesResponse {
  places?: GooglePlace[];
}

// ─── Category config ──────────────────────────────────────────────────────────

interface CategoryConfig {
  includedType: string;
  recCategory: Recommendation["category"];
  queryPrefix: string;
  defaultDuration: number;
  maxCount: number;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    includedType: "lodging",
    recCategory: "hotel",
    queryPrefix: "hotels",
    defaultDuration: 30,
    maxCount: 3,
  },
  {
    includedType: "tourist_attraction",
    recCategory: "attraction",
    queryPrefix: "tourist attractions",
    defaultDuration: 120,
    maxCount: 8,
  },
  {
    includedType: "restaurant",
    recCategory: "restaurant",
    queryPrefix: "restaurants",
    defaultDuration: 90,
    maxCount: 5,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function priceLevelToRange(level: string | undefined): 1 | 2 | 3 {
  if (!level || level === "PRICE_LEVEL_FREE" || level === "PRICE_LEVEL_INEXPENSIVE") return 1;
  if (level === "PRICE_LEVEL_MODERATE") return 2;
  return 3;
}

function typesToTags(types: string[] = []): string[] {
  return types
    .filter((t) => !NOISE_TYPES.has(t))
    .map((t) => t.replace(/_/g, " "))
    .slice(0, 5);
}

function openingHoursText(hours?: { weekdayDescriptions?: string[] }): string {
  if (!hours?.weekdayDescriptions?.length) return "Check Google Maps for hours";
  return hours.weekdayDescriptions.slice(0, 2).join(" · ");
}

// ─── Places fetch ─────────────────────────────────────────────────────────────

async function fetchCategory(
  config: CategoryConfig,
  destination: string,
  budget?: string
): Promise<GooglePlace[]> {
  const budgetHint = budget === "budget" ? "affordable " : budget === "luxury" ? "luxury " : "";
  const textQuery = `${budgetHint}${config.queryPrefix} in ${destination}`;

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY!,
      "X-Goog-FieldMask": FIELD_MASK,
    },
    body: JSON.stringify({
      textQuery,
      includedType: config.includedType,
      maxResultCount: config.maxCount,
      languageCode: "en",
      rankPreference: "RELEVANCE",
    }),
  });

  if (!res.ok) {
    const err = (await res.json()) as { error?: { message?: string } };
    throw new Error(err.error?.message ?? `Places API error ${res.status}`);
  }

  const data = (await res.json()) as GooglePlacesResponse;
  return data.places ?? [];
}

// ─── Image + place → Recommendation ──────────────────────────────────────────

interface EnrichedResult {
  recommendations: Recommendation[];
  partial: boolean;
}

async function placeToRecommendation(
  place: GooglePlace,
  config: CategoryConfig,
  destination: string,
  index: number
): Promise<Recommendation> {
  const name = place.displayName?.text ?? "Unknown";
  const photoRef = place.photos?.[0]?.name;

  let imageUrl: string;
  let imageSource: "places" | "unsplash" | "placeholder";
  let blurDataURL: string | undefined;

  if (photoRef) {
    const photoUri = await fetchPlacesPhotoByRef(photoRef);
    if (photoUri) {
      const fallback = await fetchRecommendationImage(name, destination, config.recCategory);
      imageUrl = photoUri;
      imageSource = "places";
      blurDataURL = fallback.blurDataURL;
    } else {
      const fallback = await fetchRecommendationImage(name, destination, config.recCategory);
      imageUrl = fallback.imageUrl;
      imageSource = fallback.imageSource;
      blurDataURL = fallback.blurDataURL;
    }
  } else {
    const fallback = await fetchRecommendationImage(name, destination, config.recCategory);
    imageUrl = fallback.imageUrl;
    imageSource = fallback.imageSource;
    blurDataURL = fallback.blurDataURL;
  }

  return {
    id: `${config.recCategory}-${place.id}-${index}`,
    name,
    description:
      place.editorialSummary?.text ?? `A highly-rated ${config.recCategory} in ${destination}.`,
    category: config.recCategory,
    estimatedDuration: config.defaultDuration,
    priceRange: priceLevelToRange(place.priceLevel),
    location: {
      address: place.formattedAddress ?? destination,
      coordinates: { lat: place.location?.latitude ?? 0, lng: place.location?.longitude ?? 0 },
    },
    openingHours: openingHoursText(place.regularOpeningHours),
    culturalNotes: place.editorialSummary?.text ?? "",
    imageUrl,
    imageSource,
    blurDataURL,
    tags: typesToTags(place.types),
  };
}

async function enrichAll(
  places: GooglePlace[],
  config: CategoryConfig,
  destination: string
): Promise<Recommendation[]> {
  const results = await Promise.allSettled(
    places.map((p, i) => placeToRecommendation(p, config, destination, i))
  );
  return results
    .filter((r): r is PromiseFulfilledResult<Recommendation> => r.status === "fulfilled")
    .map((r) => r.value);
}

// ─── TTL cache ────────────────────────────────────────────────────────────────

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
interface CacheEntry {
  result: EnrichedResult;
  expiresAt: number;
}
const resultCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<EnrichedResult>>();

function buildCacheKey(destination: string, budget?: string): string {
  return `${destination.toLowerCase().trim()}:${budget ?? "moderate"}`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

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

  if (!API_KEY) {
    return NextResponse.json({ error: "Google Maps API key is not configured." }, { status: 503 });
  }

  const { destination, preferences } = parsed.data;
  const budget = preferences?.budget;
  const cacheKey = buildCacheKey(destination, budget);

  // 1. TTL cache hit
  const cached = resultCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json({ ...cached.result, cached: true });
  }

  // 2. Coalesce concurrent identical requests
  const existing = inFlightRequests.get(cacheKey);
  if (existing) {
    try {
      return NextResponse.json(await existing);
    } catch {
      // fall through to fresh request
    }
  }

  const promise = (async (): Promise<EnrichedResult> => {
    try {
      const [rawHotels, rawAttractions, rawRestaurants] = await Promise.all(
        CATEGORY_CONFIGS.map((cfg) => fetchCategory(cfg, destination, budget))
      );
      const rawByCategory = [rawHotels, rawAttractions, rawRestaurants];
      const [hotels, attractions, restaurants] = await Promise.all(
        CATEGORY_CONFIGS.map((cfg, i) => enrichAll(rawByCategory[i], cfg, destination))
      );
      const recommendations = [...hotels, ...attractions, ...restaurants];
      const expected = CATEGORY_CONFIGS.reduce((s, c) => s + c.maxCount, 0);
      const result: EnrichedResult = {
        recommendations,
        partial: recommendations.length < expected,
      };
      resultCache.set(cacheKey, { result, expiresAt: Date.now() + CACHE_TTL_MS });
      return result;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, promise);

  try {
    const result = await promise;
    void trackAPICall("places");
    return NextResponse.json(result);
  } catch (error) {
    inFlightRequests.delete(cacheKey);
    const message = error instanceof Error ? error.message : "Failed to fetch recommendations";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
