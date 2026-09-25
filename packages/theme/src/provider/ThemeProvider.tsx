"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ThemeContext,
  type ThemeBrand,
  type ThemeRole,
  type ColorMode,
  type CustomThemeConfig,
  type LegacyThemeRole,
} from "./ThemeContext.js";
import { deriveCustomTheme, CUSTOM_THEME_VARS } from "./deriveCustomTheme.js";

// ── Legacy role → brand+role mapping ────────────────────────────────────

const LEGACY_MAP: Record<
  LegacyThemeRole,
  { brand: ThemeBrand; role: ThemeRole }
> = {
  customer: { brand: "easylife", role: "customer" },
  professional: { brand: "easylife", role: "professional" },
  agent: { brand: "easylife", role: "agent" },
  admin: { brand: "easylife", role: "admin" },
  metalixia: { brand: "metalixia", role: "customer" },
  samantrix: { brand: "samantrix", role: "customer" },
  custom: { brand: "custom", role: "customer" },
};

// ── Props ───────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
  /** @deprecated Use `brand` + `role` instead */
  defaultRole?: LegacyThemeRole;
  /** The app/company brand. */
  brand?: ThemeBrand;
  /** The user-type role. */
  role?: ThemeRole;
  defaultColorMode?: ColorMode;
  storageKey?: string | null;
  /** Custom primary font family (e.g. "'Outfit', sans-serif" or "'Inter', sans-serif"). Sets --gy-font-sans and --gy-font-family. */
  fontFamily?: string;
  /** Custom monospace font family (e.g. "'JetBrains Mono', monospace"). Sets --gy-font-mono. */
  fontFamilyMono?: string;
  /** Custom display/heading font family. Sets --gy-font-display. */
  fontFamilyDisplay?: string;
  /** Custom brand theme config. Only used when brand is "custom". */
  customTheme?: CustomThemeConfig;
}

// ── Component ───────────────────────────────────────────────────────────

