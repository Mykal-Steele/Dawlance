"use client";

import dynamic from "next/dynamic";

// AIAssistant is client-only — no SSR
const AIAssistant = dynamic(
  () => import("@/components/ai").then((m) => ({ default: m.AIAssistant })),
  { ssr: false, loading: () => null }
);

export default function ItineraryPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1
            className="mb-2 text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Your AI-Generated Plan
          </h1>
          <p className="text-sm text-gray-500">
            Review, adjust, and chat with your travel assistant to perfect your trip.
          </p>
        </div>

        {/* Two-column layout: itinerary + AI assistant (floating) */}
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          {/* Itinerary content placeholder — filled in Phase 7 */}
          <div className="flex-1 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center text-sm text-gray-400 shadow-sm">
              Itinerary view coming in Phase 7
            </div>
          </div>
        </div>

        {/* AI Assistant — fixed floating panel, draggable */}
        <AIAssistant currentStep="itinerary" />
      </div>
    </div>
  );
}
