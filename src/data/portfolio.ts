export type Lang = 'en' | 'id';
export type ProjectGroup = 'all' | 'web-ai' | 'systems-mobile' | 'data-algo';

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
  group: Exclude<ProjectGroup, 'all'>;
  featured?: boolean;
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
      en: "I'm Andi Akbar Arya Putra (@andiakbararyaputra). From modular Lua Hyprland environments and full-stack Next.js/Fastify platforms to Flutter mobile apps and distributed Python clusters, every codebase is built to be fast, observable, and resilient.",
      id: 'Saya Andi Akbar Arya Putra (@andiakbararyaputra). Mulai dari konfigurasi Hyprland berbasis Lua, platform full-stack Next.js/Fastify, aplikasi mobile Flutter, hingga sistem terdistribusi Python—setiap repositori dirancang cepat, terukur, dan mudah dirawat.',
    },
    manifestoPoints: {
      en: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, Dart/Flutter, Python, Java, Lua',
        'MISSION: Production-minded tools & expressive engineering',
      ],
      id: [
        'OS_ENV: CachyOS / Arch Linux + Hyprland 0.57 (Lua)',
        'STACK: TypeScript, Dart/Flutter, Python, Java, Lua',
        'MISI: Perkakas berorientasi produksi & rekayasa ekspresif',
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
    title: { en: 'CURATED REPOSITORIES & RUNTIME VISUALS', id: 'REPOSITORI TERKURASI & VISUAL RUNTIME' },
    subtitle: {
      en: '9 verified GitHub projects across Linux systems, full-stack web, mobile Flutter, distributed nodes, data science, and automata—paired with real runtime captures.',
      id: '9 proyek nyata GitHub di bidang sistem Linux, web full-stack, mobile Flutter, sistem terdistribusi, data science, dan otomata lengkap dengan visual runtime aslinya.',
    },
    flagshipTag: { en: 'FLAGSHIP_SHOWCASE // 01–03', id: 'SOROTAN_UTAMA // 01–03' },
    archiveTag: { en: 'ALL_REPOSITORIES // FILTERABLE_MATRIX', id: 'SELURUH_PROYEK // MATRIKS_FILTER' },
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
  telemetryHeader: {
    quote: {
      en: '"GOOD ARCHITECTURE IS INVISIBLE UNTIL YOU MEASURE IT; GREAT INTERFACES FEEL ALIVE THE MOMENT YOU MOVE."',
      id: '"ARSITEKTUR YANG BAIK TERASA RINGAN SAAT DIJALANKAN; ANTARMUKA YANG HEBAT TERASA HIDUP SAAT DISENTUH."',
    },
    marquee: {
      en: 'LET’S BUILD THE FUTURE TOGETHER  ★  9 CURATED REPOS  ★  HYPRLAND + LUA  ★  NEXT.JS + FASTIFY + FLUTTER  ★  OPEN FOR COLLABORATION  ★',
      id: 'MARI BANGUN MASA DEPAN BERSAMA  ★  9 PROYEK KURASI  ★  HYPRLAND + LUA  ★  NEXT.JS + FASTIFY + FLUTTER  ★  TERBUKA UNTUK KOLABORASI  ★',
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
      en: 'IPC buses, XML-RPC cluster replication, and state pipelines work reliably when node boundaries and failure paths are explicit.',
      id: 'Jalur IPC, replikasi klaster XML-RPC, dan pipeline state berjalan andal saat batas modul serta skenario kegagalan dirancang eksplisit.',
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
    title: { en: 'PRIVACY & LOCAL SPEED', id: 'PRIVASI & KECEPATAN LOKAL' },
    summary: {
      en: 'From local-first RAG in INTERVIEW-APP to 100% offline AI upscaling in MaxRes, critical user workflows stay fast on-device.',
      id: 'Dari retrieval lokal di INTERVIEW-APP hingga AI upscaler 100% offline di MaxRes, alur kerja penting tetap cepat di perangkat sendiri.',
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
      en: 'Live interview answer assistant grounded strictly in uploaded files—every claim carries citations or explicitly refuses.',
      id: 'Asisten jawaban wawancara langsung yang hanya mengambil fakta dari berkas unggahan—lengkap dengan sitasi atau penolakan eksplisit.',
    },
    description: {
      en: 'Zero-backend TypeScript + React 19 application that parses PDF, DOCX, PPTX, TXT, and GitHub repositories directly in the browser, indexes passages with MiniSearch, and supports local Ollama providers without leaking private documents.',
      id: 'Aplikasi TypeScript + React 19 tanpa backend yang mem-parsing PDF, DOCX, PPTX, TXT, serta repositori GitHub langsung di browser, mengindeks paragraf memakai MiniSearch, dan mendukung provider Ollama lokal.',
    },
    highlights: {
      en: [
        'In-browser parsing pipeline (pdfjs-dist, mammoth, jszip) with zero server upload required',
        'Grounded retrieval via MiniSearch + explicit refusal guardrails when evidence is missing',
        'Tested with Vitest, Testing Library, and axe-core accessibility verification (30+ commits)',
      ],
      id: [
        'Pipeline parsing langsung di browser (pdfjs-dist, mammoth, jszip) tanpa unggah ke server',
        'Retrieval berbasis MiniSearch dengan guardrail penolakan tegas saat bukti tidak ditemukan',
        'Dilengkapi uji unit Vitest, Testing Library, dan audit aksesibilitas axe-core (30+ commit)',
      ],
    },
    stack: ['TypeScript', 'React 19', 'Tailwind v4', 'MiniSearch', 'PDF.js', 'Vitest'],
    image: '/images/repos/interview-app.png',
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
      en: 'Responsive IMDb Top 250 explorer powered by Next.js 15, Fastify 5, MongoDB 7, MinIO, and semantic AI search.',
      id: 'Web penjelajah 250 film terbaik IMDb berbasis Next.js 15, Fastify 5, MongoDB 7, MinIO, dan fitur pencarian AI semantik.',
    },
    description: {
      en: 'Full-stack containerized platform featuring an idempotent TMDB + MinIO asset seeder, Fastify REST API with semantic meaning search, infinite scroll movie grid, light/dark cinema themes, and detailed cast & trailer views.',
      id: 'Platform full-stack terkontainerisasi lengkap dengan seeder idempoten TMDB + MinIO, REST API Fastify dengan pencarian berbasis makna AI, infinite scroll grid film, serta halaman detail cast & trailer.',
    },
    highlights: {
      en: [
        'Decoupled Next.js 15 App Router frontend + Fastify 5 backend orchestrated via Docker Compose',
        'Self-hosted MinIO object storage for posters and cast portraits with MongoDB unique-index upserts',
        'Dual search mode: debounced keyword/genre/year filters plus semantic AI query mode',
      ],
      id: [
        'Frontend Next.js 15 App Router + backend Fastify 5 terorkestrasi melalui Docker Compose',
        'Object storage MinIO mandiri untuk poster & foto cast dengan upsert index MongoDB',
        'Mode pencarian ganda: filter genre/tahun ter-debounce serta mode pencarian AI semantik',
      ],
    },
    stack: ['Next.js 15', 'Fastify 5', 'MongoDB 7', 'MinIO', 'Docker', 'Tailwind CSS'],
    image: '/images/repos/top250.png',
    repoUrl: 'https://github.com/andiakbararyaputra/Top250',
    status: { en: 'FULL-STACK // DOCKERIZED', id: 'FULL-STACK // DOCKER' },
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
      en: 'Free, private Tauri v2 desktop app that upscales photos 2x, 4x, 8x, or 16x locally with zero cloud uploads.',
      id: 'Aplikasi desktop Tauri v2 gratis dan privat untuk memperbesar resolusi foto 2x, 4x, 8x, hingga 16x langsung secara offline.',
    },
    description: {
      en: 'Built with React 19, TypeScript, and Tauri v2 native OS drag-and-drop APIs. Features a clean single-screen state machine, live upscale progress tracking with cancellation, experimental 16x memory safeguard, and a dedicated static landing page.',
      id: 'Dibangun dengan React 19, TypeScript, dan API drag-and-drop native Tauri v2. Dilengkapi state machine satu layar yang bersih, pelacakan progres dengan tombol batal, dan konfirmasi keamanan memori untuk mode 16x.',
    },
    highlights: {
      en: [
        '100% offline processing pipeline — images never leave the user device',
        'Native Tauri webview drag-drop + local-only upscale counter store',
        'Explicit state reducer handling 2x/4x/8x/16x factors, cancellation, and error recovery',
      ],
      id: [
        'Pipeline pemrosesan 100% offline — gambar tidak pernah dikirim keluar perangkat',
        'Integrasi drag-drop native Tauri v2 serta penyimpanan statistik lokal',
        'State reducer terstruktur untuk faktor 2x/4x/8x/16x, pembatalan proses, dan pemulihan galat',
      ],
    },
    stack: ['TypeScript', 'React 19', 'Tauri v2', 'Vite', 'Vitest'],
    image: '/images/repos/maxres.png',
    repoUrl: 'https://github.com/andiakbararyaputra/maxres',
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
      en: '"Every rupiah has a direction" — Flutter Android app for smart salary allocation, DANA+ tracking, and sanitized AI advice.',
      id: '"Setiap rupiah punya arah" — Aplikasi Flutter Android untuk alokasi gaji otomatis, DANA+, dan asisten AI finansial.',
    },
    description: {
      en: 'Feature-rich Flutter Android release (v0.3.0 APK) powered by encrypted Drift SQLite, Riverpod state management, GoRouter navigation, Bibit/Stockbit investment tracking, PIN lock security, and a privacy-sanitized AI chat assistant.',
      id: 'Aplikasi Flutter Android rilis v0.3.0 dengan Drift SQLite terenkripsi, Riverpod, GoRouter, pelacakan investasi Bibit/Stockbit, kunci PIN keamanan, dan asisten chat AI dengan sanitasi konteks finansial.',
    },
    highlights: {
      en: [
        'Splits monthly income cleanly across mandatory bills, emergency funds, investments, DANA+, and subscriptions',
        'Privacy-aware financial context sanitizer before querying OpenAI-compatible AI adapters',
        'Includes encrypted Drift SQLite schema, backup/export service, and Indonesian/English l10n',
      ],
      id: [
        'Membagi penghasilan bulanan ke pos wajib, dana darurat, investasi, DANA+, dan langganan',
        'Layer sanitasi data finansial sebelum mengirim konteks ke adapter AI OpenAI-compatible',
        'Dilengkapi database Drift SQLite terenkripsi, layanan backup/ekspor, dan lokalisasi EN/ID',
      ],
    },
    stack: ['Dart', 'Flutter', 'Riverpod', 'Drift SQLite', 'GoRouter', 'Android'],
    image: '/images/repos/finara.png',
    repoUrl: 'https://github.com/andiakbararyaputra/Finara',
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
      en: 'Synchronized 3-branch distributed banking simulation (Jakarta, Bandung, Surabaya) with automatic failover and Flask dashboard.',
      id: 'Simulasi sistem bank terdistribusi 3 node cabang (Jakarta, Bandung, Surabaya) dengan replikasi state dan failover otomatis.',
    },
    description: {
      en: 'Built with Python XML-RPC servers and a real-time Flask web gateway. Demonstrates peer-to-peer state replication, automatic branch failover when a node drops offline, atomic deposit/withdraw/transfer operations, and single-command local or multi-LAN deployment.',
      id: 'Dibangun dengan server XML-RPC Python dan web gateway Flask real-time. Mendemonstrasikan replikasi state antar peer, failover cabang otomatis saat satu node mati, serta operasi setor/tarik/transfer di mode lokal maupun multi-LAN.',
    },
    highlights: {
      en: [
        'Live topology visualizer showing active branch health (:8001, :8002, :8003) and state version sync',
        'Automatic gateway failover routing when any regional branch node disconnects',
        'Supports both single-machine startup (run_all.py) and multi-laptop LAN mode via network.json',
      ],
      id: [
        'Visualisator topologi langsung yang memantau kesehatan node (:8001–:8003) dan versi replikasi',
        'Routing failover otomatis pada gateway Flask saat salah satu node cabang terputus',
        'Mendukung eksekusi satu komputer (run_all.py) maupun mode multi-laptop LAN via network.json',
      ],
    },
    stack: ['Python', 'Flask 3', 'XML-RPC', 'JSON Replication', 'Distributed Systems'],
    image: '/images/repos/bank-terdistribusi.png',
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
      id: 'KLASTERISASI NLP (K-MEANS + PSO)',
    },
    tagline: {
      en: 'Automated topic clustering on 377 Bapenda Sulsel Mobile app reviews optimizing K-Means centroids via Particle Swarm Optimization.',
      id: 'Pelabelan topik otomatis pada 377 ulasan aplikasi Bapenda Sulsel Mobile memakai K-Means yang dioptimasi Particle Swarm Optimization (PSO).',
    },
    description: {
      en: 'Computational engineering research notebook pipeline combining TF-IDF (377×739), TruncatedSVD LSA reduction (377×25), and memetic PSO–K-Means across 10 benchmark seeds (K=3), reducing SSE to 294.67 and improving Silhouette and Davies-Bouldin scores.',
      id: 'Pipeline riset Rekayasa Komputasional yang memadukan TF-IDF (377×739), reduksi LSA SVD (377×25), dan memetic PSO–K-Means pada 10 seed uji (K=3), menurunkan SSE ke 294.67 serta meningkatkan skor Silhouette dan Davies-Bouldin.',
    },
    highlights: {
      en: [
        'Clustered 377 validated user reviews into 3 actionable topics: App UX/Performance (171), Samsat Payment (139), Tax Check (67)',
        'Memetic PSO–K-Means improved 10-seed average Silhouette (+0.006165) and lowered Davies-Bouldin (-0.1534)',
        'Full reproducible Jupyter Notebook with exported CSV/Excel topic labeling datasets',
      ],
      id: [
        'Mengelompokkan 377 ulasan tervalidasi ke 3 topik utama: Kinerja App (171), Layanan Samsat (139), Info Pajak (67)',
        'Optimasi centroid PSO–K-Means menaikkan rata-rata Silhouette (+0.006165) dan menurunkan Davies-Bouldin (-0.1534)',
        'Jupyter Notebook lengkap yang dapat direproduksi beserta dataset hasil pelabelan CSV/Excel',
      ],
    },
    stack: ['Python', 'Jupyter Notebook', 'Scikit-learn', 'TF-IDF / LSA', 'PSO'],
    image: '/images/repos/bapenda-clustering.png',
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
      en: 'JAVA ε-NFA TO DFA SUBSET CONVERTER',
      id: 'KONVERTER ε-NFA KE DFA (JAVA CLI)',
    },
    tagline: {
      en: 'Interactive Java console toolkit for defining ε-NFA/DFA automata, printing transition tables, and step-by-step subset construction.',
      id: 'Program konsol Java interaktif untuk mendefinisikan ε-NFA/DFA, mencetak tabel transisi, dan menelusuri konversi subset construction.',
    },
    description: {
      en: 'Built for Automata and Formal Language Theory: supports arbitrary ε-transitions, computes ε-closures and DFA reachable state sets transparently with step-by-step logs, includes a preloaded 0*1*2* ε-NFA example, and tests string acceptance on both automata.',
      id: 'Dibangun untuk mata kuliah Teori Otomata & Bahasa Formal: mendukung transisi ε, menghitung ε-closure dan himpunan state DFA secara transparan langkah demi langkah, menyediakan contoh ε-NFA 0*1*2*, dan menguji penerimaan string.',
    },
    highlights: {
      en: [
        'Pure standard-library Java architecture split cleanly across Main, NFA, DFA, Converter, and Table',
        'Prints formatted transition tables with start (→) and accept (*) state indicators',
        'Traces exact state transitions during both subset construction and string evaluation',
      ],
      id: [
        'Arsitektur Java standar yang terstruktur rapi pada Main, NFA, DFA, Converter, dan Table',
        'Mencetak tabel transisi terformat dengan penanda state awal (→) dan state akhir (*)',
        'Menampilkan jejak perpindahan state secara rinci saat konversi maupun pengujian string',
      ],
    },
    stack: ['Java', 'Subset Construction', 'ε-NFA / DFA', 'CLI Toolkit'],
    image: '/images/repos/nfa-dfa-toolkit.png',
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
      en: 'Offline-first TypeScript PWA for spherical trigonometry Qibla compass, 10 prayer-time hisab criteria, OSM mosque map, and TV display mode.',
      id: 'PWA TypeScript offline-first untuk hisab Arah Kiblat trigonometri bola, 10 kriteria waktu salat, peta masjid OSM, dan Layar Masjid.',
    },
    description: {
      en: 'Collaborative PKM AIK IV monorepo (apps/web + packages/hisab-core) delivering transparent step-by-step astronomical hisab calculations, real-time MapLibre + OpenStreetMap Overpass mosque discovery, Takmir Qibla verification dashboard, and 20/20 Vitest test coverage.',
      id: 'Monorepo kolaboratif PKM AIK IV (apps/web + packages/hisab-core) dengan panel transparansi hisab astronomis step-by-step, direktori & peta masjid MapLibre + OpenStreetMap Overpass, dashboard takmir, serta cakupan uji 20/20 Vitest.',
    },
    highlights: {
      en: [
        'Spherical trigonometry great-circle Qibla calculator with real-time animated compass and hisab derivation',
        '10 selectable prayer-time calculation criteria (Muhammadiyah, Kemenag RI, MABIMS, NU, MWL, ISNA, etc.)',
        'MapLibre GL + OSM Overpass mosque directory with responsive landscape Layar Masjid TV mode',
        'Offline-first PWA monorepo verified with 20/20 Vitest tests (collaborator contribution)',
      ],
      id: [
        'Kalkulator arah kiblat trigonometri segitiga bola dengan kompas animasi dan rincian rumus hisab',
        '10 pilihan kriteria hisab jadwal salat (Muhammadiyah, Kemenag RI, MABIMS, NU, MWL, ISNA, dll.)',
        'Peta direktori masjid MapLibre GL + OSM Overpass serta mode TV Layar Masjid otomatis lanskap',
        'Monorepo PWA offline-first teruji 20/20 Vitest (proyek kontribusi kolaborator)',
      ],
    },
    stack: ['TypeScript', 'Next.js', 'PWA', 'MapLibre', 'Vitest', 'hisab-core'],
    image: '/images/repos/sifa-falak.png',
    repoUrl: 'https://github.com/Muh-Asad-Habib/sistem_informasi_falak_terintegrasi',
    status: { en: 'COLLABORATOR // PWA', id: 'KOLABORATOR // PWA' },
    isRealProject: true,
  },
];

export const TELEMETRY_KPIS: TelemetryKpi[] = [
  {
    value: 9,
    suffix: 'REPOS',
    label: { en: 'CURATED PROJECTS', id: 'PROYEK TERKURASI' },
  },
  {
    value: 6,
    suffix: 'STACKS',
    label: { en: 'LUA · TS · DART · PY · JAVA', id: 'EKOSISTEM BAHASA' },
  },
  {
    value: 60,
    suffix: 'FPS',
    label: { en: 'GSAP GPU PIPELINE', id: 'PIPELINE GPU GSAP' },
  },
  {
    value: 2,
    suffix: 'LANG',
    label: { en: 'EN / ID INTERFACE', id: 'ANTARMUKA EN / ID' },
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
    label: { en: '02 // WEB, MOBILE & MOTION', id: '02 // WEB, MOBILE & ANIMASI' },
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
    label: { en: '04 // LINUX & INFRASTRUCTURE', id: '04 // LINUX & INFRASTRUKTUR' },
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
