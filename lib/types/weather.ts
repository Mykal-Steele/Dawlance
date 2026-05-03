/**
 * Weather and clothing recommendation data models
 * Used in Step 3 (Weather Forecast & Clothing Recommendations)
 */

export interface WeatherData {
  location: string;
  forecast: DailyForecast[];
  clothingRecommendations: ClothingItem[];
}

export interface DailyForecast {
  date: string;
  tempHigh: number;
  tempLow: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  precipitation: number; // percentage
  uvIndex: number;
  humidity: number;
}

export interface ClothingItem {
  name: string;
  description: string;
  icon: string;
  category: "clothing" | "accessory";
  warning?: string;
}

