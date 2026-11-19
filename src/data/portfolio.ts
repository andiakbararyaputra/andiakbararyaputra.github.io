export type Lang = 'en' | 'id';

export interface PrincipleItem {
  id: string;
  code: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  icon: 'cube' | 'grid' | 'zap' | 'cpu';
}

export interface ProjectItem {
  id: string;
  number: string;
  code: string;
  title: string;
  category: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  stack: string[];
  image: string;
  secondaryImage?: string;
  repoUrl: string;
  liveUrl?: string;
  status: Record<Lang, string>;
  isRealProject?: boolean;
}

export interface StackGroup {
  id: string;
  label: Record<Lang, string>;
  items: { name: string; tag: string }[];
}

export interface TelemetryKpi {
  value: number;
  suffix: string;
  label: Record<Lang, string>;
}

export const PROFILE = {
  brandCode: 'AAAP_',
  fullName: 'Andi Akbar Arya Putra',
  handle: '@andiakbararyaputra',
  email: 'andiakbar@cyber-node.dev',
  githubUrl: 'https://github.com/andiakbararyaputra',
  linkedinUrl: 'https://linkedin.com/in/andiakbararyaputra',
  tonalDotsUrl: 'https://github.com/andiakbararyaputra/tonal-dots',
  location: 'Indonesia // UTC+8',
  coordinates: {
    lat: '-5.1477',
    lon: '119.4327',
    node: 'NODE_IDN_08',
  },
};

