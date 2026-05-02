import { z } from "zod";

/**
 * Validation schema for destination and travel dates
 * 
 * Validates:
 * - Destination name (min 2 characters)
 * - Start and end dates
 * - End date must be after start date
 * - Dates must be in the future
 */
export const destinationSchema = z
  .object({
    destination: z
      .string()
      .min(2, "Destination must be at least 2 characters")
      .max(100, "Destination must be less than 100 characters"),
    startDate: z.coerce.date({
      message: "Start date must be a valid date",
    }),
    endDate: z.coerce.date({
      message: "End date must be a valid date",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.startDate >= today;
    },
    {
      message: "Start date must be today or in the future",
      path: ["startDate"],
    }
  );

/**
 * Type inference from schema
 */
export type DestinationFormData = z.infer<typeof destinationSchema>;

// Made with Bob
