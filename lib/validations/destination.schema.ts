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
    startDate: z
      .string()
      .min(1, "Start date is required")
      .transform((s, ctx) => {
        const d = new Date(`${s}T12:00:00`);
        if (isNaN(d.getTime())) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Start date must be a valid date" });
          return z.NEVER;
        }
        return d;
      }),
    endDate: z
      .string()
      .min(1, "End date is required")
      .transform((s, ctx) => {
        const d = new Date(`${s}T12:00:00`);
        if (isNaN(d.getTime())) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: "End date must be a valid date" });
          return z.NEVER;
        }
        return d;
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
