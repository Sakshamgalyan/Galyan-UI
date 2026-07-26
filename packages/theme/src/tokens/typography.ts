/** Galyan typography tokens */
export const fontFamily = {
  sans: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "'Georgia', 'Times New Roman', serif",
  mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  display:
    "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

export const fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
} as const;

export const fontSize = {
  "2xs": "0.625rem", // 10px
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  md: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem", // 48px
  "6xl": "3.75rem", // 60px
  "7xl": "4.5rem", // 72px
} as const;

export const lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
  "3": ".75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;

export const paragraphSpacing = {
  none: "0",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
} as const;

/** Heading scale: maps semantic heading size to fontSize token */
export const headingScale = {
  h1: {
    size: "5xl",
    weight: "bold",
    lineHeight: "tight",
    letterSpacing: "tight",
  },
  h2: {
    size: "4xl",
    weight: "bold",
    lineHeight: "tight",
    letterSpacing: "tight",
  },
  h3: {
    size: "3xl",
    weight: "semibold",
    lineHeight: "snug",
    letterSpacing: "normal",
  },
  h4: {
    size: "2xl",
    weight: "semibold",
    lineHeight: "snug",
    letterSpacing: "normal",
  },
  h5: {
    size: "xl",
    weight: "semibold",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
  h6: {
    size: "lg",
    weight: "semibold",
    lineHeight: "normal",
    letterSpacing: "normal",
  },
} as const;

export const bodyScale = {
  "body-xl": { size: "xl", weight: "regular", lineHeight: "relaxed" },
  "body-lg": { size: "lg", weight: "regular", lineHeight: "relaxed" },
  "body-md": { size: "md", weight: "regular", lineHeight: "normal" },
  "body-sm": { size: "sm", weight: "regular", lineHeight: "normal" },
  "body-xs": { size: "xs", weight: "regular", lineHeight: "normal" },
} as const;

export const captionScale = {
  "caption-lg": {
    size: "xs",
    weight: "medium",
    lineHeight: "normal",
    letterSpacing: "wide",
  },
  "caption-md": {
    size: "2xs",
    weight: "medium",
    lineHeight: "normal",
    letterSpacing: "wide",
  },
} as const;

export const typography = {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
  paragraphSpacing,
  headingScale,
  bodyScale,
  captionScale,
} as const;
