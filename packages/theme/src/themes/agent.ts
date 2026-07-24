/** Agent theme — primary color: Coral / Light Red (#f87171) */
export const agentTheme = {
  // ── Primary (Coral / Light Red) ─────────────────────────────────────────
  primary: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
    default: '#f87171',
    emphasis: '#ef4444',
    muted: '#fca5a5',
    subtle: '#fef2f2',
    fg: '#ffffff',
  },

  // ── Secondary (Warm Orange) ──────────────────────────────────────────
  secondary: {
    default: '#fb923c',
    emphasis: '#f97316',
    muted: '#ffedd5',
    subtle: '#fff7ed',
    fg: '#ffffff',
  },

  // ── Background ─────────────────────────────────────────────────────────
  background: {
    default: '#ffffff',
    subtle: '#faf5f5',
    muted: '#f5eaea',
    inverse: '#1c1917',
  },

  // ── Surface ────────────────────────────────────────────────────────────
  surface: {
    default: '#ffffff',
    raised: '#ffffff',
    overlay: '#ffffff',
    sunken: '#faf5f5',
    disabled: '#f5eaea',
  },

  // ── Text ───────────────────────────────────────────────────────────────
  text: {
    default: '#1c1917',
    muted: '#57534e',
    subtle: '#a8a29e',
    disabled: '#d6d3d1',
    inverse: '#ffffff',
    link: '#f87171',
    'link-hover': '#ef4444',
  },

  // ── Border ─────────────────────────────────────────────────────────────
  border: {
    default: '#e7e5e4',
    muted: '#f5f5f4',
    strong: '#d6d3d1',
    focus: '#f87171',
    error: '#ef4444',
  },

  // ── Divider ────────────────────────────────────────────────────────────
  divider: {
    default: '#e7e5e4',
    strong: '#d6d3d1',
  },

  // ── Focus ──────────────────────────────────────────────────────────────
  focus: {
    ring: 'rgba(248, 113, 113, 0.4)',
    outline: '#f87171',
  },

  // ── Disabled ───────────────────────────────────────────────────────────
  disabled: {
    background: '#f5eaea',
    text: '#a8a29e',
    border: '#e7e5e4',
  },

  // ── Skeleton ───────────────────────────────────────────────────────────
  skeleton: {
    base: '#f5eaea',
    shimmer: '#e7e5e4',
  },

  // ── Brand ──────────────────────────────────────────────────────────────
  brand: {
    default: '#f87171',
    dark: '#ef4444',
    light: '#fca5a5',
  },

  // ── Gradient ───────────────────────────────────────────────────────────
  gradient: {
    primary: 'linear-gradient(135deg, #f87171 0%, #fb923c 100%)',
    hero: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fff7ed 100%)',
    brand: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
  },

  // ── Elevation ──────────────────────────────────────────────────────────
  elevation: {
    0: '#ffffff',
    1: '#faf5f5',
    2: '#f5eaea',
    3: '#e7e5e4',
  },
} as const;
