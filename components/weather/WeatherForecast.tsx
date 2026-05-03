import { type DailyForecast } from "@/lib/types";
import { WeatherCard } from "./WeatherCard";

interface WeatherForecastProps {
  forecasts: DailyForecast[];
  location: string;
}

export function WeatherForecast({ forecasts, location }: WeatherForecastProps) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2A7BFF] to-[#6DD3B0] text-xl">
          🌍
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#3D4852]">Weather in {location}</h2>
          <p className="text-sm text-[#6c757d]">{forecasts.length}-day forecast</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {forecasts.map((forecast) => (
          <WeatherCard key={forecast.date} forecast={forecast} />
        ))}
      </div>
    </div>
  );
}

