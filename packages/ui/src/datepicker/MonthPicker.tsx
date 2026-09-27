"use client";

import React, { useEffect, useState, useId } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size as floatingSize,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement as FloatingPlacement,
} from "@floating-ui/react";
import { MonthCalendar, MonthCalendarValue } from "../calendar/MonthCalendar";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export type { MonthCalendarValue as MonthPickerValue };

export interface MonthPickerProps {
  placeholder?: string;
  value?: MonthCalendarValue | null;
  onChange?: (val: MonthCalendarValue | null) => void;
  minYear?: number;
  maxYear?: number;
  minMonth?: MonthCalendarValue;
  maxMonth?: MonthCalendarValue;
  minDate?: Date;
  maxDate?: Date;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (val: MonthCalendarValue | null) => void;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  /**
   * Whether to enable smart positioning that automatically flips between top and bottom.
   * Restricts placement strictly to top and bottom to avoid unwanted horizontal flips.
   * @default true
   */
  smartPosition?: boolean;
  zIndex?: number;
  usePortal?: boolean;
  required?: boolean;
  disabled?: boolean;
  borderless?: boolean;
  inline?: boolean;
  variant?: "default" | "bordered" | "glassmorphic" | "glass" | "borderless";
  label?: string;
  helperText?: string;
  hasError?: boolean;
  className?: string;
  /** Size of the input trigger */
  size?: "sm" | "md" | "lg";
  /** Sizing of the expanded month menu (defaults to sleek compact) */
  menuSize?: "sm" | "md" | "lg";
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function MonthPicker({
  placeholder = "Select month",
  value,
  onChange,
  minYear = 1970,
  maxYear = 2050,
  minMonth,
  maxMonth,
  minDate,
  maxDate,
  onOpen,
  onClose,
  onCancel,
  onApply,
  placement = "bottom",
  align = "left",
  smartPosition = true,
  zIndex = 10050,
  usePortal = true,
  required = false,
  disabled = false,
  borderless = false,
  inline = false,
  variant = "default",
  label,
  helperText,
  hasError = false,
  className = "",
  size,
  menuSize,
}: MonthPickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<MonthCalendarValue | null>(
    value ?? null,
  );

  useEffect(() => {
    setTempValue(value ?? null);
  }, [value, open]);

  useEffect(() => {
    if (open) onOpen?.();
    else onClose?.();
  }, [open, onOpen, onClose]);

  const desiredPlacement: FloatingPlacement =
    `${placement}-${align === "right" ? "end" : "start"}` as FloatingPlacement;

  const fallbackPlacements: FloatingPlacement[] =
    placement === "top"
      ? [
          align === "right" ? "bottom-end" : "bottom-start",
          align === "right" ? "top-start" : "top-end",
          align === "right" ? "bottom-start" : "bottom-end",
        ]
      : [
          align === "right" ? "top-end" : "top-start",
          align === "right" ? "bottom-end" : "bottom-start",
          align === "right" ? "top-start" : "top-end",
        ];

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: desiredPlacement,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    transform: false,
    middleware: [
      offset(6),
      ...(smartPosition
        ? [
            flip({
              fallbackPlacements,
              fallbackAxisSideDirection: "none",
              crossAxis: false,
              padding: 8,
            }),
          ]
        : []),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          const w = `${Math.max(rects.reference.width, 280)}px`;
          elements.floating.style.setProperty("--gy-trigger-width", w);
          Object.assign(elements.floating.style, {
            width: w,
            minWidth: w,
          });
        },
      }),
    ],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    dismiss,
    role,
  ]);

  const handleCalendarChange = (val: MonthCalendarValue) => {
    setTempValue(val);
    if (!onApply) {
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleApply = () => {
    if (tempValue) {
      onChange?.(tempValue);
      onApply?.(tempValue);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setTempValue(value ?? null);
    onCancel?.();
    setOpen(false);
  };

  const displayVal = value ? `${MONTH_NAMES[value.month]} ${value.year}` : "";

  const isBorderless = borderless || variant === "borderless";
  const effectiveMenuSize = menuSize ?? (size === "sm" ? "sm" : undefined);

  if (inline) {
    return (
      <div
        className={`gy-monthpicker gy-monthpicker--inline ${
          isBorderless ? "gy-monthpicker--borderless" : ""
        } ${className}`}
      >
        <MonthCalendar
          value={value}
          onChange={(val) => {
            setTempValue(val);
            onChange?.(val);
            onApply?.(val);
          }}
          minYear={minYear}
          maxYear={maxYear}
          minMonth={minMonth}
          maxMonth={maxMonth}
          minDate={minDate}
          maxDate={maxDate}
          borderless={isBorderless}
          size={effectiveMenuSize}
        />
      </div>
    );
  }

  const popoverContent = (
    <div
      ref={refs.setFloating}
      className={`gy-monthpicker-popover ${isPositioned ? "gy-monthpicker-popover--positioned" : ""} ${
        effectiveMenuSize ? `gy-monthpicker-popover--${effectiveMenuSize}` : ""
      } ${
        isBorderless ? "gy-monthpicker-popover--borderless" : ""
      }`}
      style={{
        ...floatingStyles,
        zIndex,
        visibility: isPositioned ? "visible" : "hidden",
        opacity: isPositioned ? undefined : 0,
        pointerEvents: isPositioned ? undefined : "none",
      }}
      {...getFloatingProps()}
    >
      <MonthCalendar
        value={tempValue}
        onChange={handleCalendarChange}
        minYear={minYear}
        maxYear={maxYear}
        minMonth={minMonth}
        maxMonth={maxMonth}
        minDate={minDate}
        maxDate={maxDate}
        borderless
        size={effectiveMenuSize}
      />

      {(onApply || onCancel) && (
        <div className="gy-datepicker-actions">
          <Button size="sm" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`gy-monthpicker ${className}`}>
      {label && (
        <label
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={`gy-monthpicker-${uid}`}
        >
          {label}
        </label>
      )}

      <div
        ref={refs.setReference}
        style={{ width: "100%" }}
        {...getReferenceProps({
          onClick: () => !disabled && setOpen((o) => !o),
        })}
      >
        <Input
          id={`gy-monthpicker-${uid}`}
          fullWidth
          isFocused={open}
          placeholder={placeholder}
          value={displayVal}
          size={size}
          readOnly
          disabled={disabled}
          required={required}
          hasError={hasError}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
          rightIcon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
          }
        />
      </div>

      {helperText && (
        <div className={`gy-input-helper ${hasError ? "gy-input-helper--error" : ""}`}>
          {helperText}
        </div>
      )}

      {open && !disabled && (usePortal ? <FloatingPortal>{popoverContent}</FloatingPortal> : popoverContent)}
    </div>
  );
}
