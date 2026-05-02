import type { Recommendation } from "@/lib/types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const EARTH_RADIUS_KM = 6371;
const MAX_DISTANCE_KM = 300;
const TIME_UTILIZATION_LIMIT = 0.8;
const MIN_HOTELS = 1;
const MIN_ATTRACTIONS = 3;
const MIN_RESTAURANTS = 2;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Returns a human-readable reason why `candidate` cannot be added to `selected`,
 * or null if it passes all criteria.
 * Hotels are excluded from time-feasibility checks (stay duration isn't an activity).
 */
export function getDisqualifyReason(
  candidate: Recommendation,
  selected: Recommendation[],
  startDate: Date | string,
  endDate: Date | string
): string | null {
  const start = new Date(startDate);
  const end = new Date(endDate);
  // Time feasibility — hotels don't count as timed activities
  if (candidate.category !== "hotel") {
    const tripHours = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
    const maxMinutes = tripHours * 60 * TIME_UTILIZATION_LIMIT;
    const usedMinutes = selected
      .filter((r) => r.category !== "hotel")
      .reduce((sum, r) => sum + r.estimatedDuration, 0);
    if (usedMinutes + candidate.estimatedDuration > maxMinutes) {
      const overByH = Math.ceil((usedMinutes + candidate.estimatedDuration - maxMinutes) / 60);
      return `Would exceed trip capacity by ${overByH}h`;
    }
  }

  // Geographic feasibility
  for (const s of selected) {
    const dist = haversineDistance(
      s.location.coordinates.lat,
      s.location.coordinates.lng,
      candidate.location.coordinates.lat,
      candidate.location.coordinates.lng
    );
    if (dist > MAX_DISTANCE_KM) {
      return `${Math.round(dist)}km from "${s.name}" — too far`;
    }
  }

  return null;
}

export function validateSelections(
  selected: Recommendation[],
  startDate: Date | string,
  endDate: Date | string
): ValidationResult {
  const errors: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Category balance
  const hotels = selected.filter((r) => r.category === "hotel");
  const attractions = selected.filter((r) => r.category === "attraction");
  const restaurants = selected.filter((r) => r.category === "restaurant");

  if (hotels.length < MIN_HOTELS) {
    errors.push(`Select at least ${MIN_HOTELS} hotel`);
  }
  if (attractions.length < MIN_ATTRACTIONS) {
    errors.push(
      `Select at least ${MIN_ATTRACTIONS} attractions (currently have ${attractions.length})`
    );
  }
  if (restaurants.length < MIN_RESTAURANTS) {
    errors.push(
      `Select at least ${MIN_RESTAURANTS} restaurants (currently have ${restaurants.length})`
    );
  }

  // Time feasibility — exclude hotel stays from duration total
  const tripHours = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
  const maxMinutes = tripHours * 60 * TIME_UTILIZATION_LIMIT;
  const totalMinutes = selected
    .filter((r) => r.category !== "hotel")
    .reduce((sum, r) => sum + r.estimatedDuration, 0);

  if (totalMinutes > maxMinutes) {
    const overByHours = Math.ceil((totalMinutes - maxMinutes) / 60);
    errors.push(`Too many activities — reduce by at least ${overByHours}h to fit the trip`);
  }

  // Geographic feasibility: max 300km between any two selected locations
  outer: for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      const a = selected[i].location.coordinates;
      const b = selected[j].location.coordinates;
      const dist = haversineDistance(a.lat, a.lng, b.lat, b.lng);
      if (dist > MAX_DISTANCE_KM) {
        errors.push(
          `"${selected[i].name}" and "${selected[j].name}" are ${Math.round(dist)}km apart — too far for one trip`
        );
        break outer;
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
