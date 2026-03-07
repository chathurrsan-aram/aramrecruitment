// ─── Aram Ventures Mock Data ─────────────────────────────────────────────────
// All mock data in one file for easy editing later.

export const VENTURES_DEMO_MODE = true;

// ─── Venture Sectors (investor-facing) ───────────────────────────────────────
export const ventureSectors = [
  { id: 'agritech', name: 'AgriTech', color: '#2ECC71' },
  { id: 'healthtech', name: 'HealthTech', color: '#C85C5C' },
  { id: 'edtech', name: 'EdTech', color: '#5C8DC8' },
  { id: 'renewable-energy', name: 'Renewable Energy', color: '#1ABC9C' },
  { id: 'tourism', name: 'Tourism', color: '#C8A85C' },
  { id: 'economic-dev', name: 'Economic Dev', color: '#5CC86A' },
  { id: 'wellbeing', name: 'Wellbeing', color: '#8B5CC8' },
  { id: 'fintech', name: 'FinTech', color: '#C9A84C' },
];

// ─── Portfolio Companies ─────────────────────────────────────────────────────
export const portfolioCompanies = [
  {
    id: 'vanni-agriconnect',
    name: 'Vanni AgriConnect',
    sector: 'agritech',
    stage: 'pre-seed',
    region: 'Northern Province',
    districtCode: 'KL',
    seeking: 120000,
    equity: 18,
    raised: 15000,
    valuation: 650000,
    truePotential: true,
    tagline: 'Farm-to-market platform reconnecting post-war Vanni farmers with premium urban buyers',
    problem: 'Post-civil war agricultural recovery in Kilinochchi and Mullaitivu is stalling. Smallholder Tamil farmers — many resettled after displacement — lack market access and sell produce at 30–40% below Colombo market rates through exploitative middlemen. There is no digital infrastructure connecting them to the urban premium market or diaspora buyers.',
    thesis: 'A lightweight WhatsApp-native ordering platform that aggregates Vanni farm produce and connects directly to Colombo restaurants, supermarkets, and UK diaspora food brands. Asset-light, no cold chain required at launch. First-mover in a post-war region with significant donor and government tailwinds.',
    founder: {
      name: 'Suthan Rajaratnam',
      initials: 'SR',
      age: 31,
      background: 'Kilinochchi-born, agricultural economics degree from University of Peradeniya, 4 years at FAO Sri Lanka.',
      experience: 'FAO Sri Lanka',
      based: 'Sri Lanka',
    },
    whyNow: [
      'Post-war land resettlement completed in Northern Province (2023)',
      'Sri Lanka IMF recovery programme prioritising agricultural exports',
      'UK Tamil diaspora food market worth ~£40M annually with zero traceable Sri Lankan supply chains',
    ],
    growthPlan: [
      { phase: 'Phase 1', label: 'Prove the model', timeframe: '0–12 months', color: '#6D4A9E', milestones: ['200 farmers onboarded', '15 Colombo restaurant contracts', '£8k MRR'] },
      { phase: 'Phase 2', label: 'Scale regionally', timeframe: '12–36 months', color: '#1ABC9C', milestones: ['Expand to Mullaitivu and Mannar', 'Introduce diaspora direct-buy feature', '£45k MRR'] },
      { phase: 'Phase 3', label: 'Platform play', timeframe: '3yr+', color: '#C9A84C', milestones: ['Regional AgriTech platform across Northern and Eastern Province', 'Series A raise', 'Export partnerships'] },
    ],
    financials: {
      revenue: '£2,400/mo',
      burn: '£3,200/mo',
      runway: '8 months',
      model: '12% commission on GMV',
      keyMetric: '87 farmers live',
      tam: '£180M',
      sam: '£28M',
      som: '£4M',
    },
    documents: [
      { name: 'Pitch Deck', type: 'PDF', icon: 'file-text' },
      { name: 'Financial Model', type: 'XLSX', icon: 'table' },
      { name: 'Executive Summary', type: 'PDF', icon: 'file-text' },
    ],
  },
  {
    id: 'nalam-health',
    name: 'Nalam Health',
    sector: 'healthtech',
    stage: 'seed',
    region: 'Eastern Province',
    districtCode: 'BC',
    seeking: 250000,
    equity: 22,
    raised: 60000,
    valuation: 1100000,
    truePotential: false,
    tagline: 'Telemedicine platform closing the primary care gap in post-conflict Eastern Sri Lanka',
    problem: 'Batticaloa and Ampara districts have some of the worst doctor-to-patient ratios in South Asia — 1 doctor per 4,200 people in rural areas. Tamil patients face a compounding barrier: government doctors are predominantly Sinhala-speaking, creating communication failures in diagnosis and follow-up. Private care costs 1,500–2,000 LKR per visit, unaffordable for most.',
    thesis: 'A Tamil-language telemedicine app connecting Eastern Province patients with Tamil-speaking doctors (UK diaspora GPs and Sri Lanka private sector) for video consultations at 400 LKR per session. Partnerships with local pharmacies for prescription fulfilment. The language and affordability wedge is the moat — no competitor has built for Tamil-medium primary care.',
    founder: {
      name: 'Dr Anoja Krishnan',
      initials: 'AK',
      age: 34,
      background: 'Batticaloa-born, NHS-trained GP, currently practising in Leicester. Co-founded with local healthcare coordinator Priya Sivapalan.',
      experience: 'NHS GP',
      based: 'UK (monthly Sri Lanka visits)',
    },
    whyNow: [
      "Sri Lanka's 2022 economic crisis collapsed private healthcare access",
      'WHO and USAID actively funding telemedicine infrastructure in post-conflict regions',
      'NHS Tamil doctor network (400+ UK GPs) looking for diaspora impact vehicles',
    ],
    growthPlan: [
      { phase: 'Phase 1', label: 'Prove the model', timeframe: '0–12 months', color: '#6D4A9E', milestones: ['500 registered patients', '3 pharmacy partners', 'Tamil doctor network of 20'] },
      { phase: 'Phase 2', label: 'Expand North', timeframe: '12–36 months', color: '#1ABC9C', milestones: ['Northern Province expansion', 'Insurance partnership with AIA Sri Lanka', 'Mental health module'] },
      { phase: 'Phase 3', label: 'Platform scale', timeframe: '3yr+', color: '#C9A84C', milestones: ['50,000 patient platform', 'Series A', 'NHS diaspora GP scheme integration'] },
    ],
    financials: {
      revenue: '£5,200/mo',
      burn: '£8,100/mo',
      runway: '14 months',
      model: 'Per-consultation fee + pharmacy referral commission',
      keyMetric: '412 active patients',
      tam: '£320M',
      sam: '£45M',
      som: '£8M',
    },
    documents: [
      { name: 'Pitch Deck', type: 'PDF', icon: 'file-text' },
      { name: 'Financial Model', type: 'XLSX', icon: 'table' },
      { name: 'Executive Summary', type: 'PDF', icon: 'file-text' },
    ],
  },
  {
    id: 'malai-learn',
    name: 'Malai Learn',
    sector: 'edtech',
    stage: 'pre-seed',
    region: 'Hill Country',
    districtCode: 'NW',
    seeking: 80000,
    equity: 20,
    raised: 8000,
    valuation: 400000,
    truePotential: true,
    tagline: "Digital Tamil-medium learning for estate children locked out of Sri Lanka's education system",
    problem: "Up-country Tamil children on tea estates in Nuwara Eliya and Hatton face a triple disadvantage: Tamil-medium schools are under-resourced, teachers avoid remote estate postings, and digital connectivity — while improving — is largely unused for education. O/L pass rates in estate Tamil-medium schools are 34% vs 71% national average. There is no EdTech product built for this community in Tamil.",
    thesis: "An offline-first Tamil-medium learning app for O/L preparation, delivered via low-cost Android tablets pre-loaded with curriculum content. Distribution via estate welfare societies and tea company CSR budgets. Revenue from institutional licensing to estates and NGOs, not individual families. The offline-first architecture solves the connectivity problem no other EdTech player has addressed.",
    founder: {
      name: 'Kavitha Murugan',
      initials: 'KM',
      age: 28,
      background: 'Hatton-born, BA Education from Kelaniya, 3 years British Council Sri Lanka running digital literacy programmes.',
      experience: 'British Council',
      based: 'Colombo',
    },
    whyNow: [
      "Sri Lanka's new digital education policy mandates tablet access for all O/L students by 2026",
      'Three major UK-based tea companies actively seeking Tamil estate CSR programmes',
      'Post-crisis NGO funding flowing into Hill Country education',
    ],
    growthPlan: [
      { phase: 'Phase 1', label: 'Pilot estates', timeframe: '0–12 months', color: '#6D4A9E', milestones: ['5 estate schools', '800 students', '2 NGO licensing contracts'] },
      { phase: 'Phase 2', label: 'District expansion', timeframe: '12–36 months', color: '#1ABC9C', milestones: ['40 schools, Nuwara Eliya and Badulla districts', 'Ministry of Education partnership', 'Tamil content library 500+ modules'] },
      { phase: 'Phase 3', label: 'National platform', timeframe: '3yr+', color: '#C9A84C', milestones: ['National Tamil-medium EdTech platform', '100k students', 'International Tamil diaspora school licensing'] },
    ],
    financials: {
      revenue: '£1,100/mo',
      burn: '£2,400/mo',
      runway: '9 months',
      model: 'Institutional licensing (£800–2,500/school/year)',
      keyMetric: '340 active student users',
      tam: '£95M',
      sam: '£12M',
      som: '£2M',
    },
    documents: [
      { name: 'Pitch Deck', type: 'PDF', icon: 'file-text' },
      { name: 'Financial Model', type: 'XLSX', icon: 'table' },
      { name: 'Executive Summary', type: 'PDF', icon: 'file-text' },
    ],
  },
];

