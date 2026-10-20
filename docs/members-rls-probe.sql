-- Run as the SQL administrator in one connection/transaction. All fixtures and
-- writes are rolled back. No Auth API calls, emails, passwords or real accounts.
-- An assertion failure aborts this transaction; issue ROLLBACK if your SQL client
-- keeps the failed transaction open. Success returns the final marker below.
begin;

insert into auth.users (id, aud, role, email, email_confirmed_at, created_at, updated_at)
values
  ('00000000-0000-4000-8000-00000000a001', 'authenticated', 'authenticated', 'rls-owner@example.invalid', now(), now(), now()),
  ('00000000-0000-4000-8000-00000000a002', 'authenticated', 'authenticated', 'rls-unknown@example.invalid', now(), now(), now());
insert into public.members_allowed_emails (email) values ('rls-owner@example.invalid');
insert into public.members_workspace_imports (email, state) values (
  'rls-owner@example.invalid',
  '{"version":0,"demo":true,"member":{},"projects":[],"transactions":[],"updates":[],"vote":{}}'::jsonb
);

set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$
begin
  begin perform 1 from public.members_allowed_emails; raise exception 'FAIL: anon can query allowlist';
  exception when insufficient_privilege then null; end;
  begin perform 1 from public.members_workspaces; raise exception 'FAIL: anon can query workspaces';
  exception when insufficient_privilege then null; end;
  begin perform 1 from public.members_workspace_imports; raise exception 'FAIL: anon can query imports';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000a002","role":"authenticated","email":"rls-unknown@example.invalid"}', true);
do $$
begin
  if exists (select 1 from public.members_allowed_emails) then raise exception 'FAIL: unknown email sees allowlist'; end if;
  if exists (select 1 from public.members_workspace_imports) then raise exception 'FAIL: unknown email sees imports'; end if;
  if exists (select 1 from public.members_workspaces) then raise exception 'FAIL: unknown email sees workspaces'; end if;
  begin
    insert into public.members_workspaces (owner_id, version, state) values (
      '00000000-0000-4000-8000-00000000a002', 0,
      '{"version":0,"demo":true,"member":{},"projects":[],"transactions":[],"updates":[],"vote":{}}'::jsonb
    );
    raise exception 'FAIL: unknown email inserted workspace';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

set local role authenticated;
-- Deliberately mixed case/outer whitespace verifies policy normalization.
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000a001","role":"authenticated","email":" RLS-OWNER@EXAMPLE.INVALID "}', true);
do $$
declare affected integer;
begin
  if (select count(*) from public.members_allowed_emails) <> 1 then raise exception 'FAIL: owner allowlist isolation'; end if;
  if (select count(*) from public.members_workspace_imports) <> 1 then raise exception 'FAIL: owner import isolation'; end if;
  insert into public.members_workspaces (owner_id, version, state)
    select '00000000-0000-4000-8000-00000000a001', 0, state from public.members_workspace_imports;
  if (select count(*) from public.members_workspaces) <> 1 then raise exception 'FAIL: owner cannot read own workspace'; end if;

  -- Same atomic version/state update used by the production CAS query.
  update public.members_workspaces set version = 1,
    state = jsonb_set(state, '{version}', '1'::jsonb), updated_at = now()
    where owner_id = '00000000-0000-4000-8000-00000000a001' and version = 0;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'FAIL: owner winning CAS did not update one row'; end if;
  update public.members_workspaces set version = 1,
    state = jsonb_set(state, '{version}', '1'::jsonb)
    where owner_id = '00000000-0000-4000-8000-00000000a001' and version = 0;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'FAIL: stale CAS changed state'; end if;

  begin
    insert into public.members_workspaces (owner_id, version, state) values (
      '00000000-0000-4000-8000-00000000a002', 0,
      '{"version":0,"demo":true,"member":{},"projects":[],"transactions":[],"updates":[],"vote":{}}'::jsonb
    );
    raise exception 'FAIL: owner inserted another UID workspace';
  exception when insufficient_privilege then null; end;
  begin
    update public.members_workspaces set owner_id = '00000000-0000-4000-8000-00000000a002';
    raise exception 'FAIL: owner reassigned workspace UID';
  exception when insufficient_privilege then null; end;
  begin
    insert into public.members_allowed_emails(email) values ('extra@example.invalid');
    raise exception 'FAIL: owner changed allowlist';
  exception when insufficient_privilege then null; end;
  begin
    update public.members_workspace_imports set state = state;
    raise exception 'FAIL: owner changed import';
  exception when insufficient_privilege then null; end;
end $$;
reset role;

-- The unallowlisted second user must still not see/update the first user's row.
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000a002","role":"authenticated","email":"rls-unknown@example.invalid"}', true);
do $$
declare affected integer;
begin
  if exists (select 1 from public.members_workspaces) then raise exception 'FAIL: second UID sees owner row'; end if;
  update public.members_workspaces set updated_at = now();
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'FAIL: second UID updated owner row'; end if;
end $$;
reset role;

-- Revocation must hide existing state even when the UID and JWT are unchanged.
delete from public.members_allowed_emails where email = 'rls-owner@example.invalid';
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-00000000a001","role":"authenticated","email":"rls-owner@example.invalid"}', true);
do $$
declare affected integer;
begin
  if exists (select 1 from public.members_workspaces) then raise exception 'FAIL: revoked owner still sees workspace'; end if;
  update public.members_workspaces set updated_at = now();
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'FAIL: revoked owner updated workspace'; end if;
end $$;
reset role;

rollback;
select 'PASS: anonymous deny, allowlist isolation, own import/insert/CAS, cross-owner deny, client admin-write deny, revocation; all fixtures rolled back' as members_rls_probe;
