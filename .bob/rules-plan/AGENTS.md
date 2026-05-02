# Plan Mode Rules

## Planning Focus
When planning features for this travel application, always consider the two-phase architecture and user flow constraints.

## Critical Architecture Constraints
- **Two-Phase Separation**: Recommendation generation MUST be separate from itinerary creation
  - Never combine these into a single step
  - User selection is a required intermediate step
- **Dynamic Recalculation**: Any itinerary edit requires full AI recalculation
  - Plan for efficient state management to handle this
  - Consider undo/redo functionality from the start
- **Server-First Approach**: Default to Server Components, only use Client Components when necessary
  - Forms, selections, edits, and AI chat require Client Components
  - Display and static content should be Server Components

## User Flow Planning
1. Landing page with AI introduction
2. Destination and dates input (simple form)
3. Weather forecast + clothing recommendations (combined view)
4. Preference collection (visual selectors: chips, icons, sliders)
5. **CRITICAL**: Recommendation list generation and user selection (NOT "saved places")
6. Itinerary generation from selected items
7. Itinerary display with AI assistant and edit capability

## State Management Strategy
- Multi-step form data: React Context (destination, dates, preferences)
- Complex itinerary state: Zustand (for undo/redo and edit tracking)
- AI chat history: Zustand
- Server data caching: React Query (weather, recommendations, itinerary)

## API Design Considerations
- Separate endpoints for each phase:
  - `/api/weather` - Weather forecast + clothing recommendations
  - `/api/recommendations` - Generate selection list
  - `/api/itinerary` - Generate/recalculate plan
  - `/api/ai/chat` - AI assistant chat
- All AI operations in API routes, never in components
- Error handling and retry logic at API level

## Design System Considerations
- Colors: #2A7BFF (Primary), #6DD3B0 (Secondary), #FF8C42 (Tertiary)
- Typography: Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
- Mobile-first, image-rich, card-based layouts
- Icon-based form selectors (not text-heavy)

## Critical Terminology
- Discovery phase: "Select for your trip" NOT "Saved Places" or "Favorites"
- Users actively choose places for THIS trip, not saving for later
- Use: "Select for your trip", "Add to plan", "Choose places"
- NEVER: "Save", "Favorite", "Wishlist"

## Feature Planning Priorities
1. Core user flow (landing → destination → weather → preferences → discovery → itinerary)
2. AI assistant integration throughout the flow
3. Visual preference selectors (chips, icons, sliders)
4. Image-rich recommendation selection interface (critical for two-phase architecture)
5. Itinerary edit and recalculation mechanism
6. Form validation and error handling
7. Cultural context and attire information
8. Advanced features (undo/redo, export, sharing)