// ─── Emerging Ventures ───────────────────────────────────────────────────────
export const emergingVentures = [
  {
    id: 'eastern-fisheries',
    name: 'Eastern Fisheries Marketplace',
    sector: 'economic-dev',
    region: 'Eastern Province',
    districtCode: 'TC',
    estimateRange: '£150–300k',
    tagline: 'Fishermen cooperative digital platform for Trincomalee',
    problem: 'Trincomalee fishermen sell daily catches through informal networks, losing 40–50% of value to middlemen. No digital aggregation or cold-chain coordination exists for the eastern coast cooperative network.',
    whyNow: [
      'Trincomalee harbour expansion creating new export routes',
      'Government digital fisheries registry launching 2026',
      '12 cooperatives with 800+ fishermen ready for digital onboarding',
    ],
    opportunity: {
      tam: '£240M', sam: '£35M', som: '£5M',
      idealRaise: '£150–300k',
      sectorFit: ['economic-dev', 'agritech'],
      seeking: 'Co-founder / Lead investor',
    },
  },
  {
    id: 'uva-ecotourism',
    name: 'Uva Eco-Tourism',
    sector: 'tourism',
    region: 'Hill Country',
    districtCode: 'BD',
    estimateRange: '£200–500k',
    tagline: 'Diaspora-owned boutique eco lodges network in Ella/Badulla region',
    problem: 'The Ella-Badulla corridor attracts 400k+ tourists annually but accommodation is dominated by foreign-owned chains. Local Tamil and Sinhalese communities capture less than 15% of tourism revenue. No curated eco-lodge network exists for the Uva region.',
    whyNow: [
      'Sri Lanka tourism recovering to pre-crisis levels by 2026',
      'Growing global demand for authentic, community-owned eco-tourism',
      'Diaspora interest in heritage property investment at all-time high',
    ],
    opportunity: {
      tam: '£1.2B', sam: '£180M', som: '£12M',
      idealRaise: '£200–500k',
      sectorFit: ['tourism', 'economic-dev'],
      seeking: 'Lead investor / Strategic partner',
    },
  },
  {
    id: 'jaffna-solar',
    name: 'Jaffna Renewable Micro-Grid',
    sector: 'renewable-energy',
    region: 'Northern Province',
    districtCode: 'JA',
    estimateRange: '£400k–1M',
    tagline: 'Solar micro-grid for post-war villages in Northern Province',
    problem: 'Rural Northern Province villages face 4–8 hour daily power cuts. Grid infrastructure damaged during conflict remains unrepaired. Diesel generators cost families 15–20% of monthly income. Solar micro-grids could provide reliable power at 60% lower cost.',
    whyNow: [
      'Sri Lanka energy policy now prioritises renewable micro-grids',
      'World Bank concessional funding available for Northern Province energy projects',
      'Solar panel costs dropped 40% since 2022',
    ],
    opportunity: {
      tam: '£500M', sam: '£75M', som: '£15M',
      idealRaise: '£400k–1M',
      sectorFit: ['renewable-energy'],
      seeking: 'Lead investor / Strategic partner',
    },
  },
  {
    id: 'hill-country-microfinance',
    name: 'Hill Country Women\'s Microfinance',
    sector: 'fintech',
    region: 'Hill Country',
    districtCode: 'NW',
    estimateRange: '£80–150k',
    tagline: 'Digital revolving fund for estate Tamil women entrepreneurs',
    problem: 'Tea estate women in Hatton and Nuwara Eliya have no access to formal credit. Traditional moneylenders charge 60–120% annual interest. Women\'s self-help groups exist but lack digital infrastructure to scale their revolving fund model beyond individual estates.',
    whyNow: [
      'Aram\'s existing microfinance work provides proof-of-concept',
      'Central Bank of Sri Lanka launching digital microfinance licensing',
      'Three estate welfare societies requesting digital fund management tools',
    ],
    opportunity: {
      tam: '£150M', sam: '£22M', som: '£3M',
      idealRaise: '£80–150k',
      sectorFit: ['fintech', 'economic-dev'],
      seeking: 'Co-founder / Lead investor',
    },
  },
];

