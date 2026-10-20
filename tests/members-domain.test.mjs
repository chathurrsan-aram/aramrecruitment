import test from "node:test";
import assert from "node:assert/strict";
import { applyAction, calculateTotals, parseMutation, requireOwnerId, DomainError, formatMoney } from "../src/lib/members/domain.js";
import { createSeedState } from "../src/lib/members/seed.js";

const now = "2026-10-20T06:00:00.000Z";
function fixture() {
  return {version: 3, demo: true, member: {name: "Chath", monthlyPence: 2500, joinedAt: "2026-06-01T00:00:00.000Z"},
    projects: [{id:"microcredit",title:"Microcredit Revolving Fund",description:"Demo",category:"Livelihoods",location:"Sri Lanka",status:"active",fundingGoalPence:100000,fundedPence:50000,deployedPence:10000,peopleReached:8,image:"/test.jpg",icon:"Sprout"},
      {id:"mentorship",title:"Virtual Mentorship",description:"Demo",category:"Education",location:"Sri Lanka",status:"proposed",fundingGoalPence:50000,fundedPence:0,deployedPence:0,peopleReached:0,image:"/test.jpg",icon:"BookOpen"}],
    transactions:[{id:"t1",projectId:"microcredit",description:"Demo gift",amountPence:50000,kind:"contribution",date:"2026-10-01"},{id:"t2",projectId:"microcredit",description:"Demo deployment",amountPence:-10000,kind:"deployment",date:"2026-10-02"}],
    updates:[],vote:{projectId:null,closesAt:"2026-11-15T23:59:59.000Z"}};
}

test("missing identity cannot choose a workspace owner", () => {
  assert.throws(()=>requireOwnerId(null), /sign in/i);
  assert.throws(()=>requireOwnerId({userId:"  "}), /sign in/i);
  assert.equal(requireOwnerId({userId:"owner-a"}),"owner-a");
});

test("money totals use signed integer pence without losing deployments", () => {
  assert.deepEqual(calculateTotals(fixture()),{contributedPence:50000,deployedPence:10000,balancePence:40000,peopleReached:8,activeProjects:1});
});

test("demo seed reconciles project funding and member contributions within the ledger",()=>{
  const s=createSeedState();
  assert.deepEqual(calculateTotals(s),{contributedPence:1312500,deployedPence:815000,balancePence:497500,peopleReached:186,activeProjects:3});
  assert.equal(s.transactions.filter(t=>t.memberContribution).reduce((n,t)=>n+t.amountPence,0),2500);
  for(const project of s.projects) {
    assert.equal(s.transactions.filter(t=>t.projectId===project.id && t.kind==="contribution").reduce((n,t)=>n+t.amountPence,0),project.fundedPence);
    assert.equal(s.transactions.filter(t=>t.projectId===project.id && t.kind==="deployment").reduce((n,t)=>n-t.amountPence,0),project.deployedPence);
  }
  s.projects[0].title="Changed in one workspace";
  assert.equal(createSeedState().projects[0].title,"Microcredit Revolving Fund");
});

test("a repeated vote cannot create an additional ballot or alter community money",()=>{
  const first=applyAction(fixture(),parseMutation({version:3,action:{type:"vote",projectId:"microcredit"}}),now);
  const again=applyAction(first,parseMutation({version:4,action:{type:"vote",projectId:"microcredit"}}),now);
  assert.deepEqual(again.vote,{projectId:"microcredit",closesAt:"2026-11-15T23:59:59.000Z"});
  assert.equal(again.transactions.length,2);
  assert.equal(calculateTotals(again).balancePence,40000);
});

test("a changed ballot replaces the previous vote and increments once", () => {
  const s=fixture();
  const first=applyAction(s,parseMutation({version:3,action:{type:"vote",projectId:"microcredit"}}),now);
  const second=applyAction(first,parseMutation({version:4,action:{type:"vote",projectId:"mentorship"}}),now);
  assert.equal(second.vote.projectId,"mentorship");
  assert.equal(second.version,5);
  assert.equal(s.vote.projectId,null);
  assert.equal(s.version,3);
});

test("stale mutations cannot replace current edits", () => {
  assert.throws(()=>applyAction(fixture(),parseMutation({version:2,action:{type:"updateMember",monthlyPence:3000}}),now), /changed|stale/i);
});

test("closed voting and unknown projects cannot mutate a ballot", () => {
  assert.throws(()=>applyAction(fixture(),parseMutation({version:3,action:{type:"vote",projectId:"missing"}}),now),/project/i);
  assert.throws(()=>applyAction(fixture(),parseMutation({version:3,action:{type:"vote",projectId:"microcredit"}}),"2026-12-01T00:00:00.000Z"),/closed/i);
});

test("a project gift and deployment update both project totals and the ledger", () => {
  const s=applyAction(fixture(),parseMutation({version:3,action:{type:"addTransaction",projectId:"microcredit",description:"Additional demo funding",amountPence:2500,kind:"contribution",date:"2026-10-20"}}),now);
  const next=applyAction(s,parseMutation({version:4,action:{type:"addTransaction",projectId:"microcredit",description:"Demo materials",amountPence:-1500,kind:"deployment",date:"2026-10-20"}}),now);
  assert.equal(next.projects[0].fundedPence,52500);
  assert.equal(next.projects[0].deployedPence,11500);
  assert.equal(next.transactions.length,4);
  assert.equal(calculateTotals(next).balancePence,41000);
});

