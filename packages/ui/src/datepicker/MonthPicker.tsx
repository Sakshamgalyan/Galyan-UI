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
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import "./datepicker.css";

export interface MonthPickerValue {
  year: number;
  month: number;
}

export interface MonthPickerProps {
  placeholder?: string;
  value?: MonthPickerValue | null;
  onChange?: (val: MonthPickerValue | null) => void;
  minYear?: number;
  maxYear?: number;
  minMonth?: MonthPickerValue;
  maxMonth?: MonthPickerValue;
  minDate?: Date;
  maxDate?: Date;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (val: MonthPickerValue | null) => void;
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
  const [currentYear, setCurrentYear] = useState<number>(
    value?.year ?? new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    value?.month ?? null,
  );
  const [view, setView] = useState<"months" | "years">("months");

  const desiredPlacement: FloatingPlacement = `${placement}-${align === "right" ? "end" : "start"}` as FloatingPlacement;

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

  // Compute effective min and max bounds
  const effectiveMinYear = (() => {
    if (minMonth) return minMonth.year;
    if (minDate) return minDate.getFullYear();
    return minYear;
  })();

  const effectiveMaxYear = (() => {
    if (maxMonth) return maxMonth.year;
    if (maxDate) return maxDate.getFullYear();
    return maxYear;
  })();

  const isMonthDisabled = (year: number, month: number) => {
    if (minYear !== undefined && year < minYear) return true;
    if (maxYear !== undefined && year > maxYear) return true;

    if (minMonth) {
      if (year < minMonth.year) return true;
      if (year === minMonth.year && month < minMonth.month) return true;
    }

    if (maxMonth) {
      if (year > maxMonth.year) return true;
      if (year === maxMonth.year && month > maxMonth.month) return true;
    }

    if (minDate) {
      const minY = minDate.getFullYear();
      const minM = minDate.getMonth();
      if (year < minY) return true;
      if (year === minY && month < minM) return true;
    }

    if (maxDate) {
      const maxY = maxDate.getFullYear();
      const maxM = maxDate.getMonth();
      if (year > maxY) return true;
      if (year === maxY && month > maxM) return true;
    }

    return false;
  };

  const isYearDisabled = (year: number) => {
    if (year < effectiveMinYear || year > effectiveMaxYear) return true;
    return false;
  };

  const handleMonthSelect = (mIdx: number) => {
    if (isMonthDisabled(currentYear, mIdx)) return;
    const val = { year: currentYear, month: mIdx };
    setSelectedMonth(mIdx);
    if (!onApply) {
      onChange?.(val);
      setOpen(false);
    }
  };

  const handleApply = () => {
    if (selectedMonth !== null && !isMonthDisabled(currentYear, selectedMonth)) {
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
      {view === "months" ? (
        <>
          <div className="gy-monthpicker-header">
            <button
              type="button"
              className="gy-monthpicker-nav"
              disabled={currentYear <= effectiveMinYear}
              onClick={() =>
                setCurrentYear((y) => Math.max(effectiveMinYear, y - 1))
              }
              aria-label="Previous Year"
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
              disabled={currentYear >= effectiveMaxYear}
              onClick={() =>
                setCurrentYear((y) => Math.min(effectiveMaxYear, y + 1))
              }
              aria-label="Next Year"
            >
              ›
            </button>
          </div>

          <div className="gy-monthpicker-grid">
            {MONTH_NAMES.map((name, idx) => {
              const isSelected =
                value?.year === currentYear && selectedMonth === idx;
              const isDisabledMonth = isMonthDisabled(currentYear, idx);

              return (
                <button
                  key={name}
                  type="button"
                  disabled={isDisabledMonth}
                  className={[
                    "gy-monthpicker-cell",
                    isSelected ? "gy-monthpicker-cell--selected" : "",
                    isDisabledMonth ? "gy-monthpicker-cell--disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
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
              disabled={decadeStart <= effectiveMinYear}
              onClick={() =>
                setCurrentYear((y) => Math.max(effectiveMinYear, y - 10))
              }
              aria-label="Previous Decade"
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
              disabled={decadeStart + 9 >= effectiveMaxYear}
              onClick={() =>
                setCurrentYear((y) => Math.min(effectiveMaxYear, y + 10))
              }
              aria-label="Next Decade"
            >
              ›
            </button>
          </div>

          <div className="gy-monthpicker-grid">
            {decadeYears.map((yr) => {
              const isSelected = currentYear === yr;
              const isOutOfRange = isYearDisabled(yr);
              return (
                <button
                  key={yr}
                  type="button"
                  disabled={isOutOfRange}
                  className={[
                    "gy-monthpicker-cell",
                    isSelected ? "gy-monthpicker-cell--selected" : "",
                    isOutOfRange ? "gy-monthpicker-cell--disabled" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => {
                    if (!isOutOfRange) {
                      setCurrentYear(yr);
                      setView("months");
                    }
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

      {open && !disabled && (
        <FloatingPortal>
          {popoverContent}
        </FloatingPortal>
      )}
    </div>
  );
}