// ─── Venture Insights ────────────────────────────────────────────────────────
export const ventureInsights = [
  {
    id: 'vi-1',
    title: "Vanni's agricultural revival is stalling without market infrastructure",
    summary: 'Post-war land resettlement in Northern Province is complete, but smallholder farmers lack the digital and physical infrastructure to access premium urban markets. Without intervention, the agricultural recovery risks stalling at subsistence level.',
    sectors: ['agritech'],
    region: 'Northern Province',
    readTime: 3,
  },
  {
    id: 'vi-2',
    title: 'Tamil-medium primary care: a £320M gap with no digital solution',
    summary: 'Eastern Province has the worst doctor-to-patient ratios in South Asia, compounded by language barriers between Sinhala-speaking doctors and Tamil patients. No telemedicine platform exists for Tamil-medium primary care.',
    sectors: ['healthtech'],
    region: 'Eastern Province',
    readTime: 3,
  },
  {
    id: 'vi-3',
    title: 'Estate school O/L failure rates signal a structural EdTech gap',
    summary: 'Tamil-medium estate schools in Hill Country report 34% O/L pass rates vs 71% nationally. Digital education tools built for this context — offline-first, Tamil-medium, institution-licensed — do not exist.',
    sectors: ['edtech'],
    region: 'Hill Country',
    readTime: 3,
  },
  {
    id: 'vi-4',
    title: 'Trincomalee harbour expansion unlocks fisheries export potential',
    summary: 'The planned harbour expansion in Trincomalee creates a once-in-a-generation opportunity to digitise the eastern fisheries cooperative network and establish export-grade cold chain infrastructure.',
    sectors: ['economic-dev'],
    region: 'Eastern Province',
    readTime: 3,
  },
  {
    id: 'vi-5',
    title: 'Solar micro-grids: the fastest route to Northern Province energy security',
    summary: 'Rural Northern Province villages face daily power cuts of 4–8 hours. Concessional funding and falling panel costs make solar micro-grids the most viable path to reliable, affordable energy in post-conflict areas.',
    sectors: ['renewable-energy'],
    region: 'Northern Province',
    readTime: 3,
  },
  {
    id: 'vi-6',
    title: 'UK-Tamil remittance flows: from household support to structured investment',
    summary: 'The UK Sri Lankan diaspora sends over £6bn annually in remittances. Channelling even 1% of this into structured venture investment could unlock transformative capital for Tamil regions — but requires trust infrastructure the diaspora currently lacks.',
    sectors: ['economic-dev', 'fintech'],
    region: 'Cross-sector',
    readTime: 3,
  },
];

