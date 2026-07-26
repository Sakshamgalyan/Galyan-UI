/** Shared base semantic tokens inherited by both customer and professional themes */
export const baseTheme = {
  // ── Success ────────────────────────────────────────────────────────────
  success: {
    subtle: "#ecfdf5",
    muted: "#a7f3d0",
    default: "#10b981",
    emphasis: "#059669",
    fg: "#ffffff",
  },

  // ── Warning ────────────────────────────────────────────────────────────
  warning: {
    subtle: "#fffbeb",
    muted: "#fde68a",
    default: "#f59e0b",
    emphasis: "#d97706",
    fg: "#ffffff",
  },

  // ── Danger ────────────────────────────────────────────────────────────
  danger: {
    subtle: "#fef2f2",
    muted: "#fecaca",
    default: "#ef4444",
    emphasis: "#dc2626",
    fg: "#ffffff",
  },

  // ── Info ──────────────────────────────────────────────────────────────
  info: {
    subtle: "#f0f9ff",
    muted: "#bae6fd",
    default: "#0ea5e9",
    emphasis: "#0284c7",
    fg: "#ffffff",
  },

  // ── Neutral ───────────────────────────────────────────────────────────
  neutral: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },

  // ── Overlay ────────────────────────────────────────────────────────────
  overlay: {
    light: "rgba(0, 0, 0, 0.4)",
    dark: "rgba(0, 0, 0, 0.6)",
    blur: "rgba(0, 0, 0, 0.3)",
  },

  // ── Chart accent palette ───────────────────────────────────────────────
  chart: {
    1: "#6366f1",
    2: "#22c55e",
    3: "#f59e0b",
    4: "#ef4444",
    5: "#0ea5e9",
    6: "#a855f7",
    7: "#f97316",
    8: "#14b8a6",
  },

  // ── Social ─────────────────────────────────────────────────────────────
  social: {
    google: "#EA4335",
    facebook: "#1877F2",
    twitter: "#1DA1F2",
    linkedin: "#0A66C2",
    whatsapp: "#25D366",
    github: "#181717",
  },

  // ── Status ─────────────────────────────────────────────────────────────
  status: {
    online: "#10b981",
    offline: "#94a3b8",
    busy: "#ef4444",
    away: "#f59e0b",
  },
} as const;
