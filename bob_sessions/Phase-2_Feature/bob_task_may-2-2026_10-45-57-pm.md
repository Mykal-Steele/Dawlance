**User:**

<task>
we have finished phase 1 in planning please continue with phase 2 please. only do phases 2. use the context from my 'plan/00-overview.md' (see below for file content)  plan, and 'AGENTS.md' (see below for file content)  please check and follow the rules while implemeting as well '.bob/rules' (see below for file content). use '.bob/skills' (see below for file content)  as necessary.
</task>

<file_content path="plan/00-overview.md">
<file_outline>File: 00-overview.md (1331 lines)

String: # Smart Travel Planning Application — Architecture Reference (lines 1-1331)
  String: ## Table of Contents (lines 9-30)
  String: ## Core Architecture Principles (lines 31-77)
    String: ### AI Assistant Integration (lines 33-51)
    String: ### Streamlined Flow Architecture (lines 52-61)
    String: ### Smart Recalculation Strategy (lines 62-71)
    String: ### Server-First Approach (lines 72-77)
  String: ## Technology Stack (lines 78-130)
    String: ### Core Framework (lines 80-86)
    String: ### State Management (lines 87-92)
    String: ### Form Handling (lines 93-97)
    String: ### API Integration (lines 98-103)
    String: ### Deployment & Infrastructure (IBM Cloud — Hackathon Account) (lines 104-111)
    String: ### UI Components (lines 112-118)
    String: ### Development Tools (lines 119-130)
  String: ## Design System (lines 131-172)
    String: ### Color Palette (lines 133-140)
    String: ### Typography (lines 141-146)
    String: ### Component Patterns (lines 147-158)
    String: ### Layout Principles (lines 159-166)
    String: ### Iconography (lines 167-172)
  String: ## User Flow Diagram (lines 173-196)
  String: ## Detailed User Flow Steps (lines 197-291)
    String: ### Step 1: Landing Page & Onboarding (lines 199-205)
    String: ### Step 2: Destination and Dates Input (lines 206-213)
    String: ### Step 3: Weather Forecast & Clothing Recommendations (Combined) (lines 214-222)
    String: ### Step 4: Preferences Input ("Tell AI what you like") (lines 223-240)
    String: ### Step 5: Discovery — Browse Recommendations (lines 241-255)
    String: ### Step 6: Itinerary Generation (lines 256-263)
    String: ### Step 7: Itinerary Display ("Your AI-Generated Plan") (lines 264-273)
    String: ### Step 8: AI Assistant Interaction (lines 274-281)
    String: ### Step 9: Itinerary Editing & Recalculation (lines 282-291)
  String: ## Component Architecture (lines 292-429)
    String: ### Directory Structure (lines 294-411)
    String: ### Component Specifications (lines 412-429)
      String: #### Server Components (Default) (lines 414-419)
      String: #### Client Components (Interactive) (lines 420-429)
  String: ## AI Assistant Integration (lines 430-529)
    String: ### AI Assistant Role (lines 432-443)
    String: ### AI Chat Interface (lines 444-457)
    String: ### AI API Types (lines 458-529)
  String: ## State Management Strategy (lines 530-617)
    String: ### Two-Layer State Architecture (lines 532-598)
      String: #### Layer 1: Client State (Zustand) (lines 536-589)
      String: #### Layer 2: Server Data (React Query) (lines 590-598)
    String: ### State Flow Diagram (lines 599-617)
  String: ## API Design (lines 618-885)
    String: ### 1. Weather API (/api/weather) (lines 620-654)
    String: ### 2. Recommendations API (/api/recommendations) (lines 655-725)
    String: ### 3. Itinerary Generation API (/api/itinerary) (lines 726-798)
    String: ### 4. Itinerary Recalculation API (/api/itinerary/recalculate) (lines 799-843)
    String: ### 5. AI Chat API (/api/ai/chat) (lines 844-879)
    String: ### API Error Handling (lines 880-885)
  String: ## Data Models (lines 886-1053)
    String: ### TypeScript Interfaces (lines 888-1006)
    String: ### Zod Validation Schemas (lines 1007-1053)
  String: ## Error Handling & Resilience Architecture (lines 1054-1121)
    String: ### Three-Tier Error Strategy (lines 1056-1061)
    String: ### API Retry Logic (lines 1062-1065)
    String: ### Pre-Flight Validation (lines 1066-1075)
    String: ### State Persistence (lines 1076-1079)
    String: ### Error Recovery UI (lines 1080-1107)
    String: ### Partial Failure Handling (lines 1108-1111)
    String: ### Rate Limit Handling (lines 1112-1115)
    String: ### Circuit Breaker Pattern (lines 1116-1121)
  String: ## Performance & Optimization Strategy (lines 1122-1177)
    String: ### Performance Targets (lines 1124-1131)
    String: ### Image Optimization (lines 1132-1137)
    String: ### Pagination Strategy (lines 1138-1141)
    String: ### Code Splitting (lines 1142-1146)
    String: ### API Parallelization (lines 1147-1150)
    String: ### State Optimization (lines 1151-1154)
    String: ### Virtual Scrolling (lines 1155-1158)
    String: ### Caching Strategy (Two-Layer — No Redis) (lines 1159-1165)
    String: ### Bundle Optimization (lines 1166-1169)
    String: ### Progressive Loading (lines 1170-1177)
  String: ## Testing Architecture & Quality Assurance (lines 1178-1234)
    String: ### Testing Strategy (lines 1180-1183)
    String: ### Testing Stack (lines 1184-1191)
    String: ### Unit Testing Targets (lines 1192-1196)
    String: ### Integration Testing Targets (lines 1197-1200)
    String: ### Component Testing Targets (lines 1201-1204)
    String: ### E2E Critical Flows (Playwright) (lines 1205-1209)
    String: ### AI Response Validation (lines 1210-1213)
    String: ### Visual Regression Testing (lines 1214-1217)
    String: ### Performance Testing (Lighthouse CI) (lines 1218-1221)
    String: ### CI/CD Pipeline (GitHub Actions) (lines 1222-1225)
    String: ### Coverage Targets (lines 1226-1234)
  String: ## Cost Analysis & Monetization Strategy (lines 1235-1279)
    String: ### Cost Breakdown (Per User Session) (lines 1237-1253)
    String: ### Cost Optimization Strategies (lines 1254-1260)
    String: ### Cost Monitoring (lines 1261-1264)
    String: ### Monetization Strategy (lines 1265-1279)
  String: ## Success Metrics (lines 1280-1303)
    String: ### User Experience (lines 1282-1288)
    String: ### Technical (lines 1289-1295)
    String: ### Business (lines 1296-1303)
  String: ## Risk Mitigation (lines 1304-1319)
  String: ## Future Enhancements (lines 1320-1331)
</file_outline>
<notice>This file is large (1330 lines). You will use the following strategy to understand this file:
- Inform the user you are going to use large file strategy, to efficiently understand the file
- Use the file_outline provided to get an overview of the file structure to help decide next action. This is not the full file. It is not the full depth of the contents.
- If you read the file, use precise file reads with line ranges for specific sections of interest
- Consider if other commands/tools are better suited for extracting information from that file type
- Use ask_followup_question tool if needed to identify the best next action
</notice>
</file_content>

<file_content path="AGENTS.md">
 1 | # AGENTS.md
 2 | 
 3 | This file provides guidance to agents when working with code in this repository.
 4 | 
 5 | ## Project Overview
 6 | 
 7 | Smart travel planning web application using Next.js 14+ (App Router), React, TypeScript, and Tailwind CSS. Features an AI travel assistant that generates personalized, customizable travel itineraries through a streamlined flow.
 8 | 
 9 | ## Core User Flow (CRITICAL)
10 | 
11 | 1. User inputs destination and travel dates
12 | 2. System provides combined weather forecast and clothing recommendations (rule-based, not AI)
13 | 3. User inputs visual preferences (travel style chips, budget selector, transportation icons, group dynamics, pace slider)
14 | 4. **CRITICAL RULE**: System generates recommendation list of places, hotels, and restaurants. User can choose "Quick Start" (pre-selected items) or browse all. User MUST select items from this list (active selection for current trip - NOT "saved places" or "favorites")
15 | 5. After user selections, system generates chronological, linear daily travel plan with cultural context
16 | 6. AI assistant provides ongoing support via chat interface
17 | 7. Plan is fully adjustable - edits trigger smart recalculation (local-only, partial, or full AI recalc based on edit type)
18 | 
19 | ## Commands
20 | 
21 | ```bash
22 | npm run dev          # Start development server
23 | npm run build        # Production build
24 | npm run start        # Start production server
25 | npm run lint         # Run ESLint
26 | npm run type-check   # TypeScript type checking
27 | ```
28 | 
29 | ## Architecture Principles
30 | 
31 | - Use Next.js App Router (app/ directory structure)
32 | - Server Components by default, Client Components only when needed (interactivity, hooks, browser APIs, AI chat)
33 | - API routes in app/api/ for backend logic
34 | - Separate recommendation selection stage from itinerary generation (two distinct phases)
35 | - **Cost-optimized AI**: AI only for recommendations, itinerary, and chat (not static content)
36 | - **Smart recalculation**: Tiered approach (local-only, partial, full AI) based on edit type
37 | - **Performance-first**: Pagination (12 cards/page), image optimization, code splitting
38 | - Mobile-first, image-rich design with custom design system
39 | 
40 | ## Code Style
41 | 
42 | - TypeScript strict mode enabled
43 | - Functional components with TypeScript interfaces
44 | - Tailwind CSS with custom design system (colors: #2A7BFF, #6DD3B0, #FF8C42, #F8F9FA)
45 | - Typography: Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
46 | - Named exports for components
47 | - Async/await for asynchronous operations
48 | - Error boundaries for error handling
49 | 
50 | ## Key Conventions
51 | 
52 | - Components in components/ directory (including ai/, landing/, discovery/ subdirectories)
53 | - Types in lib/types/ (including ai.ts for AI assistant types)
54 | - API utilities in lib/api/
55 | - **State management**: Zustand for ALL client state (form, selections, itinerary, AI chat), React Query for server data
56 | - Form handling: React Hook Form with Zod validation
57 | - Visual form components: Icon-based selectors, chips, sliders
58 | - **Testing**: Vitest (unit), Playwright (E2E), MSW (API mocking), 80% coverage target
59 | - **Error handling**: Retry logic, circuit breakers, graceful degradation
60 | - **Image strategy**: Google Places (hotels/restaurants), Unsplash (attractions), gradient placeholders (fallback)
61 | 
62 | ## Design System
63 | 
64 | - Primary: #2A7BFF (Blue) - Main actions, AI branding
65 | - Secondary: #6DD3B0 (Mint Green) - Success, highlights
66 | - Tertiary: #FF8C42 (Orange) - Warnings, attention
67 | - Card-based layouts with rounded corners (12-16px)
68 | - Image-first design for recommendations
69 | - Mobile-first responsive approach

</file_content>

<file_content path=".bob/rules">
├── eslint-rules.md
├── gemini-api-dev-rules.md
├── gemini-interactions-api-rules.md
├── gemini-live-api-dev-rules.md
├── github-actions-rules.md
├── google-maps-js-rules.md
├── ibm-clouds-rules.md
├── nextjs-rules.md
├── playwright-rules.md
├── react-rules.md
├── redis-rules.md
├── rules.md
├── sentry-rules.md
├── shadcn-rules.md
├── typescript-rules.md
├── vitest-rules.md
└── zustard-rules.md

<file_content path=".bob/rules/eslint-rules.md">
  1 | ---
  2 | description: This guide defines the definitive ESLint configuration and best practices for our team, ensuring consistent code quality, early error detection, and seamless integration with modern JavaScript and TypeScript workflows.
  3 | globs: **/*.{js,jsx,ts,tsx,mts,cts}
  4 | ---
  5 | 
  6 | # eslint Best Practices
  7 | 
  8 | ESLint is the bedrock of our JavaScript and TypeScript code quality. This guide outlines our definitive, opinionated approach to configuring and using ESLint, focusing on modern best practices for December 2025.
  9 | 
 10 | ## 1. Core Configuration: Flat Config is Mandatory
 11 | 
 12 | Always use the new flat configuration format (`eslint.config.js`, `.mjs`, `.cjs`, or `.ts`). The legacy `.eslintrc` format is deprecated and **must not** be used.
 13 | 
 14 | ### 1.1. Base Configuration
 15 | 
 16 | Start with the recommended and strict presets for robust error prevention and stylistic consistency.
 17 | 
 18 | ```javascript
 19 | // eslint.config.js
 20 | import eslint from "@eslint/js";
 21 | import { defineConfig } from "eslint/config";
 22 | 
 23 | export default defineConfig([
 24 |   eslint.configs.recommended, // Essential base rules
 25 |   eslint.configs.strict, // Stricter error-prevention rules
 26 |   eslint.configs.stylistic, // Stylistic rules (handled by Prettier, see 1.3)
 27 |   // ... other configs and rules
 28 | ]);
 29 | ```
 30 | 
 31 | ### 1.2. TypeScript Integration (Type-Aware Linting)
 32 | 
 33 | For TypeScript projects, enable type-aware linting. This provides powerful, deep analysis that catches subtle type-related issues.
 34 | 
 35 | ```javascript
 36 | // eslint.config.ts (requires `jiti` or `ts-node` for execution)
 37 | import eslint from "@eslint/js";
 38 | import { defineConfig } from "eslint/config";
 39 | import tseslint from "typescript-eslint";
 40 | 
 41 | export default defineConfig([
 42 |   eslint.configs.recommended,
 43 |   tseslint.configs.recommendedTypeChecked, // TypeScript recommended rules with type-checking
 44 |   tseslint.configs.strictTypeChecked, // Stricter TypeScript rules with type-checking
 45 |   tseslint.configs.stylisticTypeChecked, // TypeScript stylistic rules (handled by Prettier)
 46 |   {
 47 |     languageOptions: {
 48 |       parser: tseslint.parser,
 49 |       parserOptions: {
 50 |         projectService: true, // Enable TypeScript's project service for type info
 51 |         tsconfigRootDir: import.meta.dirname, // Point to your project root
 52 |       },
 53 |     },
 54 |     files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"], // Apply to TS files
 55 |   },
 56 |   // ... other configs and rules
 57 | ]);
 58 | ```
 59 | 
 60 | **Performance Note**: Type-aware linting adds overhead. This is a worthwhile trade-off for the increased safety and quality. Rely on IDE extensions for instant feedback and run full linting in CI.
 61 | 
 62 | ### 1.3. Prettier Integration
 63 | 
 64 | ESLint handles code quality; Prettier handles code formatting. Use `eslint-config-prettier` to disable any ESLint rules that conflict with Prettier, preventing unnecessary warnings.
 65 | 
 66 | ```javascript
 67 | // eslint.config.js
 68 | import eslint from "@eslint/js";
 69 | import { defineConfig } from "eslint/config";
 70 | import prettierConfig from "eslint-config-prettier"; // Make sure this is last!
 71 | 
 72 | export default defineConfig([
 73 |   eslint.configs.recommended,
 74 |   // ... other configs (e.g., tseslint configs)
 75 |   prettierConfig, // Always place this last to override conflicting rules
 76 |   {
 77 |     rules: {
 78 |       // Custom rules or overrides go here
 79 |       "no-console": "warn", // Example: warn on console logs
 80 |     },
 81 |   },
 82 | ]);
 83 | ```
 84 | 
 85 | ## 2. Code Organization and Structure
 86 | 
 87 | Apply rules precisely where they're needed using `files` and `ignores`.
 88 | 
 89 | ```javascript
 90 | // eslint.config.js
 91 | import { defineConfig } from "eslint/config";
 92 | 
 93 | export default defineConfig([
 94 |   // ... base configs
 95 |   {
 96 |     files: ["src/**/*.js", "src/**/*.jsx"], // Apply to JS/JSX files in src
 97 |     rules: {
 98 |       "react/jsx-uses-react": "off", // Example: React 17+ doesn't need this
 99 |       "react/react-in-jsx-scope": "off",
100 |     },
101 |   },
102 |   {
103 |     files: ["**/*.test.js", "**/*.spec.ts"], // Apply to test files
104 |     rules: {
105 |       "no-unused-expressions": "off", // Allow chai-style assertions
106 |       "jest/expect-expect": "error", // Ensure tests have assertions
107 |     },
108 |   },
109 |   {
110 |     ignores: ["dist/", "node_modules/", "coverage/"], // Globally ignore these directories
111 |   },
112 | ]);
113 | ```
114 | 
115 | ## 3. Common Patterns and Anti-patterns
116 | 
117 | Enforce these critical rules to maintain high code quality.
118 | 
119 | ### 3.1. Immutability (`prefer-const`)
120 | 
121 | Always use `const` unless a variable's value is reassigned.
122 | 
123 | ❌ BAD
124 | 
125 | ```javascript
126 | let name = "Alice";
127 | name = "Bob"; // Reassigned, but `let` was used initially
128 | ```
129 | 
130 | ✅ GOOD
131 | 
132 | ```javascript
133 | const name = "Alice"; // Never reassigned
134 | let age = 30;
135 | age++; // Reassigned, `let` is appropriate
136 | ```
137 | 
138 | ### 3.2. Unused Variables (`no-unused-vars`)
139 | 
140 | Remove dead code. Unused variables, functions, or imports indicate cruft.
141 | 
142 | ❌ BAD
143 | 
144 | ```javascript
145 | const unusedVar = 10;
146 | function doSomething() {
147 |   /* ... */
148 | } // Never called
149 | ```
150 | 
151 | ✅ GOOD
152 | 
153 | ```javascript
154 | const usedVar = 10;
155 | console.log(usedVar);
156 | ```
157 | 
158 | ### 3.3. Consistent Returns (`consistent-return`)
159 | 
160 | Ensure functions either always return a value or never return one explicitly. Avoid implicit `undefined` returns.
161 | 
162 | ❌ BAD
163 | 
164 | ```javascript
165 | function process(value) {
166 |   if (value > 0) {
167 |     return value * 2;
168 |   }
169 |   // Implicitly returns undefined here
170 | }
171 | ```
172 | 
173 | ✅ GOOD
174 | 
175 | ```javascript
176 | function process(value) {
177 |   if (value > 0) {
178 |     return value * 2;
179 |   }
180 |   return 0; // Explicit return
181 | }
182 | 
183 | function logValue(value) {
184 |   console.log(value); // No return value expected
185 | }
186 | ```
187 | 
188 | ### 3.4. No Else Return (`no-else-return`)
189 | 
190 | Simplify conditional logic by returning early.
191 | 
192 | ❌ BAD
193 | 
194 | ```javascript
195 | function getValue(condition) {
196 |   if (condition) {
197 |     return "A";
198 |   } else {
199 |     return "B";
200 |   }
201 | }
202 | ```
203 | 
204 | ✅ GOOD
205 | 
206 | ```javascript
207 | function getValue(condition) {
208 |   if (condition) {
209 |     return "A";
210 |   }
211 |   return "B"; // Simplified
212 | }
213 | ```
214 | 
215 | ### 3.5. Strict Equality (`eqeqeq`)
216 | 
217 | Always use `===` and `!==` to prevent type coercion issues.
218 | 
219 | ❌ BAD
220 | 
221 | ```javascript
222 | if (value == null) {
223 |   /* ... */
224 | } // Coercion
225 | ```
226 | 
227 | ✅ GOOD
228 | 
229 | ```javascript
230 | if (value === null || value === undefined) {
231 |   /* ... */
232 | } // Explicit check
233 | if (value === 0) {
234 |   /* ... */
235 | } // No coercion
236 | ```
237 | 
238 | ### 3.6. No Console Logs (`no-console`)
239 | 
240 | Prevent accidental `console.log` statements from reaching production.
241 | 
242 | ```javascript
243 | // eslint.config.js
244 | export default defineConfig([
245 |   // ...
246 |   {
247 |     rules: {
248 |       "no-console": ["error", { allow: ["warn", "error"] }], // Allow warn/error, but error on log
249 |     },
250 |   },
251 | ]);
252 | ```
253 | 
254 | ### 3.7. No Magic Numbers (`no-magic-numbers`)
255 | 
256 | Replace unexplained numeric literals with named constants for readability and maintainability.
257 | 
258 | ❌ BAD
259 | 
260 | ```javascript
261 | function calculateArea(radius) {
262 |   return 3.14159 * radius * radius;
263 | }
264 | ```
265 | 
266 | ✅ GOOD
267 | 
268 | ```javascript
269 | const PI = 3.14159;
270 | function calculateArea(radius) {
271 |   return PI * radius * radius;
272 | }
273 | ```
274 | 
275 | ## 4. Common Pitfalls and Gotchas
276 | 
277 | ### 4.1. Avoid `eslint-disable`
278 | 
279 | **Never** use `eslint-disable` comments. They mask underlying issues, accumulate technical debt, and compromise code quality. If a rule is genuinely problematic for a specific, rare case, discuss it with the team to adjust the global configuration or create a targeted override.
280 | 
281 | ❌ BAD
282 | 
283 | ```javascript
284 | // eslint-disable-next-line no-console
285 | console.log("Debug info");
286 | ```
287 | 
288 | ✅ GOOD
289 | 
290 | ```javascript
291 | // Remove or refactor the problematic code.
292 | // Or, if truly necessary, configure the rule globally to allow specific cases.
293 | ```
294 | 
295 | ### 4.2. Configuration Order Matters
296 | 
297 | Ensure `eslint-config-prettier` is always the last configuration in your array to correctly disable conflicting rules.
298 | 
299 | ```javascript
300 | // eslint.config.js
301 | import eslint from "@eslint/js";
302 | import prettierConfig from "eslint-config-prettier";
303 | 
304 | export default defineConfig([
305 |   eslint.configs.recommended,
306 |   // ... other plugins/configs like tseslint
307 |   prettierConfig, // MUST BE LAST
308 |   {
309 |     rules: {
310 |       // Your custom rules go here and will override previous configs if needed
311 |     },
312 |   },
313 | ]);
314 | ```
315 | 
316 | ## 5. Testing Approaches
317 | 
318 | Integrate ESLint into your development workflow for proactive issue detection.
319 | 
320 | ### 5.1. Pre-commit Hooks (Husky + lint-staged)
321 | 
322 | Enforce linting on staged files before every commit. This ensures only clean code enters the repository.
323 | 
324 | ```json
325 | // package.json
326 | {
327 |   "name": "your-project",
328 |   // ...
329 |   "devDependencies": {
330 |     "husky": "^9.0.0",
331 |     "lint-staged": "^15.0.0",
332 |     "eslint": "^9.0.0"
333 |   },
334 |   "scripts": {
335 |     "prepare": "husky",
336 |     "lint": "eslint .",
337 |     "lint:fix": "eslint --fix ."
338 |   },
339 |   "lint-staged": {
340 |     "*.{js,jsx,ts,tsx,mts,cts}": "eslint --fix"
341 |   }
342 | }
343 | ```
344 | 
345 | Then, set up Husky:
346 | 
347 | ```bash
348 | npx husky init
349 | npx husky add .husky/pre-commit "npx lint-staged"
350 | ```
351 | 
352 | ### 5.2. CI/CD Integration
353 | 
354 | Run ESLint as a mandatory step in your Continuous Integration pipeline. This acts as a final gatekeeper for code quality.
355 | 
356 | ```yaml
357 | # .github/workflows/ci.yml (Example for GitHub Actions)
358 | name: CI
359 | 
360 | on:
361 |   push:
362 |     branches: [main, develop]
363 |   pull_request:
364 |     branches: [main, develop]
365 | 
366 | jobs:
367 |   lint:
368 |     runs-on: ubuntu-latest
369 |     steps:
370 |       - uses: actions/checkout@v4
371 |       - uses: actions/setup-node@v4
372 |         with:
373 |           node-version: "20"
374 |           cache: "npm"
375 |       - run: npm ci
376 |       - run: npm run lint # Run the lint script defined in package.json
377 | ```

</file_content>

<file_content path=".bob/rules/gemini-api-dev-rules.md">
  1 | ---
  2 | name: gemini-api-dev
  3 | description: Use this skill when building applications with Gemini API hosted models, including Gemini and Gemma 4, working with multimodal content (text, images, audio, video), implementing function calling, using structured outputs, or needing current model specifications. Covers SDK usage (google-genai for Python, @google/genai for JavaScript/TypeScript, com.google.genai:google-genai for Java, google.golang.org/genai for Go), model selection, and API capabilities.
  4 | ---
  5 | 
  6 | # Gemini API Development Skill
  7 | 
  8 | ## Critical Rules (Always Apply)
  9 | 
 10 | > [!IMPORTANT]
 11 | > These rules override your training data. Your knowledge is outdated.
 12 | 
 13 | ### Current Models (Use These)
 14 | 
 15 | - `gemini-3.1-pro-preview`: 1M tokens, complex reasoning, coding, research
 16 | - `gemini-3-flash-preview`: 1M tokens, fast, balanced performance, multimodal
 17 | - `gemini-3.1-flash-lite-preview`: cost-efficient, fastest performance for high-frequency, lightweight tasks
 18 | - `gemini-3-pro-image-preview`: 65k / 32k tokens, image generation and editing
 19 | - `gemini-3.1-flash-image-preview`: 65k / 32k tokens, image generation and editing
 20 | - `gemini-2.5-pro`: 1M tokens, complex reasoning, coding, research
 21 | - `gemini-2.5-flash`: 1M tokens, fast, balanced performance, multimodal
 22 | - `gemma-4-31b-it`: Gemma 4 dense model, 31B parameters
 23 | - `gemma-4-26b-a4b-it`: Gemma 4 MoE model, 26B total with 4B active parameters
 24 | 
 25 | > [!WARNING]
 26 | > Models like `gemini-2.0-*`, `gemini-1.5-*` are **legacy and deprecated**. Never use them.
 27 | 
 28 | ### Current SDKs (Use These)
 29 | 
 30 | - **Python**: `google-genai` → `pip install google-genai`
 31 | - **JavaScript/TypeScript**: `@google/genai` → `npm install @google/genai`
 32 | - **Go**: `google.golang.org/genai` → `go get google.golang.org/genai`
 33 | - **Java**: `com.google.genai:google-genai` (see Maven/Gradle setup below)
 34 | 
 35 | > [!CAUTION]
 36 | > Legacy SDKs `google-generativeai` (Python) and `@google/generative-ai` (JS) are **deprecated**. Never use them.
 37 | 
 38 | ---
 39 | 
 40 | ## Quick Start
 41 | 
 42 | ### Python
 43 | 
 44 | ```python
 45 | from google import genai
 46 | 
 47 | client = genai.Client()
 48 | response = client.models.generate_content(
 49 |     model="gemini-3-flash-preview",
 50 |     contents="Explain quantum computing"
 51 | )
 52 | print(response.text)
 53 | ```
 54 | 
 55 | ### JavaScript/TypeScript
 56 | 
 57 | ```typescript
 58 | import { GoogleGenAI } from "@google/genai";
 59 | 
 60 | const ai = new GoogleGenAI({});
 61 | const response = await ai.models.generateContent({
 62 |   model: "gemini-3-flash-preview",
 63 |   contents: "Explain quantum computing",
 64 | });
 65 | console.log(response.text);
 66 | ```
 67 | 
 68 | ### Go
 69 | 
 70 | ```go
 71 | package main
 72 | 
 73 | import (
 74 | 	"context"
 75 | 	"fmt"
 76 | 	"log"
 77 | 	"google.golang.org/genai"
 78 | )
 79 | 
 80 | func main() {
 81 | 	ctx := context.Background()
 82 | 	client, err := genai.NewClient(ctx, nil)
 83 | 	if err != nil {
 84 | 		log.Fatal(err)
 85 | 	}
 86 | 
 87 | 	resp, err := client.Models.GenerateContent(ctx, "gemini-3-flash-preview", genai.Text("Explain quantum computing"), nil)
 88 | 	if err != nil {
 89 | 		log.Fatal(err)
 90 | 	}
 91 | 
 92 | 	fmt.Println(resp.Text)
 93 | }
 94 | ```
 95 | 
 96 | ### Java
 97 | 
 98 | ```java
 99 | import com.google.genai.Client;
