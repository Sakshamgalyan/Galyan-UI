import type { RoleOverride } from "./types.js";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SIMANTRIX DIRECT COLOR SCHEME THEME OVERRIDES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Direct Color Schemes:
 * 1. SIMANTRIX (#7c5cff): Signature Violet foundation (Default identity)
 * 2. CORAL (#f43f5e): Rose / Coral / Crimson
 * 3. GREEN (#10b981): Emerald presence
 * 4. BLUE (#3b82f6): Cobalt / Royal Blue
 * 5. VIOLET (#6366f1): Platform Indigo / Violet
 * 6. AMBER (#f59e0b): Governance Amber
 * 7. CYAN (#0ea5e9): Sky Blue / Cyan
 */

// ── 1. Coral Color Scheme (#f43f5e) ────────────────────────────────────────
export const coralOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
    default: "#f43f5e",
    emphasis: "#e11d48",
    muted: "#fecdd3",
    subtle: "#fff1f2",
    fg: "#ffffff",
  },
  secondary: {
    default: "#f43f5e",
    emphasis: "#e11d48",
    muted: "#fecdd3",
    subtle: "#fff1f2",
    fg: "#ffffff",
  },
  text: {
    link: "#f43f5e",
    "link-hover": "#e11d48",
  },
  border: {
    default: "#fecdd3",
    muted: "#fff1f2",
    strong: "#fda4af",
    focus: "#f43f5e",
    error: "#ef4444",
  },
  divider: {
    default: "#fecdd3",
    strong: "#fda4af",
  },
  focus: {
    ring: "rgba(244, 63, 94, 0.45)",
    outline: "#f43f5e",
  },
  brand: {
    default: "#f43f5e",
    dark: "#be123c",
    light: "#fda4af",
  },
  gradient: {
    primary: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    hero: "linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(251, 146, 60, 0.04) 100%)",
    brand: "linear-gradient(135deg, #e11d48 0%, #f43f5e 50%, #fb923c 100%)",
  },
};

export const coralOverride: RoleOverride = coralOverrideSimantrix;

// ── 2. Blue Color Scheme (#3b82f6) ─────────────────────────────────────────
export const blueOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
    default: "#3b82f6",
    emphasis: "#2563eb",
    muted: "#bfdbfe",
    subtle: "#eff6ff",
    fg: "#ffffff",
  },
  secondary: {
    default: "#3b82f6",
    emphasis: "#2563eb",
    muted: "#bfdbfe",
    subtle: "#eff6ff",
    fg: "#ffffff",
  },
  text: {
    link: "#3b82f6",
    "link-hover": "#2563eb",
  },
  border: {
    default: "#bfdbfe",
    muted: "#eff6ff",
    strong: "#93c5fd",
    focus: "#3b82f6",
    error: "#ef4444",
  },
  divider: {
    default: "#bfdbfe",
    strong: "#93c5fd",
  },
  focus: {
    ring: "rgba(59, 130, 246, 0.45)",
    outline: "#3b82f6",
  },
  brand: {
    default: "#3b82f6",
    dark: "#1d4ed8",
    light: "#93c5fd",
  },
  gradient: {
    primary: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    hero: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)",
    brand: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #6366f1 100%)",
  },
};

export const blueOverride: RoleOverride = blueOverrideSimantrix;

// ── 3. Green Color Scheme (#10b981) ────────────────────────────────────────
export const greenOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
    default: "#10b981",
    emphasis: "#059669",
    muted: "#a7f3d0",
    subtle: "#ecfdf5",
    fg: "#ffffff",
  },
  secondary: {
    default: "#10b981",
    emphasis: "#059669",
    muted: "#a7f3d0",
    subtle: "#ecfdf5",
    fg: "#ffffff",
  },
  text: {
    link: "#10b981",
    "link-hover": "#059669",
  },
  border: {
    default: "#a7f3d0",
    muted: "#ecfdf5",
    strong: "#6ee7b7",
    focus: "#10b981",
    error: "#ef4444",
  },
  divider: {
    default: "#a7f3d0",
    strong: "#6ee7b7",
  },
  focus: {
    ring: "rgba(16, 185, 129, 0.45)",
    outline: "#10b981",
  },
  brand: {
    default: "#10b981",
    dark: "#047857",
    light: "#6ee7b7",
  },
  gradient: {
    primary: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    hero: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.04) 100%)",
    brand: "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
  },
};

