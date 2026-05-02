"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#3D4852]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-3 text-text-light" aria-hidden="true">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
          </span>
          <input
            ref={ref}
            id={inputId}
            type="date"
            className={cn(
              "flex h-11 w-full rounded-input border border-neutral-300 bg-white pl-10 pr-4 py-2 text-sm text-[#3D4852] outline-none transition-colors focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
              "[&::-webkit-calendar-picker-indicator]:opacity-0",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
