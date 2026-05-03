/**
 * AI assistant data models
 * Used in Step 8 (AI Assistant Interaction)
 */

export interface AIMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  suggestions?: string[];
  actions?: AIAction[];
}

export interface AIAction {
  type:
    | "add_activity"
    | "remove_activity"
    | "adjust_time"
    | "suggest_alternative"
    | "find_nearby"
    | "fill_slot";
  payload: unknown;
  label: string;
}

export interface FillSlotPayload {
  dayIndex: number;
  slotId: string;
  place: {
    name: string;
    address: string;
    coordinates: { lat: number; lng: number };
    type: "attraction" | "meal" | "rest";
    duration?: number;
    culturalContext?: string;
    attireSuggestion?: string;
  };
}

// Made with Bob
