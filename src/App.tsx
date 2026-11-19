import { useCallback, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lang } from './data/portfolio';
import { cyberAudio } from './utils/sound';
import { BootSequence } from './components/BootSequence';
import { HudNavbar } from './components/HudNavbar';
import { HeroPortal } from './components/HeroPortal';
import { CorePrinciples } from './components/CorePrinciples';
import { SelectedWork } from './components/SelectedWork';
import { TelemetryBanner } from './components/TelemetryBanner';
import { SystemStatus } from './components/SystemStatus';
import { CommandPalette } from './components/CommandPalette';
import { ConnectFooter } from './components/ConnectFooter';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function App() {
  const [booted, setBooted] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const handleSetSound = useCallback((next: boolean) => {
    setSoundEnabled(cyberAudio.setEnabled(next));
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled(cyberAudio.toggle());
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  }, []);

  const handleScrollTo = useCallback((sectionId: string) => {
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
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => window.clearTimeout(timer);
  }, [lang, booted]);

  return (
    <div className="cyber-app">
      <div className="cyber-scanlines" aria-hidden="true" />

      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <HudNavbar
        lang={lang}
        soundEnabled={soundEnabled}
        onToggleLang={handleToggleLang}
        onToggleSound={handleToggleSound}
        onOpenPalette={() => setPaletteOpen(true)}
        onScrollTo={handleScrollTo}
      />

      <main className="cyber-shell">
        <div className="cyber-container">
          <HeroPortal
            lang={lang}
            onOpenPalette={() => setPaletteOpen(true)}
            onScrollTo={handleScrollTo}
          />
          <CorePrinciples lang={lang} />
          <SelectedWork lang={lang} />
          <TelemetryBanner lang={lang} />
          <SystemStatus
            lang={lang}
            soundEnabled={soundEnabled}
            onSetLang={setLang}
            onSetSound={handleSetSound}
            onScrollTo={handleScrollTo}
          />
          <ConnectFooter lang={lang} />
        </div>
      </main>

      <CommandPalette
        open={paletteOpen}
        lang={lang}
        soundEnabled={soundEnabled}
        onClose={() => setPaletteOpen(false)}
        onSetLang={setLang}
        onSetSound={handleSetSound}
        onScrollTo={handleScrollTo}
      />
    </div>
  );
}

export default App;
