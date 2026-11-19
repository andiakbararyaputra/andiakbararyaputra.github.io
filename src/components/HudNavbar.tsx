import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Terminal, Volume2, VolumeX } from 'lucide-react';
import { Lang, PROFILE, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface HudNavbarProps {
  lang: Lang;
  soundEnabled: boolean;
  onToggleLang: () => void;
  onToggleSound: () => void;
  onOpenPalette: () => void;
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
  soundEnabled,
  onToggleLang,
  onToggleSound,
  onOpenPalette,
  onScrollTo,
}: HudNavbarProps) {
  const [sysTime, setSysTime] = useState(formatUtc8Clock);
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
              onScrollTo('hero');
            }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span>{PROFILE.brandCode}</span>
          </a>

          <nav className="hud-nav-links" aria-label="Primary sections">
            {UI_COPY.nav.links.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hud-nav-link"
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
            ))}
          </nav>

          <div className="hud-nav-controls">
            <div
              className="hud-ctrl-cell hud-ctrl-label-hide-sm"
              style={{ cursor: 'default', color: 'var(--ink-secondary)' }}
              title="System Time (UTC+8)"
            >
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
              <span>{sysTime} UTC+8</span>
            </div>

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
              className={`hud-ctrl-cell ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Mute HUD audio' : 'Enable HUD audio'}
              title={soundEnabled ? 'HUD Audio: ON' : 'HUD Audio: OFF'}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span className="hud-ctrl-label-hide-sm">{soundEnabled ? 'SFX_ON' : 'SFX_OFF'}</span>
            </button>

            <button
              type="button"
              className="hud-ctrl-cell"
              onClick={() => {
                cyberAudio.playClickBlip();
                onOpenPalette();
              }}
              aria-label="Open Command Palette (Ctrl+K)"
            >
              <Terminal size={14} style={{ color: 'var(--accent-volt)' }} />
              <span>CTRL+K</span>
            </button>

            <div ref={stickyCtaWrapRef} className="hud-sticky-cta-wrap">
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
