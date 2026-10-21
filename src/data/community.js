/** Curated public material, shared by the website and member dashboard. */
export const thoughtLeadership = [{
  id: 'quiet-revolution',
  title: 'A Quiet Revolution: How Self-Help Groups Are Transforming Sri Lankan Communities',
  summary: 'An Aram Research & Insights article exploring women-led self-help groups, collective savings and the role of community organisation in Sri Lanka.',
  authors: ['Tharunya Sivarupan', 'Ajetha Koneswaran', 'Harren Selvakumar'],
  publishedAt: '2024-12-26',
  topic: 'Community-led development',
  url: 'https://aramresearchinsights.substack.com/p/a-quiet-revolution-how-self-help',
  publication: 'Aram Research & Insights',
}];

// Add only announced events with confirmed dates and a public information route.
// The historic discovery trip and potential event formats are not upcoming events.
export const communityEvents = [];

export function upcomingEvents(events, now) {
  if (!Number.isFinite(now)) return [];
  return events.filter(event => event.published === true && event.status === 'scheduled'
    && Number.isFinite(Date.parse(event.startsAt)) && Date.parse(event.startsAt) > now)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
}

export function eventDate(event) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: event.timeZone || 'Europe/London', day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(event.startsAt));
}
