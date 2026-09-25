"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow as arrowMiddleware,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import "./tooltip.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "default" | "dark" | "light" | "primary";
export type TooltipSize = "sm" | "md" | "lg";
export type TooltipTrigger = "hover" | "click" | "both";

export interface TooltipProps {
  /** Content displayed inside the tooltip popover */
  content: React.ReactNode;
  /** Target element that triggers the tooltip */
  children?: React.ReactNode;
  /** Target element (alias for children) */
  target?: React.ReactNode;
  /** Positioning relative to target element */
  position?: TooltipPosition;
  /** Alias for position */
  placement?: TooltipPosition;
  /** Color theme variant of the tooltip */
  variant?: TooltipVariant;
  /** Size scale of the tooltip popup */
  size?: TooltipSize;
  /** Delay in milliseconds before showing tooltip on hover */
  delay?: number;
  /** Custom fixed width for the tooltip popup */
  width?: string;
  /** Custom maximum width for the tooltip popup */
  maxWidth?: string | number;
  /** Whether text should break across multiple lines */
  linebreak?: boolean;
  /** Whether to show directional arrow pointer */
  hasArrow?: boolean;
  /** Keyboard shortcut hint (e.g. '⌘K' or 'Ctrl+S') */
  shortcut?: string;
  /**
   * Render tooltip using portal to avoid clipping by parent containers
   * @default true
   */
  usePortal?: boolean;
  /**
   * How the tooltip should be triggered
   * @default "hover"
   */
  trigger?: TooltipTrigger;
  /** Custom class name for the tooltip popover container */
  className?: string;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
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
    style={{
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      opacity: 0.75,
      transition: "opacity 0.15s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
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
  position,
  placement = "top",
  variant = "default",
  size = "md",
  delay = 100,
  width,
  maxWidth,
  linebreak = false,
  hasArrow = true,
  shortcut,
  usePortal = true,
  trigger = "hover",
  className = "",
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerWrapperRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const desiredPlacement = (position ?? placement) as Placement;

  const { refs, floatingStyles, middlewareData, placement: floatingPlacement } =
    useFloating({
      open: visible && !disabled,
      onOpenChange: (open) => {
        if (!disabled) setVisible(open);
      },
      placement: desiredPlacement,
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(8),
        flip({ fallbackAxisSideDirection: "start", padding: 8 }),
        shift({ padding: 8 }),
        arrowMiddleware({ element: arrowRef, padding: 8 }),
      ],
    });

  const show = () => {
    if (disabled || !content) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  const toggle = () => {
    if (disabled || !content) return;
    if (visible) {
      hide();
    } else {
      show();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (trigger === "click" || trigger === "both") {
      e.stopPropagation();
      toggle();
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    if (trigger === "hover" || trigger === "both") {
      show();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" || trigger === "both") {
      hide();
    }
  };

  useEffect(() => {
    if (disabled && visible) {
      setVisible(false);
    }
  }, [disabled, visible]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!visible) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        triggerWrapperRef.current &&
        !triggerWrapperRef.current.contains(event.target as Node)
      ) {
        hide();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        hide();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerNode = target ?? children ?? <DefaultInfoIcon />;

  const isMultiLine =
    linebreak ||
    (maxWidth !== undefined &&
      typeof content === "string" &&
      content.length > 60);

  const tooltipCustomStyle: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...(maxWidth !== undefined
      ? {
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }
      : {}),
    whiteSpace: isMultiLine ? "normal" : "nowrap",
  };

  const side = floatingPlacement.split("-")[0] as TooltipPosition;
  const arrowSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[side] as string;

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;

  const tooltipElement = !disabled && visible && (
    <div
      ref={refs.setFloating}
      role="tooltip"
      className={[
        "gy-tooltip",
        `gy-tooltip--${side}`,
        `gy-tooltip--${variant}`,
        `gy-tooltip--${size}`,
        isMultiLine ? "gy-tooltip--multiline" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...floatingStyles,
        ...tooltipCustomStyle,
        zIndex: 99999,
      }}
      onMouseEnter={() => {
        if (trigger === "hover" || trigger === "both") {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setVisible(true);
        }
      }}
      onMouseLeave={() => {
        if (trigger === "hover" || trigger === "both") {
          hide();
        }
      }}
    >
      <div className="gy-tooltip__content">
        <div className="gy-tooltip__text">{content}</div>
        {shortcut && <kbd className="gy-tooltip__kbd">{shortcut}</kbd>}
      </div>
      {hasArrow && (
        <div
          ref={arrowRef}
          className="gy-tooltip__arrow"
          style={{
            position: "absolute",
            left: arrowX != null ? `${arrowX}px` : undefined,
            top: arrowY != null ? `${arrowY}px` : undefined,
            [arrowSide]: "-4.5px",
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <span
        ref={(node) => {
          triggerWrapperRef.current = node;
          refs.setReference(node);
        }}
        className="gy-tooltip-trigger"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {triggerNode}
        {!usePortal && tooltipElement}
      </span>

      {usePortal && tooltipElement && (
        <FloatingPortal>{tooltipElement}</FloatingPortal>
      )}
    </>
  );
}
