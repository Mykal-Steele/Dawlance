"use client";

import { cn } from "@/lib/utils";

export type Category = "all" | "attraction" | "hotel" | "restaurant";

const TABS: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "attraction", label: "Attractions" },
  { value: "hotel", label: "Hotels" },
  { value: "restaurant", label: "Restaurants" },
];

interface CategoryFilterProps {
  active: Category;
  onChange: (category: Category) => void;
  counts?: Partial<Record<Category, number>>;
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
            active === value
              ? "bg-[#2A7BFF] text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          )}
        >
          {label}
          {counts?.[value] !== undefined && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                active === value ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              )}
            >
              {counts[value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

