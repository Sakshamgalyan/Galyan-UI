"use client";

import React, { useEffect, useId, useRef, useState } from "react";
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
import { ClearButton } from "../clearbutton/ClearButton";
import "./datepicker.css";
import { Typography } from "../typography";

export type { MonthCalendarValue as MonthPickerValue };

export interface MonthPickerProps {
  placeholder?: string;
  value?: MonthCalendarValue | null;
  /** Default value for uncontrolled component */
  defaultValue?: MonthCalendarValue | null;
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
  /** Callback fired when clear button is clicked */
  onClear?: () => void;
  /** Whether clear icon is shown in the trigger input when a value is selected */
  clearable?: boolean;
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
  defaultValue,
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
  onClear,
  clearable = true,
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
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState<MonthCalendarValue | null>(
    value !== undefined ? value : (defaultValue ?? null),
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value ?? null);
    }
  }, [isControlled, value]);

  const [tempValue, setTempValue] = useState<MonthCalendarValue | null>(
    value !== undefined ? value : (defaultValue ?? null),
  );

  // Latest uncontrolled value, read when the popover opens without re-syncing on every change
  const internalValueRef = useRef(internalValue);
  useEffect(() => {
    internalValueRef.current = internalValue;
  }, [internalValue]);

  useEffect(() => {
    if (open) {
      const active = isControlled ? value : internalValueRef.current;
      setTempValue(active ?? null);
    }
  }, [open, isControlled, value]);

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
      setInternalValue(val);
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleApply = () => {
    if (tempValue) {
      setInternalValue(tempValue);
      onChange?.(tempValue);
      onApply?.(tempValue);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    const orig = isControlled ? (value ?? null) : internalValue;
    setTempValue(orig);
    onCancel?.();
    setOpen(false);
  };

  const handleTriggerClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTempValue(null);
    setInternalValue(null);
    onClear?.();
    onChange?.(null);
    if (open) setOpen(false);
  };

  const activeMonthVal = open
    ? tempValue
    : isControlled
      ? (value ?? null)
      : internalValue;
  const displayVal = activeMonthVal
    ? `${MONTH_NAMES[activeMonthVal.month]} ${activeMonthVal.year}`
    : "";

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
      } ${isBorderless ? "gy-monthpicker-popover--borderless" : ""}`}
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
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={`gy-monthpicker-${uid}`}
        >
          {label}
        </Typography>
      )}

      <div
        ref={refs.setReference}
        style={{ width: "100%" }}
        className={`gy-monthpicker-trigger ${open ? "gy-monthpicker-trigger--open" : ""} ${disabled ? "gy-monthpicker-trigger--disabled" : ""}`}
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
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              {clearable && displayVal && !disabled && (
                <ClearButton
                  size={size === "lg" ? "md" : "sm"}
                  variant="subtle"
                  ariaLabel="Clear month"
                  onClick={handleTriggerClear}
                />
              )}
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
            </div>
          }
        />
      </div>

      {helperText && (
        <Typography
          variant="span"
          as="div"
          className={`gy-input-helper ${hasError ? "gy-input-helper--error" : ""}`}
        >
          {helperText}
        </Typography>
      )}

      {open &&
        !disabled &&
        (usePortal ? (
          <FloatingPortal>{popoverContent}</FloatingPortal>
        ) : (
          popoverContent
        ))}
    </div>
  );
}
