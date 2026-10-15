import React from "react";
import type { ThemeBrand, ThemeRole, ColorMode } from "./ThemeContext.js";

export interface ThemeScriptProps {
  /** The fallback brand if not saved in storage (default: "simantrix") */
  brand?: ThemeBrand;
  /** The fallback role if not saved in storage (default: "simantrix") */
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
  brand = "simantrix",
  role = "simantrix",
  defaultColorMode = "system",
  storageKey = "gy-theme",
  nonce,
}: ThemeScriptProps) {
  const code = `(function(){try{var k=${JSON.stringify(storageKey)};var s=k?localStorage.getItem(k):null;var p=s?JSON.parse(s):{};var b=p.brand||${JSON.stringify(brand)};var r=p.role||${JSON.stringify(role)};var cm=p.colorMode||${JSON.stringify(defaultColorMode)};var rm=cm==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):cm;var el=document.documentElement;el.setAttribute('data-brand',b);el.setAttribute('data-role',r);el.setAttribute('data-color-mode',rm);el.setAttribute('data-theme','simantrix-'+r);if(rm==='dark'){el.classList.add('dark','gy-dark');el.classList.remove('light','gy-light');}else{el.classList.add('light','gy-light');el.classList.remove('dark','gy-dark');}}catch(e){}})();`;

  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
