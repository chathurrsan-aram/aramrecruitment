export const SECTOR_COLOURS = {
  Healthcare: '#ef4444',
  Education: '#22c55e',
  Technology: '#7c3aed',
  'Economic Development': '#d97706',
  SEN: '#ec4899',
  Wellbeing: '#8b5cf6',
  'Diaspora Reconnection': '#0d9488',
  'Community Development': '#0d9488',
  'Media / Cross-cutting': '#64748b',
};

export const ALL_SECTORS = Object.keys(SECTOR_COLOURS);

export const STATUS_STYLES = {
  'Exploring':        { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  'Semi-clear':       { bg: 'bg-gray-500/20', text: 'text-gray-400' },
  'Research done':    { bg: 'bg-amber-500/20', text: 'text-amber-400' },
  'Template done':    { bg: 'bg-green-500/20', text: 'text-green-400' },
  'Clear idea':       { bg: 'bg-green-500/20', text: 'text-green-400' },
  'Short-term idea':  { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  'Long-term idea':   { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  'Unsure':           { bg: 'bg-gray-500/20', text: 'text-gray-400' },
};

export const READINESS_LABELS = [
  { key: 'research', label: 'Research' },
  { key: 'template', label: 'Template' },
  { key: 'partnerIdentified', label: "Partner ID'd" },
  { key: 'preTripPlan', label: 'Pre-trip plan' },
  { key: 'budget', label: 'Budget' },
  { key: 'confirmed', label: 'Confirmed' },
];

// Returns the index of the current "in progress" step (first false after last true)
export function getCurrentStep(readiness) {
  let lastTrue = -1;
  for (let i = 0; i < READINESS_LABELS.length; i++) {
    if (readiness[READINESS_LABELS[i].key]) lastTrue = i;
  }
  return lastTrue + 1 < READINESS_LABELS.length ? lastTrue + 1 : -1;
}

// Sample data — will be replaced with full 24 ideas
export const ideas = [
  {
    id: 'ai-hackathon',
    name: 'AI Hackathon',
    owner: 'Aggash Sivasothy',
    sectors: ['Technology', 'Education'],
    status: 'Template done',
    readiness: { research: true, template: true, partnerIdentified: true, preTripPlan: true, budget: false, confirmed: false },
    location: 'Multi-region. Can be done at regional level through Yarl IT Hub (Uki Batticaloa, Uki Kilinochchi, Uki Jaffna) or at individual Maha Vidyalayams (high schools).',
    group: 'Project Group',
    observation: 'The schooling system in Sri Lanka is fundamentally broken due to its lack of application-based learning. Students are taught to memorise and regurgitate on exams, but not to think and create on their own. This sets them up for rigid government jobs and not starting companies, which is what the region needs to spur economic development. Aggash has visited Uki schools and knows from family experience that this is a deep structural issue.',
    rootCause: 'It\'s the age-old understanding that strong performance in A-Level examinations is necessary to go to university, and going deeper, that university is a prerequisite to success in tech in Sri Lanka. Students need to snap out of the mindset that their careers are over if they don\'t get into public universities. A strong university degree helps, but getting in should not be the only thing students are optimising for. The education system is focused on exams, not real-world skills.',
    description: 'A short 2-day hackathon similar to a model Aggash implemented in Toronto. Roughly half a day for teaching students about using LLMs to build a business plan, how to vibe-code a technical demo, and how to make a pitch deck. Students then spend roughly 1 day building their solutions. The final half day is spent presenting in a friendly competition. In Toronto, students built for-profit startups to solve the 2030 UN Sustainable Development Goals. For Sri Lanka, they should solve hyper-local challenges \u2014 rationing of rice, farming schedules, water irrigation. Best suited for high school students given the lack of technical background (no coding experience) needed to work with these tools.',
    impactType: 'Immediate Impact',
    impactDescription: 'Practical short-term exposure to tools and entrepreneurial thinking that students can carry forward.',
    afterWeLeave: 'This would likely need Aram\'s or a partner\'s help to continue happening. But the real takeaway is the exposure and skills students come away with. They will know how to build demos on their own and likely start their own entrepreneurial journeys much sooner than they would have otherwise without STEM exposure.',
    similarTried: 'Uki (Yarl IT Hub) definitely has students working on technical projects already but these are more marathons over months, not sprints. There is value in a short intensive programme given how fast AI is moving and how easy it is to build a demo now. Aggash ran a similar event in Toronto and it worked really well as a first-pass intro to these tools.',
    phases: {
      preTrip: 'Get intros to school principals/IT departments and lock down dates. Recruit mentors and judges. Put the content together.',
      onTrip: 'One day of lessons to students. Supervise and provide feedback as they work on ideas. Run a pitch competition.',
      postTrip: 'Monthly follow-ups with new technical lessons (e.g. AI agents) as technology evolves. Partner with YIH to run ongoing, larger inter-school competitions.',
    },
    logisticsNeeded: 'Students need access to laptops and internet for the duration. Will stick to free tools. Ideally pair students with mentors for guidance \u2014 local entrepreneurs preferred, Aram team as backup. At least a few entrepreneurs as judges to inspire students. This is a 2-day event.',
    partnersNeeded: 'Yarl IT Hub is one option \u2014 could be facilitated very easily. High schools would be a better demographic. Getting intros to principals / IT departments at schools is the biggest challenge.',
    resources: 'Aggash can do the legwork with the sector lead. Need mentors and judges on the day (~5 Aram team members as backup). Prizes as incentive (budget TBC).',
    successMetrics: '30\u2013100 students completing the programme and 100% of them building a technical demo without prior technical experience.',
    risks: 'Language barrier \u2014 LLMs primarily use English, so explaining technical concepts and having students interact without enough English exposure won\'t be simple (Aggash can speak Tamil). Recruiting local mentors may be a challenge \u2014 may need to defer to Aram team. Getting intros/buy-in from school principals/IT departments is the biggest but most solvable challenge.',
    openQuestions: null,
    nextSteps: 'Get intros to school principals/IT departments and lock down dates. Recruit mentors and judges. Put the content together.',
    driveLink: 'https://docs.google.com/document/d/1GO0dW99KA1Iry7pDWYwq2i6x3W1gouXw/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true',
  },
  {
    id: 'telemedicine-pilot',
    name: 'Telemedicine Pilot',
    owner: 'Branavi Surendran',
    sectors: ['Healthcare'],
    status: 'Template done',
    readiness: { research: true, template: true, partnerIdentified: true, preTripPlan: true, budget: false, confirmed: false },
    location: 'RDHS Hospital, Batticaloa / Vanni Hope',
    group: 'Project Group',
    observation: 'Patients in Batticaloa face significant barriers accessing hospital care — poor roads, long distances, fuel crisis affecting doctors too.',
    rootCause: 'Geographic isolation combined with an overstretched hospital system. No existing digital pathway for remote care.',
    description: 'Design and pilot a telemedicine system at RDHS Hospital enabling remote consultations. Establish a central tech hub, define clinical suitability criteria, and collect structured data on outcomes.',
    impactType: 'Systems Change',
    impactDescription: 'Addressing root structural causes with a long-term, sustainable digital healthcare solution the hospital can own and scale.',
    afterWeLeave: 'Hospital will have a functioning telemedicine system, trained staff, and a technical report for independent scaling.',
    similarTried: 'A study assessed urban telehealth satisfaction during Covid. A private insurer has a telemedicine hub. Nothing equivalent in Batticaloa with public infrastructure.',
    phases: {
      preTrip: 'Kick-off meeting with RDHS to define scope and criteria. Design surveys. Configure platform. Prepare training materials.',
      onTrip: 'Set up tech hub. Train doctors. Launch study with remote appointments. Administer surveys. Present findings to leadership.',
      postTrip: 'Compile technical report. Present recommendations. Hand over platform and documentation.',
    },
    logisticsNeeded: '2-3 full days at RDHS Hospital. Central tech hub with devices and connectivity. Doctor briefing. Patient recruitment pathway.',
    partnersNeeded: 'RDHS (Regional Director of Health Services), Batticaloa. Participating doctors and hospital IT staff.',
    resources: '2-3 volunteers with tech, healthcare, and data skills. Video-capable devices. Survey forms. Database. Training materials.',
    successMetrics: 'Appointments on time, no critical failures, patients joined successfully. Travel time saved, appointment lengths, patient/doctor ratings 4/5+.',
    risks: 'Poor internet — test speeds in advance. High patient volume. Technical issues — troubleshooting guide. Doctor confidence — training session. Emergency care — transport access.',
    openQuestions: null,
    nextSteps: 'Online kick-off meeting with RDHS. Design data collection surveys. Select telemedicine platform.',
    driveLink: 'https://docs.google.com/document/d/1jBrAZNLw8HZVZ4us0as480-Pyx0Wvfgf/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true',
  },
  {
    id: 'diaspora-identity-storytelling',
    name: 'Diaspora Identity & Intergenerational Storytelling',
    owner: 'Vasaki Mahesan',
    sectors: ['Diaspora Reconnection'],
    status: 'Template done',
    readiness: { research: true, template: true, partnerIdentified: false, preTripPlan: true, budget: false, confirmed: false },
    location: 'Multi-region',
    group: null,
    observation: 'Many individuals come into the Aram experience with a limited or fragmented understanding of their own identity as Tamil diaspora members. No structured space exists to process this.',
    rootCause: 'Histories of conflict and migration lead to silence. Lack of intentional spaces for identity exploration. Intergenerational gap in language and context.',
    description: 'A three-phase programme (pre-trip, during trip, post-trip) supporting participants in exploring Tamil identity through guided workshops, oral history conversations, and reflection spaces. Outputs contribute to a digital archive.',
    impactType: 'Systems Change',
    impactDescription: 'Creating a lasting shift in how participants engage with their own identity, with tools and outputs that persist and grow.',
    afterWeLeave: 'Participants equipped with tools for continued intergenerational conversations. Archives preserve stories as a growing resource.',
    similarTried: 'Nothing on the Aram website focuses specifically on identity exploration or intergenerational storytelling.',
    phases: {
      preTrip: 'Develop workshops and reflection materials. Create question bank. Train facilitators. Set up technical resources.',
      onTrip: 'Guided reflection sessions. Intergenerational conversations with elders. Capture stories through audio, notes, creative exercises.',
      postTrip: 'Finalise creative outputs. Curate digital archive or exhibition. Collect feedback. Encourage continued dialogue.',
    },
    logisticsNeeded: 'Dedicated small group spaces. Access to local elders/families. Multiple days at locations. Trained facilitators.',
    partnersNeeded: 'Local community elders. Facilitators for sensitive conversations. Local cultural centres. Aram trip coordinators.',
    resources: '2-3 facilitators, 1-2 support volunteers, notebooks, recording devices, optional art supplies. Budget: ~$50-100.',
    successMetrics: 'All participants complete pre-trip interview. Active engagement in sessions. Each participant produces a tangible output. Family stories documented.',
    risks: 'Community members unavailable — prepare backup contacts. Volunteer dropout — train extra person. Technical issues — multiple recording methods.',
    openQuestions: null,
    nextSteps: 'Develop pre-trip workshop materials. Align facilitators. Set up technical resources.',
    driveLink: 'https://docs.google.com/document/d/1QPhtOTuc8fS_l15eSpLvIf3zSiCzd7q2/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true',
  },
];
