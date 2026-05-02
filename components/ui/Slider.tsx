"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, showValue = false, formatValue, value, defaultValue, ...props }, ref) => {
  const currentValue = (value ?? defaultValue ?? [0]) as number[];
  const displayValue = formatValue
    ? formatValue(currentValue[0])
    : String(currentValue[0]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-[#3D4852]">{label}</span>}
          {showValue && (
            <span className="text-sm text-text-light">{displayValue}</span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        className="relative flex w-full touch-none select-none items-center"
        value={value}
        defaultValue={defaultValue}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200">
          <SliderPrimitive.Range className="absolute h-full bg-[#2A7BFF]" />
        </SliderPrimitive.Track>
        {currentValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block h-5 w-5 rounded-full border-2 border-[#2A7BFF] bg-white shadow-button transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7BFF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = "Slider";

export { Slider };
