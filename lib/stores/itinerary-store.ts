import { create } from "zustand";
import type { Itinerary, Activity } from "@/lib/types";

interface ItineraryStore {
  itinerary: Itinerary | null;
  history: Itinerary[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  updateItinerary: (itinerary: Itinerary | null) => void;
  editActivity: (dayIndex: number, activityIndex: number, changes: Partial<Activity>) => void;
  undo: () => void;
  redo: () => void;
}

const MAX_HISTORY = 50;

export const useItineraryStore = create<ItineraryStore>((set, _get) => ({
  itinerary: null,
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  updateItinerary: (itinerary: Itinerary | null) =>
    set((state) => {
      if (!itinerary) {
        return {
          itinerary: null,
          history: [],
          historyIndex: -1,
          canUndo: false,
          canRedo: false,
        };
      }

      // Add to history, removing any "future" states if we're not at the end
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), itinerary].slice(
        -MAX_HISTORY
      );

      const newIndex = newHistory.length - 1;

      return {
        itinerary,
        history: newHistory,
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: false,
      };
    }),

  editActivity: (dayIndex: number, activityIndex: number, changes: Partial<Activity>) =>
    set((state) => {
      if (!state.itinerary) return state;

      const newItinerary = { ...state.itinerary };
      const newDays = [...newItinerary.days];
      if (dayIndex < 0 || dayIndex >= newDays.length) return state;
      const targetDay = { ...newDays[dayIndex] };
      const newActivities = [...targetDay.activities];
      if (activityIndex < 0 || activityIndex >= newActivities.length) return state;

      newActivities[activityIndex] = {
        ...newActivities[activityIndex],
        ...changes,
      };

      targetDay.activities = newActivities;
      newDays[dayIndex] = targetDay;
      newItinerary.days = newDays;

      // Add to history
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newItinerary].slice(
        -MAX_HISTORY
      );

      const newIndex = newHistory.length - 1;

      return {
        itinerary: newItinerary,
        history: newHistory,
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: false,
      };
    }),

  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;

      const newIndex = state.historyIndex - 1;
      return {
        itinerary: state.history[newIndex],
        historyIndex: newIndex,
        canUndo: newIndex > 0,
        canRedo: true,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;

      const newIndex = state.historyIndex + 1;
      return {
        itinerary: state.history[newIndex],
        historyIndex: newIndex,
        canUndo: true,
        canRedo: newIndex < state.history.length - 1,
      };
    }),
}));

// Made with Bob
