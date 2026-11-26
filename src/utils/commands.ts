import { EXPERIENCE_TIMELINE, Lang, PROFILE, PROJECTS, ProjectItem, STACK_GROUPS } from '../data/portfolio';
import { THEME_ORDER, ThemePreset } from './preferences';

export interface CommandContext {
  lang: Lang;
  theme?: ThemePreset;
  uptime?: string;
  soundEnabled: boolean;
  onSetLang: (next: Lang) => void;
  onSetTheme?: (next: ThemePreset) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
  onOpenProject?: (project: ProjectItem) => void;
  onOpenResume?: () => void;
  onReboot?: () => void;
  onCloseModal?: () => void;
}

export interface CommandOutput {
  lines: string[];
  clear?: boolean;
}

const VALID_SECTIONS = [
  'hero',
  'principles',
  'work',
  'experience',
  'telemetry',
  'system',
  'connect',
];

const COMMAND_NAMES = [
  'help',
  'whoami',
  'fastfetch',
  'neofetch',
  'projects',
  'open',
  'cat',
  'stack',
  'log',
  'goto',
  'theme',
  'lang',
  'sfx',
  'cv',
  'resume',
  'copy',
  'contact',
  'reboot',
  'clear',
];

function findProjectMatch(query?: string): ProjectItem | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  const normalizedNum = q.padStart(2, '0');
  return PROJECTS.find(
    (p) =>
      p.id.toLowerCase() === q ||
      p.number === normalizedNum ||
      p.title.toLowerCase() === q ||
      p.id.toLowerCase().startsWith(q),
  );
}

