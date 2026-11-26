import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Lang, TELEMETRY_KPIS, UI_COPY } from '../data/portfolio';

interface TelemetryBannerProps {
  lang: Lang;
}

export function TelemetryBanner({ lang }: TelemetryBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      // Animated KPI count-up on enter
      gsap.utils.toArray<HTMLElement>('.kpi-counter-val').forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.kpi-banner',
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });

      // Continuous marquee loop with scroll-velocity boost
      if (marqueeTrackRef.current) {
        const marqueeTween = gsap.to(marqueeTrackRef.current, {
          xPercent: -50,
          repeat: -1,
          duration: 24,
          ease: 'none',
        });

        gsap.to({}, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
              const vel = Math.min(3.5, Math.abs(self.getVelocity()) / 450);
              const dir = self.direction === -1 ? -1 : 1;
              gsap.to(marqueeTween, {
                timeScale: dir * (1 + vel),
                duration: 0.3,
                overwrite: true,
              });
            },
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [lang] },
  );

  const marqueeText = UI_COPY.telemetryHeader.marquee[lang];

  return (
    <section id="telemetry" ref={sectionRef}>
      <div className="kpi-banner">
        {/* Electric Cobalt KPI Panel */}
        <div className="kpi-cobalt-panel">
          {TELEMETRY_KPIS.map((kpi) => (
            <div key={kpi.label.en} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-tech)',
                  fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'var(--accent-volt)',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="kpi-counter-val" data-target={kpi.value}>
                  {kpi.value}
                </span>
                <span style={{ fontSize: '0.52em', marginLeft: '4px', color: '#f4f6fa' }}>
                  {kpi.suffix}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(244, 246, 250, 0.85)',
                }}
              >
                {kpi.label[lang]}
              </div>
            </div>
          ))}
        </div>

        {/* Acid-Volt Editorial Quote Block */}
        <div className="kpi-volt-manifesto">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
            }}
          >
            <span>/05 // TELEMETRY_NOTE</span>
            <span>● VERIFIED</span>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              fontWeight: 700,
              lineHeight: 1.55,
            }}
          >
            {UI_COPY.telemetryHeader.quote[lang]}
          </p>

          <div style={{ height: '10px', width: '100%' }} className="hazard-stripes" />
        </div>
      </div>

      {/* Scroll-Velocity Reactive Infinite Marquee */}
      <div className="marquee-bar" aria-hidden="true">
        <div ref={marqueeTrackRef} className="marquee-track">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </section>
  );
}
