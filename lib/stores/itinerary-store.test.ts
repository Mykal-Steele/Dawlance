import { describe, it, expect, beforeEach } from "vitest";
import { useItineraryStore } from "./itinerary-store";
import type { Itinerary } from "@/lib/types";

const makeItinerary = (id: string): Itinerary => ({
  id,
  destination: "Paris",
  startDate: "2026-06-01",
  endDate: "2026-06-03",
  days: [
    {
      date: "2026-06-01",
      summary: "Day 1",
      activities: [
        {
          id: "act-1",
          time: "09:00",
          duration: 120,
          type: "attraction",
          recommendation: {
            id: "rec-1",
            name: "Eiffel Tower",
            description: "",
            category: "attraction",
            estimatedDuration: 120,
            priceRange: 2,
            location: { address: "Paris", coordinates: { lat: 0, lng: 0 } },
            openingHours: "09:00-23:00",
            culturalNotes: "",
            imageUrl: "",
            tags: [],
          },
          culturalContext: "",
          attireSuggestion: "Casual",
        },
      ],
    },
  ],
  summary: "A Paris trip.",
  metadata: { createdAt: "", updatedAt: "", version: 1 },
});

describe("ItineraryStore", () => {
  beforeEach(() => {
    useItineraryStore.getState().updateItinerary(null);
  });

  it("initialises with null itinerary and no history", () => {
    const state = useItineraryStore.getState();
    expect(state.itinerary).toBeNull();
    expect(state.history).toHaveLength(0);
    expect(state.canUndo).toBe(false);
    expect(state.canRedo).toBe(false);
  });

  it("sets itinerary and records history", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    const state = useItineraryStore.getState();
    expect(state.itinerary?.id).toBe("v1");
    expect(state.history).toHaveLength(1);
    expect(state.canUndo).toBe(false);
  });

  it("enables undo after two updates", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    useItineraryStore.getState().updateItinerary(makeItinerary("v2"));
    expect(useItineraryStore.getState().canUndo).toBe(true);
  });

  it("undo restores previous itinerary", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    useItineraryStore.getState().updateItinerary(makeItinerary("v2"));
    useItineraryStore.getState().undo();
    expect(useItineraryStore.getState().itinerary?.id).toBe("v1");
    expect(useItineraryStore.getState().canRedo).toBe(true);
  });

  it("redo restores undone itinerary", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    useItineraryStore.getState().updateItinerary(makeItinerary("v2"));
    useItineraryStore.getState().undo();
    useItineraryStore.getState().redo();
    expect(useItineraryStore.getState().itinerary?.id).toBe("v2");
    expect(useItineraryStore.getState().canRedo).toBe(false);
  });

  it("editing an activity updates it immutably", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    useItineraryStore.getState().editActivity(0, 0, { notes: "Wear comfortable shoes" });
    const activity = useItineraryStore.getState().itinerary?.days[0].activities[0];
    expect(activity?.notes).toBe("Wear comfortable shoes");
  });

  it("updating itinerary with null clears history", () => {
    useItineraryStore.getState().updateItinerary(makeItinerary("v1"));
    useItineraryStore.getState().updateItinerary(null);
    const state = useItineraryStore.getState();
    expect(state.itinerary).toBeNull();
    expect(state.history).toHaveLength(0);
    expect(state.canUndo).toBe(false);
  });
});
