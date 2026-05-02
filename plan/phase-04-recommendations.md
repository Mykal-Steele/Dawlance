# Phase 4: Recommendation Generation (Weeks 6-8)

## Goal

Implement recommendation generation (hybrid Google Places + Unsplash + Gemini) and the full discovery interface. This is Phase 1 of the two-phase architecture — selection here feeds Phase 2 (itinerary generation). The two phases must remain strictly separate.

## References (read before starting)

- `00-overview.md § User Flow > Step 5: Discovery - Browse Recommendations` — card interface, pagination, Quick Start mode, CRITICAL terminology (NOT "saved places")
- `00-overview.md § API Design > 2. Recommendations API` — full endpoint spec, `RecommendationsRequest`, `RecommendationsResponse`, `Recommendation` types, hybrid image strategy, AI prompt template
- `00-overview.md § Data Models > TypeScript Interfaces > Recommendation`
- `00-overview.md § State Management > Layer 1 > SelectionStore interface`
- `00-overview.md § State Management > Layer 2 > React Query` — recommendations query key `['recommendations', destination, preferences]`, `staleTime: Infinity`
- `00-overview.md § Error Handling > Pre-Flight Validation` — 3 validation rules with thresholds (300km, 80% time, min 1 hotel)
- `00-overview.md § Error Handling > API Retry Logic + Rate Limit Handling + Circuit Breaker` — all three apply to this API
- `00-overview.md § Error Handling > Partial Failure Handling` — `Promise.allSettled` strategy
- `00-overview.md § Performance > Image Optimization` — Next.js `next/image` with blur placeholder
- `00-overview.md § Performance > Pagination Strategy` — 12 cards/page, `keepPreviousData: true`
- `00-overview.md § Performance > Caching Strategy` — React Query-only caching (no Redis in hackathon account)
- `00-overview.md § Cost Analysis > Cost Optimization` — request coalescing, tiered models (gemini-3-flash-preview for recommendations)

## Tasks

### Recommendations API (`/api/recommendations`)

- [ ] Create `app/api/recommendations/route.ts`
  - [ ] Integrate Google Places API for hotels and restaurants (verified data + photos)
  - [ ] Integrate Unsplash API for attraction images (search by place name + city)
  - [ ] Integrate Gemini API (`gemini-3-flash-preview`) via `@google/genai` for AI-generated recommendations using the prompt template from overview
  - [ ] Implement `fetchRecommendationImage()` service (`lib/services/image-service.ts`): Google Places → Unsplash → gradient placeholder waterfall; generate `blurDataURL` server-side for each
  - [ ] Implement Zod schema validation for AI response structure
  - [ ] Implement retry logic (`retryWithBackoff`), `aiRateLimiter`, and `geminiCircuitBreaker`
  - [ ] React Query caching: `staleTime: Infinity` for recommendations (invalidated only on destination/preferences change) — no Redis available in hackathon IBM Cloud account
  - [ ] Parallelize Google Places + Unsplash + Gemini via `Promise.all`; use `Promise.allSettled` for graceful partial failure with `partial: boolean` flag and warnings
  - [ ] Implement request coalescing (Map-based deduplication of in-flight requests)

### Discovery UI

- [ ] Build `DiscoveryPage` component (`components/discovery/DiscoveryPage.tsx`)
  - [ ] **Quick Start Mode**: toggle at top, pre-selects popular items for review, allows modification before generating itinerary
  - [ ] **Detailed Mode** (default): full browse + manual selection
  - [ ] Search bar (`SearchBar.tsx` — Client Component)
  - [ ] Category filter tabs: All, Attractions, Hotels, Restaurants (`CategoryFilter.tsx` — Client Component)
  - [ ] Paginated grid: 12 cards per page with pagination controls
  - [ ] `SelectionSummary`: sticky counter showing selected item count
  - [ ] "Generate Itinerary" button — enabled only when minimum selections met
- [ ] Build `RecommendationCard` component (`components/discovery/RecommendationCard.tsx`) — Client Component
  - [ ] Large image using `next/image` with `placeholder='blur'`, `blurDataURL`, `loading='lazy'`, responsive sizes
  - [ ] Category badge (top-left), title overlay, duration, price range, brief description
  - [ ] Selection checkbox/heart with visual selected state
  - [ ] Hover state showing more details
  - [ ] Wrap in `React.memo` with custom comparator (`recommendation.id` + `isSelected`)
- [ ] Build `RecommendationGrid.tsx` — grid layout wrapper
- [ ] Add loading skeleton (`RecommendationSkeleton`: `animate-pulse` card with image and text placeholders)
- [ ] Implement Zustand `SelectionStore` for selection state
- [ ] Build `app/plan/discover/page.tsx`

### Pre-Flight Validation

- [ ] Implement `validateSelections()` in `lib/validations/itinerary-validation.ts`:
  - [ ] Geographic feasibility: max 300km between any selected locations
  - [ ] Time feasibility: total `estimatedDuration` ≤ 80% of available trip hours
  - [ ] Category balance: at least 1 hotel, 3 attractions, 2 restaurants
  - [ ] Show user-friendly errors for each failed check before enabling "Generate Itinerary"

## Deliverables

- `/api/recommendations` route with hybrid data + image strategy
- Full discovery interface with pagination
- Quick Start mode
- Recommendation cards with images and selection state
- SelectionStore
- Pre-flight validation with user-friendly errors

## Testing Criteria

- AI generates recommendations matching `Recommendation` type
- Images load with blur placeholder → actual image transition
- Quick Start correctly pre-selects popular items
- Category filters update the visible cards
- Selection state persists when paginating
- Pre-flight validation blocks "Generate Itinerary" with clear error messages
- Partial API failures show warnings but don't break the page
- React Query cache is warm on subsequent requests within the same session
