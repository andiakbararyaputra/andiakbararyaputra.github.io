import { Lang, PROFILE, PROJECTS, STACK_GROUPS } from '../data/portfolio';

export interface CommandContext {
  lang: Lang;
  soundEnabled: boolean;
  onSetLang: (next: Lang) => void;
  onSetSound: (next: boolean) => void;
  onScrollTo: (sectionId: string) => void;
  onCloseModal?: () => void;
}

export interface CommandOutput {
  lines: string[];
  clear?: boolean;
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
                'PERINTAH TERSEDIA:',
                '  whoami         -> Profil singkat Andi Akbar Arya Putra',
                '  projects       -> Daftar repositori & showcase proyek',
                '  stack          -> Matriks teknologi & ekosistem Linux',
                '  goto <bagian>  -> Lompat ke hero | principles | work | telemetry | system | connect',
                '  lang <en|id>   -> Ubah bahasa antarmuka (en / id)',
                '  sfx <on|off>   -> Aktifkan/matikan synth audio HUD',
                '  contact        -> Tampilkan GitHub, LinkedIn & email',
                '  clear          -> Bersihkan layar terminal',
              ]
            : [
                'AVAILABLE COMMANDS:',
                '  whoami         -> Identity & focus readout',
                '  projects       -> List deployed projects & tonal-dots',
                '  stack          -> Inspect technical stack matrix',
                '  goto <section> -> Jump to hero | principles | work | telemetry | system | connect',
                '  lang <en|id>   -> Switch interface language (en / id)',
                '  sfx <on|off>   -> Toggle procedural HUD synth audio',
                '  contact        -> Display GitHub, LinkedIn & email channels',
                '  clear          -> Clear terminal buffer',
              ],
      };

    case 'whoami':
      return {
        lines: [
          `USER      : ${PROFILE.fullName} (${PROFILE.handle})`,
          `NODE      : ${PROFILE.coordinates.node} [${PROFILE.location}]`,
          `FOCUS     : Software Engineering · Modular Linux (Hyprland/Lua) · Kinetic Web`,
          `STATUS    : SYSTEM ONLINE // OPEN FOR COLLABORATION`,
        ],
      };

    case 'projects':
      return {
        lines: PROJECTS.map(
          (p) => `[${p.number}] ${p.title.padEnd(13)} :: ${p.tagline[ctx.lang]} -> ${p.repoUrl}`,
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
          `REPO     : ${PROFILE.tonalDotsUrl}`,
          `LINKEDIN : ${PROFILE.linkedinUrl}`,
          `EMAIL    : ${PROFILE.email}`,
        ],
      };

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
        lines: [`[OK] HUD Audio Synthesizer: ${next ? 'ONLINE' : 'MUTED'}.`],
      };
    }

    case 'goto': {
      const valid = ['hero', 'principles', 'work', 'telemetry', 'system', 'connect'];
      if (arg && valid.includes(arg)) {
        ctx.onCloseModal?.();
        ctx.onScrollTo(arg);
        return { lines: [`[JUMP] Navigating viewport -> #${arg}`] };
      }
      return {
        lines: [`[ERR] Unknown target "${arg ?? ''}". Valid: ${valid.join(', ')}`],
      };
    }

    case 'matrix':
      return {
        lines: [
          '01000001 01000001 01000001 01010000 :: CYBER_NODE_SYNCED',
          '>> HYPRLAND_0.57 + NOCTALIA_V5 + GSAP_SCROLLTRIGGER [READY]',
        ],
      };

    case 'clear':
    case 'cls':
      return { lines: [], clear: true };

    default:
      return {
        lines: [`[ERR] Command "${cmd}" not recognized. Type "help" for available commands.`],
      };
  }
}
