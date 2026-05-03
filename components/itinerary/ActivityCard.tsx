"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useItineraryStore } from "@/lib/stores/itinerary-store";
import type { Activity } from "@/lib/types";

interface ActivityCardProps {
  activity: Activity;
  dayIndex: number;
  activityIndex: number;
  isDragging?: boolean;
  readOnly?: boolean;
  onEdit: (dayIndex: number, activityIndex: number) => void;
  onRemove: (dayIndex: number, activityIndex: number) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TYPE_COLORS: Record<Activity["type"], string> = {
  attraction: "bg-[#2A7BFF]/10 text-[#2A7BFF]",
  meal: "bg-[#6DD3B0]/10 text-[#4CAF82]",
  rest: "bg-gray-100 text-gray-500",
  travel: "bg-[#FF8C42]/10 text-[#FF8C42]",
  empty: "bg-gray-50 text-gray-300",
};

const TYPE_LABELS: Record<Activity["type"], string> = {
  attraction: "Attraction",
  meal: "Meal",
  rest: "Rest",
  travel: "Transit",
  empty: "Free",
};

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h ?? 0;
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${String(m ?? 0).padStart(2, "0")} ${ampm}`;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function ActivityCard({
  activity,
  dayIndex,
  activityIndex,
  isDragging = false,
  readOnly = false,
  onEdit,
  onRemove,
  dragHandleProps,
}: ActivityCardProps): React.ReactElement {
  const { recommendation } = activity;
  const isHighlighted = useItineraryStore((s) => s.highlightedActivityIds.has(activity.id));

  return (
    <div
      className={[
        "group relative rounded-2xl border bg-white shadow-sm transition-all",
        isDragging
          ? "scale-[1.02] border-[#2A7BFF]/40 shadow-lg"
          : "border-gray-100 hover:border-gray-200 hover:shadow-md",
        isHighlighted ? "animate-ai-highlight" : "",
      ].join(" ")}
    >
      {/* Time badge + drag handle row */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          {/* Drag handle — hidden in readOnly mode */}
          {!readOnly && (
            <div
              {...dragHandleProps}
              className="cursor-grab touch-none rounded-md p-1 text-gray-300 hover:text-gray-500 active:cursor-grabbing"
              aria-label="Drag to reorder"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6-12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm0 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
            </div>
          )}
          <span className="text-sm font-semibold text-gray-900">{formatTime(activity.time)}</span>
          <span className="text-xs text-gray-400">·</span>
          <span className="text-xs text-gray-500">{formatDuration(activity.duration)}</span>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_COLORS[activity.type]}`}
        >
          {TYPE_LABELS[activity.type]}
        </span>
      </div>

      {/* Card body */}
      <div className="flex gap-4 px-4 pt-3 pb-4">
        {/* Image */}
        {recommendation.imageUrl && (
          <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={recommendation.imageUrl}
              alt={recommendation.name}
              fill
              className="object-cover"
              sizes="96px"
              placeholder={recommendation.blurDataURL ? "blur" : "empty"}
              blurDataURL={recommendation.blurDataURL}
            />
          </div>
        )}

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-gray-900">{recommendation.name}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{recommendation.description}</p>

          {/* Cultural context + attire */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {activity.culturalContext && (
              <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                <span>🏛</span>
                <span className="line-clamp-1">{activity.culturalContext}</span>
              </span>
            )}
            {activity.attireSuggestion && (
              <span className="flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
                <span>👕</span>
                <span>{activity.attireSuggestion}</span>
              </span>
            )}
          </div>

          {/* Notes */}
          {activity.notes && (
            <p className="mt-1.5 text-xs text-gray-400 italic">"{activity.notes}"</p>
          )}
        </div>
      </div>

      {/* Travel time to next */}
      {activity.travelTime !== undefined && activity.travelTime > 0 && (
        <div className="mx-4 mb-3 flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-1.5">
          <svg
            className="h-3.5 w-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs text-gray-500">
            {formatDuration(activity.travelTime)} to next stop
          </span>
        </div>
      )}

      {/* Edit / Remove — visible on hover, hidden in readOnly mode */}
      {!readOnly && (
        <div className="absolute top-3 right-3 hidden gap-1 group-hover:flex">
          <button
            type="button"
            onClick={() => onEdit(dayIndex, activityIndex)}
            className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-[#2A7BFF] hover:text-white hover:ring-[#2A7BFF]"
            aria-label="Edit activity"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove(dayIndex, activityIndex);
              toast.success(`Removed ${recommendation.name}`);
            }}
            className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-red-500 hover:text-white hover:ring-red-500"
            aria-label="Remove activity"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

// Made with Bob
