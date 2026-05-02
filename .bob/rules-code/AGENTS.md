# Code Mode Rules

## Critical Implementation Rules

- **Two-Phase Architecture**: Recommendation selection MUST be separate from itinerary generation
  - Phase 1: Generate recommendations → User selects items
  - Phase 2: Generate itinerary from selected items only
- **Dynamic Recalculation**: Any itinerary edit triggers full AI recalculation of remaining schedule
- **Server Components First**: Use Client Components only for interactivity (forms, selections, edits)
- **API Route Pattern**: All AI operations in app/api/ routes, never in components

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

- Use React Context for multi-step form data (destination, dates, preferences)
- Zustand for complex itinerary state (enables undo/redo for edits) and AI chat history
- Server state with React Query for API data caching

## Form Validation

- React Hook Form + Zod for all user inputs
- Validate dates (end > start, future dates only)
- Visual selectors: travel style (multi-select), budget (3-tier), transportation (multi-select), group dynamics, pace (slider)
- Required fields: destination, dates, at least 1 travel style, minimum recommendations selected

## Error Handling

- Error boundaries at route level
- API error responses with specific codes
- Fallback UI for failed AI generations
- Retry mechanism for API calls
- AI chat error handling with fallback responses

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

## No Access To

- MCP tools
- Browser automation tools
