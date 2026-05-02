import * as React from "react";
import { cn } from "@/lib/utils";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, selected = false, icon, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={selected}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7BFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selected
          ? "border-[#2A7BFF] bg-[#2A7BFF]/10 text-[#2A7BFF]"
          : "border-neutral-300 bg-white text-text-light hover:border-[#2A7BFF]/50 hover:text-[#3D4852]",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
);
Chip.displayName = "Chip";

export { Chip };
