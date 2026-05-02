# Phase 10: Deployment & Monitoring (Week 16)

## Production Launch Milestone

## Goal

Deploy to IBM Cloud Code Engine, set up monitoring, configure CI/CD, verify everything works in production. Also ensure the `bob_sessions/` folder is correctly populated for hackathon judging.

## References (read before starting)

- `00-overview.md § Technology Stack > API Integration` — API keys to configure (Gemini, Google Places, Unsplash, Weather)
- `00-overview.md § Technology Stack > Deployment & Infrastructure` — IBM Code Engine, Cloudant, $80 IBM Cloud credit constraint
- `00-overview.md § Performance > Caching Strategy` — React Query only (no Redis)
- `00-overview.md § Cost Analysis > Cost Monitoring` — `trackAPICall()` alerting + IBM Cloud credit alerts at 25%/50%/80%
- `00-overview.md § Testing Architecture > CI/CD Integration` — GitHub Actions pipeline
- `00-overview.md § Risk Mitigation` — risks to monitor post-launch
- `00-overview.md § Success Metrics` — metrics to instrument

## Hackathon Judging Requirement

**IMPORTANT**: Before submitting, the repo MUST contain a `bob_sessions/` folder in the root with:
- Screenshots of Bob IDE task session consumption summaries for all major tasks
- Exported task history markdown files (exported from Bob IDE via "Export task history" icon)

This is required for judging. Missing `bob_sessions/` = disqualification from judging.

## Tasks

### Containerize the App

- [ ] Write `Dockerfile` for the Next.js app
  ```
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build

  FROM node:20-alpine AS runner
  WORKDIR /app
  COPY --from=builder /app/.next/standalone ./
  COPY --from=builder /app/.next/static ./.next/static
  COPY --from=builder /app/public ./public
  EXPOSE 3000
  CMD ["node", "server.js"]
  ```
- [ ] Add `output: 'standalone'` to `next.config.js` (required for Docker)
- [ ] Push image to IBM Container Registry:
  ```bash
  ibmcloud login
  ibmcloud target -r us-south -g default
  ibmcloud cr region-set us-south
  ibmcloud cr namespace-add travel-app-ns
  docker build -t us.icr.io/travel-app-ns/travel-app:latest .
  ibmcloud cr login
  docker push us.icr.io/travel-app-ns/travel-app:latest
  ```

### Deploy to IBM Code Engine

- [ ] Create Code Engine project and deploy the app:
  ```bash
  ibmcloud ce project create --name travel-app-project
  ibmcloud ce project select --name travel-app-project

  ibmcloud ce application create \
    --name travel-app \
    --image us.icr.io/travel-app-ns/travel-app:latest \
    --min-scale 0 \
    --max-scale 5 \
    --cpu 0.5 \
    --memory 1G \
    --port 3000
  ```
- [ ] Set environment variables on the Code Engine application:
  ```bash
  ibmcloud ce application update --name travel-app \
    --env GEMINI_API_KEY=... \
    --env GOOGLE_PLACES_API_KEY=... \
    --env UNSPLASH_ACCESS_KEY=... \
    --env WEATHER_API_KEY=...
  ```
  > **NEVER commit API keys to git** — IBM Cloud will deactivate them and suspend your hackathon account
- [ ] Verify deployment: `ibmcloud ce application get --name travel-app` to get the public URL

### Cloudant Setup (Optional — for persistence)

- [ ] If persistent storage is needed (saved plans, session data):
  - [ ] Create Cloudant instance via IBM Cloud dashboard (Lite tier — free)
  - [ ] Create databases: `travel-plans`, `user-sessions`
  - [ ] Set `IBM_CLOUDANT_URL` and `IBM_CLOUDANT_API_KEY` env vars on Code Engine app
  - [ ] Add `@ibm-cloud/cloudant` npm package

### Monitoring & Alerting

- [ ] Set up IBM Cloud Monitoring (Sysdig) for Code Engine metrics (CPU, memory, request count)
- [ ] Monitor IBM Cloud credit consumption in the IBM Cloud dashboard:
  - Alerts at 25%, 50%, 80% usage will be emailed automatically
  - Do NOT wait for 100% — account suspends immediately
- [ ] Wire Sentry (or IBM Log Analysis) for error tracking:
  - Add Sentry DSN to Code Engine env vars
- [ ] Set up IBM Log Analysis for structured logging from the Next.js app

### CI/CD Pipeline

- [ ] Finalize GitHub Actions workflow:
  - On merge to `main`: run tests → build Docker image → push to IBM Container Registry → update Code Engine deployment
  - Use `ibmcloud ce application update --image` to trigger rolling deploy
- [ ] Add smoke test step post-deploy: verify `/`, `/plan/destination`, `/api/weather` return HTTP 200
- [ ] Configure IBM Container Registry image scanning for vulnerabilities

### bob_sessions Folder (Judging Requirement)

- [ ] Create `bob_sessions/` folder in repo root
- [ ] For each major Bob IDE task session used to build the app:
  - [ ] Take screenshot of task session consumption summary view
  - [ ] Export task history as markdown file via the "Export task history" icon
  - [ ] Add both to `bob_sessions/`
- [ ] Commit `bob_sessions/` to the repo before final submission
- [ ] Ensure all key phases (foundation, AI integration, deployment) have exported sessions

### Production Validation

- [ ] Visit the Code Engine public URL and run full end-to-end flow (plan a real trip)
- [ ] Verify all API calls succeed (Gemini, Google Places, Unsplash, Weather)
- [ ] Verify no API keys are in client-side bundle (`ANALYZE=true npm run build` then inspect bundle)
- [ ] Verify error tracking fires on a test error
- [ ] Run Lighthouse against the production URL — confirm score ≥90

## Deliverables

- Dockerized Next.js app deployed on IBM Code Engine
- All env vars configured securely (never in git)
- Monitoring: IBM Cloud Monitoring + error tracking
- CI/CD pipeline with auto-deploy on merge to `main`
- `bob_sessions/` folder committed to repo with all required files

## Testing Criteria

- Code Engine public URL returns the app correctly
- Full planning flow (destination → itinerary) works end-to-end in production
- No API keys visible in browser DevTools network tab or client bundle
- IBM Cloud credit usage < 50% post-deployment
- `bob_sessions/` contains exports for all major development sessions
- CI/CD deploys successfully on a test commit to `main`
