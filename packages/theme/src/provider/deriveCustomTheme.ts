/**
 * deriveCustomTheme.ts
 *
 * Pure utility that takes a single primary hex colour and derives a complete
 * set of --gy-custom-* CSS variables for the custom theme role.
 *
 * Zero external dependencies — all colour math is inline.
 */

// ── Colour helpers ──────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => {
        const clamped = Math.max(0, Math.min(255, Math.round(v)));
        return clamped.toString(16).padStart(2, "0");
      })
      .join("")
  );
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const l = (max + min) / 2;

  if (max === min) return [0, 0, l];

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

  if (max === r1) h = ((g1 - b1) / d + (g1 < b1 ? 6 : 0)) / 6;
  else if (max === g1) h = ((b1 - r1) / d + 2) / 6;
  else h = ((r1 - g1) / d + 4) / 6;

  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hNorm = ((h % 360) + 360) % 360;

  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let t1 = t;
    if (t1 < 0) t1 += 1;
    if (t1 > 1) t1 -= 1;
    if (t1 < 1 / 6) return p + (q - p) * 6 * t1;
    if (t1 < 1 / 2) return q;
    if (t1 < 2 / 3) return p + (q - p) * (2 / 3 - t1) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hFrac = hNorm / 360;

  return [
    Math.round(hue2rgb(p, q, hFrac + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, hFrac) * 255),
    Math.round(hue2rgb(p, q, hFrac - 1 / 3) * 255),
  ];
}

function hexToHsl(hex: string): [number, number, number] {
  return rgbToHsl(...hexToRgb(hex));
}

function hslToHex(h: number, s: number, l: number): string {
  return rgbToHex(...hslToRgb(h, s, l));
}

