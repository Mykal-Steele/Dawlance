import { NextRequest, NextResponse } from "next/server";

interface TrackPayload {
  type: string;
  cost: number;
  userId?: string;
  sessionId?: string;
}

/** POST /api/analytics/track — record an API call cost event */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as TrackPayload;

  if (typeof payload?.cost !== "number" || !payload?.type) {
    return NextResponse.json({ error: "type and cost required" }, { status: 400 });
  }

  console.log(
    `[analytics] ${payload.type} | $${payload.cost.toFixed(4)} | user=${payload.userId ?? "anon"}`
  );

  if (payload.cost >= 5.0) {
    console.warn(`[analytics] COST ALERT: ${payload.userId ?? "anon"} exceeded $5 threshold`);
  }

  return new NextResponse(null, { status: 204 });
}
