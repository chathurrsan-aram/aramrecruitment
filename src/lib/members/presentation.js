/** Public editorial context only. No private strategy, contact or beneficiary data. */
export const memberPaths = {
  Overview: '/members/overview', Initiatives: '/members/initiatives',
  'Funding & ledger': '/members/funding', 'Community vote': '/members/vote',
  'Field updates': '/members/updates', 'Admin studio': '/members/studio',
  'Thought leadership': '/members/insights', 'Community events': '/members/events',
  'About this prototype': '/members/about',
};
export function parseMembersPath(path) {
  const normalized = path.replace(/\/$/, '');
  // Legacy originating links may still refer to the old overview URL.
  const clean = normalized === '/members' ? memberPaths.Overview : normalized;
  const view = Object.keys(memberPaths).find(key => memberPaths[key] === clean);
  if (view) return { view, projectId: null };
  const match = clean.match(/^\/members\/initiatives\/([a-z0-9-]+)$/);
  return match ? { view: 'Initiatives', projectId: match[1] } : { view: 'Not found', projectId: null };
}
export const projectPath = id => `/members/initiatives/${encodeURIComponent(id)}`;
export const labelStatus = status => status === 'active' ? 'In progress' : status === 'completed' ? 'Completed' : 'Proposal';
const context = {
  microcredit: {
    category: 'Economic Development', publicStatus: 'In progress',
    partner: { id: 'vanni-hope', name: 'Vanni Hope', website: 'https://vannihope.org/',
      role: 'Local delivery, lending-group support, training and monitoring, as described on Aram’s initiative page.' },
    aramRole: 'Aram describes its role as monitoring, community check-ins, training support and improving records.',
    participation: 'Explore how your skills could support records, training or communication with the Aram team.',
    sourceUrl: 'https://www.aram.org.uk/initiatives/microcredit-eastern-province',
  },
  mentorship: {
    category: 'Education', publicStatus: 'In progress', partner: null,
    aramRole: 'Aram connects diaspora mentors with young people for continuing learning and guidance.',
    participation: 'Explore mentoring: the public programme describes onboarding, safety protocols and a minimum four-week commitment.',
    sourceUrl: 'https://www.aram.org.uk/initiatives/virtual-mentorship',
  },
  penpal: {
    category: 'Holistic Wellbeing', publicStatus: 'Pilot phase', partner: null,
    aramRole: 'Aram coordinates handwritten Tamil letter exchanges and reviews letters before they are sent.',
    participation: 'Tamil-literate volunteers can explore helping review letters through Aram’s existing join route.',
    sourceUrl: 'https://www.aram.org.uk/initiatives/pen-pal-project',
  },
  'ai-curriculum': {
    category: 'Education', publicStatus: 'Unapproved proposal', partner: null,
    aramRole: 'An illustrative learning-resource proposal for discussion. No delivery partner or programme launch is confirmed.',
    participation: 'Explore Aram’s education work and general ways to contribute. This proposal is not recruiting participants.',
    sourceUrl: null,
  },
};
export function projectContext(project) {
  return { category: project.category, publicStatus: labelStatus(project.status), partner: null,
    districts: [], aramRole: 'Delivery responsibilities need confirmation.',
    participation: 'Explore ways to take part with the Aram team.', sourceUrl: null,
    ...(context[project.id] || {}),
  };
}
export function filterProjects(projects, { search = '', status = 'All', partnerId = '' } = {}) {
  const query = search.trim().toLowerCase();
  return projects.filter(p => {
    const meta = projectContext(p);
    return (status === 'All' || labelStatus(p.status) === status)
      && (!partnerId || meta.partner?.id === partnerId)
      && `${p.title} ${p.description} ${p.location} ${meta.category} ${meta.partner?.name || ''}`.toLowerCase().includes(query);
  });
}
export function ledgerRows(transactions) {
  // State is newest-entry first; reverse before a stable date sort for same-day entries.
  let balancePence = 0;
  return [...transactions].reverse().sort((a, b) => a.date.localeCompare(b.date)).map(t => {
    balancePence += t.amountPence;
    return { ...t, balancePence };
  }).reverse();
}
export function projectFinance(state) {
  return state.projects.map(p => {
    const entries = state.transactions.filter(t => t.projectId === p.id);
    const inPence = entries.filter(t => t.kind === 'contribution').reduce((sum, t) => sum + t.amountPence, 0);
    const outPence = entries.filter(t => t.kind === 'deployment').reduce((sum, t) => sum - t.amountPence, 0);
    return { projectId: p.id, inPence, outPence, remainingPence: inPence - outPence };
  });
}
export function voteDeadline(iso) {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).format(new Date(iso));
}
export function voteRemaining(iso, now) {
  const remaining = Date.parse(iso) - now;
  if (remaining <= 0) return 'Round closed';
  const hours = Math.floor(remaining / 3600000);
  return hours >= 24 ? `${Math.floor(hours / 24)} days, ${hours % 24} hours remaining` : `${hours} hours, ${Math.floor(remaining / 60000) % 60} minutes remaining`;
}
/**
 * The section shown behind an open initiative panel: the page the visitor came
 * from, with its own filters, or the initiative list for a direct link. Keeping
 * that page in place lets the panel feel like a closer look, not a new page.
 */
export function memberBackgroundRoute(pathname, from) {
  const route = parseMembersPath(pathname);
  if (!route.projectId) return { view: route.view, projectId: null, search: null };
  const origin = new URL(memberReturnPath(from), 'https://www.aram.org.uk');
  return { view: parseMembersPath(origin.pathname).view, projectId: route.projectId, search: origin.search };
}
export function memberReturnPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/members') || value.length > 512) return memberPaths.Initiatives;
  const url = new URL(value, 'https://www.aram.org.uk');
  const route = parseMembersPath(url.pathname);
  return url.origin === 'https://www.aram.org.uk' && route.view !== 'Not found' && !route.projectId
    ? `${url.pathname === '/members' || url.pathname === '/members/' ? memberPaths.Overview : url.pathname}${url.search}` : memberPaths.Initiatives;
}
