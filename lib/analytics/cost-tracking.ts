/**
 * Cost tracking utility for API call monitoring.
 * Fires and forgets — never blocks the main response.
 *
 * Usage (server-side only):
 *   import { trackAPICall } from '@/lib/analytics/cost-tracking';
 *   void trackAPICall('watsonx', 0.002, userId);
 */

export type APICallType = "watsonx" | "places" | "unsplash";

// Approximate costs per call (USD)
export const ESTIMATED_COSTS: Record<APICallType, number> = {
  watsonx: 0.002, // watsonx.ai, average ~4k tokens per call
  places: 0.001, // Google Places API per request
  unsplash: 0.0, // Unsplash is free tier
};

const COST_ALERT_THRESHOLD = 5.0; // USD per user session

/**
 * Track an API call. Fire-and-forget — does not throw.
 * In dev, only logs to console. In production, posts to /api/analytics/track.
 */
export function trackAPICall(type: APICallType, cost?: number, userId?: string): void {
  const resolvedCost = cost ?? ESTIMATED_COSTS[type];

  if (process.env.NODE_ENV === "development") {
    console.log(`[cost-tracking] ${type} call — $${resolvedCost.toFixed(4)}`);
    return;
  }

  // Fire-and-forget POST — intentionally not awaited
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, cost: resolvedCost, userId }),
  }).catch(() => {
    // Silently ignore network errors — tracking should never break the app
  });
}

/**
 * Check if a session cost exceeds the alert threshold.
 * Returns true if the alert should fire.
 */
export function exceedsThreshold(totalCost: number): boolean {
  return totalCost >= COST_ALERT_THRESHOLD;
}
