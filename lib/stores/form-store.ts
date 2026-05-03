import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DestinationData, UserPreferences } from "@/lib/types";

interface FormStore {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  travelers: number;
  preferences: UserPreferences | null;
  updateDestination: (data: DestinationData) => void;
  updatePreferences: (prefs: UserPreferences) => void;
  reset: () => void;
}

const initialState = {
  destination: "",
  startDate: null,
  endDate: null,
  travelers: 1,
  preferences: null,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      updateDestination: (data: DestinationData) =>
        set({
          destination: data.destination,
          startDate: data.startDate,
          endDate: data.endDate,
        }),
      updatePreferences: (prefs: UserPreferences) => set({ preferences: prefs }),
      reset: () => set(initialState),
    }),
    {
      name: "dawlance-form-storage",
      version: 1,
      partialize: (state) => ({
        destination: state.destination,
        startDate: state.startDate,
        endDate: state.endDate,
        travelers: state.travelers,
        preferences: state.preferences,
      }),
      // Dates are serialized to ISO strings by JSON.stringify — reconvert on load
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.startDate) {
            const parsed = new Date(state.startDate as unknown as string);
            state.startDate = !isNaN(parsed.getTime()) ? parsed : null;
          }
          if (state.endDate) {
            const parsed = new Date(state.endDate as unknown as string);
            state.endDate = !isNaN(parsed.getTime()) ? parsed : null;
          }
        }
      },
    }
  )
);

