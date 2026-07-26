/** Metalixia theme — primary color: #707FDD */
export const metalixiaTheme = {
  // ── Primary (#707FDD) ───────────────────────────────────────────────────
  primary: {
    50: "#f0f2fb",
    100: "#dbe0f7",
    200: "#b9c2f0",
    300: "#96a3ea",
    400: "#7e8ee5",
    500: "#707fdd",
    600: "#5a67c4",
    700: "#4a57b4",
    800: "#3b4694",
    900: "#2e3776",
    950: "#1b2046",
    default: "#707fdd",
    emphasis: "#5a67c4",
    muted: "#b9c2f0",
    subtle: "#f0f2fb",
    fg: "#ffffff",
  },

  // ── Secondary ─────────────────────────────────────────────────────────
  secondary: {
    default: "#5a67c4",
    emphasis: "#4a57b4",
    muted: "#b9c2f0",
    subtle: "#f1f2f7",
    fg: "#ffffff",
  },

  // ── Background ─────────────────────────────────────────────────────────
  background: {
    default: "#ffffff",
    subtle: "#f8fafc",
    muted: "#f1f2f7",
    inverse: "#0f172a",
  },

  // ── Surface ────────────────────────────────────────────────────────────
  surface: {
    default: "#ffffff",
    raised: "#ffffff",
    overlay: "#ffffff",
    sunken: "#f8fafc",
    disabled: "#f1f5f9",
  },

  // ── Text ───────────────────────────────────────────────────────────────
  text: {
    default: "#0f172a",
    muted: "#475569",
    subtle: "#94a3b8",
    disabled: "#cbd5e1",
    inverse: "#ffffff",
    link: "#707fdd",
    "link-hover": "#5a67c4",
  },

  // ── Border ─────────────────────────────────────────────────────────────
  border: {
    default: "#e2e8f0",
    muted: "#f1f2f7",
    strong: "#cbd5e1",
    focus: "#707fdd",
    error: "#ef4444",
  },

  // ── Divider ────────────────────────────────────────────────────────────
  divider: {
    default: "#e2e8f0",
    strong: "#cbd5e1",
  },

  // ── Focus ──────────────────────────────────────────────────────────────
  focus: {
    ring: "rgba(112, 127, 221, 0.4)",
    outline: "#707fdd",
  },

  // ── Disabled ───────────────────────────────────────────────────────────
  disabled: {
    background: "#f1f5f9",
    text: "#94a3b8",
    border: "#e2e8f0",
  },

  // ── Skeleton ───────────────────────────────────────────────────────────
  skeleton: {
    base: "#f1f2f7",
    shimmer: "#e2e8f0",
  },

  // ── Brand ──────────────────────────────────────────────────────────────
  brand: {
    default: "#707fdd",
    dark: "#4a57b4",
    light: "#b9c2f0",
  },

  // ── Gradient ───────────────────────────────────────────────────────────
  gradient: {
    primary: "linear-gradient(135deg, #707fdd 0%, #5a67c4 100%)",
    hero: "linear-gradient(135deg, #f0f2fb 0%, #dbe0f7 50%, #f1f2f7 100%)",
    brand: "linear-gradient(135deg, #707fdd 0%, #5a67c4 50%, #4a57b4 100%)",
  },

  // ── Elevation ──────────────────────────────────────────────────────────
  elevation: {
    0: "#ffffff",
    1: "#f8fafc",
    2: "#f1f2f7",
    3: "#e2e8f0",
  },
} as const;
