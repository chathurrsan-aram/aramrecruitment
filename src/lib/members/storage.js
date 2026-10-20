import { createMemberClient } from "./auth.js";
import { DomainError, requireOwnerId } from "./domain.js";
import { createSeedState } from "./seed.js";

function storageUnavailable() {
  // Do not expose database diagnostics, SQL, private state or credentials.
  return new DomainError("Dashboard storage is temporarily unavailable.", "STORAGE_UNAVAILABLE", 503);
}

function validateState(state) {
  if (!state || !Number.isSafeInteger(state.version) || state.version < 0 || state.demo !== true ||
      !state.member || !Array.isArray(state.projects) || !Array.isArray(state.transactions) ||
      !Array.isArray(state.updates) || !state.vote) {
    throw storageUnavailable();
  }
  return state;
}

async function findWorkspace(client, ownerId) {
  const { data, error } = await client.from("members_workspaces")
    .select("version,state").eq("owner_id", ownerId).maybeSingle();
  if (error) throw storageUnavailable();
  if (!data) return null;
  const state = validateState(data.state);
  if (Number(data.version) !== state.version) throw storageUnavailable();
  return structuredClone(state);
}

export async function loadWorkspace(ownerId) {
  requireOwnerId({ userId: ownerId });
  const client = await createMemberClient();
  const existing = await findWorkspace(client, ownerId);
  if (existing) return existing;

  // RLS exposes at most the authenticated user's import. No email or owner
  // supplied by a form or header is used to locate this private migration row.
  const { data: imported, error: importError } = await client.from("members_workspace_imports")
    .select("state").maybeSingle();
  if (importError) throw storageUnavailable();
  const seed = structuredClone(validateState(imported?.state ?? createSeedState()));
  const { error } = await client.from("members_workspaces").upsert({
    owner_id: ownerId,
    version: seed.version,
    state: seed,
    updated_at: new Date().toISOString(),
  }, { onConflict: "owner_id", ignoreDuplicates: true });
  if (error) throw storageUnavailable();

  // Concurrent first loads may race; an existing workspace always wins over a
  // seed/import and is never overwritten by initialization.
  const current = await findWorkspace(client, ownerId);
  if (!current) throw storageUnavailable();
  return current;
}

export async function readWorkspace(ownerId) {
  requireOwnerId({ userId: ownerId });
  const current = await findWorkspace(await createMemberClient(), ownerId);
  if (!current) throw new DomainError("The dashboard workspace was not found.", "WORKSPACE_NOT_FOUND", 404);
  return current;
}

export async function saveWorkspace(ownerId, state, expectedVersion) {
  requireOwnerId({ userId: ownerId });
  if (!Number.isSafeInteger(expectedVersion) || expectedVersion < 0 || expectedVersion >= Number.MAX_SAFE_INTEGER ||
      !Number.isSafeInteger(state?.version) || state.version !== expectedVersion + 1) {
    throw new DomainError("Invalid dashboard version.");
  }
  validateState(state);
  const client = await createMemberClient();
  // The predicate and both changed fields are one atomic SQL UPDATE. RLS still
  // requires the authenticated UID and a current allowlisted JWT email.
  const { data, error } = await client.from("members_workspaces").update({
    version: state.version,
    state,
    updated_at: new Date().toISOString(),
  }).eq("owner_id", ownerId).eq("version", expectedVersion).select("owner_id");
  if (error) throw storageUnavailable();
  return Array.isArray(data) && data.length === 1;
}
