"use client";

import { useEffect, useRef } from "react";
import type { AIMessage as AIMessageType, AIAction } from "@/lib/types";
import { AIMessage } from "./AIMessage";
import { AITypingIndicator } from "./AITypingIndicator";
import { AIAvatar } from "./AIAvatar";

interface AIChatProps {
  messages: AIMessageType[];
  isTyping: boolean;
  streamingText: string;
  onSuggestionClick: (suggestion: string) => void;
  onActionClick: (action: AIAction) => void;
}

export function AIChat({
  messages,
  isTyping,
  streamingText,
  onSuggestionClick,
  onActionClick,
}: AIChatProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Track whether the user has scrolled away from the bottom manually
  const stickToBottom = useRef(true);

  function handleScroll(): void {
    const el = scrollRef.current;
    if (!el) return;
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  }

  // Single scroll effect — runs after every render that changes content
  useEffect(() => {
    if (!stickToBottom.current) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  });

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4"
    >
      {messages.length === 0 && !isTyping && (
        <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#2A7BFF] to-[#6DD3B0]">
            <span className="text-xl text-white">✈</span>
          </div>
          <p className="text-sm text-gray-500">Ask me anything about your trip!</p>
        </div>
      )}

      {messages.map((msg) => (
        <AIMessage
          key={msg.id}
          message={msg}
          onSuggestionClick={onSuggestionClick}
          onActionClick={onActionClick}
        />
      ))}

      {/* Streaming message in progress */}
      {streamingText && (
        <div className="flex gap-2">
          <AIAvatar />
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm border border-gray-100 bg-white px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-gray-800 shadow-sm">
            {streamingText}
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#2A7BFF] align-text-bottom" />
          </div>
        </div>
      )}

      {/* Typing indicator (shown before streaming starts) */}
      {isTyping && !streamingText && <AITypingIndicator />}
    </div>
  );
}
