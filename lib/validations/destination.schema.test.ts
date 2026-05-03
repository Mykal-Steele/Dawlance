import { describe, it, expect } from "vitest";
import { destinationSchema } from "./destination.schema";

function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const today = isoDate(0);
const tomorrow = isoDate(1);
const nextWeek = isoDate(7);
const yesterday = isoDate(-1);

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
