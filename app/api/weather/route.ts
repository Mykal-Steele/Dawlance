import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { retryWithBackoff } from "@/lib/utils/retry";
import type { WeatherData, DailyForecast, ClothingItem } from "@/lib/types";

const querySchema = z.object({
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
});

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org";

type WeatherCondition = DailyForecast["condition"];

function mapOwmCondition(owmMain: string): WeatherCondition {
  const lower = owmMain.toLowerCase();
  if (lower === "clear") return "sunny";
  if (lower === "rain" || lower === "drizzle") return "rainy";
  if (lower === "snow") return "snowy";
  if (lower === "thunderstorm") return "rainy";
  if (lower === "wind") return "windy";
  return "cloudy";
}

function estimateUvIndex(condition: WeatherCondition, month: number): number {
  const isSummer = month >= 4 && month <= 9;
  if (condition === "sunny") return isSummer ? 7 : 4;
  if (condition === "cloudy") return isSummer ? 3 : 2;
  return 1;
}

async function fetchFromOpenWeather(
  destination: string
): Promise<{ forecasts: DailyForecast[]; location: string }> {
  const geoRes = await fetch(
    `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(destination)}&limit=1&appid=${API_KEY}`
  );
  if (!geoRes.ok) throw new Error("Geocoding request failed");

  const geoData = (await geoRes.json()) as Array<{
    lat: number;
    lon: number;
    name: string;
    country: string;
  }>;
  if (!geoData.length) throw new Error("Location not found");

  const { lat, lon, name, country } = geoData[0];

  const forecastRes = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=40&appid=${API_KEY}`
  );
  if (!forecastRes.ok) throw new Error("Forecast request failed");

  const forecastData = (await forecastRes.json()) as {
    list: Array<{
      dt: number;
      main: { temp_max: number; temp_min: number; humidity: number };
      weather: Array<{ main: string }>;
      pop: number;
    }>;
  };

  const dayMap = new Map<string, typeof forecastData.list>();
  for (const item of forecastData.list) {
    const date = new Date(item.dt * 1000).toISOString().split("T")[0];
    if (!dayMap.has(date)) dayMap.set(date, []);
    dayMap.get(date)!.push(item);
  }

  const month = new Date().getMonth() + 1;
  const forecasts: DailyForecast[] = Array.from(dayMap.entries()).map(([date, items]) => {
    const tempHigh = Math.round(Math.max(...items.map((i) => i.main.temp_max)));
    const tempLow = Math.round(Math.min(...items.map((i) => i.main.temp_min)));
    const humidity = Math.round(
      items.reduce((sum, i) => sum + i.main.humidity, 0) / items.length
    );
    const precipitation = Math.round(Math.max(...items.map((i) => i.pop)) * 100);

    const counts = new Map<string, number>();
    for (const item of items) {
      const main = item.weather[0].main;
      counts.set(main, (counts.get(main) ?? 0) + 1);
    }
    const dominant = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
    const condition = mapOwmCondition(dominant);
    const uvIndex = estimateUvIndex(condition, month);

    return { date, tempHigh, tempLow, condition, precipitation, uvIndex, humidity };
  });

  return { forecasts, location: `${name}, ${country}` };
}

function generateMockForecasts(destination: string, startDate: string): DailyForecast[] {
  const hash = destination.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const conditions: WeatherCondition[] = ["sunny", "cloudy", "rainy", "sunny", "cloudy"];
  const start = new Date(startDate + "T00:00:00");

  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const condition = conditions[(hash + i) % conditions.length];
    return {
      date: date.toISOString().split("T")[0],
      tempHigh: 22 + ((hash + i) % 8),
      tempLow: 15 + ((hash + i) % 5),
      condition,
      precipitation: condition === "rainy" ? 70 : 10,
      uvIndex: condition === "sunny" ? 6 : 3,
      humidity: 55 + ((hash + i) % 25),
    };
  });
}

function generateClothingRecommendations(forecasts: DailyForecast[]): ClothingItem[] {
  const avgHigh = forecasts.reduce((sum, f) => sum + f.tempHigh, 0) / forecasts.length;
  const maxHumidity = Math.max(...forecasts.map((f) => f.humidity));
  const maxUv = Math.max(...forecasts.map((f) => f.uvIndex));
  const hasRain = forecasts.some((f) => f.condition === "rainy");
  const hasSnow = forecasts.some((f) => f.condition === "snowy");

  const items: ClothingItem[] = [];

  if (avgHigh >= 30) {
    items.push({
      name: "Light Summer Clothes",
      description: "Breathable t-shirts, shorts, and light dresses",
      icon: "👕",
      category: "clothing",
      warning:
        maxHumidity >= 80 ? "Heavy denim uncomfortable in high humidity" : undefined,
    });
  } else if (avgHigh >= 20) {
    items.push({
      name: "Casual Outfit",
      description: "Light jeans or chinos with a short-sleeved shirt",
      icon: "👔",
      category: "clothing",
    });
  } else if (avgHigh >= 10) {
    items.push({
      name: "Light Jacket",
      description: "Denim jacket or light sweater over a shirt",
      icon: "🧥",
      category: "clothing",
    });
  } else {
    items.push({
      name: "Winter Coat",
      description: "Heavy insulated coat with thermal layers underneath",
      icon: "🧥",
      category: "clothing",
      warning: avgHigh < 0 ? "Extreme cold — thermal base layers essential" : undefined,
    });
  }

  if (hasRain) {
    items.push(
      {
        name: "Umbrella",
        description: "Compact folding umbrella for unexpected showers",
        icon: "☂️",
        category: "accessory",
      },
      {
        name: "Waterproof Jacket",
        description: "Light rain jacket to layer over your outfit",
        icon: "🧥",
        category: "clothing",
      }
    );
  }

  if (hasSnow) {
    items.push(
      {
        name: "Snow Boots",
        description: "Waterproof insulated boots with non-slip soles",
        icon: "🥾",
        category: "clothing",
      },
      {
        name: "Gloves & Scarf",
        description: "Insulated gloves and a wool scarf",
        icon: "🧤",
        category: "accessory",
      }
    );
  }

  if (maxUv >= 6) {
    items.push(
      {
        name: "Sunscreen SPF 50+",
        description: "Apply 15 min before going outside; reapply every 2 hours",
        icon: "🧴",
        category: "accessory",
        warning: maxUv >= 9 ? "Very high UV — reapply sunscreen frequently" : undefined,
      },
      {
        name: "Sunglasses",
        description: "UV-protective sunglasses for eye protection",
        icon: "🕶️",
        category: "accessory",
      }
    );

    if (maxUv >= 8) {
      items.push({
        name: "Wide-Brim Hat",
        description: "Protects face, neck, and shoulders from intense sun",
        icon: "👒",
        category: "accessory",
      });
    }
  }

  items.push({
    name: "Comfortable Walking Shoes",
    description: "Cushioned sneakers or walking shoes for sightseeing",
    icon: "👟",
    category: "clothing",
  });

  return items;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const parsed = querySchema.safeParse({
    destination: searchParams.get("destination"),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { destination, startDate } = parsed.data;

  try {
    let forecasts: DailyForecast[];
    let location: string;

    if (API_KEY) {
      const result = await retryWithBackoff(
        () => fetchFromOpenWeather(destination),
        3,
        1000
      );
      forecasts = result.forecasts;
      location = result.location;
    } else {
      forecasts = generateMockForecasts(destination, startDate);
      location = destination;
    }

    const clothingRecommendations = generateClothingRecommendations(forecasts);

    const response: WeatherData = { location, forecast: forecasts, clothingRecommendations };

    return NextResponse.json(response, {
      headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message.includes("Location not found")) {
      return NextResponse.json(
        { error: "Invalid location", details: `Could not find "${destination}"` },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Made with Bob
