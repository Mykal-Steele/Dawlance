import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/test-utils";
import { ActivityCard } from "./ActivityCard";
import type { Activity } from "@/lib/types";

const mockActivity: Activity = {
  id: "act-1",
  time: "09:00",
  duration: 120,
  type: "attraction",
  recommendation: {
    id: "rec-1",
    name: "Eiffel Tower",
    description: "Iconic Paris landmark.",
    category: "attraction",
    estimatedDuration: 120,
    priceRange: 2,
    location: {
      address: "Champ de Mars, Paris",
      coordinates: { lat: 48.8584, lng: 2.2945 },
    },
    openingHours: "09:00-23:00",
    culturalNotes: "Book in advance.",
    imageUrl: "",
    tags: [],
  },
  culturalContext: "Symbol of French engineering",
  attireSuggestion: "Casual",
};

describe("ActivityCard", () => {
  it("displays the activity time", () => {
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    // 09:00 → "9:00 AM"
    expect(screen.getByText("9:00 AM")).toBeInTheDocument();
  });

  it("displays the recommendation name", () => {
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    expect(screen.getByText("Eiffel Tower")).toBeInTheDocument();
  });

  it("displays the cultural context when present", () => {
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    expect(screen.getByText(/symbol of french engineering/i)).toBeInTheDocument();
  });

  it("displays the attire suggestion when present", () => {
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
      />
    );
    expect(screen.getByText("Casual")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={onRemove}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /remove activity/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("calls onEdit when edit button is clicked", () => {
    const onEdit = vi.fn();
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={onEdit}
        onRemove={vi.fn()}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /edit activity/i }));
    expect(onEdit).toHaveBeenCalledWith(0, 0);
  });

  it("hides edit/remove buttons in readOnly mode", () => {
    render(
      <ActivityCard
        activity={mockActivity}
        dayIndex={0}
        activityIndex={0}
        onEdit={vi.fn()}
        onRemove={vi.fn()}
        readOnly={true}
      />
    );
    expect(screen.queryByRole("button", { name: /edit activity/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /remove activity/i })).not.toBeInTheDocument();
  });
});
