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
    // Map error to ErrorState
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
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you would send this to an error tracking service like Sentry
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  /**
   * Determine error type from error object
   */
  private static getErrorType(error: Error): ErrorState["type"] {
    // Network errors
    if (error.message.includes("fetch") || error.message.includes("network")) {
      return "network";
    }

    // API errors
    if (error.message.includes("API") || error.message.includes("server")) {
      return "api";
    }

    // Validation errors
    if (error.message.includes("validation") || error.message.includes("invalid")) {
      return "validation";
    }

    return "unknown";
  }

  /**
   * Reset error state and retry
   */
  private handleReset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.handleReset);
      }

      // Default error UI
      const errorConfig = errorMessages[error.type];

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="w-16 h-16 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-tertiary"
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
            <h2 className="text-2xl font-bold text-text mb-2">{errorConfig.title}</h2>

            {/* Error Message */}
            <p className="text-text/70 mb-6">{errorConfig.message}</p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && error.message && (
              <div className="bg-neutral rounded-lg p-4 mb-6 text-left">
                <p className="text-xs font-mono text-text/60 break-all">{error.message}</p>
              </div>
            )}

            {/* Recovery Actions */}
            <div className="flex flex-col gap-3">
              {error.recoveryOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-colors
                    ${
                      index === 0
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-neutral text-text hover:bg-neutral/80"
                    }
                  `}
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

// Made with Bob
