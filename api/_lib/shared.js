// Shared helpers for the Vercel serverless functions under /api.
// Files/folders prefixed with "_" are ignored by Vercel's API routing,
// so this module is safe to import without becoming its own endpoint.

const { createClient } = require('@supabase/supabase-js');

function normalizeVietnameseText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s%.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Reads the JSON body exactly once and never throws: on malformed JSON
// (or no body at all) it resolves to {} so callers can fall back
// gracefully instead of the request crashing with an unhandled error.
function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body !== 'string' || !req.body) return {};
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

// Keeps free-text fields bounded so a very large payload can't blow up
// OpenAI cost or local scoring time.
function clampText(text, maxLength = 4000) {
  const value = String(text ?? '');
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

const OPENAI_TIMEOUT_MS = 20000;

// Calls the OpenAI chat completions API and returns the parsed JSON
// response body, or null when no API key is configured (the expected,
// silent "use the local fallback" case). Any other failure (timeout,
// HTTP error, missing/invalid content) throws so callers can surface a
// diagnostic note alongside their fallback.
async function callOpenAIChatJSON({ systemPrompt, userContent, temperature = 0.2 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        response_format: { type: 'json_object' },
        temperature,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ]
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`OpenAI error ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('OpenAI did not return content');
    }
    return JSON.parse(content);
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(`OpenAI request timed out after ${OPENAI_TIMEOUT_MS}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

let cachedServiceSupabaseClient = null;

// Server-only Supabase client using the service_role key — bypasses RLS, so
// this must NEVER be exposed to the browser. Used to (a) verify a caller's
// JWT server-side and (b) write grading results tied to that verified user,
// instead of trusting a client-supplied student id.
function getServiceSupabaseClient() {
  if (cachedServiceSupabaseClient) return cachedServiceSupabaseClient;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
  }

  cachedServiceSupabaseClient = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return cachedServiceSupabaseClient;
}

// Verifies the "Authorization: Bearer <access_token>" header against
// Supabase Auth and returns the authenticated user's id, or null if the
// header is missing/malformed or the token doesn't check out. Never throws.
async function getUserIdFromAuthHeader(req) {
  const header = req.headers?.authorization || req.headers?.Authorization;
  if (!header || typeof header !== 'string' || !header.startsWith('Bearer ')) return null;

  const token = header.slice('Bearer '.length).trim();
  if (!token) return null;

  try {
    const client = getServiceSupabaseClient();
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user.id;
  } catch {
    return null;
  }
}

module.exports = {
  normalizeVietnameseText,
  applyCors,
  readJsonBody,
  clampText,
  callOpenAIChatJSON,
  getServiceSupabaseClient,
  getUserIdFromAuthHeader
};
