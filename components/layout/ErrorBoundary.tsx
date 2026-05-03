"use client";

import React, { Component, type ReactNode } from "react";
import { ErrorState, errorMessages } from "@/lib/types/error";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: ErrorState, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  error: ErrorState | null;
}

/**
 * ErrorBoundary component that catches React errors and displays recovery UI
 * Uses ErrorState interface and errorMessages config from lib/types/error.ts
 *
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const errorType = ErrorBoundary.getErrorType(error);

    return {
      error: {
        type: errorType,
        message: error.message,
        recoveryOptions: [
          {
            label: "Retry",
            action: () => window.location.reload(),
          },
          {
            label: "Go Home",
            action: () => {
              window.location.href = "/";
            },
          },
        ],
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  private static getErrorType(error: Error): ErrorState["type"] {
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "network";
    }
    if (error.message.includes("API") || error.message.includes("server")) {
      return "api";
    }
    if (error.message.includes("validation") || error.message.includes("invalid")) {
      return "validation";
    }
    return "unknown";
  }

  private handleReset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      if (fallback) {
        return fallback(error, this.handleReset);
      }

      const errorConfig = errorMessages[error.type];

      return (
        <div className="bg-neutral flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
            {/* Error Icon */}
            <div className="bg-tertiary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-tertiary h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Title */}
            <h2 className="text-text mb-2 text-2xl font-bold">{errorConfig.title}</h2>

            {/* Error Message */}
            <p className="text-text/70 mb-6">{errorConfig.message}</p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="bg-neutral mb-6 rounded-lg p-4 text-left">
                <p className="text-text/60 font-mono text-xs break-all">{error.message}</p>
              </div>
            )}

            {/* Recovery Actions */}
            <div className="flex flex-col gap-3">
              {error.recoveryOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`rounded-lg px-6 py-3 font-medium transition-colors ${
                    index === 0
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "bg-neutral text-text hover:bg-neutral/80"
                  } `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}
