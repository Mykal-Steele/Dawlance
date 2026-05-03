"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { useFormStore } from "@/lib/stores/form-store";
import { useSelectionStore } from "@/lib/stores/selection-store";
import { validateSelections, getDisqualifyReason } from "@/lib/validations/itinerary-validation";
import type { Recommendation } from "@/lib/types";
import { SearchBar } from "./SearchBar";
import { RecommendationGrid } from "./RecommendationGrid";
import { RecommendationSkeletonGrid } from "./RecommendationSkeleton";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";

const ITEMS_PER_PAGE = 12;

// ─── Phase config ─────────────────────────────────────────────────────────────

type SelectionPhase = "hotel" | "attraction" | "restaurant";

interface PhaseConfig {
  key: SelectionPhase;
  label: string;
  plural: string;
  icon: string;
  min: number;
  next: SelectionPhase | null;
  prev: SelectionPhase | null;
}

const PHASES: PhaseConfig[] = [
  {
    key: "hotel",
    label: "Hotel",
    plural: "hotels",
    icon: "🏨",
    min: 1,
    next: "attraction",
    prev: null,
  },
  {
    key: "attraction",
    label: "Attractions",
    plural: "attractions",
    icon: "🏛",
    min: 3,
    next: "restaurant",
    prev: "hotel",
  },
  {
    key: "restaurant",
    label: "Restaurants",
    plural: "restaurants",
    icon: "🍽",
    min: 2,
    next: null,
    prev: "attraction",
  },
];

const PHASE_MAP: Record<SelectionPhase, PhaseConfig> = Object.fromEntries(
  PHASES.map((p) => [p.key, p])
) as Record<SelectionPhase, PhaseConfig>;

// ─── API fetch ────────────────────────────────────────────────────────────────

interface RecommendationsResponse {
  recommendations: Recommendation[];
  partial: boolean;
}

