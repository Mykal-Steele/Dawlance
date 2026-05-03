"use client";

import { cn } from "@/lib/utils";

type BudgetTier = "budget" | "moderate" | "luxury";

const BUDGET_TIERS: Array<{
  value: BudgetTier;
  label: string;
  price: string;
  description: string;
  icon: string;
  selectedRing: string;
}> = [
  {
    value: "budget",
    label: "Budget",
    price: "$",
    description: "Hostels, street food, public transport",
    icon: "💰",
    selectedRing: "border-[#6DD3B0] bg-[#6DD3B0]/10 ring-2 ring-[#6DD3B0]",
  },
  {
    value: "moderate",
    label: "Moderate",
    price: "$$",
    description: "Mid-range hotels, restaurants, mixed transport",
    icon: "💳",
    selectedRing: "border-[#2A7BFF] bg-[#2A7BFF]/10 ring-2 ring-[#2A7BFF]",
  },
  {
    value: "luxury",
    label: "Luxury",
    price: "$$$",
    description: "5-star hotels, fine dining, private transfers",
    icon: "💎",
    selectedRing: "border-[#FF8C42] bg-[#FF8C42]/10 ring-2 ring-[#FF8C42]",
  },
];

interface BudgetSelectorProps {
  value: BudgetTier | undefined;
  onChange: (value: BudgetTier) => void;
  error?: string;
}

export function BudgetSelector({ value, onChange, error }: BudgetSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {BUDGET_TIERS.map((tier) => {
          const isSelected = value === tier.value;
          return (
            <button
              key={tier.value}
              type="button"
              onClick={() => onChange(tier.value)}
              aria-pressed={isSelected}
              className={cn(
                "rounded-2xl border-2 p-6 text-center transition-all",
                isSelected
                  ? tier.selectedRing
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className="mb-2 text-3xl">{tier.icon}</div>
              <div className="mb-1 text-2xl font-bold text-[#3D4852]">{tier.price}</div>
              <div className="mb-2 font-semibold text-[#3D4852]">{tier.label}</div>
              <p className="text-xs text-[#6c757d]">{tier.description}</p>
              {isSelected && (
                <div className="mt-3 flex items-center justify-center gap-1 text-sm font-medium text-[#2A7BFF]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

