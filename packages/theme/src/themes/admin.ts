/** Admin theme — primary color: Indigo (#6366f1) */
export const adminTheme = {
  // ── Primary (Indigo) ───────────────────────────────────────────────────
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
    default: '#6366f1',
    emphasis: '#4f46e5',
    muted: '#c7d2fe',
    subtle: '#eef2ff',
    fg: '#ffffff',
  },

  // ── Secondary (Violet) ─────────────────────────────────────────────────
  secondary: {
    default: '#8b5cf6',
    emphasis: '#7c3aed',
    muted: '#ddd6fe',
    subtle: '#f5f3ff',
    fg: '#ffffff',
  },

  // ── Background ─────────────────────────────────────────────────────────
  background: {
    default: '#ffffff',
    subtle: '#f8fafc',
    muted: '#f1f5f9',
    inverse: '#0f172a',
  },

  // ── Surface ────────────────────────────────────────────────────────────
  surface: {
    default: '#ffffff',
    raised: '#ffffff',
    overlay: '#ffffff',
    sunken: '#f8fafc',
    disabled: '#f1f5f9',
  },

  // ── Text ───────────────────────────────────────────────────────────────
  text: {
    default: '#0f172a',
    muted: '#475569',
    subtle: '#94a3b8',
    disabled: '#cbd5e1',
    inverse: '#ffffff',
    link: '#6366f1',
    'link-hover': '#4f46e5',
  },

  // ── Border ─────────────────────────────────────────────────────────────
  border: {
    default: '#e2e8f0',
    muted: '#f1f5f9',
    strong: '#cbd5e1',
    focus: '#6366f1',
    error: '#ef4444',
  },

  // ── Divider ────────────────────────────────────────────────────────────
  divider: {
    default: '#e2e8f0',
    strong: '#cbd5e1',
  },

  // ── Focus ──────────────────────────────────────────────────────────────
  focus: {
    ring: 'rgba(99, 102, 241, 0.4)',
    outline: '#6366f1',
  },

  // ── Disabled ───────────────────────────────────────────────────────────
  disabled: {
    background: '#f1f5f9',
    text: '#94a3b8',
    border: '#e2e8f0',
  },

  // ── Skeleton ───────────────────────────────────────────────────────────
  skeleton: {
    base: '#f1f5f9',
    shimmer: '#e2e8f0',
  },

  // ── Brand ──────────────────────────────────────────────────────────────
  brand: {
    default: '#6366f1',
    dark: '#4338ca',
    light: '#c7d2fe',
  },

  // ── Gradient ───────────────────────────────────────────────────────────
  gradient: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    hero: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f5f3ff 100%)',
    brand: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  },

  // ── Elevation ──────────────────────────────────────────────────────────
  elevation: {
    0: '#ffffff',
    1: '#f8fafc',
    2: '#f1f5f9',
    3: '#e2e8f0',
  },
} as const;
