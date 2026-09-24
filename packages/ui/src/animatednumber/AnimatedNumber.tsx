"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography, TypographyWeight } from "../typography";
import "./animatednumber.css";

export type AnimatedNumberVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export type AnimatedNumberWeight =
  | "bold"
  | "semibold"
  | "medium"
  | "regular"
  | "light";

export type AnimatedNumberMode = "counter" | "roller";

export type AnimatedNumberEasing =
  | "easeOutExpo"
  | "easeOutQuart"
  | "easeOut"
  | "easeInOut"
  | "spring"
  | "linear";

export interface AnimatedNumberProps {
  value: number;
  variant?: AnimatedNumberVariant;
  weight?: AnimatedNumberWeight;
  duration?: number;
  mode?: AnimatedNumberMode;
  easing?: AnimatedNumberEasing;
  initialValue?: number;
  animateOnMount?: boolean;
  format?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  onComplete?: () => void;
}

// Easing functions
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const spring = (t: number) =>
  t === 1
    ? 1
    : (1 - Math.pow(2, -10 * t)) * (1 + 0.08 * Math.sin(t * Math.PI * 3.5));
const linear = (t: number) => t;

const easingMap: Record<AnimatedNumberEasing, (t: number) => number> = {
  easeOutExpo,
  easeOutQuart,
  easeOut: easeOutCubic,
  easeInOut,
  spring,
  linear,
};

function RollerDigit({
  char,
  duration,
  delay = 0,
}: {
  char: string;
  duration: number;
  delay?: number;
}) {
  const isDigit = /^[0-9]$/.test(char);

  if (!isDigit) {
    return <span className="gy-animated-number__symbol">{char}</span>;
  }

  const digit = parseInt(char, 10);

  return (
    <span className="gy-animated-number__digit-column">
      <span
        className="gy-animated-number__digit-track"
        style={{
          transform: `translateY(-${digit * 10}%)`,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="gy-animated-number__digit">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export function AnimatedNumber({
  value,
  variant = "span",
  weight = "regular",
  duration = 1000,
  mode = "counter",
  easing = "easeOutExpo",
  initialValue,
  animateOnMount = true,
  format,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
  onComplete,
}: AnimatedNumberProps) {
  const startingValue =
    initialValue !== undefined ? initialValue : animateOnMount ? 0 : value;

  const [displayed, setDisplayed] = useState(startingValue);
  const currentValueRef = useRef(startingValue);
  const startRef = useRef(startingValue);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [hasMounted, setHasMounted] = useState(!animateOnMount);

  // Roller mount trigger
  useEffect(() => {
    if (animateOnMount && !hasMounted) {
      const timer = requestAnimationFrame(() => setHasMounted(true));
      return () => cancelAnimationFrame(timer);
    }
  }, [animateOnMount, hasMounted]);

  // Smooth Counter Animation Loop
  useEffect(() => {
    if (mode === "roller") return;

    const fromVal = currentValueRef.current;
    const toVal = value;
    startRef.current = fromVal;
    startTimeRef.current = null;

    if (fromVal === toVal) {
      setDisplayed(toVal);
      return;
    }

    const easeFn = easingMap[easing] ?? easeOutExpo;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / Math.max(duration, 1), 1);
      const eased = easeFn(progress);
      const current = startRef.current + (toVal - startRef.current) * eased;

      currentValueRef.current = progress >= 1 ? toVal : current;
      setDisplayed(currentValueRef.current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration, easing, mode, onComplete]);

  const formatNumber = (num: number) => {
    if (format) return format(num);
    const parts = num.toFixed(decimals).split(".");
    parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  const weightMap: Record<AnimatedNumberWeight, TypographyWeight> = {
    bold: "bold",
    semibold: "semibold",
    medium: "medium",
    regular: "normal",
    light: "light",
  };

  const Component = variant.startsWith("h")
    ? (variant as any)
    : variant === "p"
      ? "p"
      : "span";

  // Mode: Roller (Slot Machine / Odometer)
  if (mode === "roller") {
    const targetVal = hasMounted ? value : startingValue;
    const formattedStr = formatNumber(targetVal);
    const characters = formattedStr.split("");

    return (
      <Typography
        as={Component}
        variant={
          variant === "p" ? "p" : variant === "span" ? "span" : (variant as any)
        }
        weight={weightMap[weight]}
        className={`gy-animated-number gy-animated-number--roller ${className}`}
      >
        {prefix && <span className="gy-animated-number__prefix">{prefix}</span>}
        {characters.map((char, index) => {
          const revIndex = characters.length - 1 - index;
          const delay = Math.min(revIndex * 30, 200);
          return (
            <RollerDigit
              key={`${characters.length}-${index}`}
              char={char}
              duration={duration}
              delay={delay}
            />
          );
        })}
        {suffix && <span className="gy-animated-number__suffix">{suffix}</span>}
      </Typography>
    );
  }

  // Mode: Counter
  const formattedContent = `${prefix}${formatNumber(displayed)}${suffix}`;

  return (
    <Typography
      as={Component}
      variant={
        variant === "p" ? "p" : variant === "span" ? "span" : (variant as any)
      }
      weight={weightMap[weight]}
      className={`gy-animated-number ${className}`}
    >
      {formattedContent}
    </Typography>
  );
}
