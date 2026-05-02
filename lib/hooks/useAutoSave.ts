"use client";

import { useEffect } from "react";
import { useFormStore, useSelectionStore } from "@/lib/stores";

const DRAFT_KEY = "travel-plan-draft";
const INTERVAL_MS = 30_000;

export function useAutoSave(): void {
  const destination = useFormStore((s) => s.destination);
  const startDate = useFormStore((s) => s.startDate);
  const endDate = useFormStore((s) => s.endDate);
  const preferences = useFormStore((s) => s.preferences);
  const selectedRecommendations = useSelectionStore((s) => s.selectedRecommendations);

  useEffect(() => {
    const save = () => {
      try {
        const draft = {
          form: { destination, startDate, endDate, preferences },
          selections: selectedRecommendations,
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        // Silently fail if localStorage is unavailable
      }
    };

    const id = setInterval(save, INTERVAL_MS);
    return () => clearInterval(id);
  }, [destination, startDate, endDate, preferences, selectedRecommendations]);
}

// Made with Bob
