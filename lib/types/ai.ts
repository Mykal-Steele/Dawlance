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
    | "find_nearby";
  payload: unknown;
  label: string;
}

// Made with Bob
