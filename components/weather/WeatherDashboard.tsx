"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/lib/stores";
import { WeatherForecast } from "./WeatherForecast";
import { ClothingRecommendations } from "./ClothingRecommendations";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { WeatherData } from "@/lib/types";

async function fetchWeather(
  destination: string,
  startDate: string,
  endDate: string
): Promise<WeatherData> {
  const params = new URLSearchParams({ destination, startDate, endDate });
  const res = await fetch(`/api/weather?${params.toString()}`);
  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? "Failed to fetch weather data");
  }
  return res.json() as Promise<WeatherData>;
}

function toDateString(date: Date | string | null): string {
  if (!date) return "";
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return String(date).split("T")[0];
}

export function WeatherDashboard() {
  const router = useRouter();
  const destination = useFormStore((s) => s.destination);
  const startDate = useFormStore((s) => s.startDate);
  const endDate = useFormStore((s) => s.endDate);

  useEffect(() => {
    if (!destination) {
      router.replace("/plan/destination");
    }
  }, [destination, router]);

  const startStr = toDateString(startDate);
  const endStr = toDateString(endDate);

  const { data, isLoading, isError, error } = useQuery<WeatherData, Error>({
    queryKey: ["weather", destination, startStr, endStr],
    queryFn: () => fetchWeather(destination, startStr, endStr),
    staleTime: 30 * 60 * 1000,
    enabled: !!destination && !!startStr && !!endStr,
  });

  if (!destination) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <LoadingSpinner size="lg" />
        <p className="text-[#6c757d]">Fetching weather for {destination}…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mb-2 text-3xl">⚠️</div>
        <h3 className="mb-2 font-semibold text-red-700">Could not load weather</h3>
        <p className="text-sm text-red-600">
          {error?.message ?? "Please try again."}
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-12">
      <WeatherForecast forecasts={data.forecast} location={data.location} />
      <div className="border-t border-gray-100 pt-12">
        <ClothingRecommendations items={data.clothingRecommendations} />
      </div>
    </div>
  );
}

// Made with Bob
