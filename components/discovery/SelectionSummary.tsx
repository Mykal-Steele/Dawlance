'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SelectionSummaryProps {
  selectedCount: number;
  validationErrors: string[];
  className?: string;
}

export function SelectionSummary({ selectedCount, validationErrors, className }: SelectionSummaryProps) {
  const canGenerate = selectedCount > 0 && validationErrors.length === 0;

  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 border-t border-gray-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-sm sm:px-6',
        className
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Selection count */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white',
              selectedCount > 0 ? 'bg-[#2A7BFF]' : 'bg-gray-300'
            )}
          >
            {selectedCount}
          </div>
          <span className="text-sm text-gray-600">
            {selectedCount === 0
              ? 'No places selected yet'
              : `place${selectedCount === 1 ? '' : 's'} selected for your trip`}
          </span>
        </div>

        {/* Validation errors */}
        {validationErrors.length > 0 && (
          <ul className="flex flex-col gap-1 sm:max-w-xs">
            {validationErrors.map((err) => (
              <li key={err} className="flex items-start gap-1.5 text-xs text-[#FF8C42]">
                <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {err}
              </li>
            ))}
          </ul>
        )}

        {/* Generate button */}
        <Link
          href="/plan/itinerary"
          aria-disabled={!canGenerate}
          tabIndex={canGenerate ? undefined : -1}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all',
            canGenerate
              ? 'bg-gradient-to-r from-[#2A7BFF] to-[#1a5fd9] text-white hover:-translate-y-0.5 hover:shadow-lg'
              : 'pointer-events-none bg-gray-200 text-gray-400'
          )}
        >
          Generate Itinerary
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Made with Bob
