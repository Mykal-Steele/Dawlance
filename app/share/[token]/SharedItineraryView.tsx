"use client";

import { useState } from "react";
import type { DayPlan, Activity, Itinerary } from "@/lib/types";

// ─── Minimal read-only itinerary view for shared links ─────────────────────

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

function ReadOnlyActivityCard({ activity }: { activity: Activity }): React.ReactElement {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">{formatTime(activity.time)}</span>
        <span className="text-xs text-gray-400">{formatDuration(activity.duration)}</span>
      </div>
      <p className="mt-1.5 font-bold text-gray-900">{activity.recommendation.name}</p>
      {activity.recommendation.description && (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {activity.recommendation.description}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {activity.culturalContext && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
            {activity.culturalContext}
          </span>
        )}
        {activity.attireSuggestion && (
          <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-700">
            {activity.attireSuggestion}
          </span>
        )}
      </div>
    </div>
  );
}

function ReadOnlyDaySection({
  day,
  dayNumber,
}: {
  day: DayPlan;
  dayNumber: number;
}): React.ReactElement {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2A7BFF] text-sm font-bold text-white">
          {dayNumber}
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
      <div className="space-y-3">
        {day.activities
          .filter((a) => a.type !== "empty")
          .map((activity) => (
            <ReadOnlyActivityCard key={activity.id} activity={activity} />
          ))}
      </div>
    </div>
  );
}

interface Props {
  itinerary: Itinerary;
}

export function SharedItineraryView({ itinerary }: Props): React.ReactElement {
  const [copied, setCopied] = useState(false);

  function handleCopy(): void {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[#6DD3B0]/20 px-3 py-0.5 text-xs font-semibold text-[#4CAF82]">
              Shared Itinerary
            </span>
          </div>
          <h1
            className="mb-1 text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            {itinerary.destination}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(itinerary.startDate + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            –{" "}
            {new Date(itinerary.endDate + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          {itinerary.summary && <p className="mt-2 text-sm text-gray-600">{itinerary.summary}</p>}

          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>

        {/* Days */}
        <div id="itinerary-export-root" className="space-y-10">
          {itinerary.days.map((day, index) => (
            <ReadOnlyDaySection key={day.date} day={day} dayNumber={index + 1} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 rounded-2xl bg-[#2A7BFF] p-6 text-center text-white">
          <p className="text-lg font-bold">Plan your own trip</p>
          <p className="mt-1 text-sm opacity-90">
            Create your personalized AI-generated itinerary in minutes
          </p>
          <a
            href="/"
            className="mt-4 inline-block rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-[#2A7BFF] hover:bg-gray-50"
          >
            Start Planning
          </a>
        </div>
      </div>
    </div>
  );
}
