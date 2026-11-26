import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Compass,
  Copy,
  FileText,
  FolderGit2,
  Globe,
  Palette,
  RotateCcw,
  Search,
  Volume2,
  X,
} from 'lucide-react';
import { Lang, PROFILE, PROJECTS, ProjectItem, UI_COPY } from '../data/portfolio';
import { cyberAudio } from '../utils/sound';
import { THEME_ORDER, THEME_PRESETS, ThemePreset } from '../utils/preferences';

interface CommandPaletteProps {
  open: boolean;
  lang: Lang;
  theme: ThemePreset;
  soundEnabled: boolean;
  onClose: () => void;
  onSetLang: (next: Lang) => void;
  onSetTheme: (next: ThemePreset) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenProject: (project: ProjectItem) => void;
  onOpenResume: () => void;
  onReboot: () => void;
}

type LauncherGroup = 'Projects' | 'Navigation' | 'Theme & System' | 'Resume & Contact';

interface LauncherItem {
  id: string;
  group: LauncherGroup;
  title: string;
  subtitle: string;
  keywords: string;
  badge?: string;
  icon: ReactNode;
  keepOpen?: boolean;
  action: () => void;
}

export function CommandPalette({
  open,
  lang,
  theme,
  soundEnabled,
  onClose,
  onSetLang,
  onSetTheme,
  onSetSound,
  onScrollTo,
  onOpenProject,
  onOpenResume,
  onReboot,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActiveIndex(0);
    setFeedback(null);
    window.setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  const items = useMemo<LauncherItem[]>(() => {
    const resumeAndContact: LauncherItem[] = [
      {
        id: 'action-cv',
        group: 'Resume & Contact',
        title: lang === 'id' ? 'Lihat / Cetak CV (Ramah ATS)' : 'View / Print ATS Resume (CV)',
        subtitle: `${PROFILE.fullName} - ${PROFILE.education.shortInstitution}`,
        keywords: 'cv resume pdf print ats curriculum vitae',
        badge: 'PDF',
        icon: <FileText size={15} style={{ color: 'var(--accent-cyan)' }} />,
        action: () => onOpenResume(),
      },
      {
        id: 'action-copy-email',
        group: 'Resume & Contact',
        title: lang === 'id' ? 'Salin Alamat Email' : 'Copy Email Address',
        subtitle: PROFILE.email,
        keywords: 'email mail contact copy gmail',
        badge: 'COPY',
        keepOpen: true,
        icon: <Copy size={15} style={{ color: 'var(--accent-volt)' }} />,
        action: () => {
          if (navigator.clipboard?.writeText) {
            void navigator.clipboard.writeText(PROFILE.email);
          }
          setFeedback(lang === 'id' ? `Email disalin: ${PROFILE.email}` : `Copied: ${PROFILE.email}`);
        },
      },
      {
        id: 'action-github',
        group: 'Resume & Contact',
        title: 'GitHub Profile',
        subtitle: PROFILE.githubUrl,
        keywords: 'github profile repos open source',
        badge: 'EXT',
        icon: <ArrowUpRight size={15} style={{ color: 'var(--accent-volt)' }} />,
        action: () => {
          window.open(PROFILE.githubUrl, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    const projectItems: LauncherItem[] = PROJECTS.map((project) => ({
      id: `proj-${project.id}`,
      group: 'Projects',
      title: `${project.number} // ${project.title}`,
      subtitle: project.tagline[lang],
      keywords: `${project.id} ${project.title} ${project.stack.join(' ')} ${project.code}`,
      badge: 'CASE',
      icon: <FolderGit2 size={15} style={{ color: 'var(--accent-volt)' }} />,
      action: () => onOpenProject(project),
    }));

    const navItems: LauncherItem[] = UI_COPY.nav.links.map((link) => ({
      id: `nav-${link.id}`,
      group: 'Navigation',
      title: `${link.code} ${link.label[lang]}`,
      subtitle: lang === 'id' ? `Lompat ke seksi #${link.id}` : `Jump to #${link.id} section`,
      keywords: `goto jump scroll ${link.id} ${link.label.en} ${link.label.id}`,
      badge: 'JUMP',
      icon: <Compass size={15} style={{ color: 'var(--accent-cyan)' }} />,
      action: () => onScrollTo(link.id),
    }));

    const themeItems: LauncherItem[] = THEME_ORDER.map((presetKey) => {
      const tokens = THEME_PRESETS[presetKey];
      const isCurrent = theme === presetKey;
      return {
        id: `theme-${presetKey}`,
        group: 'Theme & System',
        title: `${lang === 'id' ? 'Tema Warna' : 'Theme Preset'}: ${tokens.label}`,
        subtitle: `${tokens.primary} / ${tokens.secondary}`,
        keywords: `theme color accent ${presetKey} ${tokens.label}`,
        badge: isCurrent ? 'ACTIVE' : 'SET',
        keepOpen: true,
        icon: <Palette size={15} style={{ color: tokens.primary }} />,
        action: () => {
          onSetTheme(presetKey);
          setFeedback(`Theme -> ${tokens.label}`);
        },
      };
    });

    const systemItems: LauncherItem[] = [
      {
        id: 'sys-lang',
        group: 'Theme & System',
        title: lang === 'id' ? 'Ganti Bahasa ke English (EN)' : 'Switch Language to Bahasa Indonesia (ID)',
        subtitle: `Current locale: ${lang.toUpperCase()}`,
        keywords: 'lang language bahasa indonesia english en id',
        badge: lang.toUpperCase(),
        keepOpen: true,
        icon: <Globe size={15} style={{ color: 'var(--accent-cyan)' }} />,
        action: () => {
          const next = lang === 'en' ? 'id' : 'en';
          onSetLang(next);
          setFeedback(`Locale -> ${next.toUpperCase()}`);
        },
      },
      {
        id: 'sys-sfx',
        group: 'Theme & System',
        title: soundEnabled ? 'Mute HUD Audio Synth' : 'Enable HUD Audio Synth',
        subtitle: soundEnabled ? 'Audio currently active' : 'Audio currently muted',
        keywords: 'sfx sound audio mute synth',
        badge: soundEnabled ? 'ON' : 'OFF',
        keepOpen: true,
        icon: <Volume2 size={15} style={{ color: 'var(--accent-volt)' }} />,
        action: () => {
          const next = !soundEnabled;
          onSetSound(next);
          setFeedback(`Audio -> ${next ? 'ON' : 'OFF'}`);
        },
      },
      {
        id: 'sys-reboot',
        group: 'Theme & System',
        title: lang === 'id' ? 'Putar Ulang Boot Sequence' : 'Replay Boot Sequence',
        subtitle: 'AAAP_KERNEL v2.8 boot overlay',
        keywords: 'reboot restart boot kernel animation',
        badge: 'EXEC',
        icon: <RotateCcw size={15} style={{ color: 'var(--accent-cyan)' }} />,
        action: () => onReboot(),
      },
    ];

    return [...resumeAndContact, ...projectItems, ...navItems, ...themeItems, ...systemItems];
  }, [
    lang,
    theme,
    soundEnabled,
    onOpenResume,
    onOpenProject,
    onScrollTo,
    onSetTheme,
    onSetLang,
    onSetSound,
    onReboot,
  ]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const triggerItem = useCallback(
    (item: LauncherItem) => {
      cyberAudio.playClickBlip();
      item.action();
      if (!item.keepOpen) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (filteredItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[activeIndex];
        if (selected) {
          triggerItem(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, filteredItems, activeIndex, onClose, triggerItem]);

  if (!open) return null;

  const groupedOrder: LauncherGroup[] = [
    'Projects',
    'Resume & Contact',
    'Navigation',
    'Theme & System',
  ];

  let flatIndexCounter = -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Noctalia Quick Launcher"
      onClick={onClose}
      className="launcher-backdrop"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="launcher-modal chamfer-card"
      >
        {/* Top Launcher Search Input */}
        <div className="launcher-search-bar">
          <Search size={16} style={{ color: 'var(--accent-volt)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              cyberAudio.playTerminalKey();
              setQuery(e.target.value);
            }}
            placeholder={
              lang === 'id'
                ? 'Cari proyek, seksi, tema, atau CV... (Panah Atas/Bawah + Enter)'
                : 'Search projects, sections, themes, or CV... (Up/Down + Enter)'
            }
            aria-label="Quick Launcher search input"
            className="launcher-input"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close launcher"
            className="modal-hud-btn"
          >
            <span>ESC</span>
            <X size={13} />
          </button>
        </div>

        {/* Live Feedback Strip */}
        {feedback && (
          <div className="launcher-feedback">
            &gt; {feedback}
          </div>
        )}

        {/* Grouped Interactive Launcher List */}
        <div className="launcher-list" role="listbox" aria-label="Launcher actions">
          {filteredItems.length === 0 ? (
            <div className="launcher-empty">
              {lang === 'id'
                ? `Tidak ada perintah atau proyek untuk "${query}".`
                : `No matching actions or projects for "${query}".`}
            </div>
          ) : (
            groupedOrder.map((groupName) => {
              const groupItems = filteredItems.filter((item) => item.group === groupName);
              if (groupItems.length === 0) return null;

              return (
                <div key={groupName} className="launcher-group">
                  <div className="launcher-group-title">{groupName}</div>
                  {groupItems.map((item) => {
                    flatIndexCounter += 1;
                    const idx = flatIndexCounter;
                    const isActive = idx === activeIndex;

                    return (
                      <button
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[idx] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        className={`launcher-item ${isActive ? 'active' : ''}`}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => triggerItem(item)}
                      >
                        <span className="launcher-item-icon">{item.icon}</span>
                        <span className="launcher-item-copy">
                          <span className="launcher-item-title">{item.title}</span>
                          <span className="launcher-item-sub">{item.subtitle}</span>
                        </span>
                        {item.badge && (
                          <span className="launcher-item-badge">{item.badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Keybind Legend */}
        <div className="launcher-footer">
          <span>[↑/↓] SELECT</span>
          <span>[ENTER] RUN</span>
          <span>[ESC] CLOSE</span>
          <span style={{ marginLeft: 'auto', color: 'var(--accent-cyan)' }}>
            NOCTALIA_LAUNCHER // NODE_MKS_08
          </span>
        </div>
      </div>
    </div>
  );
}
