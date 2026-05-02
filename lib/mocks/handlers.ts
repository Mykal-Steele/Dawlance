import { http, HttpResponse } from "msw";
import type { Recommendation } from "@/lib/types";

const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    name: "Eiffel Tower",
    description: "Iconic iron lattice tower on the Champ de Mars.",
    category: "attraction",
    estimatedDuration: 120,
    priceRange: 2,
    location: {
      address: "Champ de Mars, 5 Av. Anatole France, Paris",
      coordinates: { lat: 48.8584, lng: 2.2945 },
    },
    openingHours: "09:00-23:00",
    culturalNotes: "Book tickets in advance to skip queues.",
    imageUrl: "/images/placeholder.jpg",
    tags: ["landmark", "views", "romantic"],
  },
  {
    id: "rec-2",
    name: "Le Cinq",
    description: "Michelin-starred French cuisine in the heart of Paris.",
    category: "restaurant",
    estimatedDuration: 90,
    priceRange: 3,
    location: {
      address: "31 Av. George V, Paris",
      coordinates: { lat: 48.8674, lng: 2.3034 },
    },
    openingHours: "12:00-22:00",
    culturalNotes: "Smart casual dress required.",
    imageUrl: "/images/placeholder.jpg",
    tags: ["fine-dining", "french", "michelin"],
  },
];

export const handlers = [
  http.post("/api/recommendations", () => {
    return HttpResponse.json({ recommendations: mockRecommendations });
  }),

  http.get("/api/weather", ({ request }) => {
    const url = new URL(request.url);
    const destination = url.searchParams.get("destination");
    return HttpResponse.json({
      location: destination ?? "Unknown",
      forecast: [
        {
          date: "2026-06-01",
          tempHigh: 25,
          tempLow: 18,
          condition: "sunny",
          precipitation: 5,
          uvIndex: 7,
          humidity: 60,
        },
      ],
      clothingRecommendations: [
        {
          name: "Light clothing",
          description: "Comfortable in warm weather.",
          icon: "shirt",
          category: "clothing",
        },
      ],
    });
  }),

  http.post("/api/itinerary", () => {
    return HttpResponse.json({
      itinerary: {
        id: "itin-1",
        destination: "Paris",
        startDate: "2026-06-01",
        endDate: "2026-06-03",
        days: [],
        summary: "A wonderful trip to Paris.",
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
        },
      },
    });
  }),

  http.post("/api/ai/chat", () => {
    return HttpResponse.json({
      message: "I can help you plan your trip!",
      interactionId: "interaction-123",
      suggestions: ["Find a nearby cafe", "Adjust timing"],
      actions: [],
    });
  }),
];
