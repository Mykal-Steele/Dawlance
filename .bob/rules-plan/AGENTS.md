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
  - Forms, selections, and edits require Client Components
  - Display and static content should be Server Components

## User Flow Planning
1. Destination and dates input (simple form)
2. Weather forecast display (API integration)
3. Preference collection (multi-field form with validation)
4. **CRITICAL**: Recommendation list generation and user selection
5. Itinerary generation from selected items
6. Itinerary display with edit capability

## State Management Strategy
- Multi-step form data: React Context (destination, dates, preferences)
- Complex itinerary state: Zustand (for undo/redo and edit tracking)
- Server data caching: React Query (weather, recommendations, itinerary)

## API Design Considerations
- Separate endpoints for each phase:
  - `/api/weather` - Weather forecast
  - `/api/recommendations` - Generate selection list
  - `/api/itinerary` - Generate/recalculate plan
- All AI operations in API routes, never in components
- Error handling and retry logic at API level

## Feature Planning Priorities
1. Core user flow (destination → weather → preferences → recommendations → itinerary)
2. Recommendation selection interface (critical for two-phase architecture)
3. Itinerary edit and recalculation mechanism
4. Form validation and error handling
5. Cultural context and attire information
6. Advanced features (undo/redo, export, sharing)