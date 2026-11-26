import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FlaskConical, GraduationCap, Terminal, Users } from 'lucide-react';
import { EXPERIENCE_TIMELINE, ExperienceItem, Lang, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface ExperienceLogProps {
  lang: Lang;
}

function TimelineTypeIcon({ type }: { type: ExperienceItem['type'] }) {
  switch (type) {
    case 'engineering':
      return <Terminal size={15} style={{ color: 'var(--accent-volt)' }} />;
    case 'collaboration':
      return <Users size={15} style={{ color: 'var(--accent-cyan)' }} />;
    case 'research':
      return <FlaskConical size={15} style={{ color: 'var(--accent-volt)' }} />;
    case 'education':
      return <GraduationCap size={15} style={{ color: 'var(--accent-cyan)' }} />;
  }
}

export function ExperienceLog({ lang }: ExperienceLogProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const header = UI_COPY.experienceHeader;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.timeline-entry', {
        y: 22,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.timeline-list',
          start: 'top 88%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [lang] },
  );

  return (
    <section id="experience" ref={sectionRef}>
      <div className="section-header-bar">
        <div>
          <div className="section-index-tag">{header.tag}</div>
          <h2 className="section-title">{header.title[lang]}</h2>
        </div>
        <p className="section-subtitle">{header.subtitle[lang]}</p>
      </div>

      <div className="timeline-list">
        {EXPERIENCE_TIMELINE.map((entry) => (
          <article
            key={entry.id}
            className="timeline-entry"
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <div className="timeline-rail" aria-hidden="true">
              <span className="timeline-node-dot" />
              <span className="timeline-rail-line" />
            </div>

            <div className="timeline-card hud-crosshair-box chamfer-card">
              <div className="timeline-card-meta">
                <div className="timeline-code-group">
                  <TimelineTypeIcon type={entry.type} />
                  <span className="timeline-code">{entry.code}</span>
                  <span className="timeline-org">{entry.org[lang]}</span>
                </div>
                <span className="timeline-period">{entry.period[lang]}</span>
              </div>

              <h3 className="timeline-role">{entry.role[lang]}</h3>
              <p className="timeline-summary">{entry.summary[lang]}</p>

              <ul className="timeline-bullets">
                {entry.bullets[lang].map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div className="timeline-tags">
                {entry.tags.map((tag) => (
                  <span key={tag} className="timeline-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
