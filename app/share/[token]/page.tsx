import { notFound } from "next/navigation";
import type { Itinerary } from "@/lib/types";
import { SharedItineraryView } from "./SharedItineraryView";

interface Props {
  params: Promise<{ token: string }>;
}

async function getSharedItinerary(token: string): Promise<Itinerary | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/plans/share?token=${encodeURIComponent(token)}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { itinerary?: Itinerary };
    return data.itinerary ?? null;
  } catch {
    return null;
  }
}

export default async function SharePage({ params }: Props): Promise<React.ReactElement> {
  const { token } = await params;
  const itinerary = await getSharedItinerary(token);

  if (!itinerary) notFound();

  return <SharedItineraryView itinerary={itinerary} />;
}
