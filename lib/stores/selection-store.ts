import { create } from "zustand";
import type { Recommendation } from "@/lib/types";

interface SelectionStore {
  selectedRecommendations: Recommendation[];
  addSelection: (rec: Recommendation) => void;
  removeSelection: (id: string) => void;
  clearSelections: () => void;
  isSelected: (id: string) => boolean;
  getSelectionsByCategory: (category: string) => Recommendation[];
}

export const useSelectionStore = create<SelectionStore>((set, get) => ({
  selectedRecommendations: [],
  
  addSelection: (rec: Recommendation) =>
    set((state) => {
      // Prevent duplicates
      if (state.selectedRecommendations.some((r) => r.id === rec.id)) {
        return state;
      }
      return {
        selectedRecommendations: [...state.selectedRecommendations, rec],
      };
    }),
  
  removeSelection: (id: string) =>
    set((state) => ({
      selectedRecommendations: state.selectedRecommendations.filter(
        (rec) => rec.id !== id
      ),
    })),
  
  clearSelections: () => set({ selectedRecommendations: [] }),
  
  isSelected: (id: string) =>
    get().selectedRecommendations.some((rec) => rec.id === id),
  
  getSelectionsByCategory: (category: string) =>
    get().selectedRecommendations.filter((rec) => rec.category === category),
}));

// Made with Bob