// ─── Investor Position Data (demo) ───────────────────────────────────────────
export const investorPositions = {
  'vanni-agriconnect': {
    invested: 25000,
    equityHeld: 3.8,
    shareClass: 'Ordinary',
    investmentDate: '2025-06-15',
    currentValuation: 650000,
    positionValue: 24700,
    returnMultiple: 0.99,
    status: 'Active',
  },
  'nalam-health': {
    invested: 40000,
    equityHeld: 3.6,
    shareClass: 'Ordinary',
    investmentDate: '2025-03-20',
    currentValuation: 1100000,
    positionValue: 39600,
    returnMultiple: 0.99,
    status: 'Active',
  },
  'malai-learn': {
    invested: 15000,
    equityHeld: 3.75,
    shareClass: 'Ordinary',
    investmentDate: '2025-09-01',
    currentValuation: 400000,
    positionValue: 15000,
    returnMultiple: 1.0,
    status: 'Active',
  },
};

// ─── Venture Regions (for filtering) ─────────────────────────────────────────
export const ventureRegions = [
  { id: 'all', name: 'All Regions' },
  { id: 'Northern Province', name: 'Northern Province' },
  { id: 'Eastern Province', name: 'Eastern Province' },
  { id: 'Hill Country', name: 'Hill Country' },
  { id: 'Western Province', name: 'Western Province' },
  { id: 'Southern Province', name: 'Southern Province' },
];

// ─── District to portfolio/emerging mapping ──────────────────────────────────
export function getVenturesByDistrict(districtCode) {
  const portfolio = portfolioCompanies.filter(c => c.districtCode === districtCode);
  const emerging = emergingVentures.filter(c => c.districtCode === districtCode);
  return { portfolio, emerging };
}
