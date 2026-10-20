import { createSeedState } from '../../../../lib/members/seed.js';
import { requireMember } from "../../../../lib/members/auth.js";
import { applyAction, DomainError, parseMutation, requireOwnerId } from "../../../../lib/members/domain.js";
import { loadWorkspace, readWorkspace, saveWorkspace } from "../../../../lib/members/storage.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const headers = { "Cache-Control": "no-store, private", Vary: "Cookie" };
const maxBodyBytes = 32_768;
const canonicalOrigins = new Set(["https://aram.org.uk", "https://www.aram.org.uk"]);

function requireSameOrigin(request) {
  const requestOrigin = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  // The canonical host and its www alias belong to the same deployment. Other
  // environments must match their actual request origin exactly; forwarded host
  // headers and client-provided owner IDs never select a trusted origin or owner.
  const isCanonicalAlias = canonicalOrigins.has(requestOrigin) && canonicalOrigins.has(origin);
  if (!origin || (origin !== requestOrigin && !isCanonicalAlias) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new DomainError("Open this dashboard on the Aram website before saving changes.", "INVALID_ORIGIN", 403);
  }
}

async function readMutation(request) {
  if (request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() !== "application/json") {
    throw new DomainError("Send this form as JSON.", "UNSUPPORTED_CONTENT_TYPE", 415);
  }
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > maxBodyBytes) {
    throw new DomainError("This update is too large.", "PAYLOAD_TOO_LARGE", 413);
  }
  // Bound the stream itself as Content-Length may be absent or inaccurate.
  const reader = request.body?.getReader();
  const chunks = [];
  let length = 0;
  if (reader) {
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > maxBodyBytes) {
          await reader.cancel();
          throw new DomainError("This update is too large.", "PAYLOAD_TOO_LARGE", 413);
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let payload;
  try {
    payload = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new DomainError("This update contains invalid JSON.");
  }
  return parseMutation(payload);
}

function errorResponse(error, state) {
  if (error instanceof DomainError) {
    return Response.json({ error: error.message, code: error.code, ...(error.status === 409 && state ? { state } : {}) }, { status: error.status, headers });
  }
  console.error("Members dashboard request failed", error instanceof Error ? error.message : "Unknown storage error");
  return Response.json({ error: "The dashboard could not be saved or loaded. Please try again.", code: "DASHBOARD_UNAVAILABLE" }, { status: 500, headers });
}

export async function GET() {
  try {
    const ownerId = requireOwnerId(await requireMember());
    return Response.json({ ...await loadWorkspace(ownerId), access: { mode: 'private' } }, { headers });
  } catch (error) {
    if (error instanceof DomainError && ['UNAUTHENTICATED', 'FORBIDDEN'].includes(error.code)) {
      const state = createSeedState();
      state.member.name = 'Demo member';
      state.transactions = state.transactions.map(t => ({ ...t, description: t.description.replace('Chath', 'Sample member') }));
      return Response.json({ ...state, access: { mode: 'public-demo' } }, { headers });
    }
    return errorResponse(error);
  }
}

export async function POST(request) {
  let current;
  try {
    const ownerId = requireOwnerId(await requireMember());
    requireSameOrigin(request);
    const mutation = await readMutation(request);
    current = await loadWorkspace(ownerId);
    const next = applyAction(current, mutation);
    if (!await saveWorkspace(ownerId, next, mutation.version)) {
      current = await readWorkspace(ownerId);
      throw new DomainError("This dashboard changed in another tab. Review the latest version and try again.", "VERSION_CONFLICT", 409);
    }
    return Response.json({ ...next, access: { mode: 'private' } }, { headers });
  } catch (error) {
    return errorResponse(error, current ? { ...current, access: { mode: 'private' } } : undefined);
  }
}
