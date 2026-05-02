# Phase 10: Deployment & Monitoring (Week 16)

## Production Launch Milestone

## Goal

Deploy to production, set up monitoring and alerting, configure CI/CD for ongoing deployments, and verify everything works in the real environment.

## References (read before starting)

- `00-overview.md § Technology Stack > API Integration` — API keys to configure: OpenAI, Google Places, Unsplash, Weather API
- `00-overview.md § Performance > Caching Strategy` — Upstash Redis setup (env vars: `UPSTASH_REDIS_URL`, `UPSTASH_REDIS_TOKEN`)
- `00-overview.md § Cost Analysis > Cost Breakdown` — infrastructure cost expectations (~$45/month for Vercel Pro + Upstash + DB)
- `00-overview.md § Cost Analysis > Cost Monitoring` — `trackAPICall()` alerting at $5/user threshold
- `00-overview.md § Testing Architecture > CI/CD Integration` — GitHub Actions pipeline to finalize
- `00-overview.md § Testing Architecture > Performance Testing` — Lighthouse CI to run post-deploy
- `00-overview.md § Risk Mitigation` — technical and UX risks to monitor post-launch
- `00-overview.md § Success Metrics` — all three metric categories to instrument for ongoing tracking

## Tasks

### Production Environment Setup

- [ ] Configure Vercel project with production environment
  - [ ] Set all environment variables in Vercel dashboard (never committed to git):
    - `OPENAI_API_KEY`
    - `GOOGLE_PLACES_API_KEY`
    - `UNSPLASH_ACCESS_KEY`
    - `WEATHER_API_KEY`
    - `UPSTASH_REDIS_URL`
    - `UPSTASH_REDIS_TOKEN`
    - `NEXTAUTH_SECRET` (if auth added)
- [ ] Set up Upstash Redis instance (production tier matching ~$10/month budget)
- [ ] Configure Vercel CDN for image optimization
- [ ] Configure custom domain and SSL

### Deployment

- [ ] Deploy to Vercel via GitHub integration (auto-deploy on merge to `main`)
- [ ] Configure build settings: `npm run build` → `npm run start`
- [ ] Set up preview deployments for PRs
- [ ] Configure rollback procedure (Vercel instant rollback to previous deployment)

### Monitoring & Alerting

- [ ] Set up error tracking (Sentry)
  - [ ] Configure DSN in environment variables
  - [ ] Add Sentry Next.js plugin
  - [ ] Set up alert rules for error spikes
- [ ] Set up performance monitoring
  - [ ] Vercel Analytics (built-in) for Core Web Vitals tracking
  - [ ] Custom dashboard for API response times
- [ ] Set up uptime monitoring (e.g., Better Uptime, UptimeRobot)
  - [ ] Monitor `/api/weather`, `/api/recommendations`, `/api/itinerary`
  - [ ] Alert on >99.9% uptime violation
- [ ] Wire cost monitoring alerts (`trackAPICall()` → alert at $5/user/month threshold)

### CI/CD Pipeline Finalization

- [ ] Finalize GitHub Actions workflow from Phase 9
- [ ] Add production deployment step (merge to `main` triggers Vercel deploy)
- [ ] Add smoke test step after deployment: verify key pages return HTTP 200
- [ ] Set up automated Lighthouse CI on production URL post-deploy

### Documentation

- [ ] Write user guide (how to plan a trip end-to-end)
- [ ] Write API documentation (`/api/*` endpoints, request/response formats)
- [ ] Write deployment guide (how to set up env vars, deploy to a new environment)
- [ ] Document monitoring runbook (what to do when alerts fire)

### Production Validation

- [ ] Smoke tests: visit `/`, `/plan/destination`, `/plan/discover`, `/plan/itinerary` — all return correctly
- [ ] Full end-to-end user acceptance test in production (plan a real trip)
- [ ] Verify Redis cache is populated (check Upstash dashboard after first requests)
- [ ] Verify Sentry captures errors (trigger a test error)
- [ ] Verify Lighthouse scores ≥90 on production URL
- [ ] Verify API keys work in production (each external API called successfully)

## Deliverables

- Production deployment on Vercel with custom domain
- All environment variables configured in production
- Error tracking (Sentry), performance monitoring, uptime monitoring active
- CI/CD pipeline with auto-deploy and smoke tests
- Documentation: user guide, API docs, deployment guide, monitoring runbook

## Testing Criteria

- Production environment returns correct responses for all API endpoints
- Sentry captures and alerts on errors
- Uptime monitor shows 100% since deployment
- CI/CD pipeline deploys successfully on merge to `main`
- Post-deploy Lighthouse score ≥90
- Redis cache hit rate visible in Upstash dashboard
- Cost monitoring fires test alert correctly
