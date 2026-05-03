import { NextRequest, NextResponse } from "next/server";
import { getItinerary, saveItinerary, deleteItinerary } from "@/lib/utils/cloudant";
import type { Itinerary } from "@/lib/types";

type Ctx = { params: Promise<{ id: string }> };

/** GET /api/plans/[id] — load a single saved plan */
export async function GET(_req: NextRequest, { params }: Ctx): Promise<NextResponse> {
  const { id } = await params;
  try {
    const doc = await getItinerary(id);
    return NextResponse.json({ itinerary: doc, rev: doc._rev });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message.includes("404") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/** PUT /api/plans/[id] — update an existing plan (requires `rev` in body) */
export async function PUT(request: NextRequest, { params }: Ctx): Promise<NextResponse> {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { itinerary, rev } = body as { itinerary: Itinerary; rev: string };
  if (!itinerary || !rev) {
    return NextResponse.json({ error: "Body must contain { itinerary, rev }" }, { status: 400 });
  }

  try {
    const result = await saveItinerary({ ...itinerary, id }, rev);
    return NextResponse.json({ id: result.id, rev: result.rev });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[PUT /api/plans/${id}]`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** DELETE /api/plans/[id]?rev=<rev> — delete a plan */
export async function DELETE(request: NextRequest, { params }: Ctx): Promise<NextResponse> {
  const { id } = await params;
  const rev = new URL(request.url).searchParams.get("rev");

  if (!rev) {
    return NextResponse.json({ error: "Missing ?rev query param" }, { status: 400 });
  }

  try {
    await deleteItinerary(id, rev);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[DELETE /api/plans/${id}]`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
