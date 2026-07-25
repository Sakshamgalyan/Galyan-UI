'use client';

import React, { useState, useRef } from 'react';
import { Typography } from '../typography';
import './tooltip.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content displayed inside the tooltip popover */
  content: React.ReactNode;
  /** Optional target element that triggers the tooltip */
  children?: React.ReactNode;
  /** Optional target element (alias for children) */
  target?: React.ReactNode;
  /** Positioning relative to target element */
  position?: TooltipPosition;
  /** Delay in milliseconds before showing tooltip on hover */
  delay?: number;
  /** Custom width for the tooltip popup */
  width?: string;
  /** Custom class name for the tooltip popover container */
  className?: string;
}

const DefaultInfoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-label="Info"
    style={{ cursor: 'pointer', display: 'inline-block', verticalAlign: 'middle' }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export function Tooltip({
  content,
  children,
  target,
  position = 'top',
  delay = 150,
  width,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  const triggerNode = target ?? children ?? <DefaultInfoIcon />;

  return (
    <div
      className="gy-tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {triggerNode}
      {isVisible && (
        <div
          className={`gy-tooltip gy-tooltip--${position} ${className}`}
          style={width ? { width, maxWidth: width } : undefined}
          role="tooltip"
        >
          <div className="gy-tooltip__content">
            {typeof content === 'string' ? (
              <Typography variant="small" weight="medium" textColor="inherit">
                {content}
              </Typography>
            ) : (
              content
            )}
          </div>
          <div className="gy-tooltip__arrow" />
        </div>
      )}
    </div>
  );
}
