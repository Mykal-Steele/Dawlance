/// <reference types="@types/google.maps" />
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { Activity } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmptyActivitySlotProps {
  slotId: string;
  time: string;
  duration: number;
  dayIndex: number;
  onFill: (dayIndex: number, slotId: string, activity: Activity) => void;
}

// ─── Maps init (once) ────────────────────────────────────────────────────────

let mapsConfigured = false;
function ensureMapsConfigured(): void {
  if (mapsConfigured) return;
  setOptions({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
  } as Parameters<typeof setOptions>[0]);
  mapsConfigured = true;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyActivitySlot({
  slotId,
  time,
  duration,
  dayIndex,
  onFill,
}: EmptyActivitySlotProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Format 24h time to 12h display
  function formatTime(t: string): string {
    const [hStr, mStr] = t.split(":");
    const h = parseInt(hStr ?? "0", 10);
    const m = mStr ?? "00";
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${m} ${period}`;
  }

  // Initialise Places Autocomplete when expanded
  useEffect(() => {
    if (!isExpanded || !inputRef.current) return;
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) return;

    let cancelled = false;

    ensureMapsConfigured();
    importLibrary("places")
      .then(() => {
        if (cancelled || !inputRef.current) return;
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment"],
          fields: ["name", "formatted_address", "geometry", "types"],
        });

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (!place?.geometry?.location || !place.name) return;

          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          // Determine activity type from Google place types
          const placeTypes = place.types ?? [];
          let activityType: Activity["type"] = "attraction";
          if (
            placeTypes.some((t: string) =>
              ["restaurant", "food", "cafe", "bar", "bakery", "meal_takeaway"].includes(t)
            )
          ) {
            activityType = "meal";
          }

          const activity: Activity = {
            id: slotId,
            time,
            duration,
            type: activityType,
            isUserAdded: true,
            recommendation: {
              id: `user-${Date.now()}`,
              name: place.name,
              description: place.formatted_address ?? "",
              category: activityType === "meal" ? "restaurant" : "attraction",
              estimatedDuration: duration,
              priceRange: 2,
              location: {
                address: place.formatted_address ?? "",
                coordinates: { lat, lng },
              },
              openingHours: "",
              culturalNotes: "",
              imageUrl: "",
              tags: [],
            },
            culturalContext: "",
            attireSuggestion: "",
          };

          onFill(dayIndex, slotId, activity);
          setIsExpanded(false);
          setInputValue("");
        });

        // Focus after autocomplete is ready
        inputRef.current.focus();
      })
      .catch(() => {
        // Places API failed to load — just focus the input for manual entry
        if (!cancelled && inputRef.current) inputRef.current.focus();
      });

    return () => {
      cancelled = true;
    };
  }, [isExpanded, dayIndex, slotId, time, duration, onFill]);

  // Manual submission (no Places match selected)
  const handleManualSubmit = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const activity: Activity = {
      id: slotId,
      time,
      duration,
      type: "attraction",
      isUserAdded: true,
      recommendation: {
        id: `user-${Date.now()}`,
        name: trimmed,
        description: "",
        category: "attraction",
        estimatedDuration: duration,
        priceRange: 2,
        location: { address: "", coordinates: { lat: 0, lng: 0 } },
        openingHours: "",
        culturalNotes: "",
        imageUrl: "",
        tags: [],
      },
      culturalContext: "",
      attireSuggestion: "",
    };

    onFill(dayIndex, slotId, activity);
    setIsExpanded(false);
    setInputValue("");
  }, [inputValue, slotId, time, duration, dayIndex, onFill]);

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="group w-full rounded-2xl border-2 border-dashed border-gray-200 px-4 py-4 text-left transition-all hover:border-[#2A7BFF] hover:bg-blue-50/40"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors group-hover:bg-[#2A7BFF]/10 group-hover:text-[#2A7BFF]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-medium text-gray-500 transition-colors group-hover:text-[#2A7BFF]">
              {formatTime(time)} · Free slot
            </p>
            <p className="text-xs text-gray-400">Add your own activity, or ask the AI assistant</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-[#2A7BFF]/40 bg-blue-50/40 px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[#2A7BFF]">{formatTime(time)} · Add activity</p>
        <button
          onClick={() => {
            setIsExpanded(false);
            setInputValue("");
          }}
          className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleManualSubmit();
            if (e.key === "Escape") {
              setIsExpanded(false);
              setInputValue("");
            }
          }}
          placeholder="Search for a place…"
          className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20"
        />
        <button
          onClick={handleManualSubmit}
          disabled={!inputValue.trim()}
          className="rounded-xl bg-[#2A7BFF] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Add
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Start typing to search Google Maps, or press Enter to add manually
      </p>
    </div>
  );
}

// Made with Bob
