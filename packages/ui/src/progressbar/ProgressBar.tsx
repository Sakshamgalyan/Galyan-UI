"use client";

import React from "react";
import { Typography } from "../typography/Typography";
import "./progressbar.css";

export type ProgressSize = "sm" | "md" | "lg" | "xl";
export type ProgressColor =
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
  /** Color variant */
  variant?:
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
  variant = "primary",
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
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (type === "circular") {
    const dim = circularSizes[size];
    const sw =
      customStrokeWidth ??
      (size === "sm" ? 4 : size === "md" ? 6 : size === "lg" ? 8 : 10);
    const radius = (dim - sw) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = isLoading
      ? circumference * 0.25
      : circumference - (clampedProgress / 100) * circumference;

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
          className={`gy-progress-circular gy-progress-circular--${size} gy-progress-circular--${variant} ${
            isLoading ? "gy-progress-circular--indeterminate" : ""
          }`}
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
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ stroke: color }}
            />
          </svg>
          {!isLoading && (showValue || showLabel) && (
            <div className="gy-progress-circular__content">
              <Typography
                variant="span"
                weight="semibold"
                className="gy-progress__value"
              >
                {Math.round(clampedProgress)}%
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`gy-progress gy-progress--${size} ${className}`}>
      {(label || (!isLoading && (showLabel || showValue))) && (
        <div className="gy-progress__header">
          {label && (
            <Typography
              variant="span"
              weight="semibold"
              className="gy-progress__label"
            >
              {label}
            </Typography>
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
        </div>
      )}
      <div
        className={`gy-progress__track gy-progress__track--${size} ${
          isLoading ? "gy-progress__track--indeterminate" : ""
        }`}
        style={{ backgroundColor: trackColor }}
        role="progressbar"
        aria-valuenow={isLoading ? undefined : clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? (isLoading ? "Loading" : "Progress")}
      >
        <div
          className={`gy-progress__bar gy-progress__bar--${variant} ${
            isLoading ? "gy-progress__bar--indeterminate" : ""
          } ${barClassName}`}
          style={{
            ...(!isLoading ? { width: `${clampedProgress}%` } : {}),
            ...(color ? { backgroundColor: color } : {}),
          }}
        />
      </div>
    </div>
  );
}

