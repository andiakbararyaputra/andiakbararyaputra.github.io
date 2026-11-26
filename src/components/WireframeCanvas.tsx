import { useEffect, useRef } from 'react';
import { PROFILE } from '../data/portfolio';
import { THEME_PRESETS, ThemePreset } from '../utils/preferences';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface WireframeCanvasProps {
  theme: ThemePreset;
}

function createFibonacciSphere(count: number): Point3D[] {
  const pts: Point3D[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    pts.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return pts;
}

export function WireframeCanvas({ theme }: WireframeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const coordsTextRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<ThemePreset>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points = createFibonacciSphere(74);
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let angleY = 0.4;
    let angleX = 0.2;
    let frameCounter = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.4;
      pointer.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.4;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove, { passive: true });

    const render = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const tokens = THEME_PRESETS[themeRef.current];

      if (!reduced) {
        angleY += 0.0045;
        pointer.x += (pointer.targetX - pointer.x) * 0.07;
        pointer.y += (pointer.targetY - pointer.y) * 0.07;
      }

      const rotY = angleY + pointer.x;
      const rotX = angleX + pointer.y * 0.6;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const scale = Math.min(w, h) * 0.42;
      const cx = w * 0.5;
      const cy = h * 0.47;

      const projected = points.map((p, idx) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;
        const perspective = 2.6 / (2.6 - z2);
        return {
          idx,
          sx: cx + x1 * scale * perspective,
          sy: cy + y2 * scale * perspective,
          z: z2,
        };
      });

      ctx.save();
      ctx.strokeStyle = `rgba(${tokens.secondaryRgb}, 0.22)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, scale * 1.08, scale * 0.34, rotX * 0.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(${tokens.primaryRgb}, 0.2)`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, scale * 0.94, scale * 0.94, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        if (a.z < -0.3) continue;
        for (let j = i + 1; j < projected.length; j++) {
          const b = projected[j];
          if (b.z < -0.3) continue;
          const dx = a.sx - b.sx;
          const dy = a.sy - b.sy;
          const dist = Math.hypot(dx, dy);
          if (dist < scale * 0.46) {
            const alpha = (1 - dist / (scale * 0.46)) * 0.3;
            ctx.strokeStyle =
              i % 5 === 0
                ? `rgba(${tokens.primaryRgb}, ${alpha})`
                : `rgba(${tokens.secondaryRgb}, ${alpha * 1.05})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const isPrimary = i % 7 === 0;
        const alpha = Math.max(0.18, (p.z + 1.1) / 2.1);
        ctx.fillStyle = isPrimary
          ? `rgba(${tokens.primaryRgb}, ${alpha})`
          : `rgba(${tokens.secondaryRgb}, ${alpha * 0.8})`;
        ctx.fillRect(p.sx - 1.5, p.sy - 1.5, isPrimary ? 3.5 : 2.2, isPrimary ? 3.5 : 2.2);
      }

      frameCounter++;
      if (frameCounter % 6 === 0 && coordsTextRef.current) {
        const latBase = Number(PROFILE.coordinates.lat);
        const lonBase = Number(PROFILE.coordinates.lon);
        const latVal = (latBase + Math.sin(rotX) * 0.0042).toFixed(4);
        const lonVal = (lonBase + Math.cos(rotY) * 0.0042).toFixed(4);
        const rotVal = ((Math.abs(rotY * 57.2958) % 360)).toFixed(1).padStart(5, '0');
        coordsTextRef.current.innerHTML = `LAT_${latVal}<br/>LON_${lonVal}<br/>ROT_${rotVal}DEG`;
      }

      if (!reduced) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          zIndex: 2,
        }}
      />
      <div
        ref={coordsTextRef}
        className="hero-hud-telemetry-box"
        aria-hidden="true"
      >
        LAT_{PROFILE.coordinates.lat}
        <br />
        LON_{PROFILE.coordinates.lon}
        <br />
        ROT_022.9DEG
      </div>
    </>
  );
}
