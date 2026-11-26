import type { Lang } from '../utils/preferences';

export type { Lang };
export type ProjectGroup = 'all' | 'web-ai' | 'systems-mobile' | 'data-algo';

export interface PrincipleItem {
  id: string;
  code: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  icon: 'cube' | 'grid' | 'zap' | 'cpu';
}

export interface GalleryFrame {
  src: string;
  caption: Record<Lang, string>;
}

export interface ProjectItem {
  id: string;
  number: string;
  code: string;
  title: string;
  group: Exclude<ProjectGroup, 'all'>;
  featured?: boolean;
  category: Record<Lang, string>;
  tagline: Record<Lang, string>;
  description: Record<Lang, string>;
  problem: Record<Lang, string>;
  architecture: string[];
  highlights: Record<Lang, string[]>;
  metrics: Record<Lang, string[]>;
  stack: string[];
  image: string;
  secondaryImage?: string;
  gallery: GalleryFrame[];
  repoUrl: string;
  releaseUrl?: string;
  releaseLabel?: Record<Lang, string>;
  liveUrl?: string;
  status: Record<Lang, string>;
  isRealProject?: boolean;
}

export interface ExperienceItem {
  id: string;
  code: string;
  period: Record<Lang, string>;
  role: Record<Lang, string>;
  org: Record<Lang, string>;
  type: 'engineering' | 'collaboration' | 'research' | 'education';
  summary: Record<Lang, string>;
  bullets: Record<Lang, string[]>;
  tags: string[];
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
  email: 'andiakbar121204@gmail.com',
  githubUrl: 'https://github.com/andiakbararyaputra',
  portfolioUrl: 'https://andiakbararyaputra.github.io',
  tonalDotsUrl: 'https://github.com/andiakbararyaputra/tonal-dots',
  linkedinLabel: {
    en: 'LINKEDIN // SOON',
    id: 'LINKEDIN // SEGERA',
  },
  location: 'Makassar, Indonesia // UTC+8',
  education: {
    institution: 'Universitas Muhammadiyah Makassar',
    shortInstitution: 'Unismuh Makassar',
    degree: {
      en: 'B.S. in Informatics Engineering (S1 Teknik Informatika)',
      id: 'S1 Teknik Informatika',
    },
    period: {
      en: 'Active Undergraduate',
      id: 'Mahasiswa Aktif',
    },
  },
  summary: {
    en: 'Informatics Engineering undergraduate at Universitas Muhammadiyah Makassar building full-stack web apps, Flutter mobile software, Tauri desktop utilities, and modular Lua configurations for Arch Linux / Hyprland. Focuses on local-first execution, explicit system boundaries, and automated test coverage.',
    id: 'Mahasiswa S1 Teknik Informatika di Universitas Muhammadiyah Makassar yang membangun aplikasi web full-stack, mobile Flutter, aplikasi desktop Tauri, dan konfigurasi Lua modular untuk Arch Linux / Hyprland. Fokus pada eksekusi lokal di perangkat, batas modul yang jelas, dan cakupan automated test.',
  },
  coordinates: {
    lat: '-5.1477',
    lon: '119.4327',
    node: 'NODE_MKS_08',
  },
};

