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
import { Calendar, CalendarValue } from "../calendar/Calendar";
import { Input, InputVariant } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export type DatePickerSingleValue = Date | null;
export type DatePickerRangeValue =
  | [Date | null, Date | "present" | null]
  | null;
export type DatePickerValue = DatePickerSingleValue | DatePickerRangeValue;

export interface DatePickerPreset {
  label: string;
  getValue: () => DatePickerValue;
}

export interface DatePickerProps {
  mode?: "single" | "range";
  placeholder?: string;
  variant?:
    | "default"
    | "filled"
    | "focused"
    | "error"
    | "success"
    | "disabled"
    | "glassmorphic"
    | "glass";
  value?: DatePickerValue;
  onChange?: (date: any) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  minDate?: Date;
  maxDate?: Date;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (date: any) => void;
  onClear?: () => void;
  dateFormat?: string;
  firstDayOfWeek?: 0 | 1;
  placement?: "top" | "bottom";
  align?: "left" | "right";
  zIndex?: number;
  usePortal?: boolean;
  disableFutureDates?: boolean;
  valueFormat?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  showActions?: boolean;
  showPresent?: boolean;
  showClear?: boolean;
  presets?: DatePickerPreset[];
  className?: string;
}

const CalendarIcon = () => (
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
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export function DatePicker({
  mode = "single",
  placeholder,
  variant = "default",
  value,
  onChange,
  leftIcon,
  rightIcon = <CalendarIcon />,
  minDate,
  maxDate,
  onOpen,
  onClose,
  onCancel,
  onApply,
  onClear,
  dateFormat = "YYYY-MM-DD",
  firstDayOfWeek = 0,
  placement = "bottom",
  align = "left",
  zIndex = 1000,
  usePortal = true,
  disableFutureDates = false,
  required = false,
  disabled = false,
  label,
  helperText,
  hasError = false,
  showActions = true,
  showPresent = true,
  showClear = true,
  presets,
  className = "",
}: DatePickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<DatePickerValue>(value ?? null);

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

  useEffect(() => {
    setTempValue(value ?? null);
  }, [value]);

  useEffect(() => {
    if (open) onOpen?.();
    else onClose?.();
  }, [open, onOpen, onClose]);

  const formatDateStr = (d: Date | "present" | null | undefined) => {
    if (!d) return "";
    if (d === "present") return "Present";
    if (!(d instanceof Date)) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    if (dateFormat === "MM/DD/YYYY") return `${m}/${day}/${y}`;
    if (dateFormat === "DD/MM/YYYY") return `${day}/${m}/${y}`;
    return `${y}-${m}-${day}`;
  };

  const getInputValue = () => {
    if (!value) return "";
    if (mode === "range" && Array.isArray(value)) {
      const [start, end] = value;
      if (!start) return "";
      if (end === "present") return `${formatDateStr(start)} - Present`;
      if (!end) return formatDateStr(start);
      return `${formatDateStr(start)} - ${formatDateStr(end)}`;
    }
    if (value instanceof Date) {
      return formatDateStr(value);
    }
    return "";
  };

  const handleSelectDate = (val: CalendarValue) => {
    if (Array.isArray(val)) {
      setTempValue([val[0] ?? null, val[1] ?? null]);
      if (!showActions && !onApply && val[0] && val[1]) {
        onChange?.([val[0], val[1]]);
        setOpen(false);
      }
    } else {
      setTempValue(val ?? null);
      if (!showActions && !onApply && val) {
        onChange?.(val);
        setOpen(false);
      }
    }
  };

  const handleApplyClick = () => {
    onChange?.(tempValue);
    onApply?.(tempValue);
    setOpen(false);
  };

  const handleCancelClick = () => {
    setTempValue(value ?? null);
    onCancel?.();
    setOpen(false);
  };

  const handleClearClick = () => {
    setTempValue(null);
    onClear?.();
    if (!showActions && !onApply) {
      onChange?.(null);
      setOpen(false);
    }
  };

  const handlePresentClick = () => {
    const today = new Date();
    if (mode === "range") {
      if (Array.isArray(tempValue) && tempValue[0] instanceof Date) {
        const nextVal: DatePickerRangeValue = [tempValue[0], "present"];
        setTempValue(nextVal);
        if (!showActions && !onApply) {
          onChange?.(nextVal);
          setOpen(false);
        }
      } else {
        const nextVal: DatePickerRangeValue = [today, "present"];
        setTempValue(nextVal);
        if (!showActions && !onApply) {
          onChange?.(nextVal);
          setOpen(false);
        }
      }
    } else {
      setTempValue(today);
      if (!showActions && !onApply) {
        onChange?.(today);
        setOpen(false);
      }
    }
  };

  const isPresentActive =
    (mode === "range" &&
      Array.isArray(tempValue) &&
      tempValue[1] === "present") ||
    (mode === "single" &&
      tempValue instanceof Date &&
      tempValue.toDateString() === new Date().toDateString());

  // Resolve Calendar internal value for visual selection
  const calendarValue: CalendarValue | undefined = (() => {
    if (!tempValue) return undefined;
    if (mode === "range" && Array.isArray(tempValue)) {
      const [start, end] = tempValue;
      if (!start) return undefined;
      const endResolved = end === "present" ? new Date() : (end ?? undefined);
      return [start, endResolved];
    }
    if (tempValue instanceof Date) return tempValue;
    return undefined;
  })();

  const resolvedMaxDate = disableFutureDates ? new Date() : maxDate;
  const defaultPlaceholder =
    placeholder ?? (mode === "range" ? "Select date range" : "Select date");

  const isGlass = variant === "glassmorphic" || variant === "glass";

  const popoverContent = (
    <div
      ref={refs.setFloating}
      className={`gy-datepicker-popover ${isGlass ? `gy-datepicker-popover--${variant}` : ""}`.trim()}
      style={{
        ...floatingStyles,
        zIndex,
      }}
      {...getFloatingProps()}
    >
      {presets && presets.length > 0 && (
        <div className="gy-datepicker-presets">
          {presets.map((p, idx) => (
            <button
              type="button"
              key={idx}
              className="gy-datepicker-preset-btn"
              onClick={() => {
                const val = p.getValue();
                setTempValue(val);
                if (!showActions && !onApply) {
                  onChange?.(val);
                  setOpen(false);
                }
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <Calendar
        variant={isGlass ? "glassmorphic" : undefined}
        mode={mode}
        value={calendarValue}
        onChange={(val) => handleSelectDate(val)}
        minDate={minDate}
        maxDate={resolvedMaxDate}
        firstDayOfWeek={firstDayOfWeek}
      />

      {showActions && (
        <div className="gy-datepicker-actions">
          {showPresent && (
            <Button
              size="sm"
              variant={isPresentActive ? "primary" : "ghost"}
              className="gy-datepicker-present-btn"
              onClick={handlePresentClick}
            >
              Present
            </Button>
          )}
          {showClear && (
            <Button
              size="sm"
              variant="ghost"
              className="gy-datepicker-clear-btn"
              onClick={handleClearClick}
            >
              Clear
            </Button>
          )}
          <div style={{ flex: 1 }} />
          <Button size="sm" variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button size="sm" variant="primary" onClick={handleApplyClick}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`gy-datepicker ${isGlass ? `gy-datepicker--${variant}` : ""} ${className}`.trim()}
    >
      <div
        ref={refs.setReference}
        {...getReferenceProps({
          onClick: () => !disabled && setOpen((o) => !o),
        })}
      >
        <Input
          id={`gy-datepicker-${uid}`}
          label={label}
          placeholder={defaultPlaceholder}
          value={getInputValue()}
          readOnly
          disabled={disabled}
          required={required}
          hasError={hasError}
          helperText={helperText}
          variant={isGlass ? "default" : (variant as InputVariant)}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        />
      </div>

      {open && !disabled && <FloatingPortal>{popoverContent}</FloatingPortal>}
    </div>
  );
}
