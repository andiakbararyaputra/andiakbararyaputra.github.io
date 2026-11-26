export type ThemePreset = 'volt' | 'cyan' | 'crimson';
export type Lang = 'en' | 'id';

export interface ThemeTokens {
  id: ThemePreset;
  label: string;
  primary: string;
  primaryDim: string;
  secondary: string;
  cobalt: string;
  gridBright: string;
  primaryRgb: string;
  secondaryRgb: string;
}

export const THEME_PRESETS: Record<ThemePreset, ThemeTokens> = {
  volt: {
    id: 'volt',
    label: 'VOLT',
    primary: '#ccff00',
    primaryDim: 'rgba(204, 255, 0, 0.14)',
    secondary: '#00f0ff',
    cobalt: '#1d35ff',
    gridBright: 'rgba(204, 255, 0, 0.42)',
    primaryRgb: '204, 255, 0',
    secondaryRgb: '0, 240, 255',
  },
  cyan: {
    id: 'cyan',
    label: 'CYAN',
    primary: '#00f0ff',
    primaryDim: 'rgba(0, 240, 255, 0.14)',
    secondary: '#a3e635',
    cobalt: '#2563eb',
    gridBright: 'rgba(0, 240, 255, 0.42)',
    primaryRgb: '0, 240, 255',
    secondaryRgb: '163, 230, 53',
  },
  crimson: {
    id: 'crimson',
    label: 'CRIMSON',
    primary: '#ff2a5f',
    primaryDim: 'rgba(255, 42, 95, 0.15)',
    secondary: '#00f0ff',
    cobalt: '#7c3aed',
    gridBright: 'rgba(255, 42, 95, 0.44)',
    primaryRgb: '255, 42, 95',
    secondaryRgb: '0, 240, 255',
  },
};

export const THEME_ORDER: ThemePreset[] = ['volt', 'cyan', 'crimson'];

const LANG_STORAGE_KEY = 'aaap_lang';
const THEME_STORAGE_KEY = 'aaap_theme';
const BOOT_SESSION_KEY = 'aaap_booted_v2';

export function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // Ignore storage access errors in restricted contexts
  }

  try {
    const browserLang =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language ||
      'en';
    if (browserLang.toLowerCase().startsWith('id')) {
      return 'id';
    }
  } catch {
    // Fallback to English
  }

  return 'en';
}

export function persistLang(lang: Lang): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage errors
  }
  document.documentElement.lang = lang;
}

export function getInitialTheme(): ThemePreset {
  if (typeof window === 'undefined') return 'volt';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'volt' || saved === 'cyan' || saved === 'crimson') {
      return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'volt';
}

export function applyThemePreset(preset: ThemePreset): void {
  if (typeof window === 'undefined') return;
  const tokens = THEME_PRESETS[preset];
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preset);
  } catch {
    // Ignore storage errors
  }

  const root = document.documentElement;
  root.dataset.theme = preset;
  root.style.setProperty('--accent-volt', tokens.primary);
  root.style.setProperty('--accent-volt-dim', tokens.primaryDim);
  root.style.setProperty('--accent-cyan', tokens.secondary);
  root.style.setProperty('--accent-cobalt', tokens.cobalt);
  root.style.setProperty('--grid-line-bright', tokens.gridBright);
  root.style.setProperty('--accent-primary-rgb', tokens.primaryRgb);
  root.style.setProperty('--accent-secondary-rgb', tokens.secondaryRgb);
}

export function hasBootedInSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(BOOT_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function markBootedInSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(BOOT_SESSION_KEY, '1');
  } catch {
    // Ignore storage errors
  }
}

export function resetBootSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(BOOT_SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
}
