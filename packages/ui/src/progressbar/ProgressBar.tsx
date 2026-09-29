"use client";

import React from "react";
import { Typography } from "../typography/Typography";
import "./progressbar.css";

export type ProgressSize = "sm" | "md" | "lg" | "xl";
export type ProgressColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gradient"
  | "indigo"
  | "purple";

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  progress?: number;
  /** Display type: linear bar or circular ring */
  type?: "bar" | "circular";
  /** Height of the bar / diameter of the circle */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant (default uses active role theme color) */
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gradient"
    | "indigo"
    | "purple";
  /** Custom bar color */
  color?: string;
  /** Custom track background color */
  trackColor?: string;
  /** Whether the progress bar is in an indeterminate loading state */
  loading?: boolean;
  /** Alias for loading state */
  indeterminate?: boolean;
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Custom label text to show above the bar */
  label?: string;
  /** Whether to show the progress value */
  showValue?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom class name for the bar itself */
  barClassName?: string;
  /** Stroke width for circular type */
  strokeWidth?: number;
}

const circularSizes: Record<"sm" | "md" | "lg" | "xl", number> = {
  sm: 40,
  md: 64,
  lg: 96,
  xl: 128,
};

export function ProgressBar({
  progress = 0,
  type = "bar",
  size = "md",
  variant = "default",
  color,
  trackColor,
  loading = false,
  indeterminate = false,
  showLabel = false,
  label,
  showValue = false,
  className = "",
  barClassName = "",
  strokeWidth: customStrokeWidth,
}: ProgressBarProps) {
  const isLoading = loading || indeterminate;
  const isIndeterminate =
    indeterminate || (loading && (progress === undefined || progress === 0));
  const isDeterminateLoading =
    loading && !indeterminate && progress !== undefined && progress > 0;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (type === "circular") {
    const dim = circularSizes[size];
    const sw =
      customStrokeWidth ??
      (size === "sm" ? 4 : size === "md" ? 6 : size === "lg" ? 8 : 10);
    const radius = (dim - sw) / 2;
    const strokeDashoffset = isIndeterminate
      ? undefined
      : 100 - clampedProgress;

    return (
      <div
        className={`gy-progress gy-progress--circular gy-progress--${size} ${className}`}
      >
        {label && (
          <div className="gy-progress__header gy-progress__header--circular">
            <Typography
              variant="span"
              weight="medium"
              className="gy-progress__label"
            >
              {label}
            </Typography>
          </div>
        )}
        <div
          className={[
            "gy-progress-circular",
            `gy-progress-circular--${size}`,
            `gy-progress-circular--${variant}`,
            isIndeterminate ? "gy-progress-circular--indeterminate" : "",
            isDeterminateLoading ? "gy-progress-circular--loading" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? (isLoading ? "Loading" : "Progress")}
        >
          <svg
            width={dim}
            height={dim}
            viewBox={`0 0 ${dim} ${dim}`}
            className="gy-progress-circular__svg"
          >
            <circle
              className="gy-progress-circular__bg"
              cx={dim / 2}
              cy={dim / 2}
              r={radius}
              strokeWidth={sw}
              style={{ stroke: trackColor }}
            />
            <circle
              className={`gy-progress-circular__fill ${barClassName}`}
              cx={dim / 2}
              cy={dim / 2}
              r={radius}
              strokeWidth={sw}
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ stroke: color }}
            />
          </svg>
          {(showValue || showLabel) && (
            <div className="gy-progress-circular__content">
              {isIndeterminate ? (
                <span
                  className={`gy-progress-circular__loading-pulse gy-progress-circular__loading-pulse--${variant}`}
                />
              ) : (
                <Typography
                  variant="span"
                  weight="normal"
                  className="gy-progress__value"
                >
                  {Math.round(clampedProgress)}%
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`gy-progress gy-progress--${size} ${className}`}>
      {(label ||
        (!isLoading && (showLabel || showValue)) ||
        (isLoading && (showLabel || showValue))) && (
        <div className="gy-progress__header">
          {label && (
            <div className="gy-progress__label-wrap">
              <Typography
                variant="span"
                weight="semibold"
                className="gy-progress__label"
              >
                {label}
              </Typography>
            </div>
          )}
          {!isLoading && (showValue || showLabel) && (
            <Typography
              variant="span"
              weight="semibold"
              className="gy-progress__value"
            >
              {Math.round(clampedProgress)}%
            </Typography>
          )}
          {isLoading && (showValue || showLabel) && (
            <div className="gy-progress__loading-badge">
              <span
                className={`gy-progress__pulse-dot gy-progress__pulse-dot--${variant}`}
              />
              <Typography
                variant="span"
                weight="semibold"
                className="gy-progress__value"
              >
                {clampedProgress > 0
                  ? `${Math.round(clampedProgress)}%`
                  : "Loading..."}
              </Typography>
            </div>
          )}
        </div>
      )}
      <div
        className={`gy-progress__track gy-progress__track--${size} ${
          isLoading ? "gy-progress__track--indeterminate" : ""
        }`}
        style={{ backgroundColor: trackColor }}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? (isLoading ? "Loading" : "Progress")}
      >
        {isIndeterminate ? (
          <>
            <div
              className={`gy-progress__bar gy-progress__bar--${variant} gy-progress__bar--indeterminate-1 ${barClassName}`}
              style={color ? { backgroundColor: color } : undefined}
            />
            <div
              className={`gy-progress__bar gy-progress__bar--${variant} gy-progress__bar--indeterminate-2 ${barClassName}`}
              style={color ? { backgroundColor: color } : undefined}
            />
          </>
        ) : (
          <div
            className={`gy-progress__bar gy-progress__bar--${variant} ${
              isDeterminateLoading ? "gy-progress__bar--loading-shimmer" : ""
            } ${barClassName}`}
            style={{
              width: `${clampedProgress}%`,
              ...(color ? { backgroundColor: color } : {}),
            }}
          />
        )}
      </div>
    </div>
  );
}
