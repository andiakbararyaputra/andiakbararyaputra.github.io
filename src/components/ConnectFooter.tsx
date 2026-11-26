import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Lang, PROFILE, UI_COPY } from '../data/portfolio';
import { THEME_PRESETS, ThemePreset } from '../utils/preferences';
import { cyberAudio } from '../utils/sound';
import { QrMatrixSvg } from './QrMatrixSvg';

interface ConnectFooterProps {
  lang: Lang;
  theme: ThemePreset;
  onOpenResume: () => void;
}

function HypercubeCanvas({ theme }: { theme: ThemePreset }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef<ThemePreset>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId = 0;
    let t = 0.35;

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

      const tokens = THEME_PRESETS[themeRef.current];
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 96);
      grad.addColorStop(0, `rgba(${tokens.secondaryRgb}, 0.42)`);
      grad.addColorStop(0.55, `rgba(${tokens.primaryRgb}, 0.14)`);
      grad.addColorStop(1, 'rgba(6, 7, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const cosB = Math.cos(t * 0.7);
      const sinB = Math.sin(t * 0.7);

      const projected = vertices.map(([x, y, z, w]) => {
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
          idx % 4 === 0
            ? `rgba(${tokens.primaryRgb}, 0.8)`
            : `rgba(${tokens.secondaryRgb}, 0.56)`;
        ctx.lineWidth = idx % 4 === 0 ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      });

      projected.forEach((p, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? tokens.primary : tokens.secondary;
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

export function ConnectFooter({ lang, theme, onOpenResume }: ConnectFooterProps) {
  const header = UI_COPY.connectHeader;
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    cyberAudio.playClickBlip();
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

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

        {/* Center: Rotating 4D Tesseract synced to theme */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <HypercubeCanvas theme={theme} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: 'var(--ink-muted)',
            }}
          >
            4D_TESSERACT // {PROFILE.coordinates.node}
          </span>
        </div>

        {/* Right: Contact Channels, Copy Email, ATS CV & Real Scannable QR Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

          <div className="email-action-row">
            <a
              href={`mailto:${PROFILE.email}`}
              className="ghost-cta"
              style={{ flex: 1, justifyContent: 'space-between', minWidth: 0 }}
              onMouseEnter={() => cyberAudio.playHoverTick()}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                <Mail size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                {PROFILE.email}
              </span>
              <ArrowUpRight size={15} style={{ flexShrink: 0 }} />
            </a>

            <button
              type="button"
              className={`copy-email-btn chamfer-btn ${emailCopied ? 'copied' : ''}`}
              onClick={() => void handleCopyEmail()}
              aria-label="Copy email address"
            >
              {emailCopied ? <Check size={14} /> : <Copy size={14} />}
              <span>{emailCopied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>

          <button
            type="button"
            className="volt-cta"
            style={{ justifyContent: 'space-between', width: '100%' }}
            onClick={() => {
              cyberAudio.playClickBlip();
              onOpenResume();
            }}
            onMouseEnter={() => cyberAudio.playHoverTick()}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={16} />
              {UI_COPY.hero.cvCta[lang]}
            </span>
            <ArrowUpRight size={15} />
          </button>

          <div
            className="passive-channel-badge"
            aria-label="LinkedIn status pending"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Linkedin size={16} style={{ opacity: 0.5 }} />
              <span>{PROFILE.linkedinLabel[lang]}</span>
            </span>
            <span className="passive-status-tag">PENDING</span>
          </div>

          <div className="qr-card">
            <QrMatrixSvg size={88} />
            <div className="qr-card-meta">
              <div className="qr-card-label">{header.qrLabel[lang]}</div>
              <div className="qr-card-sub">
                {lang === 'id'
                  ? 'Arahkan kamera ponsel untuk membuka profil GitHub.'
                  : 'Scan with phone camera to open GitHub profile.'}
              </div>
              <div className="qr-card-code">{PROFILE.brandCode}2026</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hazard Caution Strip */}
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
            border: '1px solid var(--grid-line-bright)',
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
