'use client';

import React from 'react';
import './skeleton.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';
export type SkeletonShape = SkeletonVariant;
export type SkeletonAnimation = 'wave' | 'pulse' | 'none';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  className?: string;
  variant?: SkeletonVariant;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
  style,
  ...rest
}: SkeletonProps) {
  const classes = [
    'gy-skeleton',
    `gy-skeleton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

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
      {...rest}
    />
  );
}
