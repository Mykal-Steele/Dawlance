# Dawlance

AI-powered travel planning app. You give it a destination and dates, it generates a day-by-day itinerary with hotel and restaurant recommendations, weather forecasts, and a chat assistant for adjustments.

Built with Next.js 14, TypeScript, Tailwind CSS, IBM watsonx.ai, and Google Places.

## Setup

**Requirements:** Node.js 18+, npm

```bash
git clone <repo>
cd dawlance
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your API keys (see below), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable                          | Where to get it                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `OPENWEATHER_API_KEY`             | [openweathermap.org](https://openweathermap.org/api) → API keys (free tier works)        |
| `WATSONX_API_KEY`                 | IBM Cloud → Manage → Access (IAM) → API keys                                             |
| `WATSONX_PROJECT_ID`              | watsonx.ai → your project → Manage → General                                             |
| `WATSONX_URL`                     | Your watsonx.ai region URL, e.g. `https://us-south.ml.cloud.ibm.com`                     |
| `GOOGLE_MAPS_API_KEY`             | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Same key as above (needs to be public for the map embed)                                 |
| `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`  | Google Maps Platform → Map Management (optional, leave blank for dev)                    |
| `UNSPLASH_ACCESS_KEY`             | [unsplash.com/developers](https://unsplash.com/developers) → your app → Access Key       |
| `CLOUDANT_URL`                    | IBM Cloud → Resource list → your Cloudant instance → Credentials                         |
| `CLOUDANT_API_KEY`                | Same credentials page                                                                    |
| `CLOUDANT_DB_NAME`                | Name of the database you created in Cloudant (e.g. `travel-plans`)                       |

Google Maps and Unsplash are optional — the app falls back to gradient placeholders if those keys are missing.

## Scripts

```bash
npm run dev          # dev server at localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
npm run test         # Vitest (watch mode)
npm run test:run     # Vitest (single run)
```

## Docker

```bash
docker build -t dawlance .
docker run -p 3000:3000 --env-file .env.local dawlance
```

## Project Structure

```
app/          Next.js App Router pages and API routes
components/   UI components (forms, itinerary, discovery, AI chat)
lib/          Stores (Zustand), hooks, services, types, utilities
public/       Static assets
```
