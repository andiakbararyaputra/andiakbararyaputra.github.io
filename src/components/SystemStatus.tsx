import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';
import { Lang, ProjectItem, STACK_GROUPS, UI_COPY } from '../data/portfolio';
import { useGithubTelemetry } from '../hooks/useGithubTelemetry';
import { autocompleteCyberCommand, runCyberCommand } from '../utils/commands';
import { ThemePreset } from '../utils/preferences';
import { cyberAudio } from '../utils/sound';

interface SystemStatusProps {
  lang: Lang;
  theme: ThemePreset;
  soundEnabled: boolean;
  onSetLang: (next: Lang) => void;
  onSetTheme: (next: ThemePreset) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
  onReboot: () => void;
}

interface LogEntry {
  id: number;
  prompt?: string;
  lines: string[];
}

const SHELL_SHORTCUTS = ['fastfetch', 'open tonal-dots', 'log', 'theme cyan', 'cv', 'help'];

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
  theme,
  soundEnabled,
  onSetLang,
  onSetTheme,
  onSetSound,
  onScrollTo,
  onOpenProject,
  onOpenResume,
  onReboot,
}: SystemStatusProps) {
  const header = UI_COPY.systemHeader;
  const telemetry = useGithubTelemetry();

  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [history, setHistory] = useState<LogEntry[]>([
    {
      id: 0,
      lines: [
        'AAAP_LINUX_SHELL // Tab: autocomplete | Up/Down: history | Try "fastfetch" or "open tonal-dots"',
      ],
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeShellCommand = (rawInput: string) => {
    const raw = rawInput.trim();
    if (!raw) return;

    cyberAudio.playClickBlip();
    setCmdHistory((prev) => [...prev.slice(-24), raw]);
    setHistoryCursor(-1);

    const result = runCyberCommand(raw, {
      lang,
      theme,
      uptime: telemetry.uptime,
      soundEnabled,
      onSetLang,
      onSetTheme,
      onSetSound,
      onScrollTo,
      onOpenProject,
      onOpenResume,
      onReboot,
    });

    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev.slice(-16),
        { id: Date.now() + Math.random(), prompt: raw, lines: result.lines },
      ]);
    }
    setInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeShellCommand(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = autocompleteCyberCommand(input);
      if (completed !== input) {
        cyberAudio.playTerminalKey();
        setInput(completed);
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      if (cmdHistory.length === 0) return;
      e.preventDefault();
      const nextCursor =
        historyCursor === -1 ? cmdHistory.length - 1 : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextCursor);
      setInput(cmdHistory[nextCursor]);
      return;
    }

    if (e.key === 'ArrowDown') {
      if (historyCursor === -1) return;
      e.preventDefault();
      if (historyCursor >= cmdHistory.length - 1) {
        setHistoryCursor(-1);
        setInput('');
      } else {
        const nextCursor = historyCursor + 1;
        setHistoryCursor(nextCursor);
        setInput(cmdHistory[nextCursor]);
      }
    }
  };

  const fpsSegments = Math.min(20, Math.max(2, Math.round((telemetry.fps / 60) * 20)));
  const repoSegments = Math.min(20, Math.max(4, telemetry.publicRepos));

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

        {/* Right: Live Telemetry Readout + Full Linux Shell */}
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
              <span
                style={{
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(255,255,255,0.16)',
                  padding: '2px 8px',
                  fontSize: '0.68rem',
                }}
              >
                {telemetry.isLive ? 'LIVE_API' : 'CACHED_SPEC'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-secondary)' }}>RENDER_FPS</span>
                  <span style={{ color: 'var(--accent-volt)' }}>{telemetry.fps} FPS</span>
                </div>
                <SegmentedMeter filled={fpsSegments} variant="volt" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ color: 'var(--ink-secondary)' }}>GITHUB_NODE</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>
                    {telemetry.publicRepos} REPOS · {telemetry.totalStars} STARS · LAST: {telemetry.latestRepo}
                  </span>
                </div>
                <SegmentedMeter filled={repoSegments} variant="cobalt" />
              </div>

              <div
                style={{
                  marginTop: '4px',
                  padding: '8px 12px',
                  border: '1px solid var(--grid-line-bright)',
                  background: 'var(--accent-volt-dim)',
                  color: 'var(--accent-volt)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                }}
              >
                <span>● SESSION_UPTIME {telemetry.uptime}</span>
                <span>
                  THEME:{theme.toUpperCase()} · LOCALE:{lang.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Inline Linux Shell */}
          <div
            className="hud-crosshair-box"
            style={{
              background: '#050609',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: '280px',
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
                andiakbar@node-mks-08:~$
              </span>
              <span style={{ color: 'var(--ink-muted)' }}>FISH // TAB_COMPLETE</span>
            </div>

            <div className="shell-chips-bar">
              {SHELL_SHORTCUTS.map((shortcut) => (
                <button
                  key={shortcut}
                  type="button"
                  className="shell-shortcut-chip"
                  onClick={() => executeShellCommand(shortcut)}
                >
                  $ {shortcut}
                </button>
              ))}
            </div>

            <div
              ref={terminalBodyRef}
              style={{
                padding: '14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.73rem',
                lineHeight: 1.55,
                maxHeight: '210px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {history.map((entry) => (
                <div key={entry.id} style={{ marginBottom: '10px' }}>
                  {entry.prompt && (
                    <div style={{ color: 'var(--accent-volt)', fontWeight: 700 }}>
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
                onKeyDown={handleKeyDown}
                placeholder='fastfetch | open tonal-dots | cat finara | theme cyan | Tab'
                aria-label="Inline Linux shell input"
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
