import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, ExternalLink, Plus, X } from 'lucide-react';
import { Lang, PROJECTS, ProjectItem, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface SelectedWorkProps {
  lang: Lang;
}

export function SelectedWork({ lang }: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const header = UI_COPY.workHeader;

  const flagships = PROJECTS.slice(0, 2);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // GTA VI inspired split-screen clip-path reveal + inner media parallax
        gsap.utils.toArray<HTMLElement>('.flagship-card').forEach((card) => {
          gsap.from(card, {
            clipPath: 'inset(6% 0% 6% 0%)',
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'clipPath,opacity',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          });

          const img = card.querySelector<HTMLElement>('.flagship-parallax-img');
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            );
          }
        });

        // Differential column parallax on desktop 2-col grid
        mm.add('(min-width: 901px)', () => {
          gsap.utils.toArray<HTMLElement>('.project-card').forEach((card, i) => {
            const isRightCol = i % 2 === 1;
            gsap.fromTo(
              card,
              { y: isRightCol ? 36 : 0 },
              {
                y: isRightCol ? -24 : 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.projects-grid',
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            );
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [lang] },
  );

  return (
    <section id="work" ref={sectionRef}>
      <div className="section-header-bar">
        <div>
          <div className="section-index-tag">{header.tag}</div>
          <h2 className="section-title">{header.title[lang]}</h2>
        </div>
        <p className="section-subtitle">{header.subtitle[lang]}</p>
      </div>

      {/* GTA VI-Inspired Alternating Split Flagship Showcase */}
      <div className="flagship-list">
        {flagships.map((project, idx) => (
          <article
            key={project.id}
            className={`flagship-card hud-crosshair-box chamfer-card ${idx % 2 === 1 ? 'reversed' : ''}`}
          >
            <div className="flagship-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                  }}
                >
                  <span style={{ color: 'var(--accent-volt)', fontWeight: 700 }}>
                    {project.number} // {project.code}
                  </span>
                  <span
                    style={{
                      padding: '3px 9px',
                      border: '1px solid rgba(0,240,255,0.35)',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.68rem',
                    }}
                  >
                    {project.status[lang]}
                  </span>
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.65rem, 2.7vw, 2.35rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: 'var(--ink-secondary)',
                    fontSize: '0.96rem',
                    lineHeight: 1.62,
                  }}
                >
                  {project.description[lang]}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '4px 10px',
                        border: '1px solid rgba(255,255,255,0.14)',
                        background: 'rgba(255,255,255,0.03)',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '8px' }}>
                <button
                  type="button"
                  className="volt-cta"
                  onClick={() => {
                    cyberAudio.playClickBlip();
                    setActiveProject(project);
                  }}
                  onMouseEnter={() => cyberAudio.playHoverTick()}
                >
                  <Plus size={15} strokeWidth={2.5} />
                  <span>{header.inspectSpecs[lang]}</span>
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ghost-cta"
                  onMouseEnter={() => cyberAudio.playHoverTick()}
                >
                  <span>{header.openRepo[lang]}</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>

            <div className="flagship-media">
              <img
                src={project.image}
                alt={`${project.title} — ${project.category[lang]}`}
                className="flagship-parallax-img"
              />
              {/* Cyber HUD frame vignette + tag */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxShadow: 'inset 0 0 36px rgba(6, 7, 10, 0.72)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '4px 10px',
                  background: 'rgba(6, 7, 10, 0.84)',
                  border: '1px solid rgba(204, 255, 0, 0.4)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-volt)',
                  letterSpacing: '0.08em',
                }}
              >
                SYS_VIEW // {project.title}
              </div>

              {project.secondaryImage && (
                <div
                  style={{
                    position: 'absolute',
                    right: '14px',
                    bottom: '14px',
                    width: '132px',
                    border: '1px solid rgba(204,255,0,0.5)',
                    background: '#06070a',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.65)',
                  }}
                >
                  <img
                    src={project.secondaryImage}
                    alt={`${project.title} Desk Clock plugin`}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* 4-Card Numbered Cyber-Brutalist Archive Grid */}
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="project-card hud-crosshair-box"
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <div className="project-thumb-wrap">
              <img src={project.image} alt={project.title} />
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: '#06070a',
                  border: '1px solid rgba(204,255,0,0.45)',
                  padding: '4px 9px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--accent-volt)',
                }}
              >
                {project.number} // {project.code}
              </div>
            </div>

            <div
              style={{
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                gap: '16px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--accent-cyan)',
                    letterSpacing: '0.08em',
                    marginBottom: '6px',
                  }}
                >
                  {project.category[lang]}
                </div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--ink-secondary)',
                    fontSize: '0.89rem',
                    lineHeight: 1.55,
                  }}
                >
                  {project.tagline[lang]}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid var(--grid-line)',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    cyberAudio.playClickBlip();
                    setActiveProject(project);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    color: 'var(--accent-volt)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>[+] {header.inspectSpecs[lang]}</span>
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} repository`}
                  style={{
                    width: '32px',
                    height: '32px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'var(--ink-primary)',
                  }}
                >
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive HUD Case Study Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} technical specifications`}
          onClick={() => setActiveProject(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 80,
            background: 'rgba(4, 5, 8, 0.84)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="chamfer-card"
            style={{
              maxWidth: '760px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: '#0b0d13',
              border: '1px solid rgba(204,255,0,0.5)',
              boxShadow: '0 28px 90px rgba(0, 0, 0, 0.85)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 22px',
                borderBottom: '1px solid var(--grid-line)',
                background: 'rgba(204,255,0,0.06)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-volt)' }}>
                CASE_FILE // {activeProject.number} :: {activeProject.title}
              </div>
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClickBlip();
                  setActiveProject(null);
                }}
                aria-label="Close modal"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--ink-primary)',
                  padding: '4px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                }}
              >
                <span>ESC</span>
                <X size={14} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div
                style={{
                  border: '1px solid var(--grid-line)',
                  marginBottom: '20px',
                  overflow: 'hidden',
                  maxHeight: '280px',
                }}
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3
                style={{
                  margin: '0 0 10px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: 800,
                }}
              >
                {activeProject.title}
              </h3>

              <p style={{ margin: '0 0 18px', color: 'var(--ink-secondary)', lineHeight: 1.65 }}>
                {activeProject.description[lang]}
              </p>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                // ARCHITECTURE_HIGHLIGHTS
              </div>

              <ul
                style={{
                  margin: '0 0 22px',
                  paddingLeft: '18px',
                  color: 'var(--ink-primary)',
                  lineHeight: 1.7,
                  fontSize: '0.92rem',
                }}
              >
                {activeProject.highlights[lang].map((item) => (
                  <li key={item} style={{ marginBottom: '6px' }}>
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {activeProject.stack.map((tech) => (
                  <span key={tech} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="volt-cta"
                >
                  <span>{header.openRepo[lang]}</span>
                  <ExternalLink size={15} />
                </a>
                <button
                  type="button"
                  className="ghost-cta"
                  onClick={() => setActiveProject(null)}
                >
                  <span>CLOSE_FILE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
