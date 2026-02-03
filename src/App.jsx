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
    priority: true,
    shortDesc: "Tell Aram's story to build trust, recruit volunteers, and change perceptions of Sri Lanka.",
    responsibilities: [
      'Own all external communications, social media, and brand strategy',
      'Create and coordinate content across Instagram, TikTok, and our website',
      'Assemble and lead a media team capable of diverse outputs',
      'Develop campaigns that attract the right volunteers',
    ],
    impact: 'Your work directly shapes how the world sees Sri Lanka and brings in the people who make our initiatives possible.',
    skills: ['Content creation (reels, posts, video)', 'Team leadership', 'Brand strategy', 'Storytelling'],
    worksWith: 'Executive Lead, all Sector Leads',
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
    priority: true,
    shortDesc: 'Keep Aram financially sustainable and transparent through proper budgeting, fundraising, and reporting.',
    responsibilities: [
      'Manage budgets and track spending across all initiatives',
      'Create transparent financial reporting for stakeholders',
      'Develop and implement better financial processes',
      'Support fundraising strategy and donor communications',
    ],
    impact: 'You enable every initiative by ensuring we have the resources and accountability to deliver.',
    skills: ['Budgeting & accounting', 'Spreadsheets & financial tools', 'Process design', 'Clear communication'],
    worksWith: 'Executive Lead, Sector Leads, Trip Director',
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
    priority: true,
    shortDesc: 'Deliver a safe, impactful annual trip and develop systems so future organisers can run it.',
    responsibilities: [
      'Plan and execute the 2027 Aram trip end-to-end',
      'Coordinate with Sri Lanka partners on logistics and itinerary',
      'Manage trip volunteers and ensure clear roles',
      'Document and systematise processes for future trips',
    ],
    impact: 'You create the experience that transforms volunteers and delivers real value to communities.',
    skills: ['Event/trip planning', 'Logistics coordination', 'Team management', 'Problem-solving under pressure'],
    worksWith: 'Executive Lead, Sector Leads, Sri Lanka team',
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
    priority: true,
    shortDesc: 'Own healthcare initiatives end-to-end, from health camps to nutrition programs to mental health awareness.',
    responsibilities: [
      'Set vision and targets for healthcare impact in 2026',
      'Drive at least one major initiative throughout the year',
      'Coordinate trip healthcare activities with volunteers',
      'Build relationships with healthcare partners and experts',
    ],
    impact: 'You directly improve health outcomes for communities across Sri Lanka.',
    skills: ['Healthcare knowledge (professional or personal)', 'Project management', 'Partner coordination'],
    worksWith: 'Chief Initiative Lead, Trip Director, Healthcare volunteers',
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
    priority: true,
    shortDesc: 'Own special educational needs initiatives, supporting children with disabilities and their families.',
    responsibilities: [
      'Set vision and targets for SEN impact in 2026',
      'Drive initiatives supporting children with disabilities',
      'Coordinate with partners like SPARKS and local centres',
      'Develop parent wellbeing and training programs',
    ],
    impact: 'You help ensure children with disabilities and their families get the support they deserve.',
    skills: ['SEN knowledge or passion', 'Empathy and sensitivity', 'Project management'],
    worksWith: 'Chief Initiative Lead, Trip Director, SEN volunteers',
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
    priority: true,
    shortDesc: 'Own education initiatives from career guidance to curriculum support to teacher training.',
    responsibilities: [
      'Set vision and targets for education impact in 2026',
      'Drive initiatives like career workshops, mentoring, curriculum improvements',
      'Coordinate with schools like Varany Central College and Tea Leaf Trust',
      'Build connections with educators and experts',
    ],
    impact: 'You open doors for young people who otherwise might not see a path forward.',
    skills: ['Education sector knowledge', 'Workshop design', 'Mentoring experience'],
    worksWith: 'Chief Initiative Lead, Trip Director, Education volunteers',
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
    priority: true,
    shortDesc: 'Own technology initiatives from digital skills training to IT infrastructure to innovation partnerships.',
    responsibilities: [
      'Set vision and targets for technology impact in 2026',
      'Drive digital literacy and skills programs',
      'Coordinate with partners like Dreamspace',
      'Identify technology solutions for community challenges',
    ],
    impact: 'You connect communities to the digital world and the opportunities it creates.',
    skills: ['Tech industry knowledge', 'Digital skills training', 'Innovation mindset'],
    worksWith: 'Chief Initiative Lead, Trip Director, Tech volunteers',
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
    priority: true,
    shortDesc: 'Own holistic wellbeing initiatives covering mental health, life skills, soft skills, and safeguarding.',
    responsibilities: [
      'Set vision and targets for wellbeing impact in 2026',
      'Drive mental health awareness and support programs',
      'Develop life skills and soft skills workshops',
      'Ensure safeguarding across all Aram activities',
    ],
    impact: 'You help people build the inner resources they need to thrive.',
    skills: ['Mental health awareness', 'Workshop facilitation', 'Safeguarding knowledge'],
    worksWith: 'Chief Initiative Lead, Trip Director, Wellbeing volunteers',
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
    priority: true,
    shortDesc: 'Own economic initiatives from livelihoods to entrepreneurship to cooperative development.',
    responsibilities: [
      'Set vision and targets for economic impact in 2026',
      'Drive livelihood and entrepreneurship programs',
      'Support Kullu cooperatives and self-sufficiency projects',
      'Connect communities with economic opportunities',
    ],
    impact: 'You help families build sustainable incomes and break cycles of poverty.',
    skills: ['Business/economics knowledge', 'Entrepreneurship experience', 'Community development'],
    worksWith: 'Chief Initiative Lead, Trip Director, Econ Dev volunteers',
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
    priority: false,
    shortDesc: 'Drive research that informs our initiatives and shares our learnings with the world.',
    responsibilities: [
      'Manage research pieces from trip insights',
      'Coordinate with experts and academics',
      'Create summary reports and publications',
      'Support evidence-based decision making',
    ],
    impact: 'You ensure our work is grounded in reality and our learnings reach others.',
    skills: ['Research & analysis', 'Academic writing', 'Data interpretation'],
    worksWith: 'Media Director, Sector Leads',
    questions: [
      { id: 'research-exp', label: "Share an example of research or analysis you've done" },
    ],
  },
  {
    id: 'head-of-socials',
    title: 'Head of Socials',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    priority: false,
    shortDesc: 'Own our social media presence day-to-day, growing our community and engagement.',
    responsibilities: [
      'Create and schedule regular social content',
      'Engage with our community online',
      'Track analytics and optimize performance',
      'Support campaign execution',
    ],
    impact: 'You build the community that powers everything we do.',
    skills: ['Social media management', 'Content creation', 'Community building'],
    worksWith: 'Media Director',
    questions: [
      { id: 'social-exp', label: "Link to a social account you manage or content you've created" },
    ],
  },
  {
    id: 'events-lead',
    title: 'Events Lead',
    tier: 'Team Lead',
    commitment: '2-3 hrs/week',
    priority: false,
    shortDesc: 'Plan and execute UK-based events that build community and raise funds.',
    responsibilities: [
      'Plan fundraising and community events',
      'Coordinate logistics and volunteers',
      'Build partnerships with venues and sponsors',
      'Create memorable experiences for attendees',
    ],
    impact: 'You bring people together and generate resources for our mission.',
    skills: ['Event planning', 'Logistics', 'Vendor management'],
    worksWith: 'Community Lead, Finance Director',
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

const RoleCard = ({ role, isExpanded, onToggle, onApply }) => {
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
            <p className="text-xs text-gray-500 mb-3"><strong>Works with:</strong> {role.worksWith}</p>
            <button onClick={(e) => { e.stopPropagation(); onApply(role); }} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm">Apply for this role</button>
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

export default function App() {
  const [expandedRole, setExpandedRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedRoleForForm, setSelectedRoleForForm] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCultureMemo, setShowCultureMemo] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  const handleApply = (role) => { setSelectedRoleForForm(role); setShowForm(true); };
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
                <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} />
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
                <RoleCard key={role.id} role={role} isExpanded={expandedRole === role.id} onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)} onApply={handleApply} />
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
    </div>
  );
}
