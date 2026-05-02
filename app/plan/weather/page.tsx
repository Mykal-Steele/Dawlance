import Link from "next/link";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";
import { WeatherDashboard } from "@/components/weather";

export default function WeatherPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/plan/destination"
          className="mb-8 inline-flex items-center gap-2 font-medium text-black transition-colors hover:text-[#2A7BFF]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>

        <ProgressIndicator currentStep={2} totalSteps={5} />

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl">Weather Forecast</h1>
          <p className="text-xl text-[#6c757d]">
            Plan your packing based on the forecast for your trip
          </p>
        </div>

        <WeatherDashboard />

        <div className="mt-16 text-center">
          <Link
            href="/plan/preferences"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2A7BFF] to-[#1a5fd9] px-10 py-4 text-lg font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            Set My Preferences
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

// Made with Bob
