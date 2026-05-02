import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const querySchema = z.object({
  q: z.string().min(1).max(100),
});

interface AutocompleteSuggestion {
  placePrediction?: {
    placeId?: string;
    text?: { text?: string };
    structuredFormat?: {
      mainText?: { text?: string };
      secondaryText?: { text?: string };
    };
  };
}

interface AutocompleteResponse {
  suggestions?: AutocompleteSuggestion[];
}

export interface PlaceSuggestion {
  label: string;
  placeId: string;
  secondary: string;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const q = request.nextUrl.searchParams.get("q");
  const parsed = querySchema.safeParse({ q });

  if (!parsed.success) {
    return NextResponse.json({ suggestions: [] });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "Google Maps API key is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
      },
      body: JSON.stringify({
        input: parsed.data.q,
        // Restrict to cities, regions and countries — prevents free-text typos
        includedPrimaryTypes: ["locality", "administrative_area_level_1", "country"],
        languageCode: "en",
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const data = (await res.json()) as AutocompleteResponse;

    const suggestions: PlaceSuggestion[] = (data.suggestions ?? [])
      .map((s) => ({
        label:
          s.placePrediction?.structuredFormat?.mainText?.text ??
          s.placePrediction?.text?.text ??
          "",
        placeId: s.placePrediction?.placeId ?? "",
        secondary: s.placePrediction?.structuredFormat?.secondaryText?.text ?? "",
      }))
      .filter((s) => s.label && s.placeId);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
