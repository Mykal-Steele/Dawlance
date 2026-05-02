# Ask Mode Rules

## Project Context

Smart travel planning application with AI-driven itinerary generation. Focus on explaining the two-phase architecture and user flow when answering questions.

## Key Architectural Concepts to Explain

- **Two-Phase Design**: Recommendation generation is separate from itinerary creation
  - Phase 1: AI generates list of places/hotels/restaurants based on preferences
  - Phase 2: User selects items, then AI creates chronological daily plan
- **Dynamic Recalculation**: Edits trigger full AI recalculation of remaining schedule
- **Server vs Client Components**: Most components are Server Components for performance

## Common Question Areas

- Next.js App Router patterns and file structure
- State management approach (Context for forms, Zustand for itinerary)
- Form validation with React Hook Form + Zod
- API route organization for AI operations
- Weather API integration and clothing recommendations
- Cultural context and attire information in itineraries

## Documentation Focus

- Explain the critical separation between recommendation selection and itinerary generation
- Clarify when to use Server Components vs Client Components
- Describe the multi-step form flow and state persistence
- Detail the itinerary edit and recalculation mechanism

## Response Style

- Provide clear explanations of architectural decisions
- Reference specific files and components when explaining concepts
- Include code examples for complex patterns
- Explain trade-offs and alternatives when relevant
