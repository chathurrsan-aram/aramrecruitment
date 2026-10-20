import { z } from "zod";

const text = (max) => z.string().trim().min(1, "Please enter text.").max(max)
  .refine(v => Array.from(v).every(character => {
    const code = character.charCodeAt(0);
    return code >= 32 || code === 9 || code === 10 || code === 13;
  }), "Text contains unsupported characters.");
const pence = z.number().int("Use whole pence.").min(0).max(100_000_000);
const projectId = text(80);
const patchSchema = z.object({
  title: text(120).optional(), description: text(3000).optional(),
  status: z.enum(["active", "completed", "proposed"]).optional(),
  fundingGoalPence: pence.refine(v => v > 0, "Funding goal must be positive.").optional(),
  peopleReached: z.number().int().min(0).max(10_000_000).optional(),
}).strict().refine(v => Object.keys(v).length > 0, "Choose a field to update.");
const actionSchema = z.discriminatedUnion("type", [
  z.object({type:z.literal("vote"),projectId}).strict(),
  z.object({type:z.literal("updateProject"),projectId,patch:patchSchema}).strict(),
  z.object({type:z.literal("addUpdate"),projectId,title:text(160),body:text(5000)}).strict(),
  z.object({type:z.literal("addTransaction"),projectId:projectId.nullable(),description:text(240),
    amountPence:z.number().int("Use whole pence.").min(-100_000_000).max(100_000_000),
    kind:z.enum(["contribution","deployment"]),
    date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD.").refine(v => {
      const d=new Date(`${v}T00:00:00.000Z`);
      return Number.isFinite(d.valueOf()) && d.toISOString().slice(0,10)===v;
    }, "Choose a valid calendar date."),
  }).strict(),
  z.object({type:z.literal("updateMember"),monthlyPence:pence.max(1_000_000)}).strict(),
]);
const mutationSchema=z.object({version:z.number().int().min(0).max(Number.MAX_SAFE_INTEGER-1),action:actionSchema}).strict()
  .superRefine(({action},ctx)=>{
    if(action.type==="addTransaction" && ((action.kind==="contribution" && action.amountPence<=0) || (action.kind==="deployment" && action.amountPence>=0))) {
      ctx.addIssue({code:z.ZodIssueCode.custom,path:["action","amountPence"],message:"Contributions must be positive; deployments must be negative."});
    }
  });
export class DomainError extends Error {
  constructor(message, code="INVALID_ACTION", status=400) {
    super(message);
    this.name="DomainError";
    this.code=code;
    this.status=status;
  }
}
export function requireOwnerId(user) {
  if(typeof user?.userId!=="string" || !user.userId.trim()) throw new DomainError("Please sign in to open your dashboard.","UNAUTHENTICATED",401);
  return user.userId;
}
export function parseMutation(input) {
  const result=mutationSchema.safeParse(input);
  if(!result.success) throw new DomainError(result.error.issues[0]?.message ?? "Please check the form.");
  return result.data;
}
export function calculateTotals(state) {
  return {
    contributedPence:state.transactions.reduce((n,t)=>n+(t.kind==="contribution"?t.amountPence:0),0),
    deployedPence:state.transactions.reduce((n,t)=>n+(t.kind==="deployment"?-t.amountPence:0),0),
    balancePence:state.transactions.reduce((n,t)=>n+t.amountPence,0),
    peopleReached:state.projects.reduce((n,p)=>n+p.peopleReached,0),
    activeProjects:state.projects.filter(p=>p.status==="active").length,
  };
}
export const getTotals=calculateTotals;
export function formatMoney(amountPence, compact=false) {
  return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",maximumFractionDigits:amountPence%100===0?0:2,
    ...(compact?{notation:"compact",maximumFractionDigits:1}:{})}).format(amountPence/100);
}
export function applyAction(state, mutation, now=new Date().toISOString()) {
  if(mutation.version!==state.version) throw new DomainError("This dashboard changed in another tab. Review the latest version and try again.","VERSION_CONFLICT",409);
  const next=structuredClone(state);
  const action=mutation.action;
  const project="projectId" in action && action.projectId!==null ? next.projects.find(p=>p.id===action.projectId) : undefined;
  if("projectId" in action && action.projectId!==null && !project) throw new DomainError("That project was not found.","PROJECT_NOT_FOUND",404);
  switch(action.type) {
    case "vote":
      if(Date.parse(now)>=Date.parse(next.vote.closesAt)) throw new DomainError("This voting round is closed.","VOTING_CLOSED");
      if(project.status==="completed") throw new DomainError("Completed projects are not eligible for this vote.","PROJECT_NOT_ELIGIBLE");
      next.vote.projectId=action.projectId;
      break;
    case "updateMember": next.member.monthlyPence=action.monthlyPence; break;
    case "updateProject": Object.assign(project,action.patch); break;
    case "addUpdate":
      if(next.updates.length>=250) throw new DomainError("The demo has reached its update limit.","DEMO_LIMIT");
      next.updates.unshift({id:crypto.randomUUID(),projectId:action.projectId,title:action.title,body:action.body,date:now});
      break;
    case "addTransaction":
      if(next.transactions.length>=500) throw new DomainError("The demo has reached its transaction limit.","DEMO_LIMIT");
      if(calculateTotals(next).balancePence+action.amountPence<0) throw new DomainError("This deployment exceeds the recorded cash balance.","INSUFFICIENT_BALANCE");
      next.transactions.unshift({id:crypto.randomUUID(),projectId:action.projectId,description:action.description,
        amountPence:action.amountPence,kind:action.kind,date:action.date});
      if(project) {
        if(action.kind==="contribution") project.fundedPence+=action.amountPence;
        else project.deployedPence-=action.amountPence;
      }
      break;
  }
  next.version=state.version+1;
  return next;
}