100 | import com.google.genai.types.GenerateContentResponse;
101 | 
102 | public class GenerateTextFromTextInput {
103 |   public static void main(String[] args) {
104 |     Client client = new Client();
105 |     GenerateContentResponse response =
106 |         client.models.generateContent(
107 |             "gemini-3-flash-preview",
108 |             "Explain quantum computing",
109 |             null);
110 | 
111 |     System.out.println(response.text());
112 |   }
113 | }
114 | ```
115 | 
116 | **Java Installation:**
117 | 
118 | - Latest version: https://central.sonatype.com/artifact/com.google.genai/google-genai/versions
119 | - Gradle: `implementation("com.google.genai:google-genai:${LAST_VERSION}")`
120 | - Maven:
121 |   ```xml
122 |   <dependency>
123 |       <groupId>com.google.genai</groupId>
124 |       <artifactId>google-genai</artifactId>
125 |       <version>${LAST_VERSION}</version>
126 |   </dependency>
127 |   ```
128 | 
129 | ---
130 | 
131 | ## Documentation Lookup
132 | 
133 | ### When MCP is Installed (Preferred)
134 | 
135 | If the **`search_docs`** tool (from the Google MCP server) is available, use it as your **only** documentation source:
136 | 
137 | 1. Call `search_docs` with your query
138 | 2. Read the returned documentation
139 | 3. **Trust MCP results** as source of truth for API details — they are always up-to-date.
140 | 
141 | > [!IMPORTANT]
142 | > When MCP tools are present, **never** fetch URLs manually. MCP provides up-to-date, indexed documentation that is more accurate and token-efficient than URL fetching.
143 | 
144 | ### When MCP is NOT Installed (Fallback Only)
145 | 
146 | If no MCP documentation tools are available, fetch from the official docs:
147 | 
148 | **Index URL**: `https://ai.google.dev/gemini-api/docs/llms.txt`
149 | 
150 | This index contains links to all documentation pages in .md.txt format. Use web fetch tools to:
151 | 
152 | 1. Fetch `llms.txt` to discover available pages
153 | 2. Fetch specific pages (e.g., `https://ai.google.dev/gemini-api/docs/function-calling.md.txt`)
154 | 
155 | Key pages:
156 | 
157 | - [Text generation](https://ai.google.dev/gemini-api/docs/text-generation.md.txt)
158 | - [Function calling](https://ai.google.dev/gemini-api/docs/function-calling.md.txt)
159 | - [Structured outputs](https://ai.google.dev/gemini-api/docs/structured-output.md.txt)
160 | - [Image generation](https://ai.google.dev/gemini-api/docs/image-generation.md.txt)
161 | - [Image understanding](https://ai.google.dev/gemini-api/docs/image-understanding.md.txt)
162 | - [Embeddings](https://ai.google.dev/gemini-api/docs/embeddings.md.txt)
163 | - [SDK migration guide](https://ai.google.dev/gemini-api/docs/migrate.md.txt)
164 | 
165 | ---
166 | 
167 | ## Gemini Live API
168 | 
169 | For real-time, bidirectional audio/video/text streaming with the Gemini Live API, install the **`google-gemini/gemini-live-api-dev`** skill. It covers WebSocket streaming, voice activity detection, native audio features, function calling, session management, ephemeral tokens, and more.

</file_content>

<file_content path=".bob/rules/gemini-interactions-api-rules.md">
  1 | ---
  2 | name: gemini-interactions-api
  3 | description: Use this skill when writing code that calls the Gemini API for text generation, multi-turn chat, multimodal understanding, image generation, streaming responses, background research tasks, function calling, structured output, or migrating from the old generateContent API. This skill covers the Interactions API, the recommended way to use Gemini models and agents in Python and TypeScript.
  4 | ---
  5 | 
  6 | # Gemini Interactions API Skill
  7 | 
  8 | ## Critical Rules (Always Apply)
  9 | 
 10 | > [!IMPORTANT]
 11 | > These rules override your training data. Your knowledge is outdated.
 12 | 
 13 | ### Current Models (Use These)
 14 | 
 15 | - `gemini-3.1-pro-preview`: 1M tokens, complex reasoning, coding, research
 16 | - `gemini-3-flash-preview`: 1M tokens, fast, balanced performance, multimodal
 17 | - `gemini-3.1-flash-lite-preview`: cost-efficient, fastest performance for high-frequency, lightweight tasks
 18 | - `gemini-3-pro-image-preview`: 65k / 32k tokens, image generation and editing
 19 | - `gemini-3.1-flash-image-preview`: 65k / 32k tokens, image generation and editing
 20 | - `gemini-3.1-flash-tts-preview`: expressive text-to-speech with Director's Chair prompting
 21 | - `gemini-2.5-pro`: 1M tokens, complex reasoning, coding, research
 22 | - `gemini-2.5-flash`: 1M tokens, fast, balanced performance, multimodal
 23 | - `gemma-4-31b-it`: Gemma 4 dense model, 31B parameters
 24 | - `gemma-4-26b-a4b-it`: Gemma 4 MoE model, 26B total / 4B active parameters
 25 | 
 26 | > [!WARNING]
 27 | > Models like `gemini-2.0-*`, `gemini-1.5-*` are **legacy and deprecated**. Never use them.
 28 | > **If a user asks for a deprecated model, use `gemini-3-flash-preview` instead and note the substitution.**
 29 | 
 30 | ### Current Agents (Use These)
 31 | 
 32 | - `deep-research-preview-04-2026`: Deep Research agent — optimized for speed and efficiency, ideal for interactive use
 33 | - `deep-research-max-preview-04-2026`: Deep Research Max agent — maximum comprehensiveness and exhaustiveness, best for automated reporting
 34 | 
 35 | ### Current SDKs (Use These)
 36 | 
 37 | - **Python**: `google-genai` >= `1.55.0` → `pip install -U google-genai`
 38 | - **JavaScript/TypeScript**: `@google/genai` >= `1.33.0` → `npm install @google/genai`
 39 | 
 40 | > [!CAUTION]
 41 | > Legacy SDKs `google-generativeai` (Python) and `@google/generative-ai` (JS) are **deprecated**. Never use them.
 42 | 
 43 | ## Overview
 44 | 
 45 | The Interactions API is a unified interface for interacting with Gemini models and agents. It is an improved alternative to `generateContent` designed for agentic applications. Key capabilities include:
 46 | 
 47 | - **Server-side state:** Offload conversation history to the server via `previous_interaction_id`
 48 | - **Background execution:** Run long-running tasks (like Deep Research) asynchronously
 49 | - **Streaming:** Receive incremental responses via Server-Sent Events
 50 | - **Tool orchestration:** Function calling, Google Search, code execution, URL context, file search, remote MCP
 51 | - **Agents:** Access built-in agents like Gemini Deep Research
 52 | - **Thinking:** Configurable reasoning depth with thought summaries
 53 | 
 54 | ## Quick Start
 55 | 
 56 | ### Interact with a Model
 57 | 
 58 | #### Python
 59 | 
 60 | ```python
 61 | from google import genai
 62 | 
 63 | client = genai.Client()
 64 | 
 65 | interaction = client.interactions.create(
 66 |     model="gemini-3-flash-preview",
 67 |     input="Tell me a short joke about programming."
 68 | )
 69 | print(interaction.outputs[-1].text)
 70 | ```
 71 | 
 72 | #### JavaScript/TypeScript
 73 | 
 74 | ```typescript
 75 | import { GoogleGenAI } from "@google/genai";
 76 | 
 77 | const client = new GoogleGenAI({});
 78 | 
 79 | const interaction = await client.interactions.create({
 80 |   model: "gemini-3-flash-preview",
 81 |   input: "Tell me a short joke about programming.",
 82 | });
 83 | console.log(interaction.outputs[interaction.outputs.length - 1].text);
 84 | ```
 85 | 
 86 | ### Stateful Conversation
 87 | 
 88 | #### Python
 89 | 
 90 | ```python
 91 | from google import genai
 92 | 
 93 | client = genai.Client()
 94 | 
 95 | # First turn
 96 | interaction1 = client.interactions.create(
 97 |     model="gemini-3-flash-preview",
 98 |     input="Hi, my name is Phil."
 99 | )
100 | 
101 | # Second turn — server remembers context
102 | interaction2 = client.interactions.create(
103 |     model="gemini-3-flash-preview",
104 |     input="What is my name?",
105 |     previous_interaction_id=interaction1.id
106 | )
107 | print(interaction2.outputs[-1].text)
108 | ```
109 | 
110 | #### JavaScript/TypeScript
111 | 
112 | ```typescript
113 | import { GoogleGenAI } from "@google/genai";
114 | 
115 | const client = new GoogleGenAI({});
116 | 
117 | // First turn
118 | const interaction1 = await client.interactions.create({
119 |   model: "gemini-3-flash-preview",
120 |   input: "Hi, my name is Phil.",
121 | });
122 | 
123 | // Second turn — server remembers context
124 | const interaction2 = await client.interactions.create({
125 |   model: "gemini-3-flash-preview",
126 |   input: "What is my name?",
127 |   previous_interaction_id: interaction1.id,
128 | });
129 | console.log(interaction2.outputs[interaction2.outputs.length - 1].text);
130 | ```
131 | 
132 | ### Deep Research Agent
133 | 
134 | Use `deep-research-preview-04-2026` for fast, interactive research or `deep-research-max-preview-04-2026` for maximum exhaustiveness.
135 | 
136 | #### Python
137 | 
138 | ```python
139 | import time
140 | from google import genai
141 | 
142 | client = genai.Client()
143 | 
144 | # Start background research
145 | interaction = client.interactions.create(
146 |     agent="deep-research-preview-04-2026",
147 |     input="Research the history of Google TPUs.",
148 |     background=True
149 | )
150 | 
151 | # Poll for results
152 | while True:
153 |     interaction = client.interactions.get(interaction.id)
154 |     if interaction.status == "completed":
155 |         print(interaction.outputs[-1].text)
156 |         break
157 |     elif interaction.status == "failed":
158 |         print(f"Failed: {interaction.error}")
159 |         break
160 |     time.sleep(10)
161 | ```
162 | 
163 | #### JavaScript/TypeScript
164 | 
165 | ```typescript
166 | import { GoogleGenAI } from "@google/genai";
167 | 
168 | const client = new GoogleGenAI({});
169 | 
170 | // Start background research
171 | const initialInteraction = await client.interactions.create({
172 |   agent: "deep-research-preview-04-2026",
173 |   input: "Research the history of Google TPUs.",
174 |   background: true,
175 | });
176 | 
177 | // Poll for results
178 | while (true) {
179 |   const interaction = await client.interactions.get(initialInteraction.id);
180 |   if (interaction.status === "completed") {
181 |     console.log(interaction.outputs[interaction.outputs.length - 1].text);
182 |     break;
183 |   } else if (["failed", "cancelled"].includes(interaction.status)) {
184 |     console.log(`Failed: ${interaction.status}`);
185 |     break;
186 |   }
187 |   await new Promise((resolve) => setTimeout(resolve, 10000));
188 | }
189 | ```
190 | 
191 | **Advanced Deep Research Features**
192 | 
193 | Deep Research supports additional capabilities beyond basic research. See the [Deep Research documentation](https://ai.google.dev/gemini-api/docs/deep-research) for full details and code examples:
194 | 
195 | - **Collaborative planning** Review and refine the agent's research plan before execution (`collaborative_planning: true` in `agent_config`)
196 | - **Native visualization** Generate charts and infographics inline with research reports (`visualization: "auto"` in `agent_config`)
197 | - **MCP integration** Connect to private data sources and specialized tools via remote MCP servers
198 | - **File search** Search over uploaded files and connected file stores
199 | - **Multimodal inputs** Ground research with PDFs, CSVs, images, audio, and video
200 | 
201 | ### Streaming
202 | 
203 | #### Python
204 | 
205 | ```python
206 | from google import genai
207 | 
208 | client = genai.Client()
209 | 
210 | stream = client.interactions.create(
211 |     model="gemini-3-flash-preview",
212 |     input="Explain quantum entanglement in simple terms.",
213 |     stream=True
214 | )
215 | 
216 | for chunk in stream:
217 |     if chunk.event_type == "content.delta":
218 |         if chunk.delta.type == "text":
219 |             print(chunk.delta.text, end="", flush=True)
220 |     elif chunk.event_type == "interaction.complete":
221 |         print(f"\n\nTotal Tokens: {chunk.interaction.usage.total_tokens}")
222 | ```
223 | 
224 | #### JavaScript/TypeScript
225 | 
226 | ```typescript
227 | import { GoogleGenAI } from "@google/genai";
228 | 
229 | const client = new GoogleGenAI({});
230 | 
231 | const stream = await client.interactions.create({
232 |   model: "gemini-3-flash-preview",
233 |   input: "Explain quantum entanglement in simple terms.",
234 |   stream: true,
235 | });
236 | 
237 | for await (const chunk of stream) {
238 |   if (chunk.event_type === "content.delta") {
239 |     if (chunk.delta.type === "text" && "text" in chunk.delta) {
240 |       process.stdout.write(chunk.delta.text);
241 |     }
242 |   } else if (chunk.event_type === "interaction.complete") {
243 |     console.log(`\n\nTotal Tokens: ${chunk.interaction.usage.total_tokens}`);
244 |   }
245 | }
246 | ```
247 | 
248 | ## Data Model
249 | 
250 | An `Interaction` response contains `outputs` — an array of typed content blocks. Each block has a `type` field:
251 | 
252 | - `text` — Generated text (`text` field)
253 | - `thought` — Model reasoning (`signature` required, optional `summary`)
254 | - `function_call` — Tool call request (`id`, `name`, `arguments`)
255 | - `function_result` — Tool result you send back (`call_id`, `name`, `result`)
256 | - `google_search_call` / `google_search_result` — Google Search tool
257 | - `code_execution_call` / `code_execution_result` — Code execution tool
258 | - `url_context_call` / `url_context_result` — URL context tool
259 | - `mcp_server_tool_call` / `mcp_server_tool_result` — Remote MCP tool
260 | - `file_search_call` / `file_search_result` — File search tool
261 | - `image` — Generated or input image (`data`, `mime_type`, or `uri`)
262 | 
263 | **Status values:** `completed`, `in_progress`, `requires_action`, `failed`, `cancelled`
264 | 
265 | ## Key Differences from generateContent
266 | 
267 | - `startChat()` + manual history → `previous_interaction_id` (server-managed)
268 | - `sendMessage()` → `interactions.create(previous_interaction_id=...)`
269 | - `response.text` → `interaction.outputs[-1].text`
270 | - No background execution → `background=True` for async tasks
271 | - No agent access → `agent="deep-research-preview-04-2026"` or `agent="deep-research-max-preview-04-2026"`
272 | 
273 | ## Important Notes
274 | 
275 | - Interactions are **stored by default** (`store=true`). Paid tier retains for 55 days, free tier for 1 day.
276 | - Set `store=false` to opt out, but this disables `previous_interaction_id` and `background=true`.
277 | - `tools`, `system_instruction`, and `generation_config` are **interaction-scoped** — re-specify them each turn.
278 | - **Agents require** `background=True`.
279 | - You can **mix agent and model interactions** in a conversation chain via `previous_interaction_id`.
280 | 
281 | ## Documentation Lookup
282 | 
283 | ### When MCP is Installed (Preferred)
284 | 
285 | If the **`search_docs`** tool (from the Google MCP server) is available, use it as your **only** documentation source:
286 | 
287 | 1. Call `search_docs` with your query
288 | 2. Read the returned documentation
289 | 3. **Trust MCP results** as source of truth for API details — they are always up-to-date.
290 | 
291 | > [!IMPORTANT]
292 | > When MCP tools are present, **never** fetch URLs manually. MCP provides up-to-date, indexed documentation that is more accurate and token-efficient than URL fetching.
293 | 
294 | ### When MCP is NOT Installed (Fallback Only)
295 | 
296 | If no MCP documentation tools are available, fetch from the official docs:
297 | 
298 | - [Interactions Full Documentation](https://ai.google.dev/gemini-api/docs/interactions.md.txt)
299 | - [Deep Research Full Documentation](https://ai.google.dev/gemini-api/docs/deep-research.md.txt)
300 | 
301 | These pages cover function calling, built-in tools (Google Search, code execution, URL context, file search, computer use), remote MCP, structured output, thinking configuration, working with files, multimodal understanding and generation, streaming events, and more.

</file_content>

<file_content path=".bob/rules/gemini-live-api-dev-rules.md">

</file_content>

<file_content path=".bob/rules/github-actions-rules.md">
  1 | ---
  2 | description: This guide provides definitive, opinionated best practices for writing robust, secure, and performant GitHub Actions workflows. Follow these rules to build maintainable CI/CD pipelines.
  3 | globs: **/*
  4 | ---
  5 | 
  6 | # github-actions Best Practices
  7 | 
  8 | GitHub Actions is the backbone of modern CI/CD. Adhering to these best practices ensures your workflows are efficient, secure, and maintainable. This guide is your definitive reference for building high-quality pipelines.
  9 | 
 10 | ## 1. Workflow Design & Code Organization
 11 | 
 12 | Structure your workflows for clarity, reusability, and efficiency.
 13 | 
 14 | ### 1.1 Use Reusable Workflows and Composite Actions
 15 | 
 16 | Avoid duplication. Abstract common sequences into reusable workflows or composite actions.
 17 | 
 18 | **❌ BAD: Duplicated Steps**
 19 | 
 20 | ```yaml
 21 | # .github/workflows/build-frontend.yml
 22 | jobs:
 23 |   build:
 24 |     steps:
 25 |       - uses: actions/checkout@v4
 26 |       - uses: actions/setup-node@v4
 27 |         with: { node-version: '20' }
 28 |       - run: npm ci
 29 |       - run: npm run build
 30 | 
 31 | # .github/workflows/build-backend.yml
 32 | jobs:
 33 |   build:
 34 |     steps:
 35 |       - uses: actions/checkout@v4
 36 |       - uses: actions/setup-node@v4 # Duplicated setup
 37 |         with: { node-version: '20' }
 38 |       - run: npm ci # Duplicated install
 39 |       - run: npm run build:backend # Different build step
 40 | ```
 41 | 
 42 | **✅ GOOD: Reusable Workflow**
 43 | 
 44 | ```yaml
 45 | # .github/workflows/reusable-build.yml
 46 | on:
 47 |   workflow_call:
 48 |     inputs:
 49 |       build-script: { required: true, type: string }
 50 | jobs:
 51 |   build:
 52 |     runs-on: ubuntu-latest
 53 |     steps:
 54 |       - uses: actions/checkout@v4
 55 |       - uses: actions/setup-node@v4
 56 |         with: { node-version: '20' }
 57 |       - run: npm ci
 58 |       - run: ${{ inputs.build-script }}
 59 | 
 60 | # .github/workflows/frontend.yml
 61 | jobs:
 62 |   build:
 63 |     uses: ./.github/workflows/reusable-build.yml
 64 |     with: { build-script: 'npm run build:frontend' }
 65 | 
 66 | # .github/workflows/backend.yml
 67 | jobs:
 68 |   build:
 69 |     uses: ./.github/workflows/reusable-build.yml
 70 |     with: { build-script: 'npm run build:backend' }
 71 | ```
 72 | 
 73 | ### 1.2 Name Jobs and Steps Consistently
 74 | 
 75 | Use clear, descriptive names for jobs and steps. This improves readability and debugging.
 76 | 
 77 | **❌ BAD: Vague Naming**
 78 | 
 79 | ```yaml
 80 | jobs:
 81 |   job1:
 82 |     steps:
 83 |       - run: echo "hello"
 84 |       - run: npm test
 85 | 
 86 | # logs will show 'Run echo "hello"' and 'Run npm test'
 87 | ```
 88 | 
 89 | **✅ GOOD: Descriptive Naming**
 90 | 
 91 | ```yaml
 92 | jobs:
 93 |   lint-and-test:
 94 |     name: Lint & Test Code
 95 |     steps:
 96 |       - name: Run ESLint
 97 |         run: npm run lint
 98 |       - name: Run Unit Tests
 99 |         run: npm test
100 | ```
101 | 
102 | ### 1.3 Employ Matrix Strategies for Broad Testing
103 | 
104 | Test across multiple OSes, Node.js versions, or other configurations efficiently.
105 | 
106 | **❌ BAD: Separate Jobs for Each Variant**
107 | 
108 | ```yaml
109 | jobs:
110 |   test-node-18-ubuntu:
111 |     runs-on: ubuntu-latest
112 |     steps:
113 |       - uses: actions/setup-node@v4
114 |         with: { node-version: "18" }
115 |       - run: npm test
116 |   test-node-20-ubuntu:
117 |     runs-on: ubuntu-latest
118 |     steps:
119 |       - uses: actions/setup-node@v4
120 |         with: { node-version: "20" }
121 |       - run: npm test
122 | ```
123 | 
124 | **✅ GOOD: Single Job with Matrix**
125 | 
126 | ```yaml
127 | jobs:
128 |   test:
129 |     runs-on: ${{ matrix.os }}
130 |     strategy:
131 |       matrix:
132 |         node-version: ['18', '20']
133 |         os: [ubuntu-latest, windows-latest]
134 |     steps:
135 |       - uses: actions/setup-node@v4
136 |         with: { node-version: ${{ matrix.node-version }} }
137 |       - run: npm test
138 | ```
139 | 
140 | ### 1.4 Set Explicit Concurrency Groups
141 | 
142 | Prevent simultaneous runs on the same environment, especially for deployments.
143 | 
144 | **❌ BAD: Overlapping Deployments**
145 | 
146 | ```yaml
147 | jobs:
148 |   deploy:
149 |     environment: production
150 |     # Multiple pushes could trigger concurrent deployments
151 | ```
152 | 
153 | **✅ GOOD: Enforced Concurrency**
154 | 
155 | ```yaml
156 | jobs:
157 |   deploy:
158 |     runs-on: ubuntu-latest
159 |     environment: production
160 |     concurrency: production_deployment # Only one 'production_deployment' can run at a time
161 |     steps:
162 |       - name: Deploy to Production
163 |         run: deploy-script.sh
164 | ```
165 | 
166 | ## 2. Performance Considerations
167 | 
168 | Optimize your workflows for speed and cost-efficiency.
169 | 
170 | ### 2.1 Cache Dependencies
171 | 
172 | Significantly reduce build times by caching `node_modules`, `pip` packages, etc.
173 | 
174 | **❌ BAD: Reinstalling Dependencies Every Run**
175 | 
176 | ```yaml
177 | steps:
178 |   - run: npm ci # Always downloads everything
179 | ```
180 | 
181 | **✅ GOOD: Smart Caching**
182 | 
183 | ```yaml
184 | steps:
185 |   - uses: actions/cache@v4
186 |     with:
187 |       path: ~/.npm # Or node_modules, ~/.cache/pip, etc.
188 |       key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
189 |       restore-keys: |
190 |         ${{ runner.os }}-node-
191 |   - run: npm ci
192 | ```
193 | 
194 | ## 3. Code Quality & Maintainability
195 | 
196 | Enforce high standards and ensure supply chain integrity.
197 | 
198 | ### 3.1 Run Linters, Formatters, and Static Analysis Early
199 | 
200 | Catch issues before they merge. Complement with local pre-commit hooks.
201 | 
202 | **❌ BAD: No Early Checks**
203 | 
204 | ```yaml
205 | jobs:
206 |   build:
207 |     steps:
208 |       - run: npm run build # Build fails due to linting errors discovered late
209 | ```
210 | 
211 | **✅ GOOD: Shift-Left Quality Checks**
212 | 
213 | ```yaml
214 | jobs:
215 |   lint:
216 |     name: Lint Code
217 |     runs-on: ubuntu-latest
218 |     steps:
219 |       - uses: actions/checkout@v4
220 |       - uses: actions/setup-node@v4
221 |         with: { node-version: "20" }
222 |       - run: npm ci
223 |       - run: npm run lint # Fail fast
224 |   test:
225 |     name: Run Tests
226 |     runs-on: ubuntu-latest
227 |     needs: lint # Only run tests if lint passes
228 |     steps:
229 |       # ...
230 | ```
231 | 
232 | ### 3.2 Pin Third-Party Actions to a Specific SHA or Version Tag
233 | 
234 | Prevent unexpected changes from breaking your workflows or introducing vulnerabilities.
235 | 
236 | **❌ BAD: Floating Version Tag**
237 | 
238 | ```yaml
239 | uses: actions/checkout@v4 # v4 could update at any time
240 | ```
241 | 
242 | **✅ GOOD: Specific Version Tag or SHA**
243 | 
244 | ```yaml
245 | uses: actions/checkout@v4.1.1 # Pin to specific patch
246 | # OR (most secure)
247 | uses: actions/checkout@a81bbbf8298bb0ba8a753697672f0999c0179a61 # Pin to specific SHA
248 | ```
249 | 
250 | ## 4. Security Hardening & Configuration Management
251 | 
252 | Protect your secrets and mitigate common attack vectors.
253 | 
254 | ### 4.1 Store All Secrets in GitHub Secrets
255 | 
256 | Never hardcode sensitive values. Use GitHub's built-in secret management.
257 | 
258 | **❌ BAD: Hardcoded Secrets**
259 | 
260 | ```yaml
261 | env:
262 |   API_KEY: "sk_test_12345" # Exposed in workflow file
263 | ```
264 | 
265 | **✅ GOOD: GitHub Secrets**
266 | 
267 | ```yaml
268 | env:
269 |   API_KEY: ${{ secrets.MY_API_KEY }} # Securely referenced
270 | ```
271 | 
272 | ### 4.2 Apply Principle of Least Privilege to `GITHUB_TOKEN`
273 | 
274 | Set default `GITHUB_TOKEN` permissions to read-only, then elevate only when necessary for specific jobs.
275 | 
276 | **❌ BAD: Overly Permissive Default**
277 | 
278 | ```yaml
279 | permissions: write-all # Grants write access to many scopes by default
280 | jobs:
281 |   build:
282 |     # ...
283 |   deploy:
284 |     # ...
285 | ```
286 | 
287 | **✅ GOOD: Granular Permissions**
288 | 
289 | ```yaml
290 | permissions:
291 |   contents: read # Default to read-only for all jobs
292 | jobs:
293 |   build:
294 |     # No additional permissions needed
295 |     steps:
296 |       # ...
297 |   deploy:
298 |     permissions:
299 |       contents: write # Elevate only for this job to push changes
300 |     steps:
301 |       # ...
302 | ```
303 | 
304 | ### 4.3 Mask Sensitive Data in Logs
305 | 
306 | Use `::add-mask::` for any non-GitHub secret sensitive values that might appear in logs.
307 | 
308 | **❌ BAD: Printing Sensitive Output**
309 | 
310 | ```yaml
311 | - run: echo "Debug info: ${{ env.TEMP_TOKEN }}" # TEMP_TOKEN will be visible
312 | ```
313 | 
314 | **✅ GOOD: Masking Output**
315 | 
316 | ```yaml
317 | - run: echo "::add-mask::${{ env.TEMP_TOKEN }}"
318 | - run: echo "Debug info: ${{ env.TEMP_TOKEN }}" # TEMP_TOKEN will be masked
319 | ```
320 | 
321 | ### 4.4 Mitigate Script Injection Attacks
322 | 
323 | Always pass untrusted input (e.g., from `github.event.pull_request.title`) to scripts via environment variables, not direct interpolation.
324 | 
325 | **❌ BAD: Direct Interpolation**
326 | 
327 | ```yaml
328 | - run: echo "Title: ${{ github.event.pull_request.title }}" # Vulnerable to `"; rm -rf /"`
329 | ```
330 | 
331 | **✅ GOOD: Intermediate Environment Variable**
332 | 
333 | ```yaml
334 | - name: Check PR Title
335 |   env:
336 |     PR_TITLE: ${{ github.event.pull_request.title }}
337 |   run: |
338 |     if [[ "$PR_TITLE" =~ ^feat ]]; then
339 |       echo "Feature PR"
340 |     fi
341 | ```
342 | 
343 | ## 5. Common Pitfalls & Gotchas
344 | 
345 | Be aware of these common issues to avoid debugging headaches.
346 | 
347 | ### 5.1 Debugging with `ACTIONS_STEP_DEBUG`
348 | 
349 | Enable verbose logging for a specific workflow run to diagnose issues.
350 | 
351 | **❌ BAD: Guessing at Failures**
352 | 
353 | ```yaml
354 | # Workflow fails, no extra info
355 | ```
356 | 
357 | **✅ GOOD: Enable Debugging**
358 | 
359 | 1.  Go to your repository settings.
360 | 2.  Navigate to "Secrets and variables" -> "Actions" -> "Repository secrets".
361 | 3.  Add a new repository secret: `ACTIONS_STEP_DEBUG` with value `true`.
362 | 4.  Rerun the workflow.
363 | 5.  **Remember to delete the secret after debugging!**
364 | 
365 | ### 5.2 Correct Use of Conditional Logic
366 | 
367 | Use `if` conditions for steps or jobs effectively.
368 | 
369 | **❌ BAD: Incorrect `if` syntax**
370 | 
371 | ```yaml
372 | - name: Deploy if main
373 |   if: github.ref == 'main' # This is for steps, not jobs
374 |   run: deploy.sh
375 | ```
376 | 
377 | **✅ GOOD: Proper `if` Placement**
378 | 
379 | ```yaml
380 | jobs:
381 |   deploy:
382 |     if: github.ref == 'refs/heads/main' # Condition for the entire job
383 |     steps:
384 |       - name: Deploy to Production
385 |         if: success() # Condition for a step
386 |         run: deploy.sh
387 | ```
388 | 
389 | ## 6. Testing Approaches
390 | 
391 | Integrate robust testing into your CI/CD pipeline.
392 | 
393 | ### 6.1 Implement Code Scanning
394 | 
395 | Use GitHub's built-in code scanning to find security vulnerabilities early.
396 | 
397 | **❌ BAD: No Automated Security Scans**
398 | 
399 | ```yaml
400 | # Relying solely on manual review for security
401 | ```
402 | 
403 | **✅ GOOD: Integrated Code Scanning**
404 | 
405 | ```yaml
406 | jobs:
407 |   code-scan:
408 |     name: Code Scanning
409 |     runs-on: ubuntu-latest
410 |     permissions:
411 |       security-events: write
412 |     steps:
413 |       - uses: actions/checkout@v4
414 |       - uses: github/codeql-action/init@v3
415 |         with: { languages: javascript }
416 |       - uses: github/codeql-action/autobuild@v3
417 |       - uses: github/codeql-action/analyze@v3
418 | ```

</file_content>

<file_content path=".bob/rules/google-maps-js-rules.md">
  1 | ---
  2 | description: This guide provides definitive best practices for integrating and managing the Google Maps JavaScript API in modern web applications, focusing on security, performance, and maintainability.
  3 | globs: **/*.{js,jsx}
  4 | ---
  5 | 
  6 | # google-maps-js Best Practices
  7 | 
  8 | This document outlines the definitive guidelines for working with the Google Maps JavaScript API. Adhering to these practices ensures secure, performant, and maintainable map-centric applications.
  9 | 
 10 | ## 1. Code Organization and Structure
 11 | 
 12 | Encapsulate map logic to keep components clean and reusable. Avoid direct global `google.maps` object manipulation within React components.
 13 | 
 14 | ### ✅ GOOD: Custom Hooks for Map Logic (React)
 15 | 
 16 | Abstract map initialization and interactions into custom hooks.
 17 | 
 18 | ```jsx
 19 | // hooks/useGoogleMap.js
 20 | import { useEffect, useRef, useState } from "react";
 21 | import { Loader } from "@googlemaps/js-api-loader";
 22 | 
 23 | const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Securely load API key
 24 | 
 25 | export function useGoogleMap(mapContainerRef, options) {
 26 |   const [map, setMap] = useState(null);
 27 |   const loaderRef = useRef(null);
 28 | 
 29 |   useEffect(() => {
 30 |     if (!mapContainerRef.current || !API_KEY) return;
 31 | 
 32 |     if (!loaderRef.current) {
 33 |       loaderRef.current = new Loader({
 34 |         apiKey: API_KEY,
 35 |         version: "weekly", // Use 'weekly' for latest features, 'quarterly' for stability
 36 |         // Do NOT specify 'libraries' here unless absolutely necessary for caching.
 37 |         // Prefer dynamic importLibrary() calls.
 38 |       });
 39 |     }
 40 | 
 41 |     const initMap = async () => {
 42 |       try {
 43 |         const { Map } = await loaderRef.current.importLibrary("maps");
 44 |         const newMap = new Map(mapContainerRef.current, {
 45 |           center: { lat: -34.397, lng: 150.644 },
 46 |           zoom: 8,
 47 |           mapId: "YOUR_MAP_ID", // Always use a Map ID
 48 |           ...options,
 49 |         });
 50 |         setMap(newMap);
 51 |       } catch (error) {
 52 |         console.error("Error loading Google Maps:", error);
 53 |         // Implement user-facing error message, e.g., show a fallback UI
 54 |       }
 55 |     };
 56 | 
 57 |     initMap();
 58 | 
 59 |     // Cleanup: Google Maps API doesn't have a direct 'destroy' method for Map instances
 60 |     // but unmounting the container and nulling the map reference helps.
 61 |     return () => {
 62 |       setMap(null); // Clear map instance on unmount
 63 |     };
 64 |   }, [mapContainerRef, options]);
 65 | 
 66 |   return map;
 67 | }
 68 | 
 69 | // components/MyMapComponent.jsx
 70 | import React, { useRef, useEffect } from "react";
 71 | import { useGoogleMap } from "../hooks/useGoogleMap";
 72 | 
 73 | export function MyMapComponent() {
 74 |   const mapRef = useRef(null);
 75 |   const map = useGoogleMap(mapRef, { zoom: 10, center: { lat: 34.0522, lng: -118.2437 } });
 76 | 
 77 |   useEffect(() => {
 78 |     if (map) {
 79 |       // Map is loaded, add markers, listeners, etc.
 80 |       console.log("Map loaded:", map);
 81 |       const marker = new google.maps.marker.AdvancedMarkerElement({
 82 |         map,
 83 |         position: map.getCenter(),
 84 |         title: "Hello World",
 85 |       });
 86 |       // Remember to clean up markers/overlays if they are not managed by the map itself
 87 |     }
 88 |   }, [map]);
 89 | 
 90 |   return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
 91 | }
 92 | ```
 93 | 
 94 | ## 2. Security
 95 | 
 96 | API key security is paramount. Never expose your API keys directly in client-side code.
 97 | 
 98 | ### ❌ BAD: Hardcoding API Keys
 99 | 
100 | ```javascript
101 | // In a client-side JS file
102 | const API_KEY = "YOUR_HARDCODED_API_KEY_HERE"; // EXPOSED!
103 | const loader = new Loader({ apiKey: API_KEY });
104 | ```
105 | 
106 | ### ✅ GOOD: Secure API Key Management
107 | 
108 | Store API keys as environment variables and restrict them in the Google Cloud Console.
109 | 
110 | ```javascript
111 | // .env.local (for Next.js/Vite, etc.)
112 | NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
113 | 
114 | // In your application code (e.g., useGoogleMap.js)
115 | const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
116 | 
117 | // Google Cloud Console: Always restrict API keys by HTTP referrer (your domain)
118 | // or by application (Android/iOS package names).
119 | // Use separate keys for different projects/environments to isolate failures.
120 | ```
121 | 
122 | ## 3. Loading the API
123 | 
124 | Always use modern, performant methods for loading the Maps JavaScript API.
125 | 
126 | ### ❌ BAD: Synchronous Script Tag
127 | 
128 | ```html
129 | <!-- Loads all libraries upfront, blocks rendering -->
130 | <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
131 | ```
132 | 
133 | ### ✅ GOOD: Dynamic Library Import with `js-api-loader`
134 | 
135 | This allows lazy loading of specific libraries as needed, reducing initial bundle size and improving page load performance.
136 | 
137 | ```javascript
138 | import { Loader } from "@googlemaps/js-api-loader";
139 | 
140 | const loader = new Loader({
141 |   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
142 |   version: "weekly",
143 | });
144 | 
145 | async function initializeMapAndPlaces() {
146 |   try {
147 |     const { Map } = await loader.importLibrary("maps");
148 |     const { AdvancedMarkerElement } = await loader.importLibrary("marker");
149 |     const { AutocompleteService } = await loader.importLibrary("places");
150 | 
151 |     const map = new Map(document.getElementById("map"), {
152 |       /* ... */
153 |     });
154 |     const marker = new AdvancedMarkerElement({ map /* ... */ });
155 |     const autocompleteService = new AutocompleteService();
156 |     // ... use services
157 |   } catch (error) {
158 |     console.error("Failed to load Google Maps libraries:", error);
159 |   }
160 | }
161 | 
162 | initializeMapAndPlaces();
163 | ```
164 | 
165 | ## 4. Event Handling
166 | 
167 | Manage event listeners carefully to prevent memory leaks and ensure proper cleanup.
168 | 
169 | ### ❌ BAD: Unmanaged Event Listeners
170 | 
171 | ```javascript
172 | // In a React component, without cleanup
173 | useEffect(() => {
174 |   if (map) {
175 |     map.addListener("click", (e) => {
176 |       console.log("Map clicked at:", e.latLng.toString());
177 |     });
178 |     // This listener will persist even if the component unmounts
179 |   }
180 | }, [map]);
181 | ```
182 | 
183 | ### ✅ GOOD: Managed Event Listeners with Cleanup
184 | 
185 | Use `google.maps.event.addListener` and store the listener handle for later removal with `google.maps.event.removeListener`. In React, this is handled in `useEffect`'s cleanup function.
186 | 
187 | ```javascript
188 | useEffect(() => {
189 |   if (map) {
190 |     const clickListener = map.addListener("click", (e) => {
191 |       console.log("Map clicked at:", e.latLng.toString());
192 |     });
193 | 
194 |     const dragEndListener = map.addListener("dragend", () => {
195 |       console.log("Map dragged to:", map.getCenter().toString());
196 |     });
197 | 
198 |     // Cleanup function: remove listeners when component unmounts or dependencies change
199 |     return () => {
200 |       google.maps.event.removeListener(clickListener);
201 |       google.maps.event.removeListener(dragEndListener);
202 |     };
203 |   }
204 | }, [map]);
205 | ```
206 | 
207 | ## 5. Performance Considerations
208 | 
209 | Optimize map rendering and API requests to ensure a smooth user experience.
210 | 
211 | ### 5.1 Marker Management
212 | 
213 | For applications with many markers, implement clustering or only render visible markers.
214 | 
215 | ### ✅ GOOD: Marker Clustering
216 | 
217 | Use a helper library like `@googlemaps/markerclusterer` for efficient marker management.
218 | 
219 | ```javascript
220 | import { MarkerClusterer } from "@googlemaps/markerclusterer";
221 | 
222 | async function addClusteredMarkers(map, locations) {
223 |   const { AdvancedMarkerElement } = await loader.importLibrary("marker");
224 |   const markers = locations.map((loc) => new AdvancedMarkerElement({ position: loc }));
225 | 
226 |   new MarkerClusterer({ map, markers });
227 | }
228 | ```
229 | 
230 | ### 5.2 Debouncing/Throttling Map Events
231 | 
232 | Avoid excessive re-renders or API calls on continuous events like `mousemove` or `drag`.
233 | 
234 | ### ✅ GOOD: Debouncing `idle` Event
235 | 
236 | ```javascript
237 | import { debounce } from "lodash"; // Or implement your own debounce utility
238 | 
239 | useEffect(() => {
240 |   if (map) {
241 |     const handleMapIdle = debounce(() => {
242 |       const center = map.getCenter();
243 |       const zoom = map.getZoom();
244 |       console.log(`Map idle. Center: ${center.toString()}, Zoom: ${zoom}`);
245 |       // Trigger API calls or state updates here (e.g., fetch new data for current viewport)
246 |     }, 500); // Wait 500ms after map stops moving
247 | 
248 |     const idleListener = map.addListener("idle", handleMapIdle);
249 | 
250 |     return () => {
251 |       google.maps.event.removeListener(idleListener);
252 |       handleMapIdle.cancel(); // Cancel any pending debounced calls
253 |     };
254 |   }
255 | }, [map]);
256 | ```
257 | 
258 | ## 6. Request/Response Patterns & Rate Limiting
259 | 
260 | All web service requests must be asynchronous, use HTTPS, and implement robust error handling with exponential backoff.
261 | 
262 | ### ❌ BAD: Synchronous Requests & No Backoff
263 | 
264 | ```javascript
265 | // This is a conceptual BAD example, as browser JS typically prevents synchronous XHR to external domains.
266 | // The core issue is making repeated, unmanaged requests to web services.
267 | function getGeolocation(location) {
268 |   // ... make direct fetch call without retry logic ...
269 |   // This will fail on transient errors and could hit rate limits quickly.
270 | }
271 | ```
272 | 
273 | ### ✅ GOOD: Asynchronous Requests with Exponential Backoff
274 | 
275 | For server-side or client-side web service calls (e.g., Geocoding, Places API _web services_), implement exponential backoff.
276 | 
277 | ```javascript
278 | async function fetchWithExponentialBackoff(url, maxRetries = 5, initialDelay = 100) {
279 |   let delay = initialDelay;
280 |   for (let i = 0; i < maxRetries; i++) {
281 |     try {
282 |       const response = await fetch(url);
283 |       if (!response.ok) {
284 |         // Handle 4XX/5XX errors
285 |         if (response.status >= 400 && response.status < 500 && response.status !== 429) {
286 |           // Client errors (e.g., bad request, unauthorized) should not be retried
287 |           throw new Error(`API Error: ${response.status} ${response.statusText}`);
288 |         }
289 |         // Server errors or rate limits (429) should be retried
290 |         throw new Error(`Transient API Error: ${response.status} ${response.statusText}`);
291 |       }
292 |       return await response.json();
293 |     } catch (error) {
294 |       console.warn(`Attempt ${i + 1} failed: ${error.message}. Retrying in ${delay / 1000}s...`);
295 |       if (i === maxRetries - 1) throw error; // Re-throw after last retry
296 |       await new Promise((resolve) => setTimeout(resolve, delay));
297 |       delay *= 2; // Exponential increase
298 |     }
299 |   }
300 | }
301 | 
302 | // Example usage for a Geocoding API call (server-side recommended for API keys)
303 | async function geocodeAddress(address) {
304 |   const encodedAddress = encodeURIComponent(address);
305 |   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_SERVER_API_KEY}`;
306 |   try {
307 |     const data = await fetchWithExponentialBackoff(url);
308 |     if (data.status === "OK") {
309 |       return data.results[0].geometry.location;
310 |     } else {
311 |       throw new Error(
312 |         `Geocoding failed: ${data.status} - ${data.error_message || "Unknown error"}`
313 |       );
314 |     }
315 |   } catch (error) {
316 |     console.error("Final Geocoding error:", error);
317 |     // Notify user or log for investigation
318 |   }
319 | }
320 | ```
321 | 
322 | ### 6.1 URL Encoding
323 | 
324 | Always URL-encode parameters for web service requests, especially before signing if applicable.
325 | 
326 | ```javascript
327 | // ❌ BAD: Unencoded parameters can break requests or lead to incorrect results
328 | const address = "5th&Main St.";
329 | const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=...`;
330 | 
331 | // ✅ GOOD: Properly encoded parameters
332 | const address = "5th&Main St.";
333 | const encodedAddress = encodeURIComponent(address); // "5th%26Main%20St."
334 | const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=...`;
335 | ```
336 | 
337 | ## 7. Common Pitfalls and Gotchas
338 | 
339 | ### 7.1 Map ID Usage
340 | 
341 | Always use a Map ID when initializing a map. This enables cloud-based map styling and future features.
342 | 
343 | ```javascript
344 | // ❌
345 | ```

</file_content>

<file_content path=".bob/rules/ibm-clouds-rules.md">
  1 | ---
  2 | name: ibm-cloud
  3 | description: Provides comprehensive IBM Cloud platform guidance including compute services (VPC, Virtual Servers, IKS, OpenShift, Code Engine, Cloud Functions), storage (Object Storage, Block Storage, File Storage), databases (Db2, Cloudant, PostgreSQL, MySQL, MongoDB, Redis), IAM security (access groups, service IDs, Key Protect, Secrets Manager), networking (VPC, load balancers, Direct Link), CLI automation, Terraform/Schematics infrastructure as code, monitoring, and cost optimization. Covers infrastructure provisioning, application deployment, security configuration, multi-zone high availability, and operational best practices. Use when working with IBM Cloud services, deploying cloud infrastructure, managing cloud resources, configuring security and networking, or when users mention "IBM Cloud", "IKS", "Code Engine", "Db2", "Cloudant", "VPC", "cloud provisioning", "IBM Kubernetes", "OpenShift", "Terraform IBM", "Schematics", or "IBM cloud platform".
  4 | ---
  5 | 
  6 | # IBM Cloud
  7 | 
  8 | Systematic IBM Cloud platform guidance for enterprise cloud infrastructure, covering compute, storage, databases, networking, security, and operational best practices.
  9 | 
 10 | ## Workflow Decision Tree
 11 | 
 12 | Choose your path based on the task:
 13 | 
 14 | ## 1. Service Category Selection
 15 | 
 16 | **Compute & Containers** → Load [compute-services.md](references/compute-services.md)
 17 | 
 18 | - Virtual Private Cloud (VPC) and Virtual Server Instances
 19 | - IBM Kubernetes Service (IKS) and Red Hat OpenShift
 20 | - Code Engine (serverless containers) and Cloud Functions
 21 | 
 22 | **Storage** → Load [storage-services.md](references/storage-services.md)
 23 | 
 24 | - Cloud Object Storage, Block Storage, File Storage
 25 | 
 26 | **Databases** → Load [database-services.md](references/database-services.md)
 27 | 
 28 | - Db2, Cloudant, PostgreSQL, MySQL, MongoDB, Redis
 29 | 
 30 | **Security & Access** → Load [iam-security.md](references/iam-security.md)
 31 | 
 32 | - IAM, Resource Groups, Service IDs, Key Protect, Secrets Manager
 33 | 
 34 | **Networking** → Load [networking.md](references/networking.md)
 35 | 
 36 | - VPC Networks, Load Balancers, DNS/CDN, Direct Link
 37 | 
 38 | ### 2. Architecture & Deployment Patterns
 39 | 
 40 | **High Availability** → Multi-zone deployment across 3 availability zones
 41 | **Microservices** → IKS/OpenShift with service mesh and ingress
 42 | **Serverless** → Code Engine applications with auto-scaling
 43 | **Hybrid Cloud** → Direct Link or VPN for on-premises connectivity
 44 | 
 45 | ### 3. Common Operations
 46 | 
 47 | **Initial Setup** → Install CLI, authenticate, configure regions and resource groups
 48 | **Resource Provisioning** → Use CLI, Terraform, or IBM Cloud Console
 49 | **Security Configuration** → IAM policies, encryption, network security
 50 | **Monitoring** → Set up logging, monitoring, and cost tracking
 51 | 
 52 | ## Core Concepts
 53 | 
 54 | ### Resource Hierarchy
 55 | 
 56 | ```
 57 | Account → Resource Groups → Services/Resources → Access Groups (IAM)
 58 | ```
 59 | 
 60 | ### Regions and Multi-Zone Architecture
 61 | 
 62 | - **Primary Regions**: `us-south`, `us-east`, `eu-gb`, `eu-de`, `jp-tok`, `au-syd`
 63 | - **Availability Zones**: 3 zones per region (e.g., `us-south-1`, `us-south-2`, `us-south-3`)
 64 | - **Best Practice**: Deploy across multiple zones for high availability
 65 | 
 66 | ### Service Categories
 67 | 
 68 | - **IaaS**: VPC, Virtual Servers, Block/File Storage
 69 | - **PaaS**: IKS, OpenShift, Code Engine
 70 | - **SaaS**: Managed Databases, Watson AI, DevOps Tools
 71 | - **Serverless**: Code Engine, Cloud Functions
 72 | 
 73 | ## Quick Start
 74 | 
 75 | ### 1. Install and Configure CLI
 76 | 
 77 | ```bash
 78 | # Install CLI (macOS/Linux)
 79 | curl -fsSL https://clis.cloud.ibm.com/install/osx | sh
 80 | 
 81 | # Login
 82 | ibmcloud login
 83 | 
 84 | # Target region and resource group
 85 | ibmcloud target -r us-south -g my-resource-group
 86 | 
 87 | # Install common plugins
 88 | ibmcloud plugin install container-service vpc-infrastructure
 89 | ```
 90 | 
 91 | ### 2. Basic Resource Creation Pattern
 92 | 
 93 | ```bash
 94 | # 1. Create VPC
 95 | ibmcloud is vpc-create my-vpc
 96 | 
 97 | # 2. Create resources (compute, storage, network)
 98 | ibmcloud is instance-create my-vsi ...
 99 | 
100 | # 3. Configure IAM
101 | ibmcloud iam ...
102 | 
103 | # 4. Deploy application
104 | # 5. Set up monitoring
105 | ```
106 | 
107 | ## Essential Guidance
108 | 
109 | ### Security Best Practices
110 | 
111 | 1. **IAM**: Use Access Groups, apply least privilege, rotate API keys every 90 days
112 | 2. **Network**: Use private endpoints, configure Security Groups and ACLs
113 | 3. **Data**: Enable encryption at rest/transit, use Key Protect for key management
114 | 4. **Compliance**: Choose regions for data residency requirements
115 | 
116 | ### Cost Optimization
117 | 
118 | - Right-size instances for workload requirements
119 | - Use reserved capacity for predictable workloads
120 | - Leverage serverless (Code Engine/Functions) for variable loads
121 | - Select appropriate storage tiers (Standard, Vault, Cold Vault)
122 | - Enable auto-scaling to match demand
123 | - Set budget alerts and monitor usage
124 | 
125 | ### Reference Files
126 | 
127 | Load detailed guidance based on specific needs:
128 | 
129 | - **[compute-services.md](references/compute-services.md)**: VPC, Virtual Servers, IKS, OpenShift, Code Engine, Cloud Functions
130 | - **[storage-services.md](references/storage-services.md)**: Object Storage, Block Storage, File Storage
131 | - **[database-services.md](references/database-services.md)**: Db2, Cloudant, PostgreSQL, MySQL, MongoDB, Redis
132 | - **[iam-security.md](references/iam-security.md)**: IAM, Access Groups, Service IDs, Key Protect, Secrets Manager
133 | - **[networking.md](references/networking.md)**: VPC networking, Load Balancers, DNS/CDN, Direct Link
134 | 
135 | ## Support Resources
136 | 
137 | - Documentation: <https://cloud.ibm.com/docs>
138 | - API Reference: <https://cloud.ibm.com/apidocs>
139 | - Terraform Provider: <https://registry.terraform.io/providers/IBM-Cloud/ibm>
140 | - CLI Reference: <https://cloud.ibm.com/docs/cli>

</file_content>

<file_content path=".bob/rules/nextjs-rules.md">
  1 | ---
  2 | description: This guide defines definitive best practices for Next.js applications, focusing on the `app` directory, Server Components, performance, and maintainability. Follow these rules to build robust, scalable, and performant Next.js projects.
  3 | globs: **/*.{js,jsx,ts,tsx}
  4 | ---
  5 | 
  6 | # next-js Best Practices
  7 | 
  8 | This document outlines the definitive best practices for developing Next.js applications. Adhering to these guidelines ensures consistent, performant, and maintainable code, leveraging Next.js's strengths for modern web development.
  9 | 
 10 | ## 1. Code Organization and Structure
 11 | 
 12 | Always use the `app/` directory for new projects. Organize code by feature, not by type, to improve discoverability and cohesion.
 13 | 
 14 | ### ✅ GOOD: Feature-Driven `app/` Directory
 15 | 
 16 | Group all related files for a feature (components, pages, layouts, hooks, types) within a single directory.
 17 | 
 18 | ```tsx
 19 | // app/dashboard/page.tsx
 20 | export default function DashboardPage() {
 21 |   /* ... */
 22 | }
 23 | 
 24 | // app/dashboard/layout.tsx
 25 | export default function DashboardLayout({ children }) {
 26 |   /* ... */
 27 | }
 28 | 
 29 | // app/dashboard/components/DashboardOverview.tsx
 30 | export function DashboardOverview() {
 31 |   /* ... */
 32 | }
 33 | 
 34 | // app/dashboard/hooks/useDashboardData.ts
 35 | export function useDashboardData() {
 36 |   /* ... */
 37 | }
 38 | ```
 39 | 
 40 | ### ❌ BAD: Type-Driven `app/` Directory
 41 | 
 42 | Avoid scattering files of the same feature across different top-level type directories.
 43 | 
 44 | ```tsx
 45 | // app/dashboard/page.tsx
 46 | // components/dashboard/DashboardOverview.tsx // Separated
 47 | // hooks/useDashboardData.ts // Separated
 48 | ```
 49 | 
 50 | ### Core Directories
 51 | 
 52 | - **`app/`**: All route-related files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
 53 | - **`components/`**: Reusable UI components that are _not_ directly tied to a specific route.
 54 | - **`lib/`**: Backend-agnostic utility functions, data access layers, and third-party integrations.
 55 | - **`hooks/`**: Custom React hooks for reusable logic.
 56 | - **`types/`**: Global TypeScript type definitions and interfaces.
 57 | - **`public/`**: Static assets (images, fonts) that are served directly.
 58 | 
 59 | ## 2. Component Architecture: Server Components First
 60 | 
 61 | Prioritize Server Components for all UI rendering. Use Client Components only when interactivity (state, effects, event handlers) is strictly required.
 62 | 
 63 | ### ✅ GOOD: Server Component by Default
 64 | 
 65 | Server Components reduce client-side JavaScript bundles, improve initial page load, and enhance security by keeping sensitive logic on the server.
 66 | 
 67 | ```tsx
 68 | // app/products/[id]/page.tsx (Server Component by default)
 69 | import { getProductDetails } from "@/lib/api";
 70 | 
 71 | export default async function ProductPage({ params }) {
 72 |   const product = await getProductDetails(params.id);
 73 |   return (
 74 |     <div>
 75 |       <h1>{product.name}</h1>
 76 |       {/* ... more server-rendered UI */}
 77 |       <AddToCartButton productId={product.id} /> {/* Client Component */}
 78 |     </div>
 79 |   );
 80 | }
 81 | ```
 82 | 
 83 | ### ✅ GOOD: "use client" Boundary as Low as Possible
 84 | 
 85 | Place the `"use client"` directive at the lowest possible point in your component tree. This ensures that only the interactive parts are client-rendered, keeping parent components as Server Components.
 86 | 
 87 | ```tsx
 88 | // components/AddToCartButton.tsx
 89 | "use client"; // Only this component and its children are client-side
 90 | 
 91 | import { useState } from "react";
 92 | 
 93 | export function AddToCartButton({ productId }) {
 94 |   const [quantity, setQuantity] = useState(1);
 95 |   // ... interactive logic
 96 |   return <button onClick={() => alert(`Added ${quantity} of ${productId}`)}>Add to Cart</button>;
 97 | }
 98 | ```
 99 | 
100 | ### ❌ BAD: Overuse of "use client"
101 | 
102 | Don't mark entire feature folders or layouts as client components if only a small part needs interactivity. This unnecessarily increases client bundle size.
103 | 
104 | ```tsx
105 | // app/products/[id]/page.tsx (BAD: entire page marked client)
106 | "use client"; // This makes the whole page a client component
107 | import { useState, useEffect } from "react"; // Even if only a small part needs it
108 | 
109 | export default function ProductPage({ params }) {
110 |   // ...
111 |   return <button>Add to Cart</button>;
112 | }
113 | ```
114 | 
115 | ## 3. Data Fetching
116 | 
117 | Fetch data directly in Server Components using `fetch` or a dedicated data access layer. Use Route Handlers for client-side mutations or when exposing a specific API endpoint.
118 | 
119 | ### ✅ GOOD: Server Component Data Fetching
120 | 
121 | Directly fetch data in Server Components. `fetch` requests are automatically memoized and cached by Next.js.
122 | 
123 | ```tsx
124 | // app/dashboard/page.tsx
125 | import { getUserProfile, getRecentOrders } from "@/lib/api";
126 | 
127 | export default async function DashboardPage() {
128 |   // Data fetches in parallel
129 |   const [user, orders] = await Promise.all([getUserProfile(), getRecentOrders()]);
130 | 
131 |   return (
132 |     <div>
133 |       <h2>Welcome, {user.name}</h2>
134 |       <OrderList orders={orders} />
135 |     </div>
136 |   );
137 | }
138 | ```
139 | 
140 | ### ✅ GOOD: Route Handlers for Client-Side Mutations
141 | 
142 | Use `route.ts` for API endpoints that handle client-side data mutations (e.g., form submissions, API calls from client components).
143 | 
144 | ```tsx
145 | // app/api/cart/route.ts
146 | import { NextResponse } from "next/server";
147 | import { addToCart } from "@/lib/cart";
148 | 
149 | export async function POST(request: Request) {
150 |   const { productId, quantity } = await request.json();
151 |   await addToCart(productId, quantity);
152 |   return NextResponse.json({ success: true });
153 | }
154 | ```
155 | 
156 | ### ✅ GOOD: Streaming with `loading.tsx` and `Suspense`
157 | 
158 | Improve perceived performance by showing instant loading states for slow data fetches.
159 | 
160 | ```tsx
161 | // app/dashboard/loading.tsx
162 | export default function Loading() {
163 |   return <div>Loading dashboard...</div>;
164 | }
165 | 
166 | // app/dashboard/page.tsx (assuming some slow component)
167 | import { Suspense } from "react";
168 | import { SlowComponent } from "./components/SlowComponent";
169 | 
170 | export default async function DashboardPage() {
171 |   return (
172 |     <main>
173 |       <h1>Dashboard</h1>
174 |       <Suspense fallback={<div>Loading slow data...</div>}>
175 |         <SlowComponent />
176 |       </Suspense>
177 |     </main>
178 |   );
179 | }
180 | ```
181 | 
182 | ## 4. Performance Considerations
183 | 
184 | Leverage Next.js's built-in optimizations for images, fonts, and code splitting.
185 | 
186 | ### ✅ GOOD: `next/image` for Images
187 | 
188 | Always use `next/image` for local and remote images. It provides automatic optimization, lazy loading, and responsive sizing.
189 | 
190 | ```tsx
191 | import Image from "next/image";
192 | import profilePic from "@/public/profile.jpg";
193 | 
194 | export function UserAvatar() {
195 |   return <Image src={profilePic} alt="User Profile" width={100} height={100} placeholder="blur" />;
196 | }
197 | ```
198 | 
199 | ### ❌ BAD: Native `<img>` Tag
200 | 
201 | Avoid the native `<img>` tag as it bypasses Next.js's image optimizations.
202 | 
203 | ```tsx
204 | // ❌ BAD
205 | export function UserAvatar() {
206 |   return <img src="/profile.jpg" alt="User Profile" width="100" height="100" />;
207 | }
208 | ```
209 | 
210 | ### ✅ GOOD: `next/font` for Fonts
211 | 
212 | Use `next/font` to optimize font loading, eliminate external network requests, and prevent layout shift.
213 | 
214 | ```tsx
215 | import { Inter } from "next/font/google";
216 | 
217 | const inter = Inter({ subsets: ["latin"] });
218 | 
219 | export default function RootLayout({ children }) {
220 |   return (
221 |     <html lang="en" className={inter.className}>
222 |       <body>{children}</body>
223 |     </html>
224 |   );
225 | }
226 | ```
227 | 
228 | ### ✅ GOOD: Dynamic Imports for Heavy Components
229 | 
230 | Lazily load heavy client-side components or third-party libraries using `next/dynamic`.
231 | 
232 | ```tsx
233 | import dynamic from "next/dynamic";
234 | 
235 | const HeavyChart = dynamic(() => import("./components/HeavyChart"), {
236 |   loading: () => <p>Loading chart...</p>,
237 |   ssr: false, // Only load on client if not needed for initial render
238 | });
239 | 
240 | export function DashboardCharts() {
241 |   return (
242 |     <div>
243 |       <HeavyChart />
244 |     </div>
245 |   );
246 | }
247 | ```
248 | 
249 | ## 5. State Management
250 | 
251 | Keep state local where possible. For global state, use React Context for simple cases or lightweight libraries like Zustand/Jotai for more complex needs.
252 | 
253 | ### ✅ GOOD: Local State with `useState`
254 | 
255 | For component-specific, ephemeral state.
256 | 
257 | ```tsx
258 | "use client";
259 | import { useState } from "react";
260 | 
261 | export function Counter() {
262 |   const [count, setCount] = useState(0);
263 |   return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
264 | }
265 | ```
266 | 
267 | ### ✅ GOOD: Global State with Context or Zustand/Jotai
268 | 
269 | For application-wide state that needs to be shared across many components. Prefer Zustand or Jotai over Redux for most Next.js projects due to their simplicity and performance.
270 | 
271 | ```tsx
272 | // lib/store.ts (using Zustand)
273 | import { create } from "zustand";
274 | 
275 | interface BearState {
276 |   bears: number;
277 |   increasePopulation: () => void;
278 | }
279 | 
280 | export const useBearStore = create<BearState>((set) => ({
281 |   bears: 0,
282 |   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
283 | }));
284 | ```
285 | 
286 | ## 6. Error Handling
287 | 
288 | Implement robust error handling using Next.js's dedicated error files.
289 | 
290 | ### ✅ GOOD: Route-Level `error.tsx`
291 | 
292 | Catch errors within a specific route segment, providing localized fallback UI.
293 | 
294 | ```tsx
295 | // app/dashboard/error.tsx
296 | "use client"; // Error boundaries must be client components
297 | 
298 | import { useEffect } from "react";
299 | 
300 | export default function Error({ error, reset }) {
301 |   useEffect(() => {
302 |     console.error(error); // Log the error to an error reporting service
303 |   }, [error]);
304 | 
305 |   return (
306 |     <div>
307 |       <h2>Something went wrong in the dashboard!</h2>
308 |       <button onClick={() => reset()}>Try again</button>
309 |     </div>
310 |   );
311 | }
312 | ```
313 | 
314 | ### ✅ GOOD: Global `global-error.tsx`
315 | 
316 | Catch uncaught errors across your entire application, providing a consistent fallback.
317 | 
318 | ```tsx
319 | // app/global-error.tsx
320 | "use client";
321 | 
322 | export default function GlobalError({ error, reset }) {
323 |   return (
324 |     <html>
325 |       <body>
326 |         <h2>Something went wrong globally!</h2>
327 |         <button onClick={() => reset()}>Try again</button>
328 |       </body>
329 |     </html>
330 |   );
331 | }
332 | ```
333 | 
334 | ### ✅ GOOD: `not-found.tsx` for 404s
335 | 
336 | Create a custom 404 page for unmatched routes.
337 | 
338 | ```tsx
339 | // app/not-found.tsx
340 | export default function NotFound() {
341 |   return (
342 |     <div>
343 |       <h1>404 - Page Not Found</h1>
344 |       <p>The page you are looking for does not exist.</p>
345 |     </div>
346 |   );
347 | }
348 | ```
349 | 
350 | ## 7. ESLint and Type Checking
351 | 
352 | Enforce code quality and catch common issues early with ESLint and TypeScript.
353 | 
354 | ### ✅ GOOD: Use `eslint-config-next/core-web-vitals`
355 | 
356 | This configuration elevates performance-related warnings to errors, ensuring your application meets Core Web Vitals standards. Always combine with `eslint-config-next/typescript` for TypeScript projects.
357 | 
358 | ```javascript
359 | // eslint.config.mjs
360 | import { defineConfig, globalIgnores } from "eslint/config";
361 | import nextVitals from "eslint-config-next/core-web-vitals";
362 | import nextTs from "eslint-config-next/typescript"; // For TypeScript projects
363 | 
364 | const eslintConfig = defineConfig([
365 |   ...nextVitals,
366 |   ...nextTs, // Include for TypeScript
367 |   {
368 |     rules: {
369 |       // Custom overrides or additional rules here
370 |       "@next/next/no-img-element": "error", // Enforce next/image
371 |       // ...
372 |     },
373 |   },
374 |   globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
375 | ]);
376 | 
377 | export default eslintConfig;
378 | ```
379 | 
380 | ## 8. Common Pitfalls and Anti-patterns
381 | 
382 | Avoid these common mistakes to maintain a high-quality Next.js application.
383 | 
384 | ### ❌ BAD: Using `<a>` for Internal Navigation
385 | 
386 | This bypasses Next.js's automatic prefetching and client-side navigation.
387 | 
388 | ```tsx
389 | // ❌ BAD
390 | <a href="/dashboard">Go to Dashboard</a>
391 | ```
392 | 
393 | ### ✅ GOOD: Use `<Link>` for Internal Navigation
394 | 
395 | Enables client-side navigation and prefetching for a smoother user experience.
396 | 
397 | ```tsx
398 | import Link from "next/link";
399 | 
400 | // ✅ GOOD
401 | <Link href="/dashboard">Go to Dashboard</Link>;
402 | ```
403 | 
404 | ### ❌ BAD: Async Client Components
405 | 
406 | Client Components cannot be `async`. If you need to fetch data on the client, use `useEffect` or a client-side data fetching library.
407 | 
408 | ```tsx
409 | // components/MyClientComponent.tsx
410 | "use client";
411 | 
412 | // ❌ BAD: Client Components cannot be async
413 | export default async function MyClientComponent() {
414 |   // const data = await fetch('/api/data');
415 |   return <div>Client UI</div>;
416 | }
417 | ```
418 | 
419 | ### ✅ GOOD: Client-Side Data Fetching in Client Components
420 | 
421 | Use `useEffect` or a dedicated client-side library (like SWR or React Query) for data fetching in Client Components.
422 | 
423 | ```tsx
424 | // components/MyClientComponent.tsx
425 | "use client";
426 | import { useState, useEffect } from "react";
427 | 
428 | export default function MyClientComponent() {
429 |   const [data, setData] = useState(null);
430 | 
431 |   useEffect(() => {
432 |     async function fetchData() {
433 |       const res = await fetch("/api/data");
434 |       const json = await res.json();
435 |       setData(json);
436 |     }
437 |     fetchData();
438 |   }, []);
439 | 
440 |   return <div>{data ? `Data: ${data.message}` : "Loading..."}</div>;
441 | }
442 | ```

</file_content>

<file_content path=".bob/rules/playwright-rules.md">
  1 | ---
  2 | description: Definitive guidelines for writing robust, maintainable, and high-quality end-to-end tests with Playwright in TypeScript.
  3 | globs: **/*.{js,ts}
  4 | ---
  5 | 
  6 | # Playwright Best Practices
  7 | 
  8 | Playwright is the gold standard for reliable E2E testing. These rules ensure your tests are fast, stable, and easy to maintain, aligning with modern 2025 development standards for reliability, quality, and structure.
  9 | 
 10 | ## 1. Always Use `@playwright/test`
 11 | 
 12 | Leverage the official test runner for built-in fixtures, isolation, and web-first assertions. Avoid the low-level `playwright` library for E2E tests.
 13 | 
 14 | ❌ BAD: Using `playwright` directly
 15 | 
 16 | ```typescript
 17 | import { chromium } from "playwright";
 18 | // ... manual browser/context setup and teardown
 19 | const browser = await chromium.launch();
 20 | const page = await browser.newPage();
 21 | // ...
 22 | await browser.close();
 23 | ```
 24 | 
 25 | ✅ GOOD: Using `@playwright/test`
 26 | 
 27 | ```typescript
 28 | import { test, expect } from "@playwright/test";
 29 | test("should navigate to home", async ({ page }) => {
 30 |   await page.goto("/");
 31 |   await expect(page).toHaveTitle(/Home/);
 32 | });
 33 | ```
 34 | 
 35 | ## 2. Prioritize Robust Locators
 36 | 
 37 | Use Playwright's built-in Locators API, favoring user-facing attributes over brittle CSS selectors. This drastically improves test stability.
 38 | 
 39 | ❌ BAD: Fragile, implementation-dependent selectors
 40 | 
 41 | ```typescript
 42 | await page.locator("div.container > ul > li:nth-child(2) > button").click();
 43 | ```
 44 | 
 45 | ✅ GOOD: Semantic, user-facing locators
 46 | 
 47 | ```typescript
 48 | await page.getByRole("button", { name: "Add to Cart" }).click();
 49 | await page.getByLabel("Username").fill("testuser");
 50 | await page.getByTestId("product-item-123").click();
 51 | ```
 52 | 
 53 | ## 3. Embrace Web-First Assertions
 54 | 
 55 | Playwright's `expect` assertions automatically retry until conditions are met, eliminating manual waits and flakiness. Never use `page.waitForTimeout()`.
 56 | 
 57 | ❌ BAD: Manual, flaky waits and generic assertions
 58 | 
 59 | ```typescript
 60 | await page.waitForTimeout(2000); // 🚨 Flaky!
 61 | const title = await page.title();
 62 | assert.equal(title, "My Page"); // 🚨 Not web-first
 63 | ```
 64 | 
 65 | ✅ GOOD: Reliable, auto-retrying assertions
 66 | 
 67 | ```typescript
 68 | await expect(page).toHaveTitle(/My Page/);
 69 | await expect(page.getByText("Welcome")).toBeVisible();
 70 | await expect(page.getByRole("checkbox")).toBeChecked();
 71 | ```
 72 | 
 73 | ## 4. Implement the Page Object Model (POM)
 74 | 
 75 | Encapsulate selectors and actions within dedicated classes. This improves readability, reusability, and maintainability.
 76 | 
 77 | ❌ BAD: Repeated selectors and logic across tests
 78 | 
 79 | ```typescript
 80 | // test-login.spec.ts
 81 | await page.getByLabel("Username").fill("user");
 82 | await page.getByLabel("Password").fill("pass");
 83 | await page.getByRole("button", { name: "Login" }).click();
 84 | 
 85 | // test-profile.spec.ts
 86 | // ... same login steps repeated ...
 87 | ```
 88 | 
 89 | ✅ GOOD: Centralized Page Object
 90 | 
 91 | ```typescript
 92 | // pages/LoginPage.ts
 93 | import { Page, Locator } from "@playwright/test";
 94 | 
 95 | export class LoginPage {
 96 |   readonly page: Page;
 97 |   readonly usernameInput: Locator;
 98 |   readonly passwordInput: Locator;
 99 |   readonly loginButton: Locator;
100 | 
101 |   constructor(page: Page) {
102 |     this.page = page;
103 |     this.usernameInput = page.getByLabel("Username");
104 |     this.passwordInput = page.getByLabel("Password");
105 |     this.loginButton = page.getByRole("button", { name: "Login" });
106 |   }
107 | 
108 |   async navigate() {
109 |     await this.page.goto("/login");
110 |   }
111 | 
112 |   async login(username: string, password: string) {
113 |     await this.usernameInput.fill(username);
114 |     await this.passwordInput.fill(password);
115 |     await this.loginButton.click();
116 |   }
117 | }
118 | 
119 | // tests/login.spec.ts
120 | import { test, expect } from "@playwright/test";
121 | import { LoginPage } from "../pages/LoginPage";
122 | 
123 | test("should successfully log in", async ({ page }) => {
124 |   const loginPage = new LoginPage(page);
125 |   await loginPage.navigate();
126 |   await loginPage.login("testuser", "password");
127 |   await expect(page).toHaveURL(/dashboard/);
128 | });
129 | ```
130 | 
131 | ## 5. Optimize Performance with Auth State & Route Blocking
132 | 
133 | Reduce test execution time by reusing authenticated sessions and blocking unnecessary network requests.
134 | 
135 | ❌ BAD: Logging in for every test and loading all assets
136 | 
137 | ```typescript
138 | test("view profile", async ({ page }) => {
139 |   await page.goto("/login");
140 |   await page.getByLabel("Username").fill("user");
141 |   await page.getByLabel("Password").fill("pass");
142 |   await page.getByRole("button", { name: "Login" }).click();
143 |   await page.goto("/profile"); // Loads all images, analytics, etc.
144 | });
145 | ```
146 | 
147 | ✅ GOOD: Reusing auth state and blocking requests
148 | 
149 | ```typescript
150 | // playwright.config.ts
151 | import { defineConfig } from "@playwright/test";
152 | export default defineConfig({
153 |   use: {
154 |     storageState: "playwright-auth.json", // Path to save/load auth state
155 |   },
156 | });
157 | 
158 | // global-setup.ts (run once before all tests)
159 | import { chromium, expect } from "@playwright/test";
160 | export default async function globalSetup() {
161 |   const browser = await chromium.launch();
162 |   const page = await browser.newPage();
163 |   await page.goto("/login");
164 |   await page.getByLabel("Username").fill("testuser");
165 |   await page.getByLabel("Password").fill("password");
166 |   await page.getByRole("button", { name: "Login" }).click();
167 |   await expect(page).toHaveURL(/dashboard/);
168 |   await page.context().storageState({ path: "playwright-auth.json" });
169 |   await browser.close();
170 | }
171 | 
172 | // tests/profile.spec.ts
173 | import { test, expect } from "@playwright/test";
174 | test("should display user profile", async ({ page, context }) => {
175 |   // Block unnecessary resources for faster tests
176 |   await context.route("**/*.{png,jpg,jpeg,gif,webp,svg,css}", (route) => route.abort());
177 |   await page.goto("/profile"); // Automatically uses saved auth state
178 |   await expect(page.getByText("Welcome, testuser!")).toBeVisible();
179 | });
180 | ```
181 | 
182 | ## 6. Mock APIs for Deterministic Tests
183 | 
184 | Isolate your UI tests from backend flakiness by intercepting and mocking API responses.
185 | 
186 | ❌ BAD: Relying on a live, potentially unstable backend
187 | 
188 | ```typescript
189 | test("display products", async ({ page }) => {
190 |   await page.goto("/products"); // Fetches from real API
191 |   await expect(page.getByText("Product A")).toBeVisible();
192 | });
193 | ```
194 | 
195 | ✅ GOOD: Mocking API responses
196 | 
197 | ```typescript
198 | test("display mocked products", async ({ page }) => {
199 |   await page.route("**/api/products", (route) => {
200 |     route.fulfill({
201 |       status: 200,
202 |       contentType: "application/json",
203 |       body: JSON.stringify([{ id: 1, name: "Mock Product" }]),
204 |     });
205 |   });
206 |   await page.goto("/products");
207 |   await expect(page.getByText("Mock Product")).toBeVisible();
208 | });
209 | ```
210 | 
211 | ## 7. Leverage CI/CD Features for Debugging
212 | 
213 | Configure tracing, screenshots, and video recording in your `playwright.config.ts` to instantly diagnose failures in CI.
214 | 
215 | ```typescript
216 | // playwright.config.ts
217 | import { defineConfig } from "@playwright/test";
218 | export default defineConfig({
219 |   reporter: [["html"], ["list"]],
220 |   use: {
221 |     trace: "on-first-retry", // Record trace only on first retry
222 |     screenshot: "on", // Always take a screenshot on failure
223 |     video: "on-first-retry", // Record video on first retry
224 |   },
225 | });
226 | ```
227 | 
228 | ## 8. Maintain Code Quality with Linters & Formatters
229 | 
230 | Integrate ESLint (with Playwright plugin) and Prettier into your workflow via pre-commit hooks to enforce consistent code style and catch errors early.
231 | 
232 | ```json
233 | // package.json (example scripts)
234 | {
235 |   "scripts": {
236 |     "lint": "eslint . --ext .ts",
237 |     "format": "prettier --write .",
238 |     "test:e2e": "playwright test"
239 |   },
240 |   "devDependencies": {
241 |     "@playwright/test": "^1.x.x",
242 |     "@typescript-eslint/eslint-plugin": "^7.x.x",
243 |     "@typescript-eslint/parser": "^7.x.x",
244 |     "eslint": "^8.x.x",
245 |     "eslint-plugin-playwright": "^1.x.x",
246 |     "prettier": "^3.x.x",
247 |     "husky": "^9.x.x",
248 |     "lint-staged": "^15.x.x"
249 |   }
250 | }
251 | ```
252 | 
253 | ```javascript
254 | // .eslintrc.js
255 | module.exports = {
256 |   root: true,
257 |   parser: "@typescript-eslint/parser",
258 |   plugins: ["@typescript-eslint", "playwright"],
259 |   extends: [
260 |     "eslint:recommended",
261 |     "plugin:@typescript-eslint/recommended",
262 |     "plugin:playwright/recommended",
263 |   ],
264 |   rules: {
265 |     // Add custom rules or override defaults here
266 |   },
267 |   env: {
268 |     node: true,
269 |     browser: true,
270 |   },
271 | };
272 | ```
273 | 
274 | ```json
275 | // .prettierrc
276 | {
277 |   "singleQuote": true,
278 |   "semi": true,
279 |   "trailingComma": "all"
280 | }
281 | ```
282 | 
283 | ```json
284 | // .husky/pre-commit
285 | #!/usr/bin/env sh
286 | . "$(dirname -- "$0")/_/husky.sh"
287 | 
288 | npx lint-staged
289 | ```
290 | 
291 | ```json
292 | // .lintstagedrc.js
293 | module.exports = {
294 |   '*.{ts,js}': ['eslint --fix', 'prettier --write'],
295 | };
296 | ```

</file_content>

<file_content path=".bob/rules/react-rules.md">
  1 | ---
  2 | description: Definitive guidelines for writing idiomatic, maintainable, and performant React applications using modern best practices and TypeScript.
  3 | globs: **/*.{jsx,tsx}
  4 | ---
  5 | 
  6 | # react Best Practices
  7 | 
  8 | This guide outlines the non-negotiable standards for building React applications within our team. Adherence ensures predictable behavior, simplifies debugging, and enables future optimizations.
  9 | 
 10 | ## 1. Core React Principles: Purity & Rules of Hooks
 11 | 
 12 | Components and Hooks **must be pure**. They should always return the same output given the same inputs (props, state, context) and not cause side effects during rendering. Obey the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) without exception.
 13 | 
 14 | ### ❌ BAD: Impure component / Side effect in render
 15 | 
 16 | ```tsx
 17 | function ProductList({ products }) {
 18 |   // ❌ Modifies external data during render
 19 |   products.sort((a, b) => a.name.localeCompare(b.name));
 20 |   return (/* ... */);
 21 | }
 22 | 
 23 | function MyComponent() {
 24 |   // ❌ Hook called conditionally
 25 |   if (Math.random() > 0.5) {
 26 |     const [count, setCount] = useState(0);
 27 |   }
 28 |   return (/* ... */);
 29 | }
 30 | ```
 31 | 
 32 | ### ✅ GOOD: Pure component / Correct Hook usage
 33 | 
 34 | ```tsx
 35 | import { useMemo, useState } from 'react';
 36 | 
 37 | function ProductList({ products }) {
 38 |   // ✅ Sort data immutably or memoize if expensive
 39 |   const sortedProducts = useMemo(() =>
 40 |     [...products].sort((a, b) => a.name.localeCompare(b.name)),
 41 |     [products]
 42 |   );
 43 |   return (/* ... */);
 44 | }
 45 | 
 46 | function MyComponent() {
 47 |   // ✅ Hooks always at the top level
 48 |   const [count, setCount] = useState(0);
 49 |   // ... conditional logic after hooks
 50 |   return (/* ... */);
 51 | }
 52 | ```
 53 | 
 54 | ## 2. Code Organization & Naming
 55 | 
 56 | Organize code by **feature** using the `bulletproof-react` pattern. Use TypeScript (`.tsx`) for all components.
 57 | 
 58 | - **One Component Per File**: Except for small, pure, stateless components closely related to a parent.
 59 | - **Naming**:
 60 |   - Components: `PascalCase` (e.g., `UserProfile.tsx`)
 61 |   - Custom Hooks: `use` prefix + `PascalCase` (e.g., `useAuth.ts`)
 62 |   - Functions/Variables: `camelCase`
 63 |   - CSS Classes: `kebab-case` (via CSS Modules or utility classes)
 64 | 
 65 | ### ✅ GOOD: Feature-based structure
 66 | 
 67 | ```
 68 | src/
 69 | ├── features/
 70 | │   ├── auth/
 71 | │   │   ├── components/
 72 | │   │   │   ├── LoginForm.tsx
 73 | │   │   │   └── AuthButton.tsx
 74 | │   │   ├── hooks/
 75 | │   │   │   └── useAuth.ts
 76 | │   │   └── api/auth.ts
 77 | │   └── products/
 78 | │       ├── components/
 79 | │       │   ├── ProductCard.tsx
 80 | │       │   └── ProductList.tsx
 81 | │       └── hooks/useProducts.ts
 82 | ├── components/ui/  // Reusable, generic UI components
 83 | │   ├── Button.tsx
 84 | │   └── Modal.tsx
 85 | └── App.tsx
 86 | ```
 87 | 
 88 | ## 3. Component Design & Patterns
 89 | 
 90 | Prioritize **function components with Hooks**. Separate concerns into "smart" (data/logic) and "dumb" (presentational) components.
 91 | 
 92 | ### ❌ BAD: Class components / Mixed concerns
 93 | 
 94 | ```tsx
 95 | // ❌ Class component (avoid)
 96 | class UserProfile extends React.Component { /* ... */ }
 97 | 
 98 | // ❌ Component fetches data AND renders complex UI
 99 | function ProductPage() {
100 |   const [products, setProducts] = useState([]);
101 |   useEffect(() => { /* fetch products */ }, []);
102 |   return (/* complex product list UI */);
103 | }
104 | ```
105 | 
106 | ### ✅ GOOD: Function components / Separation of concerns
107 | 
108 | ```tsx
109 | // ✅ Use function components with hooks
110 | function UserProfile({ user }) {
111 |   /* ... */
112 | }
113 | 
114 | // ✅ Smart component (container) handles data fetching
115 | function ProductListContainer() {
116 |   const { products, isLoading } = useProducts(); // Custom hook for data
117 |   if (isLoading) return <LoadingSpinner />;
118 |   return <ProductList products={products} />; // Renders dumb component
119 | }
120 | 
121 | // ✅ Dumb component (presentational) focuses on UI
122 | function ProductList({ products }) {
123 |   return (
124 |     <ul>
125 |       {products.map((product) => (
126 |         <ProductCard key={product.id} product={product} />
127 |       ))}
128 |     </ul>
129 |   );
130 | }
131 | ```
132 | 
133 | ## 4. State Management
134 | 
135 | Start with **local state (`useState`, `useReducer`)**. Lift state up when necessary. Use **Context API** for global state that rarely changes. For complex global state, use dedicated libraries (e.g., Zustand, Jotai, Redux Toolkit). **Avoid prop drilling.**
136 | 
137 | ### ❌ BAD: Prop drilling
138 | 
139 | ```tsx
140 | function Grandparent() {
141 |   const [theme, setTheme] = useState("dark");
142 |   return <Parent theme={theme} setTheme={setTheme} />;
143 | }
144 | function Parent({ theme, setTheme }) {
145 |   return <Child theme={theme} setTheme={setTheme} />;
146 | }
147 | function Child({ theme, setTheme }) {
148 |   return <Button onClick={() => setTheme("light")}>Toggle Theme</Button>;
149 | }
150 | ```
151 | 
152 | ### ✅ GOOD: Context API for global state
153 | 
154 | ```tsx
155 | import { createContext, useContext, useState, ReactNode } from "react";
156 | 
157 | type Theme = "light" | "dark";
158 | type ThemeContextType = { theme: Theme; toggleTheme: () => void };
159 | 
160 | const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
161 | 
162 | export function ThemeProvider({ children }: { children: ReactNode }) {
163 |   const [theme, setTheme] = useState<Theme>("dark");
164 |   const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
165 |   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
166 | }
167 | 
168 | export const useTheme = () => {
169 |   const context = useContext(ThemeContext);
170 |   if (context === undefined) {
171 |     throw new Error("useTheme must be used within a ThemeProvider");
172 |   }
173 |   return context;
174 | };
175 | 
176 | // Usage:
177 | function MyComponent() {
178 |   const { theme, toggleTheme } = useTheme();
179 |   return <button onClick={toggleTheme}>Current theme: {theme}</button>;
180 | }
181 | ```
182 | 
183 | ## 5. Performance & Optimization
184 | 
185 | Optimize only when profiling indicates a bottleneck. Use `React.memo`, `useCallback`, `useMemo` judiciously.
186 | 
187 | ### ❌ BAD: Premature optimization / Incorrect memoization
188 | 
189 | ```tsx
190 | // ❌ Memoizing a component that re-renders frequently or has no expensive props
191 | const MyButton = React.memo(({ onClick, children }) => (
192 |   <button onClick={onClick}>{children}</button>
193 | ));
194 | 
195 | // ❌ Callback with missing dependency, causing stale closure
196 | function Parent() {
197 |   const [count, setCount] = useState(0);
198 |   const handleClick = useCallback(() => {
199 |     console.log(count); // ❌ 'count' is stale if not in dependency array
200 |   }, []);
201 |   return <Child onClick={handleClick} />;
202 | }
203 | ```
204 | 
205 | ### ✅ GOOD: Targeted optimization / Correct dependencies
206 | 
207 | ```tsx
208 | import React, { useCallback, useMemo, useState } from 'react';
209 | 
210 | // ✅ Memoize only if component is expensive AND props are stable
211 | const ExpensiveList = React.memo(({ items }) => {
212 |   console.log('Rendering ExpensiveList');
213 |   return (/* ... render many items ... */);
214 | });
215 | 
216 | function Parent() {
217 |   const [count, setCount] = useState(0);
218 |   // ✅ Callback with correct dependencies
219 |   const handleClick = useCallback(() => {
220 |     setCount(prev => prev + 1); // Use functional update to avoid 'count' in deps
221 |   }, []);
222 | 
223 |   // ✅ Memoize expensive calculations
224 |   const computedValue = useMemo(() => {
225 |     // ... heavy computation based on count ...
226 |     return count * 2;
227 |   }, [count]);
228 | 
229 |   return (
230 |     <>
231 |       <ExpensiveList items={[{ id: 1, name: 'Item 1' }]} /> {/* Example usage */}
232 |       <Child onClick={handleClick} />
233 |       <p>Count: {count}, Computed: {computedValue}</p>
234 |     </>
235 |   );
236 | }
237 | // Child component that receives the memoized callback
238 | const Child = React.memo(({ onClick }: { onClick: () => void }) => {
239 |   console.log('Rendering Child');
240 |   return <button onClick={onClick}>Increment</button>;
241 | });
242 | ```
243 | 
244 | ## 6. Common Pitfalls
245 | 
246 | - **Never mutate props or state directly.** Always create new objects/arrays.
247 | - **Never call component functions directly.** Use JSX.
248 | - **Ensure `useEffect` cleanup functions are always provided** for subscriptions or timers.
249 | - **Correct `useEffect` dependency arrays** are critical to avoid infinite loops or stale closures.
250 | 
251 | ### ❌ BAD: Direct mutation / Calling component as function
252 | 
253 | ```tsx
254 | function MyComponent({ items }) {
255 |   // ❌ Mutating props directly
256 |   items.push("new item");
257 | 
258 |   const [data, setData] = useState({ value: 1 });
259 |   // ❌ Mutating state directly
260 |   data.value = 2;
261 |   setData(data);
262 | 
263 |   // ❌ Calling component as a function
264 |   return MyOtherComponent();
265 | }
266 | ```
267 | 
268 | ### ✅ GOOD: Immutable updates / JSX usage
269 | 
270 | ```tsx
271 | function MyComponent({ items }) {
272 |   const [data, setData] = useState({ value: 1 });
273 | 
274 |   // ✅ Create a new array for updates
275 |   const updatedItems = [...items, "new item"];
276 | 
277 |   // ✅ Create a new object for state updates
278 |   setData((prevData) => ({ ...prevData, value: 2 }));
279 | 
280 |   // ✅ Use JSX for components
281 |   return <MyOtherComponent />;
282 | }
283 | ```
284 | 
285 | ## 7. Accessibility (A11y) & Testing
286 | 
287 | Build for accessibility from the start. Test components as a user would.
288 | 
289 | - **Semantic HTML**: Use native HTML elements (`<button>`, `<input>`, `<a>`) whenever possible.
290 | - **ARIA Attributes**: Use `aria-*` attributes only when semantic HTML is insufficient.
291 | - **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible and have proper focus management.
292 | - **React Testing Library**: Use `RTL` to test component behavior, not implementation details.
293 | 
294 | ### ❌ BAD: Non-semantic HTML / Untestable implementation
295 | 
296 | ```tsx
297 | // ❌ Div acting as a button, missing keyboard interaction
298 | function MyButton() {
299 |   return <div onClick={() => alert("Clicked!")}>Click Me</div>;
300 | }
301 | 
302 | // ❌ Testing internal state or component instance (implementation detail)
303 | test("MyComponent sets count to 1", () => {
304 |   const { instance } = render(<MyComponent />);
305 |   expect(instance.state.count).toBe(1); // ❌ Avoid
306 | });
307 | ```
308 | 
309 | ### ✅ GOOD: Semantic HTML / User-centric testing
310 | 
311 | ```tsx
312 | import { render, screen, fireEvent } from "@testing-library/react";
313 | 
314 | // ✅ Proper button element with click handler
315 | function MyButton() {
316 |   return (
317 |     <button type="button" onClick={() => alert("Clicked!")}>
318 |       Click Me
319 |     </button>
320 |   );
321 | }
322 | 
323 | // ✅ Test user interaction and visible output
324 | test("MyButton alerts on click", () => {
325 |   render(<MyButton />);
326 |   fireEvent.click(screen.getByRole("button", { name: /click me/i }));
327 |   expect(window.alert).toHaveBeenCalledWith("Clicked!"); // Assuming alert is mocked
328 | });
329 | ```

</file_content>

<file_content path=".bob/rules/redis-rules.md">
  1 | ---
  2 | description: This guide provides definitive, actionable best practices for using Redis effectively, focusing on data modeling, performance, security, and cluster-aware client usage to build robust and scalable applications.
  3 | globs: **/*
  4 | ---
  5 | 
  6 | # Redis Best Practices
  7 | 
  8 | Redis is a powerful, single-threaded, in-memory database. Its efficiency hinges on how you interact with it. Follow these rules to ensure your applications are performant, scalable, and resilient.
  9 | 
 10 | ## 1. Data Modeling & Key Design
 11 | 
 12 | Efficient key design is paramount for performance and memory.
 13 | 
 14 | ### 1.1. Use Hierarchical Key Naming
 15 | 
 16 | Adopt a consistent, hierarchical key naming convention. This improves readability and allows for logical grouping.
 17 | 
 18 | ❌ BAD
 19 | 
 20 | ```redis
 21 | user:1:name
 22 | user:1:email
 23 | product:123:details
 24 | order:456:items
 25 | ```
 26 | 
 27 | ✅ GOOD
 28 | 
 29 | ```redis
 30 | user:1:profile:name
 31 | user:1:profile:email
 32 | product:123:data
 33 | order:456:cart:items
 34 | ```
 35 | 
 36 | _Rationale_: Clearer separation, better organization.
 37 | 
 38 | ### 1.2. Avoid Large Objects in Single Keys
 39 | 
 40 | Do not store multi-megabyte objects in a single key. Break down complex data into hashes or streams. This improves eviction, replication, and memory efficiency.
 41 | 
 42 | ❌ BAD
 43 | 
 44 | ```python
 45 | # Storing a large JSON object directly as a string
 46 | user_data = {"id": 1, "name": "Alice", "preferences": {...large_object...}, "history": [...many_items...]}
 47 | redis_client.set(f"user:1:data", json.dumps(user_data))
 48 | ```
 49 | 
 50 | ✅ GOOD
 51 | 
 52 | ```python
 53 | # Using a Redis Hash for structured data
 54 | redis_client.hset(f"user:1:profile", mapping={
 55 |     "id": 1,
 56 |     "name": "Alice",
 57 |     "email": "alice@example.com"
 58 | })
 59 | # Storing large, evolving data in a stream or separate keys
 60 | redis_client.xadd(f"user:1:activity_stream", {"action": "login", "timestamp": time.time()})
 61 | ```
 62 | 
 63 | _Rationale_: Hashes are optimized for field-value pairs, streams for time-series data. This keeps individual values small, aiding Redis's single-threaded nature.
 64 | 
 65 | ### 1.3. Use Hashtags for Multi-Key Operations in Clusters
 66 | 
 67 | When performing multi-key operations (e.g., transactions, Lua scripts) in a Redis Cluster, ensure all involved keys reside on the same hash slot by using hashtags.
 68 | 
 69 | ❌ BAD
 70 | 
 71 | ```python
 72 | # These keys will likely be on different slots, causing MOVED errors in a cluster
 73 | redis_client.mget("user:1:profile", "user:1:orders")
 74 | ```
 75 | 
 76 | ✅ GOOD
 77 | 
 78 | ```python
 79 | # Keys with the same hashtag ({...}) are guaranteed to be on the same slot
 80 | redis_client.mget("{user:1}:profile", "{user:1}:orders")
 81 | ```
 82 | 
 83 | _Rationale_: Hashtags (`{...}`) force Redis to hash only the content within the braces, ensuring co-location for atomic operations.
 84 | 
 85 | ### 1.4. Never Use Numbered Databases (`SELECT`)
 86 | 
 87 | Numbered databases (`SELECT`) are an anti-pattern. They provide false isolation and are not supported by Redis Cluster.
 88 | 
 89 | ❌ BAD
 90 | 
 91 | ```python
 92 | redis_client.select(1) # Using database 1
 93 | redis_client.set("mykey", "myvalue")
 94 | ```
 95 | 
 96 | ✅ GOOD
 97 | 
 98 | ```python
 99 | # Use distinct key prefixes instead of numbered databases
100 | redis_client.set("app:cache:mykey", "myvalue")
101 | redis_client.set("app:sessions:mykey", "myvalue")
102 | ```
103 | 
104 | _Rationale_: Numbered databases share the same underlying instance, meaning operations like `KEYS` on one database block all others. Key prefixes are the correct way to logically separate data.
105 | 
106 | ## 2. Connection & Memory Management
107 | 
108 | Proper client configuration and instance sizing are critical.
109 | 
110 | ### 2.1. Always Use Connection Pooling
111 | 
112 | Creating new TCP connections for every Redis command is expensive. Use a connection pool to reuse connections.
113 | 
114 | ❌ BAD
115 | 
116 | ```python
117 | # Creates a new connection for each operation
118 | redis_client = redis.Redis(host='localhost', port=6379)
119 | redis_client.set("key", "value")
120 | redis_client.get("key")
121 | ```
122 | 
123 | ✅ GOOD
124 | 
125 | ```python
126 | # Uses a connection pool (default for most clients, but explicitly shown)
127 | pool = redis.ConnectionPool(host='localhost', port=6379, max_connections=10)
128 | redis_client = redis.Redis(connection_pool=pool)
129 | redis_client.set("key", "value")
130 | redis_client.get("key")
131 | ```
132 | 
133 | _Rationale_: Connection pooling significantly reduces overhead and improves latency.
134 | 
135 | ### 2.2. Monitor and Manage Memory Usage
136 | 
137 | Configure `maxmemory` policies and lazy freeing. Provision instances with sufficient headroom for write spikes.
138 | 
139 | ```redis
140 | # redis.conf
141 | maxmemory 8gb             # Set maximum memory usage
142 | maxmemory-policy allkeys-lru # Evict least recently used keys when memory limit is reached
143 | lazyfree-lazy-eviction yes # Asynchronously free memory during eviction
144 | lazyfree-lazy-expire yes   # Asynchronously free memory during key expiration
145 | lazyfree-lazy-server-del yes # Asynchronously free memory when deleting keys
146 | ```
147 | 
148 | _Rationale_: Proactive memory management prevents OOM errors and maintains predictable performance.
149 | 
150 | ## 3. Cluster-Aware Client Usage
151 | 
152 | When using Redis Cluster, your client must understand the cluster topology.
153 | 
154 | ### 3.1. Use Cluster-Aware Clients
155 | 
156 | Always use client libraries specifically designed for Redis Cluster (e.g., `redis-py-cluster`, Lettuce, GLIDE). These clients handle slot mapping and `MOVED` redirections automatically.
157 | 
158 | ❌ BAD
159 | 
160 | ```python
161 | # This client is not cluster-aware and will fail or perform poorly
162 | import redis
163 | client = redis.Redis(host='cluster-node-1', port=6379)
164 | client.set("mykey", "myvalue")
165 | ```
166 | 
167 | ✅ GOOD
168 | 
169 | ```python
170 | # Use a cluster-aware client
171 | from redis.cluster import RedisCluster
172 | client = RedisCluster(host='cluster-node-1', port=6379, decode_responses=True)
173 | client.set("mykey", "myvalue")
174 | ```
175 | 
176 | _Rationale_: Cluster-aware clients prevent `MOVED` errors and ensure requests are routed to the correct node, enabling seamless scaling.
177 | 
178 | ### 3.2. Implement Exponential Backoff for Client Discovery
179 | 
180 | When clients disconnect or need to discover cluster topology, implement exponential backoff with jitter on retries to prevent overwhelming the cluster with `CLUSTER SLOTS` commands.
181 | 
182 | ```python
183 | import time
184 | import random
185 | from redis.cluster import RedisCluster, RedisClusterException
186 | 
187 | def connect_with_backoff(hosts, max_retries=5):
188 |     for i in range(max_retries):
189 |         try:
190 |             client = RedisCluster(startup_nodes=hosts, decode_responses=True)
191 |             client.ping() # Verify connection
192 |             return client
193 |         except RedisClusterException as e:
194 |             print(f"Connection failed (attempt {i+1}/{max_retries}): {e}")
195 |             sleep_time = (2 ** i) + random.uniform(0, 1) # Exponential backoff with jitter
196 |             time.sleep(sleep_time)
197 |     raise ConnectionError("Failed to connect to Redis Cluster after multiple retries")
198 | 
199 | # Example usage
200 | startup_nodes = [{"host": "node1", "port": 6379}, {"host": "node2", "port": 6379}]
201 | redis_cluster_client = connect_with_backoff(startup_nodes)
202 | ```
203 | 
204 | _Rationale_: Prevents a thundering herd problem during cluster reconfigurations or outages.
205 | 
206 | ## 4. Query Optimization & Batch Operations
207 | 
208 | Minimize network round-trips and avoid resource-intensive commands.
209 | 
210 | ### 4.1. Use Pipelining for Batch Operations
211 | 
212 | Group multiple commands into a single request to reduce network latency.
213 | 
214 | ❌ BAD
215 | 
216 | ```python
217 | # Multiple round-trips
218 | redis_client.set("key1", "value1")
219 | redis_client.set("key2", "value2")
220 | redis_client.get("key1")
221 | redis_client.get("key2")
222 | ```
223 | 
224 | ✅ GOOD
225 | 
226 | ```python
227 | # Single round-trip for multiple commands
228 | pipe = redis_client.pipeline()
229 | pipe.set("key1", "value1")
230 | pipe.set("key2", "value2")
231 | pipe.get("key1")
232 | pipe.get("key2")
233 | results = pipe.execute()
234 | ```
235 | 
236 | _Rationale_: Pipelining batches commands, sending them in one go and receiving all results at once, drastically improving throughput.
237 | 
238 | ### 4.2. Avoid `KEYS` in Production
239 | 
240 | `KEYS` is a blocking, O(N) operation that can halt your Redis server. Use `SCAN` for iterating keys.
241 | 
242 | ❌ BAD
243 | 
244 | ```python
245 | # Blocks the server for large datasets
246 | all_keys = redis_client.keys("user:*")
247 | ```
248 | 
249 | ✅ GOOD
250 | 
251 | ```python
252 | # Iterates keys incrementally without blocking
253 | cursor = 0
254 | while True:
255 |     cursor, keys = redis_client.scan(cursor, match="user:*", count=100)
256 |     for key in keys:
257 |         # Process key
258 |         pass
259 |     if cursor == 0:
260 |         break
261 | ```
262 | 
263 | _Rationale_: `SCAN` provides an iterator-like interface, distributing the work over multiple calls and preventing server stalls.
264 | 
265 | ### 4.3. Limit Result Sets for Collections
266 | 
267 | Avoid fetching entire large lists, sets, or hashes. Use `LRANGE` with limits, `HSCAN`, or `SSCAN`.
268 | 
269 | ❌ BAD
270 | 
271 | ```python
272 | # Fetches all members of a potentially huge set
273 | all_members = redis_client.smembers("my_large_set")
274 | ```
275 | 
276 | ✅ GOOD
277 | 
278 | ```python
279 | # Iterates members incrementally
280 | cursor = 0
281 | while True:
282 |     cursor, members = redis_client.sscan(cursor, name="my_large_set", count=100)
283 |     for member in members:
284 |         # Process member
285 |         pass
286 |     if cursor == 0:
287 |         break
288 | ```
289 | 
290 | _Rationale_: Prevents excessive memory usage on both the server and client, and reduces network transfer.
291 | 
292 | ## 5. Security Best Practices
293 | 
294 | Secure your Redis instances from unauthorized access.
295 | 
296 | ### 5.1. Always Set a Strong Password
297 | 
298 | Never run a Redis instance without authentication enabled, especially in production.
299 | 
300 | ❌ BAD
301 | 
302 | ```redis
303 | # No password configured, highly insecure
304 | # redis.conf (default)
305 | # requirepass foobared
306 | ```
307 | 
308 | ✅ GOOD
309 | 
310 | ```redis
311 | # redis.conf
312 | requirepass your_strong_and_unique_password_here
313 | ```
314 | 
315 | _Rationale_: An unprotected Redis instance is a common target for attackers.
316 | 
317 | ### 5.2. Isolate Redis Instances
318 | 
319 | Deploy Redis behind a firewall, in a private network, or within a VPC. Only allow access from trusted application servers.
320 | 
321 | _Rationale_: Reduces the attack surface by preventing direct public access.
322 | 
323 | ## 6. Testing Approaches
324 | 
325 | Ensure your Redis interactions are robust and performant.
326 | 
327 | ### 6.1. Use a Dedicated Test Redis Instance
328 | 
329 | For unit and integration tests, spin up a clean Redis instance (e.g., via Docker) to ensure isolated and repeatable tests.
330 | 
331 | ```python
332 | # Example using pytest and a local Redis fixture
333 | import pytest
334 | import redis
335 | import docker
336 | 
337 | @pytest.fixture(scope="session")
338 | def redis_container():
339 |     client = docker.from_env()
340 |     container = client.containers.run('redis:latest', detach=True, ports={'6379/tcp': 6379})
341 |     time.sleep(2) # Give Redis time to start
342 |     yield container
343 |     container.stop()
344 |     container.remove()
345 | 
346 | @pytest.fixture(scope="function")
347 | def redis_client(redis_container):
348 |     client = redis.Redis(host='localhost', port=6379, decode_responses=True)
349 |     client.flushdb() # Clear database for each test
350 |     yield client
351 |     client.flushdb()
352 | ```
353 | 
354 | _Rationale_: Prevents test pollution and ensures tests run against a known state.
355 | 
356 | ### 6.2. Conduct Load Testing
357 | 
358 | Simulate real-world traffic patterns to identify performance bottlenecks and validate scaling strategies. Tools like `memtier_benchmark` are ideal.
359 | 
360 | ```bash
361 | # Example memtier_benchmark command
362 | memtier_benchmark -s localhost -p 6379 -n 100000 -c 50 -t 4 --ratio=1:1
363 | ```
364 | 
365 | _Rationale_: Uncovers issues related to connection limits, memory pressure, and command latency under stress.

</file_content>

<file_content path=".bob/rules/rules.md">
 1 | # Dev Rules v1.0.0
 2 | 
 3 | ## SOLID Principles
 4 | 
 5 | - **SRP**: One responsibility per component/function. Extract data fetching into custom hooks.
 6 | - **OCP**: Use extensible props (`variant`, `actions`) instead of modifying components.
 7 | - **LSP**: Extended interfaces must fulfill base interface contracts.
 8 | - **ISP**: Split large interfaces into focused ones (`Selectable`, `Displayable`).
 9 | - **DIP**: Depend on abstractions (e.g., `StorageService` interface, not `localStorage` directly).
10 | 
11 | ## Core Principles
12 | 
13 | - **DRY**: Extract repeated logic into hooks/utils (e.g., `useDebounce`).
14 | - **KISS**: Prefer readable over clever. Break logic into named steps.
15 | - **YAGNI**: Only model what's needed now. No speculative fields.
16 | 
17 | ## Clean Code
18 | 
19 | - **Names**: Descriptive (`activeRecommendations` not `arr`).
20 | - **Functions**: Single purpose, <20 lines. Validate → Transform → Process pattern.
21 | - **Args**: Max 2 params; use object params for more.
22 | - **Comments**: Explain WHY not WHAT.
23 | - **Errors**: try/catch on all async. Handle `ZodError`, `Error`, and unknown cases separately.
24 | 
25 | ## TypeScript
26 | 
27 | - Strict mode always on. Explicit return types required.
28 | - No `any` — use `unknown` + type guards.
29 | - `interface` for object shapes; `type` for unions/primitives.
30 | 
31 | ## React
32 | 
33 | - Default to **Server Components**; use `'use client'` only when interactive.
34 | - Extract reusable logic into custom hooks (`useLocalStorage`, etc.).
35 | - Well-typed props via interfaces.
36 | 
37 | ## Code Organization
38 | 
39 | - Feature folders: `ComponentName/index.ts`, `.tsx`, `.test.tsx`, `types.ts`, `utils.ts`
40 | - Import order: external → internal (absolute) → relative → styles
41 | - Use barrel exports via `components/index.ts`
42 | 
43 | ## Naming
44 | 
45 | | Thing            | Convention         |
46 | | ---------------- | ------------------ |
47 | | Components       | `PascalCase`       |
48 | | Hooks            | `useXxx` camelCase |
49 | | Utils            | `camelCase`        |
50 | | Constants        | `UPPER_SNAKE_CASE` |
51 | | Types/Interfaces | `PascalCase`       |
52 | 
53 | ## Testing
54 | 
55 | - TDD when appropriate. Unit/Integration/E2E = 70/20/10%.
56 | - Coverage: 80% overall, 95% on critical paths.
57 | 
58 | ## Accessibility (WCAG 2.1 AA)
59 | 
60 | - Semantic HTML, ARIA labels, keyboard nav, focus management.
61 | - Color contrast ≥4.5:1. `alt` text on images. `aria-invalid`, `aria-describedby` on forms.
62 | 
63 | ## Security
64 | 
65 | - Validate all inputs with **Zod**.
66 | - Rate-limit API routes. Sanitize inputs. Secrets in env vars only. Never commit secrets.
67 | 
68 | ## Git
69 | 
70 | - Commits: `feat:` `fix:` `docs:` `style:` `refactor:` `test:` `chore:`
71 | - Branches: `feature/`, `fix/`, `refactor/`, `docs/`
72 | 
73 | ## Performance
74 | 
75 | - Dynamic imports for heavy components (`next/dynamic`).
76 | - `memo` for pure components, `useMemo` for expensive computations.
77 | 
78 | ## Common Pitfalls
79 | 
80 | 1. No `any` → use `unknown` + guards
81 | 2. Don't skip tests (80% coverage)
82 | 3. No hardcoded secrets
83 | 4. Don't ignore a11y
84 | 5. Default to Server Components
85 | 6. Always validate with Zod
86 | 7. Keep functions <20 lines
87 | 8. Don't repeat logic — extract it
88 | 9. Don't premature-optimize — measure first
89 | 10. Always handle errors
90 | 
91 | ## Pre-Submit Checklist
92 | 
93 | - [ ] Strict TS, explicit return types, no `any`
94 | - [ ] SRP followed, tests written (80%+)
95 | - [ ] WCAG 2.1 AA met, error handling done
96 | - [ ] Zod validation, security best practices
97 | - [ ] JSDoc on complex functions
98 | - [ ] Prettier formatted, ESLint clean
99 | - [ ] Conventional Commits used

</file_content>

<file_content path=".bob/rules/sentry-rules.md">
  1 | ---
  2 | description: Definitive guidelines for integrating and using Sentry for error tracking and performance monitoring, ensuring optimal setup, performance, and debuggability across all applications.
  3 | globs: **/*
  4 | ---
  5 | 
  6 | # Sentry Best Practices
  7 | 
  8 | Sentry is our definitive platform for error tracking and performance monitoring. Proper integration ensures we debug faster, ship more reliably, and maintain high application health. This guide outlines the mandatory best practices for all projects.
  9 | 
 10 | ## 1. Code Organization and Initialization
 11 | 
 12 | Always initialize the Sentry SDK early in your application's bootstrap process. This ensures maximum coverage for errors and performance tracing.
 13 | 
 14 | ### 1.1. Early and Centralized Initialization
 15 | 
 16 | Initialize Sentry once, as close to your application's entry point as possible. Use environment variables for sensitive data like DSN and for configuration that varies by environment.
 17 | 
 18 | ❌ **BAD: Late or Scattered Initialization**
 19 | 
 20 | ```python
 21 | # app/views.py (Django) or a random module
 22 | import sentry_sdk
 23 | 
 24 | def my_function():
 25 |     if not sentry_sdk.is_initialized(): # Don't do this, it's too late and prone to race conditions
 26 |         sentry_sdk.init(dsn="YOUR_DSN")
 27 |     # ...
 28 | ```
 29 | 
 30 | ✅ **GOOD: Application Bootstrap (Python Example)**
 31 | 
 32 | ```python
 33 | # app.py or wsgi.py/asgi.py for web apps
 34 | import os
 35 | import sentry_sdk
 36 | from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration # Example for Lambda
 37 | 
 38 | SENTRY_DSN = os.getenv("SENTRY_DSN")
 39 | SENTRY_ENVIRONMENT = os.getenv("SENTRY_ENVIRONMENT", "development")
 40 | SENTRY_RELEASE = os.getenv("SENTRY_RELEASE", "unknown")
 41 | SENTRY_TRACES_SAMPLE_RATE = float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.0")) # Default to 0.0 in prod
 42 | 
 43 | if SENTRY_DSN:
 44 |     sentry_sdk.init(
 45 |         dsn=SENTRY_DSN,
 46 |         environment=SENTRY_ENVIRONMENT,
 47 |         release=SENTRY_RELEASE,
 48 |         enable_tracing=True, # Always enable tracing, sampling controls overhead
 49 |         traces_sample_rate=SENTRY_TRACES_SAMPLE_RATE,
 50 |         # Add integrations as needed, e.g., for specific frameworks or platforms
 51 |         # integrations=[AwsLambdaIntegration()] if SENTRY_ENVIRONMENT == "aws-lambda" else [],
 52 |     )
 53 | ```
 54 | 
 55 | ✅ **GOOD: Application Bootstrap (JavaScript/TypeScript Example)**
 56 | 
 57 | ```typescript
 58 | // src/index.ts or app.ts
 59 | import * as Sentry from "@sentry/node"; // or @sentry/browser, @sentry/react, etc.
 60 | 
 61 | const SENTRY_DSN = process.env.SENTRY_DSN;
 62 | const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT || "development";
 63 | const SENTRY_RELEASE = process.env.SENTRY_RELEASE || "unknown";
 64 | const SENTRY_TRACES_SAMPLE_RATE = parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || "0.0");
 65 | 
 66 | if (SENTRY_DSN) {
 67 |   Sentry.init({
 68 |     dsn: SENTRY_DSN,
 69 |     environment: SENTRY_ENVIRONMENT,
 70 |     release: SENTRY_RELEASE,
 71 |     integrations: [
 72 |       // Add framework-specific integrations here, e.g., new Sentry.Integrations.Http({ tracing: true })
 73 |       // new Sentry.Integrations.Express(),
 74 |     ],
 75 |     tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
 76 |     enableTracing: true, // Redundant with tracesSampleRate > 0, but good for clarity
 77 |   });
 78 | }
 79 | ```
 80 | 
 81 | ### 1.2. Environment, Release, and User Context
 82 | 
 83 | Always set `environment` and `release` during initialization. Enrich events with user and other relevant context for faster debugging.
 84 | 
 85 | ✅ **GOOD: Setting Context**
 86 | 
 87 | ```python
 88 | import sentry_sdk
 89 | 
 90 | # ... Sentry init as above ...
 91 | 
 92 | def process_order(user_id: str, order_details: dict):
 93 |     with sentry_sdk.push_scope() as scope: # Use push_scope for temporary context
 94 |         scope.set_user({"id": user_id, "email": "user@example.com"})
 95 |         scope.set_tag("order_type", "premium")
 96 |         scope.set_context("order_details", order_details)
 97 |         try:
 98 |             # ... order processing logic ...
 99 |             raise ValueError("Failed to process payment")
100 |         except Exception as e:
101 |             sentry_sdk.capture_exception(e)
102 | ```
103 | 
104 | ## 2. Common Patterns and Anti-patterns
105 | 
106 | ### 2.1. Performance Tracing with OpenTelemetry
107 | 
108 | Leverage OpenTelemetry for distributed tracing. Sentry SDKs integrate seamlessly, allowing end-to-end visibility without rewriting existing instrumentation.
109 | 
110 | ✅ **GOOD: OpenTelemetry Integration (Python Example)**
111 | 
112 | ```python
113 | import sentry_sdk
114 | from opentelemetry import trace
115 | from opentelemetry.sdk.trace import TracerProvider
116 | from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor
117 | from sentry_sdk.integrations.opentelemetry import SentrySpanProcessor
118 | 
119 | # Configure OpenTelemetry
120 | provider = TracerProvider()
121 | provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter())) # For local debugging
122 | provider.add_span_processor(SentrySpanProcessor()) # Send spans to Sentry
123 | trace.set_tracer_provider(provider)
124 | 
125 | # Initialize Sentry (ensure enable_tracing and traces_sample_rate are set)
126 | sentry_sdk.init(
127 |     dsn="YOUR_DSN",
128 |     enable_tracing=True,
129 |     traces_sample_rate=1.0, # Adjust for production
130 |     # ... other config ...
131 | )
132 | 
133 | # Use OpenTelemetry tracer
134 | tracer = trace.get_tracer(__name__)
135 | 
136 | def my_traced_function():
137 |     with tracer.start_as_current_span("my-custom-operation"):
138 |         print("Executing traced operation...")
139 |         # ... your code ...
140 | ```
141 | 
142 | ### 2.2. Isolated Clients for Shared Environments (JavaScript/TypeScript)
143 | 
144 | **NEVER** use `Sentry.init()` in shared environments (e.g., browser extensions, VS Code extensions, third-party widgets). This pollutes global state and leads to data leakage. Create a dedicated client instance manually.
145 | 
146 | ❌ **BAD: Global Init in Shared Environment**
147 | 
148 | ```typescript
149 | // browser_extension/background.ts
150 | import * as Sentry from "@sentry/browser";
151 | 
152 | Sentry.init({
153 |   // ❌ DANGER: Do NOT use Sentry.init() in shared environments!
154 |   dsn: "YOUR_DSN",
155 |   // ...
156 | });
157 | ```
158 | 
159 | ✅ **GOOD: Manual Client Setup for Shared Environments**
160 | 
161 | ```typescript
162 | // browser_extension/background.ts
163 | import {
164 |   BrowserClient,
165 |   defaultStackParser,
166 |   getDefaultIntegrations,
167 |   makeFetchTransport,
168 |   Scope,
169 | } from "@sentry/browser";
170 | 
171 | // Filter out integrations that rely on global state
172 | const integrations = getDefaultIntegrations({}).filter(
173 |   (defaultIntegration) =>
174 |     !["BrowserApiErrors", "Breadcrumbs", "GlobalHandlers"].includes(defaultIntegration.name)
175 | );
176 | 
177 | const client = new BrowserClient({
178 |   dsn: "YOUR_DSN",
179 |   transport: makeFetchTransport,
180 |   stackParser: defaultStackParser,
181 |   integrations: integrations,
182 |   tracesSampleRate: 1.0, // Adjust for production
183 |   enableTracing: true,
184 | });
185 | 
186 | const scope = new Scope();
187 | scope.setClient(client);
188 | client.init(); // Initialize the client after setting it on the scope
189 | 
190 | // Manually capture exceptions using the client's scope
191 | try {
192 |   // Your extension code here
193 |   throw new Error("Example error in extension");
194 | } catch (error) {
195 |   scope.captureException(error);
196 | }
197 | ```
198 | 
199 | ### 2.3. AWS Lambda Integration
200 | 
201 | For serverless functions, use the platform-specific integration.
202 | 
203 | ✅ **GOOD: AWS Lambda (Python Example)**
204 | 
205 | ```python
206 | import os
207 | import sentry_sdk
208 | from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration
209 | 
210 | SENTRY_DSN = os.getenv("SENTRY_DSN")
211 | SENTRY_TRACES_SAMPLE_RATE = float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.0"))
212 | 
213 | if SENTRY_DSN:
214 |     sentry_sdk.init(
215 |         dsn=SENTRY_DSN,
216 |         integrations=[AwsLambdaIntegration()],
217 |         traces_sample_rate=SENTRY_TRACES_SAMPLE_RATE,
218 |         environment=os.getenv("SENTRY_ENVIRONMENT", "production"),
219 |         release=os.getenv("SENTRY_RELEASE", "unknown"),
220 |     )
221 | 
222 | def lambda_handler(event, context):
223 |     # Your Lambda function logic
224 |     print("Processing event...")
225 |     raise ValueError("Something went wrong in Lambda!")
226 |     return {"statusCode": 200, "body": "Success"}
227 | ```
228 | 
229 | ## 3. Performance Considerations
230 | 
231 | ### 3.1. Configure `traces_sample_rate` Judiciously
232 | 
233 | `traces_sample_rate` directly impacts performance overhead and Sentry quota usage.
234 | 
235 | - **Development:** Set to `1.0` to capture all transactions for full visibility.
236 | - **Production:** Set to a lower value (e.g., `0.01` to `0.1`) to sample a representative subset of transactions. Adjust based on traffic volume and monitoring needs.
237 | 
238 | ❌ **BAD: `traces_sample_rate=1.0` in Production**
239 | 
240 | ```python
241 | sentry_sdk.init(
242 |     dsn="YOUR_PROD_DSN",
243 |     traces_sample_rate=1.0, # ❌ This will send ALL traces, potentially incurring high costs and overhead.
244 |     enable_tracing=True,
245 | )
246 | ```
247 | 
248 | ✅ **GOOD: Controlled Sampling in Production**
249 | 
250 | ```python
251 | sentry_sdk.init(
252 |     dsn="YOUR_PROD_DSN",
253 |     traces_sample_rate=0.05, # ✅ Sample 5% of transactions in production
254 |     enable_tracing=True,
255 | )
256 | ```
257 | 
258 | ## 4. Common Pitfalls and Gotchas
259 | 
260 | ### 4.1. Missing or Invalid DSN
261 | 
262 | Without a valid DSN, Sentry cannot send events. Always verify your DSN is correctly configured, ideally via environment variables.
263 | 
264 | ❌ **BAD: Hardcoded or Missing DSN**
265 | 
266 | ```python
267 | sentry_sdk.init(
268 |     dsn="", # ❌ No DSN means no events
269 |     # ...
270 | )
271 | ```
272 | 
273 | ✅ **GOOD: DSN from Environment Variables**
274 | 
275 | ```python
276 | import os
277 | sentry_sdk.init(
278 |     dsn=os.getenv("SENTRY_DSN"), # ✅ Always load DSN from environment
279 |     # ...
280 | )
281 | ```
282 | 
283 | ### 4.2. Unset `environment` and `release`
284 | 
285 | Events without `environment` or `release` are significantly harder to triage and correlate. Always set these values.
286 | 
287 | ❌ **BAD: Omitting Environment/Release**
288 | 
289 | ```python
290 | sentry_sdk.init(
291 |     dsn="YOUR_DSN",
292 |     # No environment or release set ❌
293 | )
294 | ```
295 | 
296 | ✅ **GOOD: Explicit Environment/Release**
297 | 
298 | ```python
299 | sentry_sdk.init(
300 |     dsn="YOUR_DSN",
301 |     environment=os.getenv("SENTRY_ENVIRONMENT", "development"), # ✅
302 |     release=os.getenv("SENTRY_RELEASE", "my-app@1.0.0"), # ✅
303 | )
304 | ```
305 | 
306 | ### 4.3. Ignoring Inbound Filters
307 | 
308 | If Sentry events aren't appearing, check your Sentry project's **Project Settings > Inbound Filters**. Ensure you haven't accidentally enabled filters that block events (e.g., "Filter out errors known to be caused by browser extensions" if you're in a shared environment).
309 | 
310 | ## 5. Testing Approaches
311 | 
312 | ### 5.1. Disabling Sentry in Test Environments
313 | 
314 | Prevent test noise and unnecessary Sentry events by disabling the SDK during automated tests.
315 | 
316 | ✅ **GOOD: Conditional Sentry Initialization**
317 | 
318 | ```python
319 | import os
320 | import sentry_sdk
321 | 
322 | # Only initialize Sentry if DSN is present AND not in a test environment
323 | if os.getenv("SENTRY_DSN") and os.getenv("APP_ENV") != "test":
324 |     sentry_sdk.init(
325 |         dsn=os.getenv("SENTRY_DSN"),
326 |         environment=os.getenv("SENTRY_ENVIRONMENT", "development"),
327 |         release=os.getenv("SENTRY_RELEASE", "unknown"),
328 |         traces_sample_rate=float(os.getenv("SENTRY_TRACES_SAMPLE_RATE", "0.0")),
329 |         enable_tracing=True,
330 |     )
331 | ```
332 | 
333 | ### 5.2. Manual Error Capture
334 | 
335 | For specific, non-critical errors that you want to report without crashing the application, use `sentry_sdk.capture_message()` or `sentry_sdk.capture_exception()`.
336 | 
337 | ✅ **GOOD: Manual Capture**
338 | 
339 | ```python
340 | import sentry_sdk
341 | 
342 | def process_data(data: list):
343 |     if not data:
344 |         sentry_sdk.capture_message("Received empty data for processing.", level="warning") # ✅ Report non-exception issues
345 |         return False
346 |     try:
347 |         # ... process data ...
348 |         raise ConnectionError("Database unreachable")
349 |     except ConnectionError as e:
350 |         sentry_sdk.capture_exception(e) # ✅ Explicitly capture exceptions
351 |         return False
352 | ```

</file_content>

<file_content path=".bob/rules/shadcn-rules.md">
  1 | ---
  2 | description: This guide defines definitive best practices for developing with shadcn/ui, ensuring consistent code organization, robust TypeScript, optimal performance, and accessible, maintainable components.
  3 | globs: **/*
  4 | ---
  5 | 
  6 | # shadcn Best Practices
  7 | 
  8 | This document outlines our team's definitive best practices for developing with `shadcn/ui`. Adhere to these guidelines for all `shadcn` component development and integration.
  9 | 
 10 | ## 1. Code Organization and Structure
 11 | 
 12 | Organize components logically to reflect UI hierarchy and promote discoverability.
 13 | 
 14 | **Rule:** Place domain-specific components under `components/<domain>` and reusable UI primitives under `components/ui`. Each component must reside in its own PascalCase file.
 15 | 
 16 | ❌ BAD:
 17 | 
 18 | ```
 19 | // components/Button.tsx
 20 | // components/profile-card.tsx
 21 | // components/user-settings/index.tsx (contains multiple components)
 22 | ```
 23 | 
 24 | ✅ GOOD:
 25 | 
 26 | ```
 27 | // components/ui/Button.tsx
 28 | // components/forms/DatePicker.tsx
 29 | // components/layout/Sidebar.tsx
 30 | 
 31 | // components/forms/index.ts
 32 | export * from "./DatePicker";
 33 | export * from "./Input";
 34 | ```
 35 | 
 36 | ## 2. Component Architecture
 37 | 
 38 | Favor functional components, composition, and explicit prop definitions.
 39 | 
 40 | **Rule:** Use functional components with `React.forwardRef` and `asChild` for seamless integration with Radix primitives.
 41 | 
 42 | ❌ BAD:
 43 | 
 44 | ```tsx
 45 | // No ref forwarding, no asChild
 46 | const Button = ({ children, onClick }) => <button onClick={onClick}>{children}</button>;
 47 | ```
 48 | 
 49 | ✅ GOOD:
 50 | 
 51 | ```tsx
 52 | // components/ui/Button.tsx
 53 | import * as React from "react";
 54 | import { Slot } from "@radix-ui/react-slot";
 55 | import { cva, type VariantProps } from "class-variance-authority";
 56 | import { cn } from "@/lib/utils"; // Assuming you have a cn utility
 57 | 
 58 | const buttonVariants = cva(
 59 |   "inline-flex items-center justify-center rounded-md text-sm font-medium",
 60 |   {
 61 |     variants: {
 62 |       variant: {
 63 |         default: "bg-primary text-primary-foreground hover:bg-primary/90",
 64 |         destructive: "bg-destructive text-destructive-foreground",
 65 |       },
 66 |       size: {
 67 |         default: "h-10 px-4 py-2",
 68 |         sm: "h-9 rounded-md px-3",
 69 |       },
 70 |     },
 71 |     defaultVariants: {
 72 |       variant: "default",
 73 |       size: "default",
 74 |     },
 75 |   }
 76 | );
 77 | 
 78 | export interface ButtonProps
 79 |   extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
 80 |   asChild?: boolean;
 81 | }
 82 | 
 83 | const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 84 |   ({ className, variant, size, asChild = false, ...props }, ref) => {
 85 |     const Comp = asChild ? Slot : "button";
 86 |     return (
 87 |       <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
 88 |     );
 89 |   }
 90 | );
 91 | Button.displayName = "Button";
 92 | 
 93 | export { Button, buttonVariants };
 94 | ```
 95 | 
 96 | ## 3. TypeScript and API Design
 97 | 
 98 | Enforce strict TypeScript with clear interfaces and robust validation.
 99 | 
100 | **Rule:** Use interfaces for component props. Validate form data with Zod schemas. Avoid `any` and prefer explicit types.
101 | 
102 | ❌ BAD:
103 | 
104 | ```typescript
105 | // Vague props, no validation
106 | type UserFormProps = {
107 |   data: any;
108 |   onSubmit: (values: any) => void;
109 | };
110 | ```
111 | 
112 | ✅ GOOD:
113 | 
114 | ```typescript
115 | // components/forms/UserForm.tsx
116 | import { z } from "zod";
117 | 
118 | export interface UserFormProps {
119 |   initialData?: UserFormData;
120 |   onSubmit: (values: UserFormData) => void;
121 | }
122 | 
123 | export const userFormSchema = z.object({
124 |   id: z.string().optional(),
125 |   name: z.string().min(2, "Name must be at least 2 characters."),
126 |   email: z.string().email("Invalid email address."),
127 | });
128 | 
129 | export type UserFormData = z.infer<typeof userFormSchema>;
130 | ```
131 | 
132 | ## 4. Theming and Styling
133 | 
134 | Leverage Tailwind CSS and `class-variance-authority` (CVA) for consistent, maintainable styling.
135 | 
136 | **Rule:** Define component variants using CVA. Use the `cn` utility for conditional class merging. Centralize Tailwind configuration and design tokens.
137 | 
138 | ❌ BAD:
139 | 
140 | ```tsx
141 | // Inconsistent inline styles or direct class manipulation
142 | <button className={`p-2 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
143 | ```
144 | 
145 | ✅ GOOD:
146 | 
147 | ```tsx
148 | // components/ui/Badge.tsx
149 | import { cva, type VariantProps } from "class-variance-authority";
150 | import { cn } from "@/lib/utils";
151 | 
152 | const badgeVariants = cva(
153 |   "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
154 |   {
155 |     variants: {
156 |       variant: {
157 |         default: "border-transparent bg-primary text-primary-foreground",
158 |         secondary: "border-transparent bg-secondary text-secondary-foreground",
159 |         outline: "text-foreground",
160 |       },
161 |     },
162 |     defaultVariants: {
163 |       variant: "default",
164 |     },
165 |   }
166 | );
167 | 
168 | export interface BadgeProps
169 |   extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
170 | 
171 | function Badge({ className, variant, ...props }: BadgeProps) {
172 |   return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
173 | }
174 | 
175 | export { Badge, badgeVariants };
176 | ```
177 | 
178 | ## 5. Common Patterns and Anti-patterns
179 | 
180 | **Rule:** Use React Hook Form with Zod for all forms. Implement early returns and guard clauses for error handling.
181 | 
182 | ❌ BAD:
183 | 
184 | ```tsx
185 | // Deeply nested logic, manual form state
186 | if (data) {
187 |   // ... many lines
188 |   if (isValid) {
189 |     // ... more lines
190 |   }
191 | }
192 | ```
193 | 
194 | ✅ GOOD:
195 | 
196 | ```tsx
197 | // Early return for invalid state
198 | if (!user) {
199 |   return <p>User not found.</p>;
200 | }
201 | 
202 | // React Hook Form + Zod example
203 | import { useForm } from "react-hook-form";
204 | import { zodResolver } from "@hookform/resolvers/zod";
205 | import { userFormSchema, UserFormData } from "./UserForm"; // From section 3
206 | 
207 | function UserProfileForm({ initialData, onSubmit }: UserFormProps) {
208 |   const form = useForm<UserFormData>({
209 |     resolver: zodResolver(userFormSchema),
210 |     defaultValues: initialData,
211 |   });
212 | 
213 |   return <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>;
214 | }
215 | ```
216 | 
217 | ## 6. Performance Considerations
218 | 
219 | Optimize for fast initial loads and smooth interactions.
220 | 
221 | **Rule:** Lazy-load heavy UI sections (e.g., dialogs, data tables) using `React.lazy` or dynamic imports. Memoize expensive components and callbacks.
222 | 
223 | ❌ BAD:
224 | 
225 | ```tsx
226 | // Always loads heavy component
227 | import { BigComplexChart } from "./BigComplexChart";
228 | function Dashboard() {
229 |   return <BigComplexChart data={...} />;
230 | }
231 | ```
232 | 
233 | ✅ GOOD:
234 | 
235 | ```tsx
236 | // Lazy load for better initial performance
237 | import React from "react";
238 | const LazyBigComplexChart = React.lazy(() => import("./BigComplexChart"));
239 | 
240 | function Dashboard() {
241 |   const [showChart, setShowChart] = React.useState(false);
242 | 
243 |   // Memoize callbacks to prevent unnecessary re-renders
244 |   const handleToggleChart = React.useCallback(() => {
245 |     setShowChart((prev) => !prev);
246 |   }, []);
247 | 
248 |   return (
249 |     <div>
250 |       <Button onClick={handleToggleChart}>Toggle Chart</Button>
251 |       {showChart && (
252 |         <React.Suspense fallback={<div>Loading chart...</div>}>
253 |           <LazyBigComplexChart data={...} />
254 |         </React.Suspense>
255 |       )}
256 |     </div>
257 |   );
258 | }
259 | ```
260 | 
261 | ## 7. Accessibility
262 | 
263 | Build inclusive UIs by leveraging Radix primitives and ARIA attributes.
264 | 
265 | **Rule:** Always use `shadcn/ui` components as they are built on Radix UI and provide excellent accessibility out-of-the-box. Ensure custom components correctly pass ARIA attributes and manage focus.
266 | 
267 | ❌ BAD:
268 | 
269 | ```tsx
270 | // Custom button without ARIA attributes or proper semantics
271 | <div role="button" onClick={...}>Click me</div>
272 | ```
273 | 
274 | ✅ GOOD:
275 | 
276 | ```tsx
277 | // Leverage shadcn/ui's accessible Button
278 | import { Button } from "@/components/ui/Button";
279 | <Button onClick={() => alert("Action!")}>Perform Action</Button>;
280 | ```
281 | 
282 | ## 8. Common Pitfalls and Gotchas
283 | 
284 | Avoid these common mistakes to maintain a scalable and robust codebase.
285 | 
286 | **Rule:** Never directly modify `shadcn/ui` component files. Instead, extend them with `cn` or wrap them in higher-order components. Avoid `dangerouslySetInnerHTML`.
287 | 
288 | ❌ BAD:
289 | 
290 | ```tsx
291 | // Direct modification of a shadcn component (will be overwritten by CLI updates)
292 | // components/ui/button.tsx (modified directly)
293 | ```
294 | 
295 | ```tsx
296 | // Security vulnerability
297 | <div dangerouslySetInnerHTML={{ __html: userProvidedContent }} />
298 | ```
299 | 
300 | ✅ GOOD:
301 | 
302 | ```tsx
303 | // Extend with cn for custom styles
304 | import { Button } from "@/components/ui/Button";
305 | <Button className="bg-red-500 hover:bg-red-600">Custom Red Button</Button>;
306 | ```
307 | 
308 | ```tsx
309 | // Sanitize and render text content safely
310 | import DOMPurify from "dompurify";
311 | 
312 | const sanitizedContent = DOMPurify.sanitize(userProvidedContent);
313 | return <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
314 | // Or even better, avoid dangerouslySetInnerHTML if possible and render text directly
315 | // return <p>{userProvidedContent}</p>;
316 | ```

</file_content>

<file_content path=".bob/rules/typescript-rules.md">
  1 | ---
  2 | description: Enforce modern TypeScript best practices for robust, type-safe JavaScript applications, focusing on strictness, clear type definitions, and runtime validation.
  3 | globs: **/*.{js,jsx}
  4 | ---
  5 | 
  6 | # TypeScript Best Practices (for JS/JSX Type-Checking)
  7 | 
  8 | This guide outlines essential TypeScript best practices for teams working with JavaScript or JSX files that are type-checked by TypeScript (e.g., via `tsconfig.json` with `allowJs` and/or JSDoc annotations). While many examples use native TypeScript syntax for clarity and conciseness, the underlying principles and type-safety benefits apply directly to your `.js`/`.jsx` codebase.
  9 | 
 10 | ## 1. Enable Strict Mode in `tsconfig.json`
 11 | 
 12 | This is the single most impactful change you can make. `strict: true` enables a suite of crucial checks that catch the vast majority of common type-related bugs at compile time.
 13 | 
 14 | **Action**: Ensure your `tsconfig.json` includes:
 15 | 
 16 | ```json
 17 | // tsconfig.json
 18 | {
 19 |   "compilerOptions": {
 20 |     "strict": true, // Enables all strict type-checking options
 21 |     "noImplicitAny": true, // Catches untyped variables/parameters
 22 |     "strictNullChecks": true, // Prevents `null`/`undefined` access without checks
 23 |     "strictPropertyInitialization": true, // Ensures class properties are initialized
 24 |     "allowJs": true, // Crucial for type-checking .js/.jsx files
 25 |     "checkJs": true // Enables type-checking in .js/.jsx files
 26 |     // ... other options
 27 |   },
 28 |   "include": ["**/*.js", "**/*.jsx"] // Ensure your JS/JSX files are included
 29 | }
 30 | ```
 31 | 
 32 | ## 2. Define Clear Type Contracts
 33 | 
 34 | Use interfaces and type aliases to describe the shape of your data, especially for API payloads, component props, and complex objects. For `.js`/`.jsx` files, leverage JSDoc to apply these types.
 35 | 
 36 | ### ✅ GOOD: Interfaces for Object Shapes & Classes
 37 | 
 38 | Interfaces are ideal for defining the shape of objects and for implementing explicit contracts when working with classes. Define these in `.d.ts` or `.ts` files, then reference them in JSDoc.
 39 | 
 40 | ```typescript
 41 | // types.d.ts or types.ts
 42 | interface UserProfile {
 43 |   id: string;
 44 |   name: string;
 45 |   email: string;
 46 |   age?: number; // Optional property
 47 | }
 48 | 
 49 | interface Point {
 50 |   readonly x: number;
 51 |   readonly y: number;
 52 | }
 53 | ```
 54 | 
 55 | ```javascript
 56 | // user-service.js
 57 | /**
 58 |  * @typedef {import('./types').UserProfile} UserProfile
 59 |  */
 60 | 
 61 | /**
 62 |  * @param {UserProfile} user
 63 |  * @returns {string}
 64 |  */
 65 | export function greetUser(user) {
 66 |   return `Hello, ${user.name}!`;
 67 | }
 68 | ```
 69 | 
 70 | ### ✅ GOOD: Type Aliases for Complex Types & Unions
 71 | 
 72 | Type aliases are powerful for defining unions, intersections, primitive aliases, and tuples. Define these in `.d.ts` or `.ts` files, then reference them in JSDoc.
 73 | 
 74 | ```typescript
 75 | // types.d.ts or types.ts
 76 | type ID = string | number;
 77 | type UserRole = "admin" | "user" | "guest"; // Strict literal type
 78 | type Coords = [number, number];
 79 | ```
 80 | 
 81 | ```javascript
 82 | // auth-service.js
 83 | /**
 84 |  * @typedef {import('./types').ID} ID
 85 |  * @typedef {import('./types').UserRole} UserRole
 86 |  */
 87 | 
 88 | /**
 89 |  * @param {ID} userId
 90 |  * @param {UserRole} role
 91 |  * @returns {void}
 92 |  */
 93 | export function assignRole(userId, role) {
 94 |   console.log(`User ${userId} assigned role: ${role}`);
 95 | }
 96 | ```
 97 | 
 98 | ## 3. Avoid `any` and Prefer `unknown` for Untyped Data
 99 | 
100 | `any` completely bypasses TypeScript's checks, reintroducing JavaScript's runtime errors. `unknown` is a safer alternative that forces you to narrow the type before use.
101 | 
102 | ### ❌ BAD: Using `any`
103 | 
104 | ```javascript
105 | // data-processor.js
106 | /**
107 |  * @param {any} data // Bypasses all type checks
108 |  */
109 | export function processDataBad(data) {
110 |   // No type safety here, data.foo might not exist
111 |   console.log(data.foo.bar);
112 | }
113 | ```
114 | 
115 | ### ✅ GOOD: Using `unknown` (and Type Guards)
116 | 
117 | When dealing with data from external sources (e.g., API responses), use `unknown` and then narrow its type using runtime checks.
118 | 
119 | ```javascript
120 | // data-processor.js
121 | /**
122 |  * @param {unknown} data // Forces runtime checks
123 |  */
124 | export function processDataGood(data) {
125 |   if (typeof data === "object" && data !== null && "foo" in data) {
126 |     /** @type {{ foo: { bar: string } }} */
127 |     const typedData = data; // Type assertion after narrowing
128 |     console.log(typedData.foo.bar);
129 |   } else {
130 |     console.error("Invalid data structure");
131 |   }
132 | }
133 | ```
134 | 
135 | ## 4. Implement Robust Runtime Type Validation (Type Guards)
136 | 
137 | TypeScript's compile-time checks are erased at runtime. For data from external sources (APIs, user input), you _must_ perform runtime validation to prevent crashes.
138 | 
139 | ### ✅ GOOD: `typeof` for Primitives
140 | 
141 | ```javascript
142 | // utils.js
143 | /**
144 |  * @param {unknown} value
145 |  * @returns {boolean}
146 |  */
147 | export function isString(value) {
148 |   return typeof value === "string";
149 | }
150 | 
151 | /**
152 |  * @param {unknown} value
153 |  * @returns {boolean}
154 |  */
155 | export function isNumber(value) {
156 |   return typeof value === "number" && !isNaN(value);
157 | }
158 | ```
159 | 
160 | ### ✅ GOOD: Custom Type Guards for Complex Objects
161 | 
162 | For interfaces or complex object shapes, create custom functions that perform runtime checks and act as type predicates.
163 | 
164 | ```typescript
165 | // types.d.ts or types.ts
166 | interface Product {
167 |   id: string;
168 |   name: string;
169 |   price: number;
170 | }
171 | 
172 | // Custom type guard (can be in a .ts file, or its logic used directly in .js)
173 | /**
174 |  * @param {unknown} obj
175 |  * @returns {obj is Product}
176 |  */
177 | function isProduct(obj) {
178 |   return (
179 |     typeof obj === "object" &&
180 |     obj !== null &&
181 |     "id" in obj &&
182 |     typeof obj.id === "string" &&
183 |     "name" in obj &&
184 |     typeof obj.name === "string" &&
185 |     "price" in obj &&
186 |     typeof obj.price === "number"
187 |   );
188 | }
189 | ```
190 | 
191 | ```javascript
192 | // api-client.js
193 | /**
194 |  * @typedef {import('./types').Product} Product
195 |  * @type {typeof import('./types').isProduct}
196 |  */
197 | import { isProduct } from "./types"; // Assuming isProduct is exported from types.ts/d.ts
198 | 
199 | /**
200 |  * @param {unknown} apiResponse
201 |  */
202 | export function handleApiResponse(apiResponse) {
203 |   if (isProduct(apiResponse)) {
204 |     // TypeScript now knows apiResponse is Product here
205 |     console.log(`Fetched product: ${apiResponse.name} at $${apiResponse.price}`);
206 |   } else {
207 |     console.error("API response is not a valid Product:", apiResponse);
208 |   }
209 | }
210 | ```
211 | 
212 | ## 5. Prefer Union Types over Traditional Enums
213 | 
214 | For simple sets of related constants, strict literal union types (`"admin" | "user"`) are generally preferred over TypeScript's `enum` keyword because they offer better type safety and simpler runtime representation. If you must use enums, prefer `const enum` or string enums.
215 | 
216 | ### ❌ BAD: Numeric Enums
217 | 
218 | ```typescript
219 | // In a .ts file or JSDoc
220 | enum UserStatus {
221 |   Active, // 0
222 |   Inactive, // 1
223 |   Pending, // 2
224 | }
225 | // Problem: Can be assigned any number at runtime, e.g., UserStatus.Active = 99
226 | ```
227 | 
228 | ### ✅ GOOD: String Literal Unions or `const enum`
229 | 
230 | ```typescript
231 | // types.d.ts or types.ts
232 | /** @typedef {'active' | 'inactive' | 'pending'} UserStatus */
233 | // Or using native TS:
234 | type UserStatus = "active" | "inactive" | "pending";
235 | 
236 | // If an enum is truly necessary, use a const string enum for compile-time safety and runtime efficiency:
237 | const enum UserRole {
238 |   Admin = "admin",
239 |   User = "user",
240 |   Guest = "guest",
241 | }
242 | ```
243 | 
244 | ```javascript
245 | // user-management.js
246 | /**
247 |  * @typedef {import('./types').UserStatus} UserStatus
248 |  */
249 | 
250 | /**
251 |  * @param {UserStatus} status
252 |  */
253 | export function updateUserStatus(status) {
254 |   console.log(`User status updated to: ${status}`);
255 | }
256 | 
257 | updateUserStatus("active");
258 | // updateUserStatus('invalid'); // Type error
259 | ```
260 | 
261 | ## 6. Use Generics for Reusable Components/Functions
262 | 
263 | Generics allow you to write flexible and reusable code that works with a variety of types while maintaining type safety.
264 | 
265 | ```javascript
266 | // utils.js
267 | /**
268 |  * @template T
269 |  * @param {T} arg
270 |  * @returns {T}
271 |  */
272 | export function identity(arg) {
273 |   return arg;
274 | }
275 | 
276 | const num = identity(123); // num is inferred as number
277 | const str = identity("hello"); // str is inferred as string
278 | 
279 | // With constraints (requires native TS syntax or complex JSDoc)
280 | // For complex generics with constraints, consider writing them in a .ts file
281 | // and importing their JSDoc type definitions.
282 | ```
283 | 
284 | ## 7. Enforce Consistent Code Organization
285 | 
286 | Maintainable codebases rely on clear structure.
287 | 
288 | ### ✅ GOOD: Named Exports (No Default Exports)
289 | 
290 | Named exports promote explicit imports and make refactoring easier. Avoid default exports entirely.
291 | 
292 | ```javascript
293 | // user-service.js
294 | // ❌ BAD: default export
295 | // export default class UserService { /* ... */ }
296 | 
297 | // ✅ GOOD: named export
298 | export class UserService {
299 |   /* ... */
300 | }
301 | export const DEFAULT_USER = {
302 |   /* ... */
303 | };
304 | ```
305 | 
306 | ### ✅ GOOD: Organized Imports
307 | 
308 | Group imports by type (e.g., library, absolute path, relative path) and sort them alphabetically. Use path aliases for cleaner imports from deeply nested modules.
309 | 
310 | ```javascript
311 | // some-component.jsx
312 | import React from "react"; // Library imports
313 | import { useSelector } from "react-redux";
314 | 
315 | import { API_URL } from "config/constants"; // Absolute imports (e.g., using path aliases)
316 | import { selectUser } from "store/selectors";
317 | 
318 | import { Button } from "./components/Button"; // Relative imports
319 | import { formatCurrency } from "../utils/formatters";
320 | ```
321 | 
322 | ##

</file_content>

<file_content path=".bob/rules/vitest-rules.md">
  1 | ---
  2 | description: This guide provides opinionated, actionable best practices for writing fast, reliable, and maintainable unit and integration tests using Vitest in modern JavaScript and TypeScript projects.
  3 | globs: **/*.{js,ts,jsx,tsx}
  4 | ---
  5 | 
  6 | # Vitest Best Practices
  7 | 
  8 | Vitest is the definitive testing framework for our Vite-powered projects. It offers a fast, Jest-compatible API with deep integration into the Vite ecosystem. Adhering to these guidelines ensures our tests are robust, performant, and easy to maintain.
  9 | 
 10 | ## 1. Code Organization & Naming
 11 | 
 12 | **Always co-locate test files with their source.** This improves discoverability and ensures tests are updated alongside their implementation.
 13 | 
 14 | - **File Naming**: Use `*.test.{ts,tsx,js,jsx}`.
 15 | - **Location**: Place test files directly next to the component or module they test.
 16 | 
 17 | ❌ BAD:
 18 | 
 19 | ```
 20 | // src/components/Button/Button.tsx
 21 | // tests/components/Button.test.tsx
 22 | ```
 23 | 
 24 | ✅ GOOD:
 25 | 
 26 | ```typescript
 27 | // src/components/Button/Button.tsx
 28 | // src/components/Button/Button.test.tsx
 29 | ```
 30 | 
 31 | ## 2. Test Structure & Isolation
 32 | 
 33 | **Organize tests logically using `describe` and `it` (or `test`) blocks.** Ensure each test is isolated and deterministic.
 34 | 
 35 | - **`describe`**: Group related tests into suites.
 36 | - **`it` / `test`**: Define individual test cases. Prefer `it` for consistency with Jest.
 37 | - **Hooks (`beforeEach`, `afterEach`)**: Use these for setup and teardown to ensure test isolation.
 38 | 
 39 | ❌ BAD: (Shared state, no cleanup)
 40 | 
 41 | ```typescript
 42 | let user;
 43 | test("creates user", () => {
 44 |   user = createUser();
 45 |   expect(user).toBeDefined();
 46 | });
 47 | test("updates user", () => {
 48 |   // Depends on previous test
 49 |   user.name = "New Name";
 50 |   expect(user.name).toBe("New Name");
 51 | });
 52 | ```
 53 | 
 54 | ✅ GOOD: (Isolated tests with hooks)
 55 | 
 56 | ```typescript
 57 | import { describe, it, expect, beforeEach, afterEach } from "vitest";
 58 | import { createUser, deleteUser } from "./user-service";
 59 | 
 60 | describe("User Service", () => {
 61 |   let user;
 62 | 
 63 |   beforeEach(() => {
 64 |     user = createUser(); // Create a fresh user for each test
 65 |   });
 66 | 
 67 |   afterEach(() => {
 68 |     deleteUser(user.id); // Clean up after each test
 69 |   });
 70 | 
 71 |   it("should create a user", () => {
 72 |     expect(user).toBeDefined();
 73 |     expect(user.id).toBeTypeOf("string");
 74 |   });
 75 | 
 76 |   it("should update a user", () => {
 77 |     user.name = "Jane Doe";
 78 |     expect(user.name).toBe("Jane Doe");
 79 |   });
 80 | });
 81 | ```
 82 | 
 83 | ## 3. Asynchronous Testing with `vi.waitFor`
 84 | 
 85 | **Always use `vi.waitFor` for polling conditions in asynchronous tests.** Avoid arbitrary `setTimeout` calls or manual polling loops. `vi.waitFor` is designed for reliable synchronization.
 86 | 
 87 | ❌ BAD: (Flaky, relies on arbitrary timeout)
 88 | 
 89 | ```typescript
 90 | test("data loads after delay", async () => {
 91 |   let data = null;
 92 |   fetchData().then((res) => (data = res));
 93 |   await new Promise((resolve) => setTimeout(resolve, 100)); // Arbitrary wait
 94 |   expect(data).toEqual("some data");
 95 | });
 96 | ```
 97 | 
 98 | ✅ GOOD: (Reliable polling with `vi.waitFor`)
 99 | 
100 | ```typescript
101 | import { it, expect, vi } from "vitest";
102 | import { fetchData } from "./api"; // Assume fetchData returns a Promise
103 | 
104 | it("should load data after delay", async () => {
105 |   let data = null;
106 |   fetchData().then((res) => (data = res));
107 | 
108 |   // Polls until data is not null, with a 2-second timeout
109 |   await vi.waitFor(() => expect(data).not.toBeNull(), { timeout: 2000 });
110 | 
111 |   expect(data).toEqual("some data");
112 | });
113 | ```
114 | 
115 | ## 4. Mocking Strategies
116 | 
117 | **Leverage Vitest's `vi` API for all mocking.** This provides Jest-compatible syntax and seamless integration. Always clean up mocks after each test.
118 | 
119 | - **`vi.fn()`**: Mock individual functions.
120 | - **`vi.spyOn()`**: Spy on existing object methods.
121 | - **`vi.mock()`**: Mock entire modules.
122 | 
123 | ### Function Mocking
124 | 
125 | ❌ BAD: (Manual mock, no easy reset)
126 | 
127 | ```typescript
128 | const originalFetch = global.fetch;
129 | global.fetch = () => Promise.resolve({ json: () => ({ id: 1 }) });
130 | // ... test ...
131 | global.fetch = originalFetch; // Easy to forget cleanup
132 | ```
133 | 
134 | ✅ GOOD: (Using `vi.fn` with `afterEach` cleanup)
135 | 
136 | ```typescript
137 | import { it, expect, vi, afterEach } from "vitest";
138 | import { getUser } from "./user-api";
139 | 
140 | // Mock the module containing fetchUser
141 | vi.mock("./user-api", async (importOriginal) => {
142 |   const mod = await importOriginal();
143 |   return {
144 |     ...mod,
145 |     fetchUser: vi.fn(), // Mock specific function within the module
146 |   };
147 | });
148 | 
149 | // Import the mocked function after vi.mock
150 | import { fetchUser } from "./user-api";
151 | 
152 | afterEach(() => {
153 |   vi.clearAllMocks(); // Clear mock calls after each test to prevent state leakage
154 | });
155 | 
156 | it("should fetch user data", async () => {
157 |   fetchUser.mockResolvedValueOnce({ id: 1, name: "Test User" });
158 |   const user = await getUser(1);
159 |   expect(fetchUser).toHaveBeenCalledWith(1);
160 |   expect(user.name).toBe("Test User");
161 | });
162 | ```
163 | 
164 | ### Module Mocking
165 | 
166 | **Mock modules at the top of the file.** This ensures the mock is applied before the module under test imports it.
167 | 
168 | ✅ GOOD: (Module mock before imports)
169 | 
170 | ```typescript
171 | import { vi, it, expect } from "vitest";
172 | 
173 | // Mock the entire 'lodash' module to control its behavior
174 | vi.mock("lodash", () => ({
175 |   debounce: vi.fn((fn) => fn), // Mock debounce to execute immediately
176 | }));
177 | 
178 | import { debounce } from "lodash"; // Import the mocked debounce
179 | import { saveInput } from "./input-handler"; // Module using debounce
180 | 
181 | it("should call save function without debounce delay", () => {
182 |   saveInput("test");
183 |   expect(debounce).toHaveBeenCalledOnce();
184 | });
185 | ```
186 | 
187 | ## 5. DOM Environment & Component Testing
188 | 
189 | **Use `happy-dom` for lightweight DOM environments.** It's generally faster and sufficient for most component tests. Switch to `jsdom` only if specific browser APIs are missing in `happy-dom`.
190 | 
191 | - Configure in `vite.config.ts` or `vitest.config.ts`.
192 | 
193 | ✅ GOOD: (Configuring `happy-dom`)
194 | 
195 | ```typescript
196 | // vite.config.ts or vitest.config.ts
197 | import { defineConfig } from "vitest/config";
198 | 
199 | export default defineConfig({
200 |   test: {
201 |     environment: "happy-dom", // Use happy-dom for faster DOM mocking
202 |     globals: true, // Auto-import test APIs globally (e.g., describe, it, expect)
203 |   },
204 | });
205 | ```
206 | 
207 | ## 6. Performance & Concurrent Tests
208 | 
209 | **Utilize `.concurrent` for tests that can run in parallel.** This significantly speeds up test suites where tests are independent.
210 | 
211 | - Use `it.concurrent` for individual tests.
212 | - Use `describe.concurrent` for entire suites.
213 | - **Important**: When using `.concurrent`, always destructure `expect` from the test context to avoid issues with snapshot and assertion tracking.
214 | 
215 | ❌ BAD: (Sequential tests, slow)
216 | 
217 | ```typescript
218 | describe("My Feature", () => {
219 |   it("test A", async () => {
220 |     /* ... */
221 |   });
222 |   it("test B", async () => {
223 |     /* ... */
224 |   });
225 | });
226 | ```
227 | 
228 | ✅ GOOD: (Concurrent tests, faster)
229 | 
230 | ```typescript
231 | import { describe, it } from "vitest";
232 | 
233 | describe.concurrent("My Feature", () => {
234 |   it("test A", async ({ expect }) => {
235 |     // Destructure expect for concurrent tests
236 |     expect(1).toBe(1);
237 |   });
238 | 
239 |   it.concurrent("test B", async ({ expect }) => {
240 |     // Destructure expect
241 |     expect(2).toBe(2);
242 |   });
243 | });
244 | ```
245 | 
246 | ## 7. Code Coverage
247 | 
248 | **Enable V8-based code coverage.** It offers near-zero overhead and integrates seamlessly.
249 | 
250 | - Add `coverage` configuration to `vite.config.ts` or `vitest.config.ts`.
251 | - Run with `vitest run --coverage`.
252 | 
253 | ✅ GOOD: (V8 coverage configuration)
254 | 
255 | ```typescript
256 | // vite.config.ts or vitest.config.ts
257 | import { defineConfig } from "vitest/config";
258 | 
259 | export default defineConfig({
260 |   test: {
261 |     environment: "happy-dom",
262 |     globals: true,
263 |     coverage: {
264 |       provider: "v8", // Use V8 for native, fast coverage
265 |       reporter: ["text", "json", "html"], // Output formats for reports
266 |       exclude: ["node_modules/", "dist/", ".eslintrc.cjs"], // Exclude common directories from coverage
267 |     },
268 |   },
269 | });
270 | ```

</file_content>

<file_content path=".bob/rules/zustard-rules.md">
  1 | ---
  2 | description: Definitive guidelines for using Zustand in React projects, focusing on type safety, modularity, performance, and maintainability with practical code examples.
  3 | globs: **/*.{js,jsx}
  4 | ---
  5 | 
  6 | # zustand Best Practices
  7 | 
  8 | Zustand is our go-to for global state management due to its minimal API and built-in performance optimizations. This guide outlines the definitive patterns for using Zustand effectively in our projects, ensuring type safety, modularity, and optimal performance.
  9 | 
 10 | ## 1. Typed Store Shape (TypeScript First)
 11 | 
 12 | Always define explicit TypeScript interfaces for your store's state and actions. This provides invaluable type safety and auto-completion across the application, preventing common runtime errors.
 13 | 
 14 | ❌ BAD: Untyped store, prone to runtime errors
 15 | 
 16 | ```typescript
 17 | import { create } from "zustand";
 18 | 
 19 | const useStore = create((set) => ({
 20 |   count: 0,
 21 |   increment: () => set((state) => ({ count: state.count + 1 })),
 22 | }));
 23 | ```
 24 | 
 25 | ✅ GOOD: Fully typed store for robust development
 26 | 
 27 | ```typescript
 28 | import { create } from "zustand";
 29 | 
 30 | interface CounterState {
 31 |   count: number;
 32 |   increment: () => void;
 33 |   decrement: () => void;
 34 | }
 35 | 
 36 | const useCounterStore = create<CounterState>((set) => ({
 37 |   count: 0,
 38 |   increment: () => set((state) => ({ count: state.count + 1 })),
 39 |   decrement: () => set((state) => ({ count: state.count - 1 })),
 40 | }));
 41 | ```
 42 | 
 43 | ## 2. Slice-Based Organization
 44 | 
 45 | For scalable applications, organize your store into logical "slices" (e.g., `authSlice`, `uiSlice`). This keeps concerns separated, improves readability, and makes testing easier. Compose these slices into a single root store.
 46 | 
 47 | `src/store/types.ts`:
 48 | 
 49 | ```typescript
 50 | import { StateCreator } from "zustand";
 51 | 
 52 | // Define individual slice interfaces
 53 | export interface AuthSlice {
 54 |   user: { id: string; name: string } | null;
 55 |   token: string | null;
 56 |   login: (user: { id: string; name: string }, token: string) => void;
 57 |   logout: () => void;
 58 | }
 59 | 
 60 | export interface UISlice {
 61 |   isLoading: boolean;
 62 |   setLoading: (loading: boolean) => void;
 63 | }
 64 | 
 65 | // Combine all slice interfaces into the global AppState
 66 | export type AppState = AuthSlice & UISlice;
 67 | 
 68 | // Type for creating slices that will be composed into AppState
 69 | export type AppStateCreator<T> = StateCreator<AppState, [], [], T>;
 70 | ```
 71 | 
 72 | `src/store/slices/createAuthSlice.ts`:
 73 | 
 74 | ```typescript
 75 | import { AppStateCreator, AuthSlice } from "../types";
 76 | 
 77 | export const createAuthSlice: AppStateCreator<AuthSlice> = (set) => ({
 78 |   user: null,
 79 |   token: null,
 80 |   login: (user, token) => set({ user, token }),
 81 |   logout: () => set({ user: null, token: null }),
 82 | });
 83 | ```
 84 | 
 85 | `src/store/slices/createUISlice.ts`:
 86 | 
 87 | ```typescript
 88 | import { AppStateCreator, UISlice } from "../types";
 89 | 
 90 | export const createUISlice: AppStateCreator<UISlice> = (set) => ({
 91 |   isLoading: false,
 92 |   setLoading: (loading) => set({ isLoading: loading }),
 93 | });
 94 | ```
 95 | 
 96 | `src/store/useAppStore.ts`:
 97 | 
 98 | ```typescript
 99 | import { create } from "zustand";
100 | import { AppState } from "./types";
101 | import { createAuthSlice } from "./slices/createAuthSlice";
102 | import { createUISlice } from "./slices/createUISlice";
103 | 
104 | export const useAppStore = create<AppState>()((...a) => ({
105 |   ...createAuthSlice(...a),
106 |   ...createUISlice(...a),
107 | }));
108 | ```
109 | 
110 | ## 3. Naming Conventions
111 | 
112 | Follow consistent naming for clarity and discoverability.
113 | 
114 | - **Store Hook**: `use[Feature]Store` or `useAppStore` for the root.
115 | - **Actions**: Verb-oriented (e.g., `increment`, `setUser`, `fetchData`).
116 | - **Store Files**: Located under `src/store/` or `src/features/[feature]/store.ts`.
117 | - **Exports**: Only export the custom hook, never the raw `create` object.
118 | 
119 | ❌ BAD: Inconsistent naming, exposing raw store
120 | 
121 | ```typescript
122 | // store.js
123 | export const myStore = create(...); // Exposes raw store
124 | export const useMyStore = myStore; // Bad naming, use `useMyStore` as the primary hook
125 | 
126 | // component.jsx
127 | myStore.setState({ ... }); // Direct mutation outside hook, bypasses React lifecycle
128 | ```
129 | 
130 | ✅ GOOD: Clear, consistent, and encapsulated
131 | 
132 | ```typescript
133 | // src/store/useAppStore.ts
134 | export const useAppStore = create<AppState>(...);
135 | 
136 | // src/features/auth/useAuthStore.ts (if using feature-specific stores)
137 | export const useAuthStore = create<AuthSlice>(...);
138 | 
139 | // component.tsx
140 | import { useAppStore } from 'src/store/useAppStore';
141 | const { user, login } = useAppStore();
142 | ```
143 | 
144 | ## 4. Functional Updates to Prevent Stale Closures
145 | 
146 | Always use functional updates (`set(state => ...)`) when an action's new state depends on the current state. This prevents issues with stale closures in asynchronous operations or rapid updates.
147 | 
148 | ❌ BAD: Potential stale closure, especially in async operations
149 | 
150 | ```typescript
151 | const useCounterStore = create<CounterState>((set, get) => ({
152 |   count: 0,
153 |   // ...
154 |   incrementAsync: async () => {
155 |     await someAsyncOperation();
156 |     const currentCount = get().count; // 'currentCount' might be outdated if another update occurred
157 |     set({ count: currentCount + 1 });
158 |   },
159 | }));
160 | ```
161 | 
162 | ✅ GOOD: Robust functional update, `state` is always the latest
163 | 
164 | ```typescript
165 | const useCounterStore = create<CounterState>((set) => ({
166 |   count: 0,
167 |   // ...
168 |   incrementAsync: async () => {
169 |     await someAsyncOperation();
170 |     set((state) => ({ count: state.count + 1 }));
171 |   },
172 | }));
173 | ```
174 | 
175 | ## 5. Selectors and Shallow Comparison for Performance
176 | 
177 | Consume only the necessary parts of the state using selectors. For objects or arrays, use `shallow` (or a custom equality function) to prevent unnecessary re-renders when only nested properties change.
178 | 
179 | ❌ BAD: Re-renders component on any state change in the store
180 | 
181 | ```typescript
182 | const MyComponent = () => {
183 |   const { user, token } = useAppStore(); // Re-renders if any part of AppState changes
184 |   // ...
185 | };
186 | ```
187 | 
188 | ✅ GOOD: Optimized re-renders with selectors and `shallow`
189 | 
190 | ```typescript
191 | import { shallow } from "zustand/shallow";
192 | import { useAppStore } from "src/store/useAppStore";
193 | 
194 | const UserProfile = () => {
195 |   // Only re-renders if user.name or user.email changes
196 |   const { name, email } = useAppStore(
197 |     (state) => ({ name: state.user?.name, email: state.user?.email }),
198 |     shallow
199 |   );
200 |   // ...
201 | };
202 | 
203 | const AuthStatus = () => {
204 |   // Only re-renders if token changes
205 |   const token = useAppStore((state) => state.token);
206 |   // ...
207 | };
208 | ```
209 | 
210 | ## 6. Essential Middleware Usage
211 | 
212 | Leverage Zustand's middleware for common concerns like persistence, devtools integration, and immutable updates.
213 | 
214 | - **`persist`**: For local storage or IndexedDB. Always provide a `name` and consider `version` for migrations.
215 | - **`devtools`**: Integrate with Redux DevTools. Enable only in development.
216 | - **`immer`**: For simplified immutable updates, especially with deeply nested objects.
217 | 
218 | ```typescript
219 | import { create } from "zustand";
220 | import { persist, devtools, createJSONStorage } from "zustand/middleware";
221 | import { immer } from "zustand/middleware/immer";
222 | 
223 | interface SettingsState {
224 |   theme: "light" | "dark";
225 |   notifications: { enabled: boolean; sound: boolean };
226 |   setTheme: (theme: "light" | "dark") => void;
227 |   toggleNotifications: () => void;
228 |   toggleNotificationSound: () => void;
229 | }
230 | 
231 | const useSettingsStore = create<SettingsState>()(
232 |   devtools(
233 |     // Enable devtools for debugging
234 |     persist(
235 |       // Persist state to storage
236 |       immer((set) => ({
237 |         // Use immer for easier immutable updates
238 |         theme: "light",
239 |         notifications: { enabled: true, sound: true },
240 |         setTheme: (theme) => set({ theme }),
241 |         toggleNotifications: () =>
242 |           set((state) => {
243 |             state.notifications.enabled = !state.notifications.enabled; // Direct mutation with immer
244 |           }),
245 |         toggleNotificationSound: () =>
246 |           set((state) => {
247 |             state.notifications.sound = !state.notifications.sound; // Direct mutation with immer
248 |           }),
249 |       })),
250 |       {
251 |         name: "app-settings", // Unique name for storage key
252 |         storage: createJSONStorage(() => localStorage), // Choose storage type
253 |         version: 1, // Crucial for future migrations
254 |         partialize: (state) => ({ theme: state.theme }), // Only persist 'theme'
255 |       }
256 |     ),
257 |     { name: "Settings Store", enabled: process.env.NODE_ENV === "development" } // Devtools options
258 |   )
259 | );
260 | ```
261 | 
262 | ## 7. Initializing Stores Outside Components
263 | 
264 | Declare your `create` calls at the module level (top of the file) to ensure a single, consistent store instance across your application. Never call `create` inside a React component.
265 | 
266 | ❌ BAD: Creates new store instance on every render
267 | 
268 | ```typescript
269 | const MyComponent = () => {
270 |   // This creates a NEW store instance every time MyComponent re-renders!
271 |   const useLocalStore = create(() => ({ value: 0 }));
272 |   const value = useLocalStore((state) => state.value);
273 |   return <div>{value}</div>;
274 | };
275 | ```
276 | 
277 | ✅ GOOD: Single store instance, declared once
278 | 
279 | ```typescript
280 | // At the top of your store file (e.g., src/store/useCounterStore.ts)
281 | const useCounterStore = create<CounterState>((set) => ({
282 |   count: 0,
283 |   increment: () => set((state) => ({ count: state.count + 1 })),
284 | }));
285 | 
286 | const MyComponent = () => {
287 |   const count = useCounterStore((state) => state.count);
288 |   return <div>{count}</div>;
289 | };
290 | ```
291 | 
292 | ## 8. Asynchronous Actions
293 | 
294 | Handle asynchronous operations directly within your store actions. Zustand doesn't require special middleware for async, keeping the API simple and direct.
295 | 
296 | ```typescript
297 | interface UserState {
298 |   user: { id: string; name: string } | null;
299 |   loading: boolean;
300 |   error: string | null;
301 |   fetchUser: (userId: string) => Promise<void>;
302 | }
303 | 
304 | const useUserStore = create<UserState>((set) => ({
305 |   user: null,
306 |   loading: false,
307 |   error: null,
308 |   fetchUser: async (userId) => {
309 |     set({ loading: true, error: null });
310 |     try {
311 |       const response = await fetch(`/api/users/${userId}`);
312 |       if (!response.ok) throw new Error('Failed
313 | ```

</file_content>
</file_content>

<file_content path=".bob/skills">
├── developer/
├── planner/
├── qa/
└── support/
</file_content>
<environment_details>
# VSCode Visible Files
app/page.tsx

# VSCode Open Tabs
app/page.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-02T15:23:33.973Z
User time zone: Asia/Bangkok, UTC+7:00

# Current Cost
$0.00

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>


# Current Workspace Directory (/home/oakar/Projects/Dawlance) Files
.gitignore
.prettierignore
.prettierrc
AGENTS.md
bun.lock
eslint.config.mjs
IBM-Bob-Dev-Day-hackathon-guide.pdf
next.config.ts
package-lock.json
package.json
postcss.config.mjs
PROGRESS.md
README.md
skills-lock.json
tailwind.config.ts
tsconfig.json
vitest.config.ts
.agents/
.bob/
.storybook/
app/
app/favicon.ico
app/globals.css
app/layout.tsx
app/page.tsx
components/
components/layout/
components/layout/BottomNav.tsx
components/layout/ErrorBoundary.test.tsx
components/layout/ErrorBoundary.tsx
components/layout/Footer.tsx
components/layout/Header.tsx
components/layout/index.ts
components/layout/ProgressIndicator.tsx
components/layout/Sidebar.tsx
components/ui/
components/ui/Badge.stories.tsx
components/ui/Badge.tsx
components/ui/Button.stories.tsx
components/ui/Button.test.tsx
components/ui/Button.tsx
components/ui/Card.stories.tsx
components/ui/Card.tsx
components/ui/Chip.stories.tsx
components/ui/Chip.test.tsx
components/ui/Chip.tsx
components/ui/DatePicker.stories.tsx
components/ui/DatePicker.tsx
components/ui/index.ts
components/ui/Input.stories.tsx
components/ui/Input.test.tsx
components/ui/Input.tsx
components/ui/LoadingSpinner.stories.tsx
components/ui/LoadingSpinner.tsx
components/ui/Modal.stories.tsx
components/ui/Modal.tsx
components/ui/Select.stories.tsx
components/ui/Select.tsx
components/ui/Slider.stories.tsx
components/ui/Slider.tsx
components/ui/Tabs.stories.tsx
components/ui/Tabs.tsx
lib/
lib/mocks/
lib/mocks/handlers.ts
lib/mocks/index.ts
lib/mocks/server.ts
lib/providers/
lib/providers/index.ts
lib/providers/query-provider.tsx
lib/stores/
lib/stores/ai-store.test.ts
lib/stores/ai-store.ts
lib/stores/form-store.test.ts
lib/stores/form-store.ts
lib/stores/index.ts
lib/stores/itinerary-store.test.ts
lib/stores/itinerary-store.ts
lib/stores/reset-stores.ts
lib/stores/selection-store.test.ts
lib/stores/selection-store.ts
lib/test-utils/
lib/test-utils/index.ts
lib/test-utils/render.tsx
lib/test-utils/setup.ts
lib/types/
lib/types/ai.ts
lib/types/destination.ts
lib/types/error.ts
lib/types/index.ts
lib/types/itinerary.ts
lib/types/preferences.ts
lib/types/recommendation.ts
lib/types/weather.ts
lib/utils/
lib/utils/cn.ts
lib/utils/index.ts
lib/validations/
lib/validations/destination.schema.test.ts
lib/validations/destination.schema.ts
lib/validations/index.ts
lib/validations/preferences.schema.test.ts
lib/validations/preferences.schema.ts
plan/
plan/00-overview.md
plan/phase-01-foundation.md
plan/phase-02-landing.md
plan/phase-03-weather-prefs.md
plan/phase-04-recommendations.md
plan/phase-05-itinerary-gen.md
plan/phase-06-ai-chat.md
plan/phase-07-editing.md
plan/phase-08-advanced.md
plan/phase-09-testing.md
plan/phase-10-deployment.md
public/
public/ai-avatar.svg
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
You have not created a todo list yet. Create one with `update_todo_list` if your task is complicated or involves multiple steps.
</environment_details>

---

**Assistant:**

# Conversation Summary

## 1. Previous Conversation
The user is building a Smart Travel Planning Application using Next.js 14+ with App Router, React, TypeScript, and Tailwind CSS. The project follows a phased implementation plan outlined in `plan/00-overview.md`. Phase 1 (Foundation) was completed, establishing core architecture including Zustand stores, TypeScript types, Zod validation schemas, and base UI components.

## 2. Current Work
Working on **Phase 2: Landing Page & Onboarding**. The user has been providing critical feedback about text contrast issues throughout multiple iterations.

### Critical Issue: Text Contrast Problems
The user repeatedly flagged that text was too light and unreadable:
- **First feedback**: "light text on white background"
- **Second feedback**: "gray text everywhere", "can't read the text"
- **Third feedback** (with screenshot): "?? What are you doing, i am telling you to fix the text color and style?"

The screenshot clearly shows:
- "Why Choose Our AI Travel Planner?" heading is very light gray (nearly invisible)
- Feature card titles ("Lightning Fast", "Personalized", "Fully Flexible") are too light
- Feature descriptions are too light gray
- "How It Works" heading is very light
- Step descriptions are too light

### Most Recent Action
Just updated `app/page.tsx` (367 lines) to fix ALL text contrast issues:
- Changed ALL section headings from light gray to **`text-black`**
- Changed ALL body text from gray to **`text-black`**
- Changed ALL feature card text to **`text-black`**
- Changed ALL step descriptions to **`text-black`**
- Kept white text only on blue gradient backgrounds (hero, social proof)
- Removed all emojis, using only professional SVG icons

### Side Task: TypeScript Errors in DestinationForm
While fixing contrast, also resolved TypeScript errors in `components/forms/DestinationForm.tsx`:
- Issue: React Hook Form type mismatch with Zod's `z.coerce.date()`
- Solution: Created separate `DestinationFormInput` type with string dates, then parse with Zod schema in `onSubmit`
- Fixed unused import ESLint error

## 3. Key Technical Concepts
- **Next.js 14+ App Router**: Server Components by default, Client Components for interactivity
- **React Hook Form**: Form handling with `zodResolver` for Zod validation
- **Zod validation**: `z.coerce.date()` coerces string inputs to Date objects
- **Type handling**: Separate input types (strings) from validated types (Dates) for HTML date inputs
- **Design System Colors**:
  - Primary: #2A7BFF (blue)
  - Secondary: #6DD3B0 (mint green)
  - Tertiary: #FF8C42 (orange)
  - **CRITICAL**: Text must be **BLACK (`text-black`)** on light backgrounds, **WHITE** on dark backgrounds
- **Typography**: Plus Jakarta Sans (headlines), Be Vietnam Pro (body)
- **Accessibility**: WCAG AAA contrast ratios, semantic HTML, no emojis
- **Professional Design**: SVG icons only, proper shadows, hover effects

## 4. Relevant Files and Code

### app/page.tsx (367 lines) - JUST UPDATED
**Critical changes for contrast:**
```tsx
// ALL headings now use text-black
<h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
  Why Choose Our AI Travel Planner?
</h2>

// ALL body text now uses text-black
<p className="text-xl text-black max-w-3xl mx-auto">
  Experience the future of travel planning
</p>

// Feature card titles - text-black
<h3 className="text-2xl font-bold text-black mb-4">Lightning Fast</h3>

// Feature descriptions - text-black
<p className="text-black leading-relaxed">
  Get a complete travel itinerary in minutes
</p>

// Step titles - text-black
<h3 className="text-lg font-bold text-black text-center mb-2">Step 1</h3>

// Step descriptions - text-black
<p className="text-black text-center text-sm">Tell us where you want to go</p>
```

### components/forms/DestinationForm.tsx (206 lines) - FIXED
**TypeScript fix for date handling:**
```typescript
// Separate input type for HTML strings
type DestinationFormInput = {
  destination: string;
  startDate: string;  // HTML date input returns string
  endDate: string;
};

// Form uses input type
const { register, handleSubmit, formState: { errors } } = useForm<DestinationFormInput>({
  resolver: zodResolver(destinationSchema),
  defaultValues: {
    destination: "",
    startDate: "",
    endDate: "",
  },
});

// Parse with Zod to get Date objects
const onSubmit: SubmitHandler<DestinationFormInput> = async (data) => {
  const validatedData = destinationSchema.parse(data); // Coerces to Dates
  updateDestination({
    destination: validatedData.destination,
    startDate: validatedData.startDate,  // Now Date type
    endDate: validatedData.endDate,
  });
};
```

### Other Phase 2 Files (Complete):
- **app/plan/destination/page.tsx** (42 lines) - All text uses `text-black`
- **components/layout/ProgressIndicator.tsx** (Complete)
- **components/forms/index.ts** (Barrel export)

## 5. Problem Solving

### Issue 1: Severe Text Contrast Problems (CRITICAL - Multiple Iterations)
- **Problem**: User repeatedly reported text was unreadable - "light text on white background", "gray text everywhere", "can't read the text"
- **Root Cause**: Used `text-gray-300`, `text-gray-400`, `text-gray-600` throughout, which appeared too light on white backgrounds
- **Failed Attempts**: 
  - First try: Changed to `text-gray-900` (still too light)
  - Second try: Changed to `text-black` but missed many instances
- **Final Solution**: Changed EVERY text element to `text-black` on light backgrounds, `text-white` on dark backgrounds
- **Files Fixed**: `app/page.tsx` (just updated), `app/plan/destination/page.tsx`, `components/forms/DestinationForm.tsx`

### Issue 2: TypeScript Type Mismatch with Date Inputs
- **Problem**: React Hook Form expected Date types but HTML date inputs return strings
- **Root Cause**: Zod's `z.coerce.date()` coerces at validation time, not at form registration time
- **Solution**: Created separate `DestinationFormInput` type with string dates, then parse with Zod in `onSubmit` handler
- **File Fixed**: `components/forms/DestinationForm.tsx`

### Issue 3: Unprofessional Emojis
- **Problem**: User feedback: "no emoji, no real professional app use emoji"
- **Solution**: Replaced all emojis with professional SVG icons
- **Files Fixed**: All Phase 2 files

## 6. Pending Tasks and Next Steps

### Current Status:
**Phase 2 is ALMOST complete** - just fixed all text contrast issues in `app/page.tsx` (367 lines).

**Immediate next step**: User needs to verify the contrast fixes are now correct.

### Completed in Phase 2:
✅ Landing page structure with travel theme
✅ Hero section with gradient and SVG illustration
✅ Feature cards section
✅ How It Works 5-step process
✅ Social proof section
✅ DestinationForm with React Hook Form + Zod
✅ Destination page with ProgressIndicator
✅ FormStore integration
✅ Responsive mobile-first design
✅ **ALL TEXT NOW USES `text-black` ON LIGHT BACKGROUNDS** (just fixed)
✅ Professional SVG icons (no emojis)
✅ TypeScript errors resolved

### Awaiting User Verification:
The user provided a screenshot showing severe contrast issues. I just updated `app/page.tsx` to fix ALL text to use `text-black` on light backgrounds. User needs to verify this resolves the contrast problems before proceeding.

### Next Phase (Phase 3 - Weather & Preferences):
Once Phase 2 is confirmed complete:
1. Create weather API route (`/api/weather`)
2. Build WeatherCard component
3. Create ClothingRecommendations component (rule-based)
4. Build PreferencesForm with visual selectors
5. Create weather and preferences pages
6. Integrate with PreferencesStore

**Direct quote from user's original instruction:**
> "we have finished phase 1 in planning please continue with phase 2 please. only do phases 2."

Phase 2 text contrast issues have been addressed in the latest update to `app/page.tsx`.

---

**User:**

[write_to_file for 'app/page.tsx'] Result:
The tool execution failed with the following error:
<error>
Content appears to be truncated (file has 289 lines but was predicted to have 367 lines), and found comments indicating omitted code (e.g., '// rest of code unchanged', '/* previous code */'). Please provide the complete file content without any omissions if possible, or otherwise use the 'apply_diff' tool to apply the diff to the original file.
</error>
<environment_details>
# VSCode Visible Files
app/page.tsx

# VSCode Open Tabs
components/layout/ProgressIndicator.tsx,components/forms/index.ts,app/plan/destination/page.tsx,components/forms/DestinationForm.tsx,app/page.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-02T15:44:43.666Z
User time zone: Asia/Bangkok, UTC+7:00

# Current Cost
$13.84

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Read phase-02-landing.md plan | Completed |
| 2 | Create hero section with travel theme and proper contrast | Completed |
| 3 | Add value proposition headline with travel context | Completed |
| 4 | Add feature highlights section | Completed |
| 5 | Add "Start Planning" CTA button | Completed |
| 6 | Implement responsive layout | Completed |
| 7 | Create components/forms/DestinationForm.tsx | Completed |
| 8 | Add destination input with icon | Completed |
| 9 | Add start date picker | Completed |
| 10 | Add end date picker | Completed |
| 11 | Integrate React Hook Form + Zod validation | Completed |
| 12 | Connect to FormStore (updateDestination) | Completed |
| 13 | Add form error handling | Completed |
| 14 | Create app/plan/destination/page.tsx | Completed |
| 15 | Add ProgressIndicator component | Completed |
| 16 | Add navigation (back button) | Completed |
| 17 | Implement form submission flow | Completed |
| 18 | Create components/layout/ProgressIndicator.tsx | Completed |
| 19 | Show current step (1 of 5) | Completed |
| 20 | Style according to design system with proper contrast | Completed |
| 21 | Fix landing page with travel imagery and theme | Completed |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

Let me use apply_diff to fix the text colors properly:

<apply_diff>
<path>app/page.tsx</path>
<diff>
<<<<<<< SEARCH
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Why Choose Our AI Travel Planner?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Experience the future of travel planning with intelligent recommendations and personalized itineraries
            </p>
          </div>
=======
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Why Choose Our AI Travel Planner?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Experience the future of travel planning with intelligent recommendations and personalized itineraries
            </p>
          </div>
>>>>>>> REPLACE
</diff>
</apply_diff>

---

**User:**

[apply_diff for 'app/page.tsx'] Result:
<error_details>
Search and replace content are identical - no changes would be made

Debug Info:
- Search and replace must be different to make changes
- Use read_file to verify the content you want to change
</error_details>
<environment_details>
# VSCode Visible Files
app/page.tsx

# VSCode Open Tabs
components/layout/ProgressIndicator.tsx,components/forms/index.ts,app/plan/destination/page.tsx,components/forms/DestinationForm.tsx,app/page.tsx

# Current Time
Current time in ISO 8601 UTC format: 2026-05-02T15:44:50.032Z
User time zone: Asia/Bangkok, UTC+7:00

# Current Cost
$14.19

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Read phase-02-landing.md plan | Completed |
| 2 | Create hero section with travel theme and proper contrast | Completed |
| 3 | Add value proposition headline with travel context | Completed |
| 4 | Add feature highlights section | Completed |
| 5 | Add "Start Planning" CTA button | Completed |
| 6 | Implement responsive layout | Completed |
| 7 | Create components/forms/DestinationForm.tsx | Completed |
| 8 | Add destination input with icon | Completed |
| 9 | Add start date picker | Completed |
| 10 | Add end date picker | Completed |
| 11 | Integrate React Hook Form + Zod validation | Completed |
| 12 | Connect to FormStore (updateDestination) | Completed |
| 13 | Add form error handling | Completed |
| 14 | Create app/plan/destination/page.tsx | Completed |
| 15 | Add ProgressIndicator component | Completed |
| 16 | Add navigation (back button) | Completed |
| 17 | Implement form submission flow | Completed |
| 18 | Create components/layout/ProgressIndicator.tsx | Completed |
| 19 | Show current step (1 of 5) | Completed |
| 20 | Style according to design system with proper contrast | Completed |
| 21 | Fix landing page with travel imagery and theme | Completed |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

Let me read the current file to see what needs to be fixed:

<read_file>
<path>app/page.tsx</path>
</read_file>

---

**User:**

[read_file for 'app/page.tsx'. Reading multiple files at once is more efficient for the LLM. If other files are relevant to your current task, please read them simultaneously.] Result:
<files>
<file><path>app/page.tsx</path>
<content lines="1-471">
  1 | import Link from "next/link";
  2 | 
  3 | export default function LandingPage() {
  4 |   return (
  5 |     <main className="min-h-screen bg-white">
  6 |       {/* Hero Section */}
  7 |       <section className="relative overflow-hidden bg-gradient-to-br from-[#2A7BFF] to-[#1a5fd9]">
  8 |         <div className="absolute inset-0 opacity-10">
  9 |           <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-white blur-3xl" />
 10 |           <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-[#6DD3B0] blur-3xl" />
 11 |         </div>
 12 | 
 13 |         <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
 14 |           <div className="grid items-center gap-16 lg:grid-cols-2">
 15 |             {/* Left: Text Content */}
 16 |             <div className="text-center lg:text-left">
 17 |               <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
 18 |                 <svg
 19 |                   className="h-5 w-5 text-white"
 20 |                   fill="none"
 21 |                   stroke="currentColor"
 22 |                   viewBox="0 0 24 24"
 23 |                 >
 24 |                   <path
 25 |                     strokeLinecap="round"
 26 |                     strokeLinejoin="round"
 27 |                     strokeWidth={2}
 28 |                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
 29 |                   />
 30 |                 </svg>
 31 |                 <span className="text-sm font-semibold text-white">AI-Powered Travel Planning</span>
 32 |               </div>
 33 | 
 34 |               <h1 className="mb-6 text-5xl leading-tight font-bold text-white sm:text-6xl lg:text-7xl">
 35 |                 Turn Your Travel Dream into Reality{" "}
 36 |                 <span className="text-[#FF8C42]">(faster)!</span>
 37 |               </h1>
 38 | 
 39 |               <p className="mb-10 max-w-2xl text-xl leading-relaxed text-white">
 40 |                 Let our AI assistant create personalized travel itineraries tailored to your
 41 |                 preferences, budget, and style. Plan smarter, travel better.
 42 |               </p>
 43 | 
 44 |               <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
 45 |                 <Link
 46 |                   href="/plan/destination"
 47 |                   className="inline-flex transform items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#2A7BFF] shadow-xl transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-2xl"
 48 |                 >
 49 |                   Start Planning
 50 |                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 51 |                     <path
 52 |                       strokeLinecap="round"
 53 |                       strokeLinejoin="round"
 54 |                       strokeWidth={2}
 55 |                       d="M13 7l5 5m0 0l-5 5m5-5H6"
 56 |                     />
 57 |                   </svg>
 58 |                 </Link>
 59 | 
 60 |                 <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
 61 |                   <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 62 |                     <path
 63 |                       strokeLinecap="round"
 64 |                       strokeLinejoin="round"
 65 |                       strokeWidth={2}
 66 |                       d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
 67 |                     />
 68 |                     <path
 69 |                       strokeLinecap="round"
 70 |                       strokeLinejoin="round"
 71 |                       strokeWidth={2}
 72 |                       d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
 73 |                     />
 74 |                   </svg>
 75 |                   See How It Works
 76 |                 </button>
 77 |               </div>
 78 |             </div>
 79 | 
 80 |             {/* Right: Travel Illustration */}
 81 |             <div className="relative hidden lg:block">
 82 |               <div className="relative h-[500px] w-full">
 83 |                 <svg viewBox="0 0 500 500" className="h-full w-full drop-shadow-2xl">
 84 |                   {/* Outer glow circles */}
 85 |                   <circle cx="250" cy="250" r="200" fill="#6DD3B0" opacity="0.15" />
 86 |                   <circle cx="250" cy="250" r="160" fill="#6DD3B0" opacity="0.2" />
 87 | 
 88 |                   {/* Main globe */}
 89 |                   <circle cx="250" cy="250" r="130" fill="white" stroke="#E5E7EB" strokeWidth="2" />
 90 | 
 91 |                   {/* Continents - more realistic shapes */}
 92 |                   <path
 93 |                     d="M 180 220 Q 200 210 220 220 Q 240 230 250 240 Q 260 250 250 270 Q 240 280 220 275 Q 200 270 190 260 Q 180 250 180 235 Z"
 94 |                     fill="#2A7BFF"
 95 |                     opacity="0.4"
 96 |                   />
 97 |                   <path
 98 |                     d="M 270 200 Q 290 195 310 205 Q 320 215 315 230 Q 310 245 295 250 Q 280 255 270 245 Q 265 235 270 220 Z"
 99 |                     fill="#2A7BFF"
100 |                     opacity="0.4"
101 |                   />
102 |                   <path
103 |                     d="M 210 280 Q 230 275 250 285 Q 265 295 260 310 Q 255 325 240 330 Q 225 335 215 325 Q 205 315 210 300 Z"
104 |                     fill="#2A7BFF"
105 |                     opacity="0.4"
106 |                   />
107 | 
108 |                   {/* Latitude/longitude lines */}
109 |                   <ellipse
110 |                     cx="250"
111 |                     cy="250"
112 |                     rx="130"
113 |                     ry="40"
114 |                     fill="none"
115 |                     stroke="#E5E7EB"
116 |                     strokeWidth="1"
117 |                     opacity="0.5"
118 |                   />
119 |                   <ellipse
120 |                     cx="250"
121 |                     cy="250"
122 |                     rx="130"
123 |                     ry="80"
124 |                     fill="none"
125 |                     stroke="#E5E7EB"
126 |                     strokeWidth="1"
127 |                     opacity="0.5"
128 |                   />
129 |                   <line
130 |                     x1="120"
131 |                     y1="250"
132 |                     x2="380"
133 |                     y2="250"
134 |                     stroke="#E5E7EB"
135 |                     strokeWidth="1"
136 |                     opacity="0.5"
137 |                   />
138 | 
139 |                   {/* Airplane with trail */}
140 |                   <g transform="translate(390, 160) rotate(45)">
141 |                     <path d="M 0 0 L -25 -6 L -18 0 L -25 6 Z" fill="#FF8C42" />
142 |                     <path
143 |                       d="M -10 -10 L -10 10"
144 |                       stroke="#FF8C42"
145 |                       strokeWidth="3"
146 |                       strokeLinecap="round"
147 |                     />
148 |                     <circle cx="0" cy="0" r="4" fill="#FF8C42" />
149 |                   </g>
150 |                   <path
151 |                     d="M 200 150 Q 280 120 390 160"
152 |                     stroke="#FF8C42"
153 |                     strokeWidth="2"
154 |                     strokeDasharray="8,4"
155 |                     fill="none"
156 |                     opacity="0.6"
157 |                   />
158 | 
159 |                   {/* Location pins - modern style */}
160 |                   <g transform="translate(200, 150)">
161 |                     <path
162 |                       d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
163 |                       fill="#FF8C42"
164 |                     />
165 |                     <circle cx="0" cy="-28" r="6" fill="white" />
166 |                   </g>
167 | 
168 |                   <g transform="translate(330, 290)">
169 |                     <path
170 |                       d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
171 |                       fill="#6DD3B0"
172 |                     />
173 |                     <circle cx="0" cy="-28" r="6" fill="white" />
174 |                   </g>
175 | 
176 |                   <g transform="translate(290, 190)">
177 |                     <path
178 |                       d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
179 |                       fill="#2A7BFF"
180 |                     />
181 |                     <circle cx="0" cy="-28" r="6" fill="white" />
182 |                   </g>
183 | 
184 |                   {/* Travel icons around globe */}
185 |                   <g transform="translate(140, 330)">
186 |                     <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#2A7BFF" />
187 |                     <circle cx="0" cy="0" r="9" fill="white" />
188 |                     <circle cx="0" cy="0" r="5" fill="#2A7BFF" />
189 |                     <rect x="-12" y="-16" width="24" height="4" rx="2" fill="#2A7BFF" />
190 |                   </g>
191 | 
192 |                   <g transform="translate(360, 360)">
193 |                     <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#6DD3B0" />
194 |                     <rect x="-10" y="-14" width="20" height="4" rx="2" fill="#6DD3B0" />
195 |                     <line x1="-14" y1="-2" x2="14" y2="-2" stroke="white" strokeWidth="2.5" />
196 |                     <line x1="-14" y1="4" x2="14" y2="4" stroke="white" strokeWidth="2.5" />
197 |                   </g>
198 | 
199 |                   <g transform="translate(170, 390)">
200 |                     <rect x="-12" y="-16" width="24" height="32" rx="2" fill="#FF8C42" />
201 |                     <circle cx="0" cy="-6" r="5" fill="white" />
202 |                     <line x1="-8" y1="6" x2="8" y2="6" stroke="white" strokeWidth="2" />
203 |                     <line x1="-8" y1="11" x2="8" y2="11" stroke="white" strokeWidth="2" />
204 |                   </g>
205 |                 </svg>
206 |               </div>
207 |             </div>
208 |           </div>
209 |         </div>
210 | 
211 |         {/* Wave divider */}
212 |         <div className="absolute right-0 bottom-0 left-0">
213 |           <svg
214 |             viewBox="0 0 1440 120"
215 |             fill="none"
216 |             xmlns="http://www.w3.org/2000/svg"
217 |             className="w-full"
218 |           >
219 |             <path
220 |               d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
221 |               fill="white"
222 |             />
223 |           </svg>
224 |         </div>
225 |       </section>
226 | 
227 |       {/* Features Section */}
228 |       <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
229 |         <div className="mx-auto max-w-7xl">
230 |           <div className="mb-20 text-center">
231 |             <h2 className="mb-6 text-4xl font-bold text-black sm:text-5xl">
232 |               Why Choose Our AI Travel Planner?
233 |             </h2>
234 |             <p className="mx-auto max-w-3xl text-xl text-black">
235 |               Experience the future of travel planning with intelligent recommendations and
236 |               personalized itineraries
237 |             </p>
238 |           </div>
239 | 
240 |           <div className="grid gap-10 md:grid-cols-3">
241 |             {/* Feature 1 */}
242 |             <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#2A7BFF]/20 hover:shadow-2xl">
243 |               <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A7BFF] to-[#1a5fd9] transition-transform duration-300 group-hover:scale-110">
244 |                 <svg
245 |                   className="h-8 w-8 text-white"
246 |                   fill="none"
247 |                   stroke="currentColor"
248 |                   viewBox="0 0 24 24"
249 |                 >
250 |                   <path
251 |                     strokeLinecap="round"
252 |                     strokeLinejoin="round"
253 |                     strokeWidth={2}
254 |                     d="M13 10V3L4 14h7v7l9-11h-7z"
255 |                   />
256 |                 </svg>
257 |               </div>
258 |               <h3 className="mb-4 text-2xl font-bold text-black">Lightning Fast</h3>
259 |               <p className="text-lg leading-relaxed text-black">
260 |                 Get a complete travel itinerary in minutes, not hours. Our AI works at the speed of
261 |                 thought to plan your perfect trip.
262 |               </p>
263 |             </div>
264 | 
265 |             {/* Feature 2 */}
266 |             <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#6DD3B0]/20 hover:shadow-2xl">
267 |               <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6DD3B0] to-[#4bc9a3] transition-transform duration-300 group-hover:scale-110">
268 |                 <svg
269 |                   className="h-8 w-8 text-white"
270 |                   fill="none"
271 |                   stroke="currentColor"
272 |                   viewBox="0 0 24 24"
273 |                 >
274 |                   <path
275 |                     strokeLinecap="round"
276 |                     strokeLinejoin="round"
277 |                     strokeWidth={2}
278 |                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
279 |                   />
280 |                 </svg>
281 |               </div>
282 |               <h3 className="mb-4 text-2xl font-bold text-black">Personalized</h3>
283 |               <p className="text-lg leading-relaxed text-black">
284 |                 Every itinerary is tailored to your unique preferences, budget, and travel style.
285 |                 Your trip, your way.
286 |               </p>
287 |             </div>
288 | 
289 |             {/* Feature 3 */}
290 |             <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#FF8C42]/20 hover:shadow-2xl">
291 |               <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#e67a2e] transition-transform duration-300 group-hover:scale-110">
292 |                 <svg
293 |                   className="h-8 w-8 text-white"
294 |                   fill="none"
295 |                   stroke="currentColor"
296 |                   viewBox="0 0 24 24"
297 |                 >
298 |                   <path
299 |                     strokeLinecap="round"
300 |                     strokeLinejoin="round"
301 |                     strokeWidth={2}
302 |                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
303 |                   />
304 |                 </svg>
305 |               </div>
306 |               <h3 className="mb-4 text-2xl font-bold text-black">Fully Flexible</h3>
307 |               <p className="text-lg leading-relaxed text-black">
308 |                 Easily adjust your plan on the fly. Our AI adapts to your changes in real-time for
309 |                 seamless replanning.
310 |               </p>
311 |             </div>
312 |           </div>
313 |         </div>
314 |       </section>
315 | 
316 |       {/* How It Works Section */}
317 |       <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-24 sm:px-6 lg:px-8">
318 |         <div className="mx-auto max-w-7xl">
319 |           <div className="mb-20 text-center">
320 |             <h2 className="mb-6 text-4xl font-bold text-black sm:text-5xl">How It Works</h2>
321 |             <p className="mx-auto max-w-3xl text-xl text-black">
322 |               From dream destination to detailed itinerary in 5 simple steps
323 |             </p>
324 |           </div>
325 | 
326 |           <div className="grid gap-6 md:grid-cols-5">
327 |             {[
328 |               {
329 |                 icon: (
330 |                   <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
331 |                     <path
332 |                       strokeLinecap="round"
333 |                       strokeLinejoin="round"
334 |                       strokeWidth={2}
335 |                       d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
336 |                     />
337 |                   </svg>
338 |                 ),
339 |                 title: "Choose Destination",
340 |                 desc: "Tell us where you want to go and when",
341 |               },
342 |               {
343 |                 icon: (
344 |                   <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
345 |                     <path
346 |                       strokeLinecap="round"
347 |                       strokeLinejoin="round"
348 |                       strokeWidth={2}
349 |                       d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
350 |                     />
351 |                   </svg>
352 |                 ),
353 |                 title: "Check Weather",
354 |                 desc: "Get forecast and packing recommendations",
355 |               },
356 |               {
357 |                 icon: (
358 |                   <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
359 |                     <path
360 |                       strokeLinecap="round"
361 |                       strokeLinejoin="round"
362 |                       strokeWidth={2}
363 |                       d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
364 |                     />
365 |                   </svg>
366 |                 ),
367 |                 title: "Set Preferences",
368 |                 desc: "Share your travel style and interests",
369 |               },
370 |               {
371 |                 icon: (
372 |                   <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
373 |                     <path
374 |                       strokeLinecap="round"
375 |                       strokeLinejoin="round"
376 |                       strokeWidth={2}
377 |                       d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
378 |                     />
379 |                   </svg>
380 |                 ),
381 |                 title: "Select Places",
382 |                 desc: "Pick from AI-curated recommendations",
383 |               },
384 |               {
385 |                 icon: (
386 |                   <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
387 |                     <path
388 |                       strokeLinecap="round"
389 |                       strokeLinejoin="round"
390 |                       strokeWidth={2}
391 |                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
392 |                     />
393 |                   </svg>
394 |                 ),
395 |                 title: "Get Itinerary",
396 |                 desc: "Receive your personalized travel plan",
397 |               },
398 |             ].map((step, index) => (
399 |               <div key={index} className="relative">
400 |                 <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl">
401 |                   <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A7BFF] to-[#6DD3B0] text-white transition-transform duration-300 group-hover:scale-110">
402 |                     {step.icon}
403 |                   </div>
404 |                   <div className="mb-3 text-sm font-bold text-[#2A7BFF]">Step {index + 1}</div>
405 |                   <h4 className="mb-3 text-lg font-bold text-black">{step.title}</h4>
406 |                   <p className="text-sm leading-relaxed text-black">{step.desc}</p>
407 |                 </div>
408 |                 {index < 4 && (
409 |                   <div className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 transform md:block">
410 |                     <svg className="h-6 w-6 text-[#2A7BFF]" fill="currentColor" viewBox="0 0 20 20">
411 |                       <path
412 |                         fillRule="evenodd"
413 |                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
414 |                         clipRule="evenodd"
415 |                       />
416 |                     </svg>
417 |                   </div>
418 |                 )}
419 |               </div>
420 |             ))}
421 |           </div>
422 | 
423 |           <div className="mt-16 text-center">
424 |             <Link
425 |               href="/plan/destination"
426 |               className="inline-flex transform items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2A7BFF] to-[#6DD3B0] px-12 py-5 text-lg font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
427 |             >
428 |               Start Your Journey Now
429 |               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
430 |                 <path
431 |                   strokeLinecap="round"
432 |                   strokeLinejoin="round"
433 |                   strokeWidth={2}
434 |                   d="M13 7l5 5m0 0l-5 5m5-5H6"
435 |                 />
436 |               </svg>
437 |             </Link>
438 |           </div>
439 |         </div>
440 |       </section>
441 | 
442 |       {/* Social Proof Section */}
443 |       <section className="bg-gradient-to-r from-[#2A7BFF] to-[#1a5fd9] px-4 py-20 sm:px-6 lg:px-8">
444 |         <div className="mx-auto max-w-7xl">
445 |           <div className="grid gap-12 text-center md:grid-cols-3">
446 |             <div className="group">
447 |               <div className="mb-3 text-5xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
448 |                 10K+
449 |               </div>
450 |               <div className="text-xl font-medium text-white/90">Trips Planned</div>
451 |             </div>
452 |             <div className="group">
453 |               <div className="mb-3 text-5xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
454 |                 150+
455 |               </div>
456 |               <div className="text-xl font-medium text-white/90">Destinations</div>
457 |             </div>
458 |             <div className="group">
459 |               <div className="mb-3 text-5xl font-bold text-white transition-transform duration-300 group-hover:scale-110">
460 |                 4.9★
461 |               </div>
462 |               <div className="text-xl font-medium text-white/90">User Rating</div>
463 |             </div>
464 |           </div>
465 |         </div>
466 |       </section>
467 |     </main>
468 |   );
469 | }
470 | 
471 | // Made with Bob
</content>
</file>
</files>
<environment_details>
# VSCode Visible Files
app/globals.css

# VSCode Open Tabs
components/layout/ProgressIndicator.tsx,components/forms/index.ts,app/plan/destination/page.tsx,components/forms/DestinationForm.tsx,app/page.tsx,app/globals.css

# Current Time
Current time in ISO 8601 UTC format: 2026-05-02T15:45:41.087Z
User time zone: Asia/Bangkok, UTC+7:00

# Current Cost
$14.71

# Review Exclusions
The following file patterns are excluded from code reviews:
- .vscode/**

# Current Mode
<slug>code</slug>
<name>💻 Code</name>
====

REMINDERS

Below is your current list of reminders for this task. Keep them updated as you progress.

| # | Content | Status |
|---|---------|--------|
| 1 | Read phase-02-landing.md plan | Completed |
| 2 | Create hero section with travel theme and proper contrast | Completed |
| 3 | Add value proposition headline with travel context | Completed |
| 4 | Add feature highlights section | Completed |
| 5 | Add "Start Planning" CTA button | Completed |
| 6 | Implement responsive layout | Completed |
| 7 | Create components/forms/DestinationForm.tsx | Completed |
| 8 | Add destination input with icon | Completed |
| 9 | Add start date picker | Completed |
| 10 | Add end date picker | Completed |
| 11 | Integrate React Hook Form + Zod validation | Completed |
| 12 | Connect to FormStore (updateDestination) | Completed |
| 13 | Add form error handling | Completed |
| 14 | Create app/plan/destination/page.tsx | Completed |
| 15 | Add ProgressIndicator component | Completed |
| 16 | Add navigation (back button) | Completed |
| 17 | Implement form submission flow | Completed |
| 18 | Create components/layout/ProgressIndicator.tsx | Completed |
| 19 | Show current step (1 of 5) | Completed |
| 20 | Style according to design system with proper contrast | Completed |
| 21 | Fix landing page with travel imagery and theme | Completed |


IMPORTANT: When task status changes, remember to call the `update_todo_list` tool to update your progress.

</environment_details>

---

**Assistant:**

I can see the file is already correct! Looking at the current `app/page.tsx`, all text elements are already using `text-black` on light backgrounds:

- Line 231-232: "Why Choose Our AI Travel Planner?" heading uses `text-black`
- Line 234-237: Description text uses `text-black`
- Line 258: "Lightning Fast" heading uses `text-black`
- Line 259-262: Feature description uses `text-black`
- Line 282: "Personalized" heading uses `text-black`
- Line 283-286: Feature description uses `text-black`
- Line 306: "Fully Flexible" heading uses `text-black`
- Line 307-310: Feature description uses `text-black`
- Line 320: "How It Works" heading uses `text-black`
- Line 321-323: Description uses `text-black`
- Line 405: Step titles use `text-black`
- Line 406: Step descriptions use `text-black`

The file already has all the contrast fixes applied! The previous `write_to_file` attempt failed because I tried to write a truncated version, but the actual file in the workspace is already complete and correct.

<attempt_completion>
<result>
**Phase 2: Landing Page & Onboarding - COMPLETE** ✅

All text contrast issues have been resolved. The landing page now uses:

### Text Contrast Fixed:
- **ALL headings**: `text-black` on white backgrounds (WCAG AAA compliant)
- **ALL body text**: `text-black` on white backgrounds
- **ALL feature cards**: `text-black` for titles and descriptions
- **ALL step descriptions**: `text-black` for maximum readability
- **Hero section**: `text-white` on blue gradient (proper contrast maintained)
- **Social proof**: `text-white` on blue gradient

### Phase 2 Deliverables Complete:
✅ Landing page with professional travel theme
✅ Hero section with gradient, SVG illustration, and CTAs
✅ Features section (3 cards with icons)
✅ How It Works section (5-step process)
✅ Social proof section (stats)
✅ DestinationForm with React Hook Form + Zod validation
✅ Destination page with ProgressIndicator
✅ FormStore integration
✅ TypeScript errors resolved
✅ Professional SVG icons (no emojis)
✅ **CRITICAL: All text now uses `text-black` for maximum contrast**
✅ Mobile-first responsive design
✅ Proper error handling and validation

### Files Created/Updated:
- `app/page.tsx` (471 lines) - Landing page with proper contrast
- `app/plan/destination/page.tsx` (42 lines) - Destination input page
- `components/forms/DestinationForm.tsx` (206 lines) - Form with validation
- `components/layout/ProgressIndicator.tsx` (Complete)
- `components/forms/index.ts` (Barrel export)

**Ready for Phase 3: Weather & Preferences** when you're ready to proceed.
</result>
</attempt_completion>

