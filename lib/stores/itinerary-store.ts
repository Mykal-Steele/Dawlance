import { create } from "zustand";
import type { Itinerary, Activity } from "@/lib/types";

interface ItineraryStore {
  itinerary: Itinerary | null;
  history: Itinerary[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  /** IDs of activities recently added/modified by the AI — used for the highlight animation */
  highlightedActivityIds: Set<string>;
  updateItinerary: (itinerary: Itinerary | null) => void;
  editActivity: (dayIndex: number, activityIndex: number, changes: Partial<Activity>) => void;
  reorderActivities: (dayIndex: number, fromIndex: number, toIndex: number) => void;
  removeActivity: (dayIndex: number, activityIndex: number) => void;
  /** Insert a new activity at the given position in a day (or append if activityIndex === -1) */
  addActivity: (dayIndex: number, activityIndex: number, activity: Activity) => void;
  /** Replace an empty-type slot by id with a filled activity */
  fillEmptySlot: (dayIndex: number, slotId: string, activity: Activity) => void;
  /** Mark an activity as recently added so it gets a highlight animation */
  markActivityAdded: (id: string) => void;
  /** Remove an activity from the highlight set */
  clearActivityHighlight: (id: string) => void;
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
  highlightedActivityIds: new Set<string>(),

  markActivityAdded: (id: string) =>
    set((state) => ({
      highlightedActivityIds: new Set([...state.highlightedActivityIds, id]),
    })),

  clearActivityHighlight: (id: string) =>
    set((state) => {
      const next = new Set(state.highlightedActivityIds);
      next.delete(id);
      return { highlightedActivityIds: next };
    }),

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

  reorderActivities: (dayIndex: number, fromIndex: number, toIndex: number) =>
    set((state) => {
      if (!state.itinerary) return state;
      if (fromIndex === toIndex) return state;

      const newDays = state.itinerary.days.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        const acts = [...day.activities];
        const [moved] = acts.splice(fromIndex, 1);
        if (moved) acts.splice(toIndex, 0, moved);
        return { ...day, activities: acts };
      });

      const newItinerary = {
        ...state.itinerary,
        days: newDays,
        metadata: { ...state.itinerary.metadata, updatedAt: new Date().toISOString() },
      };

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

  removeActivity: (dayIndex: number, activityIndex: number) =>
    set((state) => {
      if (!state.itinerary) return state;

      const newDays = state.itinerary.days.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        return {
          ...day,
          activities: day.activities.filter((_, aIdx) => aIdx !== activityIndex),
        };
      });

      const newItinerary = {
        ...state.itinerary,
        days: newDays,
        metadata: { ...state.itinerary.metadata, updatedAt: new Date().toISOString() },
      };

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

  addActivity: (dayIndex: number, activityIndex: number, activity: Activity) =>
    set((state) => {
      if (!state.itinerary) return state;
      if (dayIndex < 0 || dayIndex >= state.itinerary.days.length) return state;

      const newDays = state.itinerary.days.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        const acts = [...day.activities];
        if (activityIndex === -1 || activityIndex >= acts.length) {
          acts.push(activity);
        } else {
          acts.splice(activityIndex, 0, activity);
        }
        return { ...day, activities: acts };
      });

      const newItinerary = {
        ...state.itinerary,
        days: newDays,
        metadata: { ...state.itinerary.metadata, updatedAt: new Date().toISOString() },
      };

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

  fillEmptySlot: (dayIndex: number, slotId: string, activity: Activity) =>
    set((state) => {
      if (!state.itinerary) return state;
      if (dayIndex < 0 || dayIndex >= state.itinerary.days.length) return state;

      const newDays = state.itinerary.days.map((day, dIdx) => {
        if (dIdx !== dayIndex) return day;
        return {
          ...day,
          activities: day.activities.map((act) =>
            act.id === slotId ? { ...activity, id: slotId } : act
          ),
        };
      });

      const newItinerary = {
        ...state.itinerary,
        days: newDays,
        metadata: { ...state.itinerary.metadata, updatedAt: new Date().toISOString() },
      };

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
