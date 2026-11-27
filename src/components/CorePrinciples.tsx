import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Lang, PRINCIPLES, PrincipleItem, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface CorePrinciplesProps {
  lang: Lang;
}

function PrincipleVectorIcon({ icon }: { icon: PrincipleItem['icon'] }) {
  switch (icon) {
    case 'cube':
      return (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <polygon points="18,3 32,10 32,26 18,33 4,26 4,10" stroke="var(--accent-volt)" strokeWidth="1.5" />
          <polyline points="4,10 18,17 32,10" stroke="var(--accent-cyan)" strokeWidth="1.3" />
          <line x1="18" y1="17" x2="18" y2="33" stroke="var(--accent-cyan)" strokeWidth="1.3" />
        </svg>
      );
    case 'grid':
      return (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <rect x="4" y="4" width="28" height="28" stroke="var(--accent-volt)" strokeWidth="1.5" />
          <rect x="11" y="11" width="14" height="14" stroke="var(--accent-cyan)" strokeWidth="1.3" />
          <line x1="18" y1="4" x2="18" y2="32" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
          <line x1="4" y1="18" x2="32" y2="18" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
        </svg>
      );
    case 'zap':
      return (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <polygon points="20,3 7,20 17,20 15,33 29,15 19,15" stroke="var(--accent-volt)" strokeWidth="1.5" />
          <circle cx="29" cy="7" r="2.2" fill="var(--accent-cyan)" />
        </svg>
      );
    case 'cpu':
      return (
        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <circle cx="18" cy="18" r="11" stroke="var(--accent-volt)" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="18" cy="18" r="4" stroke="var(--accent-cyan)" strokeWidth="1.4" />
          <line x1="18" y1="2" x2="18" y2="7" stroke="#F4F6FA" strokeWidth="1.3" />
          <line x1="18" y1="29" x2="18" y2="34" stroke="#F4F6FA" strokeWidth="1.3" />
          <line x1="2" y1="18" x2="7" y2="18" stroke="#F4F6FA" strokeWidth="1.3" />
          <line x1="29" y1="18" x2="34" y2="18" stroke="#F4F6FA" strokeWidth="1.3" />
        </svg>
      );
  }
}

export function CorePrinciples({ lang }: CorePrinciplesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const header = UI_COPY.principlesHeader;

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.principle-cell', {
        y: 26,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.principles-grid',
          start: 'top 90%',
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section id="principles" ref={sectionRef}>
      <div className="section-header-bar">
        <div>
          <div className="section-index-tag">{header.tag}</div>
          <h2 className="section-title">{header.title[lang]}</h2>
        </div>
        <p className="section-subtitle">{header.subtitle[lang]}</p>
      </div>

      <div className="principles-grid">
        {PRINCIPLES.map((item) => (
          <article
            key={item.id}
            className="principle-cell hud-crosshair-box"
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <PrincipleVectorIcon icon={item.icon} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.1em',
                }}
              >
                [{item.code}]
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.96rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--ink-primary)',
              }}
            >
              {item.title[lang]}
            </h3>

            <p
              style={{
                margin: 0,
                color: 'var(--ink-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
              }}
            >
              {item.summary[lang]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
