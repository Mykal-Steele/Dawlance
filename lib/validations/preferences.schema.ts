import { z } from "zod";

/**
 * Validation schema for user travel preferences
 * 
 * Validates:
 * - Travel style (at least one required)
 * - Budget tier (budget, moderate, luxury)
 * - Transportation methods (at least one required)
 * - Group dynamics (solo, family, pets)
 * - Pace (0-100 slider value)
 * - Optional meal times (HH:MM format)
 * - Optional dietary restrictions
 * - Optional accessibility needs
 */
export const preferencesSchema = z.object({
  travelStyle: z
    .array(z.string())
    .min(1, "Select at least one travel style")
    .max(5, "Select up to 5 travel styles"),
  budget: z.enum(["budget", "moderate", "luxury"], {
    message: "Budget must be budget, moderate, or luxury",
  }),
  transportation: z
    .array(z.string())
    .min(1, "Select at least one transportation method")
    .max(5, "Select up to 5 transportation methods"),
  groupDynamics: z.enum(["solo", "family", "pets"], {
    message: "Group dynamics must be solo, family, or pets",
  }),
  pace: z
    .number()
    .min(0, "Pace must be between 0 and 100")
    .max(100, "Pace must be between 0 and 100"),
  mealTimes: z
    .object({
      breakfast: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
        .optional(),
      lunch: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
        .optional(),
      dinner: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)")
        .optional(),
    })
    .optional(),
  dietaryRestrictions: z
    .array(z.string())
    .max(10, "Select up to 10 dietary restrictions")
    .optional(),
  accessibilityNeeds: z
    .array(z.string())
    .max(10, "Select up to 10 accessibility needs")
    .optional(),
});

/**
 * Type inference from schema
 */
export type PreferencesFormData = z.infer<typeof preferencesSchema>;

/**
 * Partial schema for progressive form validation
 * Allows validating individual fields before full submission
 */
export const partialPreferencesSchema = preferencesSchema.partial();

// Made with Bob