export const UI_COPY = {
  nav: {
    links: [
      { id: 'hero', code: '/01', label: { en: 'INIT', id: 'BERANDA' } },
      { id: 'principles', code: '/02', label: { en: 'ETHOS', id: 'PRINSIP' } },
      { id: 'work', code: '/03', label: { en: 'WORK', id: 'PROYEK' } },
      { id: 'telemetry', code: '/04', label: { en: 'METRICS', id: 'METRIK' } },
      { id: 'system', code: '/05', label: { en: 'SYSTEM', id: 'SISTEM' } },
      { id: 'connect', code: '/06', label: { en: 'LINK', id: 'KONTAK' } },
    ],
    stickyCta: { en: "LET'S TALK", id: 'HUBUNGI SAYA' },
    terminalBtn: { en: 'CLI', id: 'CLI' },
  },
  hero: {
    status: {
      en: 'SYSTEM ONLINE // OPEN FOR COLLABORATION',
      id: 'SISTEM AKTIF // TERBUKA UNTUK KOLABORASI',
    },
    titleTop: 'CODE',
    titleVolt: 'BEYOND',
    titleBottom: 'LIMITS',
    tagline: {
      en: 'Software Engineering, Linux & Systems Customization, and Kinetic Web Interfaces crafted with modular precision.',
      id: 'Rekayasa Perangkat Lunak, Kustomisasi Sistem Linux, dan Antarmuka Web Kinetik yang dibangun secara modular.',
    },
    primaryCta: { en: 'EXPLORE WORK', id: 'LIHAT PROYEK' },
    secondaryCta: { en: 'OPEN TERMINAL', id: 'BUKA TERMINAL' },
    scrollCue: { en: 'SCROLL TO INITIALIZE', id: 'GULIR UNTUK MEMULAI' },
    manifestoTag: '// 01.B_SYSTEM_MANIFESTO',
    manifestoHeading: {
      en: "THE FUTURE ISN'T MINIMAL. IT'S SYSTEMATIC.",
      id: 'MASA DEPAN BUKAN SEKADAR MINIMAL. IA SISTEMATIS.',
    },
    manifestoBody: {
      en: "I'm Andi Akbar Arya Putra (@andiakbararyaputra). Whether configuring a modular Lua Hyprland compositor or architecting high-speed TypeScript web interfaces, I treat every codebase like a living system: fast, observable, and resilient by design.",
      id: 'Saya Andi Akbar Arya Putra (@andiakbararyaputra). Baik saat merancang konfigurasi Hyprland berbasis Lua yang modular maupun membangun aplikasi web TypeScript berkinerja tinggi, setiap baris kode dirancang cepat, terukur, dan mudah dirawat.',
    },
    manifestoPoints: {
      en: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, React, GSAP, Python, Node.js, Lua',
        'MISSION: Modular tools & expressive engineering',
      ],
      id: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, React, GSAP, Python, Node.js, Lua',
        'MISI: Perkakas modular & rekayasa perangkat lunak ekspresif',
      ],
    },
  },
  principlesHeader: {
    tag: '/02 // CORE_PRINCIPLES',
    title: { en: 'ENGINEERING PROTOCOLS', id: 'PROTOKOL REKAYASA' },
    subtitle: {
      en: 'Four structural axioms guiding every repository, interface, and system configuration I ship.',
      id: 'Empat prinsip struktural yang menjadi fondasi setiap repositori, antarmuka, dan konfigurasi sistem.',
    },
  },
  workHeader: {
    tag: '/03 // SELECTED_WORK',
    title: { en: 'DEPLOYED SYSTEMS & CASE FILES', id: 'SISTEM TERPASANG & STUDI KASUS' },
    subtitle: {
      en: 'Featuring tonal-dots (live Linux desktop ecosystem) alongside modular web, backend, and AI architecture concepts.',
      id: 'Menampilkan tonal-dots (ekosistem desktop Linux nyata) bersama konsep arsitektur web, backend, dan AI modular.',
    },
    inspectSpecs: { en: 'VIEW_SPECS', id: 'LIHAT_DETAIL' },
    openRepo: { en: 'SOURCE_CODE', id: 'KODE_SUMBER' },
    livePreview: { en: 'LIVE_DEMO', id: 'DEMO_LANGSUNG' },
  },
  telemetryHeader: {
    quote: {
      en: '"GOOD ARCHITECTURE IS INVISIBLE UNTIL YOU MEASURE IT; GREAT INTERFACES FEEL ALIVE THE MOMENT YOU MOVE."',
      id: '"ARSITEKTUR YANG BAIK TERASA RINGAN SAAT DIJALANKAN; ANTARMUKA YANG HEBAT TERASA HIDUP SAAT DISENTUH."',
    },
    marquee: {
      en: 'LET’S BUILD THE FUTURE TOGETHER  ★  MODULAR ARCHITECTURE  ★  HYPRLAND + LUA  ★  GSAP KINETIC WEB  ★  OPEN FOR COLLABORATION  ★',
      id: 'MARI BANGUN MASA DEPAN BERSAMA  ★  ARSITEKTUR MODULAR  ★  HYPRLAND + LUA  ★  WEB KINETIK GSAP  ★  TERBUKA UNTUK KOLABORASI  ★',
    },
  },
  systemHeader: {
    tag: '/05 // TECH_STACK & DIAGNOSTICS',
    title: { en: 'ACTIVE MATRIX & LIVE CONSOLE', id: 'MATRIKS TEKNOLOGI & KONSOL AKTIF' },
    subtitle: {
      en: 'Inspect installed capabilities or execute commands directly inside the embedded cyber-node terminal.',
      id: 'Telusuri daftar keahlian atau jalankan perintah langsung melalui terminal cyber-node di bawah ini.',
    },
    statusTitle: { en: 'SYSTEM STATUS', id: 'STATUS SISTEM' },
    operational: { en: 'ALL SYSTEMS OPERATIONAL', id: 'SELURUH SISTEM OPTIMAL' },
  },
  connectHeader: {
    tag: '/06 // INITIALIZE_CONNECTION',
    title: { en: "LET'S CONNECT", id: 'TERHUBUNG' },
    subtitle: {
      en: 'Open for software engineering roles, technical collaborations, and ambitious open-source builds.',
      id: 'Terbuka untuk peluang Software Engineer, kolaborasi teknis, dan proyek open-source berdampak.',
    },
    qrLabel: { en: 'SCAN // GITHUB PROFILE', id: 'PINDAI // PROFIL GITHUB' },
    footerStrip: '> ACCESS GRANTED_ // ANDI AKBAR ARYA PUTRA // NODE_IDN_08',
  },
};

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'modular',
    code: 'PR-01',
    icon: 'cube',
    title: { en: 'MODULAR BY DEFAULT', id: 'MODULAR SECARA BAWAAN' },
    summary: {
      en: 'One concern per module. Just like tonal-dots splits Hyprland into clean Lua files, software stays maintainable when decoupled.',
      id: 'Satu tanggung jawab per modul. Seperti konfigurasi Lua modular pada tonal-dots, kode tetap mudah dirawat saat terpisah rapi.',
    },
  },
  {
    id: 'systems',
    code: 'PR-02',
    icon: 'grid',
    title: { en: 'SYSTEMS THINKING', id: 'BERPIKIR SISTEMATIS' },
    summary: {
      en: 'IPC buses, reproducible dotfiles, and state pipelines work harmoniously when interfaces and data flow are explicit.',
      id: 'Alur data, jalur IPC, dan konfigurasi yang dapat direproduksi berjalan selaras saat kontrak sistem didefinisikan tegas.',
    },
  },
  {
    id: 'kinetic',
    code: 'PR-03',
    icon: 'zap',
    title: { en: 'KINETIC CLARITY', id: 'KEJELASAN KINETIK' },
    summary: {
      en: 'GSAP timelines and HUD cues guide attention at 60fps without sacrificing contrast, legibility, or reduced-motion access.',
      id: 'Animasi GSAP dan elemen HUD mengarahkan fokus pada 60fps tanpa mengorbankan keterbacaan maupun aksesibilitas.',
    },
  },
  {
    id: 'perf',
    code: 'PR-04',
    icon: 'cpu',
    title: { en: 'ZERO-BLOAT SPEED', id: 'PERFORMA TANPA BEBAN' },
    summary: {
      en: 'GPU-composited transforms, lightweight Web Audio synthesis, and lean bundles keep interactions instant on any device.',
      id: 'Transformasi terakselerasi GPU, sintesis audio ringan, dan bundel ringkas menjaga interaksi tetap instan di berbagai perangkat.',
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'tonal-dots',
    number: '01',
    code: 'SYS // DESKTOP_OS',
    title: 'TONAL_DOTS',
    category: {
      en: 'LINUX COMPOSITOR & LUA ECOSYSTEM',
      id: 'EKOSISTEM COMPOSITOR LINUX & LUA',
    },
    tagline: {
      en: 'Modular Hyprland 0.57 (Lua) + Noctalia v5 shell themed dynamically via Material 3 tonal spots.',
      id: 'Lingkungan desktop Hyprland 0.57 (Lua) modular + shell Noctalia v5 dengan tema Material 3 otomatis dari wallpaper.',
    },
    description: {
      en: 'A production CachyOS/Arch Linux desktop environment built around clean separation of concerns: modular Lua Hyprland configs, dynamic D-Bus & MPRIS auto-Picture-in-Picture window orchestration, translucent Kvantum/Qt styling, and a custom Desk Clock notification plugin.',
      id: 'Lingkungan desktop CachyOS/Arch Linux yang dirancang dengan pemisahan modul bersih: konfigurasi Hyprland berbasis Lua, orkestrasi auto-PiP pintar via D-Bus & MPRIS, tema kaca Kvantum/Qt, serta plugin Desk Clock notifikasi kustom.',
    },
    highlights: {
      en: [
        'One-file-per-concern Lua architecture under config/hypr/config/',
        'Automated D-Bus + systemd busctl PiP tracker that resizes dynamically by workspace occupancy',
        'Custom Noctalia Desk Clock plugin syncing unread app badges with top bar widgets',
        'Non-destructive symlink installer with timestamped rollback backups (--dry-run / --only)',
      ],
      id: [
        'Arsitektur Lua satu berkas per fungsi di config/hypr/config/',
        'Pelacak auto-PiP via D-Bus & systemd busctl yang menyesuaikan ukuran jendela otomatis',
        'Plugin Desk Clock Noctalia kustom yang menyinkronkan notifikasi aplikasi ke bar atas',
        'Skrip installer symlink aman dengan cadangan otomatis bertimestamp (--dry-run / --only)',
      ],
    },
    stack: ['Lua', 'Hyprland 0.57', 'Noctalia v5', 'D-Bus', 'Fish Shell', 'Kvantum'],
    image: '/images/tonal-dots-main.png',
    secondaryImage: '/images/tonal-dots-clock.png',
    repoUrl: 'https://github.com/andiakbararyaputra/tonal-dots',
    status: { en: 'PRODUCTION // ACTIVE', id: 'PRODUKSI // AKTIF' },
    isRealProject: true,
  },
  {
    id: 'neural-nexus',
    number: '02',
    code: 'AI // AGENT_MESH',
    title: 'NEURAL_NEXUS',
    category: {
      en: 'AUTONOMOUS WORKFLOW & TELEMETRY UI',
      id: 'ALUR KERJA AGEN AI & ANTARMUKA TELEMETRI',
    },
    tagline: {
      en: 'Cyber-brutalist orchestration console for streaming multi-agent runs, tool traces, and latency telemetry.',
      id: 'Konsol orkestrasi bergaya cyber-brutalist untuk memantau eksekusi multi-agen, jejak tool, dan latensi secara real-time.',
    },
    description: {
      en: 'Concept & blueprint architecture designed to visualize structured AI tool-calling pipelines, prompt diffing, and token throughput budgets inside a zero-clutter high-contrast HUD.',
      id: 'Cetak biru antarmuka dan arsitektur untuk memvisualisasikan pipeline tool-calling AI, evaluasi respons, dan pemakaian token dalam HUD ber-kontras tinggi.',
    },
    highlights: {
      en: [
        'Event-sourced trace stream with sub-millisecond state snapshots',
        'Command-palette workflow filtering and keyboard-first inspection',
        'Customizable template slot — plug in your real AI/SaaS repo URL anytime',
      ],
      id: [
        'Aliran jejak eksekusi berbasis event dengan snapshot berlatensi rendah',
        'Navigasi berbasis keyboard dan filter command palette instan',
        'Slot showcase modular — siap dihubungkan ke repositori AI/SaaS Anda',
      ],
    },
    stack: ['TypeScript', 'React', 'Next.js', 'WebSockets', 'PostgreSQL'],
    image: '/images/project-neural-net.jpg',
    repoUrl: 'https://github.com/andiakbararyaputra',
    status: { en: 'BLUEPRINT // SHOWCASE', id: 'CETAK BIRU // SHOWCASE' },
  },
  {
    id: 'void-engine',
    number: '03',
    code: 'SYS // BACKEND_CORE',
    title: 'VOID_ENGINE',
    category: {
      en: 'DISTRIBUTED RUNTIME & CLI TOOLING',
      id: 'RUNTIME TERDISTRIBUSI & PERKAKAS CLI',
    },
    tagline: {
      en: 'High-throughput API gateway and container job scheduler built for predictable low-latency execution.',
      id: 'Gateway API berkecepatan tinggi dan penjadwal tugas kontainer yang dirancang untuk latensi rendah yang terprediksi.',
    },
    description: {
      en: 'Focused backend engineering showcase demonstrating clean REST/RPC contracts, containerized worker queues, health probes, and structured observability.',
      id: 'Sorotan rekayasa backend yang menampilkan kontrak REST/RPC bersih, antrean worker berbasis Docker, health probe, dan logging terstruktur.',
    },
    highlights: {
      en: [
        'Idempotent job retries with dead-letter recovery telemetry',
        'Containerized Docker Compose pipeline with automated smoke checks',
        'Ready to link with your flagship backend or systems repository',
      ],
      id: [
        'Mekanisme retry idempoten lengkap dengan telemetri pemulihan antrean',
        'Pipeline Docker Compose terotomasi dengan uji kesehatan layanan',
        'Siap ditautkan ke repositori backend atau perkakas sistem Anda',
      ],
    },
    stack: ['Python', 'Node.js', 'Docker', 'PostgreSQL', 'Linux'],
    image: '/images/project-void-system.jpg',
    repoUrl: 'https://github.com/andiakbararyaputra',
    status: { en: 'ARCHITECTURE // READY', id: 'ARSITEKTUR // SIAP' },
  },
  {
    id: 'pulse-grid',
    number: '04',
    code: 'WEB // KINETIC_HUD',
    title: 'PULSE_GRID',
    category: {
      en: 'GSAP INTERACTIVE DATA CANVAS',
      id: 'KANVAS DATA INTERAKTIF GSAP',
    },
    tagline: {
      en: 'Interactive browser telemetry deck blending Canvas 2D shaders, ScrollTrigger timelines, and Web Audio.',
      id: 'Dek telemetri interaktif di browser yang memadukan Canvas 2D, timeline ScrollTrigger, dan Web Audio.',
    },
    description: {
      en: 'Built to demonstrate smooth 60fps frontend craftsmanship: clipped polygonal geometry, live coordinate projections, and accessible reduced-motion fallbacks.',
      id: 'Dirancang untuk mendemonstrasikan ketelitian frontend 60fps: geometri poligonal chamfered, proyeksi koordinat langsung, dan dukungan reduced-motion.',
    },
    highlights: {
      en: [
        'GTA VI-inspired pinned chapter scrubbing via GSAP ScrollTrigger',
        'Procedural Web Audio synthesizer with zero external sound asset payloads',
        'Dual-language EN/ID state synchronization across all HUD components',
      ],
      id: [
        'Transisi bab scroll tersemat terinspirasi GTA VI menggunakan GSAP ScrollTrigger',
        'Synthesizer Web Audio prosedural tanpa mengunduh berkas audio eksternal',
        'Sinkronisasi dwibahasa EN/ID di seluruh komponen HUD',
      ],
    },
    stack: ['React 19', 'TypeScript', 'GSAP', 'Canvas 2D', 'Web Audio'],
    image: '/images/project-cyber-nexus.jpg',
    repoUrl: 'https://github.com/andiakbararyaputra',
    status: { en: 'ACTIVE // LIVE_BUILD', id: 'AKTIF // LIVE_BUILD' },
  },
];

