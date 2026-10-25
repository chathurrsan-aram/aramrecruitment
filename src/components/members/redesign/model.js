import { calculateTotals } from '@/lib/members/domain';
import { labelStatus, ledgerRows, projectContext, voteDeadline, voteRemaining } from '@/lib/members/presentation';

export const money = p => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: p % 100 ? 2 : 0, minimumFractionDigits: p % 100 ? 2 : 0 }).format(p / 100);
export const day = d => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));
export const month = d => new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', month: 'long', year: 'numeric' }).format(new Date(d));
export const memberImage = src => /^\/aram-(community|hope|field-context)\.jpg$/.test(src) ? `/members${src}` : src;
export const percent = (part, whole) => whole > 0 ? part / whole * 100 : 0;
export const formatPercent = value => `${value > 0 && value < 1 ? value.toFixed(2) : Math.round(value)}%`;
const areaColors = ['#5E3F8C', '#A88BD6', '#F2B33D', '#2F8A5B', '#C85C5C'];

/** Splits a whole number of pence across weights so the parts add back up exactly. */
function apportion(totalPence, weights) {
  const sum = weights.reduce((n, w) => n + w, 0);
  if (!sum) return weights.map(() => 0);
  const raw = weights.map(w => totalPence * w / sum);
  const parts = raw.map(Math.floor);
  let left = totalPence - parts.reduce((n, p) => n + p, 0);
  raw.map((r, i) => [r - parts[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { parts[i] += 1; left -= 1; } });
  return parts;
}

/** Everything the V3–V5 screens show, derived from the same workspace state V2 uses. */
export function deriveModel(state, now) {
  const totals = calculateTotals(state);
  const isPrivate = state.access?.mode === 'private';
  const projects = state.projects.map(p => ({
    ...p, image: memberImage(p.image), meta: projectContext(p), statusLabel: p.status === 'proposed' ? 'Concept · not yet approved' : labelStatus(p.status),
    pctFunded: Math.round(percent(p.fundedPence, p.fundingGoalPence)),
  }));
  const byId = Object.fromEntries(projects.map(p => [p.id, p]));

  const areaTotals = new Map();
  for (const t of state.transactions) {
    if (t.kind !== 'deployment') continue;
    const name = byId[t.projectId]?.category || 'Community fund';
    areaTotals.set(name, (areaTotals.get(name) || 0) - t.amountPence);
  }
  const areaList = [...areaTotals].sort((a, b) => b[1] - a[1]);
  const slices = apportion(state.member.monthlyPence, areaList.map(([, pence]) => pence));
  const areas = areaList.map(([name, pence], i) => ({ name, pence, pct: percent(pence, totals.deployedPence), color: areaColors[i % areaColors.length], slicePence: slices[i] }));

  const memberEntries = state.transactions.filter(t => t.memberContribution);
  const memberGivenPence = memberEntries.reduce((n, t) => n + t.amountPence, 0);
  const ledger = ledgerRows(state.transactions).map(t => ({ ...t, projectTitle: byId[t.projectId]?.title || 'Community fund' }));
  const funded = projects.filter(p => p.deployedPence > 0);
  const closesAt = state.vote.closesAt;
  const voteOpen = now === null || Date.parse(closesAt) > now;
  const name = isPrivate ? state.member.name || 'Member' : 'Demo member';

  return {
    isPrivate, totals, projects, byId, areas, ledger, funded,
    eligible: projects.filter(p => p.status !== 'completed'),
    memberEntries, memberGivenPence, sharePct: percent(memberGivenPence, totals.contributedPence),
    monthlyPence: state.member.monthlyPence,
    member: { name, first: name.split(/\s+/)[0], initials: name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase(), joined: month(state.member.joinedAt) },
    vote: { closesAt, open: voteOpen, deadline: voteDeadline(closesAt), remaining: now === null ? '' : voteRemaining(closesAt, now), choice: byId[state.vote.projectId] || null },
    updates: state.updates.map(u => ({ ...u, project: byId[u.projectId] })),
    lastEntryDate: ledger[0]?.date,
    reportedMonth: month(now ?? (ledger[0] ? Date.parse(ledger[0].date) : Date.now())),
    shareCaption: `I’ve joined Aram, a diaspora community funding long-term, community-led work in Sri Lanka. Together we’ve sent ${money(totals.deployedPence)} to local partners so far. Find your part in the work at join.aram.org.uk`,
  };
}
