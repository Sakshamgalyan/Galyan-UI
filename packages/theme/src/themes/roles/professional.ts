import type { RoleOverride } from "./types.js";

/**
 * Professional role override for EasyLife brand.
 * Changes primary from green to blue, secondary to indigo.
 */
export const professionalOverrideEasylife: RoleOverride = {
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
    default: "#6366f1",
    emphasis: "#4f46e5",
    muted: "#c7d2fe",
    subtle: "#eef2ff",
    fg: "#ffffff",
  },
  text: {
    link: "#2563eb",
    "link-hover": "#1d4ed8",
  },
  border: {
    focus: "#3b82f6",
  },
  focus: {
    ring: "rgba(59, 130, 246, 0.4)",
    outline: "#3b82f6",
  },
  brand: {
    default: "#3b82f6",
    dark: "#1d4ed8",
    light: "#bfdbfe",
  },
  gradient: {
    primary: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    hero: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #eef2ff 100%)",
    brand: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
  },
};
