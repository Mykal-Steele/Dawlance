import { describe, it, expect, beforeEach } from "vitest";
import { useSelectionStore } from "./selection-store";
import type { Recommendation } from "@/lib/types";

const makeRec = (id: string, category: Recommendation["category"] = "attraction"): Recommendation => ({
  id,
  name: `Place ${id}`,
  description: "A great place.",
  category,
  estimatedDuration: 60,
  priceRange: 2,
  location: { address: "123 Main St", coordinates: { lat: 0, lng: 0 } },
  openingHours: "09:00-18:00",
  culturalNotes: "",
  imageUrl: "",
  tags: [],
});

describe("SelectionStore", () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelections();
  });

  it("starts with no selections", () => {
    expect(useSelectionStore.getState().selectedRecommendations).toHaveLength(0);
  });

  it("adds a recommendation", () => {
    useSelectionStore.getState().addSelection(makeRec("1"));
    expect(useSelectionStore.getState().selectedRecommendations).toHaveLength(1);
  });

  it("prevents duplicate selections", () => {
    const rec = makeRec("1");
    useSelectionStore.getState().addSelection(rec);
    useSelectionStore.getState().addSelection(rec);
    expect(useSelectionStore.getState().selectedRecommendations).toHaveLength(1);
  });

  it("removes a recommendation by id", () => {
    useSelectionStore.getState().addSelection(makeRec("1"));
    useSelectionStore.getState().addSelection(makeRec("2"));
    useSelectionStore.getState().removeSelection("1");
    const recs = useSelectionStore.getState().selectedRecommendations;
    expect(recs).toHaveLength(1);
    expect(recs[0].id).toBe("2");
  });

  it("clears all selections", () => {
    useSelectionStore.getState().addSelection(makeRec("1"));
    useSelectionStore.getState().addSelection(makeRec("2"));
    useSelectionStore.getState().clearSelections();
    expect(useSelectionStore.getState().selectedRecommendations).toHaveLength(0);
  });

  it("isSelected returns true for selected items", () => {
    useSelectionStore.getState().addSelection(makeRec("1"));
    expect(useSelectionStore.getState().isSelected("1")).toBe(true);
    expect(useSelectionStore.getState().isSelected("2")).toBe(false);
  });

  it("filters selections by category", () => {
    useSelectionStore.getState().addSelection(makeRec("1", "hotel"));
    useSelectionStore.getState().addSelection(makeRec("2", "attraction"));
    useSelectionStore.getState().addSelection(makeRec("3", "hotel"));
    const hotels = useSelectionStore.getState().getSelectionsByCategory("hotel");
    expect(hotels).toHaveLength(2);
    expect(hotels.every((r) => r.category === "hotel")).toBe(true);
  });
});
