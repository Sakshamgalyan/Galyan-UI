'use client';

import React from 'react';
import './progressbar.css';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressColor = 'primary' | 'success' | 'warning' | 'danger' | 'gradient';

export interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: ProgressSize;
  color?: ProgressColor;
  label?: string;
  showValue?: boolean;
  striped?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  color = 'primary',
  label,
  showValue = false,
  striped = false,
  indeterminate = false,
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);

  const fillClasses = [
    'gy-progress-fill',
    color !== 'primary' ? `gy-progress-fill--${color}` : '',
    striped ? 'gy-progress-fill--striped' : '',
    indeterminate ? 'gy-progress-fill--indeterminate' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`gy-progress ${className}`}>
      {(label || showValue) && (
        <div className="gy-progress-header">
          {label && <span className="gy-progress-label">{label}</span>}
          {showValue && !indeterminate && (
            <span className="gy-progress-value">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div
        className={`gy-progress-track gy-progress-track--${size}`}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? 'Progress'}
      >
        <div
          className={fillClasses}
          style={{ width: indeterminate ? undefined : `${pct}%` }}
        />
      </div>
    </div>
  );
}
