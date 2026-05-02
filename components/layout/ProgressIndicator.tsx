"use client";

import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  steps?: string[];
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps = 5,
  steps = ["Destination", "Weather", "Preferences", "Discover", "Itinerary"],
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Background Bar */}
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          {/* Progress Fill */}
          <div
            className="h-full bg-gradient-to-r from-[#2A7BFF] to-[#6DD3B0] transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="absolute top-0 left-0 -mt-1 flex w-full justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={cn(
                "flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300",
                step <= currentStep
                  ? "scale-110 border-[#2A7BFF] bg-[#2A7BFF]"
                  : "border-gray-300 bg-white"
              )}
            >
              {step < currentStep && (
                <svg
                  className="h-2.5 w-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-between">
        <div className="font-['Be_Vietnam_Pro'] text-sm font-medium text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
        <div className="font-['Be_Vietnam_Pro'] text-sm font-semibold text-[#2A7BFF]">
          {steps[currentStep - 1]}
        </div>
      </div>
    </div>
  );
}

// Made with Bob
