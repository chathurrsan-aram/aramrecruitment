import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { createClient } from "@supabase/supabase-js";
import { createSeedState } from "../src/lib/members/seed.js";
import { applyAction, DomainError, parseMutation } from "../src/lib/members/domain.js";

// Exercise production storage with the real Supabase query builder and an
// isolated PostgREST transport. No credentials or live database are involved.
const clientKey = Symbol.for("aram.members.storage-test-client");
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.endsWith("/members/auth.js") ||
      (specifier === "./auth.js" && context.parentURL?.endsWith("/members/storage.js"))) {
    return { shortCircuit: true, url: `data:text/javascript,${encodeURIComponent(
      `export async function createMemberClient(){const env=globalThis[Symbol.for("aram.members.storage-test-client")];env.clients++;return env.client;}`,
    )}` };
  }
  return nextResolve(specifier, context);
} });
const { loadWorkspace, readWorkspace, saveWorkspace } = await import("../src/lib/members/storage.js");

function environment() {
  const env = { owner: "owner-a", allowed: true, rows: new Map(), imported: null, requests: [], clients: 0, fail: false };
  env.client = createClient("https://storage-test.invalid", "publishable-test-key", {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: async (input, init) => {
      const request = new Request(input, init);
      const url = new URL(request.url);
      const table = url.pathname.split("/").at(-1);
      const owner = url.searchParams.get("owner_id")?.replace(/^eq\./, "");
      env.requests.push({ table, method: request.method, owner, query: url.searchParams, prefer: request.headers.get("prefer") });
      if (env.fail) return Response.json({ message: "private diagnostics must never escape" }, { status: 500 });
      if (table === "members_workspace_imports") return Response.json(env.allowed && env.imported ? [{ state: env.imported }] : []);
      if (request.method === "GET") {
        const row = env.allowed && owner === env.owner ? env.rows.get(owner) : null;
        return Response.json(row ? [row] : []);
      }
      const body = await request.json();
      if (request.method === "POST") {
        if (!env.allowed || body.owner_id !== env.owner) return Response.json({ message: "RLS denied" }, { status: 403 });
        assert.ok(request.headers.get("prefer").includes("resolution=ignore-duplicates"));
        assert.equal(url.searchParams.get("on_conflict"), "owner_id");
        if (!env.rows.has(body.owner_id)) env.rows.set(body.owner_id, body);
        return new Response(null, { status: 201 });
      }
      if (request.method === "PATCH") {
        const expected = Number(url.searchParams.get("version")?.replace(/^eq\./, ""));
        const row = env.rows.get(owner);
        if (!env.allowed || owner !== env.owner || !row || row.version !== expected) return Response.json([]);
        assert.equal(body.state.version, body.version);
        env.rows.set(owner, { ...row, ...body });
        return Response.json([{ owner_id: owner }]);
      }
      throw new Error("Unexpected test transport operation");
    } },
  });
  globalThis[clientKey] = env;
  return env;
}

test("initialization is idempotent and concurrent seeds never overwrite saved state", async () => {
  const env = environment();
  const [first, second] = await Promise.all([loadWorkspace(env.owner), loadWorkspace(env.owner)]);
  assert.deepEqual(first, second);
  const next = applyAction(first, parseMutation({ version: 0, action: { type: "updateMember", monthlyPence: 5000 } }));
  assert.equal(await saveWorkspace(env.owner, next, 0), true);
  env.imported = createSeedState();
  env.requests.length = 0;
  const again = await loadWorkspace(env.owner);
  assert.equal(again.member.monthlyPence, 5000);
  assert.equal(again.version, 1);
  assert.equal(env.requests.length, 1);
  assert.equal(env.requests[0].table, "members_workspaces");
  assert.ok(env.clients >= 4);
});

test("the RLS-visible original import seeds only the first workspace", async () => {
  const env = environment();
  env.imported = createSeedState();
  env.imported.version = 7;
  env.imported.projects[0].title = "Preserved original edit";
  const state = await loadWorkspace(env.owner);
  assert.equal(state.version, 7);
  assert.equal(state.projects[0].title, "Preserved original edit");
  assert.equal(env.requests.find(request => request.table === "members_workspace_imports").query.has("email"), false);
  state.projects[0].title = "Unsaved local change";
  assert.equal((await readWorkspace(env.owner)).projects[0].title, "Preserved original edit");
});

test("compare-and-swap keeps the winning edit and returns false for stale writes", async () => {
  const env = environment();
  const initial = await loadWorkspace(env.owner);
  const winner = applyAction(initial, parseMutation({ version: 0, action: { type: "updateMember", monthlyPence: 4000 } }));
  const stale = applyAction(initial, parseMutation({ version: 0, action: { type: "updateMember", monthlyPence: 6000 } }));
  const results = await Promise.all([saveWorkspace(env.owner, winner, 0), saveWorkspace(env.owner, stale, 0)]);
  assert.deepEqual(results, [true, false]);
  assert.equal((await readWorkspace(env.owner)).member.monthlyPence, 4000);
  const patch = env.requests.find(request => request.method === "PATCH");
  assert.equal(patch.owner, env.owner);
  assert.equal(patch.query.get("version"), "eq.0");
});

test("separate authenticated owners keep independent workspaces", async () => {
  const env = environment();
  const initial = await loadWorkspace("owner-a");
  const next = applyAction(initial, parseMutation({ version: 0, action: { type: "updateMember", monthlyPence: 7000 } }));
  assert.equal(await saveWorkspace("owner-a", next, 0), true);
  env.owner = "owner-b";
  assert.equal((await loadWorkspace("owner-b")).member.monthlyPence, 2500);
  await assert.rejects(readWorkspace("owner-a"), error => error.status === 404);
  env.owner = "owner-a";
  assert.equal((await readWorkspace("owner-a")).member.monthlyPence, 7000);
});

test("missing identities and invalid versions fail before sending a query", async () => {
  const env = environment();
  await assert.rejects(loadWorkspace(" "), error => error instanceof DomainError && error.status === 401);
  await assert.rejects(readWorkspace(null), error => error instanceof DomainError && error.status === 401);
  for (const expected of [-1, 0.5, Number.MAX_SAFE_INTEGER]) {
    await assert.rejects(saveWorkspace(env.owner, createSeedState(), expected), /version/i);
  }
  assert.equal(env.requests.length, 0);
});

test("RLS-hidden owners cannot be loaded or updated and errors stay generic", async () => {
  const env = environment();
  const initial = await loadWorkspace(env.owner);
  await assert.rejects(readWorkspace("owner-b"), error => error.code === "WORKSPACE_NOT_FOUND");
  const next = { ...initial, version: 1 };
  assert.equal(await saveWorkspace("owner-b", next, 0), false);
  await assert.rejects(loadWorkspace("owner-b"), error => error.code === "STORAGE_UNAVAILABLE" && !error.message.includes("RLS"));
  env.fail = true;
  await assert.rejects(readWorkspace(env.owner), error => error.status === 503 && !error.message.includes("private diagnostics"));
});
