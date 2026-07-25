'use client';

import React from 'react';
import './progressbar.css';

export type ProgressSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient' | 'indigo';

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  progress: number;
  /** Display type: linear bar or circular ring */
  type?: 'bar' | 'circular';
  /** Height of the bar / diameter of the circle */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Color variant */
  variant?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'gradient'
    | 'indigo';
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

const circularSizes: Record<'sm' | 'md' | 'lg' | 'xl', number> = {
  sm: 40,
  md: 64,
  lg: 96,
  xl: 128,
};

export function ProgressBar({
  progress = 0,
  type = 'bar',
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  showValue = false,
  className = '',
  barClassName = '',
  strokeWidth: customStrokeWidth,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  if (type === 'circular') {
    const dim = circularSizes[size];
    const sw = customStrokeWidth ?? (size === 'sm' ? 4 : size === 'md' ? 6 : size === 'lg' ? 8 : 10);
    const radius = (dim - sw) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

    return (
      <div className={`gy-progress gy-progress--circular gy-progress--${size} ${className}`}>
        {label && (
          <div className="gy-progress__header gy-progress__header--circular">
            <span className="gy-progress__label">{label}</span>
          </div>
        )}
        <div className={`gy-progress-circular gy-progress-circular--${size} gy-progress-circular--${variant}`}>
          <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} className="gy-progress-circular__svg">
            <circle
              className="gy-progress-circular__bg"
              cx={dim / 2}
              cy={dim / 2}
              r={radius}
              strokeWidth={sw}
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
            />
          </svg>
          {(showValue || showLabel) && (
            <div className="gy-progress-circular__content">
              <span className="gy-progress__value">{Math.round(clampedProgress)}%</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`gy-progress gy-progress--${size} ${className}`}>
      {(label || showLabel || showValue) && (
        <div className="gy-progress__header">
          {label && <span className="gy-progress__label">{label}</span>}
          {(showValue || showLabel) && (
            <span className="gy-progress__value">{Math.round(clampedProgress)}%</span>
          )}
        </div>
      )}
      <div
        className={`gy-progress__track gy-progress__track--${size}`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={`gy-progress__bar gy-progress__bar--${variant} ${barClassName}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
