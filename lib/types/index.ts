/**
 * Central export point for all type definitions
 * Import types from here throughout the application
 */

// Destination and travel dates
export type { DestinationData } from "./destination";

// User preferences
export type { UserPreferences } from "./preferences";

// Recommendations
export type { Recommendation } from "./recommendation";

// Itinerary
export type { Itinerary, DayPlan, Activity } from "./itinerary";

// Weather
export type { WeatherData, DailyForecast, ClothingItem } from "./weather";

// AI Assistant
export type { AIMessage, AIAction } from "./ai";

// Error handling
export type { ErrorState, RecoveryOption } from "./error";
export { errorMessages } from "./error";

// Made with Bob
