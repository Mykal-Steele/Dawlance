# Advanced Mode Rules

## Critical Implementation Rules
- **Two-Phase Architecture**: Recommendation selection MUST be separate from itinerary generation
  - Phase 1: Generate recommendations → User selects items (or uses Quick Start mode)
  - Phase 2: Generate itinerary from selected items only
- **Smart Recalculation**: Tiered approach based on edit type
  - Local-only: Notes, descriptions (no API call)
  - Partial: Time shifts using local algorithms
  - Full AI: Structural changes (add/remove activities)
  - Debouncing: 2-3 seconds before API call
- **Server Components First**: Use Client Components only for interactivity (forms, selections, edits)
- **API Route Pattern**: All AI operations in app/api/ routes, never in components
- **Cost Optimization**: AI only for recommendations, itinerary, and chat (not static content)

## Component Structure
```
app/
├── (routes)/
│   ├── page.tsx                    # Landing page with AI
│   ├── plan/
│   │   ├── destination/page.tsx    # Destination input
│   │   ├── weather/page.tsx        # Weather & clothing combined
│   │   ├── preferences/page.tsx    # Visual preference collection
│   │   ├── discover/page.tsx       # Recommendation selection (CRITICAL)
│   │   └── itinerary/page.tsx      # Final plan with AI assistant
├── api/
│   ├── weather/route.ts            # Weather + clothing recommendations
│   ├── recommendations/route.ts    # Generate selection list
│   ├── itinerary/route.ts          # Generate/recalculate plan
│   └── ai/chat/route.ts            # AI assistant chat
components/
├── landing/                        # Landing page components
├── forms/                          # Client Components for input (visual selectors)
├── weather/                        # Weather dashboard
├── discovery/                      # Recommendation selection UI
├── itinerary/                      # Display and edit components
└── ai/                             # AI assistant components
```

## State Management
- **Zustand for ALL client state**: form data, selections, itinerary (with history), AI chat
- React Query for server data caching only
- Master reset function for destination changes
- localStorage persistence for auto-save (every 30 seconds)

## Form Validation
- React Hook Form + Zod for all user inputs
- Validate dates (end > start, future dates only)
- Visual selectors: travel style (multi-select), budget (3-tier), transportation (multi-select), group dynamics, pace (slider)
- Required fields: destination, dates, at least 1 travel style, minimum recommendations selected

## Error Handling
- Error boundaries at route level with recovery UI
- Exponential backoff retry (3 attempts, 1s/2s/4s delays)
- Circuit breaker pattern for external APIs
- Pre-flight validation (distances, time feasibility)
- Graceful degradation with partial results
- Rate limiting (client-side, 5 requests/minute)
- Save selections to localStorage before API calls

## Design System
- Colors: #2A7BFF (Primary), #6DD3B0 (Secondary), #FF8C42 (Tertiary), #F8F9FA (Neutral)
- Typography: Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
- Card-based layouts, image-first design
- Icon-based form selectors (not text-heavy)
- Mobile-first responsive approach

## Critical Terminology
- Discovery phase is "Select for your trip" NOT "Saved Places" or "Favorites"
- Users are actively choosing places for THIS trip, not saving for later
- Use: "Select for your trip", "Add to plan", "Choose places"
- NEVER use: "Save", "Favorite", "Wishlist"

## Performance & Optimization
- Pagination: 12 cards per page
- Next.js Image with blur placeholders and lazy loading
- Parallel API calls with Promise.all
- Code splitting by route
- React.memo for expensive components
- Virtual scrolling for long itineraries
- Target: <3s initial load, <1s route transitions

## Image Strategy
- Google Places API for hotels/restaurants (verified photos)
- Unsplash API for attractions (free, high-quality)
- Category-specific gradient placeholders as fallback
- Generate blur placeholders server-side
- Lazy load with Next.js Image component

## Testing Strategy
- Vitest for unit tests (80% coverage target)
- Playwright for E2E tests (all critical flows)
- MSW for API mocking
- Zod schema validation for all AI responses
- Lighthouse CI with performance budgets

## Advanced Tools Available
- MCP (Model Context Protocol) tools for enhanced AI capabilities
- Browser automation tools for web scraping if needed
- Use these for enhanced recommendation gathering or real-time data