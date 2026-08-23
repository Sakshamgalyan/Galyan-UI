import type { RoleOverride } from "./types.js";

/**
 * Admin role override for EasyLife brand.
 * Changes primary to indigo, secondary to violet.
 */
export const adminOverrideEasylife: RoleOverride = {
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
    default: "#8b5cf6",
    emphasis: "#7c3aed",
    muted: "#ddd6fe",
    subtle: "#f5f3ff",
    fg: "#ffffff",
  },
  text: {
    link: "#6366f1",
    "link-hover": "#4f46e5",
  },
  border: {
    focus: "#6366f1",
  },
  focus: {
    ring: "rgba(99, 102, 241, 0.4)",
    outline: "#6366f1",
  },
  brand: {
    default: "#6366f1",
    dark: "#4338ca",
    light: "#c7d2fe",
  },
  gradient: {
    primary: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    hero: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f5f3ff 100%)",
    brand: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
  },
};
