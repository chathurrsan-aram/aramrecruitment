import PDFDocument from 'pdfkit';
import fs from 'fs';

const roles = [
  {
    id: 'media-director',
    title: 'Media Director',
    tier: 'Core Leadership',
    commitment: '3-5 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: "Tell Aram's story to build trust, recruit volunteers, and change perceptions of Sri Lanka.",
    aboutRole: [
      "As Media Director, you'll be the voice and face of Aram to the outside world. You'll craft narratives that inspire young Tamils to join our mission and show the broader community the real Sri Lanka — not the headlines, but the people, the potential, and the progress.",
      "This is a strategic leadership role. You won't just be posting content — you'll be building a media function from the ground up, recruiting and mentoring a team, and developing campaigns that drive real action. You'll work closely with every part of the organisation to tell stories that matter.",
      "The ideal candidate combines creative vision with execution ability. You understand what makes content resonate on different platforms, and you can rally others to help produce it consistently."
    ],
    responsibilities: [
      'Own all external communications, social media, and brand strategy',
      'Create and coordinate content across Instagram, TikTok, and our website',
      'Assemble and lead a media team capable of diverse outputs',
      'Develop campaigns that attract the right volunteers',
    ],
    impact: 'Your work directly shapes how the world sees Sri Lanka and brings in the people who make our initiatives possible.',
    skills: ['Content creation (reels, posts, video)', 'Team leadership', 'Brand strategy', 'Storytelling'],
    worksWith: ['Executive Lead', 'All Sector Leads', 'Head of Socials'],
    relationships: {
      reportsTo: ['Executive Lead'],
      manages: ['Head of Socials'],
    },
    whatYoullGain: [
      'Hands-on experience in brand strategy and content creation',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'portfolio', label: "Share a link to content you've created (reel, post, video, or portfolio)" },
      { id: 'team-experience', label: 'Describe your experience leading a team or creative project' },
    ],
  },
  {
    id: 'finance-director',
    title: 'Finance Director',
    tier: 'Core Leadership',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Keep Aram financially sustainable and transparent through proper budgeting, fundraising, and reporting.',
    aboutRole: [
      "As Finance Director, you'll be the steward of Aram's resources. Every initiative we run — from healthcare camps to education programs — depends on sound financial management. You'll ensure we have the funds to operate, the systems to track spending, and the transparency to maintain trust with donors.",
      "This role goes beyond bookkeeping. You'll help shape our fundraising strategy, build relationships with donors, and create financial processes that can scale as we grow. You'll work with every team to understand their needs and ensure resources are allocated effectively.",
      "We're looking for someone who's comfortable with numbers but can also communicate financial concepts clearly to non-finance colleagues. Attention to detail and integrity are essential."
    ],
    responsibilities: [
      'Manage budgets and track spending across all initiatives',
      'Create transparent financial reporting for stakeholders',
      'Develop and implement better financial processes',
      'Support fundraising strategy and donor communications',
    ],
    impact: 'You enable every initiative by ensuring we have the resources and accountability to deliver.',
    skills: ['Budgeting & accounting', 'Spreadsheets & financial tools', 'Process design', 'Clear communication'],
    worksWith: ['Executive Lead', 'Sector Leads', 'Trip Director'],
    relationships: {
      reportsTo: ['Executive Lead'],
      manages: [],
    },
    whatYoullGain: [
      'Hands-on experience in financial management and nonprofit accounting',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'finance-exp', label: 'Describe your experience with budgeting, accounting, or financial reporting' },
      { id: 'tools', label: 'What financial tools or software are you comfortable with?' },
    ],
  },
  {
    id: 'trip-director-2027',
    title: 'Trip Director (2027)',
    tier: 'Core Leadership',
    commitment: '3-5 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Deliver a safe, impactful annual trip and develop systems so future organisers can run it.',
    aboutRole: [
      "As Trip Director, you'll lead the planning and execution of Aram's flagship annual trip to Sri Lanka. This is where everything comes together — 40+ volunteers travelling to deliver healthcare, education, and community development initiatives across multiple locations.",
      "You'll coordinate with our Sri Lanka partners to design an itinerary that maximises impact while ensuring volunteer safety. You'll manage logistics from flights to accommodation, recruit and brief volunteers, and handle the inevitable curveballs that come with operating in a developing country.",
      "This role requires someone who thrives under pressure and can hold the big picture while managing countless details. You'll be building on three successful trips while also documenting processes so future Trip Directors can improve on your work."
    ],
    responsibilities: [
      'Plan and execute the 2027 Aram trip end-to-end',
      'Coordinate with Sri Lanka partners on logistics and itinerary',
      'Manage trip volunteers and ensure clear roles',
      'Document and systematise processes for future trips',
    ],
    impact: 'You create the experience that transforms volunteers and delivers real value to communities.',
    skills: ['Event/trip planning', 'Logistics coordination', 'Team management', 'Problem-solving under pressure'],
    worksWith: ['Executive Lead', 'Sector Leads', 'Sri Lanka Partners'],
    relationships: {
      reportsTo: ['Executive Lead'],
      manages: ['Trip Organising Team', 'Trip Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in large-scale event and logistics management',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'event-exp', label: 'Have you organised events or trips before? Describe briefly.' },
      { id: 'improvement', label: 'What would make the 2027 trip better than previous years?' },
    ],
  },
  {
    id: 'healthcare-lead',
    title: 'Healthcare Sector Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own healthcare initiatives end-to-end, from health camps to nutrition programs to mental health awareness.',
    aboutRole: [
      "As Healthcare Sector Lead, you'll own Aram's entire healthcare portfolio. From organising health screening camps during the trip to developing year-round nutrition and mental health programs, you'll set the strategy and drive execution.",
      "You'll work with healthcare professionals in our volunteer base and build relationships with partners in Sri Lanka. You'll identify the most pressing health needs in our target communities and design interventions that create lasting impact — not just one-off treatments.",
      "This role suits someone with healthcare knowledge (professional or personal) who's passionate about making quality healthcare accessible. You don't need to be a doctor, but you need to understand the sector well enough to make smart decisions about where we can add value."
    ],
    responsibilities: [
      'Set vision and targets for healthcare impact in 2026',
      'Drive at least one major initiative throughout the year',
      'Coordinate trip healthcare activities with volunteers',
      'Build relationships with healthcare partners and experts',
    ],
    impact: 'You directly improve health outcomes for communities across Sri Lanka.',
    skills: ['Healthcare knowledge (professional or personal)', 'Project management', 'Partner coordination'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'Healthcare Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['Healthcare Initiative Drivers', 'Healthcare Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in healthcare programme design and delivery',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why healthcare specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in healthcare?" },
    ],
  },
  {
    id: 'sen-lead',
    title: 'SEN Sector Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own special educational needs initiatives, supporting children with disabilities and their families.',
    aboutRole: [
      "As SEN Sector Lead, you'll champion Aram's work supporting children with disabilities and their families. In Sri Lanka, children with special educational needs often face stigma and lack access to proper support. You'll help change that.",
      "You'll partner with organisations like SPARKS and local disability centres to deliver meaningful programs — from sensory equipment donations to parent support workshops. You'll also develop our volunteers' understanding of SEN so they can engage appropriately during trips.",
      "This role requires deep empathy and sensitivity, combined with the practical skills to turn good intentions into effective programs. Experience with SEN isn't required, but genuine passion and willingness to learn is essential."
    ],
    responsibilities: [
      'Set vision and targets for SEN impact in 2026',
      'Drive initiatives supporting children with disabilities',
      'Coordinate with partners like SPARKS and local centres',
      'Develop parent wellbeing and training programs',
    ],
    impact: 'You help ensure children with disabilities and their families get the support they deserve.',
    skills: ['SEN knowledge or passion', 'Empathy and sensitivity', 'Project management'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'SEN Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['SEN Initiative Drivers', 'SEN Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in special educational needs support and advocacy',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why SEN specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in SEN?" },
    ],
  },
  {
    id: 'education-lead',
    title: 'Education Sector Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own education initiatives from career guidance to curriculum support to teacher training.',
    aboutRole: [
      "As Education Sector Lead, you'll shape how Aram supports learning and opportunity in Sri Lanka. Education is the foundation for long-term change, and you'll design programs that open doors for young people who might otherwise not see a path forward.",
      "You'll work with schools like Varany Central College and partners like Tea Leaf Trust to deliver career workshops, mentoring programs, and curriculum improvements. You might organise mock interviews, connect students with professionals in the diaspora, or help teachers access new teaching resources.",
      "We're looking for someone who understands education — whether through teaching, tutoring, or other experience — and can design interventions that genuinely help rather than just look good on paper."
    ],
    responsibilities: [
      'Set vision and targets for education impact in 2026',
      'Drive initiatives like career workshops, mentoring, curriculum improvements',
      'Coordinate with schools like Varany Central College and Tea Leaf Trust',
      'Build connections with educators and experts',
    ],
    impact: 'You open doors for young people who otherwise might not see a path forward.',
    skills: ['Education sector knowledge', 'Workshop design', 'Mentoring experience'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'Education Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['Education Initiative Drivers', 'Education Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in education programme design and mentoring',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why education specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in education?" },
    ],
  },
  {
    id: 'technology-lead',
    title: 'Technology Sector Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own technology initiatives from digital skills training to IT infrastructure to innovation partnerships.',
    aboutRole: [
      "As Technology Sector Lead, you'll connect Sri Lankan communities to the opportunities of the digital age. Technology can be a great equaliser, and you'll design programs that give people the skills and tools to participate in the modern economy.",
      "You'll partner with organisations like Dreamspace to deliver digital literacy training, coding workshops, and IT infrastructure improvements. You might help a school get reliable internet, train teachers to use educational software, or run career sessions showing young people paths into tech.",
      "This role suits someone with tech industry knowledge who wants to use it for good. You don't need to be a developer — understanding the landscape and what skills matter is more important than coding ability."
    ],
    responsibilities: [
      'Set vision and targets for technology impact in 2026',
      'Drive digital literacy and skills programs',
      'Coordinate with partners like Dreamspace',
      'Identify technology solutions for community challenges',
    ],
    impact: 'You connect communities to the digital world and the opportunities it creates.',
    skills: ['Tech industry knowledge', 'Digital skills training', 'Innovation mindset'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'Tech Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['Technology Initiative Drivers', 'Technology Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in tech-for-good and digital skills training',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why technology specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in technology?" },
    ],
  },
  {
    id: 'wellbeing-lead',
    title: 'Wellbeing Sector Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own holistic wellbeing initiatives covering mental health, life skills, soft skills, and safeguarding.',
    aboutRole: [
      "As Wellbeing Sector Lead, you'll address the often-overlooked foundations of human flourishing. Mental health stigma is high in Sri Lanka, and practical life skills that many take for granted are often lacking. You'll design programs that build inner resources.",
      "Your portfolio spans mental health awareness campaigns, life skills workshops (from financial literacy to communication), and ensuring safeguarding practices across all Aram activities. You'll work to normalise conversations about mental health while providing practical support.",
      "This role requires someone who understands that sustainable development starts with individual wellbeing. Experience in mental health, counselling, or personal development is valuable, but most important is genuine care for holistic human development."
    ],
    responsibilities: [
      'Set vision and targets for wellbeing impact in 2026',
      'Drive mental health awareness and support programs',
      'Develop life skills and soft skills workshops',
      'Ensure safeguarding across all Aram activities',
    ],
    impact: 'You help people build the inner resources they need to thrive.',
    skills: ['Mental health awareness', 'Workshop facilitation', 'Safeguarding knowledge'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'Wellbeing Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['Wellbeing Initiative Drivers', 'Wellbeing Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in mental health awareness and wellbeing programmes',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why wellbeing specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in wellbeing?" },
    ],
  },
  {
    id: 'economic-dev-lead',
    title: 'Economic Development Lead',
    tier: 'Sector Lead',
    commitment: '2-4 hrs/week',
    term: '2026-2027 cycle',
    priority: true,
    shortDesc: 'Own economic initiatives from livelihoods to entrepreneurship to cooperative development.',
    aboutRole: [
      "As Economic Development Lead, you'll tackle the root cause of many challenges: poverty. You'll design programs that help families build sustainable incomes, whether through livelihood training, entrepreneurship support, or cooperative development.",
      "You'll work with initiatives like the Kullu cooperatives to support self-sufficiency projects, help local entrepreneurs access markets, and connect communities with economic opportunities. Your focus is on sustainable change — teaching people to fish, not giving them fish.",
      "This role suits someone with business or economics knowledge who wants to apply it to community development. Understanding how small businesses work, what makes cooperatives succeed, and how to create real economic value is more important than formal qualifications."
    ],
    responsibilities: [
      'Set vision and targets for economic impact in 2026',
      'Drive livelihood and entrepreneurship programs',
      'Support Kullu cooperatives and self-sufficiency projects',
      'Connect communities with economic opportunities',
    ],
    impact: 'You help families build sustainable incomes and break cycles of poverty.',
    skills: ['Business/economics knowledge', 'Entrepreneurship experience', 'Community development'],
    worksWith: ['Chief Initiative Lead', 'Trip Director', 'Econ Dev Volunteers'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: ['Econ Dev Initiative Drivers', 'Econ Dev Volunteers'],
    },
    whatYoullGain: [
      'Hands-on experience in economic development and social enterprise',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'why-sector', label: 'Why economic development specifically? What draws you to this sector?' },
      { id: 'initiative-idea', label: "What's one initiative you'd want to drive in economic development?" },
    ],
  },
  {
    id: 'research-lead',
    title: 'Research Lead',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    term: '2026-2027 cycle',
    priority: false,
    shortDesc: 'Drive research that informs our initiatives and shares our learnings with the world.',
    aboutRole: [
      "As Research Lead, you'll ensure Aram's work is grounded in evidence and our learnings benefit others. You'll manage research projects that emerge from our trips, coordinate with academics and experts, and create publications that share what we've learned.",
      "You might analyse data from our health camps to identify trends, document case studies of successful initiatives, or collaborate with universities on research papers. Your work helps us make better decisions and contributes to the broader development sector's knowledge.",
      "This role suits someone with research and analysis skills who enjoys turning insights into actionable knowledge. Academic experience is valuable but not essential — what matters is rigorous thinking and clear communication."
    ],
    responsibilities: [
      'Manage research pieces from trip insights',
      'Coordinate with experts and academics',
      'Create summary reports and publications',
      'Support evidence-based decision making',
    ],
    impact: 'You ensure our work is grounded in reality and our learnings reach others.',
    skills: ['Research & analysis', 'Academic writing', 'Data interpretation'],
    worksWith: ['Media Director', 'Sector Leads'],
    relationships: {
      reportsTo: ['Chief Initiative Lead'],
      manages: [],
    },
    whatYoullGain: [
      'Hands-on experience in research and data analysis',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'research-exp', label: "Share an example of research or analysis you've done" },
    ],
  },
  {
    id: 'head-of-socials',
    title: 'Head of Socials',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    term: '2026-2027 cycle',
    priority: false,
    shortDesc: 'Own our social media presence day-to-day, growing our community and engagement.',
    aboutRole: [
      "As Head of Socials, you'll be the day-to-day voice of Aram online. While the Media Director sets strategy, you'll execute — creating content, engaging with our community, and keeping our social presence active and growing.",
      "You'll manage our Instagram and other platforms, track what's working through analytics, and constantly experiment to improve engagement. You'll respond to comments and messages, build relationships with our followers, and support larger campaigns when they launch.",
      "This role suits someone who lives on social media and understands what makes content perform. You should be comfortable creating content quickly and consistently, and enjoy the community-building side of social media, not just the posting."
    ],
    responsibilities: [
      'Create and schedule regular social content',
      'Engage with our community online',
      'Track analytics and optimize performance',
      'Support campaign execution',
    ],
    impact: 'You build the community that powers everything we do.',
    skills: ['Social media management', 'Content creation', 'Community building'],
    worksWith: ['Media Director'],
    relationships: {
      reportsTo: ['Media Director', 'Community Lead'],
      manages: [],
    },
    whatYoullGain: [
      'Hands-on experience in social media management and community building',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'social-exp', label: "Link to a social account you manage or content you've created" },
    ],
  },
  {
    id: 'events-lead',
    title: 'Events Lead',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    term: '2026-2027 cycle',
    priority: false,
    shortDesc: 'Plan and execute UK-based events that build community and raise funds.',
    aboutRole: [
      "As Events Lead, you'll create experiences that bring our community together and generate resources for our mission. From fundraising dinners to community meetups, you'll plan and execute events that strengthen Aram's presence in the UK.",
      "You'll handle everything from venue selection to volunteer coordination, sponsorship outreach to on-the-day logistics. You'll build relationships with venues, vendors, and sponsors, and create events that people genuinely enjoy — not just tolerate because it's for a good cause.",
      "This role suits someone who loves event planning and has experience making things happen. You should be comfortable managing logistics, working with vendors, and rallying volunteers to help execute your vision."
    ],
    responsibilities: [
      'Plan fundraising and community events',
      'Coordinate logistics and volunteers',
      'Build partnerships with venues and sponsors',
      'Create memorable experiences for attendees',
    ],
    impact: 'You bring people together and generate resources for our mission.',
    skills: ['Event planning', 'Logistics', 'Vendor management'],
    worksWith: ['Community Lead', 'Finance Director'],
    relationships: {
      reportsTo: ['Community Lead'],
      manages: [],
    },
    whatYoullGain: [
      'Hands-on experience in event planning and logistics management',
      'Work alongside a passionate, supportive team',
      'Opportunity to make tangible impact in Sri Lanka',
      'Reference and LinkedIn recommendation upon completion',
    ],
    questions: [
      { id: 'event-exp', label: "Describe an event you've planned or helped organise" },
    ],
  },
];

