/**
 * Aram Trip 2025 — Sri Lanka Itinerary (29 Jun – 13 Jul 2025)
 *
 * ~40 volunteers across two groups (A & B) travelling through Sri Lanka.
 * Route: south-central highlands → east coast → north-central → northwest/northeast → Jaffna → departure.
 *
 * Each day entry includes district codes matching the GeoJSON in /public/geo/gadm41_LKA_1.json
 * and lat/lng for location markers on the scrollytelling map.
 */

export const tripMeta = {
  year: 2025,
  startDate: '2025-06-29',
  endDate: '2025-07-13',
  totalDays: 15,
  volunteers: 40,
  districts: 7,
  tagline: 'Our most ambitious trip — two groups, seven districts, fifteen days.',
};

export const tripDays = [
  {
    day: 1,
    date: '2025-06-29',
    title: 'Arrival — Colombo to Kitulgala',
    locations: [
      { group: null, label: 'Colombo → Kitulgala', districts: ['CO', 'KE'], lat: 7.00, lng: 80.42 },
    ],
    summary: 'The full team arrives in Colombo via Gulf Air. After a brief welcome briefing, everyone boards coaches for the transfer south to Kitulgala in the Sabaragamuwa hills — the starting point for the journey ahead.',
    activities: [
      'Arrival at Bandaranaike International Airport',
      'Welcome briefing and team orientation',
      'Coach transfer to Kitulgala',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 2,
    date: '2025-06-30',
    title: 'Central Highlands — Workshops & Healthcare',
    locations: [
      { group: 'A', label: 'Maskeliya / Hatton', districts: ['NW'], lat: 6.83, lng: 80.52 },
      { group: 'B', label: 'Nuwara Eliya', districts: ['NW'], lat: 6.97, lng: 80.77 },
    ],
    summary: 'The team splits for the first time. Group A heads to the Maskeliya–Hatton estate region for Tree of Life workshops and the healthcare circuit. Group B begins the Apprentice challenge and TLT site visits around Nuwara Eliya.',
    activities: [
      'Tree of Life workshops (A)',
      'Healthcare circuit — dental, nutrition, eye screening (A)',
      'Apprentice challenge Day 1 (B)',
      'TLT site visits (B)',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 3,
    date: '2025-07-01',
    title: 'Central Highlands — Day Two',
    locations: [
      { group: 'A', label: 'Maskeliya / Hatton', districts: ['NW'], lat: 6.83, lng: 80.52 },
      { group: 'B', label: 'Nuwara Eliya', districts: ['NW'], lat: 6.97, lng: 80.77 },
    ],
    summary: 'Groups continue their work across the Central Highlands. The healthcare circuit wraps up in Maskeliya while the Apprentice challenge concludes in Nuwara Eliya. Teams prepare for the big move east.',
    activities: [
      'Healthcare circuit continues (A)',
      'Apprentice challenge Day 2 (B)',
      'Community engagement sessions',
      'Preparation for eastern transfer',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 4,
    date: '2025-07-02',
    title: 'Ohiya to Batticaloa — The Big Move East',
    locations: [
      { group: 'A', label: 'Ohiya → Batticaloa', districts: ['BD', 'BC'], lat: 6.82, lng: 80.84 },
      { group: 'B', label: 'Hatton', districts: ['NW'], lat: 6.89, lng: 80.60 },
    ],
    summary: 'The biggest geographic leap of the trip. A special group heads to Ohiya for a school visit and the scenic hike down to Kalupuhana, before making the cross-country transfer to Batticaloa on the east coast. Meanwhile, healthcare, CV workshop, and Grow tech teams continue in Hatton.',
    activities: [
      'Ohiya school visit (A — special)',
      'Hike to Kalupuhana (A — special)',
      'Healthcare camp (B)',
      'CV & Grow tech workshops (B)',
      'Cross-country transfer to Batticaloa',
    ],
    highlight: 'The Ohiya-to-Batticaloa transfer is the longest single journey of the trip, crossing from the misty highlands to the tropical east coast.',
    photos: [],
  },
  {
    day: 5,
    date: '2025-07-03',
    title: 'Batticaloa — Village Teams Fan Out',
    locations: [
      { group: null, label: 'Batticaloa district', districts: ['BC'], lat: 7.73, lng: 81.70 },
    ],
    summary: 'Five village visit teams deploy across Batticaloa district. Communities reached include Kathiraveli, Elakantha, Arasaititheevu, Thirukovil-Ampara, and Onthachchimadam/Vellavely. A packed day of direct community engagement.',
    activities: [
      'Village team — Kathiraveli',
      'Village team — Elakantha',
      'Village team — Arasaititheevu',
      'Village team — Thirukovil-Ampara',
      'Village team — Onthachchimadam / Vellavely',
      'Water projects',
      'School visits',
      'Women\'s empowerment sessions',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 6,
    date: '2025-07-04',
    title: 'Batticaloa — Healthcare & Community',
    locations: [
      { group: null, label: 'Batticaloa district', districts: ['BC'], lat: 7.73, lng: 81.70 },
    ],
    summary: 'The second day in Batticaloa. Teams continue village-level work with a focus on healthcare delivery — hospital training, eye camps, and first aid sessions alongside ongoing school and community visits.',
    activities: [
      'Hospital training workshop',
      'Eye camp',
      'First aid training sessions',
      'Continued school visits',
      'Community development work',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 7,
    date: '2025-07-05',
    title: 'Batticaloa to Trincomalee',
    locations: [
      { group: 'A', label: 'Eastern University', districts: ['BC'], lat: 7.72, lng: 81.69 },
      { group: 'B', label: 'HOPE / Saratha', districts: ['BC'], lat: 7.74, lng: 81.72 },
    ],
    summary: 'Group A attends the Eastern University conference. Group B runs the HOPE play circuit and parents workshop, with a minibus team heading to Saratha for study skills and robotics sessions. The day ends with the transfer north to Trincomalee.',
    activities: [
      'Eastern University conference (A)',
      'HOPE play circuit & parents workshop (B)',
      'Saratha study skills & robotics (B — minibus)',
      'Transfer to Trincomalee',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 8,
    date: '2025-07-06',
    title: 'Trincomalee to Vavuniya',
    locations: [
      { group: 'A', label: 'Trincomalee', districts: ['TC'], lat: 8.57, lng: 81.23 },
      { group: 'B', label: 'Trincomalee → Vavuniya', districts: ['TC', 'VA'], lat: 8.58, lng: 81.22 },
    ],
    summary: 'Morning sessions split between locations. Group A delivers Saratha wellbeing and menstrual hygiene workshops, plus Anbu Illam careers. Group B attends the Northern Conference, runs ORHAN parents workshop, then everyone transfers to Vavuniya.',
    activities: [
      'Saratha wellbeing & menstrual hygiene workshops (A)',
      'Anbu Illam careers session (A)',
      'Northern Conference (B)',
      'ORHAN parents workshop (B)',
      'Transfer to Vavuniya',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 9,
    date: '2025-07-07',
    title: 'Mannar & Mullaitivu — Widest Split',
    locations: [
      { group: 'A', label: 'Mannar', districts: ['MB'], lat: 8.98, lng: 79.90 },
      { group: 'B', label: 'Mullaitivu', districts: ['MP'], lat: 9.27, lng: 80.57 },
    ],
    summary: 'The widest geographic split of the trip. Group A heads northwest to Mannar for MWA business diagnostic day one and Sivan Arul careers sessions. Group B goes northeast to Mullaitivu for the Dreamspace career circuit and TEN tablet setup.',
    activities: [
      'MWA business diagnostic Day 1 (A)',
      'Sivan Arul careers session (A)',
      'Dreamspace career circuit (B)',
      'TEN tablet setup (B2)',
    ],
    highlight: 'Groups A and B are at their furthest apart — Mannar on the northwest coast versus Mullaitivu in the northeast, separated by over 200km.',
    photos: [],
  },
  {
    day: 10,
    date: '2025-07-08',
    title: 'Mannar & Kilinochchi — Consulting & Workshops',
    locations: [
      { group: 'A', label: 'Mannar', districts: ['MB'], lat: 8.98, lng: 79.90 },
      { group: 'B', label: 'Kilinochchi', districts: ['KL'], lat: 9.38, lng: 80.40 },
    ],
    summary: 'Group A continues business consulting work in Mannar (day two of MWA) and meets the Government Agent. Group B splits between Serendip parents workshop and Pannankandy sports/robotics. The day concludes with a Fine Arts performance.',
    activities: [
      'MWA business consulting Day 2 (A)',
      'Government Agent meeting (A)',
      'Serendip parents workshop (B1)',
      'Pannankandy sports & robotics (B2)',
      'Fine Arts performance',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 11,
    date: '2025-07-09',
    title: 'Reecha & New Life — Jaffna Arrival',
    locations: [
      { group: null, label: 'Jaffna district', districts: ['JA'], lat: 9.66, lng: 80.02 },
    ],
    summary: 'Both groups reconverge as the team enters the Jaffna peninsula. A visit to New Life care home in the morning, followed by a free afternoon for rest and reflection after an intense week of deployments.',
    activities: [
      'New Life care home visit',
      'Free afternoon — rest and reflection',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 12,
    date: '2025-07-10',
    title: 'Jaffna — Dragons Den & University',
    locations: [
      { group: 'A', label: 'Varany', districts: ['JA'], lat: 9.64, lng: 80.05 },
      { group: 'B', label: 'Jaffna University', districts: ['JA'], lat: 9.68, lng: 80.01 },
    ],
    summary: 'Group A runs Dragons Den and financial literacy sessions at Varany, alongside dental and IT workshops. Group B hosts a marketing exhibition at Jaffna University, capped off with the Ellai game.',
    activities: [
      'Dragons Den & financial literacy (A)',
      'Dental workshops (A)',
      'IT workshops (A)',
      'Marketing exhibition — Jaffna University (B)',
      'Ellai game',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 13,
    date: '2025-07-11',
    title: 'Jaffna & Nainativu — Free Day',
    locations: [
      { group: null, label: 'Jaffna / Nainativu', districts: ['JA'], lat: 9.62, lng: 79.97 },
    ],
    summary: 'A well-earned free day. Some of the team heads to Nainativu island by boat, others explore Jaffna city. An impromptu cricket match rounds off the afternoon before some groups begin the transfer south.',
    activities: [
      'Free day',
      'Nainativu island visit (optional)',
      'Cricket match',
      'Some group transfers begin',
    ],
    highlight: null,
    photos: [],
  },
  {
    day: 14,
    date: '2025-07-12',
    title: 'Jaffna — Farewell & Departure',
    locations: [
      { group: null, label: 'Jaffna → Coach south', districts: ['JA'], lat: 9.66, lng: 80.02 },
    ],
    summary: 'The final full day on the ground. An optional workshop at Jaffna University in the morning, then the Palmyrah beach party farewell celebration. The team boards overnight coaches for the long journey south to Colombo.',
    activities: [
      'Optional Jaffna University workshop',
      'Palmyrah beach party',
      'Overnight coach ride south',
    ],
    highlight: 'The Palmyrah beach party — a tradition that marks the end of the on-ground mission before the long drive home.',
    photos: [],
  },
  {
    day: 15,
    date: '2025-07-13',
    title: 'Departure — Colombo',
    locations: [
      { group: null, label: 'Colombo (CMB)', districts: ['CO'], lat: 7.17, lng: 79.88 },
    ],
    summary: 'Airport transfers and departures. The team says goodbye after fifteen days that spanned seven districts, countless communities, and hundreds of direct connections. Qatar Airways and Gulf Air flights carry the volunteers home.',
    activities: [
      'Airport transfer to Bandaranaike (CMB)',
      'Qatar Airways / Gulf Air departures',
    ],
    highlight: null,
    photos: [],
  },
];
