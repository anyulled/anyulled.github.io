import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';

const KIND_LABELS = { work: 'Experience', teaching: 'Teaching', community: 'Community', publication: 'Publication' };
const championSections = [
  { to: '/java-champion', label: 'Overview', end: true },
  { to: '/java-champion/memberships', label: 'Memberships' },
  { to: '/java-champion/events', label: 'Events organized' },
  { to: '/java-champion/talks', label: 'Talks & workshops' },
  { to: '/java-champion/projects', label: 'Projects & tools' },
  { to: '/java-champion/open-source', label: 'Open source' },
];
const logoAssets = import.meta.glob('./logos/*.{png,webp,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' });
const logoAliases = {
  'barcelonajug': 'bcnjug',
  'softwarecraftersbarcelona': 'scnbcn',
  'talentarena': 'talent-arena',
  'ingrammicro': 'ingram-micro',
  'globalsoftwarearchitecturesummit': 'gsas',
};

function formatDate(date, options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('en-GB', options).format(parsed);
}
function formatMonth(date) { return formatDate(date, { month: 'short', year: 'numeric' }); }
function sortDescending(items) { return [...items].sort((a, b) => new Date(b.date) - new Date(a.date)); }
function isUpcoming(date) { return Boolean(date) && date > new Date().toISOString().slice(0, 10); }
function typeClassName(type) { return type ? `type-label--${type.toLowerCase().replace(/\s+/g, '-')}` : ''; }
function monthLabel(monthKey) {
  const date = new Date(`${monthKey}-01T00:00:00Z`);
  return new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }).format(date);
}
function groupEventsByYearAndMonth(events) {
  const years = new Map();
  events.forEach((event) => {
    const monthKey = event.date?.slice(0, 7) || 'undated';
    const year = monthKey === 'undated' ? 'Undated' : monthKey.slice(0, 4);
    if (!years.has(year)) years.set(year, new Map());
    const months = years.get(year);
    if (!months.has(monthKey)) months.set(monthKey, []);
    months.get(monthKey).push(event);
  });

  return [...years.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, months]) => ({
      year,
      months: [...months.entries()]
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([key, items]) => ({ key, label: key === 'undated' ? 'Undated' : monthLabel(key), items: sortDescending(items) })),
    }));
}
function resolveLogoPath(item) {
  if (item.logoPath) return item.logoPath;
  const labels = [item.organization, item.name, item.company, item.description].filter(Boolean);
  const normalizedLabels = labels.map((label) => label.toLowerCase().replace(/[^a-z0-9]+/g, ''));
  const match = Object.entries(logoAssets).find(([path]) => {
    const filename = path.split('/').pop().split('.')[0].toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/^logo/, '');
    return normalizedLabels.some((label) => {
      const target = logoAliases[label] || label;
      return target.replace(/[^a-z0-9]+/g, '') === filename || target.includes(filename);
    });
  });
  return match?.[1];
}

function SectionTitle({ eyebrow, title, description }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><p>{description}</p></div>;
}

function LogoOrFallback({ item, size = 'medium' }) {
  const label = item.organization || item.name || item.company || 'Java';
  const initials = label.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
  const logoPath = resolveLogoPath(item);
  return <div className={`brand-mark brand-mark--${size}`}>{logoPath ? <img src={logoPath} alt={`${label} logo`} loading="lazy" /> : <span aria-label={label}>{initials}</span>}</div>;
}