// --- PDF Generation ---

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  info: {
    Title: 'Aram Recruitment - All Volunteer Roles 2026-2027',
    Author: 'Aram',
    Subject: 'Volunteer Role Descriptions',
  },
});

const output = fs.createWriteStream('aram-roles-2026-2027.pdf');
doc.pipe(output);

// Color palette matching the website
const colors = {
  'Core Leadership': '#7C3AED',
  'Sector Lead': '#0D9488',
  'Team Lead': '#475569',
  priority: '#F59E0B',
  heading: '#1E293B',
  body: '#334155',
  muted: '#64748B',
  line: '#CBD5E1',
  background: '#F8FAFC',
};

function drawLine(y) {
  doc.strokeColor(colors.line).lineWidth(0.5).moveTo(50, y).lineTo(545, y).stroke();
}

function ensureSpace(needed) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

// --- Cover Page ---
doc.rect(0, 0, doc.page.width, doc.page.height).fill('#1E293B');

doc.fontSize(12).fillColor('#94A3B8').text('ARAM', 50, 180, { align: 'center', characterSpacing: 8 });
doc.moveDown(1);
doc.fontSize(36).fillColor('#FFFFFF').text('Volunteer Roles', 50, 220, { align: 'center' });
doc.fontSize(28).fillColor('#94A3B8').text('2026 - 2027', 50, 270, { align: 'center' });
doc.moveDown(3);

