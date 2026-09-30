import React from "react";
import type { ThemeBrand, ThemeRole, ColorMode } from "./ThemeContext.js";

export interface ThemeScriptProps {
  /** The fallback brand if not saved in storage (default: "easylife") */
  brand?: ThemeBrand;
  /** The fallback role if not saved in storage (default: "customer") */
  role?: ThemeRole;
  /** The default color mode (default: "system") */
  defaultColorMode?: ColorMode;
  /** The localStorage key (default: "gy-theme", or null/empty to disable) */
  storageKey?: string | null;
  /** Optional nonce for CSP */
  nonce?: string;
}

/**
 * ThemeScript — Injects a minimal, blocking inline script into <head> or <body> for SSR apps (Next.js, Remix, etc.)
 * to set `data-brand`, `data-role`, and `data-color-mode` attributes on <html> before the first paint,
 * completely eliminating flash of unstyled theme (FOUC).
 */
export function ThemeScript({
  brand = "easylife",
  role = "customer",
  defaultColorMode = "system",
  storageKey = "gy-theme",
  nonce,
}: ThemeScriptProps) {
  const code = `(function(){try{var k=${JSON.stringify(storageKey)};var s=k?localStorage.getItem(k):null;var p=s?JSON.parse(s):{};var b=p.brand||${JSON.stringify(brand)};var r=p.role||${JSON.stringify(role)};var cm=p.colorMode||${JSON.stringify(defaultColorMode)};var rm=cm==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):cm;var el=document.documentElement;el.setAttribute('data-brand',b);el.setAttribute('data-role',r);el.setAttribute('data-color-mode',rm);el.setAttribute('data-theme',b==='easylife'?r:b);}catch(e){}})();`;

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
