import { describe, it, expect } from "vitest";
import { destinationSchema } from "./destination.schema";

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

describe("destinationSchema", () => {
  it("accepts valid destination data", () => {
    const result = destinationSchema.safeParse({
      destination: "Paris",
      startDate: tomorrow,
      endDate: nextWeek,
    });
    expect(result.success).toBe(true);
  });

  it("rejects destination shorter than 2 characters", () => {
    const result = destinationSchema.safeParse({
      destination: "P",
      startDate: tomorrow,
      endDate: nextWeek,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("destination");
    }
  });

  it("rejects when end date is before start date", () => {
    const result = destinationSchema.safeParse({
      destination: "Paris",
      startDate: nextWeek,
      endDate: tomorrow,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("endDate");
    }
  });

  it("rejects a past start date", () => {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const result = destinationSchema.safeParse({
      destination: "Paris",
      startDate: yesterday,
      endDate: nextWeek,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("startDate");
    }
  });

  it("accepts today as start date", () => {
    const result = destinationSchema.safeParse({
      destination: "Paris",
      startDate: today,
      endDate: nextWeek,
    });
    expect(result.success).toBe(true);
  });
});