// Tier summary boxes on cover
const tiers = [
  { name: 'Core Leadership', count: 3, color: colors['Core Leadership'] },
  { name: 'Sector Lead', count: 6, color: colors['Sector Lead'] },
  { name: 'Team Lead', count: 3, color: colors['Team Lead'] },
];

let boxY = 360;
tiers.forEach((tier) => {
  doc.roundedRect(170, boxY, 255, 40, 4).fill(tier.color);
  doc.fontSize(13).fillColor('#FFFFFF').text(`${tier.name}  —  ${tier.count} roles`, 170, boxY + 12, { width: 255, align: 'center' });
  boxY += 55;
});

doc.fontSize(10).fillColor('#64748B').text('12 roles across 3 tiers', 50, 540, { align: 'center' });
doc.fontSize(9).fillColor('#475569').text('Generated from aramrecruitment app data', 50, 560, { align: 'center' });

// --- Table of Contents ---
doc.addPage();
doc.fontSize(22).fillColor(colors.heading).text('Table of Contents', 50, 50);
doc.moveDown(1.5);

let tocY = doc.y;
const tierGroups = {
  'Core Leadership': roles.filter((r) => r.tier === 'Core Leadership'),
  'Sector Lead': roles.filter((r) => r.tier === 'Sector Lead'),
  'Team Lead': roles.filter((r) => r.tier === 'Team Lead'),
};

