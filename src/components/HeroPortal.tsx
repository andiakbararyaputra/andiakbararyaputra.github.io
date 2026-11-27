import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowUpRight, FileText, Terminal } from 'lucide-react';
import { Lang, PROFILE, UI_COPY } from '../data/portfolio';
import { useScrambleText } from '../hooks/useScrambleText';
import { cyberAudio } from '../utils/sound';
import { ThemePreset } from '../utils/preferences';
import { WireframeCanvas } from './WireframeCanvas';

interface HeroPortalProps {
  lang: Lang;
  theme: ThemePreset;
  onOpenPalette: () => void;
  onOpenResume: () => void;
  onScrollTo: (sectionId: string) => void;
}

export function HeroPortal({
  lang,
  theme,
  onOpenPalette,
  onOpenResume,
  onScrollTo,
}: HeroPortalProps) {
  const pinRef = useRef<HTMLElement>(null);
  const layerOneRef = useRef<HTMLDivElement>(null);
  const layerTwoRef = useRef<HTMLDivElement>(null);
  const cobaltGlowRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const heroCopy = UI_COPY.hero;
  const voltWord = useScrambleText(heroCopy.titleVolt);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top 62px',
              end: '+=55%',
              pin: true,
              scrub: 0.35,
              fastScrollEnd: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressBarRef.current) {
                  progressBarRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          tl.to(
            layerOneRef.current,
            {
              scale: 0.9,
              yPercent: -4,
              autoAlpha: 0,
              force3D: true,
              ease: 'none',
            },
            0,
          )
            .to(
              cobaltGlowRef.current,
              {
                scale: 1.25,
                opacity: 0.8,
                force3D: true,
                ease: 'none',
              },
              0,
            )
            .fromTo(
              layerTwoRef.current,
              {
                autoAlpha: 0,
                scale: 1.04,
                pointerEvents: 'none',
                force3D: true,
              },
              {
                autoAlpha: 1,
                scale: 1,
                pointerEvents: 'auto',
                force3D: true,
                ease: 'power2.out',
              },
              0.38,
            );
        },
      );

      return () => mm.revert();
    },
    { scope: pinRef, dependencies: [] },
  );

  return (
    <section id="hero" ref={pinRef} className="hero-pin-stage">
      <div ref={cobaltGlowRef} className="hero-ambient-cobalt" aria-hidden="true" />

      {/* STAGE 1: Hero Composition */}
      <div ref={layerOneRef} className="hero-layer-one">
        <div className="hero-left-col">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
              <div className="hero-status-pill chamfer-pill">
                <span className="pulse-dot" />
                <span>{heroCopy.status[lang]}</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-muted)',
                  letterSpacing: '0.08em',
                }}
              >
                /01 // {PROFILE.handle.toUpperCase()}
              </span>
            </div>

            <h1
              className="hero-mega-title"
              onMouseEnter={() => {
                voltWord.trigger();
                cyberAudio.playHoverTick();
              }}
            >
              <span>{heroCopy.titleTop}</span>
              <span className="word-volt">{voltWord.displayText}</span>
              <span>{heroCopy.titleBottom}</span>
            </h1>

            <p className="hero-tagline">
              <strong>{PROFILE.fullName}</strong>: {heroCopy.tagline[lang]}
            </p>

            <div id="hero-cta-sentinel" className="hero-action-row">
              <button
                type="button"
                className="volt-cta"
                onClick={() => {
                  cyberAudio.playClickBlip();
                  onScrollTo('work');
                }}
                onMouseEnter={() => cyberAudio.playHoverTick()}
              >
                <span>{heroCopy.primaryCta[lang]}</span>
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>

              <button
                type="button"
                className="ghost-cta"
                onClick={() => {
                  cyberAudio.playClickBlip();
                  onOpenResume();
                }}
                onMouseEnter={() => cyberAudio.playHoverTick()}
              >
                <FileText size={15} style={{ color: 'var(--accent-cyan)' }} />
                <span>{heroCopy.cvCta[lang]}</span>
              </button>

              <button
                type="button"
                className="ghost-cta"
                onClick={() => {
                  cyberAudio.playClickBlip();
                  onOpenPalette();
                }}
                onMouseEnter={() => cyberAudio.playHoverTick()}
              >
                <Terminal size={15} style={{ color: 'var(--accent-volt)' }} />
                <span>{heroCopy.secondaryCta[lang]}</span>
              </button>
            </div>
          </div>

          <div className="hero-stamp-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg
                width="54"
                height="54"
                viewBox="0 0 100 100"
                className="circular-stamp"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="stampCircle"
                    d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                  />
                </defs>
                <circle cx="50" cy="50" r="20" fill="none" stroke="var(--grid-line-bright)" strokeWidth="1" />
                <circle cx="50" cy="50" r="4" fill="var(--accent-volt)" />
                <text
                  fill="#a2acc0"
                  fontSize="8.4"
                  fontFamily="JetBrains Mono, monospace"
                  letterSpacing="2.1"
                >
                  <textPath href="#stampCircle">
                    LINUX * SYSTEMS * WEB * MOBILE *
                  </textPath>
                </text>
              </svg>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--ink-secondary)',
                  lineHeight: 1.55,
                }}
              >
                <div style={{ color: 'var(--accent-volt)', fontWeight: 700 }}>
                  {PROFILE.coordinates.lat}° // {PROFILE.coordinates.lon}°
                </div>
                <div>{PROFILE.location}</div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                color: 'var(--ink-muted)',
                textTransform: 'uppercase',
              }}
            >
              [ {heroCopy.scrollCue[lang]} ↓ ]
            </div>
          </div>
        </div>

        {/* Right HUD Frame: Cyber Core Artwork + Theme-Synced Wireframe Canvas */}
        <div className="hero-right-col">
          <div className="hero-visual-frame hud-crosshair-box chamfer-card">
            <img
              src="/images/hero-cyber-core.jpg"
              alt="Andi Akbar Arya Putra HUD Core Artwork"
              decoding="async"
            />
            <div className="hero-holo-scan" aria-hidden="true" />

            <WireframeCanvas theme={theme} />

            {/* Top-left HUD status */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                zIndex: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                color: 'var(--accent-volt)',
                background: 'rgba(6, 7, 10, 0.78)',
                border: '1px solid rgba(255,255,255,0.16)',
                padding: '5px 10px',
              }}
            >
              &gt;NODE_MKS_08 // ONLINE
            </div>

            {/* Vertical SVG HUD Barcode on left */}
            <svg
              width="14"
              height="92"
              viewBox="0 0 14 92"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '14px',
                bottom: '44px',
                zIndex: 4,
                opacity: 0.78,
              }}
            >
              <rect y="0" width="14" height="4" fill="var(--accent-volt)" />
              <rect y="8" width="10" height="2" fill="#F4F6FA" />
              <rect y="14" width="14" height="6" fill="#F4F6FA" />
              <rect y="24" width="8" height="2" fill="var(--accent-cyan)" />
              <rect y="30" width="14" height="3" fill="#F4F6FA" />
              <rect y="37" width="12" height="8" fill="#F4F6FA" />
              <rect y="49" width="14" height="2" fill="var(--accent-volt)" />
              <rect y="55" width="9" height="5" fill="#F4F6FA" />
              <rect y="64" width="14" height="2" fill="#F4F6FA" />
              <rect y="70" width="14" height="10" fill="#F4F6FA" />
              <rect y="84" width="14" height="4" fill="var(--accent-volt)" />
            </svg>

            {/* Bottom-right Scene Tag */}
            <div
              style={{
                position: 'absolute',
                right: '14px',
                bottom: '14px',
                zIndex: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'var(--ink-secondary)',
                background: 'rgba(6, 7, 10, 0.85)',
                padding: '4px 10px',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              //SCN_01 · {PROFILE.brandCode}
            </div>
          </div>
        </div>
      </div>

      {/* STAGE 2: Pinned Chapter Reveal (System Overview) */}
      <div ref={layerTwoRef} className="hero-layer-two">
        <div className="manifesto-card hud-crosshair-box chamfer-card">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--accent-volt)',
              letterSpacing: '0.12em',
            }}
          >
            <span>{heroCopy.manifestoTag}</span>
            <span style={{ color: 'var(--accent-cyan)' }}>STATUS // SYNCED</span>
          </div>

          <h2 className="manifesto-headline">{heroCopy.manifestoHeading[lang]}</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginTop: '26px',
              paddingTop: '24px',
              borderTop: '1px solid var(--grid-line)',
            }}
          >
            <p
              style={{
                margin: 0,
                color: 'var(--ink-secondary)',
                fontSize: '1.02rem',
                lineHeight: 1.65,
              }}
            >
              {heroCopy.manifestoBody[lang]}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
              }}
            >
              {heroCopy.manifestoPoints[lang].map((point) => (
                <div
                  key={point}
                  style={{
                    padding: '10px 14px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'var(--ink-primary)',
                  }}
                >
                  <span style={{ color: 'var(--accent-volt)', marginRight: '8px' }}>&gt;</span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Pinned Scroll Progress Indicator */}
      <div className="hero-progress-track" aria-hidden="true">
        <div ref={progressBarRef} className="hero-progress-fill" />
      </div>
    </section>
  );
}
