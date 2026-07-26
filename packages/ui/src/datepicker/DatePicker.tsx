"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "../calendar/Calendar";
import { Input, InputVariant } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export interface DatePickerProps {
  placeholder?: string;
  variant?: "default" | "filled" | "focused" | "error" | "success" | "disabled";
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  minDate?: Date;
  maxDate?: Date;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (date: Date | null) => void;
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
  placeholder = "Select date",
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
  className = "",
}: DatePickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempDate(value ?? null);
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

  const formatDateStr = (d: Date | null) => {
    if (!d) return "";
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    if (dateFormat === "MM/DD/YYYY") return `${m}/${day}/${y}`;
    if (dateFormat === "DD/MM/YYYY") return `${day}/${m}/${y}`;
    return `${y}-${m}-${day}`;
  };

  const handleSelectDate = (date: Date) => {
    setTempDate(date);
    if (!onApply) {
      onChange?.(date);
      setOpen(false);
    }
  };

  const handleApplyClick = () => {
    onChange?.(tempDate);
    onApply?.(tempDate);
    setOpen(false);
  };

  const handleCancelClick = () => {
    setTempDate(value ?? null);
    onCancel?.();
    setOpen(false);
  };

  const resolvedMaxDate = disableFutureDates ? new Date() : maxDate;

  const popoverContent = (
    <div
      className={`gy-datepicker-popover gy-datepicker-popover--${placement} gy-datepicker-popover--${align}`}
      style={{ zIndex }}
    >
      <Calendar
        value={tempDate ?? undefined}
        onChange={(d) => {
          if (d instanceof Date) handleSelectDate(d);
          else if (Array.isArray(d) && d[0]) handleSelectDate(d[0]);
        }}
        minDate={minDate}
        maxDate={resolvedMaxDate}
        firstDayOfWeek={firstDayOfWeek}
      />
      {(onApply || onCancel) && (
        <div className="gy-datepicker-actions">
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
          placeholder={placeholder}
          value={formatDateStr(value ?? null)}
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
