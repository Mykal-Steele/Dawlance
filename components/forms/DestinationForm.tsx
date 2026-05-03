"use client";

import { useForm, type SubmitHandler, type Resolver, Controller } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { destinationSchema, type DestinationFormData } from "@/lib/validations";
import { useFormStore, resetAllStores } from "@/lib/stores";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { CityAutocomplete } from "./CityAutocomplete";
import { DateRangePicker } from "./DateRangePicker";

// Raw form input type — all strings, coerced by schema on submit
type DestinationFormInput = {
  destination: string;
  startDate: string;
  endDate: string;
};

export function DestinationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateDestination = useFormStore((state) => state.updateDestination);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DestinationFormInput, unknown, DestinationFormData>({
    resolver: standardSchemaResolver(destinationSchema) as Resolver<
      DestinationFormInput,
      unknown,
      DestinationFormData
    >,
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit: SubmitHandler<DestinationFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Reset all downstream state before setting the new destination
      resetAllStores();
      queryClient.removeQueries({ queryKey: ["recommendations"] });

      updateDestination({
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
      });
      router.push("/plan/weather");
    } catch (error) {
      console.error("Error submitting destination:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Destination */}
      <div>
        <label htmlFor="destination" className="mb-3 block text-sm font-semibold text-black">
          Where do you want to go?
        </label>
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <CityAutocomplete
              id="destination"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={!!errors.destination}
            />
          )}
        />
        {errors.destination && (
          <p id="destination-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.destination.message}
          </p>
        )}
      </div>

      {/* Date range */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-black">
          When are you travelling?
        </label>
        <Controller
          name="startDate"
          control={control}
          render={({ field: startField }) => (
            <Controller
              name="endDate"
              control={control}
              render={({ field: endField }) => (
                <DateRangePicker
                  startValue={startField.value}
                  endValue={endField.value}
                  onRangeChange={(start, end) => {
                    setValue("startDate", start, { shouldValidate: true });
                    setValue("endDate", end, { shouldValidate: true });
                  }}
                  onStartBlur={startField.onBlur}
                  onEndBlur={endField.onBlur}
                  startError={!!errors.startDate}
                  endError={!!errors.endDate}
                />
              )}
            />
          )}
        />
        {(errors.startDate ?? errors.endDate) && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {errors.startDate?.message ?? errors.endDate?.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-linear-to-r from-[#2A7BFF] to-[#1a5fd9] py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            Processing...
          </span>
        ) : (
          "Continue to Weather"
        )}
      </Button>
    </form>
  );
}
