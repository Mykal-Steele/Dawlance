"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

// Use local date parts to avoid UTC timezone shift on midnight-local dates
// e.g. UTC+8: new Date(2026,4,27) = 2026-05-26T16:00Z → toISOString gives wrong day
function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

// Parse YYYY-MM-DD as noon local time so any timezone keeps the correct day
function parseDate(s: string): Date | undefined {
  if (!s) return undefined;
  return new Date(`${s}T12:00:00`);
}

function displayDate(d: Date | undefined): string {
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export interface DateRangePickerProps {
  startValue: string;
  endValue: string;
  onRangeChange: (start: string, end: string) => void;
  onStartBlur?: () => void;
  onEndBlur?: () => void;
  startError?: boolean;
  endError?: boolean;
  disabled?: boolean;
}

// react-day-picker v9 structure:
//   <td class="[day class] [modifier classes e.g. range_start]">
//     <button class="[day_button class only — no modifier classes]">27</button>
//   </td>
//
// To style button text inside a modifier td, use [&>button]: arbitrary selector.
// This generates ".modifier > button { ... }" which has specificity 0,1,1 —
// higher than ".day_button { ... }" at 0,1,0 — so it reliably overrides.

const DAY_BUTTON = [
  "h-9 w-9 rounded-lg text-sm font-medium text-gray-900 transition-colors",
  "hover:bg-[#2A7BFF]/10 hover:text-[#2A7BFF]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7BFF]/30",
].join(" ");

export function DateRangePicker({
  startValue,
  endValue,
  onRangeChange,
  onStartBlur,
  onEndBlur,
  startError,
  endError,
  disabled,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = parseDate(startValue);
  const endDate = parseDate(endValue);
  const nightCount =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  // Never auto-close on selection — user controls close by clicking outside
  const handleSelect = useCallback(
    (selected: DateRange | undefined) => {
      const from = selected?.from;
      const to = selected?.to;
      onRangeChange(from ? toDateString(from) : "", to ? toDateString(to) : "");
    },
    [onRangeChange]
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (startValue) onStartBlur?.();
    if (endValue) onEndBlur?.();
  }, [startValue, endValue, onStartBlur, onEndBlur]);

  // Close only on outside click
  useEffect(() => {
    if (!isOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen, handleClose]);

  const hasError = startError || endError;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          "flex h-12 w-full items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 text-left text-sm transition-colors",
          "focus:ring-2 focus:ring-[#2A7BFF]/20 focus:outline-none",
          isOpen && "border-[#2A7BFF] ring-2 ring-[#2A7BFF]/20",
          hasError && "border-red-500 ring-2 ring-red-500/20",
          disabled && "cursor-not-allowed opacity-50",
          !startDate && !endDate && "text-gray-400"
        )}
      >
        <svg
          className="h-4 w-4 shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" strokeWidth="2" />
          <line x1="16" x2="16" y1="2" y2="6" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" x2="8" y1="2" y2="6" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" x2="21" y1="10" y2="10" strokeWidth="2" />
        </svg>

        {startDate || endDate ? (
          <span className="flex items-center gap-1.5 font-medium text-gray-900">
            <span className={cn(startError && "text-red-600")}>
              {displayDate(startDate) || "Start"}
            </span>
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className={cn(endError && "text-red-600")}>{displayDate(endDate) || "End"}</span>
          </span>
        ) : (
          <span>Select travel dates</span>
        )}

        <svg
          className={cn(
            "ml-auto h-4 w-4 shrink-0 text-gray-400 transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Calendar popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Choose travel dates"
          className="absolute top-14 left-0 z-50 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl"
        >
          <p className="mb-3 text-center text-xs font-medium text-gray-500">
            {!startDate
              ? "Select your start date"
              : !endDate
                ? "Now pick your end date"
                : `${nightCount} night${nightCount !== 1 ? "s" : ""} · Click any date to change`}
          </p>

          <DayPicker
            mode="range"
            selected={{ from: startDate, to: endDate }}
            onSelect={handleSelect}
            disabled={{ before: today }}
            numberOfMonths={2}
            classNames={{
              months: "flex flex-col sm:flex-row gap-8",
              month: "space-y-3",
              // relative so the absolute-positioned nav stays within each month
              month_caption: "relative flex items-center justify-center py-2",
              caption_label: "text-sm font-semibold text-gray-900",
              nav: "absolute inset-x-0 top-1.5 flex items-center justify-between",
              button_previous: [
                "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
                "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              ].join(" "),
              button_next: [
                "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
                "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              ].join(" "),
              month_grid: "w-full border-collapse",
              weekdays: "flex",
              weekday: "w-9 text-center text-[11px] font-semibold text-gray-400 pb-1",
              week: "flex",
              // p-0 removes cell padding so range_middle bg spans the full cell width
              day: "relative h-9 w-9 p-0 text-center",
              day_button: DAY_BUTTON,

              // `selected` fires on all range days — keep empty to avoid conflicts
              selected: "",

              // Modifier classes go on <td>; [&>button] targets the inner <button>
              // specificity: .range_start > button = 0,1,1 > .day_button = 0,1,0 ✓
              range_start:
                "[&>button]:bg-[#2A7BFF] [&>button]:text-white [&>button]:rounded-xl [&>button]:hover:bg-[#1a6be0] [&>button]:hover:text-white",
              range_end:
                "[&>button]:bg-[#2A7BFF] [&>button]:text-white [&>button]:rounded-xl [&>button]:hover:bg-[#1a6be0] [&>button]:hover:text-white",
              range_middle:
                "bg-[#2A7BFF]/10 [&>button]:text-[#2A7BFF] [&>button]:rounded-none [&>button]:hover:bg-[#2A7BFF]/20 [&>button]:hover:text-[#2A7BFF]",

              today: "[&>button]:font-bold [&>button]:text-[#2A7BFF]",
              disabled: "opacity-40 pointer-events-none",
              hidden: "invisible",
              outside: "opacity-30 pointer-events-none",
            }}
          />

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">
              {nightCount > 0
                ? `${nightCount} night${nightCount !== 1 ? "s" : ""}`
                : "Select dates above"}
            </span>
            {(startDate ?? endDate) && (
              <button
                type="button"
                onClick={() => onRangeChange("", "")}
                className="text-xs text-gray-400 underline transition-colors hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
