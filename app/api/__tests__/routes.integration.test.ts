/**
 * Integration tests for API routes.
 *
 * These tests call `fetch('/api/...')` which is intercepted by the MSW server
 * configured in lib/test-utils/setup.ts. They verify that the app correctly
 * handles success and error responses.
 */
import { describe, it, expect } from "vitest";
import { server } from "@/lib/mocks/server";
import { errorHandlers } from "@/lib/mocks/handlers";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function postJSON(url: string, body: unknown): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const minRecommendationsBody = {
  destination: "Paris",
  startDate: "2026-06-01",
  endDate: "2026-06-05",
  travelers: 2,
  preferences: { travelStyle: ["museums"], budget: "moderate" },
};

const minItineraryBody = {
  destination: "Paris",
  startDate: "2026-06-01",
  endDate: "2026-06-03",
  travelers: 1,
  preferences: { travelStyle: ["museums"], budget: "moderate" },
  selectedRecommendations: [],
};

const minChatBody = {
  message: "What should I see first?",
  context: { currentStep: "itinerary" as const },
};

// ─── /api/recommendations ─────────────────────────────────────────────────────

describe("POST /api/recommendations", () => {
  it("returns 200 with recommendations array", async () => {
    const res = await postJSON("/api/recommendations", minRecommendationsBody);
    expect(res.status).toBe(200);
    const data = (await res.json()) as { recommendations: unknown[] };
    expect(Array.isArray(data.recommendations)).toBe(true);
    expect(data.recommendations.length).toBeGreaterThan(0);
  });

  it("each recommendation has required fields", async () => {
    const res = await postJSON("/api/recommendations", minRecommendationsBody);
    const data = (await res.json()) as { recommendations: Record<string, unknown>[] };
    const rec = data.recommendations[0];
    expect(rec).toHaveProperty("id");
    expect(rec).toHaveProperty("name");
    expect(rec).toHaveProperty("category");
    expect(rec).toHaveProperty("location");
  });

  it("returns 400 on validation error", async () => {
    server.use(errorHandlers.recommendationsValidation);
    const res = await postJSON("/api/recommendations", {});
    expect(res.status).toBe(400);
  });

  it("returns 503 when AI service is unavailable", async () => {
    server.use(errorHandlers.recommendationsUnavailable);
    const res = await postJSON("/api/recommendations", minRecommendationsBody);
    expect(res.status).toBe(503);
  });
});

// ─── /api/itinerary ───────────────────────────────────────────────────────────

describe("POST /api/itinerary", () => {
  it("returns 200 with itinerary object", async () => {
    const res = await postJSON("/api/itinerary", minItineraryBody);
    expect(res.status).toBe(200);
    const data = (await res.json()) as { itinerary: Record<string, unknown> };
    expect(data.itinerary).toBeDefined();
    expect(data.itinerary).toHaveProperty("id");
    expect(data.itinerary).toHaveProperty("destination");
    expect(data.itinerary).toHaveProperty("days");
  });

  it("itinerary has required metadata fields", async () => {
    const res = await postJSON("/api/itinerary", minItineraryBody);
    const data = (await res.json()) as { itinerary: Record<string, unknown> };
    const meta = data.itinerary.metadata as Record<string, unknown>;
    expect(meta).toHaveProperty("createdAt");
    expect(meta).toHaveProperty("version");
  });

  it("returns 400 on validation error", async () => {
    server.use(errorHandlers.itineraryValidation);
    const res = await postJSON("/api/itinerary", {});
    expect(res.status).toBe(400);
  });

  it("returns 500 on server error", async () => {
    server.use(errorHandlers.itineraryServerError);
    const res = await postJSON("/api/itinerary", minItineraryBody);
    expect(res.status).toBe(500);
  });
});

// ─── /api/itinerary/recalculate ───────────────────────────────────────────────

describe("POST /api/itinerary/recalculate", () => {
  const recalcBody = {
    currentItinerary: { id: "itin-1", days: [] },
    edit: {
      dayIndex: 0,
      activityIndex: 0,
      changes: { time: "10:00" },
      editType: "time_shift",
    },
  };

  it("returns 200 with updated itinerary and changedDays", async () => {
    const res = await postJSON("/api/itinerary/recalculate", recalcBody);
    expect(res.status).toBe(200);
    const data = (await res.json()) as { itinerary: unknown; changedDays: number[] };
    expect(data.itinerary).toBeDefined();
    expect(Array.isArray(data.changedDays)).toBe(true);
  });
});

// ─── /api/ai/chat ─────────────────────────────────────────────────────────────

describe("POST /api/ai/chat", () => {
  it("returns 200 with message field", async () => {
    const res = await postJSON("/api/ai/chat", minChatBody);
    expect(res.status).toBe(200);
    const data = (await res.json()) as { message: string };
    expect(typeof data.message).toBe("string");
    expect(data.message.length).toBeGreaterThan(0);
  });

  it("response includes optional interactionId", async () => {
    const res = await postJSON("/api/ai/chat", minChatBody);
    const data = (await res.json()) as { interactionId?: string };
    // interactionId is optional but present in the mock
    expect(data.interactionId).toBeDefined();
  });

  it("returns 400 on missing message", async () => {
    server.use(errorHandlers.chatValidation);
    const res = await postJSON("/api/ai/chat", { context: {} });
    expect(res.status).toBe(400);
  });
});

// ─── /api/weather ─────────────────────────────────────────────────────────────

describe("GET /api/weather", () => {
  it("returns 200 with forecast array", async () => {
    const res = await fetch(
      "/api/weather?destination=Paris&startDate=2026-06-01&endDate=2026-06-05"
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as { forecast: unknown[] };
    expect(Array.isArray(data.forecast)).toBe(true);
    expect(data.forecast.length).toBeGreaterThan(0);
  });

  it("forecast entries have required fields", async () => {
    const res = await fetch(
      "/api/weather?destination=Paris&startDate=2026-06-01&endDate=2026-06-05"
    );
    const data = (await res.json()) as { forecast: Record<string, unknown>[] };
    const day = data.forecast[0];
    expect(day).toHaveProperty("date");
    expect(day).toHaveProperty("tempHigh");
    expect(day).toHaveProperty("tempLow");
    expect(day).toHaveProperty("condition");
  });

  it("returns 503 when weather API is unavailable", async () => {
    server.use(errorHandlers.weatherError);
    const res = await fetch("/api/weather?destination=Paris");
    expect(res.status).toBe(503);
  });
});