test("a deployment exceeding recorded cash is rejected", () => {
  assert.throws(()=>applyAction(fixture(),parseMutation({version:3,action:{type:"addTransaction",projectId:null,description:"Too much",amountPence:-40001,kind:"deployment",date:"2026-10-20"}}),now),/balance|cash/i);
});

test("project deployment cannot be edited outside the ledger and rejection leaves state untouched",()=>{
  const s=fixture();
  assert.throws(()=>applyAction(s,parseMutation({version:3,action:{type:"updateProject",projectId:"microcredit",patch:{deployedPence:40000}}}),now));
  assert.equal(s.projects[0].deployedPence,10000);
  assert.equal(calculateTotals(s).deployedPence,10000);
  assert.equal(calculateTotals(s).balancePence,40000);
  assert.equal(s.version,3);
  assert.equal(s.transactions.length,2);
});

test("completed projects cannot receive a new ballot",()=>{
  const s=fixture();
  s.projects[0].status="completed";
  assert.throws(()=>applyAction(s,parseMutation({version:3,action:{type:"vote",projectId:"microcredit"}}),now),/completed|active|eligible/i);
  assert.equal(s.vote.projectId,null);
  assert.equal(s.version,3);
});

test("invalid action shapes, amounts, signs and dates are rejected", () => {
  const bad=[
    {version:3,ownerId:"someone-else",action:{type:"updateMember",monthlyPence:3000}},
    {version:3,action:{type:"updateMember",monthlyPence:1.5}},
    {version:3,action:{type:"updateMember",monthlyPence:-1}},
    {version:3,action:{type:"updateProject",projectId:"microcredit",patch:{fundedPence:999}}},
    {version:3,action:{type:"updateProject",projectId:"microcredit",patch:{title:"  "}}},
    {version:3,action:{type:"addTransaction",projectId:null,description:"x",amountPence:-10,kind:"contribution",date:"2026-10-20"}},
    {version:3,action:{type:"addTransaction",projectId:null,description:"x",amountPence:0,kind:"deployment",date:"2026-10-20"}},
    {version:3,action:{type:"addTransaction",projectId:null,description:"x",amountPence:10,kind:"contribution",date:"2026-02-30"}},
    {version:3,action:{type:"addUpdate",projectId:"microcredit",title:"Update",body:"x".repeat(5001)}},
  ];
  for(const input of bad) assert.throws(()=>parseMutation(input));
});

test("project edits and updates keep only validated plain text and preserve prior state", () => {
  const s=fixture();
  const edited=applyAction(s,parseMutation({version:3,action:{type:"updateProject",projectId:"microcredit",patch:{title:"  Updated project  ",peopleReached:10,status:"completed"}}}),now);
  assert.equal(edited.projects[0].title,"Updated project");
  assert.equal(edited.projects[0].peopleReached,10);
  assert.equal(s.projects[0].peopleReached,8);
  const updated=applyAction(edited,parseMutation({version:4,action:{type:"addUpdate",projectId:"microcredit",title:"Field note",body:"A plain text demo update."}}),now);
  assert.equal(updated.updates[0].date,now);
  assert.equal(updated.updates[0].projectId,"microcredit");
  assert.equal(updated.version,5);
});


test("demo update and transaction limits preserve the original state", () => {
  const s=fixture();
  s.updates=Array.from({length:250},()=>({id:"u"}));
  assert.throws(()=>applyAction(s,parseMutation({version:3,action:{type:"addUpdate",projectId:"microcredit",title:"Demo",body:"Demo"}}),now),error=>error instanceof DomainError && error.code==="DEMO_LIMIT");
  s.transactions=Array.from({length:500},()=>s.transactions[0]);
  assert.throws(()=>applyAction(s,parseMutation({version:3,action:{type:"addTransaction",projectId:null,description:"Demo",amountPence:100,kind:"contribution",date:"2026-10-20"}}),now),error=>error instanceof DomainError && error.code==="DEMO_LIMIT");
  assert.equal(s.version,3);
});

test("money formatting retains integer-pence precision", () => {
  assert.equal(formatMoney(125),"£1.25");
  assert.equal(formatMoney(-125),"-£1.25");
  assert.equal(formatMoney(1200),"£12");
});

test("identity and mutation schemas reject attempts to select another owner", () => {
  assert.throws(()=>requireOwnerId({userId:5}),error=>error instanceof DomainError && error.status===401);
  assert.throws(()=>parseMutation({version:3,action:{type:"updateMember",monthlyPence:100,userId:"another-owner"}}));
  assert.throws(()=>parseMutation({version:3,action:{type:"updateProject",projectId:"microcredit",patch:{}}}));
  assert.throws(()=>parseMutation({version:3,action:{type:"addUpdate",projectId:"microcredit",title:"Demo",body:"Bad\u0000text"}}));
});

test("plain text retains line breaks and tabs but rejects other ASCII controls", () => {
  for (let code=0;code<32;code++) {
    const body=`Before${String.fromCharCode(code)}after`;
    const input={version:3,action:{type:"addUpdate",projectId:"microcredit",title:"Demo",body}};
    if ([9,10,13].includes(code)) assert.equal(parseMutation(input).action.body,body);
    else assert.throws(()=>parseMutation(input));
  }
});
