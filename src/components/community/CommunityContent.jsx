import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, MapPin, Users } from 'lucide-react';
import { thoughtLeadership, communityEvents, upcomingEvents, eventDate } from '../../data/community';
import './community.css';

function ConnectionArt() {
  return <svg className="editorial-art" viewBox="0 0 360 300" fill="none" aria-hidden="true">
    <circle cx="180" cy="150" r="112" stroke="currentColor" strokeOpacity=".13"/>
    <circle cx="180" cy="150" r="70" stroke="currentColor" strokeOpacity=".2"/>
    <path d="M63 214C120 214 121 86 180 86S240 214 297 214M63 86C120 86 121 214 180 214S240 86 297 86" stroke="currentColor" strokeWidth="2"/>
    {[[63,86],[63,214],[180,86],[180,214],[297,86],[297,214]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="9" fill={i%2?'#d6af5b':'#9d87bd'}/>)}
  </svg>;
}

export function ThoughtLeadership({ compact = false }) {
  const article = thoughtLeadership[0];
  return <div className={`aram-community ${compact ? 'community-compact' : ''}`}>
    <article className="editorial-feature">
      <div className="editorial-copy"><span className="community-eyebrow"><BookOpen size={16}/>{article.topic}</span>
        <h2><a href={article.url}>{article.title}<ArrowUpRight size={23}/></a></h2>
        {!compact && <p>{article.summary}</p>}
        <div className="editorial-byline"><span>{article.authors.join(', ')}</span><time dateTime={article.publishedAt}>26 December 2024</time></div>
        <a className="community-link" href={article.url}>Read on Substack<ArrowUpRight size={16}/></a>
      </div><div className="editorial-art-wrap"><ConnectionArt/></div>
    </article>
    {!compact && <div className="community-resource-grid">
      <section className="community-resource"><span className="community-eyebrow">Field context</span><h3>Go deeper into people and place.</h3><p>Explore the district map and Aram’s field observations alongside the published essays.</p><Link className="community-link" href="/research">Explore the research map<ArrowRight size={16}/></Link></section>
      <section className="community-resource"><span className="community-eyebrow">Keep reading</span><h3>More from Research & Insights.</h3><p>Visit Aram’s publication for its wider collection of articles and reflections.</p><a className="community-link" href="https://aramresearchinsights.substack.com/">Visit the publication<ArrowUpRight size={16}/></a></section>
    </div>}
  </div>;
}

export function CommunityEvents({ compact = false, now }) {
  const events = upcomingEvents(communityEvents, now);
  return <div className={`aram-community ${compact ? 'community-compact' : ''}`}>
    {events.length ? <div className="community-event-list">{events.map(event=><article className="community-event" key={event.id}>
      <span className="community-eyebrow"><CalendarDays size={16}/><time dateTime={event.startsAt}>{eventDate(event)}</time></span>
      <h2>{event.title}</h2><p>{event.description}</p><p className="community-event-place"><MapPin size={16}/>{event.location}</p>
      <a className="community-link" href={event.url}>Event details & booking<ArrowUpRight size={16}/></a>
    </article>)}</div> : <section className="community-event-empty">
      <div className="community-event-icon"><CalendarDays size={28}/></div>
      <div><span className="community-eyebrow">Next gathering</span><h2>Room for a new connection.</h2><p>No upcoming events are announced here yet. Confirmed dates, locations and booking details will appear together.</p>
        <Link className="community-link" href="/join">Help bring the community together<ArrowRight size={16}/></Link>
      </div>
    </section>}
    {!compact && <section className="community-organise"><Users size={26}/><div><h3>Have an idea for a gathering?</h3><p>Bring an idea for a conversation, a skill-sharing session or a local meet-up to the Aram team.</p><Link className="community-link" href="/join">Explore getting involved<ArrowRight size={16}/></Link></div></section>}
  </div>;
}

export function CommunityPreview({ now }) {
  return <div className="community-overview-grid"><section><div className="section-head"><h2>Thought leadership</h2><Link className="text-button" href="/members/insights">Explore<ArrowRight size={14}/></Link></div><ThoughtLeadership compact/></section><section><div className="section-head"><h2>Community events</h2><Link className="text-button" href="/members/events">Explore<ArrowRight size={14}/></Link></div><CommunityEvents compact now={now}/></section></div>;
}
