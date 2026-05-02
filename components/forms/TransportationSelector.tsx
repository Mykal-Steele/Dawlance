"use client";

import { cn } from "@/lib/utils";

const TRANSPORT_OPTIONS = [
  { value: "train", label: "Train", icon: "🚆" },
  { value: "bus", label: "Bus", icon: "🚌" },
  { value: "walk", label: "Walk", icon: "🚶" },
  { value: "taxi", label: "Taxi", icon: "🚕" },
  { value: "bike", label: "Bike", icon: "🚲" },
] as const;

interface TransportationSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function TransportationSelector({ value, onChange, error }: TransportationSelectorProps) {
  const toggle = (transport: string) => {
    onChange(
      value.includes(transport)
        ? value.filter((v) => v !== transport)
        : [...value, transport]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {TRANSPORT_OPTIONS.map(({ value: transport, label, icon }) => {
          const isSelected = value.includes(transport);
          return (
            <button
              key={transport}
              type="button"
              onClick={() => toggle(transport)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all",
                isSelected
                  ? "border-[#2A7BFF] bg-[#2A7BFF]/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#2A7BFF]">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
              <span className="text-2xl">{icon}</span>
              <span
                className={cn(
                  "text-xs font-medium",
                  isSelected ? "text-[#2A7BFF]" : "text-[#3D4852]"
                )}
              >
                {label}
              </span>
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

// Made with Bob
