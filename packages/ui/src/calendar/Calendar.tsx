"use client";

import React, { useState } from "react";
import "./calendar.css";

export interface CalendarProps {
  mode?: "single" | "range";
  value?: Date | [Date, Date];
  onChange?: (date: Date | [Date, Date]) => void;
  minDate?: Date;
  maxDate?: Date;
  firstDayOfWeek?: 0 | 1;
  className?: string;
  style?: React.CSSProperties;
}

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();
const getFirstDay = (year: number, month: number) =>
  new Date(year, month, 1).getDay();

const isSameDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export function Calendar({
  mode = "single",
  value,
  onChange,
  minDate,
  maxDate,
  firstDayOfWeek = 0,
  className = "",
  style,
}: CalendarProps) {
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const [current, setCurrent] = useState(() => {
    if (Array.isArray(value)) return value[0] ?? new Date();
    return value ?? new Date();
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [isPicking, setIsPicking] = useState(false);

  const [selStart, selEnd] = Array.isArray(value) ? value : [value, undefined];

  const y = current.getFullYear();
  const m = current.getMonth();

  const prevMonth = () => setCurrent(new Date(y, m - 1, 1));
  const nextMonth = () => setCurrent(new Date(y, m + 1, 1));
  const prevYear = () => setCurrent(new Date(y - 1, m, 1));
  const nextYear = () => setCurrent(new Date(y + 1, m, 1));
  const prevDecade = () => setCurrent(new Date(y - 10, m, 1));
  const nextDecade = () => setCurrent(new Date(y + 10, m, 1));

  const daysInMonth = getDaysInMonth(y, m);
  const rawFirstDay = getFirstDay(y, m);
  const firstDay =
    firstDayOfWeek === 1
      ? rawFirstDay === 0
        ? 6
        : rawFirstDay - 1
      : rawFirstDay;
  const daysInPrev = getDaysInMonth(y, m - 1);

  const handleSelectDay = (date: Date) => {
    if (mode === "single") {
      onChange?.(date);
    } else {
      if (!isPicking || !selStart) {
        setIsPicking(true);
        setHoverDate(null);
        onChange?.([date, undefined as any]);
      } else {
        const start = date < selStart ? date : selStart;
        const end = date < selStart ? selStart : date;
        setIsPicking(false);
        setHoverDate(null);
        onChange?.([start, end]);
      }
    }
  };

  const normalizeDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const Day = ({
    date,
    outside,
    isToday,
    isRowStart,
    isRowEnd,
  }: {
    date: Date;
    outside?: boolean;
    isToday?: boolean;
    isRowStart?: boolean;
    isRowEnd?: boolean;
  }) => {
    const disabled = (minDate && date < minDate) || (maxDate && date > maxDate);
    const activeEnd = isPicking ? (hoverDate ?? undefined) : selEnd;

    const dateTime = normalizeDay(date);
    const sTime = selStart ? normalizeDay(selStart) : null;
    const eTime = activeEnd ? normalizeDay(activeEnd) : null;

    const minTime = sTime !== null && eTime !== null ? Math.min(sTime, eTime) : sTime;
    const maxTime = sTime !== null && eTime !== null ? Math.max(sTime, eTime) : sTime;
    const isSingle = minTime !== null && minTime === maxTime;

    const isStart =
      mode === "range" &&
      minTime !== null &&
      dateTime === minTime &&
      !isSingle;

    const isEnd =
      mode === "range" &&
      maxTime !== null &&
      dateTime === maxTime &&
      !isSingle;

    const inRange =
      mode === "range" &&
      minTime !== null &&
      maxTime !== null &&
      dateTime > minTime &&
      dateTime < maxTime;

    const selected =
      (mode === "single" && value instanceof Date && isSameDay(date, value)) ||
      (mode === "range" && (isStart || isEnd || (isSingle && dateTime === minTime)));

    const cls = [
      "gy-calendar-day",
      outside ? "gy-calendar-day--outside" : "",
      isToday ? "gy-calendar-day--today" : "",
      selected ? "gy-calendar-day--selected" : "",
      inRange ? "gy-calendar-day--range-in" : "",
      isStart ? "gy-calendar-day--range-start" : "",
      isEnd ? "gy-calendar-day--range-end" : "",
      isRowStart ? "gy-calendar-day--row-start" : "",
      isRowEnd ? "gy-calendar-day--row-end" : "",
      disabled ? "gy-calendar-day--disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type="button"
        className={cls}
        disabled={disabled}
        onClick={() => handleSelectDay(date)}
        onMouseEnter={() =>
          mode === "range" && isPicking ? setHoverDate(date) : null
        }
      >
        <span className="gy-calendar-day__inner">{date.getDate()}</span>
      </button>
    );
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();
    let index = 0;

    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(y, m - 1, daysInPrev - i);
      days.push(
        <Day
          key={`prev-${i}`}
          date={d}
          outside
          isRowStart={index % 7 === 0}
          isRowEnd={index % 7 === 6}
        />,
      );
      index++;
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(y, m, i);
      days.push(
        <Day
          key={`curr-${i}`}
          date={d}
          isToday={isSameDay(d, today)}
          isRowStart={index % 7 === 0}
          isRowEnd={index % 7 === 6}
        />,
      );
      index++;
    }
    // Next month days
    const total = days.length;
    for (let i = 1; i <= 42 - total; i++) {
      const d = new Date(y, m + 1, i);
      days.push(
        <Day
          key={`next-${i}`}
          date={d}
          outside
          isRowStart={index % 7 === 0}
          isRowEnd={index % 7 === 6}
        />,
      );
      index++;
    }

    return days;
  };

  const months = [
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
  const monthName = current.toLocaleString("default", { month: "long" });
  const weekHeadings =
    firstDayOfWeek === 1
      ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={`gy-calendar ${className}`} style={style}>
      <div className="gy-calendar-header">
        <button
          type="button"
          className="gy-calendar-nav"
          onClick={() => {
            if (view === "days") prevMonth();
            if (view === "months") prevYear();
            if (view === "years") prevDecade();
          }}
          aria-label="Previous"
        >
          ‹
        </button>
        <div
          className="gy-calendar-title"
          onClick={() => {
            if (view === "days") setView("months");
            else if (view === "months") setView("years");
            else setView("days");
          }}
        >
          {view === "days" && `${monthName} ${y}`}
          {view === "months" && `${y}`}
          {view === "years" && `${Math.floor(y / 10) * 10} - ${Math.floor(y / 10) * 10 + 9}`}
        </div>
        <button
          type="button"
          className="gy-calendar-nav"
          onClick={() => {
            if (view === "days") nextMonth();
            if (view === "months") nextYear();
            if (view === "years") nextDecade();
          }}
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {view === "days" && (
        <div className="gy-calendar-grid">
          {weekHeadings.map((h, i) => (
            <div key={i} className="gy-calendar-weekday">
              {h}
            </div>
          ))}
          {renderDays()}
        </div>
      )}

      {view === "months" && (
        <div className="gy-calendar-picker-grid">
          {months.map((name, idx) => (
            <button
              type="button"
              key={name}
              className={`gy-calendar-picker-item ${idx === m ? "gy-calendar-picker-item--selected" : ""}`}
              onClick={() => {
                setCurrent(new Date(y, idx, 1));
                setView("days");
              }}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {view === "years" && (
        <div className="gy-calendar-picker-grid">
          {Array.from({ length: 12 }, (_, i) => {
            const startDecade = Math.floor(y / 10) * 10;
            const yearNum = startDecade - 1 + i;
            return (
              <button
                type="button"
                key={yearNum}
                className={`gy-calendar-picker-item ${yearNum === y ? "gy-calendar-picker-item--selected" : ""}`}
                onClick={() => {
                  setCurrent(new Date(yearNum, m, 1));
                  setView("months");
                }}
              >
                {yearNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