export const greenOverride: RoleOverride = greenOverrideSimantrix;

// ── 4. Violet Color Scheme (#6366f1) ───────────────────────────────────────
export const violetOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
    default: "#6366f1",
    emphasis: "#4f46e5",
    muted: "#c7d2fe",
    subtle: "#eef2ff",
    fg: "#ffffff",
  },
  secondary: {
    default: "#6366f1",
    emphasis: "#4f46e5",
    muted: "#c7d2fe",
    subtle: "#eef2ff",
    fg: "#ffffff",
  },
  text: {
    link: "#6366f1",
    "link-hover": "#4f46e5",
  },
  border: {
    default: "#c7d2fe",
    muted: "#eef2ff",
    strong: "#a5b4fc",
    focus: "#6366f1",
    error: "#ef4444",
  },
  divider: {
    default: "#c7d2fe",
    strong: "#a5b4fc",
  },
  focus: {
    ring: "rgba(99, 102, 241, 0.45)",
    outline: "#6366f1",
  },
  brand: {
    default: "#6366f1",
    dark: "#4338ca",
    light: "#a5b4fc",
  },
  gradient: {
    primary: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    hero: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(129, 140, 248, 0.04) 100%)",
    brand: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)",
  },
};

export const violetOverride: RoleOverride = violetOverrideSimantrix;

// ── 5. Amber Color Scheme (#f59e0b) ────────────────────────────────────────
export const amberOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
    default: "#f59e0b",
    emphasis: "#d97706",
    muted: "#fde68a",
    subtle: "#fffbeb",
    fg: "#ffffff",
  },
  secondary: {
    default: "#f59e0b",
    emphasis: "#d97706",
    muted: "#fde68a",
    subtle: "#fffbeb",
    fg: "#ffffff",
  },
  text: {
    link: "#f59e0b",
    "link-hover": "#d97706",
  },
  border: {
    default: "#fde68a",
    muted: "#fffbeb",
    strong: "#fcd34d",
    focus: "#f59e0b",
    error: "#ef4444",
  },
  divider: {
    default: "#fde68a",
    strong: "#fcd34d",
  },
  focus: {
    ring: "rgba(245, 158, 11, 0.45)",
    outline: "#f59e0b",
  },
  brand: {
    default: "#f59e0b",
    dark: "#b45309",
    light: "#fcd34d",
  },
  gradient: {
    primary: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    hero: "linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, rgba(217, 119, 6, 0.04) 100%)",
    brand: "linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)",
  },
};

export const amberOverride: RoleOverride = amberOverrideSimantrix;

// ── 6. Cyan Color Scheme (#0ea5e9) ─────────────────────────────────────────
export const cyanOverrideSimantrix: RoleOverride = {
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
    default: "#0ea5e9",
    emphasis: "#0284c7",
    muted: "#bae6fd",
    subtle: "#f0f9ff",
    fg: "#ffffff",
  },
  secondary: {
    default: "#0ea5e9",
    emphasis: "#0284c7",
    muted: "#bae6fd",
    subtle: "#f0f9ff",
    fg: "#ffffff",
  },
  text: {
    link: "#0ea5e9",
    "link-hover": "#0284c7",
  },
  border: {
    default: "#bae6fd",
    muted: "#f0f9ff",
    strong: "#7dd3fc",
    focus: "#0ea5e9",
    error: "#ef4444",
  },
  divider: {
    default: "#bae6fd",
    strong: "#7dd3fc",
  },
  focus: {
    ring: "rgba(14, 165, 233, 0.45)",
    outline: "#0ea5e9",
  },
  brand: {
    default: "#0ea5e9",
    dark: "#0369a1",
    light: "#7dd3fc",
  },
  gradient: {
    primary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    hero: "linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(56, 189, 248, 0.04) 100%)",
    brand: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 50%, #38bdf8 100%)",
  },
};

export const cyanOverride: RoleOverride = cyanOverrideSimantrix;

// ── 7. Simantrix Signature Default (#7c5cff) ──────────────────────────────
export const simantrixDefaultOverride: RoleOverride = {
  border: {
    default: "#e5e2f6",
    muted: "#f0edff",
    strong: "#c9c4eb",
    focus: "#7c5cff",
    error: "#f2543d",
  },
  divider: {
    default: "#e5e2f6",
    strong: "#c9c4eb",
  },
};
export const simantrixOverride: RoleOverride = simantrixDefaultOverride;
