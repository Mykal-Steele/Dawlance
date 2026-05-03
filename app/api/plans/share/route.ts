import { NextRequest, NextResponse } from "next/server";
import { getItinerary, saveShareToken, getShareToken } from "@/lib/utils/cloudant";
import type { Itinerary } from "@/lib/types";

function generateToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
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

  try {
    await saveShareToken(token, resolvedItinerary, TTL_MS);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/plans/share]", msg);
    return NextResponse.json({ error: "Failed to create share link" }, { status: 500 });
  }

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

  try {
    const itinerary = await getShareToken(token);
    if (!itinerary) {
      return NextResponse.json({ error: "Share link not found or expired" }, { status: 404 });
    }
    return NextResponse.json({ itinerary });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[GET /api/plans/share]", msg);
    return NextResponse.json({ error: "Failed to retrieve share link" }, { status: 500 });
  }
}
