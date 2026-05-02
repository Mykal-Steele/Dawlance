'use client';

import { useState, useMemo, useCallback } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Link from 'next/link';
import { useFormStore } from '@/lib/stores/form-store';
import { useSelectionStore } from '@/lib/stores/selection-store';
import { validateSelections } from '@/lib/validations/itinerary-validation';
import type { Recommendation } from '@/lib/types';
import { SearchBar } from './SearchBar';
import { CategoryFilter, type Category } from './CategoryFilter';
import { RecommendationGrid } from './RecommendationGrid';
import { RecommendationSkeletonGrid } from './RecommendationSkeleton';
import { SelectionSummary } from './SelectionSummary';
import { ProgressIndicator } from '@/components/layout/ProgressIndicator';

const ITEMS_PER_PAGE = 12;

// ─── API fetch ────────────────────────────────────────────────────────────────

interface RecommendationsResponse {
  recommendations: Recommendation[];
  partial: boolean;
}

async function fetchRecommendations(
  destination: string,
  startDate: Date,
  endDate: Date,
  travelers: number,
  preferences: NonNullable<ReturnType<typeof useFormStore.getState>['preferences']>
): Promise<RecommendationsResponse> {
  const res = await fetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      destination,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      travelers,
      preferences,
    }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? 'Failed to load recommendations');
  }

  const data = (await res.json()) as RecommendationsResponse;
  return data;
}

// ─── Quick Start helpers ──────────────────────────────────────────────────────

function getQuickStartItems(recommendations: Recommendation[]): Recommendation[] {
  const hotels = recommendations.filter((r) => r.category === 'hotel').slice(0, 1);
  const attractions = recommendations.filter((r) => r.category === 'attraction').slice(0, 3);
  const restaurants = recommendations.filter((r) => r.category === 'restaurant').slice(0, 2);
  return [...hotels, ...attractions, ...restaurants];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DiscoveryPage() {
  const { destination, startDate, endDate, travelers, preferences } = useFormStore();
  const { selectedRecommendations, addSelection, removeSelection, isSelected, clearSelections } =
    useSelectionStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [page, setPage] = useState(1);
  const [quickStart, setQuickStart] = useState(false);

  // ── React Query ─────────────────────────────────────────────────────────────
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['recommendations', destination, preferences],
    queryFn: () => {
      if (!destination || !startDate || !endDate || !preferences) {
        throw new Error('Missing trip details');
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

  // ── Derived state ────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let list = allRecommendations;
    if (category !== 'all') {
      list = list.filter((r) => r.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [allRecommendations, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const categoryCounts = useMemo<Partial<Record<Category, number>>>(() => ({
    all: allRecommendations.length,
    attraction: allRecommendations.filter((r) => r.category === 'attraction').length,
    hotel: allRecommendations.filter((r) => r.category === 'hotel').length,
    restaurant: allRecommendations.filter((r) => r.category === 'restaurant').length,
  }), [allRecommendations]);

  const selectedIds = useMemo(
    () => new Set(selectedRecommendations.map((r) => r.id)),
    [selectedRecommendations]
  );

  const validation = useMemo(() => {
    if (!startDate || !endDate) return { valid: false, errors: ['Missing trip dates'] };
    return validateSelections(selectedRecommendations, startDate, endDate);
  }, [selectedRecommendations, startDate, endDate]);

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleToggle = useCallback(
    (rec: Recommendation) => {
      if (isSelected(rec.id)) {
        removeSelection(rec.id);
      } else {
        addSelection(rec);
      }
    },
    [isSelected, addSelection, removeSelection]
  );

  const handleQuickStart = useCallback(
    (enable: boolean) => {
      setQuickStart(enable);
      if (enable) {
        clearSelections();
        getQuickStartItems(allRecommendations).forEach(addSelection);
      } else {
        clearSelections();
      }
    },
    [allRecommendations, addSelection, clearSelections]
  );

  const handleCategoryChange = useCallback((c: Category) => {
    setCategory(c);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  // ── Guard: missing trip data ─────────────────────────────────────────────────

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
      <main className="flex-1 bg-gradient-to-b from-white to-gray-50 px-4 pb-36 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Back + progress */}
          <Link
            href="/plan/preferences"
            className="mb-8 inline-flex items-center gap-2 font-medium text-black transition-colors hover:text-[#2A7BFF]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <ProgressIndicator currentStep={4} totalSteps={5} />

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-black sm:text-5xl">Pick Your Places</h1>
            <p className="text-xl text-gray-500">
              Choose where you want to go in{' '}
              <span className="font-semibold text-[#2A7BFF]">{destination}</span>
            </p>
          </div>

          {/* Quick Start toggle */}
          <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => handleQuickStart(false)}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                  !quickStart ? 'bg-[#2A7BFF] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Browse All
              </button>
              <button
                type="button"
                onClick={() => handleQuickStart(true)}
                disabled={isLoading}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-50 ${
                  quickStart ? 'bg-[#6DD3B0] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Start
              </button>
            </div>

            {quickStart && (
              <p className="text-sm text-gray-500">
                Top picks pre-selected — review and adjust below
              </p>
            )}
          </div>

          {/* Partial failure warning */}
          {isPartial && !isError && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#FF8C42]/30 bg-[#FF8C42]/10 px-4 py-3">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#FF8C42]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-[#FF8C42]">
                Some images couldn&apos;t be loaded — recommendations are still complete.
              </p>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="font-medium text-red-700">
                {error instanceof Error ? error.message : 'Failed to load recommendations'}
              </p>
              <p className="mt-1 text-sm text-red-500">Please go back and try again</p>
            </div>
          )}

          {/* Toolbar */}
          {!isError && (
            <>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                <SearchBar
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search attractions, hotels, restaurants..."
                  className="w-full sm:max-w-sm"
                />
                <CategoryFilter
                  active={category}
                  onChange={handleCategoryChange}
                  counts={categoryCounts}
                />
              </div>

              {/* Results count */}
              {!isLoading && (
                <p className="mb-4 text-sm text-gray-500">
                  {filtered.length} place{filtered.length === 1 ? '' : 's'} found
                  {search && ` for "${search}"`}
                </p>
              )}

              {/* Grid */}
              {isLoading ? (
                <RecommendationSkeletonGrid />
              ) : (
                <RecommendationGrid
                  recommendations={paginated}
                  selectedIds={selectedIds}
                  onToggle={handleToggle}
                />
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        p === safePage
                          ? 'bg-[#2A7BFF] text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Sticky bottom summary + generate button */}
      <SelectionSummary
        selectedCount={selectedRecommendations.length}
        validationErrors={validation.errors}
      />
    </div>
  );
}

// Made with Bob
