import React, { useState, useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

// Animated section wrapper
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const roles = [
  {
    id: 'media-director',
    title: 'Media Director',
    tier: 'Core Leadership',
    commitment: '3-5 hrs/week',
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    term: '2025-2026 cycle',
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
    questions: [
      { id: 'research-exp', label: "Share an example of research or analysis you've done" },
    ],
  },
  {
    id: 'head-of-socials',
    title: 'Head of Socials',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    term: '2025-2026 cycle',
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
    questions: [
      { id: 'social-exp', label: "Link to a social account you manage or content you've created" },
    ],
  },
  {
    id: 'events-lead',
    title: 'Events Lead',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    term: '2025-2026 cycle',
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
    a: "Apply anyway and tell us about your skills — we'll help find the right fit during our conversation.",
  },
  {
    q: 'What if my availability changes during the year?',
    a: "Life happens. Just communicate early so we can adjust. We'd rather adapt than have you burn out.",
  },
  {
    q: 'Is this paid?',
    a: "No — Aram is entirely volunteer-run. What you get is experience, community, and the chance to create real impact.",
  },
  {
    q: 'When does the role start?',
    a: "Immediately upon onboarding. We're building for 2026 and beyond.",
  },
];

const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
    <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
      <img src="/images/whitetamil-1.png" alt="Aram" className="h-[73px]" />
      <a
        href="https://aram.org.uk"
        className="text-sm text-gray-600 hover:text-purple-700 transition-colors"
      >
        ← aram.org.uk
      </a>
    </div>
  </header>
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
      className="bg-amber-50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
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
        {/* Video Placeholder */}
        <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center mb-8">
          <div className="text-center text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Video coming soon</p>
          </div>
        </div>

        {/* Letter Content */}
        <div className="space-y-6 text-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How We Work at Aram</h2>
            <p className="text-gray-500 italic">A note to anyone considering joining</p>
          </div>

          <p className="text-lg leading-relaxed">
            Hi there,
          </p>

          <p className="leading-relaxed">
            If you're reading this, you're thinking about joining Aram. Before you apply, we want to be honest about who we are and what we're looking for.
          </p>

          <div className="border-l-4 border-purple-300 pl-4 space-y-4">
            <div>
              <h3 className="font-bold text-purple-700">We believe in presence over funding.</h3>
              <p>Anyone can send money. We show up. Every year, 40 volunteers travel to Sri Lanka — not as saviours, but as partners.</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-700">We believe in sustainability over charity.</h3>
              <p>We don't do one-off handouts. Every initiative builds local capacity.</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-700">We believe in ownership over tasks.</h3>
              <p>We want people who see a problem and figure out how to solve it. If you join as a Lead, that domain is <em>yours</em>.</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-700">We're honest about what's hard.</h3>
              <p>We're volunteer-run. Things don't always get done. That's why we need people who drive work forward.</p>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-5 mt-6">
            <h3 className="font-bold text-gray-900 mb-3">What we're looking for:</h3>
            <ul className="space-y-2">
              {['People who finish what they start', 'People who can rally others', 'People who want to build, not just add to their CV'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-100/50 to-orange-100/50 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">What you'll get:</h3>
            <ul className="space-y-2">
              {['Real project management experience', 'A network of talented Tamil professionals', 'Tangible change from your work', 'A voice that shapes our direction'].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="leading-relaxed pt-4">
            If this sounds like you, we'd love to hear from you.
          </p>

          <p className="leading-relaxed">
            — The Aram Team
          </p>
        </div>
      </div>
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
  <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-purple-500' : 'hover:shadow-lg'}`}>
    <div className="p-5 cursor-pointer" onClick={onToggle}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-wrap gap-1">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role.tier === 'Core Leadership' ? 'bg-purple-100 text-purple-700' : role.tier === 'Sector Lead' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'}`}>{role.tier}</span>
          {role.priority && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">Priority</span>}
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{role.commitment}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{role.title}</h3>
      <p className="text-sm text-gray-600">{role.shortDesc}</p>
      <div className="mt-3 flex items-center text-purple-600 font-medium text-sm">
        {isExpanded ? 'Show less' : 'Learn more'}
        <svg className={`ml-1 w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
    <div
      ref={contentRef}
      style={{
        maxHeight: isExpanded ? '500px' : '0',
        opacity: isExpanded ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, opacity 0.3s ease',
      }}
    >
      {showContent && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Responsibilities</h4>
              <ul className="space-y-1">{role.responsibilities.map((r, i) => <li key={i} className="flex items-start text-xs text-gray-600"><span className="text-purple-500 mr-1">•</span>{r}</li>)}</ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Your Impact</h4>
              <p className="text-xs text-gray-600 mb-3">{role.impact}</p>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Skills</h4>
              <div className="flex flex-wrap gap-1">{role.skills.map((s, i) => <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{s}</span>)}</div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-3"><strong>Works with:</strong> {worksWithText}</p>
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); onViewDetails(role); }} className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm">View full details</button>
              <button onClick={(e) => { e.stopPropagation(); onApply(role); }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm">Apply</button>
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
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-transform duration-200 hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Which role(s) interest you? *</label>
            <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {roles.map(role => (
                <label key={role.id} className="flex items-center space-x-1 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input type="checkbox" checked={formData.roles.includes(role.id)} onChange={() => toggleRole(role.id)} className="rounded text-purple-600 focus:ring-purple-500" />
                  <span className={formData.roles.includes(role.id) ? 'font-medium text-purple-700' : 'text-gray-600'}>{role.title}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why does Aram interest you? *</label>
            <textarea rows={2} value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" placeholder="A few sentences about what draws you to Aram..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What relevant experience do you bring? *</label>
            <textarea rows={2} value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" placeholder="Professional experience, volunteer work, projects..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours/week *</label>
              <select value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
                <option value="">Select...</option>
                <option value="1-2">1-2 hours</option>
                <option value="2-4">2-4 hours</option>
                <option value="4-6">4-6 hours</option>
                <option value="6+">6+ hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attended Aram trip? *</label>
              <select value={formData.previousTrip} onChange={(e) => setFormData({...formData, previousTrip: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm">
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
                    <span className="text-purple-600 text-xs">[{q.roleTitle}]</span> {q.label}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.roleSpecific[`${q.roleId}-${q.id}`] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      roleSpecific: {...formData.roleSpecific, [`${q.roleId}-${q.id}`]: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              ))}
            </div>
          )}
          <button onClick={() => onSubmit(formData)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02]">Submit Application</button>
        </div>
      </div>
    </div>
  );
};

const JobDetailsPanel = ({ role, onClose, onApply }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    // Prevent body scroll when panel is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

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
    >
      {/* Panel */}
      <div
        className="job-details-panel absolute top-0 right-0 h-full bg-white shadow-2xl overflow-hidden flex flex-col w-full md:max-w-[65%]"
        style={{
          transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${role.tier === 'Core Leadership' ? 'bg-purple-100 text-purple-700' : role.tier === 'Sector Lead' ? 'bg-orange-100 text-orange-700' : 'bg-teal-100 text-teal-700'}`}>
                  {role.tier}
                </span>
                {role.priority && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">Priority</span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">{role.title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
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
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'application'
                  ? 'bg-white text-purple-700 shadow-sm'
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
                    <p className="text-gray-900 font-medium">{role.term || '2025-2026 cycle'}</p>
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
                          <span className="text-purple-400">•</span> {person}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <p className="text-gray-600 text-lg mb-6">{role.shortDesc}</p>

                {/* About the Role */}
                {role.aboutRole && role.aboutRole.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
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
                    <span className="w-1 h-5 bg-orange-500 rounded-full"></span>
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {role.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span className="w-1 h-5 bg-teal-500 rounded-full"></span>
                    Your Impact
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl p-4 border border-purple-100">
                    <p className="text-gray-700 leading-relaxed">{role.impact}</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-pink-500 rounded-full"></span>
                    Skills We're Looking For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
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
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Apply?</h3>
                <p className="text-gray-600 mb-6">
                  Click below to open our application form. It takes about 5 minutes to complete and we'll be in touch within a week.
                </p>
                <button
                  onClick={handleApplyClick}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  Start Application
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Questions? Email us at{' '}
                  <a href="mailto:hello@aram.org.uk" className="text-purple-600 hover:underline">
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

export default function App() {
  const [expandedRole, setExpandedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState(null);
  const [selectedRoleForPanel, setSelectedRoleForPanel] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCultureMemo, setShowCultureMemo] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

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

  const priorityRoles = roles.filter(r => r.priority);
  const otherRoles = roles.filter(r => !r.priority);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-xl">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Application Received!</h1>
          <p className="text-gray-600 mb-5">Thank you for your interest in joining Aram. We'll be in touch within a week.</p>
          <button onClick={() => setSubmitted(false)} className="text-purple-600 font-medium hover:text-purple-700 transition-colors">← Back to roles</button>
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
      <Header />

      {/* Hero */}
      <section className="relative min-h-[77vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img src="/images/Community.png" alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center top' }} />
          <div className="absolute inset-0 bg-purple-900/10" />
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
            className="text-lg text-purple-100 mb-6 max-w-xl mx-auto"
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
            <a href="#roles" className="bg-white text-purple-700 font-bold py-3 px-6 rounded-full hover:bg-purple-50 transition-all duration-200 hover:scale-[1.02]">See Open Roles</a>
            <a href="#culture" className="border-2 border-white/50 text-white font-bold py-3 px-6 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-[1.02]">How We Work</a>
          </div>
          <div
            className="mt-10 pb-8 grid grid-cols-3 gap-8 w-full max-w-lg mx-auto justify-items-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
            }}
          >
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">3</div><div className="text-purple-200 text-xs">Trips</div></div>
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">100+</div><div className="text-purple-200 text-xs">Volunteers</div></div>
            <div className="text-center flex-1"><div className="text-3xl font-bold text-white">£40k+</div><div className="text-purple-200 text-xs">Raised</div></div>
          </div>
        </div>
      </section>

      {/* Culture Memo Card */}
      <section id="culture" className="py-16 bg-purple-50">
        <AnimatedSection className="max-w-2xl mx-auto px-6">
          <button
            onClick={() => setShowCultureMemo(true)}
            className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 hover:shadow-xl hover:border-purple-200 hover:scale-[1.01] transition-all duration-200 text-left group"
            style={{ backgroundColor: '#ffffff' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📝</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">How We Work at Aram</h2>
                <p className="text-gray-500 text-sm">Click to read our note to applicants</p>
              </div>
              <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </AnimatedSection>
      </section>

      {/* Roles */}
      <section id="roles" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Open Roles</h2>
            <p className="text-lg text-gray-600">We're building a leadership team to scale our impact.</p>
          </AnimatedSection>
          <AnimatedSection className="mb-10" delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🔥</span>
              <h3 className="text-lg font-bold text-gray-900">Priority Hires</h3>
              <span className="text-sm text-gray-500">— Roles we need urgently</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {priorityRoles.map(role => (
                <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🌱</span>
              <h3 className="text-lg font-bold text-gray-900">Other Open Roles</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {otherRoles.map(role => (
                <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="mt-12 text-center" delay={0.3}>
            <div className="bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Not sure which role fits?</h3>
              <p className="text-gray-600 mb-4">Apply anyway — we'll find the right fit together.</p>
              <button onClick={() => { setSelectedRoleForForm(null); setShowForm(true); }} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 hover:scale-[1.02]">Start General Application</button>
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
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">{step.num}</div>
                    {i < 3 && <div className="w-0.5 h-16 bg-purple-200" />}
                  </div>
                  <div className="pt-1 pb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
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
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-3 flex justify-between items-center text-left hover:bg-gray-100 -mx-2 px-2 rounded transition-colors duration-200">
                    <span className="font-medium text-gray-900 text-sm">{faq.q}</span>
                    <svg className={`w-4 h-4 text-purple-500 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div
                    style={{
                      maxHeight: openFaq === i ? '200px' : '0',
                      opacity: openFaq === i ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <p className="pb-3 text-gray-600 text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16" style={{ backgroundColor: '#E4D7F5' }}>
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Ready to Make an Impact?</h2>
          <p className="text-purple-700 text-lg mb-6">Join 160+ volunteers building a thriving Sri Lanka.</p>
          <button onClick={() => { setSelectedRoleForForm(null); setShowForm(true); }} className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-200 hover:scale-[1.02]">Apply Now</button>
          <p className="text-purple-600 mt-4 text-sm">Questions? <a href="mailto:hello@aram.org.uk" className="underline hover:text-purple-900 transition-colors duration-200">hello@aram.org.uk</a></p>
        </AnimatedSection>
      </section>

      {showForm && <ApplicationForm selectedRole={selectedRoleForForm} onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
      {showCultureMemo && <CultureMemoModal onClose={() => setShowCultureMemo(false)} />}
      {selectedRoleForPanel && <JobDetailsPanel role={selectedRoleForPanel} onClose={() => setSelectedRoleForPanel(null)} onApply={handleApply} />}
    </div>
  );
}
