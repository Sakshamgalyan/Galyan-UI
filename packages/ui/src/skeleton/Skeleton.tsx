"use client";

import React from "react";
import type { ThemeRole, ColorMode } from "@galyan/theme";
import "./skeleton.css";

export type SkeletonVariant = "text" | "circular" | "rectangular";
export type SkeletonShape = SkeletonVariant;
export type SkeletonAnimation = "wave" | "pulse" | "none";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  className?: string;
  variant?: SkeletonVariant;
  colorScheme?: ThemeRole;
  themeRole?: ThemeRole;
  colorMode?: ColorMode;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  style,
  colorScheme,
  themeRole,
  colorMode,
  ...rest
}: SkeletonProps) {
  const classes = ["gy-skeleton", `gy-skeleton--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const role = colorScheme ?? themeRole;
  const dataProps: Record<string, string> = {};
  if (role) {
    dataProps["data-theme"] = role;
    dataProps["data-role"] = role;
    dataProps["data-color-scheme"] = role;
  }
  if (colorMode) {
    dataProps["data-color-mode"] = colorMode;
  }

  const customStyle: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...style,
  };

  return (
    <div
      className={classes}
      style={customStyle}
      aria-hidden="true"
      {...dataProps}
      {...rest}
    />
  );
}
