'use client';

import React from 'react';
import './card.css';

// ── Card ─────────────────────────────────────────────────────────────────────
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  hoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ variant = 'default', size = 'md', hoverable = false, className = '', children, onClick, style }: CardProps) {
  return (
    <div
      className={[
        'gy-card',
        variant !== 'default' ? `gy-card--${variant}` : '',
        size !== 'md' ? `gy-card--${size}` : '',
        hoverable ? 'gy-card--hoverable' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <div className={`gy-card-header ${className}`}>{children}</div>;
}

export function CardBody({ children, size, className = '' }: { children?: React.ReactNode; size?: CardSize; className?: string }) {
  return (
    <div className={['gy-card-body', size ? `gy-card-body--${size}` : '', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <div className={`gy-card-footer ${className}`}>{children}</div>;
}

// ── CardInfo ──────────────────────────────────────────────────────────────────
export interface CardInfoProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label?: string };
  footer?: string;
  className?: string;
}

export function CardInfo({ title, value, icon, trend, footer, className = '' }: CardInfoProps) {
  const isUp = trend ? trend.value >= 0 : null;
  return (
    <div className={`gy-card-info ${className}`}>
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
