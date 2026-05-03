/**
 * IBM watsonx.ai client utilities
 *
 * Handles IAM token exchange (cached, 5-min pre-expiry refresh) and provides
 * typed fetch helpers for chat completions (JSON mode) and streaming chat.
 *
 * Required env vars:
 *   WATSONX_API_KEY      - IBM Cloud API key
 *   WATSONX_PROJECT_ID   - watsonx.ai project ID
 *   WATSONX_URL          - e.g. https://us-south.ml.cloud.ibm.com (defaults to us-south)
 */

const IAM_TOKEN_URL = "https://iam.cloud.ibm.com/identity/token";
const API_VERSION = "2024-05-31";

// ─── Model constants ──────────────────────────────────────────────────────────

/** Fast conversational model — used for streaming chat */
export const MODEL_CHAT = "ibm/granite-3-8b-instruct";

/** Used for structured JSON generation (itinerary, recalculate). */
export const MODEL_STRUCTURED = "ibm/granite-3-8b-instruct";

// ─── IAM token cache ──────────────────────────────────────────────────────────

// Refresh 5 minutes before actual expiry (per IBM SDK recommendation)
const TOKEN_REFRESH_BUFFER_MS = 5 * 60 * 1000;

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getIAMToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - Date.now() > TOKEN_REFRESH_BUFFER_MS) {
    return cachedToken.token;
  }

  const apiKey = process.env.WATSONX_API_KEY;
  if (!apiKey) throw new Error("WATSONX_API_KEY is not set");

  const res = await fetch(IAM_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${encodeURIComponent(apiKey)}`,
  });

  const data = (await res.json()) as {
    access_token?: string;
    expiration?: number; // Unix epoch seconds
    expires_in?: number; // seconds remaining
    errorCode?: string;
    error?: string;
    errorMessage?: string;
  };

  if (!res.ok || data.errorCode || data.error) {
    throw new Error(
      `IAM token exchange failed: ${data.errorMessage ?? data.error ?? `HTTP ${res.status}`}`
    );
  }

  // Use `expiration` (absolute Unix epoch) when available; fall back to expires_in
  const expiresAt = data.expiration
    ? data.expiration * 1000
    : Date.now() + (data.expires_in ?? 3600) * 1000;

  cachedToken = { token: data.access_token!, expiresAt };
  return cachedToken.token;
}

// ─── Config helper ────────────────────────────────────────────────────────────

function watsonxURL(path: string): string {
  const base = (process.env.WATSONX_URL ?? "https://us-south.ml.cloud.ibm.com").replace(/\/$/, "");
  return `${base}${path}?version=${API_VERSION}`;
}

// ─── Chat completions (non-streaming) ─────────────────────────────────────────

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompleteParams {
  model?: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
  /** Pass true to enforce response_format: { type: "json_object" } — no markdown fences */
  jsonMode?: boolean;
  /** Hard timeout in ms. Use for long-running generation to avoid proxy timeouts. */
  timeLimitMs?: number;
}

/** Non-streaming chat completion. Use `jsonMode: true` to enforce valid JSON output. */
export async function chatComplete(params: ChatCompleteParams): Promise<string> {
  const projectId = process.env.WATSONX_PROJECT_ID;
  if (!projectId) throw new Error("WATSONX_PROJECT_ID is not set");

  const token = await getIAMToken();

  const body: Record<string, unknown> = {
    model_id: params.model ?? MODEL_STRUCTURED,
    project_id: projectId,
    messages: params.messages,
    max_tokens: params.maxTokens ?? 4096,
    temperature: params.temperature ?? 0.7,
  };

  if (params.jsonMode) {
    body.response_format = { type: "json_object" };
  }

  if (params.timeLimitMs) {
    body.time_limit = params.timeLimitMs;
  }

  const res = await fetch(watsonxURL("/ml/v1/text/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    errors?: Array<{ code: string; message: string }>;
  };

  if (!res.ok || data.errors) {
    const msg = data.errors?.map((e) => `${e.code}: ${e.message}`).join("; ");
    throw new Error(`watsonx.ai chat failed: ${msg ?? `HTTP ${res.status}`}`);
  }

  return data.choices?.[0]?.message?.content ?? "";
}

// ─── Chat (streaming SSE) ─────────────────────────────────────────────────────

export interface StreamChatParams {
  model?: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
}

/** Streaming chat — returns SSE bytes. Caller is responsible for parsing `data:` events. */
export async function streamChat(params: StreamChatParams): Promise<ReadableStream<Uint8Array>> {
  const projectId = process.env.WATSONX_PROJECT_ID;
  if (!projectId) throw new Error("WATSONX_PROJECT_ID is not set");

  const token = await getIAMToken();

  const res = await fetch(watsonxURL("/ml/v1/text/chat_stream"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model_id: params.model ?? MODEL_CHAT,
      messages: params.messages,
      project_id: projectId,
      max_tokens: params.maxTokens ?? 1024,
      temperature: params.temperature ?? 0.7,
    }),
  });

  if (!res.ok || !res.body) {
    const text = await res.text();
    throw new Error(`watsonx.ai chat stream failed: ${res.status} — ${text.slice(0, 300)}`);
  }

  return res.body;
}
