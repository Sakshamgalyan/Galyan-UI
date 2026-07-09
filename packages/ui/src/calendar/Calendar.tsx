'use client';

import React, { useState } from 'react';
import './calendar.css';

export interface CalendarProps {
  mode?: 'single' | 'range';
  value?: Date | [Date, Date];
  onChange?: (date: Date | [Date, Date]) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  style?: React.CSSProperties;
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDay = (year: number, month: number) => new Date(year, month, 1).getDay();

const isSameDay = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
};

const isBetween = (d: Date, start?: Date, end?: Date) => {
  if (!start || !end) return false;
  return d > start && d < end;
};

export function Calendar({ mode = 'single', value, onChange, minDate, maxDate, className = '', style }: CalendarProps) {
  const [view, setView] = useState<'days' | 'months' | 'years'>('days');
  const [current, setCurrent] = useState(() => {
    if (Array.isArray(value)) return value[0] ?? new Date();
    return value ?? new Date();
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

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
  const firstDay = getFirstDay(y, m);
  const daysInPrev = getDaysInMonth(y, m - 1);

  const handleSelectDay = (date: Date) => {
    if (mode === 'single') {
      onChange?.(date);
    } else {
      if (!selStart || (selStart && selEnd)) {
        onChange?.([date, date] as any); // Reset to start
      } else {
        const start = date < selStart ? date : selStart;
        const end = date < selStart ? selStart : date;
        onChange?.([start, end]);
      }
    }
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();

    // Prev month
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = new Date(y, m - 1, daysInPrev - i);
      days.push(<Day key={`prev-${i}`} date={d} outside />);
    }
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(y, m, i);
      days.push(<Day key={`curr-${i}`} date={d} isToday={isSameDay(d, today)} />);
    }
    // Next month
    const total = days.length;
    for (let i = 1; i <= 42 - total; i++) {
      const d = new Date(y, m + 1, i);
      days.push(<Day key={`next-${i}`} date={d} outside />);
    }

    return days;
  };

  const Day = ({ date, outside, isToday }: { date: Date; outside?: boolean; isToday?: boolean }) => {
    const disabled = (minDate && date < minDate) || (maxDate && date > maxDate);
    const selected = isSameDay(date, selStart) || isSameDay(date, selEnd);
    const inRange = mode === 'range' && isBetween(date, selStart, selEnd ?? hoverDate ?? undefined);
    const isStart = mode === 'range' && isSameDay(date, selStart);
    const isEnd = mode === 'range' && isSameDay(date, selEnd ?? hoverDate ?? undefined) && date > (selStart as Date);

    const cls = [
      'gy-calendar-day',
      outside ? 'gy-calendar-day--outside' : '',
      isToday ? 'gy-calendar-day--today' : '',
      selected ? 'gy-calendar-day--selected' : '',
      inRange ? 'gy-calendar-day--range-in' : '',
      isStart && (selEnd ?? hoverDate) ? 'gy-calendar-day--range-start' : '',
      isEnd ? 'gy-calendar-day--range-end' : '',
      disabled ? 'gy-calendar-day--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        type="button"
        className={cls}
        disabled={disabled}
        onClick={() => handleSelectDay(date)}
        onMouseEnter={() => mode === 'range' && selStart && !selEnd ? setHoverDate(date) : null}
      >
        {date.getDate()}
      </button>
    );
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = current.toLocaleString('default', { month: 'long' });

  return (
    <div className={`gy-calendar ${className}`} style={style}>
      {view === 'days' && (
        <>
          <div className="gy-calendar-header">
            <button className="gy-calendar-nav" onClick={prevMonth}>‹</button>
            <div className="gy-calendar-title" onClick={() => setView('months')}>
              {monthName} {y}
            </div>
            <button className="gy-calendar-nav" onClick={nextMonth}>›</button>
          </div>
          <div className="gy-calendar-grid">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="gy-calendar-weekday">{d}</div>
            ))}
            {renderDays()}
          </div>
        </>
      )}

      {view === 'months' && (
        <>
          <div className="gy-calendar-header">
            <button className="gy-calendar-nav" onClick={prevYear}>‹</button>
            <div className="gy-calendar-title" onClick={() => setView('years')}>{y}</div>
            <button className="gy-calendar-nav" onClick={nextYear}>›</button>
          </div>
          <div className="gy-calendar-picker-grid">
            {months.map((mon, i) => (
              <button
                key={mon}
                className={`gy-calendar-picker-item ${m === i ? 'gy-calendar-picker-item--selected' : ''}`}
                onClick={() => { setCurrent(new Date(y, i, 1)); setView('days'); }}
              >
                {mon}
              </button>
            ))}
          </div>
        </>
      )}

      {view === 'years' && (
        <>
          <div className="gy-calendar-header">
            <button className="gy-calendar-nav" onClick={prevDecade}>‹</button>
            <div className="gy-calendar-title">{y - (y % 10)} - {y - (y % 10) + 9}</div>
            <button className="gy-calendar-nav" onClick={nextDecade}>›</button>
          </div>
          <div className="gy-calendar-picker-grid">
            {Array.from({ length: 12 }, (_, i) => y - (y % 10) - 1 + i).map((year) => (
              <button
                key={year}
                className={`gy-calendar-picker-item ${y === year ? 'gy-calendar-picker-item--selected' : ''}`}
                onClick={() => { setCurrent(new Date(year, m, 1)); setView('months'); }}
              >
                {year}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
