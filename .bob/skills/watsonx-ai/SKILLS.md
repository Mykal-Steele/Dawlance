---
name: ibm-watsonx-ai
description: Use this skill whenever a task involves IBM watsonx.ai — calling the REST API directly with fetch, using the official @ibm-cloud/watsonx-ai Node.js SDK, IAM token authentication, chat completions, text generation, streaming (SSE), tool/function calling, vision input, embeddings, reranking, tokenization, listing foundation models, or migrating code from Google Gemini / OpenAI / Anthropic to watsonx.ai. Triggers include mentions of "watsonx", "watsonx.ai", "IBM Granite", "ibm-cloud", "WATSONX_API_KEY", "WATSONX_PROJECT_ID", "ml.cloud.ibm.com", "iam.cloud.ibm.com", or model IDs like ibm/granite-*, meta-llama/llama-*, or mistralai/* on IBM Cloud.
version: 2.0.0
---
 
# IBM watsonx.ai Developer Skill
 
Authoritative reference for integrating IBM watsonx.ai into Node.js applications. All endpoints, payload shapes, query parameters, and field names below are verified against the official `@ibm-cloud/watsonx-ai` SDK (v1.7.11) source — specifically `src/config/endpoints.ts` and `src/vml_v1.ts`.
 
When given a task, always prefer the **chat completions** API (`/ml/v1/text/chat`) for new code. The older **text generation** API (`/ml/v1/text/generation`) is still supported and is what most pre-2024 examples on the internet use, but chat is the modern, OpenAI-style interface and is what the SDK README itself demonstrates.
 
---
 
## 1. Environment and credentials
 
Read all credentials from environment variables. Never hardcode them.
 
| Variable | Required | Purpose |
|---|---|---|
| `WATSONX_API_KEY` | yes | IBM Cloud API key used to mint an IAM bearer token |
| `WATSONX_PROJECT_ID` | yes (or space id) | Project ID for billing and tracking. Either this or `WATSONX_SPACE_ID` must be sent with every inference call |
| `WATSONX_SPACE_ID` | optional | Deployment space ID — alternative to project ID |
| `WATSONX_REGION` | optional | Defaults to `us-south`. One of `us-south`, `eu-de`, `eu-gb`, `jp-tok`, `au-syd`, `ca-tor` |
| `WATSONX_API_VERSION` | optional | Date string. Default `2024-05-31` |
 
Load them with `dotenv` or a tiny inline parser. The user's working script uses an inline `.env` parser — that's fine for scripts, but `dotenv` is preferred for apps.
 
```javascript
// Inline parser (matches the user's working snippet)
import { readFileSync } from 'fs';
const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
 
// Or use dotenv (preferred for apps)
// import 'dotenv/config';
// const env = process.env;
```
 
---
 
## 2. Regional service URLs
 
The SDK's `PLATFORM_URL_MAPPINGS` table lists every supported region. Pick the one that matches the IBM Cloud account.
 
| Region | Service URL (use as base for `/ml/v1/...`) |
|---|---|
| Dallas | `https://us-south.ml.cloud.ibm.com` |
| Frankfurt | `https://eu-de.ml.cloud.ibm.com` |
| London | `https://eu-gb.ml.cloud.ibm.com` |
| Tokyo | `https://jp-tok.ml.cloud.ibm.com` |
| Sydney | `https://au-syd.ml.cloud.ibm.com` |
| Toronto | `https://ca-tor.ml.cloud.ibm.com` |
| AWS Mumbai | `https://ap-south-1.aws.wxai.ibm.com` |
| AWS N. Virginia | `https://us-east-1.aws.wxai.ibm.com` |
 
The default for almost all IBM Cloud SaaS accounts is **`us-south`**.
 
---
 
## 3. IAM authentication
 
Every watsonx.ai REST call requires a Bearer token minted from the IBM Cloud API key. Tokens are valid for ~60 minutes — cache them and refresh ~5 minutes before expiry.
 
### Endpoint
`POST https://iam.cloud.ibm.com/identity/token`
 
### Implementation
 
```javascript
async function getIamToken(apiKey) {
  const r = await fetch('https://iam.cloud.ibm.com/identity/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' +
          encodeURIComponent(apiKey),
  });
 
  const data = await r.json();
 
  // IAM returns either { access_token, expiration, ... } on success
  // or { errorCode, errorMessage, ... } on failure
  if (!r.ok || data.errorCode || data.error) {
    throw new Error(
      `IAM auth failed: ${data.errorMessage || data.error || r.statusText}`
    );
  }
  return {
    accessToken: data.access_token,
    expiresAt: data.expiration * 1000, // Unix epoch seconds → ms
  };
}
```
 
### Token caching pattern
 
```javascript
let cachedToken = null;
async function getCachedToken(apiKey) {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt - now > 5 * 60 * 1000) {
    return cachedToken.accessToken;
  }
  cachedToken = await getIamToken(apiKey);
  return cachedToken.accessToken;
}
```
 
---
 
## 4. The two inference APIs — pick the right one
 
### 4a. Chat completions — `POST /ml/v1/text/chat`  ✅ preferred for new code
 
OpenAI-style messages array. Supports system/user/assistant/tool roles, multimodal content (images), function/tool calling, JSON mode, and structured output.
 
**Full URL:** `https://{region}.ml.cloud.ibm.com/ml/v1/text/chat?version=2024-05-31`
 
**Request body** (verified against SDK `textChat` method):
 
```json
{
  "model_id": "ibm/granite-3-8b-instruct",
  "project_id": "...",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello" }
  ],
  "max_tokens": 200,
  "temperature": 0.7,
  "top_p": 1.0,
  "n": 1,
  "stop": ["\n\n"],
  "seed": 42,
  "frequency_penalty": 0,
  "presence_penalty": 0,
  "response_format": { "type": "json_object" },
  "tools": [],
  "tool_choice_option": "auto",
  "time_limit": 60000
}
```
 
All fields beyond `model_id`, `messages`, and `project_id`/`space_id` are optional. Other supported fields (from the SDK source): `max_completion_tokens`, `logprobs`, `top_logprobs`, `logit_bias`, `repetition_penalty`, `length_penalty`, `include_reasoning`, `reasoning_effort`, `guided_choice`, `guided_regex`, `guided_grammar`, `guided_json`.
 
**Response shape:**
 
```json
{
  "id": "chat-...",
  "model_id": "ibm/granite-3-8b-instruct",
  "created": 1730000000,
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "completion_tokens": 9,
    "prompt_tokens": 14,
    "total_tokens": 23
  }
}
```
 
**Implementation:**
 
```javascript
async function watsonxChat({ accessToken, projectId, region = 'us-south' }, body) {
  const r = await fetch(
    `https://${region}.ml.cloud.ibm.com/ml/v1/text/chat?version=2024-05-31`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ project_id: projectId, ...body }),
    }
  );
  const data = await r.json();
  if (!r.ok || data.errors) {
    throw new Error(
      `watsonx chat error: ${JSON.stringify(data.errors || data)}`
    );
  }
  return data;
}
 
// Usage
const result = await watsonxChat(
  { accessToken, projectId, region: 'us-south' },
  {
    model_id: 'ibm/granite-3-8b-instruct',
    messages: [{ role: 'user', content: 'Reply with just the word Hello.' }],
    max_tokens: 5,
  }
);
console.log(result.choices[0].message.content);
```
 
### 4b. Text generation — `POST /ml/v1/text/generation`  (legacy, single-prompt)
 
Single-string prompt. Useful when porting older code or for prompt-tuned models. This is the endpoint the user's existing working script uses.
 
**Full URL:** `https://{region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2024-05-31`
 
**Request body:**
 
```json
{
  "model_id": "ibm/granite-3-8b-instruct",
  "input": "Explain quantum computing in one sentence.",
  "project_id": "...",
  "parameters": {
    "decoding_method": "greedy",
    "max_new_tokens": 100,
    "min_new_tokens": 0,
    "temperature": 0.7,
    "top_k": 50,
    "top_p": 1.0,
    "repetition_penalty": 1.0,
    "stop_sequences": ["\n\n"],
    "random_seed": 42
  },
  "moderations": {}
}
```
 
**Response shape:**
 
```json
{
  "model_id": "ibm/granite-3-8b-instruct",
  "created_at": "2025-...",
  "results": [
    {
      "generated_text": "Quantum computing is...",
      "generated_token_count": 23,
      "input_token_count": 8,
      "stop_reason": "eos_token"
    }
  ]
}
```
 
**Implementation** (this is the user's working pattern, with the API version corrected to `2024-05-31`):
 
```javascript
async function watsonxGenerate({ accessToken, projectId, region = 'us-south' }, body) {
  const r = await fetch(
    `https://${region}.ml.cloud.ibm.com/ml/v1/text/generation?version=2024-05-31`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ project_id: projectId, ...body }),
    }
  );
  const data = await r.json();
  if (!r.ok || data.errors) {
    throw new Error(
      `watsonx generate error: ${JSON.stringify(data.errors || data)}`
    );
  }
  return data;
}
```
 
**When to use which:**
 
| Use case | Endpoint |
|---|---|
| New chatbot, agent, or multi-turn assistant | `text/chat` |
| Tool / function calling | `text/chat` |
| Vision (image input) | `text/chat` |
| Single-prompt completion / classification / extraction | either, but `text/generation` matches IBM tutorials |
| Prompt template + variable substitution | deployed-prompt endpoint (§9) |
| Porting old IBM sample code | `text/generation` (matches existing examples) |
 
---
 
## 5. Current foundation models (verified IDs)
 
These IDs are taken directly from current SDK examples and IBM model catalog. Always confirm a model is available in the target region with the list-models endpoint (§10) before hardcoding it.
 
### IBM Granite (general-purpose, instruct)
- `ibm/granite-3-8b-instruct` — workhorse, what the SDK examples use
- `ibm/granite-3-2b-instruct` — small/fast variant
- `ibm/granite-4-h-small` — newer (used in the latest README example)
- `ibm/granite-3-3-8b-instruct` — Granite 3.3
- `ibm/granite-vision-3-2-2b` — Granite vision
### Meta Llama
- `meta-llama/llama-3-3-70b-instruct`
- `meta-llama/llama-3-2-11b-vision-instruct` — vision-capable (used in image example)
- `meta-llama/llama-3-2-90b-vision-instruct`
- `meta-llama/llama-3-1-8b-instruct`
- `meta-llama/llama-3-1-70b-instruct`
### Mistral
- `mistralai/mistral-large`
- `mistralai/mistral-small-3-1-24b-instruct-2503`
- `mistralai/mixtral-8x7b-instruct-v01`
### Embedding models
- `ibm/slate-30m-english-rtrvr`
- `ibm/slate-125m-english-rtrvr`
- `ibm/granite-embedding-107m-multilingual`
- `ibm/granite-embedding-278m-multilingual`
- `intfloat/multilingual-e5-large`
---
 
## 6. Streaming (Server-Sent Events)
 
watsonx streams via SSE. Each event line is `data: {...json...}`, terminated by `data: [DONE]`.
 
**Endpoints:**
- Chat streaming: `POST /ml/v1/text/chat_stream`
- Text-gen streaming: `POST /ml/v1/text/generation_stream`
Same request body as the non-streaming versions.
 
```javascript
async function watsonxChatStream({ accessToken, projectId, region = 'us-south' }, body, onDelta) {
  const r = await fetch(
    `https://${region}.ml.cloud.ibm.com/ml/v1/text/chat_stream?version=2024-05-31`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ project_id: projectId, ...body }),
    }
  );
  if (!r.ok) {
    const errText = await r.text();
    throw new Error(`watsonx stream HTTP ${r.status}: ${errText}`);
  }
 
  const reader = r.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
 
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
 
    let idx;
    while ((idx = buffer.indexOf('\n\n')) >= 0) {
      const event = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 2);
      if (!event.startsWith('data:')) continue;
 
      const payload = event.slice(5).trim();
      if (payload === '[DONE]') return;
 
      try {
        const obj = JSON.parse(payload);
        const delta = obj.choices?.[0]?.delta?.content;
        if (delta) onDelta(delta);
      } catch { /* ignore keep-alive lines */ }
    }
  }
}
 
