import type { RoleOverride } from "./types.js";

/**
 * Developer role override for Samantrix brand.
 * Matches backend UserType = DEVELOPER / Platform roles (SUPERADMIN, PLATFORM_ADMIN, DEVELOPER).
 * Tailored for engineering, internal operations, API consoles, and telemetry.
 */
export const developerOverrideSamantrix: RoleOverride = {
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
    default: "#6366f1",
    emphasis: "#4f46e5",
    muted: "#c7d2fe",
    subtle: "#eef2ff",
    fg: "#ffffff",
  },
  text: {
    link: "#7c5cff",
    "link-hover": "#6438f0",
  },
  border: {
    focus: "#7c5cff",
  },
  focus: {
    ring: "rgba(124, 92, 255, 0.45)",
    outline: "#7c5cff",
  },
  brand: {
    default: "#7c5cff",
    dark: "#5028c4",
    light: "#cabbff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #6366f1 100%)",
    hero: "linear-gradient(135deg, rgba(124, 92, 255, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%)",
    brand: "linear-gradient(135deg, #6438f0 0%, #7c5cff 50%, #6366f1 100%)",
  },
};

/**
 * Organization role override for Samantrix brand.
 * Matches backend UserType = ORGANIZATION / Orgs platform tier accounts.
 * Tailored for corporate enterprise accounts, tenant contracts, and organization-level billing.
 */
export const organizationOverrideSamantrix: RoleOverride = {
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
    default: "#4f46e5",
    emphasis: "#4338ca",
    muted: "#c7d2fe",
    subtle: "#eef2ff",
    fg: "#ffffff",
  },
  text: {
    link: "#6438f0",
    "link-hover": "#5028c4",
  },
  border: {
    focus: "#7c5cff",
  },
  focus: {
    ring: "rgba(99, 102, 241, 0.45)",
    outline: "#6438f0",
  },
  brand: {
    default: "#7c5cff",
    dark: "#4338ca",
    light: "#cabbff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #4f46e5 100%)",
    hero: "linear-gradient(135deg, rgba(124, 92, 255, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)",
    brand: "linear-gradient(135deg, #5028c4 0%, #7c5cff 50%, #4f46e5 100%)",
  },
};

/**
 * Org Admin role override for Samantrix brand.
 * Matches backend OrgRole = OWNER / ADMIN in client workspaces.
 * Tailored for office custom role configuration, user invites, room permissions, and security.
 */
export const orgAdminOverrideSamantrix: RoleOverride = {
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
    default: "#f59e0b",
    emphasis: "#d97706",
    muted: "#fde68a",
    subtle: "#fffbeb",
    fg: "#ffffff",
  },
  text: {
    link: "#7c5cff",
    "link-hover": "#6438f0",
  },
  border: {
    focus: "#7c5cff",
  },
  focus: {
    ring: "rgba(124, 92, 255, 0.45)",
    outline: "#7c5cff",
  },
  brand: {
    default: "#7c5cff",
    dark: "#5028c4",
    light: "#cabbff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #f59e0b 100%)",
    hero: "linear-gradient(135deg, rgba(124, 92, 255, 0.06) 0%, rgba(245, 158, 11, 0.04) 100%)",
    brand: "linear-gradient(135deg, #6438f0 0%, #7c5cff 50%, #f59e0b 100%)",
  },
};

/**
 * Org Member role override for Samantrix brand.
 * Matches backend OrgRole = MEMBER / MANAGER / VIEWER (samantrix-frontend digital workplace).
 * Features signature emerald presence indicator (#10b981), proximity voice cues, and live office collaboration.
 */
export const orgMemberOverrideSamantrix: RoleOverride = {
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
    default: "#10b981",
    emphasis: "#059669",
    muted: "#a7f3d0",
    subtle: "#ecfdf5",
    fg: "#ffffff",
  },
  text: {
    link: "#7c5cff",
    "link-hover": "#6438f0",
  },
  border: {
    focus: "#7c5cff",
  },
  focus: {
    ring: "rgba(16, 185, 129, 0.4)",
    outline: "#10b981",
  },
  brand: {
    default: "#7c5cff",
    dark: "#5028c4",
    light: "#cabbff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #10b981 100%)",
    hero: "linear-gradient(135deg, rgba(124, 92, 255, 0.06) 0%, rgba(16, 185, 129, 0.04) 100%)",
    brand: "linear-gradient(135deg, #6438f0 0%, #10b981 100%)",
  },
};

/**
 * Backward compatibility aliases
 */
export const adminOverrideSamantrix: RoleOverride = developerOverrideSamantrix;
export const professionalOverrideSamantrix: RoleOverride = orgAdminOverrideSamantrix;
export const agentOverrideSamantrix: RoleOverride = {
  ...orgMemberOverrideSamantrix,
  secondary: {
    default: "#38bdf8",
    emphasis: "#0284c7",
    muted: "#bae6fd",
    subtle: "#f0f9ff",
    fg: "#ffffff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #38bdf8 100%)",
    hero: "linear-gradient(135deg, rgba(124, 92, 255, 0.08) 0%, rgba(56, 189, 248, 0.04) 100%)",
    brand: "linear-gradient(135deg, #6438f0 0%, #38bdf8 100%)",
  },
};

/**
 * Customer role override for Samantrix brand.
 * Matches public marketing portal and prospective clients (samantrix-home).
 */
export const customerOverrideSamantrix: RoleOverride = {
  secondary: {
    default: "#38bdf8",
    emphasis: "#0284c7",
    muted: "#bae6fd",
    subtle: "#f0f9ff",
    fg: "#ffffff",
  },
  text: {
    link: "#ab93ff",
    "link-hover": "#8f70ff",
  },
  border: {
    focus: "#7c5cff",
  },
  focus: {
    ring: "rgba(124, 92, 255, 0.5)",
    outline: "#7c5cff",
  },
  brand: {
    default: "#7c5cff",
    dark: "#5028c4",
    light: "#ab93ff",
  },
  gradient: {
    primary: "linear-gradient(135deg, #7c5cff 0%, #38bdf8 100%)",
    hero: "linear-gradient(135deg, #06060a 0%, #0a0a12 50%, #13131f 100%)",
    brand: "linear-gradient(135deg, #5028c4 0%, #7c5cff 50%, #38bdf8 100%)",
  },
};
