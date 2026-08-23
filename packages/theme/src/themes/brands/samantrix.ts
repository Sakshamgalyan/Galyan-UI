/** Samantrix brand theme — violet (#7c5cff) primary, ink neutrals, always-dark canvas */
export const samantrixBrand = {
  primary: {
    50: "#f2efff",
    100: "#e4ddff",
    200: "#cabbff",
    300: "#ab93ff",
    400: "#8f70ff",
    500: "#7c5cff",
    600: "#6438f0",
    700: "#5028c4",
    800: "#3c1e94",
    900: "#2a1568",
    950: "#1a0d42",
    default: "#7c5cff",
    emphasis: "#6438f0",
    muted: "#cabbff",
    subtle: "#f2efff",
    fg: "#ffffff",
  },

  secondary: {
    default: "#ab93ff",
    emphasis: "#8f70ff",
    muted: "#cabbff",
    subtle: "#f2efff",
    fg: "#ffffff",
  },

  background: {
    default: "#06060a",
    subtle: "#0a0a12",
    muted: "#13131f",
    inverse: "#ffffff",
  },

  surface: {
    default: "#0a0a12",
    raised: "#13131f",
    overlay: "#0e0e18",
    sunken: "#06060a",
    disabled: "#13131f",
  },

  text: {
    default: "#ffffff",
    muted: "#9a9ab4",
    subtle: "#6b6b85",
    disabled: "#3d3d54",
    inverse: "#06060a",
    link: "#ab93ff",
    "link-hover": "#8f70ff",
  },

  border: {
    default: "#1c1c2b",
    muted: "#13131f",
    strong: "#2a2a3d",
    focus: "#7c5cff",
    error: "#f2543d",
  },

  divider: {
    default: "#1c1c2b",
    strong: "#2a2a3d",
  },

  focus: {
    ring: "rgba(124, 92, 255, 0.4)",
    outline: "#7c5cff",
  },

  disabled: {
    background: "#13131f",
    text: "#3d3d54",
    border: "#1c1c2b",
  },

  skeleton: {
    base: "#13131f",
    shimmer: "#1c1c2b",
  },

  brand: {
    default: "#7c5cff",
    dark: "#5028c4",
    light: "#cabbff",
  },

  gradient: {
    primary: "linear-gradient(135deg, #2a1568 0%, #7c5cff 100%)",
    hero: "linear-gradient(135deg, #06060a 0%, #0a0a12 50%, #13131f 100%)",
    brand: "linear-gradient(135deg, #5028c4 0%, #7c5cff 100%)",
  },

  elevation: {
    0: "#06060a",
    1: "#0a0a12",
    2: "#13131f",
    3: "#1c1c2b",
  },
} as const;
