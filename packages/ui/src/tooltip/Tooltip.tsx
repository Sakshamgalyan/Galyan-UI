"use client";

import React, { useState, useRef } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import "./tooltip.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "default" | "dark" | "light" | "primary";

export interface TooltipProps {
  /** Content displayed inside the tooltip popover */
  content: React.ReactNode;
  /** Optional target element that triggers the tooltip */
  children?: React.ReactNode;
  /** Optional target element (alias for children) */
  target?: React.ReactNode;
  /** Positioning relative to target element */
  position?: TooltipPosition;
  /** Color theme variant of the tooltip */
  variant?: TooltipVariant;
  /** Delay in milliseconds before showing tooltip on hover */
  delay?: number;
  /** Custom fixed width for the tooltip popup */
  width?: string;
  /** Custom maximum width for the tooltip popup */
  maxWidth?: string | number;
  /** Whether to show directional arrow pointer */
  hasArrow?: boolean;
  /** Keyboard shortcut hint (e.g. '⌘K' or 'Ctrl+S') */
  shortcut?: string;
  /** Custom class name for the tooltip popover container */
  className?: string;
}

const DefaultInfoIcon = () => (
  <svg
    width="15"
    height="15"
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
  position = "top",
  variant = "default",
  delay = 100,
  width,
  maxWidth,
  hasArrow = true,
  shortcut,
  className = "",
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<HTMLDivElement>(null);

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: position as Placement,
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(8),
        flip({ fallbackAxisSideDirection: "start" }),
        shift({ padding: 8 }),
        arrow({ element: arrowRef }),
      ],
    });

  const hover = useHover(context, {
    delay: { open: delay, close: 0 },
    move: true,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const triggerNode = target ?? children ?? <DefaultInfoIcon />;

  const tooltipCustomStyle: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...(maxWidth !== undefined
      ? {
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          whiteSpace: "normal",
        }
      : {}),
  };

  const side = placement.split("-")[0] as TooltipPosition;
  const arrowSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[side] as string;

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;

  return (
    <>
      <span
        ref={refs.setReference}
        className="gy-tooltip-trigger"
        {...getReferenceProps()}
      >
        {triggerNode}
      </span>
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            className={[
              "gy-tooltip",
              `gy-tooltip--${side}`,
              `gy-tooltip--${variant}`,
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              ...floatingStyles,
              ...tooltipCustomStyle,
              zIndex: 99999,
            }}
            {...getFloatingProps()}
          >
            <div className="gy-tooltip__content">
              <span className="gy-tooltip__text">{content}</span>
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
                  [arrowSide]: "-4px",
                }}
              />
            )}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