export const UI_COPY = {
  nav: {
    links: [
      { id: 'hero', code: '/01', label: { en: 'INIT', id: 'BERANDA' } },
      { id: 'principles', code: '/02', label: { en: 'PRINCIPLES', id: 'PRINSIP' } },
      { id: 'work', code: '/03', label: { en: 'PROJECTS', id: 'PROYEK' } },
      { id: 'experience', code: '/04', label: { en: 'LOG', id: 'RIWAYAT' } },
      { id: 'telemetry', code: '/05', label: { en: 'METRICS', id: 'METRIK' } },
      { id: 'system', code: '/06', label: { en: 'SYSTEM', id: 'SISTEM' } },
      { id: 'connect', code: '/07', label: { en: 'CONTACT', id: 'KONTAK' } },
    ],
    stickyCta: { en: 'CONTACT', id: 'KONTAK' },
    terminalBtn: { en: 'LAUNCHER', id: 'LAUNCHER' },
  },
  hero: {
    status: {
      en: 'SYSTEM ONLINE // OPEN FOR COLLABORATION',
      id: 'SISTEM AKTIF // TERBUKA UNTUK KOLABORASI',
    },
    titleTop: 'SOFTWARE',
    titleVolt: '& SYSTEMS',
    titleBottom: 'ENGINEER',
    tagline: {
      en: 'Full-stack TypeScript web apps, Flutter mobile software, and modular Lua configurations for Arch Linux / Hyprland.',
      id: 'Aplikasi web full-stack TypeScript, aplikasi mobile Flutter, dan konfigurasi Lua modular untuk Arch Linux / Hyprland.',
    },
    primaryCta: { en: 'EXPLORE PROJECTS', id: 'LIHAT PROYEK' },
    secondaryCta: { en: 'QUICK LAUNCHER', id: 'BUKA LAUNCHER' },
    cvCta: { en: 'VIEW / PRINT CV', id: 'LIHAT / CETAK CV' },
    scrollCue: { en: 'SCROLL FOR OVERVIEW', id: 'GULIR UNTUK RINGKASAN' },
    manifestoTag: '// 01.B_SYSTEM_OVERVIEW',
    manifestoHeading: {
      en: 'LINUX WORKFLOW & FULL-STACK SOFTWARE',
      id: 'LINGKUNGAN LINUX & REKAYASA APLIKASI',
    },
    manifestoBody: {
      en: 'I am Andi Akbar Arya Putra (@andiakbararyaputra), an Informatics Engineering student in Makassar. My repositories cover modular Lua Hyprland configs, Next.js and Fastify web services, Flutter mobile apps, and Python distributed or clustering pipelines.',
      id: 'Saya Andi Akbar Arya Putra (@andiakbararyaputra), mahasiswa Teknik Informatika di Makassar. Proyek saya mencakup konfigurasi Hyprland berbasis Lua, layanan web Next.js dan Fastify, aplikasi mobile Flutter, serta pipeline sistem terdistribusi dan clustering Python.',
    },
    manifestoPoints: {
      en: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, Dart/Flutter, Python, Java, Lua',
        'CAMPUS: S1 Teknik Informatika, Unismuh Makassar',
      ],
      id: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, Dart/Flutter, Python, Java, Lua',
        'KAMPUS: S1 Teknik Informatika, Unismuh Makassar',
      ],
    },
  },
  principlesHeader: {
    tag: '/02 // WORK_PRINCIPLES',
    title: { en: 'ENGINEERING HABITS', id: 'PRINSIP KERJA' },
    subtitle: {
      en: 'Four practical engineering rules I apply across repositories, UI tools, and Linux configs.',
      id: 'Empat kebiasaan kerja yang saya terapkan pada kode aplikasi, tooling, dan konfigurasi Linux.',
    },
  },
  workHeader: {
    tag: '/03 // SELECTED_PROJECTS',
    title: { en: 'GITHUB PROJECTS & RUNTIME CAPTURES', id: 'PROYEK GITHUB & TANGKAPAN RUNTIME' },
    subtitle: {
      en: '9 real repositories spanning Linux compositors, full-stack web, Flutter mobile, distributed nodes, NLP research, and automata.',
      id: '9 repositori nyata di bidang Linux compositor, web full-stack, mobile Flutter, sistem terdistribusi, riset NLP, dan otomata.',
    },
    flagshipTag: { en: 'FEATURED_BUILDS // 01-03', id: 'PROYEK_UTAMA // 01-03' },
    archiveTag: { en: 'ARCHIVE_MATRIX // 04-09', id: 'ARSIP_PROYEK // 04-09' },
    inspectSpecs: { en: 'VIEW_SPECS', id: 'LIHAT_DETAIL' },
    openRepo: { en: 'SOURCE_CODE', id: 'KODE_SUMBER' },
    livePreview: { en: 'LIVE_DEMO', id: 'DEMO_LANGSUNG' },
    filters: {
      all: { en: 'ALL', id: 'SEMUA' },
      'web-ai': { en: 'WEB & AI', id: 'WEB & AI' },
      'systems-mobile': { en: 'SYSTEMS & MOBILE', id: 'SISTEM & MOBILE' },
      'data-algo': { en: 'DATA & ALGO', id: 'DATA & ALGO' },
    } as Record<ProjectGroup, Record<Lang, string>>,
  },
  experienceHeader: {
    tag: '/04 // SYSTEM_LOG',
    title: { en: 'EXPERIENCE & EDUCATION', id: 'PENGALAMAN & PENDIDIKAN' },
    subtitle: {
      en: 'Verified engineering milestones, research work, collaborative builds, and academic background in Makassar.',
      id: 'Rekam jejak pengembangan proyek, riset, kolaborasi tim, dan pendidikan S1 di Makassar.',
    },
  },
  telemetryHeader: {
    quote: {
      en: 'DAILY ENV: CachyOS (Arch Linux) + modular Lua Hyprland + Noctalia v5 + Fish Shell + Neovim.',
      id: 'ENV HARIAN: CachyOS (Arch Linux) + Lua Hyprland modular + Noctalia v5 + Fish Shell + Neovim.',
    },
    marquee: {
      en: '9 PUBLIC REPOS  *  HYPRLAND + LUA  *  NEXT.JS + FASTIFY  *  FLUTTER + TAURI  *  PYTHON XML-RPC  *  MAKASSAR UTC+8  *',
      id: '9 REPO PUBLIK  *  HYPRLAND + LUA  *  NEXT.JS + FASTIFY  *  FLUTTER + TAURI  *  PYTHON XML-RPC  *  MAKASSAR UTC+8  *',
    },
  },
  systemHeader: {
    tag: '/06 // TECH_STACK & DIAGNOSTICS',
    title: { en: 'TECH MATRIX & LINUX SHELL', id: 'MATRIKS STACK & SHELL LINUX' },
    subtitle: {
      en: 'Browse grouped technologies or run commands with Tab autocomplete and arrow history in the embedded shell.',
      id: 'Lihat pengelompokan stack atau jalankan perintah dengan Tab autocomplete dan riwayat panah di shell ini.',
    },
    statusTitle: { en: 'LIVE TELEMETRY', id: 'TELEMETRI AKTIF' },
    operational: { en: 'TELEMETRY ONLINE', id: 'TELEMETRI AKTIF' },
  },
  connectHeader: {
    tag: '/07 // INITIALIZE_CONNECTION',
    title: { en: 'GET IN TOUCH', id: 'HUBUNGI SAYA' },
    subtitle: {
      en: 'Available for Software Engineering internships, full-stack web or mobile builds, and open-source collaboration.',
      id: 'Terbuka untuk magang Software Engineering, pengembangan web atau mobile, dan kolaborasi open-source.',
    },
    qrLabel: { en: 'SCAN // GITHUB.COM/ANDIAKBARARYAPUTRA', id: 'PINDAI // GITHUB.COM/ANDIAKBARARYAPUTRA' },
    footerStrip: '> NODE_MKS_08 // ANDI AKBAR ARYA PUTRA // MAKASSAR UTC+8',
  },
};

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'modular',
    code: 'PR-01',
    icon: 'cube',
    title: { en: 'MODULAR STRUCTURE', id: 'STRUKTUR MODULAR' },
    summary: {
      en: 'One concern per file. tonal-dots splits Hyprland into focused Lua modules under config/hypr/config/ so changes stay isolated.',
      id: 'Satu tanggung jawab per berkas. tonal-dots memisahkan konfigurasi Hyprland ke beberapa modul Lua agar mudah diubah tanpa efek samping.',
    },
  },
  {
    id: 'systems',
    code: 'PR-02',
    icon: 'grid',
    title: { en: 'EXPLICIT BOUNDARIES', id: 'BATAS MODUL JELAS' },
    summary: {
      en: 'IPC buses, XML-RPC node failover, and client-server contracts handle disconnects cleanly when failure paths are handled explicitly.',
      id: 'Jalur IPC, failover node XML-RPC, dan kontrak frontend-backend tetap berjalan stabil saat skenario putus koneksi ditangani secara eksplisit.',
    },
  },
  {
    id: 'testing',
    code: 'PR-03',
    icon: 'zap',
    title: { en: 'VERIFIED BEHAVIOR', id: 'PERILAKU TERUJI' },
    summary: {
      en: 'Automated Vitest suites in INTERVIEW-APP, maxres, and SIFA verify parsing, state transitions, and core math before release.',
      id: 'Unit test Vitest pada INTERVIEW-APP, maxres, dan SIFA memastikan alur parsing, transisi state, dan hitungan inti berjalan benar.',
    },
  },
  {
    id: 'local',
    code: 'PR-04',
    icon: 'cpu',
    title: { en: 'LOCAL-FIRST PRIVACY', id: 'PRIVASI & PROSES LOKAL' },
    summary: {
      en: 'INTERVIEW-APP parses documents in-browser and maxres upscales offline via Tauri v2, keeping user files on their own machine.',
      id: 'INTERVIEW-APP mem-parsing berkas di browser dan maxres memproses gambar offline di Tauri v2 sehingga data pengguna tetap lokal.',
    },
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'tonal-dots',
    number: '01',
    code: 'SYS // DESKTOP_OS',
    title: 'TONAL_DOTS',
    group: 'systems-mobile',
    featured: true,
    category: {
      en: 'LINUX COMPOSITOR & LUA ECOSYSTEM',
      id: 'KONFIGURASI COMPOSITOR LINUX & LUA',
    },
    tagline: {
      en: 'Modular Hyprland 0.57 (Lua) and Noctalia v5 desktop setup with wallpaper-derived Material 3 colors.',
      id: 'Setup desktop Hyprland 0.57 (Lua) dan Noctalia v5 modular dengan skema warna Material 3 dari wallpaper.',
    },
    description: {
      en: 'A CachyOS / Arch Linux desktop configuration built around separate Lua modules for Hyprland, dynamic D-Bus and MPRIS auto-Picture-in-Picture sizing, translucent Qt/Kvantum theming, and a custom Desk Clock plugin.',
      id: 'Konfigurasi desktop CachyOS / Arch Linux dengan modul Lua terpisah untuk Hyprland, pelacak auto-Picture-in-Picture via D-Bus dan MPRIS, tema Qt/Kvantum, serta plugin Desk Clock kustom.',
    },
    problem: {
      en: 'Monolithic hyprland.conf files grow hard to maintain across monitors, input rules, and window automation. tonal-dots splits every concern into small Lua modules with an idempotent symlink installer.',
      id: 'Berkas hyprland.conf tunggal sulit dirawat saat aturan monitor, keybind, dan automasi jendela bertambah. tonal-dots memisahkan tiap bagian ke modul Lua kecil dengan skrip symlink aman.',
    },
    architecture: [
      'Wallpaper -> Material 3 Palette',
      'Lua Configs (config/hypr/config/)',
      'D-Bus + busctl MPRIS PiP Daemon',
      'Noctalia v5 Bar + Desk Clock Plugin',
    ],
    highlights: {
      en: [
        'One-file-per-concern Lua architecture under config/hypr/config/',
        'Automated D-Bus + systemd busctl PiP tracker that resizes windows based on workspace occupancy',
        'Custom Noctalia Desk Clock plugin syncing unread app badges with top bar widgets',
        'Non-destructive symlink installer with timestamped rollback backups (--dry-run / --only)',
      ],
      id: [
        'Arsitektur Lua satu berkas per fungsi di config/hypr/config/',
        'Pelacak auto-PiP via D-Bus dan systemd busctl yang menyesuaikan ukuran jendela otomatis',
        'Plugin Desk Clock Noctalia kustom yang menyinkronkan badge notifikasi ke top bar',
        'Installer symlink non-destruktif dengan cadangan timestamp (--dry-run / --only)',
      ],
    },
    metrics: {
      en: ['Hyprland 0.57 Lua native config', 'Rollback-safe install.sh (--dry-run)', 'D-Bus + MPRIS window watcher'],
      id: ['Konfigurasi Lua native Hyprland 0.57', 'Skrip install.sh aman dengan rollback', 'Watcher jendela via D-Bus + MPRIS'],
    },
    stack: ['Lua', 'Hyprland 0.57', 'Noctalia v5', 'D-Bus', 'Fish Shell', 'Kvantum'],
    image: '/images/tonal-dots-main.png',
    secondaryImage: '/images/tonal-dots-clock.png',
    gallery: [
      {
        src: '/images/tonal-dots-main.png',
        caption: {
          en: 'Hyprland 0.57 + Noctalia v5 desktop with Material 3 tonal palette',
          id: 'Desktop Hyprland 0.57 + Noctalia v5 dengan palet warna Material 3',
        },
      },
      {
        src: '/images/tonal-dots-clock.png',
        caption: {
          en: 'Custom Noctalia Desk Clock plugin with live unread notification badges',
          id: 'Plugin Desk Clock Noctalia kustom dengan badge notifikasi aktif',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/tonal-dots',
    status: { en: 'PRODUCTION // ACTIVE', id: 'PRODUKSI // AKTIF' },
    isRealProject: true,
  },
  {
    id: 'interview-app',
    number: '02',
    code: 'AI // GROUNDED_RAG',
    title: 'INTERVIEW_APP',
    group: 'web-ai',
    featured: true,
    category: {
      en: 'CLIENT-SIDE GROUNDED INTERVIEW ASSISTANT',
      id: 'ASISTEN WAWANCARA BERBASIS SITASI LOKAL',
    },
    tagline: {
      en: 'Browser-based interview answer assistant grounded strictly in uploaded files, with citations on every claim.',
      id: 'Asisten jawaban wawancara berbasis browser yang hanya mengutip berkas unggahan dan menolak jika bukti tidak ada.',
    },
    description: {
      en: 'Zero-backend TypeScript and React 19 app that parses PDF, DOCX, PPTX, TXT, and GitHub repository inputs in the browser, indexes passages with MiniSearch, and supports local Ollama providers.',
      id: 'Aplikasi TypeScript dan React 19 tanpa backend yang mem-parsing PDF, DOCX, PPTX, TXT, serta repositori GitHub langsung di browser, mengindeks paragraf dengan MiniSearch, dan mendukung Ollama lokal.',
    },
    problem: {
      en: 'Standard chat assistants fabricate resume facts when answering interview questions or require uploading private CVs to external servers. This app runs parsing and passage search locally in-browser and refuses unsupported claims.',
      id: 'Chatbot umum sering mengarang fakta CV atau mewajibkan unggah dokumen pribadi ke server luar. Aplikasi ini menjalankan parsing dan pencarian di browser lalu menolak klaim tanpa sumber.',
    },
    architecture: [
      'PDF / DOCX / PPTX Browser Parsers',
      'Chunker + MiniSearch BM25 Index',
      'Strict Citation Guardrail',
      'Local Ollama / OpenAI-Compatible Adapter',
    ],
    highlights: {
      en: [
        'In-browser parsing pipeline (pdfjs-dist, mammoth, jszip) without server upload',
        'Grounded retrieval via MiniSearch with explicit refusal guardrails when evidence is missing',
        'Tested with Vitest, Testing Library, and axe-core accessibility checks (30+ commits)',
      ],
      id: [
        'Pipeline parsing langsung di browser (pdfjs-dist, mammoth, jszip) tanpa unggah server',
        'Retrieval berbasis MiniSearch dengan guardrail penolakan saat bukti tidak ditemukan',
        'Dilengkapi uji Vitest, Testing Library, dan audit aksesibilitas axe-core (30+ commit)',
      ],
    },
    metrics: {
      en: ['0 backend servers needed', 'Vitest + axe-core tested', '30+ commits history'],
      id: ['0 server backend (100% browser)', 'Teruji Vitest + axe-core', 'Riwayat 30+ commit'],
    },
    stack: ['TypeScript', 'React 19', 'Tailwind v4', 'MiniSearch', 'PDF.js', 'Vitest'],
    image: '/images/repos/interview-app.png',
    gallery: [
      {
        src: '/images/repos/interview-app.png',
        caption: {
          en: 'Client-side document ingestion, MiniSearch citations, and refusal guardrails',
          id: 'Unggah dokumen di browser, sitasi MiniSearch, dan guardrail penolakan',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/INTERVIEW-APP',
    status: { en: 'WEB APP // CLIENT-SIDE', id: 'APLIKASI WEB // LOKAL' },
    isRealProject: true,
  },
  {
    id: 'top250',
    number: '03',
    code: 'WEB // FULLSTACK',
    title: 'TOP250_CINEMA',
    group: 'web-ai',
    featured: true,
    category: {
      en: 'DARK CINEMATIC FULL-STACK CATALOG',
      id: 'KATALOG FILM FULL-STACK DARK CINEMATIC',
    },
    tagline: {
      en: 'IMDb Top 250 explorer built with Next.js 15, Fastify 5, MongoDB 7, MinIO, and semantic AI search.',
      id: 'Web penjelajah 250 film IMDb berbasis Next.js 15, Fastify 5, MongoDB 7, MinIO, dan pencarian AI semantik.',
    },
    description: {
      en: 'Full-stack Docker platform with an idempotent TMDB + MinIO asset seeder, Fastify REST API with semantic query support, infinite-scroll movie grid, light/dark themes, and cast/trailer pages.',
      id: 'Platform full-stack berbasis Docker dengan seeder TMDB + MinIO idempoten, REST API Fastify dengan mode pencarian AI semantik, infinite scroll grid film, serta halaman detail cast dan trailer.',
    },
    problem: {
      en: 'Movie catalog prototypes often rely directly on fragile third-party image hotlinks and single keyword filters. Top250 stores posters in self-hosted MinIO and pairs MongoDB indexes with semantic intent matching.',
      id: 'Katalog film sederhana sering bergantung pada hotlink gambar pihak ketiga dan filter kata kunci kaku. Top250 menyimpan poster di MinIO mandiri dan memadukan index MongoDB dengan pencarian berbasis makna.',
    },
    architecture: [
      'Next.js 15 App Router UI',
      'Fastify 5 REST + Semantic API',
      'MongoDB 7 Unique Upsert Index',
      'MinIO Object Storage + Docker Compose',
    ],
    highlights: {
      en: [
        'Decoupled Next.js 15 App Router frontend and Fastify 5 backend via Docker Compose',
        'Self-hosted MinIO object storage for posters and cast portraits with MongoDB unique upserts',
        'Dual search mode: debounced keyword/genre/year filters plus semantic AI query mode',
      ],
      id: [
        'Frontend Next.js 15 App Router dan backend Fastify 5 terorkestrasi lewat Docker Compose',
        'Object storage MinIO mandiri untuk poster dan foto cast dengan upsert unik MongoDB',
        'Mode pencarian ganda: filter genre/tahun ter-debounce serta mode pencarian AI semantik',
      ],
    },
    metrics: {
      en: ['4-service Docker Compose stack', '250 indexed films + cast media', 'Idempotent TMDB -> MinIO seeder'],
      id: ['Stack 4 layanan Docker Compose', '250 film + aset cast terindeks', 'Seeder TMDB -> MinIO idempoten'],
    },
    stack: ['Next.js 15', 'Fastify 5', 'MongoDB 7', 'MinIO', 'Docker', 'Tailwind CSS'],
    image: '/images/repos/top250.png',
    gallery: [
      {
        src: '/images/repos/top250.png',
        caption: {
          en: 'Next.js 15 dark catalog interface backed by Fastify 5, MongoDB 7, and MinIO',
          id: 'Antarmuka katalog dark mode Next.js 15 dengan backend Fastify 5, MongoDB 7, dan MinIO',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/Top250',
    status: { en: 'FULL-STACK // DOCKER', id: 'FULL-STACK // DOCKER' },
    isRealProject: true,
  },
  {
    id: 'maxres',
    number: '04',
    code: 'AI // DESKTOP_APP',
    title: 'MAXRES_UPSCALER',
    group: 'web-ai',
    category: {
      en: '100% OFFLINE AI IMAGE UPSCALER',
      id: 'AI IMAGE UPSCALER 100% OFFLINE',
    },
    tagline: {
      en: 'Tauri v2 desktop app that upscales photos 2x, 4x, 8x, or 16x locally without cloud uploads.',
      id: 'Aplikasi desktop Tauri v2 untuk memperbesar resolusi foto 2x, 4x, 8x, hingga 16x langsung secara offline.',
    },
    description: {
      en: 'Desktop utility built with React 19, TypeScript, and Tauri v2 native OS drag-and-drop APIs. Includes a single-screen state machine, live progress tracking with cancel support, and a memory warning before 16x runs.',
      id: 'Aplikasi desktop dengan React 19, TypeScript, dan API drag-and-drop native Tauri v2. Memiliki state machine satu layar, pelacakan progres dengan tombol batal, dan konfirmasi memori untuk mode 16x.',
    },
    problem: {
      en: 'Web upscalers compress files, charge per credit, or send private photos to remote servers. maxres wraps local upscaling in a lightweight Tauri v2 binary with strict RAM safeguards.',
      id: 'Layanan upscaler web sering membatasi kredit, mengompres hasil, atau mengunggah foto ke server luar. maxres membungkus proses upscaling lokal ke binary Tauri v2 dengan pengaman RAM.',
    },
    architecture: [
      'Tauri v2 Native Drag & Drop',
      'React 19 Explicit State Reducer',
      '2x / 4x / 8x / 16x Guardrails',
      'Local Disk Output + Counter Store',
    ],
    highlights: {
      en: [
        '100% offline processing pipeline where images stay on the user device',
        'Native Tauri webview drag-drop and local upscale counter store',
        'Explicit state reducer handling 2x/4x/8x/16x factors, cancellation, and error recovery',
      ],
      id: [
        'Pemrosesan 100% offline sehingga gambar tidak pernah keluar dari perangkat',
        'Integrasi drag-drop native Tauri v2 dan penyimpanan hitungan lokal',
        'State reducer terstruktur untuk faktor 2x/4x/8x/16x, pembatalan proses, dan pemulihan error',
      ],
    },
    metrics: {
      en: ['4 scale tiers (2x - 16x)', '100% offline Tauri v2 runtime', 'Unit-tested reducer with Vitest'],
      id: ['4 tingkat skala (2x - 16x)', 'Runtime Tauri v2 100% offline', 'Reducer teruji Vitest'],
    },
    stack: ['TypeScript', 'React 19', 'Tauri v2', 'Vite', 'Vitest'],
    image: '/images/repos/maxres.png',
    gallery: [
      {
        src: '/images/repos/maxres.png',
        caption: {
          en: 'maxres offline desktop UI showing scale selection and live upscaling state',
          id: 'Tampilan desktop offline maxres untuk pemilihan skala dan status proses',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/maxres',
    releaseUrl: 'https://github.com/andiakbararyaputra/maxres/releases',
    releaseLabel: { en: 'RELEASES', id: 'RILIS_APP' },
    status: { en: 'DESKTOP // TAURI_V2', id: 'DESKTOP // TAURI_V2' },
    isRealProject: true,
  },
  {
    id: 'finara',
    number: '05',
    code: 'MOB // FLUTTER_APP',
    title: 'FINARA_APP',
    group: 'systems-mobile',
    category: {
      en: 'ANDROID PERSONAL FINANCE & AI ALLOCATOR',
      id: 'APLIKASI ANDROID ALOKASI KEUANGAN & AI',
    },
    tagline: {
      en: 'Flutter Android app (v0.3.0) for monthly salary allocation, DANA+ tracking, and sanitized AI advice.',
      id: 'Aplikasi Flutter Android (v0.3.0) untuk pembagian gaji bulanan, catatan DANA+, dan asisten AI finansial.',
    },
    description: {
      en: 'Flutter Android release built on encrypted Drift SQLite, Riverpod state management, and GoRouter. Tracks Bibit and Stockbit investments, protects access via PIN lock, and sanitizes personal figures before AI chat requests.',
      id: 'Aplikasi Flutter Android rilis v0.3.0 dengan database Drift SQLite terenkripsi, Riverpod, dan GoRouter. Mendukung pencatatan investasi Bibit/Stockbit, kunci PIN, serta sanitasi angka pribadi sebelum chat AI.',
    },
    problem: {
      en: 'Manual spreadsheets break consistency when splitting monthly pay across bills, savings, and local investment apps. Finara automates bucket ratios offline while stripping sensitive details before AI prompts.',
      id: 'Catatan manual menyulitkan konsistensi pembagian gaji ke pos tagihan, dana darurat, dan aplikasi investasi lokal. Finara mengotomatiskan alokasi secara offline sambil menyaring data sensitif.',
    },
    architecture: [
      'Flutter UI + GoRouter + EN/ID l10n',
      'Riverpod State Providers',
      'Encrypted Drift SQLite + PIN Lock',
      'Context Sanitizer -> OpenAI Adapter',
    ],
    highlights: {
      en: [
        'Splits monthly income across mandatory bills, emergency funds, investments, DANA+, and subscriptions',
        'Financial context sanitizer runs before querying OpenAI-compatible AI adapters',
        'Includes encrypted Drift SQLite schema, backup/export service, and Indonesian/English l10n',
      ],
      id: [
        'Membagi pemasukan bulanan ke pos wajib, dana darurat, investasi, DANA+, dan langganan',
        'Layer sanitasi konteks finansial berjalan sebelum memanggil adapter AI OpenAI-compatible',
        'Database Drift SQLite terenkripsi, layanan backup/ekspor, dan bahasa EN/ID',
      ],
    },
    metrics: {
      en: ['Android v0.3.0 APK release', 'Encrypted local Drift SQLite', 'Bilingual EN / ID interface'],
      id: ['Rilis APK Android v0.3.0', 'Database Drift SQLite terenkripsi', 'Antarmuka dwibahasa EN / ID'],
    },
    stack: ['Dart', 'Flutter', 'Riverpod', 'Drift SQLite', 'GoRouter', 'Android'],
    image: '/images/repos/finara.png',
    gallery: [
      {
        src: '/images/repos/finara.png',
        caption: {
          en: 'Finara Android salary allocator dashboard and investment buckets',
          id: 'Dashboard alokasi gaji dan pos investasi Finara di Android',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/Finara',
    releaseUrl: 'https://github.com/andiakbararyaputra/Finara/releases',
    releaseLabel: { en: 'APK_RELEASE', id: 'RILIS_APK' },
    status: { en: 'ANDROID // V0.3.0_APK', id: 'ANDROID // APK_V0.3.0' },
    isRealProject: true,
  },
  {
    id: 'bank-terdistribusi',
    number: '06',
    code: 'SYS // DISTRIBUTED',
    title: 'BANK_TERDISTRIBUSI',
    group: 'systems-mobile',
    category: {
      en: 'MULTI-NODE XML-RPC BANK SIMULATION',
      id: 'SIMULASI BANK TERDISTRIBUSI 3 NODE XML-RPC',
    },
    tagline: {
      en: '3-branch distributed banking simulation (Jakarta, Bandung, Surabaya) with failover and Flask dashboard.',
      id: 'Simulasi bank terdistribusi 3 node cabang (Jakarta, Bandung, Surabaya) dengan replikasi state dan failover otomatis.',
    },
    description: {
      en: 'Built with Python XML-RPC servers and a real-time Flask web gateway. Shows peer-to-peer state replication, automatic branch failover when a node disconnects, atomic deposit/withdraw/transfer operations, and single-command local or LAN startup.',
      id: 'Dibangun dengan server XML-RPC Python dan web gateway Flask real-time. Menampilkan replikasi state antar peer, failover cabang otomatis saat node terputus, operasi setor/tarik/transfer, dan mode eksekusi lokal maupun multi-LAN.',
    },
    problem: {
      en: 'Demonstrating replication consistency and failover in distributed systems courses is clearer visually than through raw CLI logs. A live Flask topology monitor inspects port health and version sync across three independent XML-RPC nodes.',
      id: 'Memahami konsistensi replikasi dan failover pada mata kuliah sistem terdistribusi jauh lebih jelas secara visual. Monitor topologi Flask melacak status port dan versi replikasi pada tiga node XML-RPC.',
    },
    architecture: [
      'Flask Gateway Router (:5000)',
      'Node JKT (:8001) <-> Node BDG (:8002)',
      'Node SBY (:8003) Peer Sync',
      'Automatic Failover + JSON State Log',
    ],
    highlights: {
      en: [
        'Live topology monitor showing active branch health (:8001, :8002, :8003) and state version sync',
        'Automatic gateway failover routing when any regional branch node disconnects',
        'Supports single-machine startup (run_all.py) and multi-laptop LAN mode via network.json',
      ],
      id: [
        'Monitor topologi langsung yang melacak kesehatan node (:8001-:8003) dan versi replikasi',
        'Routing failover otomatis pada gateway Flask saat salah satu node cabang mati',
        'Mendukung mode satu laptop (run_all.py) dan multi-laptop LAN via network.json',
      ],
    },
    metrics: {
      en: ['3 synchronized XML-RPC branches', 'Automatic gateway failover', 'Local & multi-LAN network.json'],
      id: ['3 node cabang XML-RPC tersinkron', 'Failover gateway otomatis', 'Mode lokal & multi-LAN network.json'],
    },
    stack: ['Python', 'Flask 3', 'XML-RPC', 'JSON Replication', 'Distributed Systems'],
    image: '/images/repos/bank-terdistribusi.png',
    gallery: [
      {
        src: '/images/repos/bank-terdistribusi.png',
        caption: {
          en: 'Live 3-node topology visualizer and distributed transaction console',
          id: 'Visualisator topologi 3 node dan konsol transaksi terdistribusi',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/bank-terdistribusi',
    status: { en: 'SYSTEMS // 3_NODES', id: 'SISTEM // 3_NODE' },
    isRealProject: true,
  },
  {
    id: 'bapenda-clustering',
    number: '07',
    code: 'DATA // ML_PSO',
    title: 'BAPENDA_PSO_KMEANS',
    group: 'data-algo',
    category: {
      en: 'NLP CLUSTERING (K-MEANS + PSO)',
      id: 'CLUSTERING NLP (K-MEANS + PSO)',
    },
    tagline: {
      en: 'Topic clustering on 377 Bapenda Sulsel Mobile app reviews using K-Means optimized with PSO.',
      id: 'Pelabelan topik pada 377 ulasan aplikasi Bapenda Sulsel Mobile memakai K-Means dengan optimasi centroid PSO.',
    },
    description: {
      en: 'Computational engineering notebook pipeline combining TF-IDF (377x739), TruncatedSVD LSA reduction (377x25), and memetic PSO-K-Means across 10 benchmark seeds (K=3). It lowered SSE to 294.67 and improved Silhouette and Davies-Bouldin scores.',
      id: 'Pipeline notebook riset Rekayasa Komputasional memakai TF-IDF (377x739), reduksi LSA SVD (377x25), dan memetic PSO-K-Means pada 10 seed uji (K=3). Hasilnya menurunkan SSE ke 294.67 serta memperbaiki skor Silhouette dan Davies-Bouldin.',
    },
    problem: {
      en: 'Standard K-Means centroid initialization frequently settles in suboptimal local minima on sparse Indonesian review text. Memetic Particle Swarm Optimization guides centroid placement across 10 benchmark seeds.',
      id: 'Inisialisasi centroid K-Means biasa sering terjebak pada local minima saat memproses teks ulasan singkat berbahasa Indonesia. Particle Swarm Optimization memetic mengarahkan posisi centroid awal agar lebih stabil.',
    },
    architecture: [
      '377 App Reviews Preprocessing',
      'TF-IDF (377x739) -> LSA SVD (377x25)',
      'Memetic PSO-K-Means (K=3, 10 Seeds)',
      'Labeled Topics Export (CSV / Excel)',
    ],
    highlights: {
      en: [
        'Grouped 377 user reviews into 3 topics: App UX/Performance (171), Samsat Payment (139), Tax Check (67)',
        'Memetic PSO-K-Means raised 10-seed average Silhouette (+0.006165) and lowered Davies-Bouldin (-0.1534)',
        'Reproducible Jupyter Notebook with exported CSV and Excel topic labeling datasets',
      ],
      id: [
        'Mengelompokkan 377 ulasan ke 3 topik: Kinerja App (171), Layanan Samsat (139), Info Pajak (67)',
        'PSO-K-Means menaikkan rata-rata Silhouette (+0.006165) dan menurunkan Davies-Bouldin (-0.1534)',
        'Jupyter Notebook lengkap dengan ekspor dataset pelabelan CSV dan Excel',
      ],
    },
    metrics: {
      en: ['377 validated app reviews (K=3)', 'SSE reduced to 294.67', '10-seed reproducible benchmark'],
      id: ['377 ulasan tervalidasi (K=3)', 'SSE turun ke 294.67', 'Uji replikasi 10 seed'],
    },
    stack: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'TF-IDF / LSA', 'PSO'],
    image: '/images/repos/bapenda-clustering.png',
    gallery: [
      {
        src: '/images/repos/bapenda-clustering.png',
        caption: {
          en: 'Cluster separation and topic distribution chart across 377 Bapenda reviews',
          id: 'Grafik pemisahan cluster dan distribusi 3 topik dari 377 ulasan Bapenda',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/klasterisasi-review-aplikasi-bapenda-sulsel-mobile',
    status: { en: 'RESEARCH // K=3_VERIFIED', id: 'RISET // K=3_TERUJI' },
    isRealProject: true,
  },
  {
    id: 'nfa-dfa-toolkit',
    number: '08',
    code: 'ALGO // AUTOMATA',
    title: 'NFA_DFA_TOOLKIT',
    group: 'data-algo',
    category: {
      en: 'JAVA EPSILON-NFA TO DFA CONVERTER',
      id: 'KONVERTER EPSILON-NFA KE DFA (JAVA CLI)',
    },
    tagline: {
      en: 'Interactive Java CLI tool for defining automata, printing transition tables, and tracing subset construction.',
      id: 'Program CLI Java interaktif untuk mendefinisikan otomata, mencetak tabel transisi, dan melacak konversi subset construction.',
    },
    description: {
      en: 'Built for Automata and Formal Language Theory. Supports arbitrary epsilon-transitions, prints step-by-step epsilon-closures and reachable DFA state sets, loads a preset 0*1*2* example, and tests input string acceptance.',
      id: 'Dibangun untuk mata kuliah Teori Otomata dan Bahasa Formal. Mendukung transisi epsilon, mencetak langkah epsilon-closure dan himpunan state DFA secara rinci, menyediakan contoh 0*1*2*, serta menguji penerimaan string.',
    },
    problem: {
      en: 'Tracing multi-step subset construction and epsilon-closures by hand is error-prone when studying formal automata. This console toolkit prints every intermediate closure set and state transition trace.',
      id: 'Menghitung subset construction dan epsilon-closure secara manual rawan salah saat mempelajari teori otomata. Program ini mencetak setiap langkah closure dan perpindahan state secara transparan.',
    },
    architecture: [
      'CLI Input + Preset 0*1*2* Loader',
      'NFA Model & Epsilon-Closure Engine',
      'Subset Construction -> DFA Builder',
      'ASCII Table Formatter + String Tester',
    ],
    highlights: {
      en: [
        'Standard-library Java architecture split across Main, NFA, DFA, Converter, and Table classes',
        'Prints formatted transition tables with start (->) and accept (*) state indicators',
        'Logs exact state sets during both subset construction and string evaluation',
      ],
      id: [
        'Struktur Java standar terpisah rapi pada kelas Main, NFA, DFA, Converter, dan Table',
        'Mencetak tabel transisi terformat dengan penanda state awal (->) dan state akhir (*)',
        'Menampilkan jejak state lengkap saat konversi DFA maupun uji string input',
      ],
    },
    metrics: {
      en: ['Zero external Java dependencies', 'Step-by-step closure logs', 'Built-in 0*1*2* test automaton'],
      id: ['Tanpa library eksternal Java', 'Log langkah closure lengkap', 'Preset otomata uji 0*1*2*'],
    },
    stack: ['Java', 'Subset Construction', 'e-NFA / DFA', 'CLI Toolkit'],
    image: '/images/repos/nfa-dfa-toolkit.png',
    gallery: [
      {
        src: '/images/repos/nfa-dfa-toolkit.png',
        caption: {
          en: 'Java console transition table output and subset construction trace',
          id: 'Output tabel transisi dan log langkah subset construction di Java CLI',
        },
      },
    ],
    repoUrl: 'https://github.com/andiakbararyaputra/nfa-dfa-toolkit',
    status: { en: 'TOOLKIT // JAVA_CLI', id: 'PERKAKAS // JAVA_CLI' },
    isRealProject: true,
  },
  {
    id: 'sifa-falak',
    number: '09',
    code: 'WEB // FALAK_PWA',
    title: 'SIFA_FALAK',
    group: 'web-ai',
    category: {
      en: 'INTEGRATED ISLAMIC ASTRONOMY PLATFORM',
      id: 'SISTEM INFORMASI FALAK TERINTEGRASI',
    },
    tagline: {
      en: 'Offline-first TypeScript PWA for spherical trigonometry Qibla compass, 10 hisab criteria, and OSM mosque map.',
      id: 'PWA TypeScript offline-first untuk kalkulator kiblat trigonometri bola, 10 kriteria jadwal salat, dan peta masjid OSM.',
    },
    description: {
      en: 'Collaborative PKM AIK IV monorepo (apps/web + packages/hisab-core) with step-by-step astronomical hisab formulas, MapLibre + OpenStreetMap Overpass mosque discovery, Takmir verification dashboard, and 20/20 Vitest coverage.',
      id: 'Monorepo kolaboratif PKM AIK IV (apps/web + packages/hisab-core) yang menampilkan transparansi rumus hisab langkah demi langkah, peta masjid MapLibre + Overpass OSM, dashboard takmir, dan 20/20 test Vitest.',
    },
    problem: {
      en: 'Most prayer-time and Qibla apps hide the mathematical derivation and depend on steady internet access. SIFA separates core spherical astronomy into a tested offline hisab-core package and displays every intermediate value.',
      id: 'Kebanyakan aplikasi jadwal salat dan kiblat menyembunyikan proses hitungannya dan bergantung pada koneksi internet. SIFA memisahkan logika falak ke paket hisab-core teruji dan bekerja offline.',
    },
    architecture: [
      'packages/hisab-core (Spherical Math)',
      'apps/web (Next.js Offline PWA)',
      'MapLibre GL + OSM Overpass Query',
      'Layar Masjid TV Mode + Takmir Panel',
    ],
    highlights: {
      en: [
        'Spherical trigonometry great-circle Qibla calculator with animated compass and formula derivation',
        '10 selectable prayer-time criteria (Muhammadiyah, Kemenag RI, MABIMS, NU, MWL, ISNA, and more)',
        'MapLibre GL + OSM Overpass mosque directory with landscape Layar Masjid TV mode',
        'Offline-first PWA monorepo verified with 20/20 Vitest tests (collaborator contribution)',
      ],
      id: [
        'Kalkulator kiblat trigonometri bola lengkap dengan kompas aktif dan rincian rumus hisab',
        '10 pilihan kriteria jadwal salat (Muhammadiyah, Kemenag RI, MABIMS, NU, MWL, ISNA, dll.)',
        'Direktori peta masjid MapLibre GL + Overpass OSM dan mode Layar Masjid lanskap',
        'Monorepo PWA offline-first dengan 20/20 test Vitest lulus (kontribusi kolaborator)',
      ],
    },
    metrics: {
      en: ['20/20 Vitest hisab tests pass', '10 astronomical criteria supported', 'Offline-first Next.js PWA'],
      id: ['20/20 test hisab Vitest lulus', '10 kriteria falak didukung', 'PWA Next.js mode offline'],
    },
    stack: ['TypeScript', 'Next.js', 'PWA', 'MapLibre', 'Vitest', 'hisab-core'],
    image: '/images/repos/sifa-falak.png',
    gallery: [
      {
        src: '/images/repos/sifa-falak.png',
        caption: {
          en: 'SIFA spherical hisab transparency view, Qibla compass, and MapLibre mosque locator',
          id: 'Tampilan transparansi rumus hisab SIFA, kompas kiblat, dan peta masjid MapLibre',
        },
      },
    ],
    repoUrl: 'https://github.com/Muh-Asad-Habib/sistem_informasi_falak_terintegrasi',
    status: { en: 'COLLABORATOR // PWA', id: 'KOLABORATOR // PWA' },
    isRealProject: true,
  },
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    id: 'oss-systems',
    code: 'LOG-01',
    period: { en: '2025 - PRESENT', id: '2025 - SEKARANG' },
    role: {
      en: 'Open-Source Systems & Application Developer',
      id: 'Pengembang Sistem & Aplikasi Open-Source',
    },
    org: {
      en: 'GitHub (@andiakbararyaputra)',
      id: 'GitHub (@andiakbararyaputra)',
    },
    type: 'engineering',
    summary: {
      en: 'Built and published personal utilities across Arch Linux desktop tooling, offline AI apps, and Flutter mobile software.',
      id: 'Membangun dan mempublikasikan proyek mandiri untuk ekosistem desktop Arch Linux, aplikasi AI lokal, dan mobile Flutter.',
    },
    bullets: {
      en: [
        'Split Hyprland 0.57 desktop configuration into modular Lua files and added D-Bus auto-PiP plus a Noctalia Desk Clock plugin in tonal-dots.',
        'Shipped maxres (Tauri v2 offline upscaler), Finara v0.3.0 (Flutter + encrypted Drift SQLite), and INTERVIEW-APP (browser-only MiniSearch RAG).',
      ],
      id: [
        'Memisahkan konfigurasi Hyprland 0.57 ke modul Lua di tonal-dots lengkap dengan auto-PiP D-Bus dan plugin Desk Clock Noctalia.',
        'Merilis maxres (upscaler offline Tauri v2), Finara v0.3.0 (Flutter + Drift SQLite terenkripsi), dan INTERVIEW-APP (RAG MiniSearch di browser).',
      ],
    },
    tags: ['TypeScript', 'Lua', 'Flutter', 'Tauri v2', 'Hyprland'],
  },
  {
    id: 'sifa-pkm',
    code: 'LOG-02',
    period: { en: '2025 - 2026', id: '2025 - 2026' },
    role: {
      en: 'Collaborative Web & PWA Developer',
      id: 'Pengembang Web & PWA (Kolaborator)',
    },
    org: {
      en: 'PKM AIK IV // SIFA_FALAK Monorepo',
      id: 'PKM AIK IV // Monorepo SIFA_FALAK',
    },
    type: 'collaboration',
    summary: {
      en: 'Contributed to an offline-first Islamic astronomy PWA pairing a tested hisab math library with MapLibre mosque mapping.',
      id: 'Berkontribusi pada pengembangan PWA ilmu falak offline-first yang memadukan paket hitungan hisab teruji dan peta masjid MapLibre.',
    },
    bullets: {
      en: [
        'Worked across apps/web and packages/hisab-core supporting 10 prayer-time criteria and step-by-step spherical trigonometry transparency.',
        'Verified core astronomical calculations with 20/20 passing Vitest test cases and integrated OSM Overpass mosque discovery.',
      ],
      id: [
        'Mengembangkan modul pada apps/web dan packages/hisab-core untuk 10 kriteria jadwal salat serta transparansi hitungan trigonometri bola.',
        'Memvalidasi logika falak dengan 20/20 test Vitest lulus serta integrasi peta direktori masjid OSM Overpass.',
      ],
    },
    tags: ['TypeScript', 'Next.js', 'PWA', 'MapLibre', 'Vitest'],
  },
  {
    id: 'research-distributed',
    code: 'LOG-03',
    period: { en: '2024 - 2025', id: '2024 - 2025' },
    role: {
      en: 'NLP Research & Distributed Systems Builds',
      id: 'Proyek Riset NLP & Sistem Terdistribusi',
    },
    org: {
      en: 'Academic & Independent Engineering Labs',
      id: 'Lab Akademik & Proyek Mandiri',
    },
    type: 'research',
    summary: {
      en: 'Implemented unsupervised Indonesian text clustering benchmarks, fault-tolerant RPC services, and containerized REST catalogs.',
      id: 'Mengimplementasikan benchmark clustering ulasan berbahasa Indonesia, layanan RPC multi-node, dan katalog REST berbasis Docker.',
    },
    bullets: {
      en: [
        'Evaluated memetic PSO-K-Means on 377 Bapenda Sulsel Mobile app reviews using TF-IDF and SVD reduction (SSE 294.67 across 10 seeds).',
        'Built a 3-node Python XML-RPC bank simulation with Flask failover monitoring and the Dockerized Top250 Next.js + Fastify + MinIO stack.',
      ],
      id: [
        'Menguji memetic PSO-K-Means pada 377 ulasan Bapenda Sulsel Mobile memakai TF-IDF dan reduksi SVD (SSE 294.67 pada 10 seed uji).',
        'Membangun simulasi bank 3 node XML-RPC Python dengan monitor Flask serta platform Top250 berbasis Next.js, Fastify, MongoDB, dan MinIO.',
      ],
    },
    tags: ['Python', 'Scikit-learn', 'XML-RPC', 'Fastify 5', 'Docker'],
  },
  {
    id: 'unismuh-edu',
    code: 'LOG-04',
    period: { en: 'ACTIVE', id: 'AKTIF' },
    role: {
      en: 'B.S. in Informatics Engineering (S1 Teknik Informatika)',
      id: 'S1 Teknik Informatika',
    },
    org: {
      en: 'Universitas Muhammadiyah Makassar (Unismuh Makassar)',
      id: 'Universitas Muhammadiyah Makassar (Unismuh Makassar)',
    },
    type: 'education',
    summary: {
      en: 'Undergraduate study in Makassar focused on software architecture, distributed computing, formal automata, and applied machine learning.',
      id: 'Studi sarjana di Makassar yang mendalami arsitektur perangkat lunak, sistem terdistribusi, teori otomata, dan machine learning.',
    },
    bullets: {
      en: [
        'Applied coursework directly into public repositories including Java e-NFA to DFA conversion (nfa-dfa-toolkit) and 3-branch XML-RPC replication.',
        'Maintains bilingual English/Indonesian documentation and test habits across personal and team projects.',
      ],
      id: [
        'Menerapkan materi kuliah langsung ke repositori publik seperti konverter e-NFA ke DFA di Java dan replikasi bank XML-RPC 3 cabang.',
        'Membiasakan dokumentasi proyek dwibahasa (EN/ID) dan pengujian unit terstruktur di proyek individu maupun tim.',
      ],
    },
    tags: ['Java', 'Python', 'SQL', 'Automata', 'Algorithms'],
  },
];

export const TELEMETRY_KPIS: TelemetryKpi[] = [
  {
    value: 9,
    suffix: 'REPOS',
    label: { en: 'VERIFIED GITHUB PROJECTS', id: 'PROYEK GITHUB TERVERIFIKASI' },
  },
  {
    value: 6,
    suffix: 'STACKS',
    label: { en: 'LUA - TS - DART - PY - JAVA', id: 'EKOSISTEM BAHASA UTAMA' },
  },
  {
    value: 60,
    suffix: 'FPS',
    label: { en: 'GSAP SCROLL PIPELINE', id: 'PIPELINE ANIMASI GSAP' },
  },
  {
    value: 2,
    suffix: 'LANG',
    label: { en: 'EN / ID AUTO-DETECT', id: 'DETEKSI OTOMATIS EN / ID' },
  },
];

export const STACK_GROUPS: StackGroup[] = [
  {
    id: 'languages',
    label: { en: '01 // LANGUAGES', id: '01 // BAHASA PEMROGRAMAN' },
    items: [
      { name: 'TypeScript', tag: 'STRICT' },
      { name: 'Python', tag: 'ML / RPC' },
      { name: 'Dart', tag: 'FLUTTER' },
      { name: 'Lua', tag: 'HYPR_CFG' },
      { name: 'Java', tag: 'AUTOMATA' },
      { name: 'SQL', tag: 'RELATIONAL' },
    ],
  },
  {
    id: 'web',
    label: { en: '02 // WEB, MOBILE & DESKTOP', id: '02 // WEB, MOBILE & DESKTOP' },
    items: [
      { name: 'React 19', tag: 'UI' },
      { name: 'Next.js 15', tag: 'APP_ROUTER' },
      { name: 'GSAP + ScrollTrigger', tag: '60FPS' },
      { name: 'Flutter + Riverpod', tag: 'ANDROID' },
      { name: 'Tauri v2', tag: 'DESKTOP' },
      { name: 'Tailwind CSS', tag: 'STYLE' },
    ],
  },
  {
    id: 'backend',
    label: { en: '03 // BACKEND, DATA & AI', id: '03 // BACKEND, DATA & AI' },
    items: [
      { name: 'Fastify 5', tag: 'REST_API' },
      { name: 'Flask + XML-RPC', tag: '3_NODES' },
      { name: 'MongoDB + MinIO', tag: 'STORAGE' },
      { name: 'Drift SQLite', tag: 'ENCRYPTED' },
      { name: 'Scikit-learn + PSO', tag: 'K_MEANS' },
      { name: 'MiniSearch / RAG', tag: 'LOCAL_AI' },
    ],
  },
  {
    id: 'systems',
    label: { en: '04 // LINUX & WORKFLOW', id: '04 // LINUX & WORKFLOW' },
    items: [
      { name: 'CachyOS / Arch', tag: 'OS' },
      { name: 'Hyprland 0.57', tag: 'WAYLAND' },
      { name: 'Docker Compose', tag: 'CONTAINERS' },
      { name: 'Fish + Starship', tag: 'SHELL' },
      { name: 'Neovim', tag: 'EDITOR' },
      { name: 'Git', tag: 'VCS' },
    ],
  },
];
