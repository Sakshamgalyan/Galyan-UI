import type React from "react";
import type { ThemeRole } from "@galyan/theme";

export type LogoLayout = "mark" | "horizontal" | "stacked" | "wordmark";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;

export type LogoColorMode = "dark" | "light" | "transparent" | "auto";

export type LogoMarkStyle = "vector" | "3d";

export interface SimantrixMarkProps extends React.SVGAttributes<SVGSVGElement> {
  /** Size preset or explicit pixel number (default: 'md' = 32px) */
  size?: LogoSize;
  /** Visual color mode backdrop (default: 'auto') */
  colorMode?: LogoColorMode;
  /** Rendering technique: 'vector' (pure scalable SVG paths) or '3d' (glass ribbon) */
  markStyle?: LogoMarkStyle;
  /** Accessible title for screen readers */
  title?: string;
  /** Additional CSS class names */
  className?: string;
}

export interface SimantrixLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout orientation: 'horizontal' (navbar), 'stacked' (auth/hero), 'mark' (icon), 'wordmark' (text) */
  layout?: LogoLayout;
  /** Size preset or custom pixel height/width */
  size?: LogoSize;
  /** Color mode backdrop */
  colorMode?: LogoColorMode;
  /** Mark rendering style */
  markStyle?: LogoMarkStyle;
  /** Whether to render the tagline: "VIRTUAL SPACES. REAL CONNECTIONS." */
  withTagline?: boolean;
  /** Custom tagline text override */
  taglineText?: string;
  /** Optional link URL (renders as <a> wrapper with hover animations) */
  href?: string;
  /** Accessible title label */
  title?: string;
  /** Custom CSS classes */
  className?: string;
  /** Optional theme role override from @galyan/theme */
  themeRole?: ThemeRole;
}