function ExternalLinks({ links = [] }) {
  if (!links.length) return null;
  return <div className="link-row">{links.map((link) => <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div>;
}

function DateBadge({ date, dateLabel }) {
  return <div className="date-badge">{isUpcoming(date) ? <span className="upcoming">🔜 Upcoming</span> : null}<span>{dateLabel || formatDate(date)}</span></div>;
}

function HomePage({ profile }) {
  const metrics = useMemo(() => profile.highlights ?? [], [profile]);
  const publicItems = useMemo(() => profile.publications ?? [], [profile]);
  const education = useMemo(() => profile.education ?? [], [profile]);
  return <>
    <section className="hero"><div className="hero-copy"><div className="eyebrow-pill">Selected portfolio</div><div className="hero-title-row"><img className="avatar" src={profile.avatarUrl} alt={`Profile photo of ${profile.name}`} loading="eager" decoding="async" /><div className="hero-title-copy"><h1>{profile.name}</h1><p className="hero-headline">{profile.headline}</p></div></div><p className="hero-summary">{profile.summary}</p><NavLink className="primary-action" to="/java-champion">Explore Java Champion profile <span aria-hidden="true">→</span></NavLink></div><aside className="hero-panel"><div className="panel-card panel-card--strong"><span className="card-kicker">Location</span><strong>{profile.location}</strong></div><div className="panel-grid">{metrics.map((item) => <div key={item.label} className="panel-card"><span className="card-kicker">{item.label}</span><strong>{item.value}</strong></div>)}</div><div className="contact-card"><span className="card-kicker">Contact</span><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a><a href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a><a href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={profile.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></aside></section>
    <section className="section"><SectionTitle eyebrow="Timeline" title="Selected milestones" description="A tighter reverse-chronological view that keeps the story focused." /><div className="timeline">{sortDescending(profile.timeline ?? []).map((item) => <article key={`${item.date}-${item.title}`} className="timeline-item"><div className="timeline-rail" aria-hidden="true"><span className="timeline-dot" /></div><div className="timeline-card"><div className="timeline-meta"><span>{formatMonth(item.date)}</span><span>{KIND_LABELS[item.kind] ?? 'Event'}</span></div><h3>{item.title}</h3><div className="timeline-org"><strong>{item.organization}</strong>{item.location ? <span>{item.location}</span> : null}</div><p>{item.summary}</p>{item.tags?.length ? <div className="tag-row">{item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div> : null}</div></article>)}</div></section>
    <section className="section split"><div><SectionTitle eyebrow="Public writing" title="Publications and talks" description="Public pieces and talks that reinforce the architecture narrative." /><div className="list-grid">{publicItems.map((item) => <article key={item.title} className="mini-card"><span className="card-kicker">{item.year}</span><h3>{item.title}</h3><p>{item.source}</p></article>)}</div></div><div><SectionTitle eyebrow="Education" title="Recent training" description="Academic and executive training that supports the architecture role." /><div className="education-stack">{education.map((item) => <article key={`${item.school}-${item.period}`} className="education-card"><strong>{item.school}</strong><span>{item.program}</span><p>{item.period}</p></article>)}</div></div></section>
    <section className="section"><SectionTitle eyebrow="Skills" title="Core themes" description="Technical areas that repeat across the profile and current work." /><div className="chip-row">{profile.skills.map((skill) => <span key={skill} className="chip">{skill}</span>)}</div></section>
  </>;
}

function JavaChampionLayout({ profile }) {
  const champion = profile.javaChampion;
  const location = useLocation();
  const sectionTitle = location.pathname === '/java-champion' ? 'Java Champion profile' : 'Java Champion evidence';
  return <><section className="champion-hero"><div><span className="eyebrow-pill">Java Champion</span><h1>{sectionTitle}</h1><p>{champion.intro}</p></div><div className="champion-hero-mark" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><path d="M10 18h23v9.5A10.5 10.5 0 0 1 22.5 38h-2A10.5 10.5 0 0 1 10 27.5V18Zm23 4h4a5 5 0 0 1 0 10h-4" /><path d="M14 10c0 3 3 3 3 6m7-6c0 3 3 3 3 6" /></svg></div></section><nav className="champion-nav" aria-label="Java Champion sections">{championSections.map((section) => <NavLink key={section.to} to={section.to} end={section.end}>{section.label}</NavLink>)}</nav><Outlet context={{ profile, champion }} /></>;
}

function ChampionOverview({ champion }) {
  const stats = [['Memberships', champion.memberships.length], ['Events organized', champion.events.length], ['Talks & workshops', champion.talks.length], ['Open-source projects', champion.openSource.length]];
  return <section className="section champion-section"><SectionTitle eyebrow="Impact at a glance" title="Java in practice, community, and public learning" description="A concise map of the work behind the nomination, with direct links to the evidence." /><div className="stat-grid">{stats.map(([label, value]) => <div key={label} className="stat-card"><strong>{value}</strong><span>{label}</span></div>)}</div><div className="champion-feature-grid"><article className="feature-card"><span className="card-kicker">Community</span><h3>Building spaces for Java and software craftsmanship</h3><p>From Barcelona JUG leadership to mentoring and workshops, the profile connects technical depth with an open community practice.</p><NavLink to="/java-champion/memberships">View memberships →</NavLink></article><article className="feature-card feature-card--accent"><span className="card-kicker">Public learning</span><h3>Sharing practical architecture lessons</h3><p>Talks and workshops cover Java, Spring, testing, architecture, distributed systems, and modern engineering practices.</p><NavLink to="/java-champion/talks">View talks and workshops →</NavLink></article></div></section>;
}

function EvidenceCard({ item, children, date = true }) {
  return <article className="evidence-card"><div className="evidence-card-top"><LogoOrFallback item={item} /><div className="evidence-card-heading"><div className="evidence-meta">{date && <DateBadge date={item.date} dateLabel={item.dateLabel || item.period} />}{item.type ? <span className={`type-label ${typeClassName(item.type)}`}>{item.type}</span> : null}</div><h3>{item.title || item.name || item.organization || item.company}</h3><strong>{item.organization || item.name || item.company}</strong></div></div>{item.description ? <p>{item.description}</p> : null}{children}<ExternalLinks links={item.links} /></article>;
}
function MembershipsPage({ champion }) { return <section className="section champion-section"><SectionTitle eyebrow="Memberships & volunteer work" title="Community commitments" description="Organizations and initiatives where I contribute time, mentorship, and technical community leadership." /><div className="evidence-grid">{champion.memberships.map((item) => <EvidenceCard key={item.name} item={item} date={false}><p className="period-line">{item.date}</p></EvidenceCard>)}</div></section>; }
function EventTimelineCard({ item }) {
  const event = { ...item, title: item.description, organization: item.name, description: '' };
  return <div className="event-timeline-item"><span className="event-timeline-node" aria-hidden="true" /><EvidenceCard item={event} /></div>;
}
function EventsPage({ champion }) {
  const yearGroups = groupEventsByYearAndMonth(champion.events);
  const years = yearGroups.filter((group) => group.year !== 'Undated').length;
  return <section className="section champion-section"><SectionTitle eyebrow="Events organized" title="Creating places to meet and learn" description="A reverse-chronological record of conferences, meetups, open spaces, and hands-on workshops organized across the Barcelona community." /><div className="event-overview-strip"><div><strong>{champion.events.length}</strong><span>events organized</span></div><div><strong>{years}</strong><span>years of activity</span></div><div><strong>{new Set(champion.events.map((item) => item.name)).size}</strong><span>community groups</span></div></div><div className="event-timeline">{yearGroups.map((yearGroup) => <section key={yearGroup.year} className="event-year"><div className="event-year-heading"><span className="event-year-rule" aria-hidden="true" /><h3>{yearGroup.year}</h3></div><div className="event-year-content">{yearGroup.months.map((month) => <div key={month.key} className="event-month"><div className="event-month-label"><span>{month.label}</span><small>{month.items.length} {month.items.length === 1 ? 'event' : 'events'}</small></div><div className="event-month-items">{month.items.map((item) => <EventTimelineCard key={`${item.date}-${item.name}-${item.description}`} item={item} />)}</div></div>)}</div></section>)}</div></section>;
}
function TalksPage({ champion }) {
  const yearGroups = groupEventsByYearAndMonth(champion.talks);
  const years = yearGroups.filter((group) => group.year !== 'Undated').length;
  return <section className="section champion-section"><SectionTitle eyebrow="Talks & workshops" title="Sharing the craft" description="A reverse-chronological record of public sessions about Java, Spring, architecture, testing, and the practices that help teams deliver better software." /><div className="event-overview-strip"><div><strong>{champion.talks.length}</strong><span>talks & workshops</span></div><div><strong>{years}</strong><span>years of activity</span></div><div><strong>{new Set(champion.talks.map((item) => item.name)).size}</strong><span>organizations</span></div></div><div className="event-timeline">{yearGroups.map((yearGroup) => <section key={yearGroup.year} className="event-year"><div className="event-year-heading"><span className="event-year-rule" aria-hidden="true" /><h3>{yearGroup.year}</h3></div><div className="event-year-content">{yearGroup.months.map((month) => <div key={month.key} className="event-month"><div className="event-month-label"><span>{month.label}</span><small>{month.items.length} {month.items.length === 1 ? 'session' : 'sessions'}</small></div><div className="event-month-items">{month.items.map((item) => <EventTimelineCard key={`${item.date}-${item.name}-${item.description}`} item={item} />)}</div></div>)}</div></section>)}</div></section>;
}
function ProjectsPage({ champion }) { return <section className="section champion-section"><SectionTitle eyebrow="Java projects at work" title="Tools applied in real delivery contexts" description="One editable project entry per employer, with the Java ecosystem alphabetized for quick scanning." /><div className="project-grid">{champion.projects.map((item) => <article key={`${item.company}-${item.period}`} className="project-card"><div className="project-heading"><LogoOrFallback item={{ ...item, organization: item.company }} size="large" /><div><span className="card-kicker">{item.period}</span><h3>{item.company}</h3><p>{item.role}</p></div></div>{item.projects?.length ? <div className="project-list">{item.projects.map((project) => <div key={`${item.company}-${project.name}`} className="project-detail"><div className="project-detail-meta"><strong>{project.name}</strong><span>{project.period}</span></div><p>{project.summary}</p><span className="project-association">Associated with {project.associatedWith}</span>{project.article ? <p className="project-article"><strong>{project.article}</strong><br />{project.articleSummary}</p> : null}<div className="project-skill-list">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div> : null}<div className="tool-list">{[...item.tools].sort((a, b) => a.localeCompare(b)).map((tool) => <span key={tool}>{tool}</span>)}</div></article>)}</div></section>; }
function OpenSourcePage({ champion }) { return <section className="section champion-section"><SectionTitle eyebrow="Open source contribution" title="Giving back to the ecosystem" description="Projects where contributions and collaboration connect professional Java practice with the wider ecosystem." /><div className="evidence-grid">{champion.openSource.map((item) => <EvidenceCard key={item.name} item={item} date={false} />)}</div></section>; }

function AppContent() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/profile.json').then((response) => { if (!response.ok) throw new Error(`Could not load profile.json (${response.status})`); return response.json(); }).then(setProfile).catch((err) => setError(err instanceof Error ? err.message : 'Could not load the profile.')); }, []);
  if (error) return <main className="app-shell"><div className="error-card">{error}</div></main>;
  if (!profile) return <main className="app-shell"><div className="loading-card">Loading portfolio…</div></main>;
  return <main className="app-shell"><Routes><Route path="/" element={<HomePage profile={profile} />} /><Route path="/java-champion" element={<JavaChampionLayout profile={profile} />}><Route index element={<ChampionOverview champion={profile.javaChampion} />} /><Route path="memberships" element={<MembershipsPage champion={profile.javaChampion} />} /><Route path="events" element={<EventsPage champion={profile.javaChampion} />} /><Route path="talks" element={<TalksPage champion={profile.javaChampion} />} /><Route path="projects" element={<ProjectsPage champion={profile.javaChampion} />} /><Route path="open-source" element={<OpenSourcePage champion={profile.javaChampion} />} /></Route></Routes></main>;
}
export default function App() { return <BrowserRouter><AppContent /></BrowserRouter>; }
