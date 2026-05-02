import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="relative flex items-center">
          {icon && (
            <span className="pointer-events-none absolute left-3 text-text-light">{icon}</span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-input border border-neutral-300 bg-white px-4 py-2 text-sm text-[#3D4852] outline-none transition-colors placeholder:text-neutral-500 focus:border-[#2A7BFF] focus:ring-2 focus:ring-[#2A7BFF]/20 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
              icon && "pl-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${props.id}-error`} className="text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
