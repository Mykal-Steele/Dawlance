"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ItineraryView } from "@/components/itinerary";
import { useFormStore } from "@/lib/stores/form-store";

// AIAssistant is client-only — no SSR
const AIAssistant = dynamic(
  () => import("@/components/ai").then((m) => ({ default: m.AIAssistant })),
  { ssr: false, loading: () => null }
);

export default function ItineraryPage(): React.ReactElement {
  const { destination, startDate, endDate } = useFormStore();

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Back nav */}
        <Link
          href="/plan/discover"
          className="mb-6 inline-flex items-center gap-2 font-medium text-black transition-colors hover:text-[#2A7BFF]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Discover
        </Link>

        {/* Page header */}
        <div className="mb-8">
          <h1
            className="mb-1 text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Your AI-Generated Plan
          </h1>
          <p className="text-sm text-gray-500">
            {destination
              ? `${destination}${startDate && endDate ? ` · ${new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : ""}`
              : "Review, adjust, and chat with your travel assistant to perfect your trip."}
          </p>
        </div>

        {/* Two-column layout: itinerary + AI assistant */}
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div className="min-w-0 flex-1">
            <ItineraryView />
          </div>
        </div>

        {/* AI Assistant — fixed floating panel */}
        <AIAssistant currentStep="itinerary" />
      </div>
    </div>
  );
}