// Usage
await watsonxChatStream(
  { accessToken, projectId },
  {
    model_id: 'ibm/granite-3-8b-instruct',
    messages: [{ role: 'user', content: 'Write a haiku about clouds.' }],
    max_tokens: 50,
  },
  (chunk) => process.stdout.write(chunk)
);
```
 
For `/text/generation_stream` the delta lives at `obj.results[0].generated_text` instead of `obj.choices[0].delta.content`.
 
---
 
## 7. Tool / function calling
 
Pass an OpenAI-compatible `tools` array. The model returns `tool_calls` in the assistant message; you execute them and feed results back as `role: "tool"` messages.
 
```javascript
const tools = [{
  type: 'function',
  function: {
    name: 'get_weather',
    description: 'Get current weather for a city',
    parameters: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City name' },
        unit: { type: 'string', enum: ['c', 'f'] },
      },
      required: ['city'],
    },
  },
}];
 
const messages = [{ role: 'user', content: 'What is the weather in Karachi?' }];
 
// Round 1 — model decides which tool to call
const r1 = await watsonxChat({ accessToken, projectId }, {
  model_id: 'ibm/granite-3-8b-instruct',
  messages,
  tools,
  tool_choice_option: 'auto',
  max_tokens: 200,
});
 
const assistantMsg = r1.choices[0].message;
const toolCalls = assistantMsg.tool_calls || [];
 
