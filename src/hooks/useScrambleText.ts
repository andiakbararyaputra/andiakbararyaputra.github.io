import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = '/_#X01<>[]*%$';

export function useScrambleText(targetText: string) {
  const [displayText, setDisplayText] = useState(targetText);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(targetText);
  }, [targetText]);

  const trigger = useCallback(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayText(targetText);
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    let iteration = 0;
    const total = targetText.length;

    const step = () => {
      const next = targetText
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration) return targetText[idx];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(next);
      iteration += 0.55;

      if (iteration < total) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(targetText);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [targetText]);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return { displayText, trigger };
}
