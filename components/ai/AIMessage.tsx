"use client";

import type { AIMessage as AIMessageType, AIAction } from "@/lib/types";
import { AIAvatar } from "./AIAvatar";

interface AIMessageProps {
  message: AIMessageType;
  onSuggestionClick?: (suggestion: string) => void;
  onActionClick?: (action: AIAction) => void;
}

export function AIMessage({
  message,
  onSuggestionClick,
  onActionClick,
}: AIMessageProps): React.ReactElement {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex gap-2 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
      {isAssistant && <AIAvatar />}

      <div className={`flex max-w-[80%] flex-col gap-2 ${isAssistant ? "" : "items-end"}`}>
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isAssistant
              ? "rounded-tl-sm border border-gray-100 bg-white text-gray-800 shadow-sm"
              : "rounded-tr-sm bg-[#2A7BFF] text-white"
          }`}
        >
          {message.content}
        </div>

        {/* Suggestions */}
        {isAssistant && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick?.(s)}
                className="rounded-full border border-[#2A7BFF] px-3 py-1.5 text-xs text-[#2A7BFF] transition-colors hover:bg-[#2A7BFF] hover:text-white"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Action buttons */}
        {isAssistant && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.actions.map((action, i) => (
              <button
                key={i}
                onClick={() => onActionClick?.(action)}
                className="rounded-lg bg-[#6DD3B0] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#5bc4a1]"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="px-1 text-[10px] text-gray-400">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
