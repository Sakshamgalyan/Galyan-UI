'use client';

import React from 'react';
import { Skeleton } from '../skeleton/Skeleton';
import './card.css';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg';
export type CardHoverEffect = 'none' | 'lift' | 'glow' | 'border';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  shadow?: CardShadow;
  hoverEffect?: CardHoverEffect;
  bgColor?: string;
  customPadding?: string;
  border?: boolean;
  radius?: CardRadius;
  className?: string;
  isLoading?: boolean;
  skeletonLines?: number;
  skeletonContent?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export function Card({
  variant = 'default',
  padding = 'md',
  shadow = 'sm',
  hoverEffect = 'none',
  bgColor,
  customPadding,
  border = true,
  radius = 'lg',
  className = '',
  isLoading = false,
  skeletonLines = 3,
  skeletonContent,
  children,
  onClick,
  style,
}: CardProps) {
  const cardStyle: React.CSSProperties = {
    ...(bgColor ? { backgroundColor: bgColor } : {}),
    ...(customPadding ? { padding: customPadding } : {}),
    ...style,
  };

  const rootClasses = [
    'gy-card',
    `gy-card--${variant}`,
    padding !== 'none' ? `gy-card--padding-${padding}` : '',
    shadow !== 'none' ? `gy-card--shadow-${shadow}` : '',
    hoverEffect !== 'none' ? `gy-card--hover-${hoverEffect}` : '',
    border ? 'gy-card--bordered' : 'gy-card--no-border',
    `gy-card--radius-${radius}`,
    onClick ? 'gy-card--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  if (isLoading) {
    return (
      <div className={rootClasses} style={cardStyle}>
        {skeletonContent ? (
          skeletonContent
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Skeleton width="40%" height="1.25rem" />
            {Array.from({ length: skeletonLines }).map((_, idx) => (
              <Skeleton key={idx} width={idx === skeletonLines - 1 ? '70%' : '100%'} height="0.875rem" />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={rootClasses}
      style={cardStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export function CardHeader({ children, className = '', style, ...props }: CardHeaderProps) {
  return <div className={`gy-card-header ${className}`} style={style} {...props}>{children}</div>;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export function CardBody({ children, className = '', style, ...props }: CardBodyProps) {
  return <div className={`gy-card-body ${className}`} style={style} {...props}>{children}</div>;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}
export function CardFooter({ children, className = '', style, ...props }: CardFooterProps) {
  return <div className={`gy-card-footer ${className}`} style={style} {...props}>{children}</div>;
}

export interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label?: string };
  footer?: string;
  className?: string;
}
export function CardInfo({ title, value, icon, trend, footer, className = '', style, ...props }: CardInfoProps) {
  const isUp = trend ? trend.value >= 0 : null;
  return (
    <div className={`gy-card-info ${className}`} style={style} {...props}>
      <div className="gy-card-info__header">
        <span className="gy-card-info__title">{title}</span>
        {icon && <span className="gy-card-info__icon">{icon}</span>}
      </div>
      <div className="gy-card-info__value">{value}</div>
      {trend && (
        <div>
          <span className={`gy-card-info__trend gy-card-info__trend--${isUp ? 'up' : 'down'}`}>
            {isUp ? '↑' : '↓'} {Math.abs(trend.value)}%
            {trend.label && ` ${trend.label}`}
          </span>
        </div>
      )}
      {footer && <div className="gy-card-info__footer">{footer}</div>}
    </div>
  );
}
