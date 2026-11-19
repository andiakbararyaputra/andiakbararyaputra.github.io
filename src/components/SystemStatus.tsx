import { FormEvent, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import { Lang, STACK_GROUPS, UI_COPY } from '../data/portfolio';
import { runCyberCommand } from '../utils/commands';
import { cyberAudio } from '../utils/sound';

interface SystemStatusProps {
  lang: Lang;
  soundEnabled: boolean;
  onSetLang: (next: Lang) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
}

interface LogEntry {
  id: number;
  prompt?: string;
  lines: string[];
}

function SegmentedMeter({ filled, variant = 'volt' }: { filled: number; variant?: 'volt' | 'cobalt' }) {
  return (
    <div className="segmented-meter" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, idx) => (
        <span
          key={idx}
          className={`meter-seg ${idx < filled ? (variant === 'cobalt' ? 'cobalt' : 'filled') : ''}`}
        />
      ))}
    </div>
  );
}

export function SystemStatus({
  lang,
  soundEnabled,
  onSetLang,
  onSetSound,
  onScrollTo,
}: SystemStatusProps) {
  const header = UI_COPY.systemHeader;
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: 0,
      lines: [
        'AAAP_CYBER_NODE v2.6 // Type "help", "whoami", "projects", or "stack"',
      ],
    },
  ]);
  const outputEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    cyberAudio.playClickBlip();
    const result = runCyberCommand(raw, {
      lang,
      soundEnabled,
      onSetLang,
      onSetSound,
      onScrollTo,
    });

    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev.slice(-14),
        { id: Date.now(), prompt: raw, lines: result.lines },
      ]);
    }
    setInput('');
    window.setTimeout(() => {
      outputEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 30);
  };

  return (
    <section id="system">
      <div className="section-header-bar">
        <div>
          <div className="section-index-tag">{header.tag}</div>
          <h2 className="section-title">{header.title[lang]}</h2>
        </div>
        <p className="section-subtitle">{header.subtitle[lang]}</p>
      </div>

      <div className="system-bento">
        {/* Left: Tech Stack Matrix */}
        <div className="stack-panel">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {STACK_GROUPS.map((group) => (
              <div key={group.id}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: 'var(--accent-volt)',
                    marginBottom: '12px',
                  }}
                >
                  {group.label[lang]}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="tech-chip chamfer-btn"
                      onMouseEnter={() => cyberAudio.playHoverTick()}
                    >
                      <span>{item.name}</span>
                      <span
                        style={{
                          fontSize: '0.64rem',
                          color: 'var(--ink-muted)',
                          borderLeft: '1px solid rgba(255,255,255,0.14)',
                          paddingLeft: '7px',
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Segmented System Diagnostics + Inline Cyber Terminal */}
        <div className="diagnostics-panel">
          <div
            className="hud-crosshair-box"
            style={{
              padding: '20px',
              background: 'var(--bg-panel)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 700,
              }}
            >
              <span>{header.statusTitle[lang]}</span>
              <span style={{ color: 'var(--accent-cyan)' }}>HYPRLAND_0.57</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-secondary)' }}>CPU_ALLOC</span>
                  <span style={{ color: 'var(--accent-volt)' }}>73%</span>
                </div>
                <SegmentedMeter filled={15} variant="volt" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-secondary)' }}>MEM_STREAM</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>6.4 GB / 16 GB</span>
                </div>
                <SegmentedMeter filled={11} variant="cobalt" />
              </div>

              <div
                style={{
                  marginTop: '6px',
                  padding: '8px 12px',
                  border: '1px solid rgba(204,255,0,0.38)',
                  background: 'rgba(204,255,0,0.06)',
                  color: 'var(--accent-volt)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>● {header.operational[lang]}</span>
                <span>UPTIME 99.9%</span>
              </div>
            </div>
          </div>

          {/* Live Inline Cyber Terminal */}
          <div
            className="hud-crosshair-box"
            style={{
              background: '#050609',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: '230px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderBottom: '1px solid var(--grid-line)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--ink-secondary)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                <Terminal size={13} style={{ color: 'var(--accent-volt)' }} />
                andiakbar@cyber-node:~$
              </span>
              <span style={{ color: 'var(--ink-muted)' }}>INLINE_SHELL</span>
            </div>

            <div
              style={{
                padding: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                lineHeight: 1.6,
                maxHeight: '180px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {history.map((entry) => (
                <div key={entry.id} style={{ marginBottom: '10px' }}>
                  {entry.prompt && (
                    <div style={{ color: 'var(--accent-volt)' }}>
                      $ {entry.prompt}
                    </div>
                  )}
                  {entry.lines.map((line, i) => (
                    <div key={i} style={{ color: 'var(--ink-secondary)', whiteSpace: 'pre-wrap' }}>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={outputEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderTop: '1px solid var(--grid-line)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-volt)', fontSize: '0.8rem' }}>
                &gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  cyberAudio.playTerminalKey();
                  setInput(e.target.value);
                }}
                placeholder='help | whoami | projects | lang id'
                aria-label="Inline cyber terminal input"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--ink-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'var(--accent-volt)',
                  color: '#06070a',
                  border: 'none',
                  padding: '4px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                }}
              >
                RUN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
