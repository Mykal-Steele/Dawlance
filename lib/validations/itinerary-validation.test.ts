import { describe, it, expect } from "vitest";
import { validateSelections } from "./itinerary-validation";
import type { Recommendation } from "@/lib/types";

const START = "2026-06-01";
const END = "2026-06-05"; // 4-day trip

function makeRec(
  id: string,
  category: Recommendation["category"],
  durationMinutes = 60,
  lat = 48.85,
  lng = 2.29
): Recommendation {
  return {
    id,
    name: `Place ${id}`,
    description: "",
    category,
    estimatedDuration: durationMinutes,
    priceRange: 2,
    location: { address: "Somewhere", coordinates: { lat, lng } },
    openingHours: "09:00-18:00",
    culturalNotes: "",
    imageUrl: "",
    tags: [],
  };
}

// A minimal set that meets all requirements: 1 hotel, 3+ attractions, 2+ restaurants
const validSet: Recommendation[] = [
  makeRec("h1", "hotel"),
  makeRec("a1", "attraction"),
  makeRec("a2", "attraction"),
  makeRec("a3", "attraction"),
  makeRec("r1", "restaurant"),
  makeRec("r2", "restaurant"),
];

describe("validateSelections", () => {
  it("rejects an empty selection list", () => {
    const result = validateSelections([], START, END);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Select at least one place");
  });

  it("returns valid=true for a well-balanced selection", () => {
    const result = validateSelections(validSet, START, END);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("warns when no hotel is selected", () => {
    const noHotel = validSet.filter((r) => r.category !== "hotel");
    const result = validateSelections(noHotel, START, END);
    expect(result.valid).toBe(true); // still valid — just a warning
    expect(result.warnings.some((w) => w.includes("hotel"))).toBe(true);
  });

  it("warns when fewer than 3 attractions are selected", () => {
    const fewAttractions = [
      makeRec("h1", "hotel"),
      makeRec("a1", "attraction"),
      makeRec("r1", "restaurant"),
      makeRec("r2", "restaurant"),
    ];
    const result = validateSelections(fewAttractions, START, END);
    expect(result.valid).toBe(true);
    expect(result.warnings.some((w) => w.includes("attraction"))).toBe(true);
  });

  it("warns when fewer than 2 restaurants are selected", () => {
    const fewRestaurants = [
      makeRec("h1", "hotel"),
      makeRec("a1", "attraction"),
      makeRec("a2", "attraction"),
      makeRec("a3", "attraction"),
      makeRec("r1", "restaurant"),
    ];
    const result = validateSelections(fewRestaurants, START, END);
    expect(result.valid).toBe(true);
    expect(result.warnings.some((w) => w.includes("restaurant"))).toBe(true);
  });

  it("warns when selections are more than 300km apart", () => {
    const farApart: Recommendation[] = [
      makeRec("a1", "attraction", 60, 48.85, 2.29), // Paris
      makeRec("a2", "attraction", 60, 45.76, 4.83), // Lyon — ~400km
    ];
    const result = validateSelections(farApart, START, END);
    expect(result.warnings.some((w) => w.includes("km apart"))).toBe(true);
  });

  it("warns when total activity time exceeds 80% of trip hours", () => {
    // 4-day trip = 96 hours. 80% = 76.8 hours = 4608 mins.
    // Each rec is 1000 mins. 6 non-hotel recs = 6000 mins > 4608.
    const tooMuch: Recommendation[] = [
      makeRec("h1", "hotel", 60),
      makeRec("a1", "attraction", 1000),
      makeRec("a2", "attraction", 1000),
      makeRec("a3", "attraction", 1000),
      makeRec("r1", "restaurant", 1000),
      makeRec("r2", "restaurant", 1000),
      makeRec("r3", "restaurant", 1000),
    ];
    const result = validateSelections(tooMuch, START, END);
    expect(result.warnings.some((w) => w.includes("over capacity"))).toBe(true);
  });

  it("produces no warnings for a perfect balanced selection", () => {
    const result = validateSelections(validSet, START, END);
    expect(result.warnings).toHaveLength(0);
  });
});
