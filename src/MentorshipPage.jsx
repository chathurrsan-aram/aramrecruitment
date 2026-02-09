import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Reuse the scroll-triggered animation pattern from the main app
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

const partnerOrganisations = [
  { name: 'Tea Leaf Trust', desc: 'Education and empowerment in the hill country' },
  { name: 'Dreamspace', desc: 'Digital skills and technology access' },
  { name: "Children's Homes", desc: 'Residential care and development support' },
  { name: 'Local Schools', desc: 'Career guidance and curriculum support' },
];

const mentorBenefits = [
  { title: 'Make Real Impact', desc: 'Directly shape a young person\'s future through consistent guidance and support.' },
  { title: 'Develop Leadership Skills', desc: 'Build mentoring, communication, and cross-cultural collaboration experience.' },
  { title: 'Connect to Your Roots', desc: 'Maintain a meaningful connection to Sri Lanka beyond the annual trip.' },
  { title: 'Join a Community', desc: 'Be part of a network of driven young Tamil professionals giving back.' },
];

const menteeBenefits = [
  { title: 'Career Guidance', desc: 'Get advice from professionals in fields you want to pursue.' },
  { title: 'English Practice', desc: 'Improve conversational English with a native speaker.' },
  { title: 'Expand Horizons', desc: 'Learn about opportunities and paths you didn\'t know existed.' },
  { title: 'Build Confidence', desc: 'Regular encouragement and support from someone who believes in you.' },
];

const howItWorks = [
  { num: '1', title: 'Sign Up', desc: 'Create your profile and tell us about your skills, interests, and availability.' },
  { num: '2', title: 'Get Matched', desc: 'Our team pairs you with a compatible mentee based on goals, language, and expertise.' },
  { num: '3', title: 'Meet Regularly', desc: 'Connect via Google Meet for 45-minute sessions, typically fortnightly.' },
  { num: '4', title: 'Track Progress', desc: 'Log session notes, set goals, and watch your mentee grow over time.' },
];

const expertiseAreas = [
  'Careers & Professional Development',
  'STEM & Technology',
  'Business & Entrepreneurship',
  'English Language & Communication',
  'Wellbeing & Life Skills',
  'Education & Study Skills',
  'Creative Arts & Media',
  'Healthcare & Medicine',
];

const faqs = [
  {
    q: 'How much time do I need to commit?',
    a: 'We ask mentors to commit to at least one 45-minute session every two weeks, plus occasional messaging. Most mentors find it takes about 1-2 hours per fortnight in total.',
  },
  {
    q: 'Do I need to speak Tamil or Sinhala?',
    a: 'Not necessarily. Many sessions are conducted in English, which also helps mentees practise. However, Tamil or Sinhala speakers are especially valuable for younger mentees who are still building English confidence.',
  },
  {
    q: 'What if my mentee has limited internet access?',
    a: 'We work with our partner organisations to ensure mentees have access to reliable internet for scheduled sessions. If connectivity is an issue, we can adjust session frequency or use lower-bandwidth alternatives.',
  },
  {
    q: 'Do I need mentoring experience?',
    a: 'No formal experience is required. We provide an orientation session and mentoring guides to help you get started. What matters most is genuine care and consistency.',
  },
  {
    q: 'How long does the mentorship last?',
    a: 'We ask for a minimum 6-month commitment to build a meaningful relationship. Many mentors continue well beyond that. You can pause or end the match at any time by speaking to the admin team.',
  },
  {
    q: 'Is this only for people who\'ve been on an Aram trip?',
    a: 'No! While trip alumni have a head start in understanding our work, anyone in the UK Tamil diaspora (or beyond) who wants to give back is welcome to apply as a mentor.',
  },
];

