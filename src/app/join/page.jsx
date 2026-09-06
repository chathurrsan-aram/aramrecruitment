'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { heroVideos } from '@/lib/cloudinary';
import AnimatedSection from '@/components/AnimatedSection';

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
      "As Media Director, you'll be the voice and face of Aram to the outside world. You'll craft narratives that inspire young Tamils to join our mission and show the broader community the real Sri Lanka: not the headlines, but the people, the potential, and the progress.",
      "This is a strategic leadership role. You won't just be posting content. You'll be building a media function from the ground up, recruiting and mentoring a team, and developing campaigns that drive real action. You'll work closely with every part of the organisation to tell stories that matter.",
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
      "As Finance Director, you'll be the steward of Aram's resources. Every initiative we run, from healthcare camps to education programs, depends on sound financial management. You'll ensure we have the funds to operate, the systems to track spending, and the transparency to maintain trust with donors.",
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
      "As Trip Director, you'll lead the planning and execution of Aram's flagship annual trip to Sri Lanka. This is where everything comes together: 40+ volunteers travelling to deliver healthcare, education, and community development initiatives across multiple locations.",
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
      "You'll work with healthcare professionals in our volunteer base and build relationships with partners in Sri Lanka. You'll identify the most pressing health needs in our target communities and design interventions that create lasting impact, not just one-off treatments.",
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
      "You'll partner with organisations like SPARKS and local disability centres to deliver meaningful programs, from sensory equipment donations to parent support workshops. You'll also develop our volunteers' understanding of SEN so they can engage appropriately during trips.",
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
      "We're looking for someone who understands education, whether through teaching, tutoring, or other experience, and can design interventions that genuinely help rather than just look good on paper."
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
      "This role suits someone with tech industry knowledge who wants to use it for good. You don't need to be a developer. Understanding the landscape and what skills matter is more important than coding ability."
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
      "You'll work with initiatives like the Kullu cooperatives to support self-sufficiency projects, help local entrepreneurs access markets, and connect communities with economic opportunities. Your focus is on sustainable change: teaching people to fish, not giving them fish.",
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
      "This role suits someone with research and analysis skills who enjoys turning insights into actionable knowledge. Academic experience is valuable but not essential. What matters is rigorous thinking and clear communication."
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
      "As Head of Socials, you'll be the day-to-day voice of Aram online. While the Media Director sets strategy, you'll execute: creating content, engaging with our community, and keeping our social presence active and growing.",
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
      "You'll handle everything from venue selection to volunteer coordination, sponsorship outreach to on-the-day logistics. You'll build relationships with venues, vendors, and sponsors, and create events that people genuinely enjoy, not just tolerate because it's for a good cause.",
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

const faqs = [
  {
    q: 'Do I need to have been on an Aram trip to apply?',
    a: "No! While trip experience helps, we welcome anyone who's passionate about our mission and can commit the time.",
  },
  {
    q: "I'm interested but not sure which role fits me.",
    a: "Apply anyway and tell us about your skills. We'll help find the right fit during our conversation.",
  },
  {
    q: 'What if my availability changes during the year?',
    a: "Life happens. Just communicate early so we can adjust. We'd rather adapt than have you burn out.",
  },
  {
    q: 'Is this paid?',
    a: "No. Aram is entirely volunteer-run. What you get is experience, community, and the chance to create real impact.",
  },
  {
    q: 'When does the role start?',
    a: "Immediately upon onboarding. We're building for 2026 and beyond.",
  },
];

// Page header section above roles
const PageHeader = () => (
  <section className="bg-white py-16 border-b border-gray-100">
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero image */}
      <div className="mb-10 rounded-2xl overflow-hidden" style={{ aspectRatio: '3/1' }}>
        <img
          src="/images/Hope.jpg"
          alt="Aram volunteers working with communities in Sri Lanka"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join Our 2026 Team
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Volunteer with us to deliver meaningful change in Sri Lanka. Roles range from 2-5 hours per week.
        </p>
      </div>
    </div>
  </section>
);

const CultureMemoModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
    style={{
      backgroundColor: isVisible ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
      transition: 'background-color 0.2s ease',
    }}
    onClick={handleClose}
  >
    <div
      className="bg-amber-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 transition-transform duration-200 hover:scale-110"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-6 md:p-10">
        {/* Video */}
        <div className="rounded-xl overflow-hidden mb-8">
          <video
            className="w-full aspect-video bg-gray-900"
            controls
            preload="metadata"
            poster="/images/Hope.jpg"
          >
            <source src={heroVideos.home} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Letter Content */}
        <div className="space-y-6 text-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">A note for anyone considering joining</h2>
          </div>

          <p className="leading-relaxed">
            The crises scattered Tamils across the world. We grew up in the UK, Canada, Australia, Europe. We built careers, learned skills, and had opportunities that our brothers and sisters back home haven't had. But most of us stayed connected to a place we barely knew.
          </p>

          <p className="leading-relaxed">
            For our parents' generation, giving back meant sending money. And that matters. But we wanted more than that. We wanted to reconnect to our roots through the work itself, not just fund it from a distance.
          </p>

          <p className="leading-relaxed">
            Aram exists to unite the next generation of diaspora to give back. Not someday when we're older and established. Now, with what we have.
          </p>

          <p className="leading-relaxed">
            In our first year, we wanted to break a myth: that you need to be older, well-connected, know the areas inside out, and have money to create impact. We didn't have any of that. We just showed up.
          </p>

          <p className="leading-relaxed">
            Three years in, we've taken over 100 young diaspora back home. We've built trust on the ground by being there, not just talking. No one else is doing this, and it can't be replicated easily, because trust takes time.
          </p>

          <p className="leading-relaxed">
            Now we're building the foundations for something bigger. Long-term projects. Sustainable systems. Showing up consistently until the work speaks for itself.
          </p>

          <p className="leading-relaxed font-medium">
            To go further, we need a stronger team.
          </p>

          {/* Purple left-border accent block */}
          <div className="border-l-4 border-aram-purple pl-5 py-2 space-y-4 mt-8">
            <h3 className="font-bold text-gray-900 text-lg">What this actually looks like</h3>

            <p className="leading-relaxed">
              We're building a platform for the next generation of diaspora to give back, using the skills we've picked up across the world. We're not there yet, but we're making progress.
            </p>

            <p className="leading-relaxed">
              Everyone on the team has a full-time job or university alongside this. We're not asking you to drop everything, but we need people who can commit a few hours a week and follow through on what they take on.
            </p>

            <p className="leading-relaxed">
              If you join as a Lead, you'll own your area. We don't have the capacity to manage people closely, so we need people who can figure things out and drive their own work forward.
            </p>

            <p className="leading-relaxed">
              We're looking for people who want to be part of this for the long run. The work compounds over time, and so do the relationships.
            </p>

            <p className="leading-relaxed">
              What you do get is a team that's genuinely good at what they do, with real momentum. You'll learn a lot here.
            </p>
          </div>

          {/* What we're looking for card */}
          <div className="bg-white/60 rounded-xl p-5 mt-6">
            <h3 className="font-bold text-gray-900 mb-3">What we're looking for:</h3>
            <ul className="space-y-2">
              {[
                'People who lead by default, not by title',
                'People who commit consistently, not huge hours, but reliably showing up week after week',
                'People who are comfortable with ambiguity and building as they go',
                'People who feel the pull to do something for the communities back home that gave us everything'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-aram-purple mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What you'll get card */}
          <div className="bg-gradient-to-r from-aram-purple-100/50 to-priority-bg/50 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">What you'll get:</h3>
            <ul className="space-y-2">
              {[
                'Ownership of real work from day one',
                'A community of driven young Tamils building something together that doesn\'t exist anywhere else',
                'Impact you can see with your own eyes on the ground',
                'Skills and experience from people who are strong operators in their own careers'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-aram-purple mt-1 flex-shrink-0">→</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="leading-relaxed pt-4">
            If that's you, apply and find out what the future could look like if we built it together.
          </p>

          <p className="leading-relaxed font-medium">
            - The Aram Team
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

// Helper function to get tier badge styles
const getTierStyles = (tier) => {
  switch (tier) {
    case 'Core Leadership':
      return 'bg-leadership-bg text-leadership-text border border-leadership/30';
    case 'Sector Lead':
      return 'bg-sector-bg text-sector-text';
    case 'Team Lead':
      return 'bg-team-bg text-team-text';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Role Relationship Chart Component
const RoleRelationshipChart = ({ role }) => {
  const relationships = role.relationships;
  if (!relationships) return null;

  const hasReportsTo = relationships.reportsTo && relationships.reportsTo.length > 0;
  const hasManages = relationships.manages && relationships.manages.length > 0;

  // If no relationships at all, don't render
  if (!hasReportsTo && !hasManages) return null;

  const RolePill = ({ name, isCurrentRole = false }) => (
    <div
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
        isCurrentRole
          ? 'bg-aram-purple text-white'
          : 'bg-aram-purple-50 text-aram-purple border border-aram-purple/20'
      }`}
    >
      {name}
    </div>
  );

  const ConnectorLine = () => (
    <div className="w-px h-4 bg-gray-300" />
  );

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Where you sit</h4>

      <div className="flex flex-col items-center gap-1 max-w-[350px]">
        {/* Reports To tier */}
        {hasReportsTo && (
          <>
            <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Reports to</div>
            <div className="flex flex-wrap justify-center gap-2 mb-1">
              {relationships.reportsTo.map((name, i) => (
                <RolePill key={i} name={name} />
              ))}
            </div>
            <ConnectorLine />
          </>
        )}

        {/* Current Role */}
        <div className="my-1">
          <RolePill name={role.title} isCurrentRole={true} />
        </div>

        {/* Manages tier */}
        {hasManages && (
          <>
            <ConnectorLine />
            <div className="text-[10px] text-gray-400 uppercase tracking-wide mt-1 mb-1">Manages</div>
            <div className="flex flex-wrap justify-center gap-2">
              {relationships.manages.map((name, i) => (
                <RolePill key={i} name={name} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const RoleCard = ({ role, isExpanded, onToggle, onApply, onViewDetails }) => {
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      setShowContent(true);
    } else {
      const timer = setTimeout(() => setShowContent(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const worksWithText = Array.isArray(role.worksWith) ? role.worksWith.join(', ') : role.worksWith;

  return (
  <div className={`bg-card-bg rounded-xl shadow-md transition-all duration-300 border-2 ${isExpanded ? 'border-aram-purple shadow-lg' : 'border-card-border hover:shadow-lg hover:border-aram-purple/30'}`}>
    <div className="p-5 cursor-pointer" onClick={onToggle}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getTierStyles(role.tier)}`}>{role.tier}</span>
          {role.priority && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-priority-bg text-priority-text">Priority</span>}
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md font-medium">{role.commitment}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{role.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{role.shortDesc}</p>
      <button className="mt-4 flex items-center text-aram-purple font-semibold text-sm hover:text-aram-purple-dark transition-colors px-3 py-1.5 -ml-3 rounded-lg hover:bg-aram-purple-50">
        {isExpanded ? 'Show less' : 'Learn more'}
        <svg className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
    </div>
    <div
      ref={contentRef}
      className="overflow-hidden rounded-b-xl"
      style={{
        maxHeight: isExpanded ? '700px' : '0',
        opacity: isExpanded ? 1 : 0,
        transition: 'max-height 0.3s ease, opacity 0.3s ease',
      }}
    >
      {showContent && (
        <div className="px-5 pb-5 border-t border-gray-200 pt-4">
          {/* Key Responsibilities - limited to 4 */}
          <div className="mb-4">
            <h4 className="font-bold text-gray-900 mb-3 text-sm">Key Responsibilities</h4>
            <ul className="space-y-2">
              {role.responsibilities.slice(0, 4).map((r, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-aram-purple rounded-full mr-2.5 mt-2 flex-shrink-0"></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills - limited to 3 */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {role.skills.slice(0, 3).map((s, i) => (
                <span key={i} className="text-xs bg-aram-purple-50 text-aram-purple px-2.5 py-1 rounded-md font-medium">{s}</span>
              ))}
              {role.skills.length > 3 && (
                <span className="text-xs text-gray-400 px-1 py-1">+{role.skills.length - 3} more</span>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onApply(role); }}
                className="w-full bg-aram-purple hover:bg-aram-purple-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 text-sm"
              >
                Apply for this role
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onViewDetails(role); }}
                className="w-full border-2 border-aram-purple text-aram-purple hover:bg-aram-purple-50 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
              >
                View full details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  );
};

const ApplicationForm = ({ selectedRole, onClose, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roles: selectedRole ? [selectedRole.id] : [],
    about: '',
    experience: '',
    hours: '',
    previousTrip: '',
    roleSpecific: {},
  });

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const toggleRole = (roleId) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(r => r !== roleId)
        : [...prev.roles, roleId]
    }));
  };

  const selectedRoles = roles.filter(r => formData.roles.includes(r.id));
  const allRoleQuestions = selectedRoles.flatMap(r =>
    (r.questions || []).map(q => ({ ...q, roleTitle: r.title, roleId: r.id }))
  );

  const handleFormSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || formData.roles.length === 0 || !formData.about || !formData.experience || !formData.hours || !formData.previousTrip) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    // Prepare submission data with role titles instead of IDs
    const submissionData = {
      ...formData,
      roles: selectedRoles.map(r => r.title),
    };

    // If no Google Script URL is configured, fall back to the original behavior
    if (!GOOGLE_SCRIPT_URL) {
      console.log('Form submitted (no Google Sheets integration):', submissionData);
      onSubmit(formData);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(submissionData),
      });

      // With no-cors, we can't read the response, so we assume success
      // The Google Apps Script will handle the actual storage
      console.log('Form submitted to Google Sheets:', submissionData);
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit application. Please try again or email hello@aram.org.uk');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{
        backgroundColor: isVisible ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
        transition: 'background-color 0.2s ease',
      }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Apply to Join Aram</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-transform duration-200 hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm min-h-[44px]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm min-h-[44px]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Which role(s) interest you? *</label>
            <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {roles.map(role => (
                <label key={role.id} className="flex items-center space-x-2 text-xs cursor-pointer hover:bg-gray-50 p-1.5 rounded min-h-[32px]">
                  <input type="checkbox" checked={formData.roles.includes(role.id)} onChange={() => toggleRole(role.id)} className="rounded text-aram-purple focus:ring-aram-purple w-4 h-4" />
                  <span className={formData.roles.includes(role.id) ? 'font-medium text-aram-purple' : 'text-gray-600'}>{role.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why does Aram interest you? *</label>
            <textarea rows={2} value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm leading-relaxed" placeholder="A few sentences about what draws you to Aram..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What relevant experience do you bring? *</label>
            <textarea rows={2} value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm leading-relaxed" placeholder="Professional experience, volunteer work, projects..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours/week *</label>
              <select value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm min-h-[44px]">
                <option value="">Select...</option>
                <option value="1-2">1-2 hours</option>
                <option value="2-4">2-4 hours</option>
                <option value="4-6">4-6 hours</option>
                <option value="6+">6+ hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attended Aram trip? *</label>
              <select value={formData.previousTrip} onChange={(e) => setFormData({...formData, previousTrip: e.target.value})} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm min-h-[44px]">
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          {allRoleQuestions.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Role-Specific Questions</h3>
              {allRoleQuestions.map((q) => (
                <div key={`${q.roleId}-${q.id}`} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <span className="text-aram-purple text-xs font-semibold">[{q.roleTitle}]</span> {q.label}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.roleSpecific[`${q.roleId}-${q.id}`] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      roleSpecific: {...formData.roleSpecific, [`${q.roleId}-${q.id}`]: e.target.value}
                    })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aram-purple focus:border-transparent text-sm leading-relaxed"
                  />
                </div>
              ))}
            </div>
          )}
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {submitError}
            </div>
          )}
          <button
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            className="w-full bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-3.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const JobDetailsPanel = ({ role, onClose, onApply }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    // Prevent body scroll when panel is open
    document.body.style.overflow = 'hidden';

    // Focus the close button when panel opens for accessibility
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle Escape key to close panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus trap - keep focus within panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusableElements = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleApplyClick = () => {
    handleClose();
    setTimeout(() => onApply(role), 350);
  };

  const worksWithList = Array.isArray(role.worksWith) ? role.worksWith : [role.worksWith];

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundColor: isVisible ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
        transition: 'background-color 0.3s ease',
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className="job-details-panel absolute top-0 right-0 h-full bg-white shadow-2xl overflow-hidden flex flex-col w-full md:max-w-[65%]"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: '320px',
          maxWidth: '800px',
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getTierStyles(role.tier)}`}>
                  {role.tier}
                </span>
                {role.priority && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-priority-bg text-priority-text">Priority</span>
                )}
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{role.commitment}</span>
              </div>
              <h2 id="panel-title" className="text-xl md:text-2xl font-bold text-gray-900">{role.title}</h2>
            </div>
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close panel"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] ${
                activeTab === 'overview'
                  ? 'bg-white text-aram-purple shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 min-h-[44px] ${
                activeTab === 'application'
                  ? 'bg-white text-aram-purple shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Application
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' ? (
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <div className="md:w-64 flex-shrink-0 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Time Commitment
                    </div>
                    <p className="text-gray-900 font-medium">{role.commitment}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Role Type
                    </div>
                    <p className="text-gray-900 font-medium">{role.tier}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Term
                    </div>
                    <p className="text-gray-900 font-medium">{role.term || '2026-2027 cycle'}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-wide mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Works With
                    </div>
                    <div className="space-y-1">
                      {worksWithList.map((person, i) => (
                        <div key={i} className="text-sm text-gray-700 flex items-center gap-1">
                          <span className="text-aram-purple">•</span> {person}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Role Relationship Chart */}
                  <RoleRelationshipChart role={role} />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">{role.shortDesc}</p>

                {/* About the Role */}
                {role.aboutRole && role.aboutRole.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-5 bg-aram-purple rounded-full"></span>
                      About the Role
                    </h3>
                    <div className="space-y-4">
                      {role.aboutRole.map((paragraph, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Responsibilities */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-sector rounded-full"></span>
                    Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                        <svg className="w-5 h-5 text-aram-purple flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Your Impact */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-priority rounded-full"></span>
                    Your Impact
                  </h3>
                  <div className="bg-gradient-to-r from-aram-purple-50 to-priority-bg/50 rounded-xl p-4 border border-aram-purple-100">
                    <p className="text-gray-700 leading-relaxed font-medium">{role.impact}</p>
                  </div>
                </div>

                {/* What You'll Gain */}
                {role.whatYoullGain && role.whatYoullGain.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-5 bg-sector rounded-full"></span>
                      What You'll Gain
                    </h3>
                    <ul className="space-y-2">
                      {role.whatYoullGain.map((gain, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                          <svg className="w-5 h-5 text-sector flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {gain}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-leadership rounded-full"></span>
                    Skills We're Looking For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, i) => (
                      <span key={i} className="bg-aram-purple-100 text-aram-purple px-3 py-1.5 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 min-h-[52px]"
                  >
                    Apply for this role
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Application Tab */
            <div className="p-6">
              <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-16 h-16 bg-aram-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Apply?</h3>
                <p className="text-gray-600 mb-6">
                  Click below to open our application form. It takes about 5 minutes to complete and we'll be in touch within a week.
                </p>
                <button
                  onClick={handleApplyClick}
                  className="bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px]"
                >
                  Start Application
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Questions? Email us at{' '}
                  <a href="mailto:hello@aram.org.uk" className="text-aram-purple hover:text-aram-purple-dark hover:underline transition-colors">
                    hello@aram.org.uk
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function RecruitmentPage() {
  const [expandedRole, setExpandedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState(null);
  const [selectedRoleForPanel, setSelectedRoleForPanel] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCultureMemo, setShowCultureMemo] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ coreLeadership: true, sectorLeads: true, otherRoles: true });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  const handleApply = (role) => { setSelectedRoleForForm(role); setShowForm(true); };
  const handleViewDetails = (role) => { setSelectedRoleForPanel(role); };
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    setShowForm(false);
    setSubmitted(true);
  };

  // Group roles by type for organized display
  const priorityRoles = roles.filter(r => r.priority);
  const coreLeadershipRoles = priorityRoles.filter(r => r.tier === 'Core Leadership');
  const sectorLeadRoles = priorityRoles.filter(r => r.tier === 'Sector Lead');
  const otherRoles = roles.filter(r => !r.priority);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aram-purple-50 to-priority-bg/30 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-xl">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h1>
          <p className="text-gray-600 mb-5">Thank you for your interest in joining Aram. We'll be in touch within a week.</p>
          <button onClick={() => setSubmitted(false)} className="text-aram-purple font-medium hover:text-aram-purple-dark transition-colors">← Back to roles</button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        opacity: pageLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >

      {/* Hero */}
      <section className="relative min-h-[77vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img src="/images/Community.jpg" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          <div className="absolute inset-0 bg-[#6D4A9E]/10" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Shape Sri Lanka's Future
            <span className="block text-white">With Us</span>
          </h1>
          <p
            className="text-lg text-white/90 mb-6 max-w-xl mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Join our team of high-energy young Tamils building sustainable impact through presence, not just funding.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            <a href="#roles" className="bg-white text-aram-purple font-bold py-3 px-6 rounded-full hover:bg-aram-purple-50 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center">See Open Roles</a>
            <button onClick={() => setShowCultureMemo(true)} className="border-2 border-white/50 text-white font-bold py-3 px-6 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center">How We Work</button>
          </div>
          <div
            className="mt-10 pb-8 grid grid-cols-3 gap-8 w-full max-w-lg mx-auto justify-items-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
            }}
          >
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">3</div><div className="text-white/70 text-xs">Trips</div></div>
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">100+</div><div className="text-white/70 text-xs">Volunteers</div></div>
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">£40k+</div><div className="text-white/70 text-xs">Raised</div></div>
          </div>
        </div>
      </section>

      {/* Page Header */}
      <PageHeader />

      {/* Roles */}
      <section id="roles" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Open Roles</h2>
            <p className="text-lg text-gray-600 leading-relaxed">We're building a leadership team to scale our impact.</p>
          </AnimatedSection>

          {/* How We Work - Inline Callout Banner */}
          <AnimatedSection className="mb-10" delay={0.05}>
            <button
              onClick={() => setShowCultureMemo(true)}
              className="w-full bg-gradient-to-r from-aram-purple-50 to-gray-50 border-l-4 border-aram-purple rounded-xl px-6 py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:from-aram-purple-100 hover:to-aram-purple-50 transition-all duration-200 group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">New to Aram?</h3>
                  <p className="text-sm text-gray-600">Learn about our culture, values, and what we look for in volunteers</p>
                </div>
              </div>
              <span className="flex items-center text-sm font-semibold text-aram-purple group-hover:text-aram-purple-dark transition-colors whitespace-nowrap">
                Read our note
                <svg className="w-5 h-5 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </AnimatedSection>

          {/* Priority Roles Section */}
          <AnimatedSection className="mb-12" delay={0.1}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
              <span className="status-dot status-dot-urgent"><span className="circle"></span><span className="ringring"></span></span>
              <h3 className="text-xl font-bold text-gray-900">Priority Roles</h3>
              <span className="text-sm text-gray-500 font-medium">Actively recruiting for these roles</span>
            </div>

            {/* Sector Leads - Collapsible */}
            {sectorLeadRoles.length > 0 && (
              <div className="mb-8">
                <button
                  onClick={() => toggleSection('sectorLeads')}
                  className="w-full text-sm font-bold text-sector-text uppercase tracking-wide mb-4 flex items-center gap-2 hover:text-sector transition-colors group"
                >
                  <span className="w-3 h-0.5 bg-sector rounded-full"></span>
                  Sector Leads
                  <span className="text-xs font-normal normal-case text-gray-400">({sectorLeadRoles.length} roles)</span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${expandedSections.sectorLeads ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: expandedSections.sectorLeads ? '4000px' : '0',
                    opacity: expandedSections.sectorLeads ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {sectorLeadRoles.map(role => (
                      <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} onViewDetails={handleViewDetails} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Core Leadership - Collapsible */}
            {coreLeadershipRoles.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('coreLeadership')}
                  className="w-full text-sm font-bold text-leadership-text uppercase tracking-wide mb-4 flex items-center gap-2 hover:text-leadership transition-colors group"
                >
                  <span className="w-3 h-0.5 bg-leadership rounded-full"></span>
                  Core Leadership
                  <span className="text-xs font-normal normal-case text-gray-400">({coreLeadershipRoles.length} roles)</span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${expandedSections.coreLeadership ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: expandedSections.coreLeadership ? '2000px' : '0',
                    opacity: expandedSections.coreLeadership ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    {coreLeadershipRoles.map(role => (
                      <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} onViewDetails={handleViewDetails} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatedSection>

          {/* Other Open Roles - Collapsible */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
              <span className="status-dot status-dot-open"><span className="circle"></span><span className="ringring"></span></span>
              <h3 className="text-xl font-bold text-gray-900">Other Open Roles</h3>
            </div>
            {otherRoles.length > 0 && (
              <div>
                <button
                  onClick={() => toggleSection('otherRoles')}
                  className="w-full text-sm font-bold text-team-text uppercase tracking-wide mb-4 flex items-center gap-2 hover:text-team transition-colors group"
                >
                  <span className="w-3 h-0.5 bg-team rounded-full"></span>
                  Team Leads
                  <span className="text-xs font-normal normal-case text-gray-400">({otherRoles.length} roles)</span>
                  <svg
                    className={`w-4 h-4 ml-auto transition-transform duration-200 ${expandedSections.otherRoles ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  style={{
                    maxHeight: expandedSections.otherRoles ? '2000px' : '0',
                    opacity: expandedSections.otherRoles ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, opacity 0.3s ease',
                  }}
                >
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {otherRoles.map(role => (
                      <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} onViewDetails={handleViewDetails} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </AnimatedSection>

          {/* General Application CTA */}
          <AnimatedSection className="mt-12 text-center" delay={0.3}>
            <div className="bg-gradient-to-r from-aram-purple-100 to-priority-bg/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure which role fits?</h3>
              <p className="text-gray-600 mb-5 leading-relaxed">Apply anyway. We'll find the right fit together.</p>
              <button onClick={() => { setSelectedRoleForForm(null); setShowForm(true); }} className="bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[48px]">Start General Application</button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
          </AnimatedSection>
          <div className="space-y-0">
            {[
              { num: '1', title: 'Apply', desc: 'Fill out a short form (5 mins)' },
              { num: '2', title: 'Chat', desc: 'Casual 20-minute conversation' },
              { num: '3', title: 'Match', desc: "We'll confirm the right role" },
              { num: '4', title: 'Onboard', desc: 'Join your team and start contributing' },
            ].map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-aram-purple text-white rounded-full flex items-center justify-center text-lg font-bold min-w-[40px]">{step.num}</div>
                    {i < 3 && <div className="w-0.5 h-16 bg-aram-purple-100" />}
                  </div>
                  <div className="pt-1 pb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">FAQ</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-gray-50 rounded-2xl p-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 last:border-0">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-100 -mx-2 px-2 rounded transition-colors duration-200 min-h-[48px]">
                    <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                    <svg className={`w-5 h-5 text-aram-purple transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? '200px' : '0',
                      opacity: openFaq === i ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <p className="pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-aram-purple-100">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-aram-purple-dark mb-4">Ready to Make an Impact?</h2>
          <p className="text-aram-purple text-lg mb-6 leading-relaxed">Join 160+ volunteers building a thriving Sri Lanka.</p>
          <button onClick={() => { setSelectedRoleForForm(null); setShowForm(true); }} className="bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]">Apply Now</button>
          <p className="text-aram-purple/80 mt-4 text-sm">Questions? <a href="mailto:hello@aram.org.uk" className="underline hover:text-aram-purple-dark transition-colors duration-200">hello@aram.org.uk</a></p>
          <p className="mt-6"><a href="/aram-roles-2026-2027.pdf" download className="text-aram-purple/50 hover:text-aram-purple text-xs underline transition-colors duration-200">Download all roles as PDF</a></p>
        </AnimatedSection>
      </section>

      {showForm && <ApplicationForm selectedRole={selectedRoleForForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
      {showCultureMemo && <CultureMemoModal onClose={() => setShowCultureMemo(false)} />}
      {selectedRoleForPanel && <JobDetailsPanel role={selectedRoleForPanel} onClose={() => setSelectedRoleForPanel(null)} onApply={handleApply} />}
    </div>
  );
}

export default RecruitmentPage;
