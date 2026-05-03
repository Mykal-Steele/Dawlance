/**
 * Itinerary data models
 * Used in Steps 6-9 (generation, display, editing)
 */

import type { Recommendation } from "./recommendation";

export interface Itinerary {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: DayPlan[];
  summary: string;
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

export interface DayPlan {
  date: string;
  activities: Activity[];
  summary: string;
}

export interface Activity {
  id: string;
  time: string; // HH:MM format
  duration: number; // minutes
  type: "attraction" | "meal" | "rest" | "travel" | "empty";
  recommendation: Recommendation;
  culturalContext: string;
  attireSuggestion: string;
  travelTime?: number; // minutes to next activity
  notes?: string;
  isUserAdded?: boolean; // true when user manually added via empty slot
}

