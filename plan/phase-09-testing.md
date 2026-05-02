# Phase 9: Comprehensive Testing (Week 15)

## Goal

Ensure quality, performance, and reliability across the entire application. Achieve 80% test coverage on critical paths. Meet Lighthouse performance targets. Verify security. Conduct load testing.

## References (read before starting)

- `00-overview.md § Testing Architecture` — all subsections: strategy, tools, unit/integration/component/E2E targets, AI response validation, visual regression, performance testing, CI/CD pipeline, coverage targets
- `00-overview.md § Performance & Optimization Strategy > Performance Targets` — Lighthouse thresholds (score >90, LCP <3s, FCP <2s, CLS <0.1), bundle size <500KB
- `00-overview.md § Error Handling & Resilience Architecture` — test all resilience patterns (retry, circuit breaker, rate limiter, partial failure)
- `00-overview.md § Data Models > Zod Validation Schemas` — validate that schemas reject invalid inputs

## Tasks

### Unit Tests (Vitest)

- [ ] **Zustand stores** (80% coverage):
  - [ ] `FormStore`: `updateDestination()` stores correctly, `reset()` clears all fields
  - [ ] `SelectionStore`: `addSelection()`, `removeSelection()`, `isSelected()`, `getSelectionsByCategory()`
  - [ ] `ItineraryStore`: `editActivity()`, `undo()`/`redo()` traverse history correctly, `canUndo`/`canRedo` flags
  - [ ] `AIStore`: `addMessage()`, `setTyping()`, `clearHistory()`
- [ ] **Utility functions** (90% coverage):
  - [ ] `retryWithBackoff()`: succeeds on first try; retries on failure (up to 3 times); throws after max retries
  - [ ] `validateSelections()`: rejects >300km, rejects >80% time, rejects missing hotel
  - [ ] `hashPreferences()`: deterministic output for same input
- [ ] **Validation schemas**:
  - [ ] `destinationSchema`: rejects end date before start date, rejects empty destination
  - [ ] `preferencesSchema`: rejects empty travelStyle, rejects invalid budget enum

### Integration Tests (Vitest + MSW)

- [ ] Set up MSW handlers to mock `https://api.openai.com/v1/chat/completions`
- [ ] `POST /api/recommendations`: returns HTTP 200 with array of `Recommendation` objects matching schema
- [ ] `POST /api/itinerary`: returns HTTP 200 with `Itinerary` matching schema
- [ ] `POST /api/itinerary/recalculate`: applies edit and returns updated itinerary
- [ ] `POST /api/ai/chat`: returns `AIChatResponse` with message field
- [ ] `GET /api/weather`: returns `WeatherResponse` with forecast array
- [ ] Error handling: each route returns correct HTTP status for `ValidationError` (400), `AIError` (503), unknown error (500)

### Component Tests (React Testing Library)

- [ ] `RecommendationCard`: renders name and description; `onSelect` fires when card button clicked
- [ ] `PreferencesForm`: submits only when all required fields are filled; shows inline errors for invalid input
- [ ] `ActivityCard`: displays timestamp, title, cultural context, attire suggestion
- [ ] `AIMessage`: renders user message with correct alignment; renders assistant message with avatar
- [ ] `ProgressIndicator`: shows correct step number and highlights active step

### E2E Tests (Playwright)

- [ ] **Full planning flow**:
  1. Go to `/`
  2. Click "Start Planning"
  3. Fill destination and dates, click Continue
  4. Verify weather forecast visible, click Continue
  5. Select travel style + budget, click "Discover Places"
  6. Verify 12 recommendation cards visible
  7. Select 1 hotel + 3 attractions + 2 restaurants
  8. Click "Generate Itinerary"
  9. Verify "Your AI-Generated Plan" heading and ≥1 activity card visible
- [ ] **AI chat interaction**:
  1. Navigate to itinerary page
  2. Click AI chat toggle (open panel)
  3. Send "Find a nearby cafe"
  4. Verify AI response message appears
- [ ] **Editing and recalculation**:
  1. Click edit on an activity
  2. Change the time by +1 hour
  3. Verify recalculation runs (loading state shows)
  4. Verify updated itinerary displays
- [ ] **Undo/redo**:
  1. Make an edit
  2. Click undo — verify original state restored
  3. Click redo — verify edit re-applied
- [ ] **Error scenario**: disconnect network mid-flow, verify error state with recovery options

### AI Response Validation

- [ ] Verify `aiRecommendationsSchema` rejects malformed AI responses (missing required fields, wrong types)
- [ ] Verify `Zod.parse()` throws before client receives invalid AI data
- [ ] Test with intentionally malformed mock AI response in integration tests

### Visual Regression (Storybook + Chromatic)

- [ ] Ensure Storybook has stories for: `RecommendationCard` (Default, Selected), `ActivityCard` (Default), `AIMessage` (User, Assistant), `Button` (Primary, Secondary, Disabled)
- [ ] Run Chromatic baseline to capture visual snapshots

### Performance Testing (Lighthouse CI)

- [ ] Run Lighthouse CI against `/`, `/plan/destination`, `/plan/discover`
- [ ] Verify: performance ≥ 0.9, accessibility ≥ 0.9, FCP ≤ 2000ms, LCP ≤ 3000ms, CLS ≤ 0.1
- [ ] Check bundle size < 500KB gzipped (use `@next/bundle-analyzer`)
- [ ] Verify Next.js Image optimization is active (WebP, lazy loading, blur placeholders)

### Security Audit

- [ ] API keys in environment variables only (never in client bundle — verify with `ANALYZE=true next build`)
- [ ] All user inputs validated with Zod before use
- [ ] XSS prevention: no `dangerouslySetInnerHTML` with user-controlled content
- [ ] Rate limiting active on `/api/ai/chat` (5 req/min)
- [ ] AI API keys not exposed in client-side code

### Load Testing

- [ ] Stress test API endpoints with 100+ concurrent users (use k6 or Artillery)
- [ ] Verify Redis caching reduces OpenAI call rate under load
- [ ] Monitor cost per session under load — confirm within $0.40 budget

### CI/CD Pipeline

- [ ] Configure GitHub Actions: on push/PR → install deps → unit tests → integration tests → E2E tests → upload coverage to Codecov → Lighthouse CI
- [ ] Set minimum coverage gates: overall 70%, critical paths 80%, utilities 90%
- [ ] Block merges on failing tests or Lighthouse score below threshold

## Deliverables

- Full test suite: unit + integration + component + E2E
- Coverage ≥ 80% on critical paths
- Lighthouse CI passing (≥90 score on all tested routes)
- Security audit passing
- Load testing results (performance under 100 concurrent users)
- CI/CD pipeline configured

## Testing Criteria

- All tests pass on CI
- Coverage report shows ≥70% overall, ≥80% critical paths
- Lighthouse scores ≥90 on all three URLs
- Bundle size <500KB gzipped
- No API keys found in client-side bundle
- Load test shows Redis cache hit rate >80% under load
