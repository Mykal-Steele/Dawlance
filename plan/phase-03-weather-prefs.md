# Phase 3: Weather & Preferences (Weeks 4-5)

## Goal

Implement the weather + clothing dashboard (Server Component, rule-based — no AI) and the visual preferences form. These two steps give the AI the context it needs to generate relevant recommendations.

## References (read before starting)

- `00-overview.md § User Flow > Step 3: Weather Forecast & Clothing Recommendations` — combined view layout spec, clothing card details, warning badges
- `00-overview.md § User Flow > Step 4: Preferences Input` — all preference fields, icon-based selectors, slider, optional sections
- `00-overview.md § API Design > 1. Weather API` — endpoint spec, query params, `WeatherResponse` type, rule-based clothing approach (NOT AI)
- `00-overview.md § Data Models > TypeScript Interfaces > WeatherData, DailyForecast, ClothingItem, UserPreferences`
- `00-overview.md § Data Models > Zod Validation Schemas > preferencesSchema`
- `00-overview.md § State Management > Layer 1 > FormStore` — `updatePreferences()` action
- `00-overview.md § Error Handling > API Retry Logic` — apply exponential backoff (3 retries: 1s, 2s, 4s) to weather API calls
- `00-overview.md § Error Handling > State Persistence` — implement 30-second auto-save to localStorage

## Tasks

### Weather API (`/api/weather`)

- [ ] Create `app/api/weather/route.ts`
  - [ ] Integrate external weather API (OpenWeatherMap or WeatherAPI.com)
  - [ ] Generate clothing recommendations using **rule-based static logic only** (not AI)
  - [ ] Transform response to `WeatherResponse` type
  - [ ] Cache results for 30 minutes (React Query staleTime)
  - [ ] Implement retry with exponential backoff (`lib/utils/retry.ts` from Phase 1)
  - [ ] Handle invalid location errors (return 400)

### Weather Dashboard Component

- [ ] Build `WeatherDashboard` Server Component (`components/weather/WeatherDashboard.tsx`)
  - [ ] `WeatherForecast` sub-component: multi-day forecast cards, temperature high/low, weather icons, precipitation %
  - [ ] `WeatherCard` sub-component: single day forecast card
  - [ ] `ClothingRecommendations` sub-component: clothing item cards with icons, names, material descriptions, color-coded by category, warning badges for extreme weather (e.g., "Heavy denim uncomfortable in high humidity")
- [ ] Build `app/plan/weather/page.tsx`

### Preferences Form

- [ ] Build `PreferencesForm` Client Component (`components/forms/PreferencesForm.tsx`)
  - [ ] `TravelStyleSelector`: multi-select chips with icons (Museums, Nature, Culinary, History, Nightlife, Shopping, Relaxation)
  - [ ] `BudgetSelector`: 3-tier visual selection ($ Budget, $$ Moderate, $$$ Luxury)
  - [ ] `TransportationSelector`: icon-based multi-select (Train, Bus, Walk) with checkmarks
  - [ ] `GroupDynamicsSelector`: icon-based single-select (Solo, Family, Pets) with checkmarks
  - [ ] `PaceSlider`: 0-100 range, labeled "Quick Bites" (low) to "Long Dinners" (high), "Balanced" center
  - [ ] Optional expandable section: Meal Times (time pickers for breakfast, lunch, dinner)
  - [ ] Optional section: Dietary Restrictions (multi-select chips)
  - [ ] Optional section: Accessibility Needs (multi-select)
  - [ ] "Discover Places" CTA button at bottom
- [ ] Implement `preferencesSchema` Zod validation
- [ ] On submit: call `useFormStore().updatePreferences()` then navigate to `/plan/discover`
- [ ] Build `app/plan/preferences/page.tsx`

### Cross-Cutting

- [ ] Implement `useAutoSave()` hook: save form state + selections to `localStorage['travel-plan-draft']` every 30 seconds
- [ ] Add unit tests for form validation (travelStyle min 1, budget enum, transportation min 1)

## Deliverables

- `/api/weather` route with rule-based clothing logic
- Combined weather + clothing dashboard
- Visual preferences form with all icon-based selectors
- Custom form components (Chip, Slider, IconSelector)
- Form validation with Zod
- 30-second auto-save to localStorage

## Testing Criteria

- Weather API returns data matching `WeatherResponse` type
- Clothing recommendations correctly reflect weather conditions (e.g., umbrella for rain)
- `preferencesSchema` rejects missing required fields
- All form visual selectors work on touch devices
- Form data persists in FormStore after navigating forward/back
- Auto-save writes to localStorage every 30 seconds
