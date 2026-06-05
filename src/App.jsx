import { useEffect, useMemo, useState } from 'react';

const KIND_LABELS = {
  work: 'Experience',
  teaching: 'Teaching',
  community: 'Community',
  publication: 'Publication',
};

function formatMonth(date) {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat('es-ES', {
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}

function sortDescending(items) {
  return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    fetch('/profile.json')
      .then((response) => {
        if (!response.ok) throw new Error(`No se pudo cargar profile.json (${response.status})`);
        return response.json();
      })
      .then((data) => {
        if (!alive) return;
        setProfile({
          ...data,
          timeline: sortDescending(data.timeline ?? []),
        });
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : 'No se pudo cargar el perfil.');
      });

    return () => {
      alive = false;
    };
  }, []);

  const metrics = useMemo(() => profile?.highlights ?? [], [profile]);
  const publicItems = useMemo(() => profile?.publications ?? [], [profile]);
  const education = useMemo(() => profile?.education ?? [], [profile]);

  if (error) {
    return (
      <main className="app-shell">
        <div className="error-card">{error}</div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="app-shell">
        <div className="loading-card">Cargando portfolio…</div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow-pill">Selected portfolio</div>
          <div className="hero-title-row">
            <img
              className="avatar"
              src={profile.avatarUrl}
              alt={`Foto de perfil de ${profile.name}`}
              loading="eager"
              decoding="async"
            />
            <div className="hero-title-copy">
              <h1>{profile.name}</h1>
              <p className="hero-headline">{profile.headline}</p>
            </div>
          </div>
          <p className="hero-summary">{profile.summary}</p>
        </div>

        <aside className="hero-panel">
          <div className="panel-card panel-card--strong">
            <span className="card-kicker">Location</span>
            <strong>{profile.location}</strong>
          </div>

          <div className="panel-grid">
            {metrics.map((item) => (
              <div key={item.label} className="panel-card">
                <span className="card-kicker">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="contact-card">
            <span className="card-kicker">Contact</span>
            <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
            <a href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.contact.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </aside>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Timeline"
          title="Selected milestones"
          description="A tighter reverse-chronological view that keeps the story focused."
        />

        <div className="timeline">
          {profile.timeline.map((item) => (
            <article key={`${item.date}-${item.title}`} className="timeline-item">
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-dot" />
              </div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span>{formatMonth(item.date)}</span>
                  <span>{KIND_LABELS[item.kind] ?? 'Event'}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="timeline-org">
                  <strong>{item.organization}</strong>
                  {item.location ? <span>{item.location}</span> : null}
                </div>
                <p>{item.summary}</p>
                {item.tags?.length ? (
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <SectionTitle
            eyebrow="Public writing"
            title="Publications and talks"
            description="Public pieces and talks that reinforce the architecture narrative."
          />

          <div className="list-grid">
            {publicItems.map((item) => (
              <article key={item.title} className="mini-card">
                <span className="card-kicker">{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.source}</p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle
            eyebrow="Education"
            title="Recent training"
            description="Academic and executive training that supports the architecture role."
          />

          <div className="education-stack">
            {education.map((item) => (
              <article key={`${item.school}-${item.period}`} className="education-card">
                <strong>{item.school}</strong>
                <span>{item.program}</span>
                <p>{item.period}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionTitle
          eyebrow="Skills"
          title="Core themes"
          description="Technical areas that repeat across the profile and current work."
        />

        <div className="chip-row">
          {profile.skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
