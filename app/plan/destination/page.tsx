import Link from "next/link";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";
import { DestinationForm } from "@/components/forms/DestinationForm";

export default function DestinationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <Link
          href="/"
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
          Back to Home
        </Link>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={1} totalSteps={5} />

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl">Where are you going?</h1>
          <p className="text-xl text-black">
            Tell us your destination and travel dates to get started
          </p>
        </div>

        {/* Destination Form */}
        <DestinationForm />

        {/* Help Text */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <p className="text-sm leading-relaxed text-black">
            <strong className="font-semibold">Tip: </strong> Be specific with your destination
            (e.g., &ldquo;Paris, France&rdquo; or &ldquo;Tokyo, Japan&rdquo;) for better
            recommendations.
          </p>
        </div>
      </div>
    </main>
  );
}

// Made with Bob
