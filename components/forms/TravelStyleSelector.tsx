"use client";

import { Chip } from "@/components/ui/Chip";

const TRAVEL_STYLES = [
  { value: "museums", label: "Museums", icon: "🏛️" },
  { value: "nature", label: "Nature", icon: "🌿" },
  { value: "culinary", label: "Culinary", icon: "🍜" },
  { value: "history", label: "History", icon: "📜" },
  { value: "nightlife", label: "Nightlife", icon: "🌙" },
  { value: "shopping", label: "Shopping", icon: "🛍️" },
  { value: "relaxation", label: "Relaxation", icon: "🧘" },
] as const;

interface TravelStyleSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function TravelStyleSelector({ value, onChange, error }: TravelStyleSelectorProps) {
  const toggle = (style: string) => {
    onChange(value.includes(style) ? value.filter((v) => v !== style) : [...value, style]);
  };

  return (
    <div>
      <div role="group" aria-label="Travel style" className="flex flex-wrap gap-3">
        {TRAVEL_STYLES.map(({ value: style, label, icon }) => (
          <Chip
            key={style}
            selected={value.includes(style)}
            icon={<span>{icon}</span>}
            onClick={() => toggle(style)}
          >
            {label}
          </Chip>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Made with Bob