if (toolCalls.length) {
  messages.push(assistantMsg);
 
  for (const call of toolCalls) {
    const args = JSON.parse(call.function.arguments);
    const toolResult = await myWeatherTool(args.city, args.unit); // your code
    messages.push({
      role: 'tool',
      tool_call_id: call.id,
      content: JSON.stringify(toolResult),
    });
  }
 
  // Round 2 — model gives final answer using tool results
  const r2 = await watsonxChat({ accessToken, projectId }, {
    model_id: 'ibm/granite-3-8b-instruct',
    messages,
    tools,
    max_tokens: 200,
  });
  console.log(r2.choices[0].message.content);
}
```
 
`tool_choice_option` can be `"auto"`, `"required"`, or `"none"`. Use `tool_choice` to force a specific function:
```json
{ "tool_choice": { "type": "function", "function": { "name": "get_weather" } } }
```
 
---
 
## 8. Vision input (multimodal chat)
 
Use a vision-capable model (e.g., `meta-llama/llama-3-2-11b-vision-instruct`, `ibm/granite-vision-3-2-2b`) and pass content as an array with `image_url` parts. Images can be remote URLs or `data:` URIs (base64).
 
```javascript
import { readFileSync } from 'fs';
 
const imgB64 = readFileSync('./photo.jpg').toString('base64');
 
