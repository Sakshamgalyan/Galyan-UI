'use client';

import React from 'react';
import './skeleton.css';

export type SkeletonShape = 'text' | 'circle' | 'rect' | 'card';
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';

export interface SkeletonProps {
  shape?: SkeletonShape;
  animation?: SkeletonAnimation;
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number;
  gap?: string;
}

export function Skeleton({
  shape = 'rect',
  animation = 'wave',
  width,
  height,
  className = '',
  lines,
  gap = '0.5rem',
}: SkeletonProps) {
  const classes = [
    'gy-skeleton',
    `gy-skeleton--${shape}`,
    animation !== 'none' ? `gy-skeleton--${animation}` : '',
    !width ? 'gy-skeleton--w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  if (lines) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`gy-skeleton gy-skeleton--text ${animation !== 'none' ? `gy-skeleton--${animation}` : ''} ${
              i === lines - 1 ? 'gy-skeleton--w-3-4' : 'gy-skeleton--w-full'
            }`}
            style={{ height: height ?? '1em' }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return <div className={classes} style={style} aria-hidden="true" />;
}
