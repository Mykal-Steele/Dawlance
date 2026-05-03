import { type DailyForecast } from "@/lib/types";
import { cn } from "@/lib/utils";

interface WeatherCardProps {
  forecast: DailyForecast;
  className?: string;
}

const conditionConfig: Record<
  DailyForecast["condition"],
  { icon: string; label: string; bg: string; border: string }
> = {
  sunny: {
    icon: "☀️",
    label: "Sunny",
    bg: "from-yellow-50 to-orange-50",
    border: "border-yellow-200",
  },
  cloudy: {
    icon: "☁️",
    label: "Cloudy",
    bg: "from-gray-50 to-slate-50",
    border: "border-gray-200",
  },
  rainy: {
    icon: "🌧️",
    label: "Rainy",
    bg: "from-blue-50 to-slate-50",
    border: "border-blue-200",
  },
  snowy: {
    icon: "❄️",
    label: "Snowy",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200",
  },
  windy: {
    icon: "💨",
    label: "Windy",
    bg: "from-teal-50 to-cyan-50",
    border: "border-teal-200",
  },
};

export function WeatherCard({ forecast, className }: WeatherCardProps) {
  const config = conditionConfig[forecast.condition];
  const date = new Date(forecast.date + "T00:00:00");
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div
      className={cn(
        "rounded-2xl border bg-gradient-to-b p-5 text-center shadow-sm",
        config.bg,
        config.border,
        className
      )}
    >
      <div className="mb-1 text-sm font-semibold text-[#3D4852]">{dayName}</div>
      <div className="mb-3 text-xs text-[#6c757d]">{dateStr}</div>
      <div className="mb-2 text-4xl">{config.icon}</div>
      <div className="mb-3 text-xs font-medium text-[#6c757d]">{config.label}</div>
      <div className="mb-4">
        <span className="text-xl font-bold text-[#3D4852]">{forecast.tempHigh}°C</span>
        <span className="mx-1 text-[#adb5bd]">/</span>
        <span className="text-sm text-[#6c757d]">{forecast.tempLow}°C</span>
      </div>
      <div className="flex items-center justify-between text-xs text-[#6c757d]">
        <span title="Precipitation chance">💧 {forecast.precipitation}%</span>
        <span title="UV Index">UV {forecast.uvIndex}</span>
      </div>
    </div>
  );
}