async function fetchRecommendations(
  destination: string,
  startDate: Date | string,
  endDate: Date | string,
  travelers: number,
  preferences: NonNullable<ReturnType<typeof useFormStore.getState>["preferences"]>
): Promise<RecommendationsResponse> {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const res = await fetch("/api/recommendations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destination,
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
      travelers,
      preferences,
    }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Failed to load recommendations");
  }

  const data = (await res.json()) as RecommendationsResponse;
  return data;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DiscoveryPage() {
  const { destination, startDate, endDate, travelers, preferences } = useFormStore();
  const { selectedRecommendations, addSelection, removeSelection, isSelected } =
    useSelectionStore();

  const [phase, setPhase] = useState<SelectionPhase>("hotel");
  const [showInvalid, setShowInvalid] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const phaseConfig = PHASE_MAP[phase];

  // ── React Query ─────────────────────────────────────────────────────────────
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommendations", destination, preferences],
    queryFn: () => {
      if (!destination || !startDate || !endDate || !preferences) {
        throw new Error("Missing trip details");
      }
      return fetchRecommendations(destination, startDate, endDate, travelers, preferences);
    },
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    enabled: !!destination && !!startDate && !!endDate && !!preferences,
    retry: 2,
  });

  const allRecommendations = data?.recommendations ?? [];
  const isPartial = data?.partial ?? false;

  // ── Phase items + criteria check ─────────────────────────────────────────────

  const phaseItems = useMemo(
    () => allRecommendations.filter((r) => r.category === phase),
    [allRecommendations, phase]
  );

  // Compute disqualify reasons for unselected items in this phase
  const disqualifyReasons = useMemo(() => {
    if (!startDate || !endDate) return new Map<string, string>();
    const map = new Map<string, string>();
    for (const rec of phaseItems) {
      if (!isSelected(rec.id)) {
        const reason = getDisqualifyReason(rec, selectedRecommendations, startDate, endDate);
        if (reason) map.set(rec.id, reason);
      }
    }
    return map;
  }, [phaseItems, selectedRecommendations, startDate, endDate, isSelected]);

  const validItems = useMemo(
    () => phaseItems.filter((r) => !disqualifyReasons.has(r.id) || isSelected(r.id)),
    [phaseItems, disqualifyReasons, isSelected]
  );
  const invalidItems = useMemo(
    () => phaseItems.filter((r) => disqualifyReasons.has(r.id) && !isSelected(r.id)),
    [phaseItems, disqualifyReasons, isSelected]
  );

  // Auto-show invalid when there aren't enough valid options
  const notEnoughValid = validItems.length < phaseConfig.min;
  const shouldShowInvalid = notEnoughValid || showInvalid;

  const displayItems = useMemo(() => {
    const base = shouldShowInvalid ? phaseItems : validItems;
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [phaseItems, validItems, shouldShowInvalid, search]);

  const totalPages = Math.max(1, Math.ceil(displayItems.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = displayItems.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const selectedIds = useMemo(
    () => new Set(selectedRecommendations.map((r) => r.id)),
    [selectedRecommendations]
  );

  const phaseSelectedCount = selectedRecommendations.filter((r) => r.category === phase).length;
  const canGoNext = true;

  // Overall validation (used on last phase)
  const validation = useMemo(() => {
    if (!startDate || !endDate)
      return { valid: false, errors: ["Missing trip dates"], warnings: [] };
    return validateSelections(selectedRecommendations, startDate, endDate);
  }, [selectedRecommendations, startDate, endDate]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleToggle = useCallback(
    (rec: Recommendation) => {
      if (isSelected(rec.id)) removeSelection(rec.id);
      else addSelection(rec);
    },
    [isSelected, addSelection, removeSelection]
  );

  const handleAutoSelect = useCallback(() => {
    // Clear current phase selections
    selectedRecommendations
      .filter((r) => r.category === phase)
      .forEach((r) => removeSelection(r.id));

    // Pick top valid items; fall back to invalid if not enough
    const picks = [...validItems.slice(0, phaseConfig.min)];
    if (picks.length < phaseConfig.min) {
      invalidItems.slice(0, phaseConfig.min - picks.length).forEach((r) => picks.push(r));
    }
    picks.forEach(addSelection);
  }, [
    phase,
    phaseConfig.min,
    validItems,
    invalidItems,
    selectedRecommendations,
    removeSelection,
    addSelection,
  ]);

  const handleNextPhase = useCallback(() => {
    if (phaseConfig.next) {
      setPhase(phaseConfig.next);
      setShowInvalid(false);
      setSearch("");
      setPage(1);
    }
  }, [phaseConfig.next]);

  const handlePrevPhase = useCallback(() => {
    if (phaseConfig.prev) {
      setPhase(phaseConfig.prev);
      setShowInvalid(false);
      setSearch("");
      setPage(1);
    }
  }, [phaseConfig.prev]);

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  // ── Guard ────────────────────────────────────────────────────────────────────

  if (!destination || !preferences) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-medium text-gray-700">No trip details found</p>
        <p className="text-sm text-gray-500">Please set your destination and preferences first</p>
        <Link
          href="/plan/destination"
          className="rounded-xl bg-[#2A7BFF] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#2A7BFF]/90"
        >
          Start Planning
        </Link>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-linear-to-b from-white to-gray-50 px-4 pt-8 pb-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Back + progress */}
          <Link
            href="/plan/preferences"
            className="mb-8 inline-flex items-center gap-2 font-medium text-black transition-colors hover:text-[#2A7BFF]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>

          <ProgressIndicator currentStep={4} totalSteps={5} />

          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-4xl font-bold text-black sm:text-5xl">Pick Your Places</h1>
            <p className="text-xl text-gray-500">
              Choose where you want to go in{" "}
              <span className="font-semibold text-[#2A7BFF]">{destination}</span>
            </p>
          </div>

          {/* Phase breadcrumb */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {PHASES.map((p, i) => {
              const phaseIdx = PHASES.findIndex((x) => x.key === phase);
              const isDone = i < phaseIdx;
              const isCurrent = p.key === phase;
              return (
                <div key={p.key} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (i <= phaseIdx) {
                        setPhase(p.key);
                        setShowInvalid(false);
                        setSearch("");
                        setPage(1);
                      }
                    }}
                    disabled={i > phaseIdx}
                    className={[
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                      isCurrent
                        ? "bg-[#2A7BFF] text-white shadow-sm"
                        : isDone
                          ? "cursor-pointer bg-[#6DD3B0]/20 text-[#6DD3B0] hover:bg-[#6DD3B0]/30"
                          : "cursor-not-allowed bg-gray-100 text-gray-400",
                    ].join(" ")}
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                    {isDone && (
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {i < PHASES.length - 1 && (
                    <svg
                      className="h-4 w-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>

          {/* Phase heading */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {phaseConfig.icon} Step {PHASES.findIndex((p) => p.key === phase) + 1}: Choose{" "}
                {phaseConfig.label === "Hotel" ? "a" : "your"} {phaseConfig.label}
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Pick {phaseConfig.plural} for your trip
              </p>
            </div>
            <button
              type="button"
              onClick={handleAutoSelect}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl border border-[#2A7BFF] px-4 py-2 text-sm font-medium text-[#2A7BFF] transition-all hover:bg-[#2A7BFF] hover:text-white disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Auto-select best picks
            </button>
          </div>

          {/* Not enough valid options banner */}
          {notEnoughValid && !isLoading && phaseItems.length > 0 && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#FF8C42]/30 bg-[#FF8C42]/10 px-4 py-3">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8C42]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-[#FF8C42]">
                Not enough options match your criteria — showing all {phaseConfig.plural} including
                ones outside your preferences. Items with ⚠️ may not fit your trip perfectly.
              </p>
            </div>
          )}

          {/* Partial fetch warning */}
          {isPartial && !isError && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-sm text-gray-500">
                Some images couldn&apos;t load — recommendations are still complete.
              </p>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="font-medium text-red-700">
                {error instanceof Error ? error.message : "Failed to load recommendations"}
              </p>
              <p className="mt-1 text-sm text-red-500">Please go back and try again</p>
            </div>
          )}

          {/* Search + results count */}
          {!isError && (
            <>
              <div className="mb-4 flex items-center gap-4">
                <SearchBar
                  value={search}
                  onChange={handleSearchChange}
                  placeholder={`Search ${phaseConfig.plural}…`}
                  className="w-full sm:max-w-sm"
                />
                {!isLoading && (
                  <p className="shrink-0 text-sm text-gray-500">
                    {displayItems.length} {phaseConfig.plural} shown
                    {invalidItems.length > 0 && !shouldShowInvalid && (
                      <span> · {invalidItems.length} outside criteria</span>
                    )}
                  </p>
                )}
              </div>

              {/* Grid */}
              {isLoading ? (
                <RecommendationSkeletonGrid />
              ) : (
                <RecommendationGrid
                  recommendations={paginated}
                  selectedIds={selectedIds}
                  onToggle={handleToggle}
                  disabledReasons={disqualifyReasons}
                />
              )}

              {/* Show non-fitting toggle (only when there are enough valid items) */}
              {!isLoading && invalidItems.length > 0 && !notEnoughValid && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInvalid((prev) => !prev);
                      setPage(1);
                    }}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showInvalid
                            ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        }
                      />
                    </svg>
                    {showInvalid
                      ? `Hide ${invalidItems.length} outside-criteria places`
                      : `Show ${invalidItems.length} more places (outside criteria)`}
                  </button>
                </div>
              )}

              {/* Pagination */}
              {!isLoading && totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={safePage <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === safePage
                          ? "bg-[#2A7BFF] text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={safePage >= totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Sticky bottom phase navigation */}
      <div className="sticky bottom-0 z-10 border-t border-gray-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-sm sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Phase progress */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-semibold ${canGoNext ? "text-[#6DD3B0]" : "text-gray-700"}`}>
                {phaseConfig.icon} {phaseConfig.label}:{" "}
              </span>
              <span className="text-gray-600">{phaseSelectedCount} selected</span>
            </div>
            {!phaseConfig.next && validation.warnings.length > 0 && (
              <p className="text-xs text-[#FF8C42]">{validation.warnings[0]}</p>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {phaseConfig.prev && (
              <button
                type="button"
                onClick={handlePrevPhase}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to {PHASE_MAP[phaseConfig.prev].label}
              </button>
            )}

            {phaseConfig.next ? (
              <button
                type="button"
                onClick={handleNextPhase}
                disabled={!canGoNext}
                className="flex items-center gap-1.5 rounded-xl bg-[#2A7BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1a6bee] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next: {PHASE_MAP[phaseConfig.next].label}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href={selectedRecommendations.length > 0 ? "/plan/itinerary" : "#"}
                onClick={(e) => {
                  if (selectedRecommendations.length === 0) {
                    e.preventDefault();
                  } else {
                    toast.loading("Generating your itinerary\u2026", { id: "gen-itinerary" });
                  }
                }}
                className={[
                  "flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition-all",
                  selectedRecommendations.length > 0
                    ? "bg-[#6DD3B0] text-white hover:bg-[#5bc4a1]"
                    : "cursor-not-allowed bg-gray-200 text-gray-400",
                ].join(" ")}
              >
                Generate Itinerary ✨
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
