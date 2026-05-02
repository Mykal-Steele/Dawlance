import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin rounded-full border-2 border-current border-t-transparent", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    spinnerColor: {
      primary: "text-[#2A7BFF]",
      secondary: "text-[#6DD3B0]",
      white: "text-white",
      muted: "text-neutral-400",
    },
  },
  defaultVariants: {
    size: "default",
    spinnerColor: "primary",
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, spinnerColor, label = "Loading...", ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <span className={cn(spinnerVariants({ size, spinnerColor }))} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
);
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, spinnerVariants };