/** WCAG 2.1 relative luminance */
function relativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(...hexToRgb(hex1));
  const l2 = relativeLuminance(...hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Mix two hex colours by a ratio (0 = colour1, 1 = colour2) */
function mixHex(hex1: string, hex2: string, ratio: number): string {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  return rgbToHex(
    r1 + (r2 - r1) * ratio,
    g1 + (g2 - g1) * ratio,
    b1 + (b2 - b1) * ratio,
  );
}

// ── Ramp generation ─────────────────────────────────────────────────────

/** Target lightness values for each step in the 50–950 scale */
const LIGHTNESS_MAP: Record<number, number> = {
  50: 0.95,
  100: 0.9,
  200: 0.82,
  300: 0.7,
  400: 0.58,
  500: -1, // use original
  600: 0.4,
  700: 0.32,
  800: 0.24,
  900: 0.17,
  950: 0.1,
};

function generateRamp(hex: string): Record<number, string> {
  const [h, s, l] = hexToHsl(hex);
  const ramp: Record<number, string> = {};

  for (const [step, targetL] of Object.entries(LIGHTNESS_MAP)) {
    const stepNum = Number(step);
    if (targetL === -1) {
      ramp[stepNum] = hex;
    } else {
      // Slightly desaturate towards extremes for natural look
      const satMod = stepNum <= 100 || stepNum >= 900 ? s * 0.6 : s;
      ramp[stepNum] = hslToHex(h, satMod, targetL);
    }
  }

  return ramp;
}

// ── Main export ─────────────────────────────────────────────────────────

/**
 * Derives a complete `--gy-custom-*` CSS variable map from a single primary hex and optional font family.
 *
 * @param primaryHex - The primary brand colour (e.g. "#f97316")
 * @param fontFamily - Optional custom font family (e.g. "'Outfit', sans-serif")
 * @param fontFamilyMono - Optional custom monospace font family
 * @param fontFamilyDisplay - Optional custom display font family
 * @returns A Record of CSS variable names → values to set on the root element
 */
export function deriveCustomTheme(
  primaryHex: string,
  fontFamily?: string,
  fontFamilyMono?: string,
  fontFamilyDisplay?: string,
): Record<string, string> {
  const ramp = generateRamp(primaryHex);
  const [h, s] = hexToHsl(primaryHex);

  // Secondary: shift hue +30°
  const secondaryHex = hslToHex((h + 30) % 360, s, 0.45);
  const secondaryRamp = generateRamp(secondaryHex);

  // Foreground: pick white or dark based on contrast
  const fg = contrastRatio(primaryHex, "#ffffff") >= 4.5 ? "#ffffff" : "#0f172a";

  // Focus ring: primary at 40% opacity
  const [pr, pg, pb] = hexToRgb(primaryHex);
  const focusRing = `rgba(${pr}, ${pg}, ${pb}, 0.4)`;

  // Neumorphism: mix primary into neutral
  const neuBg = mixHex("#e2e8f0", primaryHex, 0.1);

  const vars: Record<string, string> = {
    // Primary scale
    "--gy-custom-primary-50": ramp[50]!,
    "--gy-custom-primary-100": ramp[100]!,
    "--gy-custom-primary-200": ramp[200]!,
    "--gy-custom-primary-300": ramp[300]!,
    "--gy-custom-primary-400": ramp[400]!,
    "--gy-custom-primary-500": ramp[500]!,
    "--gy-custom-primary-600": ramp[600]!,
    "--gy-custom-primary-700": ramp[700]!,
    "--gy-custom-primary-800": ramp[800]!,
    "--gy-custom-primary-900": ramp[900]!,
    "--gy-custom-primary-950": ramp[950]!,

    // Semantic primary
    "--gy-custom-primary": primaryHex,
    "--gy-custom-primary-hover": ramp[600]!,
    "--gy-custom-primary-active": ramp[700]!,
    "--gy-custom-primary-muted": ramp[200]!,
    "--gy-custom-primary-subtle": ramp[50]!,
    "--gy-custom-primary-fg": fg,

    // Secondary (hue-shifted)
    "--gy-custom-secondary": secondaryHex,
    "--gy-custom-secondary-hover": secondaryRamp[600]!,
    "--gy-custom-secondary-muted": secondaryRamp[200]!,
    "--gy-custom-secondary-subtle": secondaryRamp[50]!,
    "--gy-custom-secondary-fg": "#ffffff",

    // Text — link colours
    "--gy-custom-text-link": ramp[600]!,
    "--gy-custom-text-link-hover": ramp[700]!,

    // Border — focus uses primary
    "--gy-custom-border-focus": primaryHex,

    // Focus
    "--gy-custom-focus-ring": focusRing,
    "--gy-custom-focus-outline": primaryHex,

    // Brand
    "--gy-custom-brand": primaryHex,
    "--gy-custom-brand-dark": ramp[700]!,
    "--gy-custom-brand-light": ramp[200]!,

    // Gradient
    "--gy-custom-gradient-primary": `linear-gradient(135deg, ${primaryHex} 0%, ${secondaryHex} 100%)`,
    "--gy-custom-gradient-hero": `linear-gradient(135deg, ${ramp[50]} 0%, ${ramp[100]} 50%, ${secondaryRamp[50]} 100%)`,
    "--gy-custom-gradient-brand": `linear-gradient(135deg, ${ramp[600]} 0%, ${secondaryRamp[600]} 100%)`,

    // Neumorphism
    "--gy-custom-neu-bg": neuBg,
  };

  if (fontFamily) {
    vars["--gy-custom-font-sans"] = fontFamily;
    vars["--gy-font-sans"] = fontFamily;
    vars["--gy-font-family"] = fontFamily;
  }

  if (fontFamilyMono) {
    vars["--gy-custom-font-mono"] = fontFamilyMono;
    vars["--gy-font-mono"] = fontFamilyMono;
  }

  if (fontFamilyDisplay) {
    vars["--gy-custom-font-display"] = fontFamilyDisplay;
    vars["--gy-font-display"] = fontFamilyDisplay;
  }

  return vars;
}

/** All --gy-custom-* variable names that may be injected, for cleanup */
export const CUSTOM_THEME_VARS = [
  ...Object.keys(deriveCustomTheme("#000000")),
  "--gy-custom-font-sans",
  "--gy-custom-font-mono",
  "--gy-custom-font-display",
  "--gy-font-sans",
  "--gy-font-family",
  "--gy-font-mono",
  "--gy-font-display",
];
