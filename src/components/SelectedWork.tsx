import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, Download, Plus, RotateCcw, Search, X } from 'lucide-react';
import { Lang, PROJECTS, ProjectGroup, ProjectItem, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';
import { ProjectModal } from './ProjectModal';

interface SelectedWorkProps {
  lang: Lang;
  activeProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
}

const FILTER_ORDER: ProjectGroup[] = ['all', 'web-ai', 'systems-mobile', 'data-algo'];
const QUICK_TECH_CHIPS = ['All', 'TypeScript', 'Python', 'Flutter', 'Tauri v2', 'Java', 'PWA'];

export function SelectedWork({
  lang,
  activeProject,
  onSelectProject,
}: SelectedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const didFilterMountRef = useRef(false);
  const didRefreshMountRef = useRef(false);
  const [activeGroup, setActiveGroup] = useState<ProjectGroup>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTech, setActiveTech] = useState('All');
  const header = UI_COPY.workHeader;

  const flagships = useMemo(() => PROJECTS.filter((p) => p.featured), []);
  const archiveBase = useMemo(() => PROJECTS.filter((p) => !p.featured), []);

  const countForGroup = (g: ProjectGroup) =>
    g === 'all' ? archiveBase.length : archiveBase.filter((p) => p.group === g).length;

  const filteredArchive = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return archiveBase.filter((project) => {
      if (activeGroup !== 'all' && project.group !== activeGroup) return false;

      if (activeTech !== 'All') {
        const needle = activeTech.toLowerCase();
        const stackMatch = project.stack.some((s) => s.toLowerCase().includes(needle));
        if (!stackMatch) return false;
      }

      if (query) {
        const haystack = [
          project.title,
          project.code,
          project.category[lang],
          project.tagline[lang],
          ...project.stack,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [archiveBase, activeGroup, activeTech, searchQuery, lang]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.flagship-card').forEach((card) => {
          gsap.from(card, {
            clipPath: 'inset(6% 0% 6% 0%)',
            opacity: 0,
            duration: 0.75,
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
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [] },
  );

  // Animate archive cards only on category/tag tab switch (skip initial mount & typing)
  useEffect(() => {
    if (!didFilterMountRef.current) {
      didFilterMountRef.current = true;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.25,
          stagger: 0.035,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      );
    }
  }, [activeGroup, activeTech]);

  // Debounce ScrollTrigger.refresh on archive filter/search height changes
  useEffect(() => {
    if (!didRefreshMountRef.current) {
      didRefreshMountRef.current = true;
      return;
    }
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [activeGroup, activeTech, searchQuery]);

  const resetArchiveFilters = () => {
    cyberAudio.playClickBlip();
    setActiveGroup('all');
    setActiveTech('All');
    setSearchQuery('');
  };

  return (
    <section id="work" ref={sectionRef}>
      <div className="section-header-bar">
        <div>
          <div className="section-index-tag">{header.tag}</div>
          <h2 className="section-title">{header.title[lang]}</h2>
        </div>
        <p className="section-subtitle">{header.subtitle[lang]}</p>
      </div>

      {/* Featured Builds (01-03 Split Parallax Cards, exclusive to top section) */}
      <div className="subbar-label">{header.flagshipTag[lang]}</div>

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
                      border: '1px solid var(--grid-line-bright)',
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
                    onSelectProject(project);
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

                {project.releaseUrl && (
                  <a
                    href={project.releaseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ghost-cta"
                    onMouseEnter={() => cyberAudio.playHoverTick()}
                  >
                    <Download size={14} style={{ color: 'var(--accent-cyan)' }} />
                    <span>{project.releaseLabel?.[lang] ?? 'RELEASES'}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="flagship-media">
              <img
                src={project.image}
                alt={`${project.title}: ${project.category[lang]}`}
                className="flagship-parallax-img"
                loading="lazy"
                decoding="async"
              />
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
                  border: '1px solid var(--grid-line-bright)',
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
                    width: '142px',
                    border: '1px solid var(--grid-line-bright)',
                    background: '#06070a',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.65)',
                  }}
                >
                  <img
                    src={project.secondaryImage}
                    alt={`${project.title} Desk Clock plugin`}
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Archive Matrix (04-09, zero duplication with Flagship cards above) */}
      <div className="filter-bar">
        <div className="filter-bar-top">
          <span className="filter-bar-label">{header.archiveTag[lang]}</span>
          <div className="filter-tabs" role="tablist" aria-label="Filter archive repositories by category">
            {FILTER_ORDER.map((groupKey) => {
              const isActive = activeGroup === groupKey;
              const count = String(countForGroup(groupKey)).padStart(2, '0');
              return (
                <button
                  key={groupKey}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`filter-tab chamfer-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    cyberAudio.playClickBlip();
                    setActiveGroup(groupKey);
                  }}
                  onMouseEnter={() => cyberAudio.playHoverTick()}
                >
                  <span>{header.filters[groupKey][lang]}</span>
                  <span className="filter-count">[{count}]</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter-bar-search-row">
          <div className="work-search-wrap">
            <Search size={14} className="work-search-icon" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'id'
                  ? 'Cari proyek atau stack (mis. Flutter, Python, Java)...'
                  : 'Search repo or stack (e.g. Flutter, Python, Java)...'
              }
              aria-label={lang === 'id' ? 'Cari repositori' : 'Search archive repositories'}
              className="work-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="work-search-clear"
                aria-label="Clear search query"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="tech-filter-strip" aria-label="Filter by technology">
            {QUICK_TECH_CHIPS.map((chip) => {
              const selected = activeTech === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  className={`tech-filter-chip ${selected ? 'active' : ''}`}
                  onClick={() => {
                    cyberAudio.playClickBlip();
                    setActiveTech(chip);
                  }}
                >
                  {chip === 'All' ? (lang === 'id' ? 'Semua Tag' : 'All Tags') : chip}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6-Repository Cyber-Brutalist Archive Grid (3x2 on desktop) */}
      {filteredArchive.length === 0 ? (
        <div className="archive-empty-state">
          <p>
            {lang === 'id'
              ? 'Tidak ada repositori arsip yang cocok dengan filter saat ini.'
              : 'No archive repositories match the current filter.'}
          </p>
          <button type="button" className="ghost-cta" onClick={resetArchiveFilters}>
            <RotateCcw size={14} />
            <span>{lang === 'id' ? 'RESET FILTER' : 'RESET FILTERS'}</span>
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="projects-grid">
          {filteredArchive.map((project) => (
            <article
              key={project.id}
              className="project-card hud-crosshair-box"
              onMouseEnter={() => cyberAudio.playHoverTick()}
            >
              <div className="project-thumb-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(6, 7, 10, 0.9)',
                    border: '1px solid var(--grid-line-bright)',
                    padding: '4px 9px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'var(--accent-volt)',
                  }}
                >
                  {project.number} // {project.code}
                </div>
              </div>

              <div
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                  gap: '14px',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
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
                      fontSize: '1.22rem',
                      fontWeight: 800,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: 'var(--ink-secondary)',
                      fontSize: '0.86rem',
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
                    gap: '8px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--grid-line)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      cyberAudio.playClickBlip();
                      onSelectProject(project);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: 0,
                      color: 'var(--accent-volt)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>[+] {header.inspectSpecs[lang]}</span>
                  </button>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    {project.releaseUrl && (
                      <a
                        href={project.releaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={project.releaseLabel?.[lang] ?? 'Releases'}
                        aria-label={`Download ${project.title} release`}
                        style={{
                          width: '32px',
                          height: '32px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: 'var(--accent-cyan)',
                        }}
                      >
                        <Download size={14} />
                      </a>
                    )}
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
              </div>
            </article>
          ))}
        </div>
      )}

      <ProjectModal
        project={activeProject}
        lang={lang}
        onClose={() => onSelectProject(null)}
        onSelectProject={onSelectProject}
      />
    </section>
  );
}
