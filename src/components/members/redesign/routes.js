import { createSeedState } from '@/lib/members/seed';

/** Sections every redesign version (V3–V5) provides under its own base path, e.g. /p1/v5/ledger. */
export const sections = ['initiatives', 'ledger', 'vote', 'updates', 'insights', 'events', 'membership'];
const projectIds = new Set(createSeedState().projects.map(p => p.id));

export function parseSection(segments = []) {
  if (!segments.length) return { view: 'home', projectId: null };
  if (segments.length === 1 && sections.includes(segments[0])) return { view: segments[0], projectId: null };
  if (segments.length === 2 && segments[0] === 'initiatives' && projectIds.has(segments[1])) return { view: 'initiative', projectId: segments[1] };
  return { view: 'not-found', projectId: null };
}

export function routeFromPath(base, pathname) {
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : '';
  return parseSection(rest.split('/').filter(Boolean).map(decodeURIComponent));
}

/** Builds links inside one version: to('ledger'), to('initiatives', 'microcredit'). */
export const linker = base => (...parts) => [base, ...parts.filter(Boolean).map(encodeURIComponent)].join('/');