const r = await watsonxChat({ accessToken, projectId }, {
  model_id: 'meta-llama/llama-3-2-11b-vision-instruct',
  messages: [{
    role: 'user',
    content: [
      { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imgB64}` } },
      { type: 'text', text: 'What is in this image?' },
    ],
  }],
  max_tokens: 300,
});
console.log(r.choices[0].message.content);
```
 
---
 
## 9. JSON mode and structured output
 
Force valid JSON:
```json
{ "response_format": { "type": "json_object" } }
```
 
Force a specific JSON schema (use `guided_json`, verified field name in SDK):
```json
{
  "guided_json": {
    "type": "object",
    "properties": {
      "city": { "type": "string" },
      "temp_c": { "type": "number" }
    },
    "required": ["city", "temp_c"]
  }
}
```
 
Other guided-decoding options the SDK exposes: `guided_choice` (array of allowed strings), `guided_regex` (regex pattern), `guided_grammar` (Lark grammar).
 
---
 
## 10. List available foundation models
 
Useful at startup to validate a model ID exists in your region.
 
`GET https://{region}.ml.cloud.ibm.com/ml/v1/foundation_model_specs?version=2024-05-31&filters=lifecycle_available`
 
```javascript
async function listWatsonxModels({ accessToken, region = 'us-south' }, filters = 'lifecycle_available') {
  const url = `https://${region}.ml.cloud.ibm.com/ml/v1/foundation_model_specs?version=2024-05-31&filters=${encodeURIComponent(filters)}`;
  const r = await fetch(url, {
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Accept': 'application/json' },
  });
  const data = await r.json();
  return data.resources.map(m => m.model_id);
}
```
 
Useful filter values: `lifecycle_available`, `function_embedding`, `function_text_chat`, `function_text_generation`, `function_image_chat`.
 
---
 
## 11. Embeddings
 
`POST /ml/v1/text/embeddings`
 
```javascript
async function watsonxEmbed({ accessToken, projectId, region = 'us-south' }, modelId, inputs) {
  const r = await fetch(
    `https://${region}.ml.cloud.ibm.com/ml/v1/text/embeddings?version=2024-05-31`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        model_id: modelId,
        project_id: projectId,
        inputs, // string[]
      }),
    }
  );
  const data = await r.json();
  if (data.errors) throw new Error(JSON.stringify(data.errors));
  return data.results.map(r => r.embedding); // number[][]
}
 
// Usage
const vectors = await watsonxEmbed(
  { accessToken, projectId },
  'ibm/slate-125m-english-rtrvr',
  ['Hello world', 'Goodbye world']
);
```
 
---
 
## 12. Tokenization
 
`POST /ml/v1/text/tokenization`
 
```javascript
const r = await fetch(
  `https://us-south.ml.cloud.ibm.com/ml/v1/text/tokenization?version=2024-05-31`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      model_id: 'ibm/granite-3-8b-instruct',
      input: 'Tokenize this sentence.',
      project_id: projectId,
      parameters: { return_tokens: true },
    }),
  }
);
const data = await r.json();
console.log('Token count:', data.result.token_count);
console.log('Tokens:', data.result.tokens);
```
 
---
 
## 13. Reranking
 
`POST /ml/v1/text/rerank` — rank a set of passages against a query.
 
```javascript
const r = await fetch(
  `https://us-south.ml.cloud.ibm.com/ml/v1/text/rerank?version=2024-05-31`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      model_id: 'cross-encoder/ms-marco-minilm-l-12-v2',
      project_id: projectId,
      query: 'How does photosynthesis work?',
      inputs: [
        { text: 'Photosynthesis converts CO2 and water into glucose using sunlight.' },
        { text: 'The mitochondria is the powerhouse of the cell.' },
        { text: 'Plants use chlorophyll to capture light energy.' },
      ],
      parameters: { return_options: { inputs: true }, top_n: 2 },
    }),
  }
);
const data = await r.json();
// data.results = [{ index, score, input: { text } }, ...]
```
 
---
 
## 14. Deployed prompt templates
 
For prompts saved and deployed in a watsonx Project/Space:
 
`POST /ml/v1/deployments/{deployment_id_or_serving_name}/text/generation?version=2024-05-31`
 
```json
{
  "parameters": {
    "prompt_variables": { "input": "It's sunny outside." }
  }
}
```
 
The deployed prompt's stored `model_id` and `model_parameters` are used automatically. You can override `parameters` per-call. Streaming variant: `.../text/generation_stream`. Chat variants: `.../text/chat` and `.../text/chat_stream`.
 
---
 
## 15. Error handling
 
Always check `data.errors` **and** `r.ok` — the API can return a successful HTTP status with errors in the body, or fail at the HTTP layer.
 
```javascript
const r = await fetch(url, { ... });
const data = await r.json().catch(() => ({}));
 
