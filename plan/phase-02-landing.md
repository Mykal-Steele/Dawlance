# Phase 2: Landing Page & Onboarding (Week 3)

## Goal

Create the landing page and initial onboarding flow (destination + dates input). This is the user's first experience — friendly AI branding, clear value proposition, and a simple form that feeds into the rest of the planning flow.

## References (read before starting)

- `00-overview.md § User Flow > Step 1: Landing Page` — hero spec, AI mascot, CTA, value proposition copy
- `00-overview.md § User Flow > Step 2: Destination and Dates Input` — form fields, validation rules, state storage
- `00-overview.md § Design System > Component Patterns > Forms` — input styling
- `00-overview.md § Design System > Component Patterns > Navigation > Progress indicator`
- `00-overview.md § Component Architecture > Directory Structure > components/landing/` and `components/forms/DestinationForm.tsx`
- `00-overview.md § Component Architecture > Component Specifications > Client Components > DestinationForm.tsx`
- `00-overview.md § State Management > Layer 1 > FormStore interface` — `updateDestination()` to call on submit
- `00-overview.md § Data Models > Zod Validation Schemas > destinationSchema`

## Tasks

- [ ] Build landing page (`app/page.tsx`)
  - [ ] Hero section with AI assistant mascot/robot illustration
  - [ ] Value proposition: "Turn Your Travel Idea into Reality (faster)! with AI"
  - [ ] Feature highlights section
  - [ ] "Start Planning" CTA button → navigates to `/plan/destination`
- [ ] Build `DestinationForm` component (`components/forms/DestinationForm.tsx`)
  - [ ] Destination text input with autocomplete and icon prefix
  - [ ] Start date picker with calendar view
  - [ ] End date picker with calendar view
  - [ ] Zod validation via `destinationSchema` (end date after start date)
  - [ ] On submit: call `useFormStore().updateDestination()` then navigate to `/plan/weather`
- [ ] Implement `ProgressIndicator` component showing current step (1 of 5)
- [ ] Create navigation flow between steps (routing + back button)
- [ ] Add Framer Motion animations and transitions (page enter/exit)
- [ ] Implement responsive design: mobile-first, scales to desktop
- [ ] Build `app/plan/destination/page.tsx` as the destination form page

## Deliverables

- Functional landing page with AI branding
- Destination + dates form with validation
- FormStore integration (destination data stored)
- Progress indicator
- Step-to-step navigation
- Responsive layouts with animations

## Testing Criteria

- `destinationSchema` rejects end date before start date
- Form validation errors display inline
- Submitted data persists in FormStore when navigating to next step
- Responsive design works on mobile and desktop
- Animations are smooth (no jank)
