'use client';

import React from 'react';
import './typography.css';

export type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body-xl' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs'
  | 'caption-lg' | 'caption-md'
  | 'label' | 'code';

export type TypographyColor =
  | 'default' | 'muted' | 'subtle' | 'disabled' | 'inverse'
  | 'primary' | 'success' | 'warning' | 'danger' | 'info';

const variantTagMap: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
  'body-xl': 'p', 'body-lg': 'p', 'body-md': 'p', 'body-sm': 'p', 'body-xs': 'p',
  'caption-lg': 'span', 'caption-md': 'span',
  label: 'label',
  code: 'code',
};

export interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: React.ElementType;
  truncate?: boolean;
  className?: string;
  children?: React.ReactNode;
  id?: string;
  htmlFor?: string;
  style?: React.CSSProperties;
}

export function Typography({
  variant = 'body-md',
  color = 'default',
  as,
  truncate = false,
  className = '',
  children,
  ...rest
}: TypographyProps) {
  const Tag = as ?? variantTagMap[variant];

  const classes = [
    'gy-text',
    `gy-text--${variant}`,
    `gy-text--color-${color}`,
    truncate ? 'gy-text--truncate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes} {...rest}>{children}</Tag>;
}
