"use client";

import { createContext } from "react";

// ── Two-axis types ──────────────────────────────────────────────────────

export type ThemeBrand =
  | "easylife"
  | "metalixia"
  | "samantrix"
  | "custom";

export type ThemeRole =
  | "customer"
  | "professional"
  | "agent"
  | "admin";

export type ColorMode = "light" | "dark" | "system";

/** Configuration for a custom brand theme — only a primary colour is required. */
export interface CustomThemeConfig {
  /** Primary brand colour as a hex string (e.g. "#ff6600"). */
  primary: string;
  /** Custom primary font family (e.g. "'Outfit', sans-serif" or "'Roboto', sans-serif"). */
  fontFamily?: string;
  /** Custom monospace font family (e.g. "'JetBrains Mono', monospace"). */
  fontFamilyMono?: string;
  /** Custom heading/display font family (e.g. "'Outfit', sans-serif"). */
  fontFamilyDisplay?: string;
}

// ── Legacy flat role type (for backward compat) ─────────────────────────

/** @deprecated Use `ThemeBrand` + `ThemeRole` instead */
export type LegacyThemeRole =
  | "customer"
  | "professional"
  | "agent"
  | "admin"
  | "metalixia"
  | "samantrix"
  | "custom";

// ── Context value ───────────────────────────────────────────────────────

export interface ThemeContextValue {
  brand: ThemeBrand;
  role: ThemeRole;
  colorMode: ColorMode;
  resolvedMode: "light" | "dark";
  fontFamily?: string;
  fontFamilyMono?: string;
  fontFamilyDisplay?: string;
  setBrand: (brand: ThemeBrand) => void;
  setRole: (role: ThemeRole) => void;
  setColorMode: (mode: ColorMode) => void;
  setFontFamily: (font?: string) => void;
  setFontFamilyMono: (font?: string) => void;
  setFontFamilyDisplay: (font?: string) => void;
  /** Set a custom primary colour and optional font families. Automatically switches brand to "custom". */
  setCustomTheme: (config: CustomThemeConfig) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  brand: "easylife",
  role: "customer",
  colorMode: "system",
  resolvedMode: "light",
  setBrand: () => {},
  setRole: () => {},
  setColorMode: () => {},
  setFontFamily: () => {},
  setFontFamilyMono: () => {},
  setFontFamilyDisplay: () => {},
  setCustomTheme: () => {},
});
