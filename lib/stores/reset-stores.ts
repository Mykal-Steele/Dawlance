import { useFormStore } from "./form-store";
import { useSelectionStore } from "./selection-store";
import { useItineraryStore } from "./itinerary-store";
import { useAIStore } from "./ai-store";

/**
 * Resets all Zustand stores to their initial state.
 * Called when destination changes or user starts a new trip.
 * Also invalidates React Query cache (caller's responsibility).
 */
export function resetAllStores(): void {
  useFormStore.getState().reset();
  useSelectionStore.getState().clearSelections();
  useItineraryStore.getState().updateItinerary(null);
  useAIStore.getState().clearHistory();
}

// Made with Bob
