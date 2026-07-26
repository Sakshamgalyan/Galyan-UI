"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ThemeContext,
  type ThemeRole,
  type ColorMode,
} from "./ThemeContext.js";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultRole?: ThemeRole;
  defaultColorMode?: ColorMode;
  storageKey?: string | null;
}

export function ThemeProvider({
  children,
  defaultRole = "customer",
  defaultColorMode = "system",
  storageKey = "gy-theme",
}: ThemeProviderProps) {
  const [role, setRoleState] = useState<ThemeRole>(defaultRole);
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Sync state when defaultRole or defaultColorMode prop changes
  useEffect(() => {
    if (defaultRole) setRoleState(defaultRole);
  }, [defaultRole]);

  useEffect(() => {
    if (defaultColorMode) setColorModeState(defaultColorMode);
  }, [defaultColorMode]);

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
        const { role: r, colorMode: c } = JSON.parse(stored) as {
          role?: ThemeRole;
          colorMode?: ColorMode;
        };
        if (r) setRoleState(r);
        if (c) setColorModeState(c);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const resolvedMode = useMemo<"light" | "dark">(() => {
    if (colorMode === "system") return systemPrefersDark ? "dark" : "light";
    return colorMode;
  }, [colorMode, systemPrefersDark]);

  // Apply data attributes to root element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", role);
    root.setAttribute("data-color-mode", resolvedMode);
  }, [role, resolvedMode]);

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

  const value = useMemo(
    () => ({
      role,
      colorMode,
      resolvedMode,
      setRole,
      setColorMode,
    }),
    [role, colorMode, resolvedMode, setRole, setColorMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
