# Phase 8: Advanced Features & Polish (Week 14)

## Goal

Add export/share features, polish loading and empty states, finalize responsive design, improve accessibility, and integrate analytics/cost tracking. This phase takes the MVP to a production-quality product.

## References (read before starting)

- `00-overview.md § Performance & Optimization Strategy` — all sections now apply: image optimization, code splitting (lazy load AIAssistant + ItineraryEditor), virtual scrolling (confirm from Phase 7), caching
- `00-overview.md § Performance > Progressive Loading > Skeleton screens` — `RecommendationSkeleton` spec (animate-pulse, image + text placeholders)
- `00-overview.md § Performance > Code Splitting` — dynamic import `AIAssistant` with `ssr: false`, dynamic import `ItineraryEditor`
- `00-overview.md § Design System > Component Patterns` — empty state and loading state patterns for each screen
- `00-overview.md § Design System > Layout Principles > Mobile-first` — final responsive design audit
- `00-overview.md § AI Assistant Integration > AI Chat Interface` — collapsible panel polish (smooth animation)
- `00-overview.md § Success Metrics > User Experience Metrics` — task completion rate, time-to-itinerary targets to design towards
- `00-overview.md § Cost Analysis > Cost Monitoring` — wire up `trackAPICall()` + monthly cost report setup

## Tasks

### Export & Share

- [ ] Implement PDF export (use a library like `react-pdf` or `html2pdf.js`)
  - [ ] Exports full itinerary with activity details, times, cultural context
- [ ] Implement calendar export (iCal / `.ics` file)
  - [ ] Each activity becomes a calendar event with time, duration, location
- [ ] Implement email itinerary (POST to send-email API or mailto link)
- [ ] Add share functionality
  - [ ] Generate a unique shareable link (`/share/[token]`)
  - [ ] Social media sharing (copy link, native share API on mobile)

### Loading & Empty States

- [ ] Ensure all loading states use `RecommendationSkeleton` (animate-pulse: 48px gray image block + 2 text lines)
- [ ] Implement loading skeletons for: recommendation cards, itinerary day view, activity cards
- [ ] Implement empty states for: no recommendations returned, no selections made, API error (use `errorMessages` from overview)
- [ ] Add progress indicators and animated transitions throughout

### Responsive Design Audit

- [ ] Full mobile optimization audit across all pages
- [ ] Tablet layout review (discovery grid: 2 columns; itinerary: side-by-side AI panel)
- [ ] Desktop enhancements (sidebar navigation, wider grids)
- [ ] Test on iOS Safari, Android Chrome, major desktop browsers

### Code Splitting (Performance)

- [ ] Lazy-load `AIAssistant` via `next/dynamic` with skeleton fallback and `ssr: false`
- [ ] Lazy-load `ItineraryEditor` via `next/dynamic` with skeleton fallback
- [ ] Lazy-load `mapbox-gl`, `recharts`, `react-datepicker` on-demand (only when the component using them mounts)

### Timeline Visualization

- [ ] Implement visual timeline view in `TimelineView.tsx` with drag-and-drop
  - [ ] Horizontal time axis per day
  - [ ] Activity blocks sized by duration
  - [ ] Travel time gaps shown between blocks

### Accessibility

- [ ] Add ARIA labels to all interactive elements (buttons, inputs, selectors)
- [ ] Implement full keyboard navigation (tab order, focus trapping in modals)
- [ ] Test with a screen reader (VoiceOver / NVDA)
- [ ] Verify color contrast ratios meet WCAG 2.1 AA

### Analytics & Cost Monitoring

- [ ] Integrate analytics tracking (e.g., PostHog or Mixpanel)
  - [ ] Track user flow steps: destination → weather → preferences → discover → itinerary
  - [ ] Track edit events, AI chat usage
- [ ] Wire up `trackAPICall(type, cost, userId)` in each API route
  - [ ] Track OpenAI calls, Google Places calls, Unsplash calls
  - [ ] Alert when a user exceeds $5/month threshold
- [ ] Add error tracking (Sentry or similar)

### User Feedback Mechanisms

- [ ] Success toasts for major actions (itinerary generated, edit saved, export complete)
- [ ] Error notifications for failures (with recovery options from `errorMessages`)
- [ ] Confirmation dialogs for destructive actions (remove activity, clear selections)

## Deliverables

- Export: PDF, iCal, email, shareable link
- Polished loading skeletons and empty states
- Code splitting applied to heavy components
- Visual timeline with drag-and-drop
- Responsive design across mobile/tablet/desktop
- WCAG 2.1 AA accessibility
- Analytics and cost tracking wired up

## Testing Criteria

- PDF export opens correctly with all itinerary content
- iCal file imports correctly into Google Calendar and Apple Calendar
- Shareable link renders itinerary correctly for a new visitor
- Loading skeletons appear immediately; no layout shift on data load
- Empty states display for all failure scenarios
- Keyboard navigation works through the entire flow without a mouse
- Screen reader announces all interactive elements correctly
- Analytics events fire at each step transition
