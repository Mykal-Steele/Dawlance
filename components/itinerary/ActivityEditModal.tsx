"use client";

import { useState } from "react";
import type { Activity } from "@/lib/types";

interface ActivityEditModalProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  isOpen: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (
    dayIndex: number,
    activityIndex: number,
    changes: Partial<Activity>,
    editType: "notes" | "time_shift" | "structural"
  ) => void;
}

function classifyChanges(
  original: Activity,
  changes: Partial<Activity>
): "notes" | "time_shift" | "structural" {
  const keys = Object.keys(changes) as Array<keyof Activity>;
  const structuralKeys: Array<keyof Activity> = ["type", "duration", "recommendation"];
  const noteKeys: Array<keyof Activity> = ["notes", "culturalContext", "attireSuggestion"];

  if (keys.every((k) => noteKeys.includes(k))) return "notes";
  if (keys.some((k) => structuralKeys.includes(k))) return "structural";
  if (keys.includes("time")) {
    const [origH, origM] = original.time.split(":").map(Number);
    const newTime = changes.time ?? original.time;
    const [newH, newM] = newTime.split(":").map(Number);
    const origMins = (origH ?? 0) * 60 + (origM ?? 0);
    const newMins = (newH ?? 0) * 60 + (newM ?? 0);
    return Math.abs(newMins - origMins) <= 30 ? "time_shift" : "structural";
  }
  return "notes";
}

export function ActivityEditModal({
  activity,
  dayIndex,
  activityIndex,
  isOpen,
  isSaving,
  onClose,
  onSave,
}: ActivityEditModalProps): React.ReactElement | null {
  const [time, setTime] = useState(activity.time);
  const [duration, setDuration] = useState(activity.duration);
  const [notes, setNotes] = useState(activity.notes ?? "");
  const [attireSuggestion, setAttireSuggestion] = useState(activity.attireSuggestion);

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();

    const changes: Partial<Activity> = {};
    if (time !== activity.time) changes.time = time;
    if (duration !== activity.duration) changes.duration = duration;
    if (notes !== (activity.notes ?? "")) changes.notes = notes;
    if (attireSuggestion !== activity.attireSuggestion) changes.attireSuggestion = attireSuggestion;

    if (Object.keys(changes).length === 0) {
      onClose();
      return;
    }

    const editType = classifyChanges(activity, changes);
    onSave(dayIndex, activityIndex, changes, editType);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit activity"
      aria-describedby="activity-edit-desc"
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Edit Activity
            </h2>
            <p id="activity-edit-desc" className="mt-0.5 max-w-xs truncate text-sm text-gray-500">
              {activity.recommendation.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Time + Duration row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-time" className="mb-1 block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                id="edit-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="edit-duration"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Duration (min)
              </label>
              <input
                id="edit-duration"
                type="number"
                min={15}
                max={480}
                step={15}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 focus:outline-none"
              />
            </div>
          </div>

          {/* Attire */}
          <div>
            <label htmlFor="edit-attire" className="mb-1 block text-sm font-medium text-gray-700">
              Attire Suggestion
            </label>
            <input
              id="edit-attire"
              type="text"
              value={attireSuggestion}
              onChange={(e) => setAttireSuggestion(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 focus:outline-none"
              placeholder="e.g. Smart casual"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="edit-notes" className="mb-1 block text-sm font-medium text-gray-700">
              Personal Notes
            </label>
            <textarea
              id="edit-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 focus:outline-none"
              placeholder="Any personal notes for this activity..."
            />
          </div>

          {/* Edit type hint */}
          {(time !== activity.time || duration !== activity.duration) && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
              ⚡ Time or duration changes may trigger AI recalculation to keep your day flowing
              smoothly.
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-[#2A7BFF] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2A7BFF]/90 disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Made with Bob
