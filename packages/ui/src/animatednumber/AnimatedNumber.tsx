"use client";

import React, { useEffect, useRef, useState } from "react";
import { Typography, TypographyWeight } from "../typography";

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

export interface AnimatedNumberProps {
  value: number;
  variant?: AnimatedNumberVariant;
  weight?: AnimatedNumberWeight;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  easing?: "linear" | "easeOut" | "easeInOut";
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function AnimatedNumber({
  value,
  variant = "span",
  weight = "regular",
  duration = 1000,
  format,
  className = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  easing = "easeOut",
}: AnimatedNumberProps) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const prevValueRef = useRef(0);

  useEffect(() => {
    startRef.current = prevValueRef.current;
    startTimeRef.current = null;

    const easeFn =
      easing === "linear"
        ? (t: number) => t
        : easing === "easeOut"
          ? easeOut
          : easeInOut;

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
    : displayed.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const content = `${prefix}${formatted}${suffix}`;

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

  return (
    <Typography
      as={Component}
      variant={
        variant === "p" ? "p" : variant === "span" ? "span" : (variant as any)
      }
      weight={weightMap[weight]}
      className={`gy-animated-number ${className}`}
    >
      {content}
    </Typography>
  );
}
