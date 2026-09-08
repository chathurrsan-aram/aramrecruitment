export const sectorColors = {
  'Economic Development': '#2D6A4F',
  'Holistic Wellbeing': '#B5651D',
  'Education': '#6D4A9E',
  'Healthcare': '#059669',
  'SEN': '#D97706',
  'Wellbeing': '#B5651D',
  'Technology': '#2563EB',
};

export const statusStyles = {
  'In Progress': { dot: '#22C55E', label: 'In Progress' },
  'Pilot Phase': { dot: '#F59E0B', label: 'Pilot Phase' },
  'Planning': { dot: '#9CA3AF', label: 'Planning' },
  'Completed': { dot: '#3B82F6', label: 'Completed' },
};

const initiatives = [
  {
    slug: 'microcredit-eastern-province',
    title: 'Microcredit Revolving Fund',
    sector: 'Economic Development',
    sectorColor: '#2D6A4F',
    status: 'In Progress',
    region: 'Eastern Province, Sri Lanka',
    flag: '\u{1F1F1}\u{1F1F0}',
    partner: 'Vanni Hope',
    partnerLead: 'Seelan Anna \u2014 Head of Economic Development, Vanni Hope',
    summary: 'Revolving microcredit scheme providing fair loans and business training to war-affected communities, replacing exploitative lending with empowerment.',
    image: null,
    description: [
      "Fifteen years after Sri Lanka's civil war ended, communities in the Northern and Eastern provinces still face limited livelihood opportunities and exploitation by predatory microfinance institutions charging above 25% interest. Families \u2014 predominantly headed by women \u2014 become trapped in vicious cycles of debt, taking loans from multiple lenders just to survive, with some seeing no way out.",
      "The Aram Initiative has partnered with Vanni Hope, an Australian-based NGO with established experience in community development and microfinance, to implement a revolving microcredit scheme in Eastern Province. Our scheme offers loans at 10% interest, with repayments recycled back into the fund to grow it \u2014 creating a self-sustaining financial ecosystem that serves more people over time.",
      "This isn't just about lending money. It's about rebuilding the social fabric of war-affected communities through capacity building, financial literacy, and collective empowerment.",
    ],
    howItWorks: [
      {
        phase: 'Phase 1 \u2014 Assessment & Formation',
        content: 'Vanni Hope conducts a feasibility study with Rural Development Officers to understand local credit culture and community dynamics. Lending groups are established, organised into clusters of 5\u20136 groups. Each cluster has a society committee that reviews loan applications, disburses loans, and collects repayments. Vanni Hope provides quality control, with initial capital allocation matched to group capability.',
      },
      {
        phase: 'Phase 2 \u2014 Ongoing Support & Monitoring',
        content: 'Field officers visit twice monthly to deliver training, assess business progress, identify challenges (crop diseases, supply disruptions, market access), document repayments, and provide mentorship.',
      },
      {
        phase: 'Phase 3 \u2014 Training Programmes',
        content: 'The curriculum develops sustainable business practices through modules on business planning, bookkeeping, marketing, financial literacy, savings mobilisation, and cooperative management. The approach prioritises capacity building over simple loan recovery.',
      },
    ],
    aramRole: [
      'Monthly monitoring of accounts on repayment dates, ensuring accurate record-keeping and flagging potential issues',
      'Fortnightly direct check-ins with communities to collect data on progress and challenges',
      'Using collected data to design training programmes addressing emerging needs',
      'Supporting digitisation of records (Vanni Hope currently maintains manual records)',
      'Improving documentation, accounting systems, and media communication',
    ],
    progress: [
      'Longest-running scheme: 1.5 years in Kilinochchi and Trincomalee (funded by Empower Projects)',
      'Started with 15 beneficiaries, now serves 40',
      'Current fund size: approximately 1.8\u20131.9 million LKR',
      'Zero defaults across all beneficiaries',
      '12 schemes launched across Kilinochchi, Trincomalee, and Jaffna',
      'Empower Projects has funded a subsequent project based on success',
    ],
    futureVision: [
      'Cooperative evolution: scaling lending group solidarity into collective bargaining units',
      'Community asset models: shared infrastructure like tractors, irrigation, processing equipment',
      'Market power through unity: villages negotiating collectively with ethical buyers',
      'Financial identity: documenting repayment history for formal banking access',
      'Technology-enabled scaling: digital platforms for repayments and ledgers',
      "Generational impact: building infrastructure for the next generation's opportunities",
    ],
    loanInfo: 'Different loan types are offered: startup loans for new businesses, input loans for business supplies, and hire purchase loans with longer repayment schedules for larger investments. As the fund grows through repayments, more people can participate and existing beneficiaries can access larger loans to scale their microenterprises.',
    details: {
      Region: 'Eastern Province, Sri Lanka',
      Sector: 'Economic Development',
      'Local Partner': 'Vanni Hope',
      'Partner Lead': 'Seelan Anna',
      'Loan Interest Rate': '10%',
      'Beneficiary Profile': 'War-affected communities, predominantly women-headed families',
      'Proven Model': 'Zero defaults across existing Vanni Hope schemes',
    },
    cta: {
      primary: { label: 'Support This Initiative', href: '/join' },
      secondary: { label: 'Learn More About Aram', href: '/about' },
    },
  },
  {
    slug: 'pen-pal-project',
    title: 'Pen Pal Project',
    sector: 'Holistic Wellbeing',
    sectorColor: '#B5651D',
    status: 'Pilot Phase',
    region: 'Cross-border (UK \u2194 Sri Lanka)',
    flag: '\u{1F1F1}\u{1F1F0}',
    partner: null,
    summary: 'Connecting Tamil-speaking children in the UK with children in Sri Lankan orphanages through handwritten letters \u2014 building literacy, empathy, and lasting friendships.',
    image: null,
    description: [
      'The Pen Pal Project is an educational and cultural initiative that connects Tamil-speaking children in the UK with children living in orphanages in Sri Lanka through handwritten letters. Inspired by traditional pen pal exchanges used in foreign language learning, this project improves Tamil literacy among diaspora youth while nurturing empathy, friendship, and cross-border cultural connections.',
      "For diaspora children, Tamil can feel like a classroom obligation disconnected from their daily lives. For children in Sri Lankan orphanages, the world beyond their walls can feel impossibly distant. The Pen Pal Project bridges both gaps \u2014 giving UK children a meaningful reason to practise their Tamil, and giving Sri Lankan children a window into life abroad and the knowledge that someone is thinking of them.",
    ],
    objectives: [
      'Enhance Tamil Literacy: Provide Tamil school students in the UK with a unique, engaging way to practise reading and writing in Tamil',
      'Foster Cross-Cultural Connections: Bridge the gap between the Tamil diaspora and communities in Sri Lanka, helping children understand each other\u2019s lives and experiences',
      'Encourage Emotional and Social Development: Cultivate compassion, understanding, and long-term bonds through consistent and meaningful communication',
    ],
    howItWorks: [
      {
        phase: 'Step 1 \u2014 Initial Exchange',
        content: "During Aram's 3rd Annual Trip to Sri Lanka, girls from an orphanage were invited to write letters describing their interests, daily lives, and hopes. These letters were brought back to the UK and matched with students of similar age at a local Tamil school. Each UK student then wrote a response, initiating a pen pal relationship.",
      },
      {
        phase: 'Step 2 \u2014 Ongoing Correspondence',
        content: 'Letters are exchanged bi-monthly between students in the UK and their Sri Lankan pen pals. All letters are handwritten in Tamil to promote writing practice and reading comprehension.',
      },
      {
        phase: 'Step 3 \u2014 Letter Vetting',
        content: 'To ensure safety and appropriateness, Aram reviews all letters before they are sent. Each review cycle includes 20\u201330 letters, with a one-week timeframe for vetting by Tamil-literate volunteers.',
      },
    ],
    progress: [
      '1 Tamil School in the UK',
      '1 Orphanage in Sri Lanka',
      'First exchange of letters completed during the 2025 trip',
      'Vetting process being refined',
    ],
    futureVision: [
      'Expand to 5 additional Tamil Schools across the UK',
      "Include more children's homes and orphanages across Sri Lanka",
      'Create a scalable and sustainable system fostering thousands of meaningful connections',
      'Using the Tamil language as a bridge for empathy and understanding worldwide',
    ],
    volunteerNote: 'Seeking Tamil-literate volunteers to assist in the monthly letter vetting process. Volunteers read each letter to ensure appropriateness, provide basic feedback, and commit to reviewing a small batch each month.',
    details: {
      Region: 'Cross-border (UK \u2194 Sri Lanka)',
      Sector: 'Holistic Wellbeing',
      'Target Beneficiaries': 'Tamil-speaking children (UK diaspora + Sri Lankan orphanages)',
      'Exchange Frequency': 'Bi-monthly',
      'Current Scale': '1 school + 1 orphanage (pilot)',
      'Volunteers Needed': 'Tamil-literate letter reviewers',
    },
    cta: {
      primary: { label: 'Volunteer as a Letter Reviewer', href: '/join' },
      secondary: { label: 'Learn More About Aram', href: '/about' },
    },
  },
  {
    slug: 'virtual-mentorship',
    title: 'Virtual Mentorship',
    sector: 'Education',
    sectorColor: '#6D4A9E',
    status: 'In Progress',
    region: 'Multiple locations, Sri Lanka',
    flag: '\u{1F1F1}\u{1F1F0}',
    partner: null,
    summary: 'Diaspora professionals mentoring young people in Sri Lankan children\u2019s homes through regular virtual sessions \u2014 building skills, confidence, and pathways to opportunity.',
    image: null,
    description: [
      "When the Aram Initiative first started working in Sri Lanka, like many organisations, we believed fundraising and distributing resources was the highest form of impact. Year one was two-week trips, one-day visits, and donations. Year two was building infrastructure \u2014 laptops, wifi connections, microphones, projectors. But a conversation with a young girl at one of the homes changed everything. She'd received a tablet the previous year from another organisation. It was wonderful, she said, for the two months before it broke. No one could repair it. No one had thought about app access, updates, or maintenance.",
      "This story repeated itself in different forms across every location we visited. Educational toys gathering dust. High-tech donations sitting unused. We were creating temporary moments of joy, but not lasting change.",
      "Virtual Mentorship was born from the understanding that true change comes from consistent engagement, knowledge sharing, and community building \u2014 not from swooping in with solutions, but from walking alongside young people as they develop their own.",
    ],
    theNeed: [
      'Uneven distribution of quality education and teaching resources',
      'Limited role models, particularly in non-traditional career paths',
      'Students carrying the weight of historical trauma affecting their learning',
      'Foundational gaps in basic concepts hindering further progress',
      'Limited exposure to career options and life skills',
      'Many young people struggling to envision themselves in successful roles',
    ],
    howItWorks: [
      {
        phase: 'Format',
        content: 'A mix of one-to-one mentoring (for nuanced topics requiring personalised attention), group workshops (for broader knowledge sharing and public speaking development), and hybrid sessions combining both approaches.',
      },
      {
        phase: 'For Mentors',
        content: 'Onboarding and orientation, code of conduct review, area selection based on expertise, content development or shadowing existing mentors, minimum 4-week commitment, regular lesson recaps and safety protocols.',
      },
      {
        phase: 'Curriculum',
        content: 'Spans various aspects of quality of life, chosen based on direct requests from centres, observed needs during visits, and mentor expertise. Sessions use screen sharing, GenAI tools, and interactive activities. Tamil-speaking mentors or interpreters support centres where needed.',
      },
    ],
    evolution: [
      { year: '2022', label: 'Year 1', desc: 'Two-week trips, one-day visits, and donations' },
      { year: '2023', label: 'Year 2', desc: 'Building infrastructure \u2014 laptops, wifi, projectors' },
      { year: '2024', label: 'Year 3', desc: 'Virtual mentorship \u2014 sustained engagement over one-off visits' },
    ],
    impactMeasurement: {
      shortTerm: 'Lesson satisfaction ratings, engagement levels, immediate participant feedback',
      longTerm: 'Students choosing STEM or non-traditional pathways, career pathway awareness, confidence levels in pursuing opportunities',
    },
    benefits: {
      forMentees: ['Exposure to diverse career paths', 'Skill development', 'Confidence building', 'Access to role models'],
      forMentors: ['Community connection', 'Cultural reconnection', 'Direct impact creation', 'Personal growth'],
    },
    futureVision: [
      'Expanding the mentor network across the diaspora',
      'Developing specialised curricula for different age groups and centres',
      'Enhancing technology integration',
      'Building stronger assessment frameworks',
      "Scaling to more children's homes across Sri Lanka",
    ],
    details: {
      Region: 'Multiple locations, Sri Lanka',
      Sector: 'Education',
      "Target Beneficiaries": "Young people in children's homes and orphanages",
      'Mentor Commitment': 'Minimum 4 weeks',
      'Session Types': '1-to-1, group workshops, hybrid',
      'Key Requirement': 'Sustained engagement over one-off visits',
    },
    cta: {
      primary: { label: 'Become a Mentor', href: '/join' },
      secondary: { label: 'Learn More About Aram', href: '/about' },
    },
  },
];

export default initiatives;
