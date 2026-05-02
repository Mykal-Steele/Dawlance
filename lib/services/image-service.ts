const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export interface ImageResult {
  imageUrl: string;
  imageSource: "places" | "unsplash" | "placeholder";
  blurDataURL: string;
}

type RecommendationCategory = "attraction" | "hotel" | "restaurant";

function generateBlurDataURL(category: RecommendationCategory): string {
  const gradients: Record<RecommendationCategory, [string, string]> = {
    attraction: ["#2A7BFF", "#6DD3B0"],
    hotel: ["#6DD3B0", "#2A7BFF"],
    restaurant: ["#FF8C42", "#FFB347"],
  };
  const [from, to] = gradients[category];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${from}"/><stop offset="100%" style="stop-color:${to}"/></linearGradient></defs><rect width="8" height="8" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

async function fetchPlacesImage(name: string, destination: string): Promise<string | null> {
  if (!GOOGLE_MAPS_API_KEY) return null;

  try {
    const searchRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "places.photos",
      },
      body: JSON.stringify({ textQuery: `${name}, ${destination}`, languageCode: "en" }),
    });

    if (!searchRes.ok) return null;

    const data = (await searchRes.json()) as {
      places?: Array<{ photos?: Array<{ name: string }> }>;
    };

    const photoName = data.places?.[0]?.photos?.[0]?.name;
    if (!photoName) return null;

    const photoRes = await fetch(
      `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=800&skipHttpRedirect=true&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (!photoRes.ok) return null;
    const photoData = (await photoRes.json()) as { photoUri?: string };
    return photoData.photoUri ?? null;
  } catch {
    return null;
  }
}

async function fetchUnsplashImage(query: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } }
    );

    if (!res.ok) return null;
    const data = (await res.json()) as { results: Array<{ urls: { regular: string } }> };
    return data.results[0]?.urls.regular ?? null;
  } catch {
    return null;
  }
}

export async function fetchRecommendationImage(
  name: string,
  destination: string,
  category: RecommendationCategory
): Promise<ImageResult> {
  const blurDataURL = generateBlurDataURL(category);

  // Hotels and restaurants: try Google Places first (verified data + photos)
  if (category === "hotel" || category === "restaurant") {
    const placesUrl = await fetchPlacesImage(name, destination);
    if (placesUrl) {
      return { imageUrl: placesUrl, imageSource: "places", blurDataURL };
    }
  }

  // Attractions (and hotel/restaurant fallback): try Unsplash
  const unsplashUrl = await fetchUnsplashImage(`${name} ${destination}`);
  if (unsplashUrl) {
    return { imageUrl: unsplashUrl, imageSource: "unsplash", blurDataURL };
  }

  // Final fallback: gradient placeholder (blurDataURL doubles as placeholder image)
  return { imageUrl: blurDataURL, imageSource: "placeholder", blurDataURL };
}
