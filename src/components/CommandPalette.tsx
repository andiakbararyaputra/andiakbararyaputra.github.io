import { FormEvent, useEffect, useRef, useState } from 'react';
import { Terminal, X } from 'lucide-react';
import { Lang } from '../data/portfolio';
import { runCyberCommand } from '../utils/commands';
import { cyberAudio } from '../utils/sound';

interface CommandPaletteProps {
  open: boolean;
  lang: Lang;
  soundEnabled: boolean;
  onClose: () => void;
  onSetLang: (next: Lang) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
}

interface PaletteEntry {
  id: number;
  prompt?: string;
  lines: string[];
}

const QUICK_COMMANDS = ['whoami', 'projects', 'stack', 'contact', 'lang', 'sfx'];

export function CommandPalette({
  open,
  lang,
  soundEnabled,
  onClose,
  onSetLang,
  onSetSound,
  onScrollTo,
}: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<PaletteEntry[]>([
    {
      id: 0,
      lines: [
        'AAAP_COMMAND_PALETTE // Connected to NODE_IDN_08',
        'Type "help" or click a quick command chip below.',
      ],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 40);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    cyberAudio.playClickBlip();
    const res = runCyberCommand(trimmed, {
      lang,
      soundEnabled,
      onSetLang,
      onSetSound,
      onScrollTo,
      onCloseModal: onClose,
    });

    if (res.clear) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev.slice(-18), { id: Date.now(), prompt: trimmed, lines: res.lines }]);
    }
    setInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    execute(input);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cyber Command Palette"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 85,
        background: 'rgba(4, 5, 8, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="chamfer-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          background: '#080a10',
          border: '1px solid rgba(204,255,0,0.52)',
          boxShadow: '0 30px 90px rgba(0,0,0,0.85)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderBottom: '1px solid var(--grid-line)',
            background: 'rgba(204,255,0,0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-volt)', fontWeight: 700 }}>
            <Terminal size={15} />
            CTRL+K // CYBER_TERMINAL
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--ink-primary)',
              padding: '3px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
            }}
          >
            <span>ESC</span>
            <X size={13} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            padding: '12px 18px',
            borderBottom: '1px solid var(--grid-line)',
          }}
        >
          {QUICK_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => execute(cmd)}
              className="tech-chip"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
            >
              $ {cmd}
            </button>
          ))}
        </div>

        <div
          style={{
            padding: '16px 18px',
            height: '250px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            lineHeight: 1.65,
          }}
        >
          {history.map((entry) => (
            <div key={entry.id} style={{ marginBottom: '12px' }}>
              {entry.prompt && (
                <div style={{ color: 'var(--accent-volt)', fontWeight: 700 }}>
                  andiakbar@node:~$ {entry.prompt}
                </div>
              )}
              {entry.lines.map((line, idx) => (
                <div key={idx} style={{ color: 'var(--ink-secondary)', whiteSpace: 'pre-wrap' }}>
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
            gap: '10px',
            padding: '12px 18px',
            borderTop: '1px solid var(--grid-line)',
            background: '#050609',
          }}
        >
          <span style={{ color: 'var(--accent-volt)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            $&gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              cyberAudio.playTerminalKey();
              setInput(e.target.value);
            }}
            placeholder='Enter command (e.g. whoami, projects, goto work, clear)...'
            aria-label="Command palette input"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--ink-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
            }}
          />
          <button type="submit" className="volt-cta" style={{ padding: '7px 14px', fontSize: '0.74rem' }}>
            EXEC
          </button>
        </form>
      </div>
    </div>
  );
}
