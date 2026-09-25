"use client";

import React, { useEffect, useState, useId } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
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
  zIndex?: number;
  usePortal?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  className?: string;
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
  zIndex = 1000,
  usePortal = true,
  required = false,
  disabled = false,
  label,
  helperText,
  hasError = false,
  className = "",
}: MonthPickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<MonthCalendarValue | null>(
    value ?? null,
  );

  useEffect(() => {
    setTempValue(value ?? null);
  }, [value]);

  useEffect(() => {
    if (open) onOpen?.();
    else onClose?.();
  }, [open, onOpen, onClose]);

  const desiredPlacement: FloatingPlacement =
    `${placement}-${align === "right" ? "end" : "start"}` as FloatingPlacement;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: desiredPlacement,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    middleware: [
      offset(6),
      flip({
        fallbackAxisSideDirection: "start",
        padding: 8,
      }),
      shift({ padding: 8 }),
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

  const popoverContent = (
    <div
      ref={refs.setFloating}
      className="gy-monthpicker-popover"
      style={{
        ...floatingStyles,
        zIndex,
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
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => !disabled && setOpen((o) => !o),
        })}
      >
        <Input
          id={`gy-monthpicker-${uid}`}
          label={label}
          placeholder={placeholder}
          value={displayVal}
          readOnly
          disabled={disabled}
          required={required}
          hasError={hasError}
          helperText={helperText}
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

      {open && !disabled && <FloatingPortal>{popoverContent}</FloatingPortal>}
    </div>
  );
}
