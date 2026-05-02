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
│   ├── page.tsx                    # Landing/destination input
│   ├── weather/page.tsx            # Weather forecast display
│   ├── preferences/page.tsx        # User preference collection
│   ├── recommendations/page.tsx    # Selection interface (CRITICAL)
│   └── itinerary/page.tsx         # Final plan with edit capability
├── api/
│   ├── weather/route.ts
│   ├── recommendations/route.ts    # Generate selection list
│   └── itinerary/route.ts         # Generate/recalculate plan
components/
├── forms/                          # Client Components for input
├── recommendations/                # Selection UI components
└── itinerary/                      # Display and edit components
```

## State Management
- Use React Context for multi-step form data (destination, dates, preferences)
- Zustand for complex itinerary state (enables undo/redo for edits)
- Server state with React Query for API data caching

## Form Validation
- React Hook Form + Zod for all user inputs
- Validate dates (end > start, future dates only)
- Budget validation (min/max ranges)
- Required fields: destination, dates, at least 3 selected recommendations

## Error Handling
- Error boundaries at route level
- API error responses with specific codes
- Fallback UI for failed AI generations
- Retry mechanism for API calls

## No Access To
- MCP tools
- Browser automation tools