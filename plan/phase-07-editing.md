# Phase 7: Itinerary Editing & Smart Recalculation (Weeks 12-13)

## Goal

Implement full itinerary editing with the tiered recalculation strategy. Users can edit, drag-and-drop, undo/redo. The recalculation system is smart: cosmetic edits stay local, minor time shifts use local algorithms, and structural changes call the AI. This keeps costs low and UX snappy.

## References (read before starting)

- `00-overview.md § Core Architecture Principles > Smart Recalculation Strategy` — the three tiers (local-only, partial, full AI), debouncing 2-3s, optimistic UI with rollback
- `00-overview.md § User Flow > Step 9: Itinerary Editing & Recalculation` — edit modal spec, drag-and-drop, undo/redo, preview changes
- `00-overview.md § API Design > 4. Itinerary Recalculation API` — `RecalculateRequest`, `RecalculateResponse` types, AI prompt template
- `00-overview.md § State Management > Layer 1 > ItineraryStore interface` — `history`, `historyIndex`, `editActivity()`, `undo()`, `redo()`, `canUndo`, `canRedo`
- `00-overview.md § State Management > State Flow Diagram` — mermaid diagram showing edit → mutation → store update loop
- `00-overview.md § Error Handling > API Retry Logic` — apply to recalculate endpoint
- `00-overview.md § Performance > Virtual Scrolling` — implement `@tanstack/react-virtual` (200px estimated item height, 5-item overscan) now that activity list can be long with edits

## Tasks

### Recalculation API (`/api/itinerary/recalculate`)

- [ ] Create `app/api/itinerary/recalculate/route.ts`
  - [ ] Accept `RecalculateRequest` (currentItinerary + edit details)
  - [ ] Implement **tiered recalculation logic** on the server:
    - `notes` / `description` changes → apply locally, return immediately (no OpenAI call)
    - Time shifts ≤ ±30 minutes → apply local time-adjustment algorithm, no OpenAI call
    - Structural changes (add/remove activity, major time changes) → call OpenAI with the recalculation prompt
  - [ ] Apply 2-3 second debounce before sending structural changes to OpenAI
  - [ ] Return `RecalculateResponse` with `changedDays[]`
  - [ ] Implement retry logic

### Edit Controls & Modal

- [ ] Build `EditControls` component (`components/itinerary/EditControls.tsx`)
  - [ ] Edit button per activity card (triggers edit modal)
  - [ ] Time adjustment controls (+/- 15 min)
  - [ ] Remove activity button
  - [ ] Add activity button (opens activity search)
- [ ] Build `ActivityEditModal` Client Component (`components/itinerary/ActivityEditModal.tsx`)
  - [ ] Edit form: time picker, duration adjustment, notes
  - [ ] Replace activity with alternative (search)
  - [ ] Preview changes before applying
  - [ ] Save / Cancel buttons
  - [ ] Shows AI explanation of changes after recalculation
- [ ] Wire edit actions to call `/api/itinerary/recalculate` (full AI) or local algorithms (partial)

### Optimistic Updates & Undo/Redo

- [ ] Implement optimistic UI: apply edit to ItineraryStore immediately on submit, roll back if API call fails
- [ ] Implement undo/redo using ItineraryStore `history` array and `historyIndex`
  - [ ] Undo/redo buttons in `ItineraryView` header (enable/disable based on `canUndo`/`canRedo`)
  - [ ] Keyboard shortcuts: `Ctrl+Z` / `Cmd+Z` (undo), `Ctrl+Shift+Z` / `Cmd+Shift+Z` (redo)
  - [ ] Cap history at a reasonable depth (e.g., 20 entries) to control memory

### Drag-and-Drop

- [ ] Implement drag-and-drop reordering within a single day
  - [ ] Use a drag-and-drop library compatible with React 18 (e.g., `@dnd-kit/core`)
  - [ ] Dragging an activity to a new position triggers structural recalculation
  - [ ] Visual drag handle on each activity card

### Virtual Scrolling

- [ ] Implement `@tanstack/react-virtual` on the activity list in `DayTimeline`
  - [ ] Estimated item size: 200px
  - [ ] Overscan: 5 items
  - [ ] Ensures smooth scrolling on long itineraries

### Conflict Detection

- [ ] Detect overlapping activity times — show warning badge on conflicting cards
- [ ] Detect unrealistic travel times (< 5 min between locations > 5km apart) — show warning

## Deliverables

- `/api/itinerary/recalculate` with tiered recalculation logic
- Edit modal with preview and AI explanation
- Drag-and-drop reordering
- Undo/redo with keyboard shortcuts
- Optimistic updates with rollback
- Virtual scrolling on activity list
- Conflict detection

## Testing Criteria

- Notes-only edits do NOT call the OpenAI API
- Time shift ≤ ±30 min does NOT call the OpenAI API
- Adding/removing an activity DOES call the OpenAI API
- Optimistic update shows immediately; UI rolls back on API error
- Undo/redo correctly traverses history
- Keyboard shortcuts work on both Mac and Windows
- Drag-and-drop updates activity order and triggers recalculation
- Conflicting activities show warning indicators