if (!r.ok || data.errors) {
  // data.errors has shape: [{ code, message, more_info? }, ...]
  const msg = data.errors
    ? data.errors.map(e => `${e.code}: ${e.message}`).join('; ')
    : `HTTP ${r.status} ${r.statusText}`;
  throw new Error(`watsonx error: ${msg}`);
}
```
 
### Common error codes
 
| Code | Meaning | Fix |
|---|---|---|
| `authentication_token_not_valid` | IAM token expired or wrong | Re-mint token |
| `authorization_rejected` | API key lacks permission for project | Check IAM policy in IBM Cloud console |
| `model_not_supported` | Model ID not available in this region | Call list-models endpoint to verify |
| `invalid_request_entity` | Body schema is wrong | Check field names — they are `snake_case`, not `camelCase` |
| `token_quota_reached` | Per-minute token limit hit | Backoff and retry, or upgrade plan |
| `model_no_support_for_function` | Model doesn't support tool calling | Switch to a chat-capable instruct model |
 
### Retry logic
 
Retry on `429` (rate limit) and `5xx`. Use exponential backoff with jitter, capped at ~3 attempts.
 
```javascript
async function withRetry(fn, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      const status = e.status || 0;
      const retryable = status === 429 || (status >= 500 && status < 600);
      if (!retryable || i === attempts - 1) throw e;
      const delay = Math.min(1000 * 2 ** i, 8000) + Math.random() * 250;
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
```
 
---
 
## 16. Complete working example (matches the user's verified script)
 
This is a runnable, single-file Node.js script. It uses the user's exact working pattern but with the corrected API version date and adds chat-completions support.
 
```javascript
// watsonx-test.mjs — run with: node watsonx-test.mjs
import { readFileSync } from 'fs';
 
// 1. Load .env
const env = Object.fromEntries(
  readFileSync('.env', 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);
const apiKey    = env.WATSONX_API_KEY;
const projectId = env.WATSONX_PROJECT_ID;
const region    = env.WATSONX_REGION || 'us-south';
const VERSION   = '2024-05-31';
const BASE      = `https://${region}.ml.cloud.ibm.com`;
 
if (!apiKey || !projectId) {
  console.error('Missing WATSONX_API_KEY or WATSONX_PROJECT_ID');
  process.exit(1);
}
 
// 2. Get IAM token
const tokenRes = await fetch('https://iam.cloud.ibm.com/identity/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=' +
        encodeURIComponent(apiKey),
});
const tokenData = await tokenRes.json();
if (!tokenRes.ok || tokenData.errorCode) {
  console.error('IAM failed:', tokenData);
  process.exit(1);
}
const accessToken = tokenData.access_token;
console.log('✓ IAM token OK');
 
// 3a. Chat completion (recommended)
const chatRes = await fetch(`${BASE}/ml/v1/text/chat?version=${VERSION}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    model_id: 'ibm/granite-3-8b-instruct',
    project_id: projectId,
    messages: [{ role: 'user', content: 'Reply with just the word Hello.' }],
    max_tokens: 5,
  }),
});
const chatData = await chatRes.json();
if (!chatRes.ok || chatData.errors) {
  console.error('Chat error:', JSON.stringify(chatData.errors || chatData));
  process.exit(1);
}
console.log('✓ Chat reply:', chatData.choices[0].message.content.trim());
 
// 3b. Legacy text generation (matches user's existing script)
const genRes = await fetch(`${BASE}/ml/v1/text/generation?version=${VERSION}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  },
  body: JSON.stringify({
    model_id: 'ibm/granite-3-8b-instruct',
    input: 'Reply with just the word Hello.',
    project_id: projectId,
    parameters: { max_new_tokens: 5, decoding_method: 'greedy' },
  }),
});
const genData = await genRes.json();
if (!genRes.ok || genData.errors) {
  console.error('Gen error:', JSON.stringify(genData.errors || genData));
  process.exit(1);
}
console.log('✓ Granite reply:', genData.results[0].generated_text.trim());
```
 
---
 
## 17. Migrating from Google Gemini → watsonx.ai
 
This is the mapping table the AI should use when porting Gemini code to watsonx. Rewrite the request, not just the URL — the message and parameter shapes differ.
 
| Gemini concept | watsonx equivalent |
|---|---|
| `GoogleGenerativeAI(apiKey)` | IAM token from `WATSONX_API_KEY` |
| `genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })` | Set `model_id: 'ibm/granite-3-8b-instruct'` (or other) in body |
| `model.generateContent(prompt)` | `POST /ml/v1/text/chat` with `messages: [{ role: 'user', content: prompt }]` |
| `model.generateContentStream(prompt)` | `POST /ml/v1/text/chat_stream` (SSE) |
| `model.startChat({ history })` + `chat.sendMessage(...)` | Build `messages` array yourself; watsonx is stateless — pass full history every call |
| `systemInstruction` | First message with `role: 'system'` |
| `generationConfig.maxOutputTokens` | `max_tokens` (chat) or `parameters.max_new_tokens` (gen) |
| `generationConfig.temperature` | `temperature` |
| `generationConfig.topP` | `top_p` |
| `generationConfig.topK` | `parameters.top_k` (only on `text/generation`) |
| `generationConfig.stopSequences` | `stop` (chat) or `parameters.stop_sequences` (gen) |
| `generationConfig.responseMimeType: 'application/json'` | `response_format: { type: 'json_object' }` |
| `generationConfig.responseSchema` | `guided_json: <schema>` |
| `tools: [{ functionDeclarations: [...] }]` | `tools: [{ type: 'function', function: {...} }]` (OpenAI shape) |
| `Part.fromText`, `Part.fromInlineData` for images | `content: [{ type: 'text', text }, { type: 'image_url', image_url: { url } }]` |
| `response.text()` | `data.choices[0].message.content` |
| `response.functionCalls()` | `data.choices[0].message.tool_calls` |
| `embedContent({ content })` | `POST /ml/v1/text/embeddings` with `inputs: [text]` |
 
**Concrete before/after:**
 
```javascript
// BEFORE — Gemini
import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const result = await model.generateContent('Summarize: ...');
console.log(result.response.text());
 
