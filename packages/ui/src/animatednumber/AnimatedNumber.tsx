"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

export type AnimatedNumberMode = "counter" | "roller" | "slide" | "flip";

export type AnimatedNumberEasing =
  | "easeOutExpo"
  | "easeOutQuart"
  | "easeOut"
  | "easeInOut"
  | "spring"
  | "bounce"
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
  /** Number of complete 0-9 revolutions to spin through in roller mode. Default: 2 */
  revolutions?: number;
  /** Stagger delay in milliseconds between adjacent digits. Default: 35 */
  stagger?: number;
  /** Direction of the stagger cascade. Default: "right-to-left" */
  staggerDirection?: "right-to-left" | "left-to-right";
  /** Whether to show subtle top and bottom gradient fade vignette in roller/slide mode. Default: true */
  showGradientMask?: boolean;
  /** Custom CSS transition timing function override */
  timingFunction?: string;
  /** Whether to trigger a subtle scale bounce when counter updates. Default: false */
  pulseOnUpdate?: boolean;
  /** Color theme accent or custom CSS color string */
  color?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

// ── Easing Functions (rAF Counter Mode) ──────────────────────────────────────
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const spring = (t: number) =>
  t === 1
    ? 1
    : (1 - Math.pow(2, -10 * t)) * (1 + 0.12 * Math.sin(t * Math.PI * 4));
const bounce = (t: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  let x = t;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
};
const linear = (t: number) => t;

const easingMap: Record<AnimatedNumberEasing, (t: number) => number> = {
  easeOutExpo,
  easeOutQuart,
  easeOut: easeOutCubic,
  easeInOut,
  spring,
  bounce,
  linear,
};

// ── CSS Easing Curves (Roller, Slide & Flip Modes) ───────────────────────────
export const cssEasingMap: Record<AnimatedNumberEasing, string> = {
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  linear: "linear",
};

// ── 1. Roller Digit (Multi-Revolution Odometer Reel) ─────────────────────────
type RollerDigitProps = {
  char: string;
  duration: number;
  delay?: number;
  revolutions?: number;
  timingFunction?: string;
  hasMounted: boolean;
};

function RollerDigit(props: RollerDigitProps) {
  if (!/^[0-9]$/.test(props.char)) {
    return <span className="gy-animated-number__symbol">{props.char}</span>;
  }
  return <RollerReel {...props} />;
}

