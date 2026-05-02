import { describe, it, expect } from "vitest";
import { preferencesSchema } from "./preferences.schema";

const validPreferences = {
  travelStyle: ["museums"],
  budget: "moderate" as const,
  transportation: ["train"],
  groupDynamics: "solo" as const,
  pace: 50,
};

describe("preferencesSchema", () => {
  it("accepts valid preferences", () => {
    expect(preferencesSchema.safeParse(validPreferences).success).toBe(true);
  });

  it("rejects empty travel style array", () => {
    const result = preferencesSchema.safeParse({ ...validPreferences, travelStyle: [] });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("travelStyle");
    }
  });

  it("rejects invalid budget value", () => {
    const result = preferencesSchema.safeParse({ ...validPreferences, budget: "rich" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid group dynamics", () => {
    const result = preferencesSchema.safeParse({ ...validPreferences, groupDynamics: "couple" });
    expect(result.success).toBe(false);
  });

  it("rejects pace outside 0-100 range", () => {
    const over = preferencesSchema.safeParse({ ...validPreferences, pace: 101 });
    const under = preferencesSchema.safeParse({ ...validPreferences, pace: -1 });
    expect(over.success).toBe(false);
    expect(under.success).toBe(false);
  });

  it("accepts valid meal times", () => {
    const result = preferencesSchema.safeParse({
      ...validPreferences,
      mealTimes: { breakfast: "08:00", lunch: "12:30", dinner: "19:00" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid meal time format", () => {
    const result = preferencesSchema.safeParse({
      ...validPreferences,
      mealTimes: { breakfast: "8am" },
    });
    expect(result.success).toBe(false);
  });

  it("accepts preferences without optional fields", () => {
    expect(preferencesSchema.safeParse(validPreferences).success).toBe(true);
  });
});