export function autocompleteCyberCommand(raw: string): string {
  const trimmed = raw.trimStart();
  if (!trimmed) return 'fastfetch';

  const hasSpace = /\s/.test(trimmed);
  if (!hasSpace) {
    const match = COMMAND_NAMES.find((cmd) => cmd.startsWith(trimmed.toLowerCase()));
    return match ? `${match} ` : raw;
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const argPrefix = (parts[1] ?? '').toLowerCase();

  let candidates: string[] = [];
  if (cmd === 'open' || cmd === 'cat') {
    candidates = PROJECTS.map((p) => p.id);
  } else if (cmd === 'theme') {
    candidates = [...THEME_ORDER];
  } else if (cmd === 'goto') {
    candidates = VALID_SECTIONS;
  } else if (cmd === 'lang') {
    candidates = ['en', 'id'];
  } else if (cmd === 'sfx' || cmd === 'sound' || cmd === 'audio') {
    candidates = ['on', 'off'];
  }

  const matchArg = candidates.find((item) => item.startsWith(argPrefix));
  if (matchArg) {
    return `${cmd} ${matchArg}`;
  }
  return raw;
}

export function runCyberCommand(raw: string, ctx: CommandContext): CommandOutput {
  const trimmed = raw.trim();
  const [cmd, arg] = trimmed.toLowerCase().split(/\s+/);

  if (!cmd) {
    return { lines: [] };
  }

  switch (cmd) {
    case 'help':
    case '?':
      return {
        lines:
          ctx.lang === 'id'
            ? [
                'PERINTAH SHELL TERSEDIA (Tekan Tab untuk autocomplete, Panah Atas/Bawah untuk riwayat):',
                '  fastfetch      -> Tampilkan profil sistem & lingkungan Linux',
                '  whoami         -> Identitas, kampus, dan lokasi node',
                '  projects       -> Daftar 9 proyek nyata GitHub',
                '  open <id>      -> Buka modal studi kasus proyek (mis. open tonal-dots)',
                '  cat <id>       -> Cetak rincian masalah & arsitektur proyek di shell',
                '  log            -> Tampilkan riwayat pengalaman & pendidikan',
                '  stack          -> Matriks teknologi yang digunakan',
                '  theme <preset> -> Ubah tema warna (volt | cyan | crimson)',
                '  goto <bagian>  -> Lompat ke hero | principles | work | experience | telemetry | system | connect',
                '  cv             -> Buka preview CV ramah ATS untuk cetak PDF',
                '  copy           -> Salin alamat email ke clipboard',
                '  lang <en|id>   -> Ubah bahasa (en / id)',
                '  sfx <on|off>   -> Aktifkan/matikan audio UI',
                '  reboot         -> Jalankan ulang urutan boot HUD',
                '  clear          -> Bersihkan layar terminal',
              ]
            : [
                'AVAILABLE SHELL COMMANDS (Tab for autocomplete, Up/Down for history):',
                '  fastfetch      -> Display Linux environment & node summary',
                '  whoami         -> Identity, campus, and node coordinates',
                '  projects       -> List all 9 verified GitHub repositories',
                '  open <id>      -> Open case study modal (e.g. open tonal-dots)',
                '  cat <id>       -> Print project problem & architecture in shell',
                '  log            -> Print experience & education timeline',
                '  stack          -> Inspect technical stack matrix',
                '  theme <preset> -> Switch accent preset (volt | cyan | crimson)',
                '  goto <section> -> Jump to hero | principles | work | experience | telemetry | system | connect',
                '  cv             -> Open printable ATS resume modal',
                '  copy           -> Copy email address to clipboard',
                '  lang <en|id>   -> Switch language (en / id)',
                '  sfx <on|off>   -> Toggle UI Web Audio synth',
                '  reboot         -> Replay HUD boot sequence',
                '  clear          -> Clear terminal buffer',
              ],
      };

    case 'fastfetch':
    case 'neofetch': {
      const activeTheme = (ctx.theme ?? 'volt').toUpperCase();
      const sessionUptime = ctx.uptime ?? '00:00:01';
      return {
        lines: [
          '   █████╗  █████╗  █████╗ ██████╗     andiakbar@node-mks-08',
          '  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗    ---------------------',
          `  ███████║███████║███████║██████╔╝    OS: CachyOS / Arch Linux`,
          `  ██╔══██║██╔══██║██╔══██║██╔═══╝     WM: Hyprland 0.57 (Lua) + Noctalia v5`,
          `  ██║  ██║██║  ██║██║  ██║██║         EDU: ${PROFILE.education.shortInstitution} (S1 TI)`,
          `  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝         THEME: ${activeTheme} // LANG: ${ctx.lang.toUpperCase()}`,
          `                                      UPTIME: ${sessionUptime} // REPOS: ${PROJECTS.length}`,
        ],
      };
    }

    case 'whoami':
      return {
        lines: [
          `USER      : ${PROFILE.fullName} (${PROFILE.handle})`,
          `CAMPUS    : ${PROFILE.education.institution} - S1 Teknik Informatika`,
          `NODE      : ${PROFILE.coordinates.node} [${PROFILE.location}]`,
          `EMAIL     : ${PROFILE.email}`,
          `FOCUS     : Full-Stack Web, Flutter Mobile, Tauri Desktop, Modular Linux (Lua)`,
        ],
      };

    case 'projects':
      return {
        lines: PROJECTS.map(
          (p) => `[${p.number}] ${p.id.padEnd(19)} :: ${p.tagline[ctx.lang]}`,
        ),
      };

    case 'open': {
      const target = findProjectMatch(arg);
      if (!target) {
        return {
          lines: [
            `[ERR] Project "${arg ?? ''}" not found. IDs: ${PROJECTS.map((p) => p.id).join(', ')}`,
          ],
        };
      }
      ctx.onCloseModal?.();
      ctx.onOpenProject?.(target);
      return {
        lines: [`[OPEN] Opening case file ${target.number} :: ${target.title} (#project=${target.id})`],
      };
    }

    case 'cat': {
      const target = findProjectMatch(arg);
      if (!target) {
        return {
          lines: [
            `[ERR] Project "${arg ?? ''}" not found. Example: cat tonal-dots`,
          ],
        };
      }
      return {
        lines: [
          `=== ${target.number} // ${target.title} (${target.status[ctx.lang]}) ===`,
          `PROBLEM : ${target.problem[ctx.lang]}`,
          `FLOW    : ${target.architecture.join(' -> ')}`,
          `METRICS : ${target.metrics[ctx.lang].join(' | ')}`,
          `STACK   : ${target.stack.join(', ')}`,
          `REPO    : ${target.repoUrl}`,
        ],
      };
    }

    case 'log':
    case 'exp':
    case 'timeline':
      return {
        lines: EXPERIENCE_TIMELINE.map(
          (item) => `[${item.code}] (${item.period[ctx.lang]}) ${item.role[ctx.lang]} @ ${item.org[ctx.lang]}`,
        ),
      };

    case 'stack':
      return {
        lines: STACK_GROUPS.map(
          (g) => `${g.label[ctx.lang]} => ${g.items.map((i) => i.name).join(' · ')}`,
        ),
      };

    case 'contact':
      return {
        lines: [
          `GITHUB   : ${PROFILE.githubUrl}`,
          `EMAIL    : ${PROFILE.email}`,
          `WEB      : ${PROFILE.portfolioUrl}`,
          `LINKEDIN : ${PROFILE.linkedinLabel[ctx.lang]}`,
          `LOCATION : ${PROFILE.location}`,
        ],
      };

    case 'copy': {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        void navigator.clipboard.writeText(PROFILE.email);
      }
      return {
        lines: [`[OK] Copied ${PROFILE.email} to clipboard.`],
      };
    }

    case 'cv':
    case 'resume': {
      ctx.onCloseModal?.();
      ctx.onOpenResume?.();
      return {
        lines: ['[OPEN] Launching ATS-ready CV preview modal...'],
      };
    }

    case 'theme': {
      const current = ctx.theme ?? 'volt';
      let next: ThemePreset;
      if (arg === 'volt' || arg === 'cyan' || arg === 'crimson') {
        next = arg;
      } else {
        const idx = THEME_ORDER.indexOf(current);
        next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
      }
      ctx.onSetTheme?.(next);
      return {
        lines: [`[OK] Accent preset switched to ${next.toUpperCase()}.`],
      };
    }

    case 'lang': {
      const target: Lang =
        arg === 'id' || arg === 'en' ? arg : ctx.lang === 'en' ? 'id' : 'en';
      ctx.onSetLang(target);
      return {
        lines: [`[OK] Interface locale switched to ${target.toUpperCase()}.`],
      };
    }

    case 'sfx':
    case 'sound':
    case 'audio': {
      const next = arg === 'on' ? true : arg === 'off' ? false : !ctx.soundEnabled;
      ctx.onSetSound(next);
      return {
        lines: [`[OK] HUD Audio Synth: ${next ? 'ONLINE' : 'MUTED'}.`],
      };
    }

    case 'goto': {
      if (arg && VALID_SECTIONS.includes(arg)) {
        ctx.onCloseModal?.();
        ctx.onScrollTo(arg);
        return { lines: [`[JUMP] Scrolling to #${arg}`] };
      }
      return {
        lines: [`[ERR] Unknown target "${arg ?? ''}". Valid: ${VALID_SECTIONS.join(', ')}`],
      };
    }

    case 'reboot': {
      ctx.onCloseModal?.();
      ctx.onReboot?.();
      return {
        lines: ['[REBOOT] Restarting AAAP_KERNEL boot sequence...'],
      };
    }

    case 'clear':
    case 'cls':
      return { lines: [], clear: true };

    default:
      return {
        lines: [`[ERR] Command "${cmd}" not recognized. Type "help" for available commands.`],
      };
  }
}