function RollerReel({
  char,
  duration,
  delay = 0,
  revolutions = 2,
  timingFunction = "cubic-bezier(0.16, 1, 0.3, 1)",
  hasMounted,
}: RollerDigitProps) {
  const digit = parseInt(char, 10);
  const prevDigitRef = useRef(hasMounted ? digit : 0);
  const targetIndexRef = useRef(hasMounted ? digit : 0);
  const [targetIndex, setTargetIndex] = useState(hasMounted ? digit : 0);

  useEffect(() => {
    if (!hasMounted) return;
    const prev = prevDigitRef.current;
    const diff = (digit - (prev % 10) + 10) % 10;
    const steps = revolutions * 10 + diff;
    const next = targetIndexRef.current + steps;
    prevDigitRef.current = digit;
    targetIndexRef.current = next;
    setTargetIndex(next);
  }, [digit, revolutions, hasMounted]);

  const totalLength = Math.max(targetIndex + 14, 30);
  const digits = useMemo(
    () => Array.from({ length: totalLength }, (_, i) => i % 10),
    [totalLength],
  );

  return (
    <span className="gy-animated-number__digit-column">
      <span
        className="gy-animated-number__digit-track"
        style={{
          transform: `translate3d(0, -${targetIndex * 1.15}em, 0)`,
          transitionDuration: `${duration}ms`,
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: timingFunction,
        }}
      >
        {digits.map((n, idx) => (
          <span key={idx} className="gy-animated-number__digit">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

// ── 2. Slide Digit (Vertical Slide & Blur Transition) ────────────────────────
function SlideDigit({
  char,
  duration,
  delay = 0,
  timingFunction = "cubic-bezier(0.16, 1, 0.3, 1)",
}: {
  char: string;
  duration: number;
  delay?: number;
  timingFunction?: string;
}) {
  const isDigit = /^[0-9]$/.test(char);

  if (!isDigit) {
    return <span className="gy-animated-number__symbol">{char}</span>;
  }

  return (
    <span className="gy-animated-number__slide-column">
      <span
        key={char}
        className="gy-animated-number__slide-item"
        style={{
          animationDuration: `${duration}ms`,
          animationDelay: `${delay}ms`,
          animationTimingFunction: timingFunction,
        }}
      >
        {char}
      </span>
    </span>
  );
}

// ── 3. Flip Digit (True Split-Flap Mechanical Display) ────────────────────────
type FlipDigitProps = {
  char: string;
  duration: number;
  delay?: number;
  timingFunction?: string;
};

function FlipDigit(props: FlipDigitProps) {
  if (!/^[0-9]$/.test(props.char)) {
    return <span className="gy-animated-number__symbol">{props.char}</span>;
  }
  return <FlipCard {...props} />;
}

function FlipCard({
  char,
  duration,
  delay = 0,
  timingFunction = "cubic-bezier(0.3, 1.4, 0.4, 1)",
}: FlipDigitProps) {
  const [currentDigit, setCurrentDigit] = useState(char);
  const [previousDigit, setPreviousDigit] = useState(char);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipKeyRef = useRef(0);
  const lastCharRef = useRef(char);

  useEffect(() => {
    const lastChar = lastCharRef.current;
    if (char !== lastChar) {
      lastCharRef.current = char;
      setPreviousDigit(lastChar);
      setCurrentDigit(char);
      setIsFlipping(true);
      flipKeyRef.current += 1;

      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, duration + delay);

      return () => clearTimeout(timer);
    }
  }, [char, duration, delay]);

  return (
    <span
      className="gy-animated-number__flip-column"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Static upper half — shows NEW digit */}
      <span className="gy-animated-number__flip-upper">
        <span className="gy-animated-number__flip-digit-inner">
          {currentDigit}
        </span>
      </span>

      {/* Static lower half — shows OLD digit (behind flip) then NEW */}
      <span className="gy-animated-number__flip-lower">
        <span className="gy-animated-number__flip-digit-inner">
          {isFlipping ? previousDigit : currentDigit}
        </span>
      </span>

      {/* Animated: old upper folds DOWN (hinge at center) */}
      {isFlipping && (
        <span
          key={`upper-${flipKeyRef.current}`}
          className="gy-animated-number__flip-fold-upper"
          style={{
            animationDuration: `${duration * 0.5}ms`,
            animationDelay: `${delay}ms`,
            animationTimingFunction: timingFunction,
          }}
        >
          <span className="gy-animated-number__flip-digit-inner">
            {previousDigit}
          </span>
        </span>
      )}

      {/* Animated: new lower unfolds UP (hinge at center) */}
      {isFlipping && (
        <span
          key={`lower-${flipKeyRef.current}`}
          className="gy-animated-number__flip-fold-lower"
          style={{
            animationDuration: `${duration * 0.5}ms`,
            animationDelay: `${delay + duration * 0.35}ms`,
            animationTimingFunction: timingFunction,
          }}
        >
          <span className="gy-animated-number__flip-digit-inner">
            {currentDigit}
          </span>
        </span>
      )}

      {/* Center divider line */}
      <span className="gy-animated-number__flip-divider" />
    </span>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
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
  revolutions = 2,
  stagger = 35,
  staggerDirection = "right-to-left",
  showGradientMask = true,
  timingFunction: customTimingFunction,
  pulseOnUpdate = false,
  color,
  style,
}: AnimatedNumberProps) {
  const startingValue =
    initialValue !== undefined ? initialValue : animateOnMount ? 0 : value;

  const [displayed, setDisplayed] = useState(startingValue);
  const currentValueRef = useRef(startingValue);
  const startRef = useRef(startingValue);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [hasMounted, setHasMounted] = useState(!animateOnMount);
  const [isPulsing, setIsPulsing] = useState(false);
  const prevValRef = useRef(value);

  // Mount trigger for discrete digit modes
  useEffect(() => {
    if (animateOnMount && !hasMounted) {
      const timer = requestAnimationFrame(() => setHasMounted(true));
      return () => cancelAnimationFrame(timer);
    }
  }, [animateOnMount, hasMounted]);

  // Pulse effect on value update
  useEffect(() => {
    if (pulseOnUpdate && prevValRef.current !== value) {
      prevValRef.current = value;
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 250);
      return () => clearTimeout(timer);
    }
  }, [value, pulseOnUpdate]);

  // Smooth Counter Animation Loop (rAF Interpolation)
  useEffect(() => {
    if (mode !== "counter") return;

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

  const Component: React.ElementType = variant;

  const effectiveTimingFunction =
    customTimingFunction ??
    cssEasingMap[easing] ??
    "cubic-bezier(0.16, 1, 0.3, 1)";

  const inlineStyles: React.CSSProperties = {
    ...(color ? { color } : {}),
    ...style,
  };

  // ── Mode: Roller (Multi-Turn Odometer Reel) ────────────────────────────────
  if (mode === "roller") {
    const targetVal = hasMounted ? value : startingValue;
    const formattedStr = formatNumber(targetVal);
    const characters = formattedStr.split("");

    return (
      <Typography
        as={Component}
        variant={variant}
        weight={weightMap[weight]}
        className={`gy-animated-number gy-animated-number--roller ${
          showGradientMask ? "gy-animated-number--masked" : ""
        } ${className}`.trim()}
        style={inlineStyles}
      >
        {prefix && <span className="gy-animated-number__prefix">{prefix}</span>}
        {characters.map((char, index) => {
          const delay =
            staggerDirection === "right-to-left"
              ? Math.min((characters.length - 1 - index) * stagger, 350)
              : Math.min(index * stagger, 350);

          return (
            <RollerDigit
              key={`${characters.length}-${index}`}
              char={char}
              duration={duration}
              delay={delay}
              revolutions={revolutions}
              timingFunction={effectiveTimingFunction}
              hasMounted={hasMounted}
            />
          );
        })}
        {suffix && <span className="gy-animated-number__suffix">{suffix}</span>}
      </Typography>
    );
  }

  // ── Mode: Slide (Vertical Slide & Soft Blur Transition) ────────────────────
  if (mode === "slide") {
    const targetVal = hasMounted ? value : startingValue;
    const formattedStr = formatNumber(targetVal);
    const characters = formattedStr.split("");

    return (
      <Typography
        as={Component}
        variant={variant}
        weight={weightMap[weight]}
        className={`gy-animated-number gy-animated-number--slide ${
          showGradientMask ? "gy-animated-number--masked" : ""
        } ${className}`.trim()}
        style={inlineStyles}
      >
        {prefix && <span className="gy-animated-number__prefix">{prefix}</span>}
        {characters.map((char, index) => {
          const delay =
            staggerDirection === "right-to-left"
              ? Math.min((characters.length - 1 - index) * stagger, 300)
              : Math.min(index * stagger, 300);

          return (
            <SlideDigit
              key={`${characters.length}-${index}`}
              char={char}
              duration={duration}
              delay={delay}
              timingFunction={effectiveTimingFunction}
            />
          );
        })}
        {suffix && <span className="gy-animated-number__suffix">{suffix}</span>}
      </Typography>
    );
  }

  // ── Mode: Flip (3D Split-Flap Transition) ──────────────────────────────────
  if (mode === "flip") {
    const targetVal = hasMounted ? value : startingValue;
    const formattedStr = formatNumber(targetVal);
    const characters = formattedStr.split("");

    return (
      <Typography
        as={Component}
        variant={variant}
        weight={weightMap[weight]}
        className={`gy-animated-number gy-animated-number--flip ${className}`.trim()}
        style={inlineStyles}
      >
        {prefix && <span className="gy-animated-number__prefix">{prefix}</span>}
        {characters.map((char, index) => {
          const delay =
            staggerDirection === "right-to-left"
              ? Math.min((characters.length - 1 - index) * stagger, 300)
              : Math.min(index * stagger, 300);

          return (
            <FlipDigit
              key={`${characters.length}-${index}`}
              char={char}
              duration={duration}
              delay={delay}
              timingFunction={effectiveTimingFunction}
            />
          );
        })}
        {suffix && <span className="gy-animated-number__suffix">{suffix}</span>}
      </Typography>
    );
  }

  // ── Mode: Counter (rAF Number Interpolation) ───────────────────────────────
  const formattedContent = `${prefix}${formatNumber(displayed)}${suffix}`;

  return (
    <Typography
      as={Component}
      variant={variant}
      weight={weightMap[weight]}
      className={`gy-animated-number ${
        isPulsing ? "gy-animated-number--pulsing" : ""
      } ${className}`.trim()}
      style={inlineStyles}
    >
      {formattedContent}
    </Typography>
  );
}
