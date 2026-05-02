"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    label: string;
    description?: string;
  }>;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  steps,
}: ProgressIndicatorProps): React.ReactElement {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-neutral-200">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              const _isUpcoming = stepNumber > currentStep;

              return (
                <div
                  key={stepNumber}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / totalSteps}%` }}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isCompleted
                        ? "border-primary bg-primary text-white"
                        : isCurrent
                          ? "border-primary bg-white text-primary shadow-lg"
                          : "border-neutral-300 bg-white text-text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-semibold">
                        {stepNumber}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-medium ${
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                            ? "text-text-primary"
                            : "text-text-secondary"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="mt-1 text-xs text-text-secondary">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Progress Bar (Simplified) */}
      <div className="mb-4 md:hidden">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-primary">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-text-secondary">
            {Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%
            Complete
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-primary">
          {steps[currentStep - 1]?.label}
        </p>
      </div>
    </div>
  );
}

// Made with Bob
