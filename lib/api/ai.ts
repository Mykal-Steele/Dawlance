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
  previousInteractionId?: string;
}

export interface AIChatResponse {
  message: string;
  interactionId: string;
  suggestions?: string[];
  actions?: Array<{
    type:
      | "add_activity"
      | "remove_activity"
      | "adjust_time"
      | "suggest_alternative"
      | "find_nearby";
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
  let interactionId = "";

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
        interactionId = typeof event.interactionId === "string" ? event.interactionId : "";
      } else if (event.type === "error") {
        throw new Error(typeof event.message === "string" ? event.message : "AI error");
      }
    }
  }

  return {
    message: fullMessage,
    interactionId,
  };
}
