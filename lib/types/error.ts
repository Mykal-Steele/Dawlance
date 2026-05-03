/**
 * Error handling types
 * Used throughout the application for error recovery UI
 */

export interface ErrorState {
  type: "network" | "api" | "validation" | "unknown";
  message: string;
  recoveryOptions: RecoveryOption[];
}

export interface RecoveryOption {
  label: string;
  action: () => void;
}

export const errorMessages = {
  network: {
    title: "Connection Lost",
    message: "Please check your internet connection and try again.",
    actions: ["Retry", "Save Draft", "Go Offline"],
  },
  api: {
    title: "Service Temporarily Unavailable",
    message: "Our AI service is experiencing high demand. Your selections are saved.",
    actions: ["Retry", "Try Later", "Use Basic Mode"],
  },
  validation: {
    title: "Invalid Selection",
    message: "Some of your selections need adjustment.",
    actions: ["Review Selections", "Get Suggestions"],
  },
  unknown: {
    title: "Something Went Wrong",
    message: "An unexpected error occurred. Please try again.",
    actions: ["Retry", "Contact Support"],
  },
} as const;

