export const ideas = [
  {
    id: "ai-hackathon",
    name: "AI Hackathon",
    owner: "Aggash Sivasothy",
    sectors: ["Technology", "Education"],
    status: "Template done",
    readiness: {
      research: true,
      template: true,
      partnerIdentified: true,
      preTripPlan: true,
      budget: false,
      confirmed: false,
    },
    location:
      "Multi-region. Can be done at regional level through Yarl IT Hub (Uki Batticaloa, Uki Kilinochchi, Uki Jaffna) or at individual Maha Vidyalayams (high schools).",
    group: "Project Group",
    observation:
      "The schooling system in Sri Lanka is fundamentally broken due to its lack of application-based learning. Students are taught to memorise and regurgitate on exams, but not to think and create on their own. This sets them up for rigid government jobs and not starting companies, which is what the region needs to spur economic development. Aggash has visited Uki schools and knows from family experience that this is a deep structural issue.",
    rootCause:
      "It's the age-old understanding that strong performance in A-Level examinations is necessary to go to university, and going deeper, that university is a prerequisite to success in tech in Sri Lanka. Students need to snap out of the mindset that their careers are over if they don't get into public universities. A strong university degree helps, but getting in should not be the only thing students are optimising for. The education system is focused on exams, not real-world skills.",
    description:
      "A short 2-day hackathon similar to a model Aggash implemented in Toronto. Roughly half a day for teaching students about using LLMs to build a business plan, how to vibe-code a technical demo, and how to make a pitch deck. Students then spend roughly 1 day building their solutions. The final half day is spent presenting in a friendly competition. In Toronto, students built for-profit startups to solve the 2030 UN Sustainable Development Goals. For Sri Lanka, they should solve hyper-local challenges — rationing of rice, farming schedules, water irrigation. Best suited for high school students given the lack of technical background (no coding experience) needed to work with these tools.",
    shortDescription:
      "A 2-day hackathon teaching students to use AI tools to build business plans and technical demos, solving hyper-local challenges.",
    impactType: "Immediate Impact",
    impactDescription:
      "Practical short-term exposure to tools and entrepreneurial thinking that students can carry forward.",
    afterWeLeave:
      "This would likely need Aram's or a partner's help to continue happening. But the real takeaway is the exposure and skills students come away with. They will know how to build demos on their own and likely start their own entrepreneurial journeys much sooner than they would have otherwise without STEM exposure.",
    similarTried:
      "Uki (Yarl IT Hub) definitely has students working on technical projects already but these are more marathons over months, not sprints. There is value in a short intensive programme given how fast AI is moving and how easy it is to build a demo now. Aggash ran a similar event in Toronto and it worked really well as a first-pass intro to these tools.",
    phases: {
      preTrip:
        "Get intros to school principals/IT departments and lock down dates. Recruit mentors and judges. Put the content together.",
      onTrip:
        "One day of lessons to students. Supervise and provide feedback as they work on ideas. Run a pitch competition.",
      postTrip:
        "Monthly follow-ups with new technical lessons (e.g. AI agents) as technology evolves. Partner with YIH to run ongoing, larger inter-school competitions.",
    },
    logisticsNeeded:
      "Students need access to laptops and internet for the duration. Will stick to free tools. Ideally pair students with mentors for guidance — local entrepreneurs preferred, Aram team as backup. At least a few entrepreneurs as judges to inspire students. This is a 2-day event.",
    partnersNeeded:
      "Yarl IT Hub is one option — could be facilitated very easily. High schools would be a better demographic. Getting intros to principals / IT departments at schools is the biggest challenge.",
    resources:
      "Aggash can do the legwork with the sector lead. Need mentors and judges on the day (~5 Aram team members as backup). Prizes as incentive (budget TBC).",
    successMetrics:
      "30-100 students completing the programme and 100% of them building a technical demo without prior technical experience.",
    risks:
      "Language barrier — LLMs primarily use English, so explaining technical concepts and having students interact without enough English exposure won't be simple (Aggash can speak Tamil). Recruiting local mentors may be a challenge — may need to defer to Aram team. Getting intros/buy-in from school principals/IT departments is the biggest but most solvable challenge.",
    openQuestions: null,
    nextSteps: null,
    driveLink:
      "https://docs.google.com/document/d/1GO0dW99KA1Iry7pDWYwq2i6x3W1gouXw/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true",
  },
  {
    id: "telemedicine-pilot",
    name: "Telemedicine Pilot",
    owner: "Branavi Surendran",
    sectors: ["Healthcare"],
    status: "Template done",
    readiness: {
      research: true,
      template: true,
      partnerIdentified: true,
      preTripPlan: true,
      budget: false,
      confirmed: false,
    },
    location: "RDHS Hospital, Batticaloa / Vanni Hope",
    group: "Project Group",
    observation:
      "Patients in the Batticaloa region face significant barriers accessing hospital care, including poor road infrastructure and long travel distances. Many are on waiting lists for appointments they struggle to physically attend. With the current fuel crisis, doctors are also struggling to get to hospitals, further highlighting the need for digital healthcare pathways.",
    rootCause:
      "Geographic isolation combined with an overstretched hospital system. Poor road infrastructure makes travel to hospital appointments difficult, costly, and time-consuming — particularly for those with mobility limitations or chronic conditions requiring frequent follow-up. This results in missed appointments, delayed diagnoses, and pressure on in-person capacity. There is no existing digital pathway for patients to access care remotely. The barrier is structural, not clinical.",
    description:
      "Design and pilot a telemedicine system at RDHS Hospital, Batticaloa, enabling doctors to conduct remote consultations with patients who would otherwise struggle to attend in person. The pilot will establish a central technology hub in a rural area that connects with the hospital. The first step is to define clinical suitability criteria for remote appointments, and collect structured data on outcomes, patient satisfaction, time saved, and technical performance. The goal is to produce a technical report with findings and recommendations that the hospital can use to scale or adapt the model independently.",
    shortDescription:
      "Design and pilot a telemedicine system at RDHS Hospital, Batticaloa, enabling remote consultations for patients facing travel barriers.",
    impactType: "Systems Change",
    impactDescription:
      "Addressing root structural causes with a long-term, sustainable digital healthcare solution that the hospital can own and scale.",
    afterWeLeave:
      "The hospital will have a functioning telemedicine system, trained staff, and a technical report documenting what worked and what improvements are needed. If the pilot is successful, RDHS can continue and scale the service independently using the platform and workflows designed during the pilot. The initiative is structured for local ownership: the platform is hospital-managed, doctors receive training, and results are owned by the institution. Does not depend on Aram returning, though follow-up support could help with iteration.",
    similarTried:
      "A recent study assessed satisfaction of urban patients using telehealth during the Covid-19 pandemic in Sri Lanka. A private health insurance company has successfully implemented a telemedicine hub. No equivalent has been tried in the Batticaloa region with public hospital infrastructure.",
    phases: {
      preTrip:
        "Online kick-off meeting with RDHS to define scope, clinical suitability criteria, and patient recruitment pathway. Design qualitative, quantitative, and binary data collection surveys. Select and configure the telemedicine platform. Seek hospital approval and align on timelines and ethical requirements. Prepare doctor and patient training materials. Source equipment and confirm internet connectivity at site.",
      onTrip:
        "Set up technology hub at RDHS Hospital and run final connectivity tests. Train participating doctors on the platform and consultation process. Launch study: run remote appointments with recruited patients. Administer binary, quantitative, and qualitative surveys to doctors and patients after each session. Meeting with RDHS leadership to present findings.",
      postTrip:
        "Compile technical report with all data. Present recommendations for scale/adaptation. Hand over platform and documentation to hospital for independent continuation.",
    },
    logisticsNeeded:
      "Requires dedicated time at RDHS Hospital — likely 2–3 full days for setup, staff training, and running initial appointments. A central technology hub must be set up at the hospital with appropriate devices and internet connectivity. Need to identify and brief participating doctors, ensure a patient recruitment pathway is in place. Meeting with RDHS leadership (ideally the RDHS director or medical superintendent) after study to convey findings and discuss future plans. Also need a kick-off meeting with Batticaloa hospital, a tech solution for queue management/patient priority, and clinicians to agree which conditions are suitable for telemedicine.",
    partnersNeeded:
      "Primary partner: RDHS (Regional Director of Health Services), Batticaloa. Need sign-off on trial design, clinical scope, and patient recruitment pathway. Also need buy-in from participating doctors and hospital IT staff for technology setup.",
    resources:
      "2–3 volunteers with technology, healthcare, and data skills. Video-capable devices (tablets/laptops). Survey forms (qualitative and quantitative). Database or spreadsheet for results. Doctor training materials. Internet connectivity monitoring equipment. Budget: modest — primarily for devices if not provided by hospital, and local logistics.",
    successMetrics:
      "Binary: appointments took place on time; no critical technical failures; patients joined successfully. Quantitative: average travel time saved per patient; average appointment length; number of appointments completed; internet speed during sessions. Qualitative: patients and doctors rate ease of joining as 4/5 or above; majority say they would use the service again; actionable suggestions captured. Ultimately: a completed technical report with data sufficient to inform whether and how to scale the model.",
    risks:
      "(1) Poor internet connectivity — will test speeds in advance and identify backup connection (e.g. mobile data). (2) High patient recruitment volume — struggling to manage workflow. (3) Technical issues during appointments — basic troubleshooting guide and designated tech support volunteer. (4) Doctors not confident using platform — short training session in pre-launch phase. (5) Patient needing emergency care — have access to transportation so patient can be taken to hospital.",
    openQuestions: null,
    nextSteps: null,
    driveLink:
      "https://docs.google.com/document/d/1jBrAZNLw8HZVZ4us0as480-Pyx0Wvfgf/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true",
  },
  {
    id: "diaspora-identity-storytelling",
    name: "Diaspora Identity & Intergenerational Storytelling",
    owner: "Vasaki Mahesan",
    sectors: ["Diaspora Reconnection"],
    status: "Template done",
    readiness: {
      research: true,
      template: true,
      partnerIdentified: false,
      preTripPlan: true,
      budget: false,
      confirmed: false,
    },
    location:
      "Multi-region — can apply to any location with groups of people willing to engage in conversations",
    group: null,
    observation:
      "Many individuals come into the Aram experience with a limited or fragmented understanding of their own identity, particularly as members of the Tamil diaspora. While the trip provides exposure to communities and lived realities in Sri Lanka, there is no structured space before, during, or after the trip to process what this means on a personal level. Many diasporic individuals lack knowledge of their own family histories, particularly intergenerational experiences shaped by migration and war. There is a disconnect between diaspora identity and lived experiences in Sri Lanka. Sensitive topics (war, displacement, cultural loss) are either avoided or discussed superficially due to lack of structure. Opportunities for intergenerational dialogue are limited despite being central to understanding identity. Much of the deeper personal impact of the trip may remain unexplored or unarticulated.",
    rootCause:
      "Many diaspora Tamil families are shaped by histories of conflict, displacement, and migration, which often lead to silence around the past — due to trauma, desire to protect younger generations, or cultural norms around emotional expression. There's a lack of intentional spaces for identity exploration; educational and professional environments prioritise achievement over reflection. An intergenerational gap exists — differences in language, cultural context, and lived experience make it difficult for younger diaspora members to engage meaningfully with older generations. Even when the desire is there, many don't know how to ask the right questions or navigate sensitive topics. There's also uncertainty and discomfort around identity itself — for many in the diaspora, identity is complex and sometimes ambiguous, shaped by multiple cultures, geographies, and expectations.",
    description:
      "A structured, three-phase programme (pre-trip, during trip, and post-trip) that supports participants in exploring their Tamil identity through guided workshops, intergenerational oral history conversations, and facilitated reflection spaces. Participants conduct a short interview with a family or community member before the trip, engage in small group discussions during the trip, and produce a tangible post-trip output (written, audio, or creative) reflecting their evolving understanding of identity. These outputs contribute to a wider digital archive or exhibition, creating a shared space for storytelling and dialogue within and beyond Aram.",
    shortDescription:
      "A three-phase programme supporting participants in exploring Tamil identity through guided workshops, oral history conversations, and creative reflection.",
    impactType: "Systems Change",
    impactDescription:
      "Creating a lasting shift in how participants engage with their own identity, with tools and outputs that persist and grow beyond any single trip.",
    afterWeLeave:
      "Participants are equipped with tools and confidence to continue intergenerational conversations independently. The creation of personal and collective archives (recordings, reflections, creative outputs) ensures stories are preserved rather than lost — a resource that grows over time. These outputs can be shared within the wider community, encouraging others to reflect on their own identities and histories. The core elements — storytelling, reflection, dialogue — are inherently transferable and do not depend on Aram's continued presence. Over time, can contribute to a stronger culture of openness, intergenerational connection, and self-understanding within the diaspora.",
    similarTried:
      "Nothing on the Aram website focuses specifically on identity exploration or intergenerational storytelling. Past initiatives involve reflection and community engagement, but none provide a structured framework for participants to explore Tamil identity or document family histories.",
    phases: {
      preTrip:
        "Develop pre-trip workshops and reflection materials on identity and intergenerational storytelling. Create question bank for participants. Align and train facilitators/volunteers on guiding sensitive conversations. Set up technical resources. Communicate assignments to participants.",
      onTrip:
        "Conduct small-group guided reflection sessions using pre-prepared prompts. Hold intergenerational conversations with local elders/families. Capture stories and reflections through audio, notes, or creative exercises. Facilitate creative reflection workshops. Encourage participants to draft/plan post-trip outputs.",
      postTrip:
        "Participants finalise creative outputs (art, writing, podcast, digital archive). Curate digital archive or exhibition in the UK. Collect participant feedback. Encourage continued intergenerational dialogue. Use outputs to inform future trips/workshops.",
    },
    logisticsNeeded:
      "Dedicated small group discussion spaces where participants feel safe to share. Access to local community members, elders, or families willing to participate in guided conversations. Multiple days at one or more locations: one day for guided conversations, one day for reflection workshops, potentially one day for group synthesis or creative output. Facilitators trained or experienced in moderating sensitive conversations. Pre-trip preparation (briefing, question exercises) can happen remotely but core conversations must be in person. Follow-up outputs (creative work, podcasts, digital archives) completed post-trip.",
    partnersNeeded:
      "Local community elders or families willing to share personal histories (reached through existing Aram contacts). Facilitators who can lead small group discussions safely. Local organisations or cultural centres supporting intergenerational storytelling, education, or arts. Aram trip coordinators for scheduling and logistics.",
    resources:
      "People: 2-3 facilitators/small group moderators trained in guiding sensitive conversations; 1-2 support volunteers for logistics and note-taking; community members/elders. Materials: notebooks, pens, reflection guides, recording devices or smartphones, optional art supplies, laptops/tablets for digital archives. Budget: minimal (~$50-100 for recording or art materials).",
    successMetrics:
      "All participants complete pre-trip assignment interviewing at least one family/community member. Active engagement in small group reflection sessions during trip. Each participant produces at least one tangible post-trip output (creative piece, short story, podcast segment, digital archive contribution). A collection of family stories documented and preserved. Participants report greater awareness of personal and intergenerational identity (captured in feedback surveys/reflection prompts).",
    risks:
      "Community members not available/unwilling — prepare list of multiple contacts with backups. Volunteer dropout / facilitators unavailable — train at least one extra person, create clear session scripts so anyone can step in. Technical issues — use multiple recording methods, allow written notes, offline work digitised later. Idea not resonating — include optional discussion topics and creative activities; icebreakers to ease into sensitive conversations.",
    openQuestions: null,
    nextSteps: null,
    driveLink:
      "https://docs.google.com/document/d/1QPhtOTuc8fS_l15eSpLvIf3zSiCzd7q2/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true",
  },
  {
    id: "apprenticeship-entrepreneurship",
    name: "Apprenticeship & Entrepreneurship Programme",
    owner: "Thushanth Vijayalingham",
    sectors: ["Economic Development", "Education", "Diaspora Reconnection", "Technology"],
    status: "Semi-clear",
    readiness: {
      research: true,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location:
      "Northern Province (Jaffna, Kilinochchi, Mullaitivu, Vavuniya), Eastern Province (Batticaloa, Trincomalee)",
    group: "TBC",
    observation:
      "In Northern Sri Lanka, many young adults, particularly from less privileged backgrounds, feel limited to a narrow set of \"acceptable\" career paths (doctor, engineer, lawyer). There is a lack of exposure to entrepreneurship, business thinking, and alternative income pathways. Many young people lack awareness of how to start a business. There is little structured support for idea development. Financial independence feels inaccessible without formal careers or migration. This creates a cycle where talent and creativity are underutilised. There is high underemployment despite education, and limited exposure to entrepreneurship or alternative income streams. At the same time, there is untapped local demand for small services and products — as seen from some of the ideas in last year's Apprentice activity. Informal businesses (shops, tailors) exist but lack scalability and structure. Very little international VC investment reaches the Northern Province, meaning international companies aren't seeing the benefit of investing in ideas brewing there. Thushanth is connecting with someone who wrote a research paper on a similar topic focusing on Mannar, about work aspirations and career goals.",
    rootCause:
      "Cultural pressure towards traditional professions. Lack of entrepreneurial role models. Limited access to capital or financial literacy. Education systems focused on exams, not real-world skills.",
    description:
      "Building on last year's Apprentice activity with a structured follow-up mentoring component. The full idea is still being developed — Parts 2-4 of the template are incomplete. The concept involves a programme to expose youth to entrepreneurship, business thinking, and alternative career paths, with a post-trip mentoring period to maintain momentum. This will also gather information on the viability of Aram scaling up as an organisation supporting young entrepreneurs.",
    shortDescription:
      "A structured programme exposing youth to entrepreneurship and alternative career paths, building on last year's Apprentice activity.",
    impactType: "Systems Change",
    impactDescription:
      "Addressing root causes of limited economic opportunity by creating pathways to entrepreneurship.",
    afterWeLeave: null,
    similarTried:
      "Aram ran an Apprentice-style activity on the 2024/2025 trip. Ideas from that inform this initiative. The sector vision lists \"Apprenticeship scheme\" as a planned initiative under Economic Development.",
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded:
      "Vanni Hope, local schools/youth centres, DreamSpace, local SME owners and informal entrepreneurs.",
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Complete template Parts 2-4. Speak to Chat about ideas from last year's trip. Connect with researcher on Mannar employment paper. Define what the follow-up mentoring period looks like — who mentors, how often, what structure.",
    driveLink:
      "https://docs.google.com/document/d/1Sb5o281C0izt2w_wbFK61d-xtEPXNGGG/edit?usp=drive_link&ouid=110011172901702242866&rtpof=true&sd=true",
  },
  {
    id: "he-access-women",
    name: "HE Access, IT Workshops & Career Support for Women",
    owner: "Sianee Nanthakumar",
    sectors: ["Education"],
    status: "Semi-clear",
    readiness: {
      research: true,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location:
      "Multi-region, with particular focus on Nuwara Eliya / plantation communities",
    group: "TBC",
    observation:
      "Since the end of British colonial rule, Sri Lanka has had a state-funded education system, but public spending has been persistently low — just 2% of GDP, falling to 1.2% in 2022 due to the economic crisis. Private spending on education is higher (tuition centres etc.), creating a gap between government support and demand. Only 25.4% of people qualifying for higher education gain admission to public universities (18 public vs 27 private HEIs). In Sri Lanka, only 20% of students from low-income families complete secondary education, compared to 70% from higher-income families. Plantation communities in Nuwara Eliya are among the poorest, with the lowest enrollment and school completion rates. 17.5% of qualifying students pursue HE abroad, creating brain drain.",
    rootCause:
      "Limited capacity of state universities. Rural-urban disparities in educational infrastructure and teaching quality. Reliance on private tutoring and lack of state support. Lack of infrastructure — during Covid, rural and plantation communities suffered most. Only 23% of college-age Sri Lankans enrolled in programmes employers value. STEM enrollment particularly low — only a third studied STEM, and only 27% of women in STEM (most choosing biological sciences over engineering/maths/biotech). World Bank research shows it's harder for humanities graduates to find employment.",
    description:
      "Multiple possible directions still being explored: scholarships or partnerships with local HEIs in Sri Lanka; IT workshops specifically focused on women (addressing the gender gap in STEM); career workshops and CV workshops. These could be delivered at Tea Leaf Trust (upcountry), schools, or through partner organisations. The idea needs narrowing — is it scholarships, workshops, or both?",
    shortDescription:
      "Scholarships, IT workshops for women, and career support targeting plantation communities with the lowest education access.",
    impactType: "Systems Change",
    impactDescription:
      "Addressing structural barriers to education access, particularly for women and plantation communities.",
    afterWeLeave: null,
    similarTried:
      "Aram has previously run CV workshops and IT workshops on trips.",
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded:
      "Connections with HEI professors/governance. Wifi/computers. Local and educational charities. Education government officials.",
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Narrow the scope — decide between scholarships, workshops, or a combined approach. Identify HEI partners. Complete the remaining template sections (resources, risks, phases, success metrics).",
    driveLink:
      "https://docs.google.com/document/d/1xQuvs8gGVNrjPA4FdUJIvwlZnWh5PtMzrwh4GJCJe90/edit?usp=drive_link",
  },
  {
    id: "community-development-council",
    name: "Community Development Council (CDC)",
    owner: "Sesvin",
    sectors: ["Community Development"],
    status: "Research done",
    readiness: {
      research: true,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location:
      "Hill country (potential pilot at Mokra Estate); Vanni Hope as a consultative partner on cooperative models",
    group: "TBC",
    observation:
      "Communities across Sri Lanka — particularly in the Northern, Eastern, and upcountry regions — often lack structured mechanisms for identifying their own development needs and channelling resources toward solutions. External organisations (including diaspora groups) tend to deliver projects top-down, creating dependency rather than local ownership. The Aram debrief pack notes that \"people are fixed into mindsets about how to make money,\" that \"many places lack basic needs and a fundamental economy,\" and that \"acquiring rights with government support remains a challenge.\" At the same time, \"some local leaders have very successfully created initiatives for development, sometimes in partnership with external bodies\" — suggesting the potential for community-led governance structures.",
    rootCause:
      "Lack of local governance structures at community level that can identify needs, articulate them as proposals, and manage implementation. External aid often bypasses community agency. Without structured community engagement, development projects don't reflect actual priorities and aren't sustained after funders leave.",
    description:
      "Establish Community Development Councils — elected groups of 10–15 local members (at least 50% women, at least 3 members under 30) — who engage their community to identify issues, write project proposals, and implement solutions. Aram's role would be as \"Council Managers\": supporting elections, training CDC members in community engagement, brainstorming, proposal writing, financial management, project implementation, monitoring, reporting, and accountability. Aram would select and fund proposals, releasing funds in increments at project milestones. CDCs would be responsible for community engagement, proposal development (identifying the issue, solution, community engagement process, cost, milestones, and sustainability/revenue model), implementation, progress reporting (with photos, videos, financials), and post-implementation evaluation.",
    shortDescription:
      "Elected community councils trained to identify local needs, write proposals, and implement development projects independently.",
    impactType: "Systems Change",
    impactDescription:
      "Creating a permanent local governance structure for community-led development that persists beyond any single trip or funder.",
    afterWeLeave:
      "If successful, the community has an elected, trained body capable of identifying needs, writing proposals, managing projects, and reporting on outcomes — independently of Aram. The CDC structure is designed to be self-sustaining and could eventually seek funding from other sources (World Bank, government agencies, other NGOs).",
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions:
      "How do we ensure CDC report on/evaluate a project after completion? What is the relationship between a CDC and local government? How do we approach training in a manner respectful of people's time and efforts? How can we ensure the CDC is equitable — not only in representation but also in participation? How can we measure sustainability of a project? How does a 9-week implementation plan fit a 2-week trip?",
    nextSteps:
      "Speak to Vanni Hope about their cooperative model — training community members, what worked, challenges, how they handle conflict. Fill the initiative planning template. Connect with two women at Mokra Estate who are keen to support. Resolve the trip timeline question.",
    driveLink: null,
  },
  {
    id: "mokra-estate-pilot",
    name: "Mokra Estate Community Pilot",
    owner: "Sesvin",
    sectors: ["Community Development"],
    status: "Exploring",
    readiness: {
      research: true,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Mokra Estate, hill country",
    group: "TBC",
    observation:
      "The CDC model needs a real-world test site with the right conditions — a defined community small enough to pilot with, but with enough local leadership appetite to sustain it. Plantation estate communities in the hill country are among the most disadvantaged in Sri Lanka, with some of the lowest education, health, and economic indicators.",
    rootCause:
      "Same as the CDC idea — lack of local governance structures for community-led development. Plantation communities face additional challenges: historical marginalisation, geographic isolation, and limited access to government services.",
    description:
      "Test the Community Development Council model in a small, defined community. Mokra Estate has around 100–200 people and two local women already keen to support community development initiatives — making it a natural first pilot site for the CDC framework.",
    shortDescription:
      "Pilot the Community Development Council model at Mokra Estate, a small hill country community with local leadership ready to engage.",
    impactType: "Systems Change",
    impactDescription: "Piloting a replicable model of community governance.",
    afterWeLeave:
      "If the pilot works, Mokra has a functioning CDC. The learnings inform whether and how to replicate the model in other communities.",
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Get contact details for the two women at Mokra from Chat. Scope whether the estate has the right conditions — community readiness, existing structures, resources, appetite for this kind of initiative. This idea is directly linked to the CDC model above.",
    driveLink: null,
  },
  {
    id: "diaspora-workshops-debates",
    name: "Diaspora Workshops & Debates (UK + SL)",
    owner: "Vasuki",
    sectors: ["Diaspora Reconnection"],
    status: "Clear idea",
    readiness: {
      research: true,
      template: true,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "UK and Sri Lanka",
    group: "TBC",
    observation:
      "There is a disconnect between the Tamil diaspora in the UK and communities in Sri Lanka. Many diaspora members have limited understanding of the current situation on the ground, and people in Sri Lanka have limited exposure to diaspora perspectives. The Aram sector vision for Diaspora Reconnection emphasises \"running events that bring together diaspora and Sri Lankan stakeholders\" as a key capacity-building goal.",
    rootCause:
      "Geographic distance, generational gaps, and lack of structured forums for meaningful exchange between diaspora and local communities. Most diaspora engagement is either purely financial (remittances, donations) or short-term visits without deep dialogue.",
    description:
      "Run workshops, debates, and structured discussions that connect diaspora members with individuals in Sri Lanka. Both UK-based sessions (pre-trip) and Sri Lanka-based sessions (during trip). These would create a platform for meaningful dialogue about shared identity, development priorities, and collaborative action.",
    shortDescription:
      "Workshops and debates connecting diaspora members with Sri Lankan communities for meaningful cross-border dialogue.",
    impactType: "Connection & Joy",
    impactDescription:
      "Building relationships and creating spaces for genuine cross-border dialogue.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "1. Figure out logistics — how to run workshops/debates/discussions, target people involved. 2. Define the actual context and content for discussions. 3. Explore incentive criteria for participation.",
    driveLink: null,
  },
  {
    id: "personal-sponsorship",
    name: "Personal Sponsorship Scheme",
    owner: "Grishna",
    sectors: ["Diaspora Reconnection"],
    status: "Semi-clear",
    readiness: {
      research: false,
      template: true,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "School children aged 6-10 in Sri Lanka face barriers to educational access and basic needs. The diaspora has individuals willing to provide sustained support, but there's no structured mechanism connecting individual sponsors to individual children in a way that's transparent, accountable, and sustainable.",
    rootCause:
      "Poverty and lack of resources at the family level. Existing aid is often institutional rather than individual, missing children who fall through the gaps of formal programmes.",
    description:
      "A personal sponsorship scheme providing school children aged 6-10 with individualised help — potentially covering educational materials, basic needs, and ongoing support through a diaspora sponsor.",
    shortDescription:
      "A sponsorship scheme connecting diaspora individuals with school children aged 6-10 for sustained, personalised support.",
    impactType: "Immediate Impact",
    impactDescription: "Direct, tangible support to individual children.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "1. Define long-term and short-term plans — describe end goal, target audience, specific individuals. 2. Budget/logistics/media required for the sponsorship. 3. Define what needs to happen within the next 2 weeks.",
    driveLink: null,
  },
  {
    id: "sen-buddy-sessions",
    name: "SEN Buddy / Friendship Sessions",
    owner: "Grishnna Ravinthiran",
    sectors: ["SEN"],
    status: "Semi-clear",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Near SEN homes; partner with local schools",
    group: "TBC",
    observation:
      "Most people only ever interact with individuals with special needs if they have a sibling or cousin with a disability. Because of that, everyone else just doesn't know how to act. There's an awkwardness or stigma that won't go away. SEN children in homes have limited social interaction with the wider community, which doesn't prepare them for life beyond the home. The Aram debrief pack notes that \"curriculum and engagement structure for children at homes is poor\" and that \"many teachers seem to just look after the kids instead of seeking to maximise their potential.\"",
    rootCause:
      "Societal stigma and lack of exposure. Mainstream communities rarely interact with SEN individuals, perpetuating ignorance and discomfort. SEN homes can become isolated environments rather than integrated parts of the community.",
    description:
      "Get a group of teenagers (14-18 year olds) and bring them together with SEN kids and young adults for a \"Social & Friendship\" session. Pair them up and give them something creative to work on together — learn a dance, paint, something collaborative. At the end, they all sit down and have a meal together like normal friends. For SEN kids: helps them get used to being around all kinds of people (\"life prep\" for their future). For other teens: teaches the next generation that SEN kids aren't \"different\" or someone to be pitied — they learn how to actually talk to them and be a friend. Extension idea: Instead of just Aram delivering short-term circuits, incorporate local community youth who live nearby. They can continue doing the same activities with SEN children after Aram leaves — creating sustainable community integration.",
    shortDescription:
      "Pairing teenagers with SEN children for creative friendship sessions that break down stigma and build lasting community bonds.",
    impactType: "Connection & Joy",
    impactDescription:
      "Building genuine friendships and breaking down stigma, with a pathway to sustained community integration.",
    afterWeLeave:
      "If local youth are involved (not just Aram volunteers), the buddy sessions can continue. The participating teenagers carry a changed perspective into adulthood.",
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Partner with local schools or existing SEN organisations to source teenage participants. Design the session structure — activities, pairing method, facilitation. Explore whether this can be a recurring local programme rather than a one-off.",
    driveLink: null,
  },
  {
    id: "media-documenting",
    name: "Media Documenting",
    owner: "Avi",
    sectors: ["Media"],
    status: "Unsure",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "Aram's work across trips generates significant stories, observations, and impact — but documentation has been inconsistent. Good documentation serves multiple purposes: accountability to donors and partners, content for the website and social media, internal learning, and volunteer recruitment for future years.",
    rootCause:
      "No dedicated media/documentation role or strategy in previous trips. Documentation happened ad hoc, meaning important moments were missed and content quality varied.",
    description:
      "A dedicated media documenting effort across the trip — potentially covering video, photography, social media content, and/or internal documentation of activities and impact.",
    shortDescription:
      "A dedicated media strategy covering video, photography, and documentation across all trip activities.",
    impactType: "Immediate Impact",
    impactDescription:
      "Cross-cutting — supports all sectors by capturing and communicating their work.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Define scope: is this video production, photography, social media, internal documentation, or all of the above? What's the output — a trip documentary, social media posts, content for the website, donor reports? What equipment and skills are needed?",
    driveLink: null,
  },
  {
    id: "drug-awareness",
    name: "Drug Awareness Programme",
    owner: "Avi",
    sectors: ["Wellbeing"],
    status: "Unsure",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "The Aram debrief pack identifies drug usage as one of \"various social issues undermining societal progress now, often to a much greater extent than they were in the past.\" Substance abuse among young people is a growing concern across the communities Aram works with. The sector vision for Holistic Wellbeing lists \"Drug awareness and education programme\" as a planned initiative.",
    rootCause:
      "The Wellbeing sector vision research questions ask: \"What are the root causes and prevalence of substance abuse among young people in the areas we operate in?\" This needs to be answered before designing the intervention. Likely factors include post-conflict trauma, limited economic opportunity, lack of recreational alternatives, and social disengagement.",
    description:
      "A drug awareness and education programme targeting young people in the communities Aram visits. Format and approach still to be defined — could be workshops, peer education, community awareness campaigns, or integration with sports/creative activities.",
    shortDescription:
      "A drug awareness programme targeting young people, addressing the growing substance abuse concern in Aram communities.",
    impactType: "Immediate Impact",
    impactDescription:
      "Awareness-raising with potential for addressing root causes depending on approach.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research existing drug awareness programmes in Sri Lankan communities. Understand the local context and root causes. Define target audience and format. Potentially combine with Alakki's sports/martial arts idea (#19).",
    driveLink: null,
  },
  {
    id: "wellbeing-social-spaces",
    name: "Infrastructure for Wellbeing / Social Spaces",
    owner: "Thushanth",
    sectors: ["Wellbeing"],
    status: "Unsure",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "Many communities in the regions Aram works with lack dedicated spaces for social gathering, recreation, and community wellbeing. Physical infrastructure for social connection is limited — there are few places for young people to gather, for community events to happen, or for people to access wellbeing support. The Wellbeing sector vision asks: \"How are sport and creative outlets being used as tools for youth mental health and social cohesion?\"",
    rootCause:
      "Post-conflict and economically disadvantaged communities often prioritise basic survival needs over social infrastructure. The absence of community gathering spaces contributes to isolation, limited social cohesion, and reduced mental wellbeing.",
    description:
      "Creating physical social/community spaces that support wellbeing. This is still at the conceptual stage — could mean building or refurbishing a community space, equipping existing spaces with recreational materials, or creating mobile/pop-up social spaces.",
    shortDescription:
      "Creating physical community spaces for social gathering, recreation, and wellbeing support in underserved communities.",
    impactType: "Connection & Joy",
    impactDescription:
      "Depending on whether the focus is temporary activation or permanent infrastructure.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "1. Research what community spaces currently exist. 2. Define what \"social spaces\" means concretely — a building? equipment? a programme that happens in a space? 3. Identify a specific community and location.",
    driveLink: null,
  },
  {
    id: "diaspora-crowdfunding",
    name: "Diaspora Crowdfunding Platform",
    owner: "Thushanth",
    sectors: ["Technology", "Diaspora Reconnection"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Online platform",
    group: "TBC",
    observation:
      "The Tamil diaspora sends significant remittances and donations, but this money is often channelled informally without accountability, transparency, or strategic direction. There's no structured way for diaspora members to fund specific community projects, track their impact, or connect with the people they're supporting. The Aram sector visions list both \"Diaspora crowdfunding platform\" (Technology) and \"Website and crowdfunding platform\" (Diaspora Reconnection) as planned initiatives.",
    rootCause:
      "Lack of digital infrastructure connecting diaspora resources to community needs. Existing donation channels are opaque, one-directional, and don't create a feedback loop between funder and community.",
    description:
      "A crowdfunding platform where diaspora members can browse community projects in Sri Lanka, fund specific initiatives, and track impact. This could integrate with Aram's own initiatives or operate as a broader platform for community-driven development.",
    shortDescription:
      "A crowdfunding platform connecting diaspora funders with specific community projects for transparent, trackable impact.",
    impactType: "Systems Change",
    impactDescription:
      "Creating permanent digital infrastructure for diaspora-to-community resource flow.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Chat to create a group chat for the team working on this. Define the MVP scope — what's the minimum viable version that delivers value?",
    driveLink: null,
  },
  {
    id: "practical-skills-mentorship",
    name: "Practical Skills in Virtual Mentorship",
    owner: "Thushanth",
    sectors: ["Education"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Virtual (within existing Aram virtual mentorship programme)",
    group: "TBC",
    observation:
      "Aram's existing virtual mentorship platform connects diaspora professionals with young people in Sri Lankan children's homes. However, the current curriculum may not include enough practical, vocational, or life skills content — the kind of knowledge that directly translates into employability and independence. The Education sector vision notes the importance of \"Virtual mentorship: scaling + introducing SL students\" as a planned initiative.",
    rootCause:
      "Academic education in Sri Lanka is heavily theoretical. Young people in children's homes may have even less access to practical skills development. The mentorship programme has an opportunity to fill this gap but needs curriculum design.",
    description:
      "Add practical/vocational curriculum modules to the existing virtual mentorship programme — things like financial literacy, basic IT skills, communication skills, CV writing, interview preparation, or trade-specific knowledge.",
    shortDescription:
      "Adding practical and vocational skills modules to Aram's existing virtual mentorship programme.",
    impactType: "Systems Change",
    impactDescription:
      "Building sustained capability through the existing mentorship infrastructure.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Define what sort of curriculums should be taught — what skills are most in demand? What do the mentees actually need? Consult with mentors and home staff.",
    driveLink: null,
  },
  {
    id: "optometry-education",
    name: "Videos & Leaflets on Optometry",
    owner: "Shankini",
    sectors: ["Healthcare"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "Eye health awareness and access to optometry services is limited in rural communities across Sri Lanka. Many people — particularly in upcountry and remote areas — don't have access to basic eye health information or know when to seek care. The Healthcare sector vision identifies critical gaps in healthcare delivery and notes the need for accessible health education resources.",
    rootCause:
      "Lack of accessible health education materials in local languages. Limited optometry services outside of urban centres. Low awareness of preventable eye conditions.",
    description:
      "Create educational video and leaflet content on eye health (optometry) in formats accessible to rural communities — potentially in Tamil, covering common conditions, when to seek help, and preventive care. Content could be distributed through community partners, schools, or a centralised digital resource hub.",
    shortDescription:
      "Educational videos and leaflets on eye health in Tamil, targeting rural communities with limited optometry access.",
    impactType: "Immediate Impact",
    impactDescription:
      "Directly providing health education that communities can access and use.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "1. Decide what set of videos/topics to cover. 2. Explore different content delivery methods (video, print, digital, community screening). 3. Investigate whether this can be part of a centralised Aram resource hub.",
    driveLink: null,
  },
  {
    id: "optom-sen-orange-tent",
    name: "Optom for SEN — Orange Tent Therapy",
    owner: "Shankini",
    sectors: ["SEN", "Healthcare"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "SEN homes",
    group: "TBC",
    observation:
      "Children with special educational needs often have undiagnosed or unaddressed vision problems that compound their developmental challenges. Standard optometry services are not adapted for SEN children — the environment, communication approach, and assessment methods all need modification. The SEN debrief notes that \"many of the SEN homes lack specialised staff to meet the children's needs.\"",
    rootCause:
      "SEN homes lack access to specialist healthcare services. Optometry services are not adapted for neurodivergent children. Staff are not trained to identify vision-related issues.",
    description:
      "Bring adapted optometry support to SEN children — potentially using the \"Orange Tent Therapy\" approach, which creates a controlled, calming sensory environment for eye assessments with children who might find standard clinical settings distressing.",
    shortDescription:
      "Adapted optometry assessments for SEN children using sensory-friendly environments like Orange Tent Therapy.",
    impactType: "Immediate Impact",
    impactDescription:
      "Directly addressing an unmet healthcare need for some of the most vulnerable children.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research costs and expertise needed. Identify which SEN homes would benefit most. Determine whether this needs a qualified optometrist on the trip team.",
    driveLink: null,
  },
  {
    id: "sen-safe-spaces",
    name: "SEN Safe Spaces & Belonging",
    owner: "Jennifer",
    sectors: ["SEN"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Orphanages and SEN homes",
    group: "TBC",
    observation:
      "Children in orphanages and SEN homes often live in environments that don't fully support their emotional, sensory, or developmental needs. Physical spaces may not be designed with children's wellbeing in mind. The Aram debrief pack notes that \"infrastructure in many of the SEN homes is inadequate\" and that \"curriculum and engagement structure for children at homes is poor.\" Staff burnout and lack of motivation is also a factor — there's no dedicated space for staff either.",
    rootCause:
      "Under-resourcing of children's homes. Lack of understanding of how physical environments affect emotional regulation, sensory processing, and sense of belonging. Staff are undervalued and lack their own supportive infrastructure.",
    description:
      "A multi-layered approach: (1) Understand children's needs and preferences — get them to draw or express what they want in their space, analyse these to inform design. (2) Create calming-down zones or enclosed spaces for emotional regulation (particularly important for SEN children). (3) Design sensory-appropriate spaces for children with specific SEN needs. (4) Create a dedicated space for staff wellbeing and motivation. (5) Design incentive systems for keeping spaces well maintained after creation.",
    shortDescription:
      "Designing sensory-appropriate spaces and calming zones in SEN homes through participatory design with children and staff.",
    impactType: "Immediate Impact",
    impactDescription:
      "Physical infrastructure improvements that persist, combined with an approach that understands needs before imposing solutions.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research methods to understand children's preferences (participatory design with children). Think about how to incentivise maintenance. Consider both children's spaces and staff spaces. Determine what's feasible within a 2-week trip window — design or build or both?",
    driveLink: null,
  },
  {
    id: "sports-substance-abuse",
    name: "Sports/Martial Arts for Substance Abuse Intervention",
    owner: "Alakki",
    sectors: ["Wellbeing"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "Substance abuse among young people is a growing issue in the communities Aram works with. The debrief pack flags \"drug usage\" as a social issue \"undermining societal progress now, often to a much greater extent than in the past.\" The Wellbeing sector vision asks about root causes and prevalence of substance abuse. Sports and physical activity are recognised globally as effective interventions for at-risk youth — providing structure, community, discipline, and healthy outlets.",
    rootCause:
      "Post-conflict trauma, limited economic opportunity, lack of recreational alternatives, social disengagement, and absence of structured youth programmes. Young people with nothing to do and no positive outlets are most vulnerable.",
    description:
      "Establish substance abuse intervention programmes through sports and martial arts centres. This could mean setting up regular training sessions, establishing clubs, or partnering with existing facilities to create structured programmes specifically targeting at-risk youth.",
    shortDescription:
      "Sports and martial arts programmes targeting at-risk youth as an intervention for substance abuse.",
    impactType: "Systems Change",
    impactDescription:
      "Creating sustained programmes that address root causes through positive engagement.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research what sports/martial arts facilities and programmes already exist. Define the target community and model (new club? partnership? one-off tournament vs ongoing programme?). Consider combining with Avi's Drug Awareness Programme (#12) for a dual awareness + action approach.",
    driveLink: null,
  },
  {
    id: "community-book-exchange",
    name: "Community Book Exchange",
    owner: "Alakki",
    sectors: ["Community Development"],
    status: "Exploring",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "Access to books and reading materials is limited in many of the communities Aram works with. Libraries are scarce, and the education system's focus on textbooks and exams means reading for pleasure or personal development is not a norm. Community connection programmes can serve dual purposes — building social capital while providing access to resources.",
    rootCause:
      "Lack of community-level infrastructure for knowledge sharing. Limited access to diverse reading materials beyond school textbooks. No culture of community-level resource exchange.",
    description:
      "A book exchange programme connecting communities — potentially through physical book-sharing points, community libraries, or a rotating collection system between partner organisations and homes.",
    shortDescription:
      "A book exchange programme creating community libraries and reading access in underserved areas.",
    impactType: "Connection & Joy",
    impactDescription:
      "Building community connections through shared resources.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research what exists. Define scope — which communities? What kinds of books (educational, recreational, Tamil-language, English-language)? Physical infrastructure needed? How to sustain it after setup?",
    driveLink: null,
  },
  {
    id: "siblings-tech-network",
    name: "Siblings Tech Network (SEN)",
    owner: "Evona / SEN team",
    sectors: ["SEN"],
    status: "Long-term idea",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "SEN advocacy in Sri Lanka is limited, and the next generation of advocates will likely come from those closest to SEN individuals — their siblings. Many siblings of SEN children are more tech-literate and could be mobilised as a network for awareness, advocacy, and practical support. The SEN debrief notes \"there is a lot of potential in creating support networks between SEN homes and between diaspora professionals and parents.\"",
    rootCause:
      "SEN advocacy infrastructure is weak. Siblings are an untapped resource — they understand the challenges firsthand but have no structured way to contribute or connect with each other.",
    description:
      "Set up a network of tech-oriented siblings of SEN individuals who can serve as on-the-ground SEN partners for next-generation advocacy — sharing information, raising awareness, providing peer support, and potentially contributing to practical improvements using technology.",
    shortDescription:
      "A tech-oriented network of SEN siblings for grassroots advocacy, awareness, and peer support.",
    impactType: "Systems Change",
    impactDescription: "Building a self-sustaining advocacy network.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research feasibility. Identify potential first members. Define what \"tech-oriented\" means in practice — social media advocacy? digital tools for SEN support? online community?",
    driveLink: null,
  },
  {
    id: "staff-training-orhan",
    name: "Staff Training at ORHAN",
    owner: "Evona / SEN team",
    sectors: ["SEN"],
    status: "Long-term idea",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "ORHAN children's home",
    group: "TBC",
    observation:
      "Staff at SEN homes are undertrained and often don't have the skills to manage SEN behaviours or maximise children's developmental potential. The debrief pack notes: \"Staff are undertrained and do not handle SEN behaviours\" and \"many teachers seem to just look after the kids instead of seeking to maximise their potential with a development path.\" ORHAN specifically has been identified as needing staff capacity building.",
    rootCause:
      "Lack of access to SEN-specific training for care workers. No ongoing professional development infrastructure. Limited resources (equipment, materials) to support evidence-based approaches. Staff may not see a pathway to improving their practice.",
    description:
      "Deliver staff training at ORHAN in partnership with Dr James. Launch in person during the trip, with setup (including donated equipment like projector/laptop) sorted prior to arrival. The training should cover SEN behaviour management, developmental approaches, and practical strategies staff can implement independently.",
    shortDescription:
      "In-person SEN behaviour management and developmental training for ORHAN staff, partnering with Dr James.",
    impactType: "Systems Change",
    impactDescription:
      "Building permanent staff capability that improves care quality after Aram leaves.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Contact Dr James to confirm scope and format. Source donations for projector/laptop setup. Design training materials that can be left behind as reference resources.",
    driveLink: null,
  },
  {
    id: "ehcps-serendip",
    name: "EHCPs at Serendip",
    owner: "Evona / SEN team",
    sectors: ["SEN"],
    status: "Long-term idea",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: "Serendip children's home",
    group: "TBC",
    observation:
      "Children at SEN homes often lack individualised development plans. In the UK, Education, Health and Care Plans (EHCPs) provide a structured framework for assessing each child's needs and creating tailored support plans. Nothing equivalent exists at homes like Serendip. The debrief pack notes that \"numerous kids have much higher IQs than they are treated\" — suggesting children's potential is being underestimated without proper assessment.",
    rootCause:
      "No framework for individual assessment and planning. Staff lack the tools and training to evaluate children's capabilities systematically. Without individual plans, children receive generic rather than tailored support.",
    description:
      "Adapt and pilot the EHCP model at Serendip — starting with trial reviews for 3 children on one of the Discovery/Research days. This would create a template and process that Serendip could continue using, and that could be replicated at other homes.",
    shortDescription:
      "Adapting the UK's EHCP framework for SEN children at Serendip, starting with trial assessments for 3 children.",
    impactType: "Systems Change",
    impactDescription:
      "Introducing a replicable assessment and planning framework for SEN children.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research how to adapt the EHCP process for the Sri Lankan context. Identify 3 children at Serendip for the trial. Design assessment tools and documentation templates. Determine who has the expertise to conduct the reviews (needs SEN professionals).",
    driveLink: null,
  },
  {
    id: "vocational-training-sen",
    name: "Vocational Training for SEN",
    owner: "Evona / SEN team",
    sectors: ["SEN"],
    status: "Long-term idea",
    readiness: {
      research: false,
      template: false,
      partnerIdentified: false,
      preTripPlan: false,
      budget: false,
      confirmed: false,
    },
    location: null,
    group: "TBC",
    observation:
      "SEN young people in homes face a cliff edge when they age out — with few vocational skills, limited social networks, and almost no pathway to employment or independent living. The debrief pack notes that engagement structures \"seek to look after kids rather than maximise their potential with a development path.\" The SEN sector vision doesn't currently include explicit vocational training, making this an identified gap.",
    rootCause:
      "No structured transition planning for SEN young people ageing out of care. Care homes focus on day-to-day management rather than long-term outcomes. Limited understanding of what vocational options are realistic and available for young people with different SEN profiles.",
    description:
      "Research and develop vocational training pathways for SEN young people — understanding what jobs or activities they could realistically do, what training they'd need, and what support structures would make employment possible.",
    shortDescription:
      "Researching and developing vocational training pathways for SEN young people transitioning out of care.",
    impactType: "Systems Change",
    impactDescription:
      "Creating long-term pathways to independence for SEN young people.",
    afterWeLeave: null,
    similarTried: null,
    phases: {
      preTrip: null,
      onTrip: null,
      postTrip: null,
    },
    logisticsNeeded: null,
    partnersNeeded: null,
    resources: null,
    successMetrics: null,
    risks: null,
    openQuestions: null,
    nextSteps:
      "Research what vocational options exist for SEN individuals in Sri Lanka. Understand the legal and practical landscape for SEN employment. Identify which homes have young people approaching the transition age. Consider what kinds of vocational skills are both teachable and lead to actual employment in the local economy.",
    driveLink: null,
  },
];
