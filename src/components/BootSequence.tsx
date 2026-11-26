import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cyberAudio } from '../utils/sound';
import { markBootedInSession } from '../utils/preferences';

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '[OK] MOUNTING KERNEL // AAAP_OS v2.8.0 (NODE_MKS_08)',
  '[OK] SYNCING COMPOSITOR // HYPRLAND_0.57 + NOCTALIA_V5',
  '[OK] INITIALIZING GSAP_SCROLLTRIGGER + CANVAS_RENDERER',
  '[OK] LOADING THEME TOKENS + LOCALE PREFERENCES',
  '[OK] HUD INTERFACE READY // ACCESS GRANTED_',
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const [visibleLogs, setVisibleLogs] = useState(1);

  const dismiss = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    markBootedInSession();
    cyberAudio.playClickBlip();

    if (
      !overlayRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onComplete();
      return;
    }

    overlayRef.current.style.pointerEvents = 'none';
    gsap.to(overlayRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.35,
      ease: 'power3.inOut',
      onComplete,
    });
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      markBootedInSession();
      onComplete();
      return;
    }

    const state = { pct: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        window.setTimeout(() => dismiss(), 80);
      },
    });

    tl.to(state, {
      pct: 100,
      duration: 0.82,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(state.pct);
        if (pctRef.current) pctRef.current.textContent = `${String(val).padStart(3, '0')}%`;
        if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${val / 100})`;
        const step = Math.min(BOOT_LOGS.length, Math.max(1, Math.ceil((val / 100) * BOOT_LOGS.length)));
        setVisibleLogs(step);
      },
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tl.kill();
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="HUD Boot Sequence"
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        backgroundColor: '#06070a',
        clipPath: 'inset(0 0 0% 0)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(20px, 4vw, 48px)',
        backgroundImage:
          'radial-gradient(circle at 50% 45%, rgba(29, 53, 255, 0.16), transparent 60%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 48px 48px, 48px 48px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          paddingBottom: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              background: 'var(--accent-volt)',
              color: '#06070a',
              fontWeight: 800,
              padding: '4px 10px',
            }}
          >
            AAAP_KERNEL v2.8
          </span>
          <span style={{ color: 'var(--accent-cyan)' }}>// INITIALIZING HUD...</span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="ghost-cta"
          style={{ padding: '7px 14px', fontSize: '0.74rem' }}
        >
          [ ESC // SKIP ]
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(11, 13, 19, 0.9)',
          padding: 'clamp(20px, 3.5vw, 34px)',
        }}
        className="chamfer-card"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '16px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <span style={{ color: 'var(--ink-secondary)', fontSize: '0.8rem' }}>
            &gt; SYSTEM_BOOT_SEQUENCE
          </span>
          <span
            ref={pctRef}
            style={{
              color: 'var(--accent-volt)',
              fontSize: '1.6rem',
              fontWeight: 800,
            }}
          >
            000%
          </span>
        </div>

        <div
          style={{
            width: '100%',
            height: '10px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '22px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={barFillRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-cobalt), var(--accent-cyan), var(--accent-volt))',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        <div
          ref={logsRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.85,
            minHeight: '120px',
          }}
        >
          {BOOT_LOGS.slice(0, visibleLogs).map((line) => (
            <div key={line} style={{ color: line.includes('GRANTED') ? 'var(--accent-volt)' : 'var(--ink-secondary)' }}>
              {line}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          height: '8px',
          width: '100%',
        }}
        className="hazard-stripes"
      />
    </div>
  );
}
