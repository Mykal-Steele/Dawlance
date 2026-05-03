import { NextRequest, NextResponse } from "next/server";
import { saveItinerary, listItineraries } from "@/lib/utils/cloudant";
import type { Itinerary } from "@/lib/types";

/** GET /api/plans — list all saved plan summaries */
export async function GET(): Promise<NextResponse> {
  try {
    const plans = await listItineraries();
    return NextResponse.json({ plans });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[GET /api/plans]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** POST /api/plans — create a new plan in Cloudant */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const itinerary = body as Itinerary;
  if (!itinerary?.id) {
    return NextResponse.json({ error: "Missing itinerary id" }, { status: 400 });
  }

  try {
    const result = await saveItinerary(itinerary);
    return NextResponse.json({ id: result.id, rev: result.rev }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[POST /api/plans]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
