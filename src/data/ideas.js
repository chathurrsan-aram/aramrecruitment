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
    observation: 'Patients in the Batticaloa region face significant barriers accessing hospital care, including poor road infrastructure and long travel distances. Many are on waiting lists for appointments they struggle to physically attend. With the current fuel crisis, doctors are also struggling to get to hospitals, further highlighting the need for digital healthcare pathways.',
    rootCause: 'Geographic isolation combined with an overstretched hospital system. Poor road infrastructure makes travel to hospital appointments difficult, costly, and time-consuming \u2014 particularly for those with mobility limitations or chronic conditions requiring frequent follow-up. This results in missed appointments, delayed diagnoses, and pressure on in-person capacity. There is no existing digital pathway for patients to access care remotely. The barrier is structural, not clinical.',
    description: 'Design and pilot a telemedicine system at RDHS Hospital, Batticaloa, enabling doctors to conduct remote consultations with patients who would otherwise struggle to attend in person. The pilot will establish a central technology hub in a rural area that connects with the hospital. The first step is to define clinical suitability criteria for remote appointments, and collect structured data on outcomes, patient satisfaction, time saved, and technical performance. The goal is to produce a technical report with findings and recommendations that the hospital can use to scale or adapt the model independently.',
    impactType: 'Systems Change',
    impactDescription: 'Addressing root structural causes with a long-term, sustainable digital healthcare solution that the hospital can own and scale.',
    afterWeLeave: 'The hospital will have a functioning telemedicine system, trained staff, and a technical report documenting what worked and what improvements are needed. If the pilot is successful, RDHS can continue and scale the service independently using the platform and workflows designed during the pilot. The initiative is structured for local ownership: the platform is hospital-managed, doctors receive training, and results are owned by the institution. Does not depend on Aram returning, though follow-up support could help with iteration.',
    similarTried: 'A recent study assessed satisfaction of urban patients using telehealth during the Covid-19 pandemic in Sri Lanka. A private health insurance company has successfully implemented a telemedicine hub. No equivalent has been tried in the Batticaloa region with public hospital infrastructure.',
    phases: {
      preTrip: 'Online kick-off meeting with RDHS to define scope, clinical suitability criteria, and patient recruitment pathway. Design qualitative, quantitative, and binary data collection surveys. Select and configure the telemedicine platform. Seek hospital approval and align on timelines and ethical requirements. Prepare doctor and patient training materials. Source equipment and confirm internet connectivity at site.',
      onTrip: 'Set up technology hub at RDHS Hospital and run final connectivity tests. Train participating doctors on the platform and consultation process. Launch study: run remote appointments with recruited patients. Administer binary, quantitative, and qualitative surveys to doctors and patients after each session. Meeting with RDHS leadership to present findings.',
      postTrip: 'Compile technical report with all data. Present recommendations for scale/adaptation. Hand over platform and documentation to hospital for independent continuation.',
    },
    logisticsNeeded: 'Requires dedicated time at RDHS Hospital \u2014 likely 2\u20133 full days for setup, staff training, and running initial appointments. A central technology hub must be set up at the hospital with appropriate devices and internet connectivity. Need to identify and brief participating doctors, ensure a patient recruitment pathway is in place. Meeting with RDHS leadership (ideally the RDHS director or medical superintendent) after study to convey findings and discuss future plans. Also need a kick-off meeting with Batticaloa hospital, a tech solution for queue management/patient priority, and clinicians to agree which conditions are suitable for telemedicine.',
    partnersNeeded: 'Primary partner: RDHS (Regional Director of Health Services), Batticaloa. Need sign-off on trial design, clinical scope, and patient recruitment pathway. Also need buy-in from participating doctors and hospital IT staff for technology setup.',
    resources: '2\u20133 volunteers with technology, healthcare, and data skills. Video-capable devices (tablets/laptops). Survey forms (qualitative and quantitative). Database or spreadsheet for results. Doctor training materials. Internet connectivity monitoring equipment. Budget: modest \u2014 primarily for devices if not provided by hospital, and local logistics.',
    successMetrics: 'Binary: appointments took place on time; no critical technical failures; patients joined successfully. Quantitative: average travel time saved per patient; average appointment length; number of appointments completed; internet speed during sessions. Qualitative: patients and doctors rate ease of joining as 4/5 or above; majority say they would use the service again; actionable suggestions captured. Ultimately: a completed technical report with data sufficient to inform whether and how to scale the model.',
    risks: '(1) Poor internet connectivity \u2014 will test speeds in advance and identify backup connection (e.g. mobile data). (2) High patient recruitment volume \u2014 struggling to manage workflow. (3) Technical issues during appointments \u2014 basic troubleshooting guide and designated tech support volunteer. (4) Doctors not confident using platform \u2014 short training session in pre-launch phase. (5) Patient needing emergency care \u2014 have access to transportation so patient can be taken to hospital.',
    openQuestions: null,
    nextSteps: 'Online kick-off meeting with RDHS to define scope. Design qualitative, quantitative, and binary data collection surveys. Select and configure the telemedicine platform. Seek hospital approval. Prepare training materials. Source equipment and confirm internet connectivity at site.',
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