export const TELEMETRY_KPIS: TelemetryKpi[] = [
  {
    value: 60,
    suffix: 'FPS',
    label: { en: 'GSAP GPU PIPELINE', id: 'PIPELINE GPU GSAP' },
  },
  {
    value: 14,
    suffix: '+',
    label: { en: 'MODULAR DOTFILES', id: 'MODUL DOTFILES' },
  },
  {
    value: 2,
    suffix: 'LANG',
    label: { en: 'EN / ID INTERFACE', id: 'ANTARMUKA EN / ID' },
  },
  {
    value: 99,
    suffix: '%',
    label: { en: 'SYSTEM UPTIME', id: 'KEANDALAN SISTEM' },
  },
];

export const STACK_GROUPS: StackGroup[] = [
  {
    id: 'languages',
    label: { en: '01 // LANGUAGES', id: '01 // BAHASA PEMROGRAMAN' },
    items: [
      { name: 'TypeScript', tag: 'STRICT' },
      { name: 'JavaScript', tag: 'ES2024' },
      { name: 'Python', tag: 'CORE' },
      { name: 'Lua', tag: 'HYPR_CFG' },
      { name: 'SQL', tag: 'RELATIONAL' },
    ],
  },
  {
    id: 'web',
    label: { en: '02 // WEB & MOTION', id: '02 // WEB & ANIMASI' },
    items: [
      { name: 'React 19', tag: 'UI' },
      { name: 'GSAP + ScrollTrigger', tag: '60FPS' },
      { name: 'Next.js', tag: 'SSR' },
      { name: 'Tailwind CSS', tag: 'STYLE' },
      { name: 'HTML5 Canvas', tag: 'RENDER' },
    ],
  },
  {
    id: 'backend',
    label: { en: '03 // BACKEND & CLOUD', id: '03 // BACKEND & CLOUD' },
    items: [
      { name: 'Node.js', tag: 'RUNTIME' },
      { name: 'PostgreSQL', tag: 'DB' },
      { name: 'Firebase', tag: 'AUTH/DB' },
      { name: 'Docker', tag: 'CONTAINER' },
    ],
  },
  {
    id: 'systems',
    label: { en: '04 // LINUX & SYSTEMS', id: '04 // LINUX & SISTEM' },
    items: [
      { name: 'CachyOS / Arch', tag: 'OS' },
      { name: 'Hyprland', tag: 'WAYLAND' },
      { name: 'Fish + Starship', tag: 'SHELL' },
      { name: 'Neovim', tag: 'EDITOR' },
      { name: 'Git', tag: 'VCS' },
    ],
  },
];
