import test from 'node:test';
import assert from 'node:assert/strict';
import * as presentation from '../src/lib/members/presentation.js';
import { createSeedState } from '../src/lib/members/seed.js';

test('initiative deep links survive parsing and cannot select an unrelated page', () => {
  assert.deepEqual(presentation.parseMembersPath('/members/initiatives/penpal'), { view: 'Initiatives', projectId: 'penpal' });
  assert.equal(presentation.parseMembersPath('/members/vote').view, 'Community vote');
  assert.equal(presentation.parseMembersPath('/members/login').view, 'Not found');
  assert.equal(presentation.parseMembersPath('/members/initiatives/a/b').view, 'Not found');
});
test('running balances retain all earlier transactions when display is filtered', () => {
  const rows = presentation.ledgerRows(createSeedState().transactions);
  assert.equal(rows[0].balancePence, 497500);
  assert.equal(rows.find(t => t.id === 'seed-deployment-2').balancePence, 590000);
  assert.equal(rows.at(-1).balancePence, 825000);
});
test('same-day transactions keep the entered order and pence exact', () => {
  const rows = presentation.ledgerRows([{ id: 'last', date: '2026-10-01', amountPence: -1 }, { id: 'first', date: '2026-10-01', amountPence: 101 }]);
  assert.deepEqual(rows.map(t => t.balancePence), [100, 101]);
});
test('project balances are ledger-derived including negative remaining cash', () => {
  const rows = presentation.projectFinance({ projects: [{ id: 'a' }], transactions: [{projectId:'a',kind:'contribution',amountPence:1250},{projectId:'a',kind:'deployment',amountPence:-1300},{projectId:null,kind:'contribution',amountPence:500}] });
  assert.deepEqual(rows, [{projectId:'a', inPence:1250,outPence:1300,remainingPence:-50}]);
});
test('unknown partners and locations never inherit another programme’s claims', () => {
  const unknown = presentation.projectContext({id:'new-project',category:'New',location:'Unconfirmed',status:'proposed'});
  assert.equal(unknown.partner, null);
  assert.deepEqual(unknown.districts, []);
  assert.equal(presentation.projectContext({id:'microcredit'}).partner.website,'https://vannihope.org/');
  assert.deepEqual(presentation.projectContext({id:'microcredit'}).districts, []);
});
test('discovery searches known partner names but does not borrow historical Jaffna schemes', () => {
  const projects = createSeedState().projects;
  assert.deepEqual(presentation.filterProjects(projects,{search:'Vanni Hope'}).map(p=>p.id),['microcredit']);
  assert.equal(presentation.filterProjects(projects,{search:'Jaffna'}).length,0);
  assert.equal(presentation.filterProjects(projects,{status:'Completed'}).length,0);
});
test('ballot deadline follows London daylight saving and closes at the exact instant', () => {
  assert.match(presentation.voteDeadline('2026-10-24T23:00:00.000Z'), /25 Oct 2026.*00:00.*BST/);
  assert.match(presentation.voteDeadline('2026-10-27T23:59:59.000Z'), /27 Oct 2026.*23:59.*GMT/);
  assert.equal(presentation.voteRemaining('2026-10-27T23:59:59.000Z',Date.parse('2026-10-27T23:59:59.000Z')),'Round closed');
});
test('drawer close restores an internal originating section and rejects external return targets', () => {
  assert.equal(presentation.memberReturnPath('/members'), '/members');
  assert.equal(presentation.memberReturnPath('/members/updates?initiative=penpal'), '/members/updates?initiative=penpal');
  for (const value of ['https://evil.example/members', '//evil.example/members', '/members/login', '/members/initiatives/penpal', 'javascript:alert(1)', undefined]) {
    assert.equal(presentation.memberReturnPath(value), '/members/initiatives');
  }
});
test('an open initiative keeps the originating section and its filters behind the panel', () => {
  assert.deepEqual(presentation.memberBackgroundRoute('/members/funding', null), { view: 'Funding & ledger', projectId: null, search: null });
  assert.deepEqual(presentation.memberBackgroundRoute('/members/initiatives/penpal', '/members'), { view: 'Overview', projectId: 'penpal', search: '' });
  assert.deepEqual(presentation.memberBackgroundRoute('/members/initiatives/microcredit', '/members/updates?initiative=microcredit'), { view: 'Field updates', projectId: 'microcredit', search: '?initiative=microcredit' });
  // Direct links and unsafe origins fall back to the initiative list, never an external page.
  for (const from of [null, 'https://evil.example/members', '/members/initiatives/penpal', '/members/login']) {
    assert.deepEqual(presentation.memberBackgroundRoute('/members/initiatives/penpal', from), { view: 'Initiatives', projectId: 'penpal', search: '' });
  }
});
