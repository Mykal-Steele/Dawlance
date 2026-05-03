/**
 * User preferences data model
 * Used in Step 4 of the user flow ("Tell AI what you like")
 */

export interface UserPreferences {
  travelStyle: string[]; // ['museums', 'nature', 'culinary', etc.]
  budget: "budget" | "moderate" | "luxury";
  transportation: string[]; // ['train', 'bus', 'walk']
  groupDynamics: "solo" | "family" | "pets";
  pace: number; // 0-100 slider value
  mealTimes?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  dietaryRestrictions?: string[];
  accessibilityNeeds?: string[];
}

