"use client";

import { cn } from "@/lib/utils";

type GroupDynamic = "solo" | "family" | "pets";

const GROUP_OPTIONS: Array<{
  value: GroupDynamic;
  label: string;
  icon: string;
  description: string;
}> = [
  { value: "solo", label: "Solo", icon: "🧍", description: "Traveling alone" },
  { value: "family", label: "Family", icon: "👨‍👩‍👧", description: "With family members" },
  { value: "pets", label: "With Pets", icon: "🐾", description: "Bringing a pet" },
];

interface GroupDynamicsSelectorProps {
  value: GroupDynamic | undefined;
  onChange: (value: GroupDynamic) => void;
  error?: string;
}

export function GroupDynamicsSelector({ value, onChange, error }: GroupDynamicsSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {GROUP_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-6 text-center transition-all",
                isSelected
                  ? "border-[#2A7BFF] bg-[#2A7BFF]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#2A7BFF]">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              <span className="text-4xl">{option.icon}</span>
              <span
                className={cn(
                  "font-semibold",
                  isSelected ? "text-[#2A7BFF]" : "text-[#3D4852]"
                )}
              >
                {option.label}
              </span>
              <span className="text-xs text-[#6c757d]">{option.description}</span>
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

