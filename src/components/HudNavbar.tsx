import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, FileText, Menu, Terminal, Volume2, VolumeX, X } from 'lucide-react';
import { Lang, PROFILE, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';
import { THEME_ORDER, THEME_PRESETS, ThemePreset } from '../utils/preferences';

interface HudNavbarProps {
  lang: Lang;
  theme: ThemePreset;
  activeSection: string;
  soundEnabled: boolean;
  onToggleLang: () => void;
  onCycleTheme: () => void;
  onSelectTheme: (next: ThemePreset) => void;
  onToggleSound: () => void;
  onOpenPalette: () => void;
  onOpenResume: () => void;
  onScrollTo: (sectionId: string) => void;
}

function formatUtc8Clock(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Makassar',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return new Date().toTimeString().slice(0, 8);
  }
}

export function HudNavbar({
  lang,
  theme,
  activeSection,
  soundEnabled,
  onToggleLang,
  onCycleTheme,
  onSelectTheme,
  onToggleSound,
  onOpenPalette,
  onOpenResume,
  onScrollTo,
}: HudNavbarProps) {
  const [sysTime, setSysTime] = useState(formatUtc8Clock);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const stickyCtaWrapRef = useRef<HTMLDivElement>(null);
  const railFillLeftRef = useRef<HTMLDivElement>(null);
  const railFillRightRef = useRef<HTMLDivElement>(null);
  const scrollPctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSysTime(formatUtc8Clock());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    const ctaWrap = stickyCtaWrapRef.current;
    if (!ctaWrap) return;

    const showStickyCta = (show: boolean) => {
      gsap.to(ctaWrap, {
        width: show ? 'auto' : 0,
        opacity: show ? 1 : 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    gsap.set(ctaWrap, { width: 0, opacity: 0 });

    const heroTrigger = ScrollTrigger.create({
      trigger: '#hero-cta-sentinel',
      start: 'top 72px',
      onEnter: () => showStickyCta(true),
      onLeaveBack: () => showStickyCta(false),
    });

    const scrollTracker = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const progress = self.progress;
        if (railFillLeftRef.current) {
          railFillLeftRef.current.style.transform = `scaleY(${progress})`;
        }
        if (railFillRightRef.current) {
          railFillRightRef.current.style.transform = `scaleY(${progress})`;
        }
        if (scrollPctRef.current) {
          scrollPctRef.current.textContent = `SCRL // ${String(Math.round(progress * 100)).padStart(3, '0')}%`;
        }
      },
    });

    return () => {
      heroTrigger.kill();
      scrollTracker.kill();
    };
  }, []);

  const handleMobileJump = (sectionId: string) => {
    cyberAudio.playClickBlip();
    setDrawerOpen(false);
    onScrollTo(sectionId);
  };

  return (
    <>
      <header className="hud-navbar">
        <div className="hud-navbar-inner">
          <a
            href="#hero"
            className="hud-brand"
            onClick={(e) => {
              e.preventDefault();
              cyberAudio.playClickBlip();
              setDrawerOpen(false);
              onScrollTo('hero');
            }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span>{PROFILE.brandCode}</span>
          </a>

          <nav className="hud-nav-links" aria-label="Primary sections">
            {UI_COPY.nav.links.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`hud-nav-link ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    cyberAudio.playClickBlip();
                    onScrollTo(item.id);
                  }}
                  onMouseEnter={() => cyberAudio.playHoverTick()}
                >
                  <span style={{ color: 'var(--accent-volt)', marginRight: '4px' }}>{item.code}</span>
                  {item.label[lang]}
                </a>
              );
            })}
          </nav>

          <div className="hud-nav-controls">
            <div
              className="hud-ctrl-cell hud-ctrl-label-hide-lg"
              style={{ cursor: 'default', color: 'var(--ink-secondary)' }}
              title="Makassar Local Time (UTC+8)"
            >
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              <span>
                {sysTime}
                <span className="hud-ctrl-hide-1440"> UTC+8</span>
              </span>
            </div>

            <button
              type="button"
              className="hud-ctrl-cell hud-ctrl-hide-mobile"
              onClick={() => {
                cyberAudio.playClickBlip();
                onCycleTheme();
              }}
              aria-label={`Switch color theme (current: ${THEME_PRESETS[theme].label})`}
              title={`Theme preset: ${THEME_PRESETS[theme].label}`}
            >
              <span
                className="theme-dot"
                style={{ backgroundColor: THEME_PRESETS[theme].primary }}
              />
              <span>{THEME_PRESETS[theme].label}</span>
            </button>

            <button
              type="button"
              className="hud-ctrl-cell"
              onClick={() => {
                cyberAudio.playClickBlip();
                onToggleLang();
              }}
              aria-label="Toggle language EN / ID"
            >
              <span style={{ color: lang === 'en' ? 'var(--accent-volt)' : 'var(--ink-muted)' }}>
                EN
              </span>
              <span style={{ color: 'var(--ink-muted)' }}>/</span>
              <span style={{ color: lang === 'id' ? 'var(--accent-volt)' : 'var(--ink-muted)' }}>
                ID
              </span>
            </button>

            <button
              type="button"
              className={`hud-ctrl-cell hud-ctrl-hide-mobile ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Mute HUD audio' : 'Enable HUD audio'}
              title={soundEnabled ? 'HUD Audio: ON' : 'HUD Audio: OFF'}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hud-ctrl-label-hide-sm">{soundEnabled ? 'SFX_ON' : 'SFX_OFF'}</span>
            </button>

            <button
              type="button"
              className="hud-ctrl-cell hud-ctrl-hide-mobile"
              onClick={() => {
                cyberAudio.playClickBlip();
                onOpenResume();
              }}
              aria-label="Open printable ATS CV"
              title="View / Print ATS Resume"
            >
              <FileText size={14} style={{ color: 'var(--accent-cyan)' }} />
              <span>CV</span>
            </button>

            <button
              type="button"
              className="hud-ctrl-cell"
              onClick={() => {
                cyberAudio.playClickBlip();
                onOpenPalette();
              }}
              aria-label="Open Quick Launcher (Ctrl+K)"
            >
              <Terminal size={14} style={{ color: 'var(--accent-volt)' }} />
              <span className="hud-ctrl-label-hide-sm">CTRL+K</span>
            </button>

            <button
              type="button"
              className={`hud-ctrl-cell mobile-menu-btn ${drawerOpen ? 'active' : ''}`}
              onClick={() => {
                cyberAudio.playClickBlip();
                setDrawerOpen((prev) => !prev);
              }}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
            >
              {drawerOpen ? <X size={17} /> : <Menu size={17} />}
            </button>

            <div ref={stickyCtaWrapRef} className="hud-sticky-cta-wrap hud-ctrl-hide-mobile">
              <a
                href="#connect"
                className="hud-sticky-cta"
                onClick={(e) => {
                  e.preventDefault();
                  cyberAudio.playClickBlip();
                  onScrollTo('connect');
                }}
              >
                <span>{UI_COPY.nav.stickyCta[lang]}</span>
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile HUD Navigation Drawer (<900px) */}
      {drawerOpen && (
        <div
          className="mobile-hud-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile HUD Navigation"
        >
          <div className="mobile-drawer-inner">
            <div className="mobile-drawer-section-label">
              // NAVIGATION_MODULES
            </div>
            <nav className="mobile-drawer-links" aria-label="Mobile sections">
              {UI_COPY.nav.links.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleMobileJump(item.id)}
                  >
                    <span className="mobile-drawer-code">{item.code}</span>
                    <span>{item.label[lang]}</span>
                    <ArrowUpRight size={14} style={{ marginLeft: 'auto' }} />
                  </button>
                );
              })}
            </nav>

            <div className="mobile-drawer-section-label">
              // THEME_PRESET &amp; PREFERENCES
            </div>
            <div className="mobile-drawer-themes">
              {THEME_ORDER.map((presetKey) => {
                const tokens = THEME_PRESETS[presetKey];
                const isSelected = theme === presetKey;
                return (
                  <button
                    key={presetKey}
                    type="button"
                    className={`mobile-theme-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      cyberAudio.playClickBlip();
                      onSelectTheme(presetKey);
                    }}
                  >
                    <span className="theme-dot" style={{ backgroundColor: tokens.primary }} />
                    <span>{tokens.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mobile-drawer-toggles">
              <button
                type="button"
                className="ghost-cta"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  cyberAudio.playClickBlip();
                  onToggleLang();
                }}
              >
                <span>LANG: {lang.toUpperCase()}</span>
              </button>

              <button
                type="button"
                className="ghost-cta"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={onToggleSound}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                <span>{soundEnabled ? 'SFX_ON' : 'SFX_OFF'}</span>
              </button>
            </div>

            <div className="mobile-drawer-actions">
              <button
                type="button"
                className="volt-cta"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  cyberAudio.playClickBlip();
                  setDrawerOpen(false);
                  onOpenResume();
                }}
              >
                <FileText size={15} />
                <span>{UI_COPY.hero.cvCta[lang]}</span>
              </button>

              <button
                type="button"
                className="ghost-cta"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  cyberAudio.playClickBlip();
                  setDrawerOpen(false);
                  onOpenPalette();
                }}
              >
                <Terminal size={15} />
                <span>{UI_COPY.hero.secondaryCta[lang]} (CTRL+K)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Desktop Side Telemetry Rails */}
      <aside className="hud-side-rail left" aria-hidden="true">
        <span className="rail-vertical-text">{PROFILE.coordinates.node}</span>
        <div className="rail-progress-track">
          <div ref={railFillLeftRef} className="rail-progress-fill" />
        </div>
        <span className="rail-vertical-text">2026 // HUD</span>
      </aside>

      <aside className="hud-side-rail right" aria-hidden="true">
        <span ref={scrollPctRef} className="rail-vertical-text">
          SCRL // 000%
        </span>
        <div className="rail-progress-track">
          <div ref={railFillRightRef} className="rail-progress-fill" />
        </div>
        <span className="rail-vertical-text">SYS_GRID</span>
      </aside>
    </>
  );
}
