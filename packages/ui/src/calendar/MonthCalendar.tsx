"use client";

import React, { useState } from "react";
import "./calendar.css";

export interface MonthCalendarValue {
  year: number;
  month: number; // 0-11
}

export interface MonthCalendarProps {
  /** Visual style variant */
  variant?: "default" | "bordered" | "glassmorphic" | "glass" | "borderless";
  /** Sizing variation for the month calendar */
  size?: "sm" | "md" | "lg";
  /** Whether the calendar container has no border and transparent background */
  borderless?: boolean;
  /** Currently selected value: { year, month } or Date */
  value?: MonthCalendarValue | Date | null;
  /** Change callback when a month is selected */
  onChange?: (val: MonthCalendarValue) => void;
  /** Minimum selectable year */
  minYear?: number;
  /** Maximum selectable year */
  maxYear?: number;
  /** Minimum selectable month */
  minMonth?: MonthCalendarValue;
  /** Maximum selectable month */
  maxMonth?: MonthCalendarValue;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Initial view mode */
  defaultView?: "months" | "years";
  /** Whether to show "This Month" quick action button */
  showTodayButton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
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

const ChevronLeft = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function MonthCalendar({
  variant = "default",
  borderless = false,
  size,
  value,
  onChange,
  minYear = 1970,
  maxYear = 2050,
  minMonth,
  maxMonth,
  minDate,
  maxDate,
  defaultView = "months",
  showTodayButton = false,
  className = "",
  style,
}: MonthCalendarProps) {
  const parseValue = (
    v?: MonthCalendarValue | Date | null,
  ): MonthCalendarValue | null => {
    if (!v) return null;
    if (v instanceof Date) {
      return { year: v.getFullYear(), month: v.getMonth() };
    }
    return v;
  };

  const selectedVal = parseValue(value);
  const now = new Date();
  const currentYearNow = now.getFullYear();
  const currentMonthNow = now.getMonth();

  const [currentYear, setCurrentYear] = useState<number>(
    selectedVal?.year ?? currentYearNow,
  );
  const [view, setView] = useState<"months" | "years">(defaultView);

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
    onChange?.({ year: currentYear, month: mIdx });
  };

  const handleGoThisMonth = () => {
    const thisYear = currentYearNow;
    const thisMonth = currentMonthNow;
    setCurrentYear(thisYear);
    setView("months");
    if (!isMonthDisabled(thisYear, thisMonth)) {
      onChange?.({ year: thisYear, month: thisMonth });
    }
  };

  const decadeStart = currentYear - (currentYear % 10);
  const decadeYears = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);

  const isBorderless = borderless || variant === "borderless";
  const sizeClass = size ? `gy-month-calendar--${size}` : "";
  const variantClass = variant && variant !== "default" && variant !== "borderless" ? `gy-calendar--${variant} gy-month-calendar--${variant}` : "";
  const borderlessClass = isBorderless ? "gy-calendar--borderless gy-month-calendar--borderless" : "";

  return (
    <div
      className={["gy-calendar", "gy-month-calendar", sizeClass, variantClass, borderlessClass, className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className="gy-calendar-header">
        <button
          type="button"
          className="gy-calendar-nav"
          disabled={
            view === "months"
              ? currentYear <= effectiveMinYear
              : decadeStart <= effectiveMinYear
          }
          onClick={() => {
            if (view === "months") {
              setCurrentYear((y) => Math.max(effectiveMinYear, y - 1));
            } else {
              setCurrentYear((y) => Math.max(effectiveMinYear, y - 10));
            }
          }}
          aria-label={view === "months" ? "Previous Year" : "Previous Decade"}
          title={view === "months" ? "Previous Year" : "Previous Decade"}
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          className="gy-calendar-title"
          onClick={() => setView(view === "months" ? "years" : "months")}
        >
          {view === "months" ? currentYear : `${decadeStart} - ${decadeStart + 9}`}
        </button>

        <button
          type="button"
          className="gy-calendar-nav"
          disabled={
            view === "months"
              ? currentYear >= effectiveMaxYear
              : decadeStart + 9 >= effectiveMaxYear
          }
          onClick={() => {
            if (view === "months") {
              setCurrentYear((y) => Math.min(effectiveMaxYear, y + 1));
            } else {
              setCurrentYear((y) => Math.min(effectiveMaxYear, y + 10));
            }
          }}
          aria-label={view === "months" ? "Next Year" : "Next Decade"}
          title={view === "months" ? "Next Year" : "Next Decade"}
        >
          <ChevronRight />
        </button>
      </div>

      {view === "months" ? (
        <div className="gy-calendar-picker-grid">
          {MONTH_NAMES.map((name, idx) => {
            const isSelected =
              selectedVal !== null &&
              selectedVal.year === currentYear &&
              selectedVal.month === idx;
            const isThisMonth =
              currentYear === currentYearNow && idx === currentMonthNow;
            const disabledMonth = isMonthDisabled(currentYear, idx);

            return (
              <button
                key={name}
                type="button"
                disabled={disabledMonth}
                className={[
                  "gy-calendar-picker-item",
                  isSelected ? "gy-calendar-picker-item--selected" : "",
                  isThisMonth && !isSelected
                    ? "gy-calendar-picker-item--current"
                    : "",
                  disabledMonth ? "gy-calendar-picker-item--disabled" : "",
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
      ) : (
        <div className="gy-calendar-picker-grid">
          {decadeYears.map((yr) => {
            const isSelected =
              (selectedVal?.year ?? currentYear) === yr && selectedVal !== null;
            const isCurrentDecadeYear = yr === currentYearNow;
            const isOutOfRange = isYearDisabled(yr);

            return (
              <button
                key={yr}
                type="button"
                disabled={isOutOfRange}
                className={[
                  "gy-calendar-picker-item",
                  isSelected ? "gy-calendar-picker-item--selected" : "",
                  isCurrentDecadeYear && !isSelected
                    ? "gy-calendar-picker-item--current"
                    : "",
                  isOutOfRange ? "gy-calendar-picker-item--disabled" : "",
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
      )}

      {showTodayButton && (
        <div className="gy-calendar-footer">
          <button
            type="button"
            className="gy-calendar-today-btn"
            onClick={handleGoThisMonth}
          >
            This Month
          </button>
        </div>
      )}
    </div>
  );
}
