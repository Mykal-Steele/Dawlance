"use client";

import { useEffect, useRef, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import type { DayPlan } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteMapProps {
  day: DayPlan;
  dayLabel: string;
}

// ─── Maps init (once) ────────────────────────────────────────────────────────

let mapsConfigured = false;
function ensureMapsConfigured(): void {
  if (mapsConfigured) return;
  setOptions({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
  } as Parameters<typeof setOptions>[0]);
  mapsConfigured = true;
}

// ─── Colour per activity type ─────────────────────────────────────────────────

const TYPE_COLOURS: Record<string, string> = {
  attraction: "#2A7BFF",
  meal: "#FF8C42",
  rest: "#6DD3B0",
  travel: "#94A3B8",
  empty: "#CBD5E1",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function RouteMap({ day, dayLabel }: RouteMapProps): React.ReactElement {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter out empty slots and activities with no valid coordinates
  const mappableActivities = day.activities.filter(
    (a) =>
      a.type !== "empty" &&
      a.recommendation.location.coordinates.lat !== 0 &&
      a.recommendation.location.coordinates.lng !== 0
  );

  const apiKeyMissing = !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!mapRef.current) return;
    if (apiKeyMissing) return;
    if (mappableActivities.length === 0) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function initMap(): Promise<void> {
      try {
        ensureMapsConfigured();
        const { Map } = await importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await importLibrary("marker");

        if (cancelled || !mapRef.current) return;

        // Centre on first activity
        const first = mappableActivities[0]!;
        const center = first.recommendation.location.coordinates;

        const map = new Map(mapRef.current, {
          center,
          zoom: 13,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "DEMO_MAP_ID",
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          // Prevent fitBounds from zooming in too tight on small cities
          maxZoom: 16,
        });

        mapInstanceRef.current = map;

        // Clear previous markers + polylines
        markersRef.current.forEach((m) => (m.map = null));
        polylinesRef.current.forEach((p) => p.setMap(null));
        markersRef.current = [];
        polylinesRef.current = [];

        const bounds = new google.maps.LatLngBounds();
        const pathCoords: google.maps.LatLngLiteral[] = [];

        mappableActivities.forEach((activity, index) => {
          const coords = activity.recommendation.location.coordinates;
          bounds.extend(coords);
          pathCoords.push(coords);

          const colour = TYPE_COLOURS[activity.type] ?? "#2A7BFF";

          // Numbered pin
          const pin = new PinElement({
            background: colour,
            borderColor: "#ffffff",
            glyphColor: "#ffffff",
            glyphText: String(index + 1),
            scale: 1.1,
          } as google.maps.marker.PinElementOptions);

          const marker = new AdvancedMarkerElement({
            map,
            position: coords,
            content: pin as unknown as HTMLElement,
            title: activity.recommendation.name,
          });

          // Info window on click
          const infoWindow = new google.maps.InfoWindow({
            content: `<div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px 2px; max-width: 200px;">
              <p style="font-weight: 600; margin: 0 0 2px; font-size: 13px;">${index + 1}. ${activity.recommendation.name}</p>
              <p style="margin: 0; font-size: 11px; color: #6B7280;">${activity.time} · ${activity.duration}min</p>
              ${activity.recommendation.location.address ? `<p style="margin: 4px 0 0; font-size: 11px; color: #9CA3AF;">${activity.recommendation.location.address}</p>` : ""}
            </div>`,
          });

          marker.addEventListener("gmp-click", () => {
            infoWindow.open({ anchor: marker, map });
          });

          markersRef.current.push(marker);
        });

        // Draw polyline route
        if (pathCoords.length > 1) {
          const polyline = new google.maps.Polyline({
            path: pathCoords,
            geodesic: true,
            strokeColor: "#2A7BFF",
            strokeOpacity: 0.6,
            strokeWeight: 2.5,
            icons: [
              {
                icon: { path: google.maps.SymbolPath.FORWARD_OPEN_ARROW, scale: 2.5 },
                offset: "50%",
                repeat: "100px",
              },
            ],
          });
          polyline.setMap(map);
          polylinesRef.current.push(polyline);
        }

        // Fit map to all markers
        if (mappableActivities.length > 1) {
          map.fitBounds(bounds, 80);
        } else {
          // Single point — just centre, don't call fitBounds (it over-zooms)
          map.setCenter(center);
          map.setZoom(14);
        }

        setIsLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.error("[RouteMap] Failed to load map:", err);
          setLoadError("Failed to load the map. Check your Google Maps API key.");
          setIsLoading(false);
        }
      }
    }

    void initMap();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day.date, apiKeyMissing]);

  if (apiKeyMissing) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-amber-50 text-sm text-amber-600">
        Google Maps API key is not configured.
      </div>
    );
  }

  if (mappableActivities.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-400">
        No mapped activities for {dayLabel} — fill in the empty slots first.
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-red-50 text-sm text-red-400">
        {loadError}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 bg-white px-4 py-3 text-xs text-gray-500">
        <span className="font-medium text-gray-700">{dayLabel} route</span>
        {Object.entries(TYPE_COLOURS)
          .filter(([t]) => t !== "empty")
          .map(([type, colour]) => (
            <span key={type} className="flex items-center gap-1 capitalize">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: colour }}
              />
              {type}
            </span>
          ))}
      </div>

      {/* Map container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Loading map…
            </div>
          </div>
        )}
        <div ref={mapRef} className="h-72 w-full" />
      </div>

      {/* Stop list */}
      <div className="divide-y divide-gray-100 bg-white">
        {mappableActivities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-3 px-4 py-2.5">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: TYPE_COLOURS[activity.type] ?? "#2A7BFF" }}
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">
                {activity.recommendation.name}
              </p>
              <p className="text-xs text-gray-400">
                {activity.time} · {activity.duration}min
                {activity.travelTime && index < mappableActivities.length - 1
                  ? ` · ${activity.travelTime}min to next`
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
