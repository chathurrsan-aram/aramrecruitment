// ─── Aram Ventures — McKinsey-Style Insight Pages ────────────────────────────
// Each page follows: Top Line, Observation, Key Metrics, Why Now, Investment
// Parameters, Named Players. Data sourced from /src/data/research/ markdown files.

export const insightPages = [
  // ─── MACRO OVERVIEW ──────────────────────────────────────────────────────────
  {
    id: 'macro-overview',
    slug: 'macro-overview',
    title: 'Macro Overview',
    sectors: ['cross-sector'],
    region: 'All Regions',
    readTime: 5,

    topLine:
      '$6.6B in diaspora remittances, $1.3B in multilateral capital, and 1 of 23 BOI enterprises diaspora-funded — the gap is the opportunity.',

    observation:
      "Sri Lanka's Tamil-majority Northern and Eastern Provinces are home to 5 million people but contribute just 9.2% of GDP — down from 9.9% in 2019. The IMF's $3B Extended Fund Facility has stabilised the macro picture: GDP grew 5.0% in 2024, inflation collapsed from 69.8% to near-zero, and reserves rebuilt to $6.5B. Diaspora remittances hit a record $6.58B in 2024, with North America corridors growing 200%, yet only 1 of 23 BOI-registered Northern Province enterprises is diaspora-funded. BOI offers $50K minimum thresholds (vs. $250K in Colombo), 200% capital allowances, and 0% agri-farming tax — the most generous incentive framework in the country. No dedicated Sri Lankan Tamil diaspora venture fund exists; this structural absence is the binding constraint and the single most actionable opportunity.",

    keyMetrics: [
      { label: 'N/E GDP share', value: '9.2%', context: 'Declining from 9.9% in 2019 — not keeping pace with national recovery' },
      { label: 'Diaspora remittances', value: '$6.58B', context: '2024 record; projected $7.4B in 2025' },
      { label: 'BOI diaspora enterprises (NP)', value: '1 of 23', context: 'Single diaspora-funded enterprise among 23 BOI-registered in North' },
      { label: 'Multilateral capital committed', value: '$1.3B+', context: 'Agriculture and N/E development, 2024-2028' },
      { label: 'NP per capita income', value: '$810', context: 'Roughly half the national average of $1,610' },
    ],

    whyNow: [
      { catalyst: 'Macro reset', detail: 'IMF programme on track ($1.74B disbursed, all targets met), sovereign debt 90-94% restructured, creating the first stable investment window since 2019.' },
      { catalyst: 'Capital inflow', detail: 'World Bank committed $1B in May 2025 including $200M earmarked for Northern and Eastern Province development; remittances from Tamil diaspora corridors grew 200% in 2023-2024.' },
      { catalyst: 'Structural gap', detail: 'No dedicated Tamil diaspora venture fund exists despite 700,000-1.2M diaspora across 91 countries — the January 2026 Northern Investment Summit (400+ delegates) called for one but none has been established.' },
    ],

    investmentParameters: {
      marketOpportunity: '$500M-$2B+',
      ticketSize: { angel: '\u00A350-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs) for priority sectors; medium-term (3-7 yrs) for infrastructure plays',
      riskLevel: 'Moderate to High',
      keyRisk: 'Sovereign debt repayments of $3-4B annually begin in 2028, potentially tightening fiscal space and BOI incentive frameworks.',
    },

    namedPlayers: [
      { name: 'BOV Capital', description: 'Rs. 2B (~$15M) fund backing Yarl Geek Challenge winners', relevance: 'Only VC with direct Jaffna startup pipeline' },
      { name: 'Yarl IT Hub', description: '60+ companies catalysed since 2010 across 4 Northern Province offices', relevance: 'Anchor institution of the Jaffna tech ecosystem' },
      { name: 'InvestJaffna.com', description: 'Equity crowdfunding platform with \u00A310/$10 minimum', relevance: 'First diaspora-targeted Northern Province investment platform' },
      { name: 'Hatch Kalam', description: 'Jaffna co-working space, affiliated with world\u2019s best co-working space (2021)', relevance: 'Physical startup infrastructure in the North' },
      { name: 'Lankan Angel Network', description: '75+ members, LKR 2B+ invested', relevance: 'Established angel investor community with Northern Province deal exposure' },
    ],
  },

  // ─── AGRITECH ────────────────────────────────────────────────────────────────
  {
    id: 'vi-agritech',
    slug: 'agritech',
    title: 'AgriTech',
    sectors: ['agritech'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      'Northern Province loses $200M in crops annually to a cold chain gap that zero investors have addressed.',

    observation:
      'Post-harvest losses reach 40% for fruits and vegetables across the North and East, destroying approximately 580,000 metric tons and $200M in value annually — with virtually zero cold storage infrastructure outside Colombo. Only 1% of fresh produce flows through supermarket channels. Palmyrah exports from Jaffna surged 322% YoY (Rs. 22M to Rs. 93M in Jan-Feb 2025), proving latent demand when supply chains function. The $89M World Bank ASMP has established technology parks across five Tamil-majority districts, and the GoviLab Accelerator (Gates Foundation-backed) ran its first cohort of 10 agritech startups in 2024. With 0% corporate tax on agri-farming and 200% capital allowances in the North, first movers face minimal competition: only ~40 AgriTech startups serve the entire country, just 4 funded.',

    keyMetrics: [
      { label: 'Post-harvest loss rate', value: '40%', context: 'Fruits and vegetables, Northern Province' },
      { label: 'Cold storage facilities', value: '0', context: 'Zero facilities outside Colombo in the North' },
      { label: 'BOI corporate tax', value: '0%', context: 'On agri-farming in Northern Province' },
      { label: 'Multilateral capital committed', value: '$1.3B+', context: 'Agriculture and N/E development, 2024-2028' },
      { label: 'Funded AgriTech startups', value: '4', context: 'Of ~40 total nationally (Tracxn, Jan 2026)' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'Post-crisis institutional consensus has permanently shifted from blanket input subsidies to precision agriculture and technology-enabled farming.' },
      { catalyst: 'Capital inflow', detail: 'World Bank $100M for agriculture tech adoption (380,000+ beneficiaries); ADB $200M for precision irrigation (Dec 2025); $89M ASMP across five Tamil-majority districts.' },
      { catalyst: 'Structural gap', detail: 'Only ~40 AgriTech startups serve 1.2M smallholder families nationally, against $1.3B+ in multilateral capital actively seeking private-sector co-investment partners.' },
    ],

    investmentParameters: {
      marketOpportunity: '$50M-$500M',
      ticketSize: { angel: '\u00A350-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs)',
      riskLevel: 'Moderate',
      keyRisk: '43% of Jaffna paddy land permanently abandoned due to groundwater salinity — remaining productive land must be optimised.',
    },

    namedPlayers: [
      { name: 'SenzMate / SenzAgro', description: 'Jaffna-origin IoT precision agriculture; 10,000+ farmers across 9 countries', relevance: 'Ranked among world\u2019s top 5 irrigation tech providers; founded to solve post-war Jaffna irrigation' },
      { name: 'GoviLab Accelerator', description: 'Gates Foundation-backed; first cohort of 10 agritech startups in 2024', relevance: 'Direct pipeline for diaspora co-investment in early-stage AgriTech' },
      { name: 'Elzian Agro', description: 'Only Sri Lankan company on the Global AgriTech Top 50, using AI/ML for climate adaptation', relevance: 'National benchmark for agritech capability' },
      { name: 'World Bank ASMP', description: '$89M Agriculture Sector Modernization across 5 Tamil-majority districts', relevance: 'Established technology parks creating infrastructure for private investment' },
      { name: 'KKS Port', description: '$45.27M Indian Exim Bank rehabilitation', relevance: 'Will reduce Northern export transit times to India\u2019s 1.4B consumers' },
    ],
  },

  // ─── HEALTHCARE ──────────────────────────────────────────────────────────────
  {
    id: 'vi-healthcare',
    slug: 'healthcare',
    title: 'Healthcare',
    sectors: ['healthtech'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      '58.8% mental health prevalence meets zero clinical psychologists \u2014 the largest unserved healthcare market in South Asia.',

    observation:
      'A clinical study (COMGAP-S) of 1,015 adults across all five Northern Province districts found 58.8% screen positive for mental health disorders \u2014 anxiety at 46.7%, depression at 41.1%, PTSD at 13.7% \u2014 yet there are zero clinical psychologists in Northern Sri Lanka. Only 147 specialists serve 1.1 million people versus 620 for Colombo\u2019s 2.5 million, and the province\u2019s sole private hospital has 80 beds. Since the 2022 crisis, 1,700+ medical officers have emigrated and Mullaitivu Hospital\u2019s surgical unit closed entirely. $275M in multilateral health financing (World Bank $150M PHSEP, ADB $106.9M, Pandemic Fund $18.4M) carries explicit digital health mandates covering all Northern and Eastern districts. BOI imposes zero minimum investment threshold for healthcare in the North.',

    keyMetrics: [
      { label: 'Mental health disorder prevalence', value: '58.8%', context: 'Primary care attendees, all 5 Northern districts (COMGAP-S)' },
      { label: 'Clinical psychologists (NP)', value: '0', context: 'Zero clinical psychologists in Northern Sri Lanka' },
      { label: 'Specialists per 1.1M people', value: '147', context: 'vs. 620 for Colombo\u2019s 2.5M \u2014 one-fifth the ratio' },
      { label: 'Multilateral health capital', value: '$275M', context: 'With explicit digital health mandates, 2024-2028' },
      { label: 'BOI healthcare minimum', value: '$0', context: 'Zero minimum investment threshold for Northern Province' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'Sri Lanka published its first telemedicine guidelines in 2024, creating a regulatory framework for remote care delivery for the first time.' },
      { catalyst: 'Capital inflow', detail: '$275M in new health financing approved 2024-2025: World Bank PHSEP ($150M) covering 100% of primary care institutions, ADB ($106.9M) for health system digitalisation, Pandemic Fund ($18.4M).' },
      { catalyst: 'Structural gap', detail: 'All 129 HealthTech startups in Sri Lanka are Colombo-centric; no Tamil-language digital mental health platform exists despite 58.8% prevalence in the population that speaks Tamil.' },
    ],

    investmentParameters: {
      marketOpportunity: '$25M-$150M',
      ticketSize: { angel: '\u00A310-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs)',
      riskLevel: 'Moderate',
      keyRisk: '80-90% of medical graduates emigrate permanently; any health venture must be designed for a workforce that will continue to drain.',
    },

    namedPlayers: [
      { name: 'Arogya Life Systems', description: 'Smart hospital management at 20+ hospitals including Jaffna\u2019s Venus Hospital', relevance: 'Jaffna-origin HealthTech from Yarl Geek Challenge; one of few with Northern presence' },
      { name: 'IMHO', description: 'Diaspora-founded; $15M+ invested in Northern Sri Lanka health projects', relevance: 'Built kidney transplant capacity at Jaffna Teaching Hospital \u2014 largest diaspora health investment' },
      { name: 'oDoc', description: '200,000+ users, market-leading teleconsultation platform', relevance: 'Proves telemedicine model works in Sri Lanka but does not target Tamil regions' },
      { name: 'SLMDA UK', description: 'Sri Lankan Medical and Dental Association UK, est. 1982', relevance: 'Natural bridge for diaspora clinician remote consultations and clinical governance' },
      { name: 'Asiri Laboratories', description: 'Only major diagnostic chain with any Northern presence (Jaffna, Batticaloa collection centres)', relevance: 'Demonstrates private diagnostic demand exists but coverage is minimal' },
    ],
  },

  // ─── EDTECH ──────────────────────────────────────────────────────────────────
  {
    id: 'vi-edtech',
    slug: 'edtech',
    title: 'EdTech',
    sectors: ['edtech'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      '92% smartphone penetration meets 11% computer ownership \u2014 a leapfrog gap with 120,000 students denied university annually.',

    observation:
      'Northern Province computer literacy sits at 18% versus 45.2% in the Western Province, yet mobile broadband subscriptions surged 235x in 16 years and 4G coverage reaches 100% of the population at $0.25/GB. A 2024 Vanni study found 92.3% smartphone penetration against just 12% computer ownership. Only 15% of 300,000 A-Level candidates gain university entry \u2014 leaving 120,000+ students per year seeking alternatives \u2014 while the IT sector faces a 12,140-graduate annual shortfall. Only 7% of estate-sector children pass O-Levels. The World Bank approved a $50M Digital Transformation Project (December 2025) with ICTA\u2019s cluster strategy explicitly designating Northern and Eastern tech hubs, and BOI offers 10-year tax holidays for education investments at a $50K Northern Province minimum.',

    keyMetrics: [
      { label: 'Smartphone penetration (Vanni)', value: '92.3%', context: 'vs. 12% computer ownership \u2014 classic leapfrog gap' },
      { label: 'Students denied university', value: '120,000+', context: '85% of A-Level qualifiers annually' },
      { label: 'IT graduate shortfall', value: '12,140', context: 'Annual gap; DIGIECON 2030 will widen it further' },
      { label: 'Estate O-Level pass rate', value: '7%', context: 'vs. 71% national average' },
      { label: 'BOI education tax holiday', value: '10 years', context: '$50K minimum investment in Northern Province' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'DIGIECON 2030 targets growing Sri Lanka\u2019s digital economy from $4.3B to $15B; ICTA\u2019s strategy designates five regional technology hubs including Northern and Eastern clusters.' },
      { catalyst: 'Capital inflow', detail: 'World Bank $50M Digital Transformation Project (December 2025) targeting 4M+ people with explicit N/E hub strategy; ADB $400M+ committed to secondary education reform.' },
      { catalyst: 'Structural gap', detail: 'Most EdTech platforms (eLearning.lk, eSiphala.lk) are predominantly Sinhala-medium; Tamil content development lags at higher grades despite 92% smartphone penetration in Tamil areas.' },
    ],

    investmentParameters: {
      marketOpportunity: '$15M-$100M',
      ticketSize: { angel: '\u00A310-250K', institutional: '\u00A3250K+' },
      timeline: 'Medium-term (3-7 yrs)',
      riskLevel: 'Moderate',
      keyRisk: 'Over 50% of state university graduates emigrate permanently \u2014 returns from education investment are partially captured by receiving countries.',
    },

    namedPlayers: [
      { name: 'Uki Technology School', description: '6-month intensive coding programme; 800+ graduates across 3 Northern Province campuses', relevance: 'Most successful vocational tech training in Tamil-majority Sri Lanka' },
      { name: 'DreamSpace Academy', description: 'USAID-supported innovation centre in Batticaloa offering STEAM and AI training', relevance: 'Only identified innovation-focused education organisation in the Eastern Province' },
      { name: 'e-Thaksalawa', description: 'Government platform; 700,000+ daily users; free Tamil, Sinhala, English content for Grades 1-13', relevance: 'Proves digital education demand but Tamil content lags at higher grades' },
      { name: 'University of Jaffna', description: '13 faculties, ~5,500-7,000 students', relevance: 'Primary higher education institution in Northern Province; natural partner for tech hubs' },
      { name: 'Northern Technical Institute', description: '9 regional centres across Jaffna; 90% employment/further education rate', relevance: 'Proven vocational model with strong outcomes' },
    ],
  },

  // ─── RENEWABLE ENERGY ────────────────────────────────────────────────────────
  {
    id: 'vi-renewable-energy',
    slug: 'renewable-energy',
    title: 'Renewable Energy',
    sectors: ['renewable-energy'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      'Sri Lanka hit 70% renewables five years early, but its best wind sits behind a grid that doesn\u2019t exist yet.',

    observation:
      'The Mannar wind corridor delivers world-class economics: 40%+ plant factor at under 5\u00A2/kWh with 8-9 m/s wind speeds, already operational at 103.5 MW. Pooneryn has cabinet approval for a 1,040 MW hybrid park in Kilinochchi district. Sri Lanka recorded 70% renewable generation in June 2025 \u2014 hitting its 2030 target five years early \u2014 yet Northern Province grid infrastructure requires complete upgrading. The government\u2019s 5.8 GW build-out plan requires an estimated $6B in investment, with Northern and Eastern provinces designated as primary zones. Community consent is now deal-critical: Adani\u2019s $442M project was withdrawn in February 2025 over tariff disputes, and HyWind\u2019s 50 MW was suspended in August 2025 after Tamil community protests over land rights.',

    keyMetrics: [
      { label: 'Mannar plant factor', value: '40%+', context: 'At under 5\u00A2/kWh \u2014 less than a third of fossil costs' },
      { label: 'New capacity needed by 2030', value: '5.8 GW', context: 'Estimated $6B total investment' },
      { label: 'Pooneryn hybrid park', value: '1,040 MW', context: 'Cabinet-approved wind-solar in Kilinochchi district' },
      { label: 'DFI mobilisation target', value: '$800M+', context: 'World Bank $150M programme with IFC/MIGA de-risking' },
      { label: 'Battery storage target', value: '650 MW', context: 'GREAT plan: 2,250 MWh by 2030' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'Cabinet-approved 70% renewable target by 2030 and carbon neutrality by 2050 designate Northern/Eastern provinces as primary renewable zones with 9 backbone transmission lines.' },
      { catalyst: 'Capital inflow', detail: 'World Bank $150M energy programme (June 2025) designed to mobilise $800M+ via IFC financing and MIGA political risk insurance; ADB $430M+ across wind, grid, and battery storage.' },
      { catalyst: 'Structural gap', detail: 'No diaspora-led energy initiative exists; Adani\u2019s withdrawal and HyWind\u2019s suspension create openings for community-aligned, diaspora-connected projects with genuine local relationships.' },
    ],

    investmentParameters: {
      marketOpportunity: '$100M-$1B+',
      ticketSize: { angel: '\u00A3250K+ (co-invest with DFIs)', institutional: '\u00A3500K+' },
      timeline: 'Medium-term (3-7 yrs)',
      riskLevel: 'High',
      keyRisk: 'Community consent is deal-critical \u2014 two major projects ($492M combined) stalled or cancelled in 2025 over land rights and tariff disputes.',
    },

    namedPlayers: [
      { name: 'WindForce PLC', description: '245 MW installed capacity; 10 MW solar in Batticaloa', relevance: 'Largest private renewable developer in Sri Lanka' },
      { name: 'Envision', description: 'Breaking ground on 50 MW wind in Mannar, March 2026', relevance: 'New international investment into Northern Province renewables' },
      { name: 'CEB / Thambapawani', description: '103.5 MW operational wind farm on Mannar Island', relevance: 'Proves commercial viability at world-class economics' },
      { name: 'ADB', description: '$430M+ across wind, grid strengthening, battery storage', relevance: 'Lead DFI in Sri Lanka renewables; conducting HVDC interconnection study to India' },
      { name: 'MIGA', description: 'Political risk insurance for private renewable participation', relevance: 'Critical tool for addressing diaspora trust deficit on large-scale projects' },
    ],
  },

  // ─── TOURISM ─────────────────────────────────────────────────────────────────
  {
    id: 'vi-tourism',
    slug: 'tourism',
    title: 'Tourism',
    sectors: ['tourism'],
    region: 'Eastern Province',
    readTime: 4,

    topLine:
      'Eastern Province tourism is growing at 3x the national rate while Northern Province has one branded hotel for 1.1 million people.',

    observation:
      'Eastern Province hospitality is the fastest-growing region in Sri Lanka at 13.21% CAGR to 2030 \u2014 roughly three times the national average \u2014 driven by Arugam Bay (global top-10 surf), Pasikudah\u2019s reef coastline, and Trincomalee\u2019s whale-watching harbour. Northern Province room supply remains negligible: Jetwing Jaffna (55 rooms, Rs. 1B investment, opened 2016) is essentially the only branded property. The Palaly Airport expansion for A320 connectivity will unlock direct flights to Tamil Nadu\u2019s 83 million people just 50km across the Palk Strait. India provided 416,974 arrivals in 2024 \u2014 the largest source market \u2014 and visa-free entry for 40 countries drove a 58% arrival spike. Tourism revenue hit $3.17B in 2024 with record 2.36M arrivals in 2025.',

    keyMetrics: [
      { label: 'Eastern Province CAGR', value: '13.21%', context: 'Fastest-growing tourism region in Sri Lanka to 2030' },
      { label: 'National tourism revenue', value: '$3.17B', context: '2024; record 2.36M arrivals in 2025' },
      { label: 'India arrivals', value: '416,974', context: 'Largest single source market, 2024' },
      { label: 'Visa-free arrival spike', value: '58%', context: 'From 40 target countries after visa-free policy' },
      { label: 'Northern Province branded hotels', value: '1', context: 'Jetwing Jaffna: 55 rooms, the only branded property' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'Jaffna designated top tourism destination in 2025; first Northern Province Tourism Bureau and Tourism Awards established; visa-free entry extended to 40 countries.' },
      { catalyst: 'Capital inflow', detail: 'ADB sustainable tourism programme targeting Trincomalee infrastructure; Palaly Airport runway expansion for A320 connectivity to India underway.' },
      { catalyst: 'Structural gap', detail: 'Northern Province has negligible room supply against 25,958 national registered rooms \u2014 even modest accommodation investment fills genuine gaps in a market with proven demand.' },
    ],

    investmentParameters: {
      marketOpportunity: '$50M-$300M',
      ticketSize: { angel: '\u00A310-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs)',
      riskLevel: 'Moderate',
      keyRisk: 'Continued military presence in the North deters private investment and constrains land use for hospitality development.',
    },

    namedPlayers: [
      { name: 'Jetwing Jaffna', description: '55 rooms, Rs. 1B investment, opened 2016', relevance: 'Flagship Northern property proving commercial viability \u2014 no follow-on investment in a decade' },
      { name: 'Pekoe Trail', description: '300km heritage hiking route through Hill Country plantation communities', relevance: 'National Geographic "Best of World 2024" and Time "Greatest Places 2025"' },
      { name: 'SriLankan Airlines', description: 'Actively promoting Ramayana Trail pilgrimage circuit', relevance: 'Key enabler for Northern tourism via Palaly Airport expansion' },
      { name: 'Arugam Bay', description: 'Global top-10 surf destination driving Eastern Province growth', relevance: 'Organic development with limited formal investment \u2014 significant upside with structured hospitality' },
      { name: 'Palaly Airport', description: 'Runway expansion for A320-family aircraft underway', relevance: 'Single most transformative infrastructure project for Northern Province tourism' },
    ],
  },

  // ─── FISHERIES & AQUACULTURE ─────────────────────────────────────────────────
  {
    id: 'vi-fisheries',
    slug: 'fisheries',
    title: 'Fisheries & Aquaculture',
    sectors: ['fisheries'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      'Northern Province held 40% of Sri Lanka\u2019s catch in 1983 but has zero of the country\u2019s 21 fishery harbours today.',

    observation:
      'Northern Province marine fish catch recovered to pre-war tonnage (75,470 tons in 2016) but its national share halved from 40% to 16.5% because the province has zero fishery harbours among Sri Lanka\u2019s 21 nationwide. Post-harvest losses in offshore fisheries reach 40-60%, with only 16% of yellowfin tuna meeting exportable quality. Aquaculture is surging: shrimp production grew 30x in two years (543 MT to ~16,000 MT) after L. vannamei introduction, and the government targets 100,000 MT by 2027. 75% of NAQDA-identified aquaculture land (8,500+ hectares) remains unutilised, with 100,000 additional hectares of shallow marine water from Mannar north suitable for farming. ADB\u2019s $62M project will build the first harbours at Point Pedro, Gurunagar, and Pesalai, plus Sri Lanka\u2019s first seaweed tissue culture lab in Jaffna.',

    keyMetrics: [
      { label: 'NP fishery harbours', value: '0 of 21', context: 'Zero harbours despite historically 40% of national catch' },
      { label: 'Shrimp production growth', value: '30x', context: '543 MT (2019) to ~16,000 MT after L. vannamei introduction' },
      { label: 'Unutilised aquaculture land', value: '75%', context: 'Of 8,500+ hectares identified by NAQDA' },
      { label: 'ADB fisheries investment', value: '$62M', context: 'First harbours, 7 anchorages, 21 landing sites, seaweed lab' },
      { label: 'Sea cucumber export surge', value: '$2.3M to $15.7M', context: '2016-2019; 7x growth driven by Chinese demand' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'Government approved L. vannamei species introduction and designated fisheries mega-zones in Ampara and Kilinochchi, targeting 100,000 MT shrimp production by 2027.' },
      { catalyst: 'Capital inflow', detail: 'ADB\u2019s $62M project creates the first Northern Province harbours (Point Pedro, Gurunagar, Pesalai), 7 anchorages, and 21 landing sites \u2014 the infrastructure precondition for private investment.' },
      { catalyst: 'Structural gap', detail: 'The national fisheries sector supports 2.7 million people (18% of population) but the North has zero harbour infrastructure \u2014 cold chain investment serves both fisheries and agriculture simultaneously.' },
    ],

    investmentParameters: {
      marketOpportunity: '$50M-$350M',
      ticketSize: { angel: '\u00A350-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs)',
      riskLevel: 'Moderate',
      keyRisk: 'Post-harvest losses of 40-60% in offshore fisheries will persist until harbour infrastructure from ADB\u2019s $62M project is operational.',
    },

    namedPlayers: [
      { name: 'Taprobane Seafood', description: 'Sri Lanka\u2019s largest seafood company; mini plants in Jaffna employing war-affected communities', relevance: 'Trajectory toward $200M revenue \u2014 proves commercial-scale Northern Province seafood operations work' },
      { name: 'NAQDA', description: 'Identified 8,500+ hectares suitable for aquaculture; 100,000 hectares of shallow marine water', relevance: 'Government surveys define the scale of untapped productive marine assets' },
      { name: 'ADB Fisheries Project', description: '$62M for harbours at Point Pedro, Gurunagar, Pesalai; seaweed tissue culture lab', relevance: 'Creates the infrastructure precondition that unlocks private investment in processing and cold chain' },
      { name: 'Seaweed cultivators (Mannar/Kilinochchi)', description: '$465-615/month per family from 25 rafts since 2012', relevance: 'Proven low-capital livelihood model suitable for community-level diaspora investment' },
    ],
  },

  // ─── HILL COUNTRY / PLANTATION MODERNISATION ─────────────────────────────────
  {
    id: 'vi-hill-country',
    slug: 'hill-country',
    title: 'Hill Country & Plantation',
    sectors: ['economic-dev'],
    region: 'Hill Country',
    readTime: 4,

    topLine:
      'The workforce behind $1.51B in tea exports earns $5.91/day and achieves 35% of potential yield \u2014 modernisation is overdue.',

    observation:
      'Multidimensional poverty in the estate sector runs at 51.3% \u2014 twelve times the urban rate \u2014 while the Tea Research Institute documents a 2.5-3x productivity gap (350-400 kg/acre actual vs. 1,000 kg/acre potential). Workers received the largest wage increase in 200 years in February 2026 \u2014 to $5.91/day. Smallholders now produce 75% of tea but Regional Plantation Companies hold 40.4% of land while delivering just 29% of output. The Pekoe Trail earned National Geographic "Best of World 2024" and Time "Greatest Places 2025," creating a tourism corridor through Tamil plantation communities. IFAD\u2019s $23.76M STaRR project targets smallholder revitalisation, and the global specialty tea market is projected at $10.75B by 2033.',

    keyMetrics: [
      { label: 'Productivity gap', value: '2.5-3x', context: '350-400 kg/acre actual vs. 1,000 kg/acre potential (Tea Research Institute)' },
      { label: 'Estate poverty rate', value: '51.3%', context: 'Multidimensional poverty \u2014 12x the urban rate of 4.4%' },
      { label: 'Daily wage', value: '$5.91', context: 'February 2026 \u2014 largest increase in 200-year history' },
      { label: 'Tea exports', value: '$1.51B', context: '2025; global specialty tea market projected $10.75B by 2033' },
      { label: 'Housing delivery rate', value: '912/year', context: '31,000 houses built 1980-2014; 175 more years at this pace' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'February 2026 wage agreement signals political momentum for the Malaiyaha Tamil community\u2019s 966,700 people; smallholder cooperatives are being strengthened through IFAD\u2019s $23.76M STaRR project.' },
      { catalyst: 'Capital inflow', detail: 'IFAD $23.76M for smallholder revitalisation; India committed to 50,000 estate houses (only ~2,300 delivered); Pekoe Trail generating international tourism revenue directly into Tamil communities.' },
      { catalyst: 'Structural gap', detail: 'Zero grassroots startup activity in Hill Country \u2014 innovation is exclusively corporate-led (Hayleys) or NGO-driven; Malaysia\u2019s 1.8-2M Tamil diaspora has no structured investment channel to ancestral plantation communities.' },
    ],

    investmentParameters: {
      marketOpportunity: '$30M-$200M',
      ticketSize: { angel: '\u00A310-250K', institutional: '\u00A3250K+' },
      timeline: 'Medium-term (3-7 yrs)',
      riskLevel: 'Moderate',
      keyRisk: 'Regional Plantation Companies control 40.4% of tea land with entrenched interests \u2014 modernisation requires working within or around existing corporate structures.',
    },

    namedPlayers: [
      { name: 'Tea Leaf Trust', description: '57,000+ youth educated from plantation communities; 80% employment rate', relevance: 'Most impactful social enterprise in Hill Country \u2014 proves education interventions deliver outcomes' },
      { name: 'Pekoe Trail', description: '300km heritage hiking route; NatGeo "Best of World 2024" and Time "Greatest Places 2025"', relevance: 'Ready-made marketing platform for tea tourism and D2C sales that would cost millions to create' },
      { name: 'IFAD STaRR', description: '$23.76M for smallholder tea and rubber revitalisation', relevance: 'Largest dedicated multilateral investment in plantation modernisation' },
      { name: 'Tea Research Institute', description: 'Documents 1,000 kg/acre potential yield', relevance: 'Scientific basis for the 2.5-3x productivity improvement thesis' },
      { name: 'Hayleys Plantations', description: 'Corporate-led innovation including digital weighing systems', relevance: 'One of the largest RPCs \u2014 demonstrates corporate modernisation pathway' },
    ],
  },

  // ─── MICROFINANCE / ETHICAL FINTECH ──────────────────────────────────────────
  {
    id: 'vi-microfinance',
    slug: 'microfinance',
    title: 'Ethical Fintech',
    sectors: ['fintech'],
    region: 'Northern Province',
    readTime: 4,

    topLine:
      '200+ women dead from 220% interest rates forced Sri Lanka\u2019s first microfinance regulation \u2014 ethical fintech now has a cleared field.',

    observation:
      'Post-war, ~50 finance companies and hundreds of unregulated lenders flooded Northern Province, charging 40-220% annual interest and driving over 200 women\u2019s suicides. The February 2026 Microfinance and Credit Regulatory Authority Bill \u2014 Sri Lanka\u2019s first-ever microfinance regulation \u2014 mandates licensing and interest rate caps, clearing predatory operators and creating space for compliant alternatives. Mobile penetration exceeds 150% while fixed broadband is absent from Northern villages, defining a mobile-first product thesis. LankaRemit (CBSL\u2019s remittance app) connects diaspora senders to any Sri Lankan bank, but the last-mile \u2014 financial literacy and productive lending \u2014 is missing. The Yuhashakti/Mahashakti network of 10,000+ women provides grassroots distribution infrastructure that technology can scale.',

    keyMetrics: [
      { label: 'Pre-regulation interest rates', value: '40-220%', context: 'Effective annual rates charged by unregulated lenders in Northern Province' },
      { label: 'Women\u2019s suicides from debt', value: '200+', context: 'Reported suicides driven by predatory microfinance debt traps' },
      { label: 'Households with post-war credit', value: '63-75%', context: 'Jaffna, Mullaitivu, and Trincomalee districts' },
      { label: 'Mobile penetration', value: '150%+', context: '29.3M subscriptions for 22M people; fixed broadband absent in North' },
      { label: 'ADB financial sector commitment', value: '$400M+', context: 'Three subprogrammes including women-led MSME access' },
    ],

    whyNow: [
      { catalyst: 'Policy shift', detail: 'The February 2026 Microfinance and Credit Regulatory Authority Bill is Sri Lanka\u2019s first-ever microfinance regulation \u2014 predatory lenders must comply or exit, creating a classic first-mover opportunity for ethical alternatives.' },
      { catalyst: 'Capital inflow', detail: 'ADB $400M+ for financial sector reform; Dialog\u2019s Northern Province digital inclusion partnership with Australia\u2019s government; World Bank $50M Digital Transformation Project building underlying digital infrastructure.' },
      { catalyst: 'Structural gap', detail: '88% bank account ownership masks severe credit distress \u2014 12% of household income goes to debt repayment; the last-mile layer connecting $6.58B in remittances to productive financial products does not exist.' },
    ],

    investmentParameters: {
      marketOpportunity: '$20M-$150M',
      ticketSize: { angel: '\u00A310-250K', institutional: '\u00A3250K+' },
      timeline: 'Near-term (1-3 yrs)',
      riskLevel: 'High',
      keyRisk: 'Deep community trauma from predatory lending means any new financial product faces an acute trust deficit \u2014 distribution must be built through existing community networks, not direct-to-consumer.',
    },

    namedPlayers: [
      { name: 'eZ Cash', description: '3M+ mobile money users; LKR 25.5B in transactions', relevance: 'Largest mobile money platform in Sri Lanka; proves mass mobile money adoption' },
      { name: 'FriMi', description: 'Sri Lanka\u2019s first full digital bank; available in Tamil', relevance: 'Proves Tamil-language digital banking is commercially viable' },
      { name: 'LankaRemit', description: 'CBSL\u2019s national remittance app linking global MTOs to all Sri Lankan banks', relevance: 'Diaspora-to-local financial rails exist \u2014 the last-mile distribution layer is missing' },
      { name: 'Yuhashakti/Mahashakti', description: '10,000+ women members across N/E Provinces providing community savings', relevance: 'Grassroots distribution infrastructure with existing trust relationships' },
      { name: 'Northern Co-operative Development Bank', description: 'Serves 1,200+ cooperative societies', relevance: 'Trust-based financial infrastructure that could be digitised and scaled' },
    ],
  },
];

// Sector colour map for new sectors not in ventureSectors
export const insightSectorMeta = {
  'cross-sector': { name: 'Cross-Sector', color: '#7A7A9A' },
  'fisheries': { name: 'Fisheries', color: '#3498DB' },
};

// Helper to get an insight page by slug
export function getInsightBySlug(slug) {
  return insightPages.find(p => p.slug === slug) ?? null;
}

// Helper to get an insight page by id
export function getInsightById(id) {
  return insightPages.find(p => p.id === id) ?? null;
}
