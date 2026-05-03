"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Recommendation } from "@/lib/types";

interface RecommendationCardProps {
  recommendation: Recommendation;
  isSelected: boolean;
  onToggle: (rec: Recommendation) => void;
  /** If set, the card is visually grayed out and shows this reason as a tooltip on hover. */
  disabledReason?: string;
}

const CATEGORY_LABELS: Record<Recommendation["category"], string> = {
  attraction: "Attraction",
  hotel: "Hotel",
  restaurant: "Restaurant",
};

const CATEGORY_COLORS: Record<Recommendation["category"], string> = {
  attraction: "bg-[#2A7BFF]/90 text-white",
  hotel: "bg-[#6DD3B0]/90 text-white",
  restaurant: "bg-[#FF8C42]/90 text-white",
};

function PriceRange({ value }: { value: 1 | 2 | 3 }) {
  return (
    <span className="text-sm font-medium text-gray-500">
      {"$".repeat(value)}
      <span className="text-gray-300">{"$".repeat(3 - value)}</span>
    </span>
  );
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function RecommendationCardInner({
  recommendation: rec,
  isSelected,
  onToggle,
  disabledReason,
}: RecommendationCardProps) {
  const handleToggle = useCallback(() => onToggle(rec), [onToggle, rec]);

  const fallbackSrc =
    rec.blurDataURL ??
    `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=`;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-lg",
        isSelected && "ring-2 ring-[#2A7BFF] ring-offset-2",
        disabledReason && !isSelected && "opacity-60"
      )}
    >
      {/* Disabled reason tooltip — shown on hover */}
      {disabledReason && !isSelected && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
          <div className="mx-4 rounded-xl bg-gray-900/90 px-3 py-2 text-center text-xs leading-relaxed text-white shadow-xl">
            ⚠️ {disabledReason}
          </div>
        </div>
      )}
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={rec.imageUrl || fallbackSrc}
          alt={rec.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder={rec.blurDataURL ? "blur" : "empty"}
          blurDataURL={rec.blurDataURL}
          loading="lazy"
        />

        {/* Category badge — top left */}
        <span
          className={cn(
            "absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm",
            CATEGORY_COLORS[rec.category]
          )}
        >
          {CATEGORY_LABELS[rec.category]}
        </span>

        {/* Selection toggle — top right */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isSelected ? `Remove ${rec.name} from trip` : `Add ${rec.name} to trip`}
          className={cn(
            "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full transition-all",
            isSelected
              ? "bg-[#2A7BFF] text-white shadow-md"
              : disabledReason
                ? "bg-white/90 text-[#FF8C42] shadow-sm hover:bg-white"
                : "bg-white/90 text-gray-400 shadow-sm hover:bg-white hover:text-[#2A7BFF]"
          )}
        >
          {isSelected ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : disabledReason ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="mb-1 line-clamp-1 font-semibold text-gray-900">{rec.name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-500">{rec.description}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {formatDuration(rec.estimatedDuration)}
            </span>
          </div>
          <PriceRange value={rec.priceRange} />
        </div>

        {/* Hover detail — tags */}
        {rec.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {rec.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const RecommendationCard = React.memo(
  RecommendationCardInner,
  (prev, next) =>
    prev.recommendation.id === next.recommendation.id &&
    prev.isSelected === next.isSelected &&
    prev.disabledReason === next.disabledReason &&
    prev.onToggle === next.onToggle
);
RecommendationCard.displayName = "RecommendationCard";

