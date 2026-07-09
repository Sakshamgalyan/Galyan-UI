/** Professional theme — primary color: Blue/Indigo */
export const professionalTheme = {
  // ── Primary (Blue) ─────────────────────────────────────────────────────
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
    default: '#3b82f6',
    emphasis: '#2563eb',
    muted: '#bfdbfe',
    subtle: '#eff6ff',
    fg: '#ffffff',
  },

  // ── Secondary (Indigo) ─────────────────────────────────────────────────
  secondary: {
    default: '#6366f1',
    emphasis: '#4f46e5',
    muted: '#c7d2fe',
    subtle: '#eef2ff',
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
    link: '#2563eb',
    'link-hover': '#1d4ed8',
  },

  // ── Border ─────────────────────────────────────────────────────────────
  border: {
    default: '#e2e8f0',
    muted: '#f1f5f9',
    strong: '#cbd5e1',
    focus: '#3b82f6',
    error: '#ef4444',
  },

  // ── Divider ────────────────────────────────────────────────────────────
  divider: {
    default: '#e2e8f0',
    strong: '#cbd5e1',
  },

  // ── Focus ──────────────────────────────────────────────────────────────
  focus: {
    ring: 'rgba(59, 130, 246, 0.4)',
    outline: '#3b82f6',
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
    default: '#3b82f6',
    dark: '#1d4ed8',
    light: '#bfdbfe',
  },

  // ── Gradient ───────────────────────────────────────────────────────────
  gradient: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    hero: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eef2ff 100%)',
    brand: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
  },

  // ── Elevation ──────────────────────────────────────────────────────────
  elevation: {
    0: '#ffffff',
    1: '#f8fafc',
    2: '#f1f5f9',
    3: '#e2e8f0',
  },
} as const;
