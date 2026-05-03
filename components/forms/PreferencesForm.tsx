"use client";

import { useState } from "react";
import { useForm, useController } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { preferencesSchema, type PreferencesFormData } from "@/lib/validations";
import { useFormStore } from "@/lib/stores";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Chip } from "@/components/ui/Chip";
import { TravelStyleSelector } from "./TravelStyleSelector";
import { BudgetSelector } from "./BudgetSelector";
import { TransportationSelector } from "./TransportationSelector";
import { GroupDynamicsSelector } from "./GroupDynamicsSelector";
import { PaceSlider } from "./PaceSlider";

const DIETARY_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Dairy-Free",
  "Nut-Free",
  "Seafood-Free",
];

const ACCESSIBILITY_OPTIONS = [
  "Wheelchair Access",
  "Limited Walking",
  "Elevator Required",
  "No Stairs",
  "Audio Guides",
  "Visual Aids",
];

export function PreferencesForm() {
  const router = useRouter();
  const updatePreferences = useFormStore((s) => s.updatePreferences);
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PreferencesFormData>({
    resolver: standardSchemaResolver(preferencesSchema),
    defaultValues: {
      travelStyle: [],
      transportation: [],
      pace: 50,
      dietaryRestrictions: [],
      accessibilityNeeds: [],
    },
  });

  const { field: travelStyleField } = useController({ name: "travelStyle", control });
  const { field: budgetField } = useController({ name: "budget", control });
  const { field: transportField } = useController({ name: "transportation", control });
  const { field: groupField } = useController({ name: "groupDynamics", control });
  const { field: paceField } = useController({ name: "pace", control });
  const { field: dietaryField } = useController({ name: "dietaryRestrictions", control });
  const { field: accessibilityField } = useController({ name: "accessibilityNeeds", control });

  const onSubmit = (data: PreferencesFormData) => {
    setIsSubmitting(true);
    updatePreferences(data);
    router.push("/plan/discover");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Travel Style */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-black">Travel Style</h3>
        <p className="mb-4 text-sm text-[#6c757d]">Choose everything that interests you</p>
        <TravelStyleSelector
          value={travelStyleField.value}
          onChange={travelStyleField.onChange}
          error={errors.travelStyle?.message}
        />
      </div>

      {/* Budget */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-black">Budget</h3>
        <p className="mb-4 text-sm text-[#6c757d]">How much are you planning to spend per day?</p>
        <BudgetSelector
          value={budgetField.value}
          onChange={budgetField.onChange}
          error={errors.budget?.message}
        />
      </div>

      {/* Transportation */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-black">Getting Around</h3>
        <p className="mb-4 text-sm text-[#6c757d]">How do you prefer to travel?</p>
        <TransportationSelector
          value={transportField.value}
          onChange={transportField.onChange}
          error={errors.transportation?.message}
        />
      </div>

      {/* Group Dynamics */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-black">Who&apos;s Traveling?</h3>
        <p className="mb-4 text-sm text-[#6c757d]">This helps us tailor recommendations</p>
        <GroupDynamicsSelector
          value={groupField.value}
          onChange={groupField.onChange}
          error={errors.groupDynamics?.message}
        />
      </div>

      {/* Pace */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-1 text-lg font-bold text-black">Travel Pace</h3>
        <p className="mb-4 text-sm text-[#6c757d]">
          Do you prefer a packed schedule or slow exploration?
        </p>
        <PaceSlider value={paceField.value} onChange={paceField.onChange} />
      </div>

      {/* Optional Sections Toggle */}
      <button
        type="button"
        onClick={() => setShowOptional((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-dashed border-gray-300 p-4 text-sm font-medium text-[#6c757d] transition-colors hover:border-[#2A7BFF] hover:text-[#2A7BFF]"
        aria-expanded={showOptional}
      >
        <span>
          {showOptional ? "Hide" : "Add"} dietary, meal & accessibility preferences (optional)
        </span>
        <svg
          className={`h-5 w-5 transition-transform ${showOptional ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showOptional && (
        <div className="space-y-6">
          {/* Meal Times */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-black">Meal Times</h3>
            <p className="mb-4 text-sm text-[#6c757d]">
              We&apos;ll schedule restaurants around your preferred meal times
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {(
                [
                  { name: "mealTimes.breakfast", label: "Breakfast" },
                  { name: "mealTimes.lunch", label: "Lunch" },
                  { name: "mealTimes.dinner", label: "Dinner" },
                ] as const
              ).map(({ name, label }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="mb-1 block text-sm font-medium text-[#3D4852]"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    type="time"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-black focus:border-[#2A7BFF] focus:outline-none focus:ring-2 focus:ring-[#2A7BFF]/20"
                    {...register(name, {
                      setValueAs: (v: string) => (v === "" ? undefined : v),
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-black">Dietary Restrictions</h3>
            <p className="mb-4 text-sm text-[#6c757d]">
              We&apos;ll filter restaurant recommendations accordingly
            </p>
            <div className="flex flex-wrap gap-3">
              {DIETARY_OPTIONS.map((option) => (
                <Chip
                  key={option}
                  selected={dietaryField.value?.includes(option) ?? false}
                  onClick={() => {
                    const current = dietaryField.value ?? [];
                    dietaryField.onChange(
                      current.includes(option)
                        ? current.filter((v) => v !== option)
                        : [...current, option]
                    );
                  }}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>

          {/* Accessibility Needs */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-lg font-bold text-black">Accessibility Needs</h3>
            <p className="mb-4 text-sm text-[#6c757d]">
              Ensure all recommendations are suitable for you
            </p>
            <div className="flex flex-wrap gap-3">
              {ACCESSIBILITY_OPTIONS.map((option) => (
                <Chip
                  key={option}
                  selected={accessibilityField.value?.includes(option) ?? false}
                  onClick={() => {
                    const current = accessibilityField.value ?? [];
                    accessibilityField.onChange(
                      current.includes(option)
                        ? current.filter((v) => v !== option)
                        : [...current, option]
                    );
                  }}
                >
                  {option}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-[#2A7BFF] to-[#1a5fd9] py-4 font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" spinnerColor="white" />
            Saving preferences…
          </span>
        ) : (
          "Discover Places →"
        )}
      </Button>
    </form>
  );
}

