# Phase 5: Itinerary Generation & Basic Display (Weeks 9-10)

## MVP Milestone — Core flow complete by end of Week 10

## Goal

Implement Phase 2 of the two-phase architecture: take the user's selected recommendations and generate a chronological daily itinerary. Build the itinerary display view. Editing and AI chat are added in later phases — this phase focuses on generation and read-only display.

## References (read before starting)

- `00-overview.md § User Flow > Step 6: Itinerary Generation` — loading state spec, AI status messages
- `00-overview.md § User Flow > Step 7: Itinerary Display` — activity card spec, day tabs, timeline layout, AI panel placeholder
- `00-overview.md § API Design > 3. Itinerary Generation API` — `ItineraryRequest`, `ItineraryResponse`, `Itinerary`, `DayPlan`, `Activity` types, GPT-4 prompt template
- `00-overview.md § Data Models > TypeScript Interfaces > Itinerary, DayPlan, Activity`
- `00-overview.md § State Management > Layer 1 > ItineraryStore interface` — `history`, `historyIndex`, `canUndo`, `canRedo`, `editActivity()`
- `00-overview.md § State Management > Layer 2 > React Query` — itinerary mutation updates ItineraryStore on success
- `00-overview.md § Error Handling > API Retry Logic` — apply to `/api/itinerary`
- `00-overview.md § Performance > State Optimization` — wrap `ActivityCard` in `React.memo`
- `00-overview.md § Cost Analysis > Cost Optimization > Tiered Models` — use GPT-4 for itinerary generation

## Tasks

### Itinerary Generation API (`/api/itinerary`)

- [ ] Create `app/api/itinerary/route.ts`
  - [ ] Integrate OpenAI API using **GPT-4** (not gpt-3.5-turbo — itinerary is quality-critical)
  - [ ] Use the prompt template from overview (chronological, geographic optimization, meal times, cultural context, attire suggestions)
  - [ ] Implement Zod schema validation for AI response structure
  - [ ] Implement retry logic (`retryWithBackoff`)
  - [ ] Add request coalescing (Map-based deduplication of in-flight requests for identical selections)
  - [ ] Return `ItineraryResponse` type

### Itinerary Display

- [ ] Build `ItineraryView` Client Component (`components/itinerary/ItineraryView.tsx`)
  - [ ] Reads from `useItineraryStore`
  - [ ] Day selector tabs (All Days, Day 1, Day 2, ...)
  - [ ] Simple list view per day (defer visual timeline to Phase 8)
  - [ ] "Your AI-Generated Plan" heading with descriptive subtitle
  - [ ] Undo/redo buttons in header (wired to store, functional in Phase 7 — render but disable for now)
  - [ ] Export button placeholder (functional in Phase 8)
  - [ ] Share button placeholder (functional in Phase 8)
- [ ] Build `DayView` component — collapsible day sections with activity list and day summary
- [ ] Build `ActivityCard` Client Component (`components/itinerary/ActivityCard.tsx`)
  - [ ] Timestamp (HH:MM), duration, large image, activity title, description
  - [ ] Cultural context badges (e.g., "Quiet Manners", "Comfortable Shoes")
  - [ ] Attire suggestions (e.g., "Casual preferred")
  - [ ] Category tags
  - [ ] Edit button (wired in Phase 7 — render but disable for now)
  - [ ] Travel time to next activity
  - [ ] Wrap in `React.memo`
- [ ] Build `DaySelector` component — day tabs
- [ ] Build `app/plan/itinerary/page.tsx`
  - [ ] Loading state: progress indicator + AI animation + status messages ("Arranging your activities...", "Optimizing routes...")
  - [ ] Error state using ErrorBoundary
- [ ] Wire up React Query mutation: `useMutation` calling `/api/itinerary`, on success call `itineraryStore.updateItinerary()`

## Deliverables

- `/api/itinerary` route using GPT-4
- Itinerary display interface (day tabs + activity cards)
- ItineraryStore wired up
- Loading state with AI animation

## Testing Criteria

- AI generates a logically sequenced itinerary from selected recommendations
- All selected recommendations appear in the generated itinerary
- Itinerary days are chronologically ordered
- Activity timestamps are realistic (no overlaps, travel time accounted for)
- Cultural context and attire suggestions are populated for each activity
- Loading state visible during generation (minimum 3 status messages cycle)
- Error boundary catches and displays API failures gracefully
