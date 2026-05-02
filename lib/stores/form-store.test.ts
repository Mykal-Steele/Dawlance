import { describe, it, expect, beforeEach } from "vitest";
import { useFormStore } from "./form-store";

const mockDestinationData = {
  destination: "Paris",
  startDate: new Date("2026-06-01"),
  endDate: new Date("2026-06-05"),
};

const mockPreferences = {
  travelStyle: ["museums", "culinary"],
  budget: "moderate" as const,
  transportation: ["train", "walk"],
  groupDynamics: "solo" as const,
  pace: 50,
};

describe("FormStore", () => {
  beforeEach(() => {
    useFormStore.getState().reset();
  });

  it("initialises with empty state", () => {
    const state = useFormStore.getState();
    expect(state.destination).toBe("");
    expect(state.startDate).toBeNull();
    expect(state.endDate).toBeNull();
    expect(state.travelers).toBe(1);
    expect(state.preferences).toBeNull();
  });

  it("stores destination data correctly", () => {
    useFormStore.getState().updateDestination(mockDestinationData);
    const state = useFormStore.getState();
    expect(state.destination).toBe("Paris");
    expect(state.startDate).toEqual(new Date("2026-06-01"));
    expect(state.endDate).toEqual(new Date("2026-06-05"));
  });

  it("stores preferences correctly", () => {
    useFormStore.getState().updatePreferences(mockPreferences);
    const state = useFormStore.getState();
    expect(state.preferences).toEqual(mockPreferences);
    expect(state.preferences?.budget).toBe("moderate");
    expect(state.preferences?.travelStyle).toContain("museums");
  });

  it("reset clears all fields to initial values", () => {
    useFormStore.getState().updateDestination(mockDestinationData);
    useFormStore.getState().updatePreferences(mockPreferences);
    useFormStore.getState().reset();
    const state = useFormStore.getState();
    expect(state.destination).toBe("");
    expect(state.startDate).toBeNull();
    expect(state.endDate).toBeNull();
    expect(state.preferences).toBeNull();
    expect(state.travelers).toBe(1);
  });

  it("preserves existing fields when updating destination", () => {
    useFormStore.getState().updatePreferences(mockPreferences);
    useFormStore.getState().updateDestination(mockDestinationData);
    expect(useFormStore.getState().preferences).toEqual(mockPreferences);
  });
});
