# Phase 1: Foundation Setup (Weeks 1-2)

## Goal

Establish project structure, design system, and core infrastructure. Everything built here is the scaffolding every subsequent phase depends on — get types, stores, and UI components right before adding features.

## References (read before starting)

- `00-overview.md § Technology Stack` — framework and tooling decisions
- `00-overview.md § Design System` — Tailwind color palette (#2A7BFF, #6DD3B0, #FF8C42, #F8F9FA), typography (Plus Jakarta Sans, Be Vietnam Pro), component patterns
- `00-overview.md § Component Architecture > Directory Structure` — the full `app/`, `components/`, `lib/` tree to create
- `00-overview.md § Data Models > TypeScript Interfaces` — all interfaces to define in this phase
- `00-overview.md § Data Models > Zod Validation Schemas` — schemas to create
- `00-overview.md § State Management Strategy > Layer 1: Client State (Zustand)` — four store interfaces to implement (FormStore, SelectionStore, ItineraryStore, AIStore)
- `00-overview.md § Error Handling > Error Recovery UI` — `ErrorState` interface and `errorMessages` config for the error boundary

## Tasks

- [ ] Initialize Next.js 14+ project with TypeScript strict mode
- [ ] Configure Tailwind CSS with custom design system
  - [ ] Color palette: #2A7BFF (primary), #6DD3B0 (secondary), #FF8C42 (tertiary), #F8F9FA (neutral), #3D4852 (text)
  - [ ] Typography: Plus Jakarta Sans (headlines), Be Vietnam Pro (body/labels)
  - [ ] Custom component classes for cards, buttons, forms
- [ ] Set up ESLint and Prettier
- [ ] Create full directory structure (`app/`, `components/`, `lib/` as per overview)
- [ ] Define all TypeScript interfaces and types in `lib/types/` (destination, preferences, recommendation, itinerary, weather, ai)
- [ ] Create Zod validation schemas in `lib/validations/` (destination, preferences)
- [ ] Set up React Query provider in root layout
- [ ] Implement all four Zustand stores in `lib/stores/` (formStore, selectionStore, itineraryStore, aiStore)
- [ ] Create basic layout components: Header, Footer, BottomNav (mobile), Sidebar (desktop), ProgressIndicator
- [ ] Implement ErrorBoundary component using `ErrorState` interface and `errorMessages` config
- [ ] Set up environment variables structure (`.env.local.example` with OpenAI, Google Places, Unsplash, Weather API keys)
- [ ] Source or create AI assistant avatar asset (stock illustration)
- [ ] Build reusable UI components using shadcn/ui primitives: Button, Card, Input, Select, DatePicker, Slider, Chip, Badge, Modal, Tabs, LoadingSpinner
- [ ] Set up Vitest and React Testing Library
- [ ] Configure MSW for API mocking in tests
- [ ] Set up Storybook for component development

## Deliverables

- Working Next.js app with correct directory structure
- Custom design system implemented in Tailwind config
- All type definitions (`lib/types/`)
- All Zod schemas (`lib/validations/`)
- Four Zustand stores with correct interfaces
- Reusable UI component library
- ErrorBoundary with recovery UI
- AI branding assets

## Testing Criteria

- TypeScript compiles without errors
- ESLint passes with no warnings
- Development server runs successfully (`npm run dev`)
- All UI components render correctly with design system colors/typography
- Storybook starts and displays components
