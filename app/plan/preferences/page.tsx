import Link from "next/link";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";
import { PreferencesForm } from "@/components/forms/PreferencesForm";

export default function PreferencesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/plan/weather"
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

        <ProgressIndicator currentStep={3} totalSteps={5} />

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl">
            Tell AI What You Like
          </h1>
          <p className="text-xl text-[#6c757d]">
            Customize your travel profile for personalized recommendations
          </p>
        </div>

        <PreferencesForm />
      </div>
    </main>
  );
}

// Made with Bob
