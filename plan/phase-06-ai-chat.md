# Phase 6: AI Chat Integration (Week 11)

## Goal

Add the AI assistant chat interface to the itinerary view. The AI should be context-aware (knows the current itinerary and user preferences) and support streaming responses. This is where the product differentiates — the AI acts as a proactive travel companion, not just a Q&A bot.

## References (read before starting)

- `00-overview.md § AI Assistant Integration > AI Assistant Role` — cost-optimized strategy, gemini-3-flash-preview for chat
- `00-overview.md § AI Assistant Integration > AI Capabilities` — full capability list
- `00-overview.md § AI Assistant Integration > AI Chat Interface` — component hierarchy, message types, quick actions
- `00-overview.md § AI Assistant Integration > AI API Types` — `AIChatRequest`, `AIChatResponse`, `AIAction` interfaces
- `00-overview.md § API Design > 5. AI Chat API` — full endpoint spec with `currentStep` union type, full prompt template
- `00-overview.md § Data Models > TypeScript Interfaces > AIMessage, AIAction`
- `00-overview.md § State Management > Layer 1 > AIStore interface` — messages, isTyping, addMessage, setTyping, clearHistory
- `00-overview.md § State Management > Layer 2 > React Query` — AI chat mutation
- `00-overview.md § Error Handling > Rate Limit Handling` — 5 requests/minute via `aiRateLimiter`
- `00-overview.md § Error Handling > Circuit Breaker Pattern` — `geminiCircuitBreaker` wraps the chat call
- `00-overview.md § Performance > Progressive Loading > Streaming Responses` — SSE with `ReadableStream`, `Content-Type: text/event-stream`
- `00-overview.md § User Flow > Step 8: AI Assistant Interaction` — full UX spec
- `00-overview.md § Cost Analysis > Cost Optimization > Tiered Models` — `gemini-3-flash-preview` for chat

## Tasks

### AI Chat API (`/api/ai/chat`)

- [ ] Create `app/api/ai/chat/route.ts`
  - [ ] Use **Gemini Interactions API** via `@google/genai`: `client.interactions.create({ model: 'gemini-3-flash-preview', input: message, previous_interaction_id: previousInteractionId, stream: true })`
  - [ ] **Server-side conversation history**: pass `previous_interaction_id` from request body — Gemini manages context server-side (no need to send full history). On first turn, omit `previous_interaction_id`.
  - [ ] **Streaming**: set `stream: true`, forward `chunk.delta.text` for each `chunk.event_type === 'content.delta'` event via `ReadableStream`. Headers: `Content-Type: text/event-stream`, `Cache-Control: no-cache`
  - [ ] Return `interaction.id` as `interactionId` in the response — client stores this in `AIStore.currentInteractionId` and sends back as `previousInteractionId` on next turn
  - [ ] Build context-aware system instruction (inject current step, destination, itinerary, selections, preferences)
  - [ ] Use the full prompt template from overview
  - [ ] Apply `aiRateLimiter` (5 requests/minute)
  - [ ] Wrap in `geminiCircuitBreaker` (3 failures → open for 1 minute)

### AI Assistant Components

- [ ] Build `AIAssistant` Client Component (`components/ai/AIAssistant.tsx`)
  - [ ] Collapsible/expandable panel (minimize/maximize)
  - [ ] Positioned alongside or overlaying the itinerary view
- [ ] Build `AIChat` component — scrollable message list, auto-scroll to latest
- [ ] Build `AIMessage` component — distinct styles for `user` vs `assistant` roles, show `suggestions` as clickable chips, show `actions` as action buttons
- [ ] Build `AIAvatar` component — AI character with subtle animation
- [ ] Build `AITypingIndicator` component — animated dots while `isTyping` is true
- [ ] Build `AIQuickActions` component — predefined buttons: "Find nearby cafe", "Adjust timing", "Suggest alternative", "Explain cultural context", "Optimize route"
- [ ] Wire `AIAction` buttons: when an action has type `add_activity`, `remove_activity`, `adjust_time` — trigger the appropriate ItineraryStore update
- [ ] Implement proactive AI message on itinerary load: "Looks like a great plan! I noticed you have a gap between [X] and [Y]. Want me to find a cozy cafe nearby?"
- [ ] Implement Zustand `AIStore` integration (already defined in Phase 1, now wire to UI)
- [ ] Wire React Query mutation for chat: on success call `aiStore.addMessage(response)`, `aiStore.setInteractionId(response.interactionId)`, `aiStore.setTyping(false)`

## Deliverables

- `/api/ai/chat` route with streaming + rate limiting + circuit breaker
- Full AI chat panel (collapsible)
- Streaming response rendering in the chat UI
- Quick action buttons wired to itinerary actions
- Context-aware responses (itinerary state injected)

## Testing Criteria

- Chat responses are contextually relevant to the current itinerary
- Streaming renders text progressively (not all-at-once)
- Rate limiter blocks rapid-fire requests (>5/min) gracefully
- Circuit breaker surfaces a friendly error after 3 failures
- `isTyping` indicator shows while awaiting response
- Quick action buttons trigger correct store updates
- Chat history is preserved when scrolling up
- Minimize/maximize toggle works smoothly
