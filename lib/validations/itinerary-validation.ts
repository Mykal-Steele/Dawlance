import type { Recommendation } from "@/lib/types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
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
  if (selected.length === 0) {
    return { valid: false, errors: ["Select at least one place"], warnings: [] };
  }

  const warnings: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Category balance (soft warnings — not all cities have enough options)
  const hotels = selected.filter((r) => r.category === "hotel");
  const attractions = selected.filter((r) => r.category === "attraction");
  const restaurants = selected.filter((r) => r.category === "restaurant");

  if (hotels.length < MIN_HOTELS) {
    warnings.push(`No hotel selected — consider adding one`);
  }
  if (attractions.length < MIN_ATTRACTIONS) {
    warnings.push(
      `Only ${attractions.length} attraction${attractions.length === 1 ? "" : "s"} selected (recommended: ${MIN_ATTRACTIONS}+)`
    );
  }
  if (restaurants.length < MIN_RESTAURANTS) {
    warnings.push(
      `Only ${restaurants.length} restaurant${restaurants.length === 1 ? "" : "s"} selected (recommended: ${MIN_RESTAURANTS}+)`
    );
  }

  // Time feasibility — soft warning
  const tripHours = Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
  const maxMinutes = tripHours * 60 * TIME_UTILIZATION_LIMIT;
  const totalMinutes = selected
    .filter((r) => r.category !== "hotel")
    .reduce((sum, r) => sum + r.estimatedDuration, 0);

  if (totalMinutes > maxMinutes) {
    const overByHours = Math.ceil((totalMinutes - maxMinutes) / 60);
    warnings.push(`Schedule may be tight — over capacity by ~${overByHours}h`);
  }

  // Geographic feasibility — soft warning
  outer: for (let i = 0; i < selected.length; i++) {
    for (let j = i + 1; j < selected.length; j++) {
      const a = selected[i].location.coordinates;
      const b = selected[j].location.coordinates;
      const dist = haversineDistance(a.lat, a.lng, b.lat, b.lng);
      if (dist > MAX_DISTANCE_KM) {
        warnings.push(
          `"${selected[i].name}" and "${selected[j].name}" are ${Math.round(dist)}km apart`
        );
        break outer;
      }
    }
  }

  return { valid: true, errors: [], warnings };
}
