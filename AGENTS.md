# AGENTS.md

This file provides guidance to agents when working with code in this repository.


## Project Overview

Smart travel planning web application using Next.js 14+ (App Router), React, TypeScript, and Tailwind CSS. Features an AI travel assistant that generates personalized, customizable travel itineraries through a streamlined flow.

## Core User Flow (CRITICAL)

1. User inputs destination and travel dates
2. System provides combined weather forecast and clothing recommendations (rule-based, not AI)
3. User inputs visual preferences (travel style chips, budget selector, transportation icons, group dynamics, pace slider)
4. **CRITICAL RULE**: System generates recommendation list of places, hotels, and restaurants. User can choose "Quick Start" (pre-selected items) or browse all. User MUST select items from this list (active selection for current trip - NOT "saved places" or "favorites")
5. After user selections, system generates chronological, linear daily travel plan with cultural context
6. AI assistant provides ongoing support via chat interface
7. Plan is fully adjustable - edits trigger smart recalculation (local-only, partial, or full AI recalc based on edit type)

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Architecture Principles

- Use Next.js App Router (app/ directory structure)
- Server Components by default, Client Components only when needed (interactivity, hooks, browser APIs, AI chat)
- API routes in app/api/ for backend logic
- Separate recommendation selection stage from itinerary generation (two distinct phases)
- **Cost-optimized AI**: AI only for recommendations, itinerary, and chat (not static content)
- **Smart recalculation**: Tiered approach (local-only, partial, full AI) based on edit type
- **Performance-first**: Pagination (12 cards/page), image optimization, code splitting
- Mobile-first, image-rich design with custom design system

## Code Style

- TypeScript strict mode enabled
- Functional components with TypeScript interfaces
- Tailwind CSS with custom design system (colors: #2A7BFF, #6DD3B0, #FF8C42, #F8F9FA)
- Typography: Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
- Named exports for components
- Async/await for asynchronous operations
- Error boundaries for error handling

## Key Conventions

- Components in components/ directory (including ai/, landing/, discovery/ subdirectories)
- Types in lib/types/ (including ai.ts for AI assistant types)
- API utilities in lib/api/
- **State management**: Zustand for ALL client state (form, selections, itinerary, AI chat), React Query for server data
- Form handling: React Hook Form with Zod validation
- Visual form components: Icon-based selectors, chips, sliders
- **Testing**: Vitest (unit), Playwright (E2E), MSW (API mocking), 80% coverage target
- **Error handling**: Retry logic, circuit breakers, graceful degradation
- **Image strategy**: Google Places (hotels/restaurants), Unsplash (attractions), gradient placeholders (fallback)

## Design System

- Primary: #2A7BFF (Blue) - Main actions, AI branding
- Secondary: #6DD3B0 (Mint Green) - Success, highlights
- Tertiary: #FF8C42 (Orange) - Warnings, attention
- Card-based layouts with rounded corners (12-16px)
- Image-first design for recommendations
- Mobile-first responsive approach
