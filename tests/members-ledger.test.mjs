import test from 'node:test';
import assert from 'node:assert/strict';
import {ledgerCsv} from '../src/lib/members/ledger.js';
import {createSeedState} from '../src/lib/members/seed.js';

// Removing the text-cell guard must fail this check: CSV quotes alone do not
// stop a spreadsheet from treating a user-written description/title as a formula.
test('spreadsheet export treats formula-like descriptions and project names as text',()=>{
  for(const [input,quoted] of [
    ['=1+1','"\'=1+1"'],['+SUM(1)','"\'+SUM(1)"'],['-1+1','"\'-1+1"'],['@SUM(1)','"\'@SUM(1)"'],
    ['  =1+1','"\'  =1+1"'],['\t=1+1','"\'\t=1+1"'],['\r=1+1','"\'\r=1+1"'],['\n=1+1','"\'\n=1+1"'],
    ['＝1+1','"\'＝1+1"'],['＋1','"\'＋1"'],['－1','"\'－1"'],['＠SUM(1)','"\'＠SUM(1)"'],
  ]) {
    const state=createSeedState();state.transactions=state.transactions.slice(0,1);
    state.transactions[0].description=input;
    state.projects[0].title=input;state.transactions[0].projectId=state.projects[0].id;
    assert.ok(ledgerCsv(state).includes(`${quoted},${quoted}`),JSON.stringify(input));
  }
});

test('ledger export keeps negative money numeric and reconciles exact pence',()=>{
  const state=createSeedState();state.transactions=[{id:'test',projectId:null,description:'Demo materials',kind:'deployment',amountPence:-125,date:'2026-10-20'}];
  assert.ok(ledgerCsv(state).endsWith('"2026-10-20","Demo materials","Community fund","deployment","-1.25"'));
});

test('CSV quotes, commas and embedded line breaks stay inside one text field',()=>{
  const state=createSeedState();state.transactions=[{id:'test',projectId:null,description:'A, "quoted"\nnote',kind:'contribution',amountPence:25,date:'2026-10-20'}];
  assert.ok(ledgerCsv(state).endsWith('"2026-10-20","A, ""quoted""\nnote","Community fund","contribution","0.25"'));
  assert.ok(ledgerCsv(state).startsWith('"Demonstration data only — not actual Aram financial records"\r\n"Date","Description","Project","Kind","Amount GBP"\r\n'));
});
