-- Native members workspace storage. Review and apply using the project SQL
-- administrator. Contains no owner addresses, credentials or private state.
-- Populate the normalized owner email and any original imported DashboardState
-- separately through administrator access. Clients cannot change these tables.
begin;

create table if not exists public.members_allowed_emails (
  email text primary key,
  created_at timestamptz not null default now(),
  constraint members_allowed_email_normalized check (
    email = lower(btrim(email)) and position('@' in email) > 1
  )
);

create table if not exists public.members_workspaces (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  version bigint not null check (version between 0 and 9007199254740991),
  state jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint members_workspace_state_shape check (
    jsonb_typeof(state) = 'object'
    and state ?& array['version', 'demo', 'member', 'projects', 'transactions', 'updates', 'vote']
    and jsonb_typeof(state -> 'version') = 'number'
    and state ->> 'version' = version::text
    and state -> 'demo' = 'true'::jsonb
    and jsonb_typeof(state -> 'member') = 'object'
    and jsonb_typeof(state -> 'projects') = 'array'
    and jsonb_typeof(state -> 'transactions') = 'array'
    and jsonb_typeof(state -> 'updates') = 'array'
    and jsonb_typeof(state -> 'vote') = 'object'
  )
);

-- A staging row is optional. Its state seeds the owner's first authenticated
-- workspace only; later loads never overwrite saved edits with imported data.
create table if not exists public.members_workspace_imports (
  email text primary key references public.members_allowed_emails(email) on delete cascade,
  state jsonb not null,
  created_at timestamptz not null default now(),
  constraint members_import_email_normalized check (email = lower(btrim(email))),
  constraint members_import_state_shape check (
    jsonb_typeof(state) = 'object'
    and state ?& array['version', 'demo', 'member', 'projects', 'transactions', 'updates', 'vote']
    and jsonb_typeof(state -> 'version') = 'number'
    and state -> 'demo' = 'true'::jsonb
    and jsonb_typeof(state -> 'member') = 'object'
    and jsonb_typeof(state -> 'projects') = 'array'
    and jsonb_typeof(state -> 'transactions') = 'array'
    and jsonb_typeof(state -> 'updates') = 'array'
    and jsonb_typeof(state -> 'vote') = 'object'
  )
);

alter table public.members_allowed_emails enable row level security;
alter table public.members_workspaces enable row level security;
alter table public.members_workspace_imports enable row level security;

revoke all on public.members_allowed_emails, public.members_workspaces, public.members_workspace_imports from public, anon, authenticated;
grant usage on schema public to authenticated;
grant select on public.members_allowed_emails, public.members_workspace_imports to authenticated;
grant select, insert on public.members_workspaces to authenticated;
grant update (version, state, updated_at) on public.members_workspaces to authenticated;

drop policy if exists members_allowed_email_self_read on public.members_allowed_emails;
create policy members_allowed_email_self_read on public.members_allowed_emails
  for select to authenticated
  using (email = lower(btrim((select auth.jwt() ->> 'email'))));

drop policy if exists members_workspace_owner_read on public.members_workspaces;
create policy members_workspace_owner_read on public.members_workspaces
  for select to authenticated
  using (
    owner_id = (select auth.uid())
    and exists (select 1 from public.members_allowed_emails allowed
      where allowed.email = lower(btrim((select auth.jwt() ->> 'email'))))
  );

drop policy if exists members_workspace_owner_insert on public.members_workspaces;
create policy members_workspace_owner_insert on public.members_workspaces
  for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and exists (select 1 from public.members_allowed_emails allowed
      where allowed.email = lower(btrim((select auth.jwt() ->> 'email'))))
  );

drop policy if exists members_workspace_owner_update on public.members_workspaces;
create policy members_workspace_owner_update on public.members_workspaces
  for update to authenticated
  using (
    owner_id = (select auth.uid())
    and exists (select 1 from public.members_allowed_emails allowed
      where allowed.email = lower(btrim((select auth.jwt() ->> 'email'))))
  )
  with check (
    owner_id = (select auth.uid())
    and exists (select 1 from public.members_allowed_emails allowed
      where allowed.email = lower(btrim((select auth.jwt() ->> 'email'))))
  );

drop policy if exists members_workspace_import_self_read on public.members_workspace_imports;
create policy members_workspace_import_self_read on public.members_workspace_imports
  for select to authenticated
  using (
    email = lower(btrim((select auth.jwt() ->> 'email')))
    and exists (select 1 from public.members_allowed_emails allowed
      where allowed.email = lower(btrim((select auth.jwt() ->> 'email'))))
  );

commit;