export function ThemeProvider({
  children,
  defaultRole,
  brand: brandProp,
  role: roleProp,
  defaultColorMode = "system",
  storageKey = "gy-theme",
  fontFamily: fontFamilyProp,
  fontFamilyMono: fontFamilyMonoProp,
  fontFamilyDisplay: fontFamilyDisplayProp,
  customTheme: customThemeProp,
}: ThemeProviderProps) {
  // Resolve initial brand+role from props (prefer new API, fall back to legacy)
  const initialBrand: ThemeBrand =
    brandProp ?? (defaultRole ? LEGACY_MAP[defaultRole]!.brand : "easylife");
  const initialRole: ThemeRole =
    roleProp ?? (defaultRole ? LEGACY_MAP[defaultRole]!.role : "customer");

  // Legacy deprecation warning
  if (typeof defaultRole !== "undefined" && typeof brandProp === "undefined") {
    if (
      typeof console !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      console.warn(
        `[@galyan/theme] "defaultRole" is deprecated. Use brand="${initialBrand}" role="${initialRole}" instead.`,
      );
    }
  }

  const [brand, setBrandState] = useState<ThemeBrand>(initialBrand);
  const [role, setRoleState] = useState<ThemeRole>(initialRole);
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);
  const [fontFamily, setFontFamilyState] = useState<string | undefined>(
    fontFamilyProp ?? customThemeProp?.fontFamily,
  );
  const [fontFamilyMono, setFontFamilyMonoState] = useState<string | undefined>(
    fontFamilyMonoProp ?? customThemeProp?.fontFamilyMono,
  );
  const [fontFamilyDisplay, setFontFamilyDisplayState] = useState<
    string | undefined
  >(fontFamilyDisplayProp ?? customThemeProp?.fontFamilyDisplay);
  const [customConfig, setCustomConfig] = useState<
    CustomThemeConfig | undefined
  >(customThemeProp);

  const injectedVarsRef = useRef<string[]>([]);

  // Sync from props
  useEffect(() => {
    if (brandProp) setBrandState(brandProp);
  }, [brandProp]);

  useEffect(() => {
    if (roleProp) setRoleState(roleProp);
  }, [roleProp]);

  useEffect(() => {
    if (defaultColorMode) setColorModeState(defaultColorMode);
  }, [defaultColorMode]);

  useEffect(() => {
    if (fontFamilyProp) setFontFamilyState(fontFamilyProp);
  }, [fontFamilyProp]);

  useEffect(() => {
    if (fontFamilyMonoProp) setFontFamilyMonoState(fontFamilyMonoProp);
  }, [fontFamilyMonoProp]);

  useEffect(() => {
    if (fontFamilyDisplayProp) setFontFamilyDisplayState(fontFamilyDisplayProp);
  }, [fontFamilyDisplayProp]);

  useEffect(() => {
    if (customThemeProp) {
      setCustomConfig(customThemeProp);
      if (customThemeProp.fontFamily)
        setFontFamilyState(customThemeProp.fontFamily);
      if (customThemeProp.fontFamilyMono)
        setFontFamilyMonoState(customThemeProp.fontFamilyMono);
      if (customThemeProp.fontFamilyDisplay)
        setFontFamilyDisplayState(customThemeProp.fontFamilyDisplay);
    }
  }, [customThemeProp]);

  // Detect system dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemPrefersDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Load persisted preferences
  useEffect(() => {
    if (!storageKey) return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as {
          brand?: ThemeBrand;
          role?: ThemeRole;
          colorMode?: ColorMode;
          fontFamily?: string;
          fontFamilyMono?: string;
          fontFamilyDisplay?: string;
          customTheme?: CustomThemeConfig;
        };
        if (parsed.brand) setBrandState(parsed.brand);
        if (parsed.role) setRoleState(parsed.role);
        if (parsed.colorMode) setColorModeState(parsed.colorMode);
        if (parsed.fontFamily) setFontFamilyState(parsed.fontFamily);
        if (parsed.fontFamilyMono)
          setFontFamilyMonoState(parsed.fontFamilyMono);
        if (parsed.fontFamilyDisplay)
          setFontFamilyDisplayState(parsed.fontFamilyDisplay);
        if (parsed.customTheme) setCustomConfig(parsed.customTheme);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const resolvedMode = useMemo<"light" | "dark">(() => {
    if (brand === "samantrix") return "dark";
    if (colorMode === "system") return systemPrefersDark ? "dark" : "light";
    return colorMode;
  }, [colorMode, systemPrefersDark, brand]);

  // Apply data attributes to root element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-brand", brand);
    root.setAttribute("data-role", role);
    root.setAttribute("data-color-mode", resolvedMode);
    // Legacy compat: keep data-theme for any consumers still selecting on it
    root.setAttribute("data-theme", brand === "easylife" ? role : brand);
  }, [brand, role, resolvedMode]);

  // Inject font families
  useEffect(() => {
    const root = document.documentElement;
    if (fontFamily) {
      root.style.setProperty("--gy-font-sans", fontFamily);
      root.style.setProperty("--gy-font-family", fontFamily);
      root.style.setProperty("--gy-custom-font-sans", fontFamily);
    } else {
      root.style.removeProperty("--gy-font-sans");
      root.style.removeProperty("--gy-font-family");
      root.style.removeProperty("--gy-custom-font-sans");
    }

    if (fontFamilyMono) {
      root.style.setProperty("--gy-font-mono", fontFamilyMono);
      root.style.setProperty("--gy-custom-font-mono", fontFamilyMono);
    } else {
      root.style.removeProperty("--gy-font-mono");
      root.style.removeProperty("--gy-custom-font-mono");
    }

    if (fontFamilyDisplay) {
      root.style.setProperty("--gy-font-display", fontFamilyDisplay);
      root.style.setProperty("--gy-custom-font-display", fontFamilyDisplay);
    } else {
      root.style.removeProperty("--gy-font-display");
      root.style.removeProperty("--gy-custom-font-display");
    }
  }, [fontFamily, fontFamilyMono, fontFamilyDisplay]);

  // Inject / clean up custom theme CSS variables
  useEffect(() => {
    const root = document.documentElement;

    if (brand === "custom" && customConfig?.primary) {
      const vars = deriveCustomTheme(
        customConfig.primary,
        customConfig.fontFamily ?? fontFamily,
        customConfig.fontFamilyMono ?? fontFamilyMono,
        customConfig.fontFamilyDisplay ?? fontFamilyDisplay,
      );
      const keys = Object.keys(vars);
      for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value);
      }
      injectedVarsRef.current = keys;
    } else {
      for (const key of injectedVarsRef.current) {
        root.style.removeProperty(key);
      }
      for (const key of CUSTOM_THEME_VARS) {
        root.style.removeProperty(key);
      }
      injectedVarsRef.current = [];
    }
  }, [brand, customConfig, fontFamily, fontFamilyMono, fontFamilyDisplay]);

  // ── Setters ─────────────────────────────────────────────────────────

  const setBrand = useCallback(
    (newBrand: ThemeBrand) => {
      setBrandState(newBrand);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, brand: newBrand }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setRole = useCallback(
    (newRole: ThemeRole) => {
      setRoleState(newRole);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, role: newRole }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setColorMode = useCallback(
    (newMode: ColorMode) => {
      setColorModeState(newMode);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, colorMode: newMode }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setFontFamily = useCallback(
    (font?: string) => {
      setFontFamilyState(font);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, fontFamily: font }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setFontFamilyMono = useCallback(
    (font?: string) => {
      setFontFamilyMonoState(font);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, fontFamilyMono: font }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setFontFamilyDisplay = useCallback(
    (font?: string) => {
      setFontFamilyDisplayState(font);
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, fontFamilyDisplay: font }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const setCustomTheme = useCallback(
    (config: CustomThemeConfig) => {
      setCustomConfig(config);
      if (config.fontFamily !== undefined)
        setFontFamilyState(config.fontFamily);
      if (config.fontFamilyMono !== undefined)
        setFontFamilyMonoState(config.fontFamilyMono);
      if (config.fontFamilyDisplay !== undefined)
        setFontFamilyDisplayState(config.fontFamilyDisplay);
      setBrandState("custom");
      if (!storageKey) return;
      try {
        const stored = localStorage.getItem(storageKey);
        const current = stored ? JSON.parse(stored) : {};
        localStorage.setItem(
          storageKey,
          JSON.stringify({ ...current, brand: "custom", customTheme: config }),
        );
      } catch {
        /* ignore */
      }
    },
    [storageKey],
  );

  const value = useMemo(
    () => ({
      brand,
      role,
      colorMode,
      resolvedMode,
      fontFamily,
      fontFamilyMono,
      fontFamilyDisplay,
      setBrand,
      setRole,
      setColorMode,
      setFontFamily,
      setFontFamilyMono,
      setFontFamilyDisplay,
      setCustomTheme,
    }),
    [
      brand,
      role,
      colorMode,
      resolvedMode,
      fontFamily,
      fontFamilyMono,
      fontFamilyDisplay,
      setBrand,
      setRole,
      setColorMode,
      setFontFamily,
      setFontFamilyMono,
      setFontFamilyDisplay,
      setCustomTheme,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
