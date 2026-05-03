"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useItineraryStore } from "@/lib/stores/itinerary-store";
import { useSelectionStore } from "@/lib/stores/selection-store";
import { useFormStore } from "@/lib/stores/form-store";
import type { Activity, Itinerary } from "@/lib/types";

// ─── Cloudant save helpers ────────────────────────────────────────────────────

async function createPlan(itinerary: Itinerary): Promise<{ id: string; rev: string }> {
  const res = await fetch("/api/plans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itinerary),
  });
  if (!res.ok) {
    const d = (await res.json()) as { error?: string };
    throw new Error(d.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<{ id: string; rev: string }>;
}

async function updatePlan(itinerary: Itinerary, rev: string): Promise<{ id: string; rev: string }> {
  const res = await fetch(`/api/plans/${encodeURIComponent(itinerary.id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itinerary, rev }),
  });
  if (!res.ok) {
    const d = (await res.json()) as { error?: string };
    throw new Error(d.error ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<{ id: string; rev: string }>;
}
import { DaySelector } from "./DaySelector";
import { DayTimeline } from "./DayTimeline";
import { ActivityEditModal } from "./ActivityEditModal";
import { RouteMap } from "./RouteMap";
import { ExportShareMenu } from "./ExportShareMenu";
import { TimelineView } from "./TimelineView";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EditTarget {
  dayIndex: number;
  activityIndex: number;
}

interface RecalculatePayload {
  currentItinerary: Itinerary;
  edit: {
    dayIndex: number;
    activityIndex: number;
    changes: Partial<Activity>;
    editType: "notes" | "time_shift" | "structural";
  };
}

interface RecalculateResponse {
  itinerary: Itinerary;
  changedDays: number[];
}

interface GenerateResponse {
  itinerary: Itinerary;
}

async function generateItinerary(payload: {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  preferences: unknown;
  selectedRecommendations: unknown[];
}): Promise<GenerateResponse> {
  const res = await fetch("/api/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { itinerary?: unknown; error?: string; details?: string };
  if (!res.ok) {
    throw new Error(data.error ?? `HTTP ${res.status}`);
  }
  return data as GenerateResponse;
}

async function recalculate(payload: RecalculatePayload): Promise<RecalculateResponse> {
  const res = await fetch("/api/itinerary/recalculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Failed to recalculate itinerary");
  }
  return res.json() as Promise<RecalculateResponse>;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function GeneratingSkeleton(): React.ReactElement {
  const messages = [
    "Arranging your activities…",
    "Optimizing routes…",
    "Adding cultural context…",
    "Finalising your plan…",
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 rounded-full bg-[#2A7BFF] opacity-70"
            style={{ animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite` }}
          />
        ))}
      </div>
      <p className="text-base font-semibold text-gray-700">{messages[msgIdx]}</p>
      <p className="mt-2 text-sm text-gray-400">Your AI is crafting the perfect trip</p>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ItineraryView({
  readOnly = false,
}: { readOnly?: boolean } = {}): React.ReactElement {
  const {
    itinerary,
    updateItinerary,
    editActivity,
    reorderActivities,
    removeActivity,
    fillEmptySlot,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useItineraryStore();
  const { selectedRecommendations } = useSelectionStore();
  const { destination, startDate, endDate, travelers, preferences } = useFormStore();

  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [recalcError, setRecalcError] = useState<string | null>(null);

  // Snapshot for optimistic rollback
  const rollbackRef = useRef<Itinerary | null>(null);

  // Cloudant save state
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const cloudantRevRef = useRef<string | null>(null);

  // ── Generate itinerary on mount if not yet available ───────────────────────
  // ── Save to Cloudant ──────────────────────────────────────────────────────
  const handleSaveToCloudant = useCallback(async (itin: Itinerary) => {
    setSaveStatus("saving");
    try {
      let result: { id: string; rev: string };
      if (cloudantRevRef.current) {
        result = await updatePlan(itin, cloudantRevRef.current);
      } else {
        result = await createPlan(itin);
      }
      cloudantRevRef.current = result.rev;
      setSaveStatus("saved");
      toast.success("Changes saved");
    } catch (err) {
      console.error("[Cloudant save]", err);
      setSaveStatus("error");
      toast.error("Save failed — retrying");
    }
  }, []);

  const {
    mutate: generate,
    isPending: isGenerating,
    error: generateError,
  } = useMutation({
    mutationFn: generateItinerary,
    onSuccess: (data) => {
      updateItinerary(data.itinerary);
      // Auto-save newly generated itinerary to Cloudant
      void handleSaveToCloudant(data.itinerary);
    },
  });

  useEffect(() => {
    if (itinerary || !destination || !startDate || !endDate || !preferences) return;
    if (selectedRecommendations.length === 0) return;

    generate({
      destination,
      startDate: new Date(startDate).toISOString().slice(0, 10),
      endDate: new Date(endDate).toISOString().slice(0, 10),
      travelers,
      preferences,
      selectedRecommendations,
    });
    // Only trigger once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Recalculation mutation ─────────────────────────────────────────────────
  const { mutate: recalc, isPending: isRecalculating } = useMutation({
    mutationFn: recalculate,
    onSuccess: (data) => {
      updateItinerary(data.itinerary);
      rollbackRef.current = null;
      setRecalcError(null);
      toast.success("Itinerary updated");
    },
    onError: (err) => {
      // Rollback optimistic update
      if (rollbackRef.current) {
        updateItinerary(rollbackRef.current);
        rollbackRef.current = null;
      }
      setRecalcError(err instanceof Error ? err.message : "Recalculation failed");
    },
  });

  // ── Edit handler ───────────────────────────────────────────────────────────
  const handleSaveEdit = useCallback(
    (
      dayIndex: number,
      activityIndex: number,
      changes: Partial<Activity>,
      editType: "notes" | "time_shift" | "structural"
    ) => {
      if (!itinerary) return;

      // Optimistic update
      rollbackRef.current = itinerary;
      editActivity(dayIndex, activityIndex, changes);
      setEditTarget(null);

      if (editType === "notes") {
        // Local-only, no API
        rollbackRef.current = null;
        return;
      }

      recalc({
        currentItinerary: itinerary,
        edit: { dayIndex, activityIndex, changes, editType },
      });
    },
    [itinerary, editActivity, recalc]
  );

  // ── Remove handler ────────────────────────────────────────────────────────
  const handleRemove = useCallback(
    (dayIndex: number, activityIndex: number) => {
      if (!itinerary) return;

      rollbackRef.current = itinerary;
      removeActivity(dayIndex, activityIndex);

      recalc({
        currentItinerary: itinerary,
        edit: {
          dayIndex,
          activityIndex,
          changes: {},
          editType: "structural",
        },
      });
    },
    [itinerary, removeActivity, recalc]
  );

  // ── Reorder handler ───────────────────────────────────────────────────────
  const handleReorder = useCallback(
    (dayIndex: number, fromIndex: number, toIndex: number) => {
      if (!itinerary) return;

      rollbackRef.current = itinerary;
      reorderActivities(dayIndex, fromIndex, toIndex);

      recalc({
        currentItinerary: itinerary,
        edit: {
          dayIndex,
          activityIndex: fromIndex,
          changes: {},
          editType: "structural",
        },
      });
    },
    [itinerary, reorderActivities, recalc]
  );

  // ── Keyboard shortcuts: Ctrl+Z / Ctrl+Shift+Z ────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (ctrlOrCmd && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        if (canUndo) undo();
      } else if (ctrlOrCmd && e.shiftKey && e.key === "z") {
        e.preventDefault();
        if (canRedo) redo();
      } else if (ctrlOrCmd && e.key === "y") {
        e.preventDefault();
        if (canRedo) redo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (isGenerating) return <GeneratingSkeleton />;

  if (generateError) {
    const msg = generateError instanceof Error ? generateError.message : "Unknown error";
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <p className="text-sm font-semibold text-red-700">Failed to generate itinerary</p>
        <p className="mt-1 rounded-lg bg-red-100 px-3 py-1.5 text-left font-mono text-xs text-red-600">
          {msg}
        </p>
        <button
          type="button"
          onClick={() => {
            if (!destination || !startDate || !endDate || !preferences) return;
            generate({
              destination,
              startDate: new Date(startDate).toISOString().slice(0, 10),
              endDate: new Date(endDate).toISOString().slice(0, 10),
              travelers,
              preferences,
              selectedRecommendations,
            });
          }}
          className="mt-4 rounded-xl bg-[#2A7BFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2A7BFF]/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-sm text-gray-400">
        Your itinerary will appear here once generated.
      </div>
    );
  }

  const activeDays =
    selectedDay === "all"
      ? itinerary.days.map((day, index) => ({ day, index }))
      : [{ day: itinerary.days[selectedDay], index: selectedDay }].filter(
          (d): d is { day: NonNullable<typeof d.day>; index: number } => !!d.day
        );

  const editTargetActivity =
    editTarget && itinerary.days[editTarget.dayIndex]?.activities[editTarget.activityIndex];

  return (
    <div className="space-y-6">
      {/* Header: summary + undo/redo + export */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{itinerary.summary}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {/* Export & Share */}
          {!readOnly && <ExportShareMenu itinerary={itinerary} />}
          {/* Cloudant save status */}
          {saveStatus === "saving" && (
            <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
              <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Saving…
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Saved
            </span>
          )}
          {saveStatus === "error" && (
            <button
              type="button"
              onClick={() => itinerary && void handleSaveToCloudant(itinerary)}
              className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
              title="Save failed — click to retry"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry save
            </button>
          )}
          {isRecalculating && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#2A7BFF]/10 px-3 py-1.5 text-xs font-medium text-[#2A7BFF]">
              <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Recalculating…
            </span>
          )}
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo || readOnly}
            title="Undo (Ctrl+Z)"
            className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Undo"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo || readOnly}
            title="Redo (Ctrl+Shift+Z)"
            className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Redo"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Recalc error banner */}
      {recalcError && (
        <div className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="flex-1 text-xs text-red-700">{recalcError} — edit was rolled back.</p>
          <button
            type="button"
            onClick={() => setRecalcError(null)}
            className="text-red-400 hover:text-red-600"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Day selector + view toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <DaySelector itinerary={itinerary} selectedDay={selectedDay} onChange={setSelectedDay} />
        </div>
        <div className="flex shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={[
              "px-3 py-1.5 text-xs font-medium transition-colors",
              viewMode === "list"
                ? "bg-white text-[#2A7BFF] shadow-sm"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
            aria-pressed={viewMode === "list"}
          >
            List
          </button>
          <button
            type="button"
            onClick={() => setViewMode("timeline")}
            className={[
              "px-3 py-1.5 text-xs font-medium transition-colors",
              viewMode === "timeline"
                ? "bg-white text-[#2A7BFF] shadow-sm"
                : "text-gray-500 hover:text-gray-700",
            ].join(" ")}
            aria-pressed={viewMode === "timeline"}
          >
            Timeline
          </button>
        </div>
      </div>

      {/* Timeline visualization */}
      {viewMode === "timeline" && <TimelineView days={itinerary.days} selectedDay={selectedDay} />}

      {/* Timeline + map side by side */}
      {viewMode === "list" && (
        <div id="itinerary-export-root" className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          {/* Timeline column */}
          <div className="space-y-8">
            {activeDays.map(({ day, index }) => (
              <div key={day.date}>
                {selectedDay === "all" && (
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A7BFF] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      {day.summary && <p className="text-xs text-gray-500">{day.summary}</p>}
                    </div>
                  </div>
                )}

                <DayTimeline
                  day={day}
                  dayIndex={index}
                  readOnly={readOnly}
                  onEdit={(dIdx, aIdx) => setEditTarget({ dayIndex: dIdx, activityIndex: aIdx })}
                  onRemove={handleRemove}
                  onReorder={handleReorder}
                  onFillSlot={fillEmptySlot}
                />
              </div>
            ))}
          </div>

          {/* Map column — sticky on desktop, always visible */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {(() => {
              const mapDayIndex = selectedDay === "all" ? 0 : selectedDay;
              const mapDay = itinerary.days[mapDayIndex];
              if (!mapDay) return null;
              const label =
                selectedDay === "all"
                  ? `Day 1 — ${new Date(mapDay.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`
                  : new Date(mapDay.date + "T00:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    });
              return (
                <div className="space-y-2">
                  {selectedDay === "all" && (
                    <p className="text-xs text-gray-400">Select a day above to see its route</p>
                  )}
                  <RouteMap day={mapDay} dayLabel={label} />
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editTarget && editTargetActivity && (
        <ActivityEditModal
          activity={editTargetActivity}
          dayIndex={editTarget.dayIndex}
          activityIndex={editTarget.activityIndex}
          isOpen
          isSaving={isRecalculating}
          onClose={() => setEditTarget(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

// Made with Bob
