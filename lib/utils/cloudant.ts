/**
 * IBM Cloudant REST client
 *
 * Persists Itinerary documents in the configured Cloudant database.
 * Uses the same IAM Bearer token pattern as watsonx.ts but with the
 * CLOUDANT_API_KEY credential so the two token caches are independent.
 *
 * Required env vars:
 *   CLOUDANT_URL      - e.g. https://xxx-bluemix.cloudantnosqldb.appdomain.cloud
 *   CLOUDANT_API_KEY  - IBM Cloud IAM API key
 *   CLOUDANT_DB_NAME  - Database name (default: "travel-plans")
 */

import type { Itinerary } from "@/lib/types";

const IAM_URL = "https://iam.cloud.ibm.com/identity/token";
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt - Date.now() > REFRESH_BUFFER_MS) {
    return tokenCache.token;
  }

  const apiKey = process.env.CLOUDANT_API_KEY;
  if (!apiKey) throw new Error("CLOUDANT_API_KEY is not set");

  const res = await fetch(IAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${encodeURIComponent(apiKey)}`,
  });

  const data = (await res.json()) as {
    access_token?: string;
    expiration?: number;
    errorCode?: string;
    error?: string;
    errorMessage?: string;
  };

  if (!res.ok || data.errorCode || data.error) {
    throw new Error(
      `Cloudant IAM auth failed: ${data.errorMessage ?? data.error ?? `HTTP ${res.status}`}`
    );
  }

  tokenCache = {
    token: data.access_token!,
    expiresAt: data.expiration! * 1000,
  };

  return tokenCache.token;
}

function dbUrl(): string {
  const base = process.env.CLOUDANT_URL;
  const db = process.env.CLOUDANT_DB_NAME ?? "travel-plans";
  if (!base) throw new Error("CLOUDANT_URL is not set");
  return `${base.replace(/\/$/, "")}/${db}`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CloudantDoc extends Itinerary {
  _id: string;
  _rev: string;
}

export interface PlanSummary {
  id: string;
  rev: string;
  destination: string;
  startDate: string;
  endDate: string;
  summary: string;
  createdAt: string;
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

/** Create or update an itinerary. Pass `rev` when updating an existing doc. */
export async function saveItinerary(
  itinerary: Itinerary,
  rev?: string
): Promise<{ id: string; rev: string }> {
  const token = await getToken();
  const body: Record<string, unknown> = { ...itinerary, _id: itinerary.id };
  if (rev) body._rev = rev;

  const res = await fetch(`${dbUrl()}/${encodeURIComponent(itinerary.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as { id?: string; rev?: string; error?: string; reason?: string };

  // 409 conflict without a rev means the doc already exists — fetch its current _rev and retry once
  if (res.status === 409 && !rev) {
    const existingRes = await fetch(`${dbUrl()}/${encodeURIComponent(itinerary.id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (existingRes.ok) {
      const doc = (await existingRes.json()) as { _rev?: string };
      if (doc._rev) {
        return saveItinerary(itinerary, doc._rev);
      }
    }
  }

  if (!res.ok) {
    throw new Error(
      `Cloudant save failed [${res.status}]: ${data.error ?? "unknown"} — ${data.reason ?? ""}`
    );
  }

  return { id: data.id!, rev: data.rev! };
}

/** Fetch a single itinerary by its ID. */
export async function getItinerary(id: string): Promise<CloudantDoc> {
  const token = await getToken();

  const res = await fetch(`${dbUrl()}/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string; reason?: string };
    throw new Error(`Cloudant get failed [${res.status}]: ${data.error ?? "unknown"}`);
  }

  return res.json() as Promise<CloudantDoc>;
}

/** List all saved plan summaries (no full activity data). */
export async function listItineraries(): Promise<PlanSummary[]> {
  const token = await getToken();

  const res = await fetch(`${dbUrl()}/_all_docs?include_docs=true`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(`Cloudant list failed [${res.status}]: ${data.error ?? "unknown"}`);
  }

  const data = (await res.json()) as {
    rows: Array<{ id: string; value: { rev: string }; doc: CloudantDoc }>;
  };

  return data.rows
    .filter((row) => !row.id.startsWith("_design/"))
    .map((row) => ({
      id: row.id,
      rev: row.value.rev,
      destination: row.doc.destination,
      startDate: row.doc.startDate,
      endDate: row.doc.endDate,
      summary: row.doc.summary,
      createdAt: row.doc.metadata?.createdAt ?? "",
    }));
}

/** Delete an itinerary. `rev` must match the current Cloudant revision. */
export async function deleteItinerary(id: string, rev: string): Promise<void> {
  const token = await getToken();

  const res = await fetch(`${dbUrl()}/${encodeURIComponent(id)}?rev=${encodeURIComponent(rev)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string; reason?: string };
    throw new Error(
      `Cloudant delete failed [${res.status}]: ${data.error ?? "unknown"} — ${data.reason ?? ""}`
    );
  }
}