export default function MentorshipPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => setPageLoaded(true));
  }, []);

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        opacity: pageLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-aram-purple via-aram-purple-dark to-[#3D2266]" />
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-priority rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s',
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Aram Virtual Mentorship Programme
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            Empower a Young Life
            <span className="block text-white/80">From Anywhere in the World</span>
          </h1>
          <p
            className="text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
            }}
          >
            Connect with Sri Lankan students and young people through regular virtual mentoring sessions. Share your skills, broaden their horizons, and build a relationship that lasts.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            <a
              href="#become-mentor"
              className="bg-white text-aram-purple font-bold py-3 px-8 rounded-full hover:bg-aram-purple-50 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center gap-2"
            >
              Become a Mentor
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="border-2 border-white/50 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-[1.02] min-h-[48px] flex items-center justify-center"
            >
              How It Works
            </a>
          </div>
          <div
            className="mt-12 pb-8 grid grid-cols-3 gap-8 w-full max-w-md mx-auto"
            style={{
              opacity: pageLoaded ? 1 : 0,
              transform: pageLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
            }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1:1</div>
              <div className="text-white/60 text-xs mt-1">Personal Mentoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Virtual</div>
              <div className="text-white/60 text-xs mt-1">Via Google Meet</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">6mo+</div>
              <div className="text-white/60 text-xs mt-1">Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is this programme */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What is the Mentorship Programme?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The Aram Virtual Mentorship Programme pairs UK-based diaspora mentors with students and young people across our partner locations in Sri Lanka. Through regular video calls, mentors provide guidance on careers, education, wellbeing, and life skills — building relationships that create lasting change.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-gradient-to-r from-aram-purple-50 to-priority-bg/30 rounded-2xl p-8 border border-aram-purple-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why Virtual Mentoring?</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our annual trips create powerful connections — but they last only a few weeks. Virtual mentoring extends that impact year-round. A consistent mentor can help a young person navigate exams, explore career paths, practise English, or simply have someone in their corner who believes in them.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We trialled this on a previous trip and saw the difference it makes. Now we're building a proper programme to scale it.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-aram-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">UK to Sri Lanka</h4>
                        <p className="text-xs text-gray-500">Bridging the diaspora gap through meaningful connection</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-sector-bg rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-sector" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Year-Round Impact</h4>
                        <p className="text-xs text-gray-500">Consistent support beyond the annual trip</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-priority-bg rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-priority-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Relationship-First</h4>
                        <p className="text-xs text-gray-500">Building trust and connection, not just transferring knowledge</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-600">Simple steps to start your mentoring journey.</p>
          </AnimatedSection>
          <div className="space-y-0">
            {howItWorks.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-aram-purple text-white rounded-full flex items-center justify-center text-lg font-bold min-w-[40px]">{step.num}</div>
                    {i < howItWorks.length - 1 && <div className="w-0.5 h-16 bg-aram-purple-100" />}
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

      {/* For Mentors & Mentees - Side by side */}
      <section id="become-mentor" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Who Can Get Involved?</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mentor Card */}
            <AnimatedSection delay={0.1}>
              <div className="bg-aram-purple-50 rounded-2xl p-8 h-full border border-aram-purple-100">
                <div className="w-12 h-12 bg-aram-purple rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">For Mentors</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  UK-based Tamil diaspora professionals and students who want to give back by sharing their time, skills, and experience.
                </p>
                <div className="space-y-3 mb-6">
                  {mentorBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-aram-purple mt-0.5 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{b.title}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-aram-purple/10">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Commitment:</p>
                  <p className="text-sm text-gray-700">~1-2 hours per fortnight, minimum 6 months</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Mentee Card */}
            <AnimatedSection delay={0.2}>
              <div className="bg-sector-bg rounded-2xl p-8 h-full border border-sector/20">
                <div className="w-12 h-12 bg-sector rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">For Mentees</h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Students and young people from our Sri Lankan partner organisations who want guidance, support, and someone to learn from.
                </p>
                <div className="space-y-3 mb-6">
                  {menteeBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-sector mt-0.5 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{b.title}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-sector/10">
                  <p className="text-xs text-gray-500 mb-1 font-medium">How to join:</p>
                  <p className="text-sm text-gray-700">Registered via Aram admin or partner organisation</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Mentoring Areas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Whether you're a doctor, developer, designer, or student — you have something valuable to share. Here are some of the areas mentees need support in:
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {expertiseAreas.map((area, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-aram-purple/30 hover:shadow-md transition-all duration-200">
                  <span className="text-sm font-medium text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Partner Organisations */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Partner Organisations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Mentees come from communities we've built trust with over three years of trips.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partnerOrganisations.map((org, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200">
                  <div className="w-10 h-10 bg-aram-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-aram-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{org.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{org.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Safeguarding */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Safeguarding First</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This programme connects adults with young people, and we take that responsibility seriously. All sessions are logged and visible to admins. Chats are monitored for safeguarding. Session notes can be flagged for review. We follow best practices for child protection and provide all mentors with safeguarding guidance before they start.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="bg-gray-50 rounded-2xl p-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-4 flex justify-between items-center text-left hover:bg-gray-100 -mx-2 px-2 rounded transition-colors duration-200 min-h-[48px]"
                  >
                    <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-aram-purple transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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

      {/* CTA Footer */}
      <section className="py-16 bg-aram-purple-100">
        <AnimatedSection className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-aram-purple-dark mb-4">Ready to Mentor?</h2>
          <p className="text-aram-purple text-lg mb-6 leading-relaxed">
            Your time and experience could change a young person's life. Join our mentorship programme and start making impact from wherever you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@aram.org.uk?subject=Mentorship Programme Interest"
              className="bg-aram-purple hover:bg-aram-purple-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px] flex items-center justify-center gap-2"
            >
              Register Interest
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <Link
              to="/"
              className="border-2 border-aram-purple text-aram-purple hover:bg-aram-purple-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 min-h-[52px] flex items-center justify-center"
            >
              View Volunteer Roles
            </Link>
          </div>
          <p className="text-aram-purple/70 mt-6 text-sm">
            Questions? Email us at{' '}
            <a href="mailto:hello@aram.org.uk" className="underline hover:text-aram-purple-dark transition-colors">
              hello@aram.org.uk
            </a>
          </p>
        </AnimatedSection>
      </section>
    </div>
  );
}
