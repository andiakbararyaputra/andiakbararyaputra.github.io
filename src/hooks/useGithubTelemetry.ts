import { useEffect, useState } from 'react';

export interface GithubTelemetryState {
  publicRepos: number;
  totalStars: number;
  followers: number;
  latestRepo: string;
  isLive: boolean;
  fps: number;
  uptime: string;
}

interface CachedGithubPayload {
  publicRepos: number;
  totalStars: number;
  followers: number;
  latestRepo: string;
}

const CACHE_KEY = 'aaap_gh_stats_v1';
const FALLBACK_STATS: CachedGithubPayload = {
  publicRepos: 9,
  totalStars: 4,
  followers: 2,
  latestRepo: 'tonal-dots',
};

function formatUptime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':');
}

function readCachedStats(): CachedGithubPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CachedGithubPayload>;
    if (
      typeof parsed.publicRepos === 'number' &&
      typeof parsed.totalStars === 'number' &&
      typeof parsed.followers === 'number' &&
      typeof parsed.latestRepo === 'string'
    ) {
      return parsed as CachedGithubPayload;
    }
  } catch {
    // Ignore invalid or inaccessible sessionStorage
  }
  return null;
}

export function useGithubTelemetry(measureFps = true): GithubTelemetryState {
  const [ghStats, setGhStats] = useState<CachedGithubPayload>(() => readCachedStats() ?? FALLBACK_STATS);
  const [isLive, setIsLive] = useState<boolean>(() => readCachedStats() !== null);
  const [fps, setFps] = useState<number>(60);
  const [uptimeSeconds, setUptimeSeconds] = useState<number>(0);

  // Fetch GitHub public stats once per session with 5s timeout
  useEffect(() => {
    const cached = readCachedStats();
    if (cached) {
      setGhStats(cached);
      setIsLive(true);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);

    const loadStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/andiakbararyaputra', {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch('https://api.github.com/users/andiakbararyaputra/repos?per_page=100&sort=pushed', {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) return;

        const userData = (await userRes.json()) as {
          public_repos?: number;
          followers?: number;
        };
        const reposData = (await reposRes.json()) as Array<{
          name?: string;
          stargazers_count?: number;
        }>;

        const totalStars = Array.isArray(reposData)
          ? reposData.reduce((acc, item) => acc + (item.stargazers_count ?? 0), 0)
          : FALLBACK_STATS.totalStars;
        const latestRepo =
          Array.isArray(reposData) && reposData.length > 0 && reposData[0]?.name
            ? reposData[0].name
            : FALLBACK_STATS.latestRepo;

        const nextPayload: CachedGithubPayload = {
          publicRepos:
            typeof userData.public_repos === 'number'
              ? userData.public_repos
              : FALLBACK_STATS.publicRepos,
          totalStars,
          followers:
            typeof userData.followers === 'number'
              ? userData.followers
              : FALLBACK_STATS.followers,
          latestRepo,
        };

        setGhStats(nextPayload);
        setIsLive(true);
        try {
          window.sessionStorage.setItem(CACHE_KEY, JSON.stringify(nextPayload));
        } catch {
          // Ignore storage errors
        }
      } catch {
        // Keep static verified fallback silently when offline or rate-limited
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    void loadStats();

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  // Real client FPS measurement (active only when section is visible)
  useEffect(() => {
    if (!measureFps) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFps(60);
      return;
    }

    let rafId = 0;
    let frames = 0;
    let lastSample = performance.now();

    const tick = (now: number) => {
      frames += 1;
      const elapsed = now - lastSample;
      if (elapsed >= 600) {
        const measured = Math.min(120, Math.max(1, Math.round((frames * 1000) / elapsed)));
        setFps(measured);
        frames = 0;
        lastSample = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [measureFps]);

  // Real active session uptime counter
  useEffect(() => {
    const startMs = Date.now();
    const timer = window.setInterval(() => {
      setUptimeSeconds(Math.floor((Date.now() - startMs) / 1000));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return {
    ...ghStats,
    isLive,
    fps,
    uptime: formatUptime(uptimeSeconds),
  };
}
