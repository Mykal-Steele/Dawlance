import type { Itinerary, Recommendation, UserPreferences } from "@/lib/types";

export interface AIChatContext {
  currentStep: "destination" | "weather" | "preferences" | "discovery" | "itinerary";
  itinerary?: Itinerary;
  selectedRecommendations?: Recommendation[];
  preferences?: UserPreferences;
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelers?: number;
}

export interface AIChatRequest {
  message: string;
  context: AIChatContext;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface AIChatResponse {
  message: string;
  suggestions?: string[];
  actions?: Array<{
    type:
      | "add_activity"
      | "remove_activity"
      | "adjust_time"
      | "suggest_alternative"
      | "find_nearby"
      | "fill_slot";
    payload: unknown;
    label: string;
  }>;
}

/**
 * Sends a chat message to the AI and streams the response.
 * Calls `onChunk` for each text delta, then resolves with the full response.
 */
export async function sendChatMessage(
  req: AIChatRequest,
  onChunk: (text: string) => void
): Promise<AIChatResponse> {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!response.ok || !response.body) {
    throw new Error(`Chat request failed: ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullMessage = "";
  let parsedActions: AIChatResponse["actions"];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const raw = line.slice(6).trim();
      if (!raw) continue;

      let event: Record<string, unknown>;
      try {
        event = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        continue;
      }

      if (event.type === "delta" && typeof event.text === "string") {
        fullMessage += event.text;
        onChunk(event.text);
      } else if (event.type === "done") {
        // Use server's clean version (actions block stripped) when available
        if (typeof event.cleanText === "string" && event.cleanText.trim()) {
          fullMessage = event.cleanText.trim();
        } else {
          // Safety: strip actions block from client-side accumulated text too
          const markerIdx = fullMessage.search(/\n?---ACTIONS---/);
          if (markerIdx !== -1) fullMessage = fullMessage.slice(0, markerIdx).trim();
        }
        // Attach parsed actions from server
        if (Array.isArray(event.actions) && event.actions.length > 0) {
          parsedActions = event.actions as AIChatResponse["actions"];
        }
      } else if (event.type === "error") {
        throw new Error(typeof event.message === "string" ? event.message : "AI error");
      }
    }
  }

  return {
    message: fullMessage.trim() || "Done! I've updated your plan.",
    actions: parsedActions,
  };
}
