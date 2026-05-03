import { NextRequest, NextResponse } from "next/server";
import { getItinerary } from "@/lib/utils/cloudant";
import type { Itinerary } from "@/lib/types";

// Simple in-memory share store — replaced by Cloudant in production.
// For hackathon scope this is sufficient (ephemeral, server-side).
const shareStore = new Map<string, { planId: string; itinerary: Itinerary; expiresAt: number }>();

function generateToken(): string {
  // Use crypto.randomUUID when available (Node 15+), fall back to a hex approach
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: 32 random hex chars
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/** POST /api/plans/share — generate a shareable token for a plan */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { planId, itinerary } = body as { planId?: string; itinerary?: Itinerary };

  if (!planId && !itinerary) {
    return NextResponse.json({ error: "planId or itinerary required" }, { status: 400 });
  }

  let resolvedItinerary: Itinerary;

  if (itinerary) {
    resolvedItinerary = itinerary;
  } else {
    try {
      resolvedItinerary = await getItinerary(planId!);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: msg }, { status: 404 });
    }
  }

  const token = generateToken();
  const expiresAt = Date.now() + TTL_MS;
  shareStore.set(token, { planId: resolvedItinerary.id, itinerary: resolvedItinerary, expiresAt });

  const baseUrl = request.nextUrl.origin;
  const shareUrl = `${baseUrl}/share/${token}`;

  return NextResponse.json({ token, shareUrl });
}

/** GET /api/plans/share?token=xxx — retrieve a shared plan */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "token required" }, { status: 400 });
  }

  const entry = shareStore.get(token);
  if (!entry) {
    return NextResponse.json({ error: "Share link not found or expired" }, { status: 404 });
  }

  if (Date.now() > entry.expiresAt) {
    shareStore.delete(token);
    return NextResponse.json({ error: "Share link has expired" }, { status: 410 });
  }

  return NextResponse.json({ itinerary: entry.itinerary });
}
