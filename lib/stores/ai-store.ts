import { create } from "zustand";
import type { AIMessage } from "@/lib/types";

interface AIStore {
  messages: AIMessage[];
  isTyping: boolean;
  currentInteractionId?: string;
  addMessage: (message: AIMessage) => void;
  setTyping: (typing: boolean) => void;
  setInteractionId: (id: string) => void;
  clearHistory: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  messages: [],
  isTyping: false,
  currentInteractionId: undefined,

  addMessage: (message: AIMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setTyping: (typing: boolean) => set({ isTyping: typing }),

  setInteractionId: (id: string) => set({ currentInteractionId: id }),

  clearHistory: () =>
    set({
      messages: [],
      isTyping: false,
      currentInteractionId: undefined,
    }),
}));

