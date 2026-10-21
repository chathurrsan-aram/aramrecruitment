/** All amounts, reach, dates and updates are fictional demonstration records. */
export function createSeedState() {
  return {
    version:0,demo:true,
    member:{name:"Chath",monthlyPence:2500,joinedAt:"2026-02-01T00:00:00.000Z"},
    projects:[
      {id:"microcredit",title:"Microcredit Revolving Fund",category:"Livelihoods",location:"Eastern Province, Sri Lanka",status:"active",
        description:"Supporting local livelihoods through a revolving microcredit approach. Aram works with Vanni Hope on community support and training.",
        fundingGoalPence:1_200_000,fundedPence:825_000,deployedPence:540_000,peopleReached:42,image:"/aram-community.jpg",icon:"Sprout",sourceUrl:"https://www.aram.org.uk/initiatives/microcredit-eastern-province"},
      {id:"mentorship",title:"Virtual Mentorship",category:"Education",location:"Across Sri Lanka & the diaspora",status:"active",
        description:"Connecting young people with mentors across the diaspora for shared learning, guidance and opportunities.",
        fundingGoalPence:450_000,fundedPence:310_000,deployedPence:180_000,peopleReached:64,image:"/aram-hope.jpg",icon:"GraduationCap",sourceUrl:"https://www.aram.org.uk/initiatives/virtual-mentorship"},
      {id:"penpal",title:"Pen Pal Project",category:"Connection",location:"Sri Lanka & United Kingdom",status:"active",
        description:"Building connections through exchanges between young people in Sri Lanka and the diaspora.",
        fundingGoalPence:250_000,fundedPence:175_000,deployedPence:95_000,peopleReached:80,image:"/aram-field-context.jpg",icon:"Mail",sourceUrl:"https://www.aram.org.uk/initiatives/pen-pal-project"},
      {id:"ai-curriculum",title:"AI Curriculum Review",category:"Community proposal",location:"Sri Lanka",status:"proposed",
        description:"A demonstration proposal to explore useful, age-appropriate AI learning resources with local educators. This has not been approved or launched by Aram.",
        fundingGoalPence:180_000,fundedPence:0,deployedPence:0,peopleReached:0,image:"/aram-community.jpg",icon:"Lightbulb"},
    ],
    transactions:([
      {id:"seed-contribution-1",projectId:"microcredit",description:"Community contributions",amountPence:825_000,kind:"contribution",date:"2026-10-01"},
      {id:"seed-contribution-2",projectId:"mentorship",description:"Community contributions",amountPence:310_000,kind:"contribution",date:"2026-10-03"},
      {id:"seed-contribution-3",projectId:"penpal",description:"Community contributions",amountPence:175_000,kind:"contribution",date:"2026-10-05"},
      {id:"seed-deployment-1",projectId:"microcredit",description:"Programme transfer",amountPence:-540_000,kind:"deployment",date:"2026-10-07"},
      {id:"seed-deployment-2",projectId:"mentorship",description:"Programme transfer",amountPence:-180_000,kind:"deployment",date:"2026-10-10"},
      {id:"seed-deployment-3",projectId:"penpal",description:"Programme transfer",amountPence:-95_000,kind:"deployment",date:"2026-10-12"},
      {id:"seed-contribution-4",projectId:null,description:"Member contribution · Chath",amountPence:2500,kind:"contribution",date:"2026-10-15",memberContribution:true},
    ]).sort((a,b)=>b.date.localeCompare(a.date)),
    updates:[
      {id:"seed-update-1",projectId:"microcredit",title:"A new chapter for local enterprise",body:"A sample community check-in brings participants together to share plans and practical lessons.",date:"2026-10-17T12:00:00.000Z"},
      {id:"seed-update-2",projectId:"mentorship",title:"Small conversations, new possibilities",body:"A sample planning note explores how mentors and learners could prepare for their next conversations.",date:"2026-10-14T12:00:00.000Z"},
      {id:"seed-update-3",projectId:"penpal",title:"Connections that travel further",body:"A sample coordination note explores preparation for the next letter exchange.",date:"2026-10-11T12:00:00.000Z"},
    ],
    vote:{projectId:null,closesAt:"2026-10-27T23:59:59.000Z"},
  };
}
export const seedState=createSeedState;
