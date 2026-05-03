# Phase 10: Submission Prep (Week 16)

## Goal

Ensure the app runs correctly, all tests pass, and the `bob_sessions/` folder is correctly populated for hackathon judging.

## Hackathon Judging Requirement

**IMPORTANT**: Before submitting, the repo MUST contain a `bob_sessions/` folder in the root with:

- Screenshots of Bob IDE task session consumption summaries for all major tasks
- Exported task history markdown files (exported from Bob IDE via "Export task history" icon)

This is required for judging. Missing `bob_sessions/` = disqualification from judging.

## Tasks

### CI/CD Pipeline

- [ ] Finalize GitHub Actions workflow:
  - On merge to `main`: run tests → type-check → lint
- [ ] Confirm all tests pass (`bun run test`)
- [ ] Confirm type-check passes (`bun run type-check`)
- [ ] Confirm lint passes (`bun run lint`)

### bob_sessions Folder (Judging Requirement)

- [ ] Create `bob_sessions/` folder in repo root
- [ ] For each major Bob IDE task session used to build the app:
  - [ ] Take screenshot of task session consumption summary view
  - [ ] Export task history as markdown file via the "Export task history" icon
  - [ ] Add both to `bob_sessions/`
- [ ] Commit `bob_sessions/` to the repo before final submission
- [ ] Ensure all key phases (foundation, AI integration, testing) have exported sessions

### Final Validation

- [ ] Run `bun run build` and confirm no build errors
- [ ] Verify no API keys are committed to git (`git log --all -S "API_KEY"`)
- [ ] Run `bun run test` — all tests pass
- [ ] Run `bun run type-check` — exit 0
- [ ] Smoke-test the app locally: full flow (destination → itinerary) works end-to-end

## Deliverables

- All tests passing, type-check clean
- `bob_sessions/` folder committed to repo with all required files
- Clean `bun run build` with no errors

## Testing Criteria

- `bun run test` — 0 failures
- `bun run type-check` — exit 0
- `bun run lint` — 0 errors
- `bob_sessions/` contains exports for all major development sessions
