import { describe, it, expect } from "vitest";
import { render, screen } from "@/lib/test-utils";
import { ProgressIndicator } from "./ProgressIndicator";

describe("ProgressIndicator", () => {
  it("renders the correct number of step indicators", () => {
    const { container } = render(<ProgressIndicator currentStep={1} totalSteps={5} />);
    // Each step is a small div circle; there should be 5
    const stepDots = container.querySelectorAll(".flex.h-4.w-4");
    expect(stepDots).toHaveLength(5);
  });

  it("renders the current step label when steps provided", () => {
    render(
      <ProgressIndicator
        currentStep={3}
        steps={["Destination", "Weather", "Preferences", "Discover", "Itinerary"]}
      />
    );
    // Only the active step label is rendered
    expect(screen.getByText("Preferences")).toBeInTheDocument();
  });

  it("highlights the active step", () => {
    const { container } = render(<ProgressIndicator currentStep={2} totalSteps={5} />);
    // Steps 1 and 2 should have the active (blue) border class
    const activeDots = container.querySelectorAll(".border-\\[\\#2A7BFF\\]");
    expect(activeDots.length).toBeGreaterThanOrEqual(2);
  });

  it("fills progress bar proportionally", () => {
    const { container } = render(<ProgressIndicator currentStep={3} totalSteps={5} />);
    const progressFill = container.querySelector(".h-full.bg-gradient-to-r") as HTMLElement;
    expect(progressFill).not.toBeNull();
    expect(progressFill.style.width).toBe("60%");
  });

  it("shows 100% fill at last step", () => {
    const { container } = render(<ProgressIndicator currentStep={5} totalSteps={5} />);
    const fill = container.querySelector(".h-full.bg-gradient-to-r") as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("accepts a custom step count", () => {
    const { container } = render(<ProgressIndicator currentStep={1} totalSteps={3} />);
    const stepDots = container.querySelectorAll(".flex.h-4.w-4");
    expect(stepDots).toHaveLength(3);
  });
});
