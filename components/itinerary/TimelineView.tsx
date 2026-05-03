"use client";

import { useState } from "react";
import type { DayPlan, Activity } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAY_START_HOUR = 6; // 06:00
const DAY_END_HOUR = 24; // 24:00
const TOTAL_MINUTES = (DAY_END_HOUR - DAY_START_HOUR) * 60;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return ((h ?? 0) - DAY_START_HOUR) * 60 + (m ?? 0);
}

function minutesToPercent(minutes: number): number {
  return Math.max(0, Math.min(100, (minutes / TOTAL_MINUTES) * 100));
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const hour = h ?? 0;
  const ampm = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${String(m ?? 0).padStart(2, "0")} ${ampm}`;
}

const TYPE_COLORS: Record<Activity["type"], string> = {
  attraction: "bg-[#2A7BFF] border-[#2A7BFF]",
  meal: "bg-[#FF8C42] border-[#FF8C42]",
  rest: "bg-[#6DD3B0] border-[#6DD3B0]",
  travel: "bg-gray-300 border-gray-300",
  empty: "bg-gray-100 border-dashed border-gray-300",
};

const TYPE_LABEL_COLORS: Record<Activity["type"], string> = {
  attraction: "text-white",
  meal: "text-white",
  rest: "text-white",
  travel: "text-gray-600",
  empty: "text-gray-400",
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────

interface TooltipData {
  activity: Activity;
  x: number;
}

function ActivityTooltip({ data }: { data: TooltipData }): React.ReactElement {
  const { activity } = data;
  return (
    <div
      className="pointer-events-none absolute bottom-full z-50 mb-2 w-56 rounded-xl border border-gray-100 bg-white p-3 shadow-xl"
      style={{ left: `${data.x}%`, transform: "translateX(-50%)" }}
    >
      <p className="text-xs font-bold text-gray-900">{activity.recommendation.name}</p>
      <p className="mt-0.5 text-xs text-gray-500">
        {formatTime(activity.time)} · {activity.duration}min
      </p>
      {activity.culturalContext && (
        <p className="mt-1 text-xs text-amber-700">{activity.culturalContext}</p>
      )}
    </div>
  );
}

// ─── Single activity block ────────────────────────────────────────────────────

function ActivityBlock({ activity }: { activity: Activity }): React.ReactElement {
  const [hovered, setHovered] = useState(false);
  const startMinutes = timeToMinutes(activity.time);
  const leftPct = minutesToPercent(startMinutes);
  const widthPct = minutesToPercent(activity.duration);
  const colorClass = TYPE_COLORS[activity.type];
  const textClass = TYPE_LABEL_COLORS[activity.type];

  if (activity.type === "empty") return <></>;

  return (
    <div
      className={`absolute top-0 h-full rounded-lg border ${colorClass} flex cursor-default items-center overflow-hidden transition-opacity hover:opacity-90`}
      style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 1)}%` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {widthPct > 4 && (
        <p
          className={`truncate px-1.5 text-[10px] leading-tight font-semibold ${textClass}`}
          title={activity.recommendation.name}
        >
          {activity.recommendation.name}
        </p>
      )}
      {hovered && <ActivityTooltip data={{ activity, x: leftPct + widthPct / 2 }} />}
    </div>
  );
}

// ─── Hour tick marks ──────────────────────────────────────────────────────────

function HourTicks(): React.ReactElement {
  const ticks: React.ReactElement[] = [];
  for (let hour = DAY_START_HOUR; hour <= DAY_END_HOUR; hour += 2) {
    const pct = minutesToPercent((hour - DAY_START_HOUR) * 60);
    ticks.push(
      <div
        key={hour}
        className="absolute flex flex-col items-center"
        style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
      >
        <div className="h-2 w-px bg-gray-200" />
        <span className="mt-0.5 text-[10px] text-gray-400">
          {hour === 24 ? "12a" : hour < 12 ? `${hour}a` : hour === 12 ? "12p" : `${hour - 12}p`}
        </span>
      </div>
    );
  }
  return <>{ticks}</>;
}

// ─── Single day row ───────────────────────────────────────────────────────────

function DayRow({ day, dayNumber }: { day: DayPlan; dayNumber: number }): React.ReactElement {
  const dateLabel = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-start gap-3">
      {/* Day label */}
      <div className="w-20 shrink-0 pt-2 text-right">
        <span className="text-xs font-semibold text-[#2A7BFF]">Day {dayNumber}</span>
        <br />
        <span className="text-[10px] text-gray-400">{dateLabel}</span>
      </div>

      {/* Timeline track */}
      <div className="relative flex-1">
        {/* Track background */}
        <div className="relative h-8 overflow-visible rounded-lg bg-gray-100">
          {day.activities.map((activity) => (
            <ActivityBlock key={activity.id} activity={activity} />
          ))}
        </div>

        {/* Hour ticks below track */}
        <div className="relative mt-1 h-5">
          <HourTicks />
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface TimelineViewProps {
  days: DayPlan[];
  selectedDay: number | "all";
}

export function TimelineView({ days, selectedDay }: TimelineViewProps): React.ReactElement {
  const visibleDays =
    selectedDay === "all"
      ? days.map((day, index) => ({ day, index }))
      : [{ day: days[selectedDay], index: selectedDay }].filter(
          (d): d is { day: NonNullable<typeof d.day>; index: number } => !!d.day
        );

  return (
    <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-gray-700">Timeline View</h3>
        <p className="text-xs text-gray-400">Hover over blocks to see activity details</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {(["attraction", "meal", "rest", "travel"] as const).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`h-3 w-3 rounded-sm ${TYPE_COLORS[type].split(" ")[0]}`} />
            <span className="text-xs text-gray-500 capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Day rows */}
      <div className="space-y-6">
        {visibleDays.map(({ day, index }) => (
          <DayRow key={day.date} day={day} dayNumber={index + 1} />
        ))}
      </div>
    </div>
  );
}
