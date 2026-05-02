# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Overview
Smart travel planning web application using Next.js 14+ (App Router), React, TypeScript, and Tailwind CSS. Generates AI-driven, customizable travel itineraries with dynamic recommendation selection.

## Core User Flow (CRITICAL)
1. User inputs destination and travel dates
2. System provides weather forecast and clothing recommendations
3. User inputs flexible preferences (budget, meals, rest times, group dynamics, transportation, travel style)
4. **CRITICAL RULE**: System generates recommendation list of places, hotels, and restaurants. User MUST select items from this list (dynamic recommendation selection stage)
5. After user selections, system generates chronological, linear daily travel plan with cultural context
6. Plan is fully adjustable - edits trigger automatic AI recalculation of entire itinerary

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
- Server Components by default, Client Components only when needed (interactivity, hooks, browser APIs)
- API routes in app/api/ for backend logic
- Separate recommendation selection stage from itinerary generation (two distinct phases)
- Real-time itinerary recalculation on user edits

## Code Style
- TypeScript strict mode enabled
- Functional components with TypeScript interfaces
- Tailwind CSS for styling (no CSS modules)
- Named exports for components
- Async/await for asynchronous operations
- Error boundaries for error handling

## Key Conventions
- Components in components/ directory
- Types in types/ or lib/types/
- API utilities in lib/ or utils/
- State management: React Context or Zustand for complex state
- Form handling: React Hook Form with Zod validation