Object.entries(tierGroups).forEach(([tierName, tierRoles]) => {
  doc.fontSize(13).fillColor(colors[tierName]).text(tierName, 50, tocY);
  tocY = doc.y + 6;
  tierRoles.forEach((role, i) => {
    const priorityTag = role.priority ? '  [Priority]' : '';
    doc.fontSize(10).fillColor(colors.body).text(`${i + 1}. ${role.title}${priorityTag}  —  ${role.commitment}`, 70, tocY);
    tocY = doc.y + 4;
  });
  tocY += 12;
});

// --- Role Pages ---
roles.forEach((role, index) => {
  doc.addPage();
  const tierColor = colors[role.tier] || colors.heading;

  // Tier & priority badge bar
  doc.roundedRect(50, 45, 495, 28, 3).fill(tierColor);
  let badgeText = role.tier.toUpperCase();
  if (role.priority) badgeText += '   |   PRIORITY ROLE';
  doc.fontSize(9).fillColor('#FFFFFF').text(badgeText, 60, 52, { characterSpacing: 1.5 });

  // Title
  doc.fontSize(24).fillColor(colors.heading).text(role.title, 50, 90);
  doc.moveDown(0.3);

  // Meta line
  doc.fontSize(10).fillColor(colors.muted).text(`${role.commitment}  |  ${role.term}  |  Role ${index + 1} of ${roles.length}`, 50);
  doc.moveDown(0.5);

  // Short description
  doc.fontSize(11).fillColor(colors.body).text(role.shortDesc, 50, doc.y, { width: 495 });
  doc.moveDown(0.8);
  drawLine(doc.y);
  doc.moveDown(0.8);

  // About the Role
  ensureSpace(120);
  doc.fontSize(14).fillColor(tierColor).text('About the Role', 50);
  doc.moveDown(0.4);
  role.aboutRole.forEach((para) => {
    ensureSpace(60);
    doc.fontSize(10).fillColor(colors.body).text(para, 50, doc.y, { width: 495, lineGap: 3 });
    doc.moveDown(0.6);
  });
  doc.moveDown(0.4);

  // Responsibilities
  ensureSpace(80);
  doc.fontSize(14).fillColor(tierColor).text('Key Responsibilities', 50);
  doc.moveDown(0.4);
  role.responsibilities.forEach((item) => {
    ensureSpace(20);
    doc.fontSize(10).fillColor(colors.body).text(`•  ${item}`, 60, doc.y, { width: 475, lineGap: 2 });
    doc.moveDown(0.3);
  });
  doc.moveDown(0.4);

  // Impact
  ensureSpace(50);
  doc.fontSize(14).fillColor(tierColor).text('Impact', 50);
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor(colors.body).text(role.impact, 50, doc.y, { width: 495, lineGap: 3 });
  doc.moveDown(0.8);

  // Skills
  ensureSpace(50);
  doc.fontSize(14).fillColor(tierColor).text('Skills & Experience', 50);
  doc.moveDown(0.4);
  role.skills.forEach((skill) => {
    ensureSpace(18);
    doc.fontSize(10).fillColor(colors.body).text(`•  ${skill}`, 60, doc.y, { width: 475 });
    doc.moveDown(0.25);
  });
  doc.moveDown(0.4);

  // Works With
  ensureSpace(50);
  doc.fontSize(14).fillColor(tierColor).text('Works With', 50);
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor(colors.body).text(role.worksWith.join('  |  '), 60);
  doc.moveDown(0.6);

  // Reporting Structure
  ensureSpace(60);
  doc.fontSize(14).fillColor(tierColor).text('Reporting Structure', 50);
  doc.moveDown(0.3);
  if (role.relationships.reportsTo.length) {
    doc.fontSize(10).fillColor(colors.muted).text('Reports to: ', 60, doc.y, { continued: true });
    doc.fillColor(colors.body).text(role.relationships.reportsTo.join(', '));
  }
  if (role.relationships.manages.length) {
    doc.fontSize(10).fillColor(colors.muted).text('Manages: ', 60, doc.y, { continued: true });
    doc.fillColor(colors.body).text(role.relationships.manages.join(', '));
  }
  doc.moveDown(0.6);

  // What You'll Gain
  ensureSpace(70);
  doc.fontSize(14).fillColor(tierColor).text("What You'll Gain", 50);
  doc.moveDown(0.4);
  role.whatYoullGain.forEach((item) => {
    ensureSpace(18);
    doc.fontSize(10).fillColor(colors.body).text(`•  ${item}`, 60, doc.y, { width: 475 });
    doc.moveDown(0.25);
  });
  doc.moveDown(0.4);

  // Application Questions
  if (role.questions.length) {
    ensureSpace(60);
    doc.fontSize(14).fillColor(tierColor).text('Application Questions', 50);
    doc.moveDown(0.4);
    role.questions.forEach((q, qi) => {
      ensureSpace(18);
      doc.fontSize(10).fillColor(colors.body).text(`${qi + 1}. ${q.label}`, 60, doc.y, { width: 475 });
      doc.moveDown(0.3);
    });
  }

  // Footer
  const footerY = doc.page.height - 35;
  doc.fontSize(8).fillColor(colors.muted).text(`Aram Volunteer Roles 2026-2027  |  ${role.title}  |  Page ${index + 3}`, 50, footerY, { width: 495, align: 'center' });
});

doc.end();

output.on('finish', () => {
  console.log('PDF generated successfully: aram-roles-2026-2027.pdf');
  console.log(`Total roles: ${roles.length}`);
  console.log(`Pages: ${roles.length + 2} (cover + TOC + ${roles.length} role pages)`);
});
