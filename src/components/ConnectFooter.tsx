import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { Lang, PROFILE, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';

interface ConnectFooterProps {
  lang: Lang;
}

function HypercubeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let t = 0.35;

    // 16 vertices of a 4D hypercube (tesseract)
    const vertices: [number, number, number, number][] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1,
      ]);
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff && (diff & (diff - 1)) === 0) {
          edges.push([i, j]);
        }
      }
    }

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = 230;
      if (canvas.width !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      // Cobalt core glow
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 96);
      grad.addColorStop(0, 'rgba(29, 53, 255, 0.65)');
      grad.addColorStop(0.55, 'rgba(109, 40, 217, 0.22)');
      grad.addColorStop(1, 'rgba(6, 7, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(t * 0.7);
      const sinB = Math.sin(t * 0.7);

      const projected = vertices.map(([x, y, z, w]) => {
        // Rotate XW + YZ
        const x1 = x * cosA - w * sinA;
        const w1 = x * sinA + w * cosA;
        const y1 = y * cosB - z * sinB;
        const z1 = y * sinB + z * cosB;

        const wProj = 2.4 / (3.1 - w1);
        const x3 = x1 * wProj;
        const y3 = y1 * wProj;
        const z3 = z1 * wProj;

        const zProj = 2.6 / (3.4 - z3);
        return {
          sx: cx + x3 * zProj * 46,
          sy: cy + y3 * zProj * 46,
          w: w1,
        };
      });

      edges.forEach(([a, b], idx) => {
        const p1 = projected[a];
        const p2 = projected[b];
        ctx.strokeStyle =
          idx % 4 === 0 ? 'rgba(204, 255, 0, 0.75)' : 'rgba(0, 240, 255, 0.52)';
        ctx.lineWidth = idx % 4 === 0 ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      });

      projected.forEach((p, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? '#CCFF00' : '#00F0FF';
        ctx.fillRect(p.sx - 2, p.sy - 2, 4, 4);
      });

      if (!reduced) {
        t += 0.012;
        animId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={230}
      height={230}
      aria-hidden="true"
      style={{ width: '230px', height: '230px', margin: '0 auto' }}
    />
  );
}

export function ConnectFooter({ lang }: ConnectFooterProps) {
  const header = UI_COPY.connectHeader;

  return (
    <footer id="connect">
      <div className="connect-grid">
        {/* Left: Call to action */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="section-index-tag" style={{ marginBottom: 0 }}>
            {header.tag}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.6vw, 3.1rem)',
              fontWeight: 800,
              lineHeight: 0.98,
            }}
          >
            {header.title[lang].split(' ')[0]}{' '}
            <span style={{ color: 'var(--accent-volt)' }}>
              {header.title[lang].split(' ').slice(1).join(' ') || 'NODE_'}
            </span>
          </h2>
          <p style={{ margin: 0, color: 'var(--ink-secondary)', lineHeight: 1.6, fontSize: '0.94rem' }}>
            {header.subtitle[lang]}
          </p>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--ink-muted)' }}>
            BASED IN {PROFILE.location.toUpperCase()}
          </div>
        </div>

        {/* Center: Rotating 4D Cobalt/Volt Hypercube */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <HypercubeCanvas />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: 'var(--ink-muted)',
            }}
          >
            4D_TESSERACT // LIVE_NODE
          </span>
        </div>

        {/* Right: Contact Channels + HUD Matrix Badge */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="ghost-cta"
            style={{ justifyContent: 'space-between', width: '100%' }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Github size={16} style={{ color: 'var(--accent-volt)' }} />
              github.com/andiakbararyaputra
            </span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={`mailto:${PROFILE.email}`}
            className="ghost-cta"
            style={{ justifyContent: 'space-between', width: '100%' }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={16} style={{ color: 'var(--accent-cyan)' }} />
              {PROFILE.email}
            </span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="ghost-cta"
            style={{ justifyContent: 'space-between', width: '100%' }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Linkedin size={16} style={{ color: 'var(--accent-volt)' }} />
              linkedin.com/in/andiakbararyaputra
            </span>
            <ArrowUpRight size={15} />
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'var(--accent-volt)',
              color: '#06070a',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            <span>{header.qrLabel[lang]}</span>
            <span>{PROFILE.brandCode}2026</span>
          </div>
        </div>
      </div>

      {/* Bottom Acid-Volt Hazard Caution Strip */}
      <div
        className="hazard-stripes"
        style={{
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid var(--grid-line)',
        }}
      >
        <div
          style={{
            background: '#06070a',
            border: '1px solid rgba(204,255,0,0.45)',
            padding: '6px 18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.76rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--accent-volt)',
            textAlign: 'center',
          }}
        >
          {header.footerStrip}
        </div>
      </div>
    </footer>
  );
}
