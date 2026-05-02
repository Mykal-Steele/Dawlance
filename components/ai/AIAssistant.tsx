"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAIStore } from "@/lib/stores/ai-store";
import { useItineraryStore } from "@/lib/stores/itinerary-store";
import { useFormStore } from "@/lib/stores/form-store";
import { sendChatMessage, type AIChatContext } from "@/lib/api/ai";
import type { AIAction } from "@/lib/types";
import { AIChat } from "./AIChat";
import { AIQuickActions } from "./AIQuickActions";
import { AIInput } from "./AIInput";

interface AIAssistantProps {
  currentStep?: AIChatContext["currentStep"];
}

export function AIAssistant({ currentStep = "itinerary" }: AIAssistantProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  const [streamingText, setStreamingText] = useState("");

  const { messages, isTyping, currentInteractionId, addMessage, setTyping, setInteractionId } =
    useAIStore();
  const { itinerary, editActivity } = useItineraryStore();
  const { destination, preferences, startDate, endDate, travelers } = useFormStore();

  // Build context from store state
  const buildContext = useCallback((): AIChatContext => {
    return {
      currentStep,
      destination: destination || undefined,
      itinerary: itinerary ?? undefined,
      preferences: preferences ?? undefined,
      startDate: startDate ? startDate.toISOString().split("T")[0] : undefined,
      endDate: endDate ? endDate.toISOString().split("T")[0] : undefined,
      travelers: travelers ?? undefined,
    };
  }, [currentStep, destination, itinerary, preferences, startDate, endDate, travelers]);

  // React Query mutation — handles streaming internally
  const chatMutation = useMutation({
    mutationFn: async (userMessage: string) => {
      const response = await sendChatMessage(
        {
          message: userMessage,
          context: buildContext(),
          previousInteractionId: currentInteractionId,
        },
        (chunk) => setStreamingText((prev) => prev + chunk)
      );
      return response;
    },
    onSuccess: (response) => {
      const id = `ai-${Date.now()}`;
      addMessage({
        id,
        role: "assistant",
        content: response.message,
        timestamp: new Date().toISOString(),
        suggestions: response.suggestions,
        actions: response.actions,
      });
      if (response.interactionId) {
        setInteractionId(response.interactionId);
      }
      setTyping(false);
      setStreamingText("");
    },
    onError: (error) => {
      const errMsg = error instanceof Error ? error.message : "Something went wrong.";
      addMessage({
        id: `ai-err-${Date.now()}`,
        role: "assistant",
        content: `Sorry, I ran into an issue: ${errMsg} Please try again.`,
        timestamp: new Date().toISOString(),
      });
      setTyping(false);
      setStreamingText("");
    },
  });

  function handleSend(message: string): void {
    if (chatMutation.isPending) return;

    // Add user message to store immediately
    addMessage({
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
    });

    setTyping(true);
    setStreamingText("");
    chatMutation.mutate(message);
  }

  function handleSuggestionClick(suggestion: string): void {
    handleSend(suggestion);
  }

  function handleActionClick(action: AIAction): void {
    // Wire AI actions to ItineraryStore updates
    if (action.type === "adjust_time") {
      const payload = action.payload as {
        dayIndex?: number;
        activityIndex?: number;
        time?: string;
      } | null;
      if (
        payload &&
        typeof payload.dayIndex === "number" &&
        typeof payload.activityIndex === "number" &&
        typeof payload.time === "string"
      ) {
        editActivity(payload.dayIndex, payload.activityIndex, { time: payload.time });
      }
    }
    // For other action types, send a follow-up chat message describing the intent
    handleSend(action.label);
  }

  // Proactive greeting on itinerary load
  useEffect(() => {
    if (currentStep === "itinerary" && itinerary && messages.length === 0) {
      const days = itinerary.days;
      let proactiveMsg = `Looks like a great plan for ${itinerary.destination}! 🎉`;

      // Find a gap between activities to suggest a cafe
      if (days[0]?.activities?.length >= 2) {
        const first = days[0].activities[0];
        const second = days[0].activities[1];
        proactiveMsg += ` I noticed you have some time between "${first.recommendation.name}" and "${second.recommendation.name}". Want me to find a cozy cafe nearby?`;
      } else {
        proactiveMsg +=
          " I'm here to help with any questions, suggest alternatives, or optimize your route. What would you like to know?";
      }

      addMessage({
        id: `ai-proactive-${Date.now()}`,
        role: "assistant",
        content: proactiveMsg,
        timestamp: new Date().toISOString(),
        suggestions: ["Find a nearby cafe", "Optimize my route", "Tell me about the culture"],
      });
    }
    // Run only when itinerary is first loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary?.id]);

  // ─── Draggable + resizable panel state ────────────────────────────────────

  const panelRef = useRef<HTMLDivElement>(null);

  // Move drag
  const dragState = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  // Resize drag
  type ResizeEdge = "e" | "s" | "se" | "sw" | "w" | "ne" | "nw" | "n";
  const resizeState = useRef({
    active: false,
    edge: "se" as ResizeEdge,
    startX: 0,
    startY: 0,
    originW: 0,
    originH: 0,
    originX: 0,
    originY: 0,
  });

  const MIN_W = 280;
  const MIN_H = 300;
  const MAX_W = 640;
  const MAX_H = 800;

  const [position, setPosition] = useState<{ x: number; y: number } | null>(() => {
    if (typeof window === "undefined") return null;
    return { x: window.innerWidth - 400, y: window.innerHeight - 536 };
  });
  const [size, setSize] = useState({ w: 384, h: 500 });

  // ── Move handlers ──
  function handleDragStart(e: React.PointerEvent<HTMLDivElement>): void {
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: position?.x ?? 0,
      originY: position?.y ?? 0,
    };
  }

  function handleDragMove(e: React.PointerEvent<HTMLDivElement>): void {
    if (!dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    const maxX = window.innerWidth - size.w;
    const maxY = window.innerHeight - (panelRef.current?.offsetHeight ?? size.h);
    setPosition({
      x: Math.max(0, Math.min(maxX, dragState.current.originX + dx)),
      y: Math.max(0, Math.min(maxY, dragState.current.originY + dy)),
    });
  }

  function handleDragEnd(): void {
    dragState.current.active = false;
  }

  // ── Resize handlers ──
  function handleResizeStart(edge: ResizeEdge, e: React.PointerEvent<HTMLDivElement>): void {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeState.current = {
      active: true,
      edge,
      startX: e.clientX,
      startY: e.clientY,
      originW: size.w,
      originH: size.h,
      originX: position?.x ?? 0,
      originY: position?.y ?? 0,
    };
  }

  function handleResizeMove(e: React.PointerEvent<HTMLDivElement>): void {
    if (!resizeState.current.active) return;
    const { edge, startX, startY, originW, originH, originX, originY } = resizeState.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newW = originW;
    let newH = originH;
    let newX = originX;
    let newY = originY;

    if (edge.includes("e")) newW = Math.min(MAX_W, Math.max(MIN_W, originW + dx));
    if (edge.includes("w")) {
      newW = Math.min(MAX_W, Math.max(MIN_W, originW - dx));
      newX = originX + (originW - newW);
    }
    if (edge.includes("s")) newH = Math.min(MAX_H, Math.max(MIN_H, originH + dy));
    if (edge.includes("n")) {
      newH = Math.min(MAX_H, Math.max(MIN_H, originH - dy));
      newY = originY + (originH - newH);
    }

    setSize({ w: newW, h: newH });
    if (edge.includes("w") || edge.includes("n")) setPosition({ x: newX, y: newY });
  }

  function handleResizeEnd(): void {
    resizeState.current.active = false;
  }

  if (!position) return <></>;

  // Resize handle style helpers
  const edgeBase = "absolute z-10 select-none";
  const handleH = `${edgeBase} top-2 bottom-2 w-2 cursor-ew-resize`;
  const handleV = `${edgeBase} left-2 right-2 h-2 cursor-ns-resize`;
  const handleC = `${edgeBase} w-3 h-3 cursor-nwse-resize`;
  const handleC2 = `${edgeBase} w-3 h-3 cursor-nesw-resize`;

  return (
    <div
      ref={panelRef}
      style={{ left: position.x, top: position.y, width: size.w, height: isOpen ? size.h : 56 }}
      className="fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
    >
      {/* ── Resize handles (visible when open) ── */}
      {isOpen && (
        <>
          <div
            className={`${handleH} right-0`}
            onPointerDown={(e) => handleResizeStart("e", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleH} left-0`}
            onPointerDown={(e) => handleResizeStart("w", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleV} bottom-0`}
            onPointerDown={(e) => handleResizeStart("s", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleV} top-0`}
            onPointerDown={(e) => handleResizeStart("n", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleC} right-0 bottom-0`}
            onPointerDown={(e) => handleResizeStart("se", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleC2} bottom-0 left-0`}
            onPointerDown={(e) => handleResizeStart("sw", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleC2} top-0 right-0`}
            onPointerDown={(e) => handleResizeStart("ne", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
          <div
            className={`${handleC} top-0 left-0`}
            onPointerDown={(e) => handleResizeStart("nw", e)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
          />
        </>
      )}
      {/* Drag handle / Header */}
      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
        onPointerCancel={handleDragEnd}
        className="flex h-14 shrink-0 cursor-grab items-center justify-between border-b border-gray-100 bg-linear-to-r from-[#2A7BFF] to-[#6DD3B0] px-4 select-none active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
            <span className="text-sm text-white">✈</span>
          </div>
          <span
            className="text-sm font-semibold text-white"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            AI Travel Assistant
          </span>
          {isTyping && <span className="text-xs text-white/70">typing…</span>}
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Minimize assistant" : "Expand assistant"}
          className="p-1 text-white/80 transition-colors hover:text-white"
        >
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "" : "rotate-180"}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 9l-7 7-7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Body (hidden when collapsed) */}
      {isOpen && (
        <>
          <AIChat
            messages={messages}
            isTyping={isTyping}
            streamingText={streamingText}
            onSuggestionClick={handleSuggestionClick}
            onActionClick={handleActionClick}
          />
          <AIQuickActions onActionClick={handleSend} disabled={chatMutation.isPending} />
          <AIInput onSend={handleSend} disabled={chatMutation.isPending} />
        </>
      )}
    </div>
  );
}
