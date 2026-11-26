import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lang, PROJECTS, ProjectItem } from './data/portfolio';
import { cyberAudio } from './utils/sound';
import {
  THEME_ORDER,
  ThemePreset,
  applyThemePreset,
  getInitialLang,
  getInitialTheme,
  hasBootedInSession,
  persistLang,
  resetBootSession,
} from './utils/preferences';
import { BootSequence } from './components/BootSequence';
import { HudNavbar } from './components/HudNavbar';
import { HeroPortal } from './components/HeroPortal';
import { CorePrinciples } from './components/CorePrinciples';
import { SelectedWork } from './components/SelectedWork';
import { ExperienceLog } from './components/ExperienceLog';
import { TelemetryBanner } from './components/TelemetryBanner';
import { SystemStatus } from './components/SystemStatus';
import { CommandPalette } from './components/CommandPalette';
import { ConnectFooter } from './components/ConnectFooter';
import { ResumeModal } from './components/ResumeModal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTION_IDS = [
  'hero',
  'principles',
  'work',
  'experience',
  'telemetry',
  'system',
  'connect',
];

function resolveProjectFromHash(): ProjectItem | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.match(/^#project=([a-z0-9-]+)$/i);
  if (!match) return null;
  const id = match[1].toLowerCase();
  return PROJECTS.find((p) => p.id === id) ?? null;
}

export function App() {
  const [booted, setBooted] = useState<boolean>(() => hasBootedInSession());
  const [lang, setLang] = useState<Lang>(() => getInitialLang());
  const [theme, setTheme] = useState<ThemePreset>(() => getInitialTheme());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(() =>
    resolveProjectFromHash(),
  );
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    persistLang(lang);
  }, [lang]);

  useEffect(() => {
    applyThemePreset(theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('resume-print-open', resumeOpen);
    return () => {
      document.body.classList.remove('resume-print-open');
    };
  }, [resumeOpen]);

  useEffect(() => {
    const hasOverlay = !booted || paletteOpen || resumeOpen || activeProject !== null;
    document.body.style.overflow = hasOverlay ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [booted, paletteOpen, resumeOpen, activeProject]);

  useEffect(() => {
    const onHashChange = () => {
      setActiveProject(resolveProjectFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem | null) => {
    setActiveProject(project);
    if (typeof window === 'undefined') return;
    if (project) {
      window.history.replaceState(null, '', `#project=${project.id}`);
    } else {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }, []);

  const handleSetSound = useCallback((next: boolean) => {
    setSoundEnabled(cyberAudio.setEnabled(next));
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled(cyberAudio.toggle());
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  }, []);

  const handleCycleTheme = useCallback(() => {
    setTheme((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });
  }, []);

  const handleReboot = useCallback(() => {
    resetBootSession();
    setBooted(false);
  }, []);

  const handleScrollTo = useCallback((sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        cyberAudio.playClickBlip();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    const updateActiveSection = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      if (atBottom) {
        setActiveSection('connect');
        return;
      }

      let current = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [booted, lang]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [lang, booted]);

  useEffect(() => {
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="cyber-app">
      <div className="cyber-scanlines" aria-hidden="true" />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <HudNavbar
        lang={lang}
        theme={theme}
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        onToggleLang={handleToggleLang}
        onCycleTheme={handleCycleTheme}
        onSelectTheme={setTheme}
        onToggleSound={handleToggleSound}
        onOpenPalette={() => setPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main className="cyber-shell">
        <div className="cyber-container">
          <HeroPortal
            lang={lang}
            theme={theme}
            onOpenPalette={() => setPaletteOpen(true)}
            onOpenResume={() => setResumeOpen(true)}
            onScrollTo={handleScrollTo}
          />
          <CorePrinciples lang={lang} />
          <SelectedWork
            lang={lang}
            activeProject={activeProject}
            onSelectProject={handleSelectProject}
          />
          <ExperienceLog lang={lang} />
          <TelemetryBanner lang={lang} />
          <SystemStatus
            lang={lang}
            theme={theme}
            soundEnabled={soundEnabled}
            onSetLang={setLang}
            onSetTheme={setTheme}
            onSetSound={handleSetSound}
            onScrollTo={handleScrollTo}
            onOpenProject={handleSelectProject}
            onOpenResume={() => setResumeOpen(true)}
            onReboot={handleReboot}
          />
          <ConnectFooter
            lang={lang}
            theme={theme}
            onOpenResume={() => setResumeOpen(true)}
          />
        </div>
      </main>

      <CommandPalette
        open={paletteOpen}
        lang={lang}
        theme={theme}
        soundEnabled={soundEnabled}
        onClose={() => setPaletteOpen(false)}
        onSetLang={setLang}
        onSetTheme={setTheme}
        onSetSound={handleSetSound}
        onScrollTo={handleScrollTo}
        onOpenProject={handleSelectProject}
        onOpenResume={() => setResumeOpen(true)}
        onReboot={handleReboot}
      />

      <ResumeModal
        open={resumeOpen}
        lang={lang}
        onClose={() => setResumeOpen(false)}
        onSetLang={setLang}
      />
    </div>
  );
}

export default App;