// AFTER — watsonx
const accessToken = await getCachedToken(process.env.WATSONX_API_KEY);
const r = await fetch(
  `https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2024-05-31`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      model_id: 'ibm/granite-3-8b-instruct',
      project_id: process.env.WATSONX_PROJECT_ID,
      messages: [{ role: 'user', content: 'Summarize: ...' }],
      max_tokens: 500,
    }),
  }
);
const data = await r.json();
console.log(data.choices[0].message.content);
```
 
**Key behavioral differences to watch for:**
 
1. **Stateless** — watsonx does not store chat history server-side. The full `messages` array must be sent every call. (Same as OpenAI; different from Gemini's `startChat`.)
2. **`project_id` is mandatory** — every inference call needs either `project_id` or `space_id`.
3. **Token refresh** — IAM tokens expire after ~1 hour; Gemini API keys don't expire. Implement caching.
4. **Field naming** — watsonx uses `snake_case` (`model_id`, `max_tokens`); Gemini uses `camelCase`.
5. **Streaming format** — both use SSE, but the JSON shape per chunk differs. watsonx puts deltas at `choices[0].delta.content`.
6. **Safety/moderation** — watsonx exposes a top-level `moderations` field on the request body for HAP/PII filtering, instead of Gemini's `safetySettings`.
---
 
## 18. Migrating from OpenAI → watsonx.ai
 
The chat-completions API is intentionally OpenAI-compatible. Most code only needs three changes:
 
1. Change base URL to `https://{region}.ml.cloud.ibm.com/ml/v1/text/chat`
2. Add `?version=2024-05-31` query param
3. Add `project_id` to the body
4. Use IBM IAM bearer token, not an OpenAI API key
```javascript
// BEFORE — OpenAI
await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${OPENAI_KEY}`, ... },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hi' }],
  }),
});
 
