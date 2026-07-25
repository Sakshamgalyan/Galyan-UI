'use client';

import React from 'react';
import './typography.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'label'
  | 'small';

export type TypographyWeight =
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export type TypographyMargin = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const defaultTagMap: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
  label: 'label',
  small: 'small',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  align?: TypographyAlign;
  margin?: TypographyMargin;
  textColor?: string;
  bgColor?: string;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  htmlFor?: string;
}

export function Typography({
  variant = 'p',
  weight,
  align,
  margin = 'none',
  textColor,
  bgColor,
  className = '',
  children,
  as,
  style,
  ...rest
}: TypographyProps) {
  const Tag = as ?? defaultTagMap[variant] ?? 'p';

  const classes = [
    'gy-typography',
    `gy-typography--${variant}`,
    weight ? `gy-typography--weight-${weight}` : '',
    align ? `gy-typography--align-${align}` : '',
    margin && margin !== 'none' ? `gy-typography--margin-${margin}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const customStyle: React.CSSProperties = {
    ...(textColor ? { color: textColor } : {}),
    ...(bgColor ? { backgroundColor: bgColor } : {}),
    ...style,
  };

  return (
    <Tag className={classes} style={customStyle} {...rest}>
      {children}
    </Tag>
  );
}
