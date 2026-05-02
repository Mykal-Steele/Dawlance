"use client";

import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { destinationSchema, type DestinationFormData } from "@/lib/validations";
import { useFormStore } from "@/lib/stores";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Raw HTML form values — date inputs always emit strings
type DestinationFormInput = {
  destination: string;
  startDate: string;
  endDate: string;
};

export function DestinationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateDestination = useFormStore((state) => state.updateDestination);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DestinationFormInput, unknown, DestinationFormData>({
    // z.coerce.date() has `unknown` input in Standard Schema spec — cast is safe
    // because strings are coerced to Dates at runtime
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
      {/* Destination Input */}
      <div>
        <label htmlFor="destination" className="block text-sm font-semibold text-black mb-3">
          Where do you want to go?
        </label>
        <Input
          id="destination"
          type="text"
          placeholder="e.g., Paris, France"
          className="text-black placeholder-gray-400"
          {...register("destination")}
          aria-invalid={errors.destination ? "true" : "false"}
          aria-describedby={errors.destination ? "destination-error" : undefined}
        />
        {errors.destination && (
          <p id="destination-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.destination.message}
          </p>
        )}
      </div>

      {/* Start Date */}
      <div>
        <label htmlFor="startDate" className="block text-sm font-semibold text-black mb-3">
          Start Date
        </label>
        <Input
          id="startDate"
          type="date"
          className="text-black"
          {...register("startDate")}
          aria-invalid={errors.startDate ? "true" : "false"}
          aria-describedby={errors.startDate ? "startDate-error" : undefined}
        />
        {errors.startDate && (
          <p id="startDate-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.startDate.message}
          </p>
        )}
      </div>

      {/* End Date */}
      <div>
        <label htmlFor="endDate" className="block text-sm font-semibold text-black mb-3">
          End Date
        </label>
        <Input
          id="endDate"
          type="date"
          className="text-black"
          {...register("endDate")}
          aria-invalid={errors.endDate ? "true" : "false"}
          aria-describedby={errors.endDate ? "endDate-error" : undefined}
        />
        {errors.endDate && (
          <p id="endDate-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.endDate.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-[#2A7BFF] to-[#1a5fd9] py-4 font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
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

// Made with Bob
