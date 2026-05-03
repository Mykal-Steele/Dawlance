"use client";

import { Slider } from "@/components/ui/Slider";

interface PaceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

function getPaceLabel(pace: number): string {
  if (pace <= 20) return "Quick Bites";
  if (pace <= 40) return "Light & Easy";
  if (pace <= 60) return "Balanced";
  if (pace <= 80) return "Relaxed";
  return "Long Dinners";
}

export function PaceSlider({ value, onChange }: PaceSliderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#6c757d]">⚡ Quick Bites</span>
        <span className="rounded-full bg-[#2A7BFF]/10 px-3 py-1 text-sm font-semibold text-[#2A7BFF]">
          {getPaceLabel(value)}
        </span>
        <span className="text-sm font-medium text-[#6c757d]">🍷 Long Dinners</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]: number[]) => onChange(v)}
        min={0}
        max={100}
        step={5}
        aria-label="Travel pace"
      />
      <div className="flex justify-between text-xs text-[#adb5bd]">
        <span>Efficient</span>
        <span>Balanced</span>
        <span>Leisurely</span>
      </div>
    </div>
  );
}

