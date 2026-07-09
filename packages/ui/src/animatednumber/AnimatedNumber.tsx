'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easing?: 'linear' | 'easeOut' | 'easeInOut';
}

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

export function AnimatedNumber({
  value,
  duration = 1000,
  format,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
  easing = 'easeOut',
}: AnimatedNumberProps) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    startRef.current = prevValueRef.current;
    startTimeRef.current = null;

    const easeFn = easing === 'linear' ? (t: number) => t : easing === 'easeOut' ? easeOut : easeInOut;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeFn(t);
      const current = startRef.current + (value - startRef.current) * eased;
      setDisplayed(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = value;
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration, easing]);

  const formatted = format
    ? format(displayed)
    : displayed.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span className={`gy-animated-number ${className}`} aria-live="polite" aria-atomic="true">
      {prefix}{formatted}{suffix}
    </span>
  );
}
