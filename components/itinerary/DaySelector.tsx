"use client";

import type { Itinerary } from "@/lib/types";

interface DaySelectorProps {
  itinerary: Itinerary;
  selectedDay: number | "all";
  onChange: (day: number | "all") => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function DaySelector({
  itinerary,
  selectedDay,
  onChange,
}: DaySelectorProps): React.ReactElement {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={[
          "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
          selectedDay === "all"
            ? "bg-[#2A7BFF] text-white shadow-sm"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
        ].join(" ")}
      >
        All Days
      </button>

      {itinerary.days.map((day, index) => (
        <button
          key={day.date}
          type="button"
          onClick={() => onChange(index)}
          className={[
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all",
            selectedDay === index
              ? "bg-[#2A7BFF] text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200",
          ].join(" ")}
        >
          Day {index + 1}
          <span className="ml-1.5 hidden text-xs opacity-70 sm:inline">{formatDate(day.date)}</span>
        </button>
      ))}
    </div>
  );
}

