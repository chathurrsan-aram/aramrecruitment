import test from 'node:test';
import assert from 'node:assert/strict';
import { upcomingEvents, eventDate } from '../src/data/community.js';
import { parseMembersPath } from '../src/lib/members/presentation.js';

test('only announced, scheduled, future events appear in the upcoming list', () => {
  const now = Date.parse('2026-10-21T12:00:00Z');
  const event = { published: true, status: 'scheduled', startsAt: '2026-11-01T14:00:00Z' };
  const events = [{ ...event, id: 'later', startsAt: '2026-12-01T14:00:00Z' }, { ...event, id: 'next' }, { ...event, id: 'draft', published: false }, { ...event, id: 'cancelled', status: 'cancelled' }, { ...event, id: 'past', startsAt: '2026-10-20T14:00:00Z' }, { ...event, id: 'bad-date', startsAt: 'unconfirmed' }];
  assert.deepEqual(upcomingEvents(events, now).map(e => e.id), ['next', 'later']);
  assert.equal(events[0].id, 'later');
});
test('event times include the venue time zone through the UK clock change', () => {
  assert.match(eventDate({ startsAt: '2026-10-24T17:00:00Z', timeZone: 'Europe/London' }), /24 Oct 2026.*18:00.*BST/);
  assert.match(eventDate({ startsAt: '2026-10-26T17:00:00Z', timeZone: 'Europe/London' }), /26 Oct 2026.*17:00.*GMT/);
});
test('editorial and events sections have independent member deep links', () => {
  assert.equal(parseMembersPath('/members/insights').view, 'Thought leadership');
  assert.equal(parseMembersPath('/members/events').view, 'Community events');
});
