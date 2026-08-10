"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "../calendar/Calendar";
import { Input, InputVariant } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export interface DatePickerProps {
  mode?: "single" | "range";
  placeholder?: string;
  variant?: "default" | "filled" | "focused" | "error" | "success" | "disabled";
  value?: Date | [Date | null, Date | null] | null;
  onChange?: (date: any) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  minDate?: Date;
  maxDate?: Date;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (date: any) => void;
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
  dateFormat = "YYYY-MM-DD",
  firstDayOfWeek = 0,
  placement = "bottom",
  align = "left",
  zIndex = 1000,
  usePortal = false,
  disableFutureDates = false,
  valueFormat,
  required = false,
  disabled = false,
  label,
  helperText,
  hasError = false,
  showActions = true,
  className = "",
}: DatePickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<Date | [Date, Date] | null>(
    (value as any) ?? null,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempValue((value as any) ?? null);
  }, [value]);

  useEffect(() => {
    if (open) onOpen?.();
    else onClose?.();
  }, [open, onOpen, onClose]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const formatDateStr = (d: Date | null | undefined) => {
    if (!d || !(d instanceof Date)) return "";
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
      if (!end) return formatDateStr(start);
      return `${formatDateStr(start)} - ${formatDateStr(end)}`;
    }
    if (value instanceof Date) {
      return formatDateStr(value);
    }
    return "";
  };

  const handleSelectDate = (val: Date | [Date, Date]) => {
    setTempValue(val);
    if (!showActions && !onApply) {
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleApplyClick = () => {
    onChange?.(tempValue);
    onApply?.(tempValue);
    setOpen(false);
  };

  const handleCancelClick = () => {
    setTempValue((value as any) ?? null);
    onCancel?.();
    setOpen(false);
  };

  const handlePresentClick = () => {
    const today = new Date();
    const presentVal = mode === "range" ? [today, today] : today;
    setTempValue(presentVal as any);
    if (!showActions && !onApply) {
      onChange?.(presentVal);
      setOpen(false);
    }
  };

  const resolvedMaxDate = disableFutureDates ? new Date() : maxDate;
  const defaultPlaceholder =
    placeholder ?? (mode === "range" ? "Select date range" : "Select date");

  const popoverContent = (
    <div
      className={`gy-datepicker-popover gy-datepicker-popover--${placement} gy-datepicker-popover--${align}`}
      style={{ zIndex }}
    >
      <Calendar
        mode={mode}
        value={(tempValue as any) ?? undefined}
        onChange={(val) => handleSelectDate(val)}
        minDate={minDate}
        maxDate={resolvedMaxDate}
        firstDayOfWeek={firstDayOfWeek}
      />
      {showActions && (
        <div className="gy-datepicker-actions">
          <Button
            size="sm"
            variant="ghost"
            className="gy-datepicker-present-btn"
            onClick={handlePresentClick}
          >
            Present
          </Button>
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
    <div ref={rootRef} className={`gy-datepicker ${className}`}>
      <div onClick={() => !disabled && setOpen((o) => !o)}>
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
          variant={variant as InputVariant}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        />
      </div>

      {open &&
        !disabled &&
        (usePortal
          ? createPortal(popoverContent, document.body)
          : popoverContent)}
    </div>
  );
}
