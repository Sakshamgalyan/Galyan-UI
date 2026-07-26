"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export interface MonthPickerProps {
  placeholder?: string;
  value?: { year: number; month: number } | null;
  onChange?: (val: { year: number; month: number } | null) => void;
  minYear?: number;
  maxYear?: number;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (val: { year: number; month: number } | null) => void;
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
  onOpen,
  onClose,
  onCancel,
  onApply,
  placement = "bottom",
  align = "left",
  zIndex = 1000,
  usePortal = false,
  required = false,
  disabled = false,
  label,
  helperText,
  hasError = false,
  className = "",
}: MonthPickerProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>(
    value?.year ?? new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    value?.month ?? null,
  );
  const rootRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<"months" | "years">("months");

  useEffect(() => {
    if (value) {
      setCurrentYear(value.year);
      setSelectedMonth(value.month);
    }
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMonthSelect = (mIdx: number) => {
    const val = { year: currentYear, month: mIdx };
    setSelectedMonth(mIdx);
    if (!onApply) {
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleApply = () => {
    if (selectedMonth !== null) {
      const val = { year: currentYear, month: selectedMonth };
      onChange?.(val);
      onApply?.(val);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
  };

  const displayVal = value ? `${MONTH_NAMES[value.month]} ${value.year}` : "";

  const decadeStart = currentYear - (currentYear % 10);
  const decadeYears = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

  return (
    <div ref={rootRef} className={`gy-monthpicker ${className}`}>
      <div onClick={() => !disabled && setOpen((o) => !o)}>
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

      {open && !disabled && (
        <div
          className={`gy-monthpicker-popover gy-datepicker-popover--${placement} gy-datepicker-popover--${align}`}
          style={{ zIndex }}
        >
          {view === "months" ? (
            <>
              <div className="gy-monthpicker-header">
                <button
                  type="button"
                  className="gy-monthpicker-nav"
                  onClick={() =>
                    setCurrentYear((y) => Math.max(minYear, y - 1))
                  }
                >
                  ‹
                </button>
                <span
                  className="gy-monthpicker-year"
                  onClick={() => setView("years")}
                >
                  {currentYear}
                </span>
                <button
                  type="button"
                  className="gy-monthpicker-nav"
                  onClick={() =>
                    setCurrentYear((y) => Math.min(maxYear, y + 1))
                  }
                >
                  ›
                </button>
              </div>

              <div className="gy-monthpicker-grid">
                {MONTH_NAMES.map((name, idx) => {
                  const isSelected =
                    value?.year === currentYear && selectedMonth === idx;
                  return (
                    <button
                      key={name}
                      type="button"
                      className={`gy-monthpicker-cell ${isSelected ? "gy-monthpicker-cell--selected" : ""}`}
                      onClick={() => handleMonthSelect(idx)}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="gy-monthpicker-header">
                <button
                  type="button"
                  className="gy-monthpicker-nav"
                  onClick={() =>
                    setCurrentYear((y) => Math.max(minYear, y - 10))
                  }
                >
                  ‹
                </button>
                <span
                  className="gy-monthpicker-year"
                  onClick={() => setView("months")}
                >
                  {decadeStart} - {decadeStart + 9}
                </span>
                <button
                  type="button"
                  className="gy-monthpicker-nav"
                  onClick={() =>
                    setCurrentYear((y) => Math.min(maxYear, y + 10))
                  }
                >
                  ›
                </button>
              </div>

              <div className="gy-monthpicker-grid">
                {decadeYears.map((yr) => {
                  const isSelected = currentYear === yr;
                  const isOutOfRange = yr < minYear || yr > maxYear;
                  return (
                    <button
                      key={yr}
                      type="button"
                      disabled={isOutOfRange}
                      className={`gy-monthpicker-cell ${isSelected ? "gy-monthpicker-cell--selected" : ""}`}
                      onClick={() => {
                        setCurrentYear(yr);
                        setView("months");
                      }}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
            </>
          )}

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
      )}
    </div>
  );
}
