# Dev Rules v1.0.0

## SOLID Principles

- **SRP**: One responsibility per component/function. Extract data fetching into custom hooks.
- **OCP**: Use extensible props (`variant`, `actions`) instead of modifying components.
- **LSP**: Extended interfaces must fulfill base interface contracts.
- **ISP**: Split large interfaces into focused ones (`Selectable`, `Displayable`).
- **DIP**: Depend on abstractions (e.g., `StorageService` interface, not `localStorage` directly).

## Core Principles

- **DRY**: Extract repeated logic into hooks/utils (e.g., `useDebounce`).
- **KISS**: Prefer readable over clever. Break logic into named steps.
- **YAGNI**: Only model what's needed now. No speculative fields.

## Clean Code

- **Names**: Descriptive (`activeRecommendations` not `arr`).
- **Functions**: Single purpose, <20 lines. Validate → Transform → Process pattern.
- **Args**: Max 2 params; use object params for more.
- **Comments**: Explain WHY not WHAT.
- **Errors**: try/catch on all async. Handle `ZodError`, `Error`, and unknown cases separately.

## TypeScript

- Strict mode always on. Explicit return types required.
- No `any` — use `unknown` + type guards.
- `interface` for object shapes; `type` for unions/primitives.

## React

- Default to **Server Components**; use `'use client'` only when interactive.
- Extract reusable logic into custom hooks (`useLocalStorage`, etc.).
- Well-typed props via interfaces.

## Code Organization

- Feature folders: `ComponentName/index.ts`, `.tsx`, `.test.tsx`, `types.ts`, `utils.ts`
- Import order: external → internal (absolute) → relative → styles
- Use barrel exports via `components/index.ts`

## Naming

| Thing            | Convention         |
| ---------------- | ------------------ |
| Components       | `PascalCase`       |
| Hooks            | `useXxx` camelCase |
| Utils            | `camelCase`        |
| Constants        | `UPPER_SNAKE_CASE` |
| Types/Interfaces | `PascalCase`       |

## Testing

- TDD when appropriate. Unit/Integration/E2E = 70/20/10%.
- Coverage: 80% overall, 95% on critical paths.

## Accessibility (WCAG 2.1 AA)

- Semantic HTML, ARIA labels, keyboard nav, focus management.
- Color contrast ≥4.5:1. `alt` text on images. `aria-invalid`, `aria-describedby` on forms.

## Security

- Validate all inputs with **Zod**.
- Rate-limit API routes. Sanitize inputs. Secrets in env vars only. Never commit secrets.

## Git

- Commits: `feat:` `fix:` `docs:` `style:` `refactor:` `test:` `chore:`
- Branches: `feature/`, `fix/`, `refactor/`, `docs/`

## Performance

- Dynamic imports for heavy components (`next/dynamic`).
- `memo` for pure components, `useMemo` for expensive computations.

## Common Pitfalls

1. No `any` → use `unknown` + guards
2. Don't skip tests (80% coverage)
3. No hardcoded secrets
4. Don't ignore a11y
5. Default to Server Components
6. Always validate with Zod
7. Keep functions <20 lines
8. Don't repeat logic — extract it
9. Don't premature-optimize — measure first
10. Always handle errors

## Pre-Submit Checklist

- [ ] Strict TS, explicit return types, no `any`
- [ ] SRP followed, tests written (80%+)
- [ ] WCAG 2.1 AA met, error handling done
- [ ] Zod validation, security best practices
- [ ] JSDoc on complex functions
- [ ] Prettier formatted, ESLint clean
- [ ] Conventional Commits used
