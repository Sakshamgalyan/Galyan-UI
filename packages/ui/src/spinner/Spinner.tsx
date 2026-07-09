'use client';

import React from 'react';
import './spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'white' | 'neutral';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', color = 'primary', label, className = '' }: SpinnerProps) {
  return (
    <div className={`gy-spinner-container ${className}`}>
      <span
        className={`gy-spinner gy-spinner--${size} gy-spinner--${color}`}
        role="status"
        aria-label={label ?? 'Loading...'}
      >
        <span className="gy-spinner__circle" aria-hidden="true" />
      </span>
      {label && <span className="gy-spinner__label">{label}</span>}
    </div>
  );
}
