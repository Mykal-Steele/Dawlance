"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

interface PlaceSuggestion {
  label: string;
  placeId: string;
  secondary: string;
}

interface AutocompleteResponse {
  suggestions: PlaceSuggestion[];
}

export interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function CityAutocomplete({
  value,
  onChange,
  onBlur,
  placeholder = "e.g. Paris, Bangkok, Japan",
  disabled,
  error,
  id,
}: CityAutocompleteProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasSelected, setHasSelected] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listboxId = `${inputId}-listbox`;

  // Sync external value → local query when programmatically changed
  useEffect(() => {
    if (value !== query && !isOpen) {
      const t = setTimeout(() => setQuery(value), 0);
      return () => clearTimeout(t);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2 || hasSelected) {
      // Schedule as microtask to avoid setState-in-effect lint error
      const t = setTimeout(() => {
        setSuggestions([]);
        setIsOpen(false);
      }, 0);
      return () => clearTimeout(t);
    }

    let cancelled = false;
    const t = setTimeout(() => {
      if (!cancelled) setIsLoading(true);
    }, 0);

    fetch(`/api/places/autocomplete?q=${encodeURIComponent(debouncedQuery)}`)
      .then((r) => r.json() as Promise<AutocompleteResponse>)
      .then((data) => {
        if (cancelled) return;
        setSuggestions(data.suggestions ?? []);
        setIsOpen((data.suggestions ?? []).length > 0);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [debouncedQuery, hasSelected]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectSuggestion = useCallback(
    (s: PlaceSuggestion) => {
      const selected = s.secondary ? `${s.label}, ${s.secondary}` : s.label;
      setQuery(selected);
      onChange(selected);
      setHasSelected(true);
      setIsOpen(false);
      setSuggestions([]);
      setActiveIndex(-1);
      inputRef.current?.focus();
    },
    [onChange]
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    setHasSelected(false);
    // Propagate raw text so the parent form value is always in sync
    onChange(v);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const item = listRef.current.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        {/* Location pin icon */}
        <span className="pointer-events-none absolute left-3 text-gray-400" aria-hidden>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </span>

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "flex h-11 w-full rounded-xl border border-gray-200 bg-white py-2 pr-9 pl-10 text-sm text-gray-900 transition-colors outline-none",
            "placeholder:text-gray-400",
            "focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
          )}
        />

        {/* Loading / clear */}
        <span className="pointer-events-none absolute right-3 text-gray-400">
          {isLoading ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          ) : query ? (
            <button
              type="button"
              className="pointer-events-auto"
              onClick={() => {
                setQuery("");
                onChange("");
                setHasSelected(false);
                setSuggestions([]);
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              aria-label="Clear destination"
            >
              <svg
                className="h-4 w-4 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : null}
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Destination suggestions"
          className="absolute z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
        >
          {suggestions.map((s, i) => (
            <li
              key={s.placeId}
              id={`${listboxId}-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(s);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-4 py-3 text-sm transition-colors",
                i === activeIndex ? "bg-[#2A7BFF]/10 text-[#2A7BFF]" : "hover:bg-gray-50"
              )}
            >
              <svg
                className="h-4 w-4 shrink-0 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="min-w-0">
                <span className="font-medium text-gray-900">{s.label}</span>
                {s.secondary && <span className="ml-1.5 text-gray-400">{s.secondary}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