// AFTER — watsonx
await fetch('https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2024-05-31', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${iamToken}`, ... },
  body: JSON.stringify({
    model_id: 'ibm/granite-3-8b-instruct',     // was: model
    project_id: process.env.WATSONX_PROJECT_ID, // new field
    messages: [{ role: 'user', content: 'Hi' }],
  }),
});
```
 
The response shape (`choices[0].message.content`, `usage.total_tokens`, etc.) is the same.
 
---
 
## 19. Optional: official Node.js SDK
 
For larger apps, prefer the SDK over raw `fetch`:
 
```bash
npm install @ibm-cloud/watsonx-ai
```
 
```javascript
import { WatsonXAI } from '@ibm-cloud/watsonx-ai';
 
// Set env: WATSONX_AI_AUTH_TYPE=iam, WATSONX_AI_APIKEY=<key>
const watsonxAIService = WatsonXAI.newInstance({
  version: '2024-05-31',
  serviceUrl: 'https://us-south.ml.cloud.ibm.com',
});
 
const { result } = await watsonxAIService.textChat({
  modelId: 'ibm/granite-3-8b-instruct',
  projectId: process.env.WATSONX_PROJECT_ID,
  messages: [{ role: 'user', content: 'Hello' }],
  maxTokens: 50,
});
console.log(result.choices[0].message.content);
```
 
SDK params are `camelCase`; the wire format is `snake_case`. The SDK takes care of token refresh, retries, and SSE parsing.
 
**SDK auth env variables:**
- `WATSONX_AI_AUTH_TYPE=iam` + `WATSONX_AI_APIKEY=<key>` (IBM Cloud SaaS)
- `WATSONX_AI_AUTH_TYPE=bearertoken` + `WATSONX_AI_BEARER_TOKEN=<token>`
- `WATSONX_AI_AUTH_TYPE=cp4d` + `WATSONX_AI_USERNAME` + `WATSONX_AI_PASSWORD` + `WATSONX_AI_URL` (Cloud Pak for Data on-prem)
---
 
## 20. Implementation checklist for the AI
 
When asked to implement watsonx.ai integration, the AI should follow this order:
 
1. Read `WATSONX_API_KEY` and `WATSONX_PROJECT_ID` from env (and optionally `WATSONX_REGION`). Fail fast with a clear error if missing.
2. Implement `getCachedToken()` with the 5-minute pre-expiry refresh.
3. Default to **`/ml/v1/text/chat`** (not `/text/generation`) unless the user explicitly needs single-prompt completion or is porting legacy code.
4. Always include `?version=2024-05-31` in the URL.
5. Always include `project_id` (or `space_id`) in the body.
6. Default model: `ibm/granite-3-8b-instruct` for general chat. `meta-llama/llama-3-2-11b-vision-instruct` for vision.
7. Check **both** `r.ok` and `data.errors` after every call.
8. If streaming, handle SSE properly: split on `\n\n`, strip `data:` prefix, stop on `[DONE]`.
9. Use `snake_case` for all body fields. Don't mix in `camelCase` — that's SDK-only.
10. Don't hardcode the region — read it from env, default to `us-south`.
---
 
*This skill was generated from the official `@ibm-cloud/watsonx-ai` Node.js SDK source (v1.7.11) — `src/config/endpoints.ts` and `src/vml_v1.ts`. All endpoints, body fields, and parameter names are verified against that source.*