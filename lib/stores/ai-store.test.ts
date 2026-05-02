import { describe, it, expect, beforeEach } from "vitest";
import { useAIStore } from "./ai-store";
import type { AIMessage } from "@/lib/types";

const makeMessage = (id: string, role: AIMessage["role"] = "user"): AIMessage => ({
  id,
  role,
  content: `Message ${id}`,
  timestamp: new Date().toISOString(),
});

describe("AIStore", () => {
  beforeEach(() => {
    useAIStore.getState().clearHistory();
  });

  it("initialises with empty messages", () => {
    const state = useAIStore.getState();
    expect(state.messages).toHaveLength(0);
    expect(state.isTyping).toBe(false);
    expect(state.currentInteractionId).toBeUndefined();
  });

  it("adds messages in order", () => {
    useAIStore.getState().addMessage(makeMessage("1", "user"));
    useAIStore.getState().addMessage(makeMessage("2", "assistant"));
    const { messages } = useAIStore.getState();
    expect(messages).toHaveLength(2);
    expect(messages[0].role).toBe("user");
    expect(messages[1].role).toBe("assistant");
  });

  it("sets typing state", () => {
    useAIStore.getState().setTyping(true);
    expect(useAIStore.getState().isTyping).toBe(true);
    useAIStore.getState().setTyping(false);
    expect(useAIStore.getState().isTyping).toBe(false);
  });

  it("stores interaction id", () => {
    useAIStore.getState().setInteractionId("abc-123");
    expect(useAIStore.getState().currentInteractionId).toBe("abc-123");
  });

  it("clearHistory resets messages, typing, and interactionId", () => {
    useAIStore.getState().addMessage(makeMessage("1"));
    useAIStore.getState().setTyping(true);
    useAIStore.getState().setInteractionId("abc-123");
    useAIStore.getState().clearHistory();
    const state = useAIStore.getState();
    expect(state.messages).toHaveLength(0);
    expect(state.isTyping).toBe(false);
    expect(state.currentInteractionId).toBeUndefined();
  });
});
