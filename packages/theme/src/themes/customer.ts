/** Customer theme — primary color: Green */
export const customerTheme = {
  // ── Primary (Green) ────────────────────────────────────────────────────
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
    default: '#22c55e',
    emphasis: '#16a34a',
    muted: '#bbf7d0',
    subtle: '#f0fdf4',
    fg: '#ffffff',
  },

  // ── Secondary (Teal) ──────────────────────────────────────────────────
  secondary: {
    default: '#14b8a6',
    emphasis: '#0d9488',
    muted: '#99f6e4',
    subtle: '#f0fdfa',
    fg: '#ffffff',
  },

  // ── Background ────────────────────────────────────────────────────────
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

  // ── Text ──────────────────────────────────────────────────────────────
  text: {
    default: '#0f172a',
    muted: '#475569',
    subtle: '#94a3b8',
    disabled: '#cbd5e1',
    inverse: '#ffffff',
    link: '#16a34a',
    'link-hover': '#15803d',
  },

  // ── Border ────────────────────────────────────────────────────────────
  border: {
    default: '#e2e8f0',
    muted: '#f1f5f9',
    strong: '#cbd5e1',
    focus: '#22c55e',
    error: '#ef4444',
  },

  // ── Divider ────────────────────────────────────────────────────────────
  divider: {
    default: '#e2e8f0',
    strong: '#cbd5e1',
  },

  // ── Focus ─────────────────────────────────────────────────────────────
  focus: {
    ring: 'rgba(34, 197, 94, 0.4)',
    outline: '#22c55e',
  },

  // ── Disabled ──────────────────────────────────────────────────────────
  disabled: {
    background: '#f1f5f9',
    text: '#94a3b8',
    border: '#e2e8f0',
  },

  // ── Skeleton ──────────────────────────────────────────────────────────
  skeleton: {
    base: '#f1f5f9',
    shimmer: '#e2e8f0',
  },

  // ── Brand ─────────────────────────────────────────────────────────────
  brand: {
    default: '#22c55e',
    dark: '#15803d',
    light: '#bbf7d0',
  },

  // ── Gradient ──────────────────────────────────────────────────────────
  gradient: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #14b8a6 100%)',
    hero: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdfa 100%)',
    brand: 'linear-gradient(135deg, #16a34a 0%, #0d9488 100%)',
  },

  // ── Elevation (dark bg for cards/surfaces) ─────────────────────────────
  elevation: {
    0: '#ffffff',
    1: '#f8fafc',
    2: '#f1f5f9',
    3: '#e2e8f0',
  },
} as const;
