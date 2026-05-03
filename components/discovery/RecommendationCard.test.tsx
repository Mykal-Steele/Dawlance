import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/lib/test-utils";
import { RecommendationCard } from "./RecommendationCard";
import type { Recommendation } from "@/lib/types";

const mockRec: Recommendation = {
  id: "rec-1",
  name: "Eiffel Tower",
  description: "Iconic Paris landmark with sweeping city views.",
  category: "attraction",
  estimatedDuration: 120,
  priceRange: 2,
  location: {
    address: "Champ de Mars, Paris",
    coordinates: { lat: 48.8584, lng: 2.2945 },
  },
  openingHours: "09:00-23:00",
  culturalNotes: "Book tickets in advance.",
  imageUrl: "",
  tags: ["landmark", "views"],
};

describe("RecommendationCard", () => {
  it("renders the recommendation name", () => {
    render(<RecommendationCard recommendation={mockRec} isSelected={false} onToggle={vi.fn()} />);
    expect(screen.getByText("Eiffel Tower")).toBeInTheDocument();
  });

  it("renders the category badge", () => {
    render(<RecommendationCard recommendation={mockRec} isSelected={false} onToggle={vi.fn()} />);
    expect(screen.getByText("Attraction")).toBeInTheDocument();
  });

  it("calls onToggle with the recommendation when the add button is clicked", () => {
    const onToggle = vi.fn();
    render(<RecommendationCard recommendation={mockRec} isSelected={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole("button", { name: /add eiffel tower/i }));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(mockRec);
  });

  it("shows remove label when already selected", () => {
    render(<RecommendationCard recommendation={mockRec} isSelected={true} onToggle={vi.fn()} />);
    expect(screen.getByRole("button", { name: /remove eiffel tower/i })).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<RecommendationCard recommendation={mockRec} isSelected={false} onToggle={vi.fn()} />);
    expect(screen.getByText(/iconic paris landmark/i)).toBeInTheDocument();
  });
});
