/**
 * Recommendation data model
 * Used in Step 5 (Discovery) and throughout itinerary
 */

export interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: "attraction" | "hotel" | "restaurant";
  estimatedDuration: number; // minutes
  priceRange: 1 | 2 | 3;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  openingHours: string;
  culturalNotes: string;
  imageUrl: string;
  tags: string[];
}

// Made with Bob
