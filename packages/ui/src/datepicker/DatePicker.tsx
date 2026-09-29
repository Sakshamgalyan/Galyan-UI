"use client";

import React, {
  useEffect,
  useState,
  useId,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
import { Calendar, CalendarValue } from "../calendar/Calendar";
import { Input, InputVariant } from "../input/Input";
import { Button } from "../button/Button";
import { ClearButton } from "../clearbutton/ClearButton";
import "./datepicker.css";
import { Typography } from "../typography";

export type DatePickerSingleValue = Date | number | string | null;
export type DatePickerRangeValue =
  | [Date | number | string | null, Date | number | string | "present" | null]
  | null;
export type DatePickerValue = DatePickerSingleValue | DatePickerRangeValue;

export interface DatePickerChangeContext {
  date: Date | [Date | null, Date | "present" | null] | null;
  epoch: number | [number | null, number | null] | null;
  formatted: string;
}

export type DatePickerMode = "single" | "range" | "datetime";
export type DatePickerValueFormat = "date" | "epoch" | "iso" | "string";

type DatePickerSingleOutput<F extends DatePickerValueFormat> = F extends "epoch"
  ? number | null
  : F extends "iso" | "string"
    ? string | null
    : Date | null;

type DatePickerRangeOutput<F extends DatePickerValueFormat> = F extends "epoch"
  ? [number | null, number | "present" | null] | null
  : F extends "iso"
    ? [string | null, string | "present" | null] | null
    : F extends "string"
      ? [string, string] | null
      : [Date | null, Date | "present" | null] | null;

/** Value passed to onChange/onApply, derived from `mode` and `valueFormat` */
export type DatePickerOutputValue<
  M extends DatePickerMode = DatePickerMode,
  F extends DatePickerValueFormat = DatePickerValueFormat,
> = M extends "range" ? DatePickerRangeOutput<F> : DatePickerSingleOutput<F>;

export interface DatePickerPreset {
  label: string;
  getValue: () => DatePickerValue;
}

export interface DatePickerProps<
  M extends DatePickerMode = DatePickerMode,
  F extends DatePickerValueFormat = DatePickerValueFormat,
> {
  /** Mode: "single" date, "range" of dates, or "datetime" (date + exact time) */
  mode?: M;
  /** Whether to enable exact time selection. (Equivalent to mode="datetime" when mode="single") */
  showTime?: boolean;
  /** Whether to enable exact time selection (alias for showTime) */
  enableTime?: boolean;
  /** Time format: "12h" (default) or "24h" */
  timeFormat?: "12h" | "24h";
  /** Whether to show seconds selector in time picker */
  showSeconds?: boolean;
  /** Minute step intervals (e.g. 1, 5, 10, 15) */
  minuteStep?: number;
  /** Second step intervals (e.g. 1, 5, 10) */
  secondStep?: number;
  /** Hour step intervals */
  hourStep?: number;
  placeholder?: string;
  variant?:
    | "default"
    | "filled"
    | "focused"
    | "error"
    | "success"
    | "disabled"
    | "glassmorphic"
    | "glass"
    | "range";
  value?: DatePickerValue;
  /** Default value for uncontrolled component */
  defaultValue?: DatePickerValue;
  /**
   * Output value format for onChange and onApply:
   * - "date": Date object (default)
   * - "epoch": Unix epoch timestamp in milliseconds (number)
   * - "iso": ISO-8601 string
   * - "string": Formatted string according to dateFormat
   */
  valueFormat?: F;
  onChange?: (
    val: DatePickerOutputValue<M, F>,
    context?: DatePickerChangeContext,
  ) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  minDate?: Date | number | string;
  maxDate?: Date | number | string;
  onOpen?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
  onApply?: (
    val: DatePickerOutputValue<M, F>,
    context?: DatePickerChangeContext,
  ) => void;
  onClear?: () => void;
  /** Date format string, supports tokens like YYYY, MM, DD, HH, hh, mm, ss, A, or "epoch" */
  dateFormat?: string;
  firstDayOfWeek?: 0 | 1;
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
  disableFutureDates?: boolean;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  showActions?: boolean;
  showPresent?: boolean;
  showClear?: boolean;
  /** Whether clear icon is shown in the trigger input when a value is selected */
  clearable?: boolean;
  /** Whether the time picker scroll dropdown is open by default (when mode="datetime") */
  defaultTimeDropdownOpen?: boolean;
  /** Whether to show epoch badge in the popover (defaults to false) */
  showEpoch?: boolean;
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

const DateTimeIcon = () => (
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
    <path d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="16" cy="16" r="4" fill="var(--gy-surface, #ffffff)" />
    <path d="M16 14v2l1 1" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/** Parses Date instance, epoch timestamp (number), or date string safely */
export function parseDateValue(val: unknown): Date | null {
  if (!val && val !== 0) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  if (typeof val === "number") {
    // If epoch timestamp in seconds (< 1e11), convert to ms
    const ms = val < 100000000000 ? val * 1000 : val;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof val === "string") {
    const trimmed = val.trim();
    const num = Number(trimmed);
    if (
      !isNaN(num) &&
      trimmed.length >= 10 &&
      !trimmed.includes("-") &&
      !trimmed.includes("/")
    ) {
      const ms = num < 100000000000 ? num * 1000 : num;
      const d = new Date(ms);
      return isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/** Formats a Date using token replacements (YYYY, MM, DD, HH, hh, mm, ss, A, a, etc.) */
export function formatDateWithTokens(d: Date, format: string): string {
  if (!d || isNaN(d.getTime())) return "";

  if (format === "epoch" || format === "timestamp") {
    return String(d.getTime());
  }
  if (format === "iso" || format === "ISO") {
    return d.toISOString();
  }

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hours24 = d.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const isPM = hours24 >= 12;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthShort = [
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

  const pad = (n: number) => String(n).padStart(2, "0");

  const tokens: Record<string, string> = {
    YYYY: String(year),
    YY: String(year).slice(-2),
    MMMM: monthNames[month - 1] ?? "",
    MMM: monthShort[month - 1] ?? "",
    MM: pad(month),
    M: String(month),
    DD: pad(date),
    D: String(date),
    HH: pad(hours24),
    H: String(hours24),
    hh: pad(hours12),
    h: String(hours12),
    mm: pad(minutes),
    m: String(minutes),
    ss: pad(seconds),
    s: String(seconds),
    A: isPM ? "PM" : "AM",
    a: isPM ? "pm" : "am",
  };

  const regex = /YYYY|YY|MMMM|MMM|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a/g;
  return format.replace(regex, (match) => tokens[match] ?? match);
}

export function DatePicker<
  M extends DatePickerMode = "single",
  F extends DatePickerValueFormat = "date",
>({
  mode = "single" as M,
  showTime = false,
  enableTime = false,
  timeFormat,
  showSeconds,
  minuteStep = 1,
  secondStep = 1,
  hourStep = 1,
  placeholder,
  variant = "default",
  value,
  defaultValue,
  valueFormat = "date" as F,
  onChange,
  leftIcon,
  rightIcon,
  minDate,
  maxDate,
  onOpen,
  onClose,
  onCancel,
  onApply,
  onClear,
  dateFormat,
  firstDayOfWeek = 0,
  placement = "bottom",
  align = "left",
  smartPosition = true,
  zIndex = 10050,
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
  clearable = true,
  defaultTimeDropdownOpen = false,
  showEpoch = false,
  presets,
  className = "",
}: DatePickerProps<M, F>) {
  const uid = useId();
  const isControlled = value !== undefined;
  const [open, setOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(
    defaultTimeDropdownOpen,
  );
  const [timePlacement, setTimePlacement] = useState<"top" | "bottom">("top");
  const timePanelRef = useRef<HTMLDivElement>(null);

  const resolveTimePlacement = useCallback(() => {
    if (!timePanelRef.current) return;
    const panelRect = timePanelRef.current.getBoundingClientRect();
    const dropdownHeight = 220; // Height of time dropdown menu with header and footer
    const spaceBelow = window.innerHeight - panelRect.bottom;

    // When smartPosition is true (default):
    // If space below the time panel in the viewport is less than dropdownHeight,
    // smartly flip upwards to overlay the calendar.
    if (smartPosition && spaceBelow < dropdownHeight) {
      setTimePlacement("top");
    } else {
      setTimePlacement("bottom");
    }
  }, [smartPosition]);

  useEffect(() => {
    if (!open) {
      setTimeDropdownOpen(defaultTimeDropdownOpen);
    }
  }, [open, defaultTimeDropdownOpen]);

  useEffect(() => {
    if (!timeDropdownOpen) return;
    resolveTimePlacement();
    window.addEventListener("resize", resolveTimePlacement);
    window.addEventListener("scroll", resolveTimePlacement, true);
    return () => {
      window.removeEventListener("resize", resolveTimePlacement);
      window.removeEventListener("scroll", resolveTimePlacement, true);
    };
  }, [timeDropdownOpen, resolveTimePlacement]);

  // Click outside time panel to close time dropdown
  useEffect(() => {
    if (!timeDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        timePanelRef.current &&
        !timePanelRef.current.contains(e.target as Node)
      ) {
        setTimeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [timeDropdownOpen]);

  const isDateTime =
    mode === "datetime" || showTime === true || enableTime === true;
  const calendarMode: "single" | "range" =
    mode === "range" || (variant as string) === "range" ? "range" : "single";

  // Auto-detect time format & seconds if not explicitly provided
  const effectiveTimeFormat: "12h" | "24h" = useMemo(() => {
    if (timeFormat) return timeFormat;
    if (
      dateFormat &&
      (dateFormat.includes("HH") || dateFormat.includes("H:"))
    ) {
      return "24h";
    }
    return "12h";
  }, [timeFormat, dateFormat]);

  const effectiveShowSeconds: boolean = useMemo(() => {
    if (showSeconds !== undefined) return showSeconds;
    if (
      dateFormat &&
      (dateFormat.includes(":ss") ||
        dateFormat.includes(":s") ||
        dateFormat.includes("ss"))
    ) {
      return true;
    }
    return false;
  }, [showSeconds, dateFormat]);

  const effectiveDateFormat = useMemo(() => {
    if (dateFormat) return dateFormat;
    if (isDateTime) {
      if (effectiveTimeFormat === "24h") {
        return effectiveShowSeconds
          ? "YYYY-MM-DD HH:mm:ss"
          : "YYYY-MM-DD HH:mm";
      }
      return effectiveShowSeconds
        ? "YYYY-MM-DD hh:mm:ss A"
        : "YYYY-MM-DD hh:mm A";
    }
    return "YYYY-MM-DD";
  }, [dateFormat, isDateTime, effectiveTimeFormat, effectiveShowSeconds]);

  // Parse external value into normalized Date objects
  const normalizeExternalValue = (val: DatePickerValue): DatePickerValue => {
    if (!val) return null;
    if (Array.isArray(val)) {
      const [start, end] = val;
      const parsedStart = parseDateValue(start);
      const parsedEnd = end === "present" ? "present" : parseDateValue(end);
      return [parsedStart, parsedEnd];
    }
    return parseDateValue(val);
  };

  const [internalValue, setInternalValue] = useState<DatePickerValue>(() =>
    normalizeExternalValue(
      value !== undefined ? value : (defaultValue ?? null),
    ),
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(normalizeExternalValue(value ?? null));
    }
  }, [isControlled, value]);

  const [tempValue, setTempValue] = useState<DatePickerValue>(() =>
    normalizeExternalValue(
      value !== undefined ? value : (defaultValue ?? null),
    ),
  );

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
          const minW = isDateTime ? 320 : calendarMode === "range" ? 312 : 280;
          const w = `${Math.max(rects.reference.width, minW)}px`;
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

  // Latest uncontrolled value, read when the popover opens without re-syncing on every change
  const internalValueRef = useRef(internalValue);
  useEffect(() => {
    internalValueRef.current = internalValue;
  }, [internalValue]);

  useEffect(() => {
    if (open) {
      const active = isControlled ? value : internalValueRef.current;
      setTempValue(normalizeExternalValue(active ?? null));
    }
  }, [open, isControlled, value]);

  useEffect(() => {
    if (open) onOpen?.();
    else onClose?.();
  }, [open, onOpen, onClose]);

  const formatDateStr = (d: Date | "present" | null | undefined) => {
    if (!d) return "";
    if (d === "present") return "Present";
    if (!(d instanceof Date)) return "";
    return formatDateWithTokens(d, effectiveDateFormat);
  };

  const getInputValueFor = (val: DatePickerValue) => {
    if (!val) return "";
    if (calendarMode === "range" && Array.isArray(val)) {
      const [start, end] = val;
      if (!start) return "";
      const startParsed = parseDateValue(start);
      if (!startParsed) return "";
      if (end === "present") return `${formatDateStr(startParsed)} - Present`;
      const endParsed = parseDateValue(end);
      if (!endParsed) return formatDateStr(startParsed);
      return `${formatDateStr(startParsed)} - ${formatDateStr(endParsed)}`;
    }
    const single = parseDateValue(val);
    return single ? formatDateStr(single) : "";
  };

  const getInputValue = () => {
    if (open) {
      return getInputValueFor(tempValue);
    }
    const committed = isControlled ? (value ?? null) : internalValue;
    return getInputValueFor(committed);
  };

  // Convert raw value to output format (Date, epoch, ISO, or string)
  const getOutputValue = (val: DatePickerValue): DatePickerOutputValue<M, F> =>
    toOutputValue(val) as DatePickerOutputValue<M, F>;

  const toOutputValue = (val: DatePickerValue): DatePickerValue => {
    if (!val) return null;
    if (Array.isArray(val)) {
      const [start, end] = val;
      const startD = parseDateValue(start);
      const endD = end === "present" ? "present" : parseDateValue(end);

      if (valueFormat === "epoch") {
        return [
          startD ? startD.getTime() : null,
          endD === "present"
            ? "present"
            : endD instanceof Date
              ? endD.getTime()
              : null,
        ];
      }
      if (valueFormat === "iso") {
        return [
          startD ? startD.toISOString() : null,
          endD === "present"
            ? "present"
            : endD instanceof Date
              ? endD.toISOString()
              : null,
        ];
      }
      if (valueFormat === "string") {
        return [
          startD ? formatDateStr(startD) : "",
          endD === "present"
            ? "Present"
            : endD instanceof Date
              ? formatDateStr(endD)
              : "",
        ];
      }
      return [startD, endD];
    }

    const singleD = parseDateValue(val);
    if (!singleD) return null;
    if (valueFormat === "epoch") return singleD.getTime();
    if (valueFormat === "iso") return singleD.toISOString();
    if (valueFormat === "string") return formatDateStr(singleD);
    return singleD;
  };

  const getChangeContext = (val: DatePickerValue): DatePickerChangeContext => {
    if (!val) {
      return { date: null, epoch: null, formatted: "" };
    }
    if (Array.isArray(val)) {
      const [start, end] = val;
      const startD = parseDateValue(start);
      const endD = end === "present" ? "present" : parseDateValue(end);
      return {
        date: [startD, endD],
        epoch: [
          startD ? startD.getTime() : null,
          endD === "present"
            ? null
            : endD instanceof Date
              ? endD.getTime()
              : null,
        ],
        formatted: getInputValueFor(val),
      };
    }
    const singleD = parseDateValue(val);
    return {
      date: singleD,
      epoch: singleD ? singleD.getTime() : null,
      formatted: singleD ? formatDateStr(singleD) : "",
    };
  };

  // Extract time parts from current tempValue for time controls
  const activeDateForTime: Date = useMemo(() => {
    if (Array.isArray(tempValue)) {
      return parseDateValue(tempValue[0]) ?? new Date();
    }
    return parseDateValue(tempValue) ?? new Date();
  }, [tempValue]);

  const currentHours = activeDateForTime.getHours();
  const currentMinutes = activeDateForTime.getMinutes();
  const currentSeconds = activeDateForTime.getSeconds();

  const currentPeriod: "AM" | "PM" = currentHours >= 12 ? "PM" : "AM";
  const displayHours =
    effectiveTimeFormat === "12h" ? currentHours % 12 || 12 : currentHours;

  const currentEpoch = useMemo(() => {
    if (!tempValue) return null;
    const d = Array.isArray(tempValue)
      ? parseDateValue(tempValue[0])
      : parseDateValue(tempValue);
    return d ? d.getTime() : null;
  }, [tempValue]);

  const updateTime = (h: number, m: number, s: number) => {
    const base = new Date(activeDateForTime);
    base.setHours(h, m, s, 0);

    if (Array.isArray(tempValue)) {
      const next: DatePickerRangeValue = [base, tempValue[1]];
      setTempValue(next);
      if (!showActions && !onApply) {
        setInternalValue(next);
        onChange?.(getOutputValue(next), getChangeContext(next));
      }
    } else {
      setTempValue(base);
      if (!showActions && !onApply) {
        setInternalValue(base);
        onChange?.(getOutputValue(base), getChangeContext(base));
      }
    }
  };

  const togglePeriod = (p: "AM" | "PM") => {
    if (p === currentPeriod) return;
    let nextH = currentHours;
    if (p === "PM" && currentHours < 12) nextH += 12;
    if (p === "AM" && currentHours >= 12) nextH -= 12;
    updateTime(nextH, currentMinutes, currentSeconds);
  };

  const handleSetNow = () => {
    const now = new Date();
    setTempValue(now);
    if (!showActions && !onApply) {
      setInternalValue(now);
      onChange?.(getOutputValue(now), getChangeContext(now));
    }
  };

  const hoursColRef = useRef<HTMLDivElement>(null);
  const minutesColRef = useRef<HTMLDivElement>(null);
  const secondsColRef = useRef<HTMLDivElement>(null);

  const hoursList = useMemo(() => {
    return effectiveTimeFormat === "12h"
      ? Array.from(
          { length: Math.floor(12 / hourStep) },
          (_, i) => (i + 1) * hourStep,
        )
      : Array.from(
          { length: Math.floor(24 / hourStep) },
          (_, i) => i * hourStep,
        );
  }, [effectiveTimeFormat, hourStep]);

  const minutesList = useMemo(() => {
    return Array.from(
      { length: Math.floor(60 / minuteStep) },
      (_, i) => i * minuteStep,
    );
  }, [minuteStep]);

  const secondsList = useMemo(() => {
    return effectiveShowSeconds
      ? Array.from(
          { length: Math.floor(60 / secondStep) },
          (_, i) => i * secondStep,
        )
      : [];
  }, [effectiveShowSeconds, secondStep]);

  const scrollToSelected = (container: HTMLDivElement | null) => {
    if (!container) return;
    const selected = container.querySelector<HTMLElement>(
      '[data-selected="true"]',
    );
    if (selected) {
      const top =
        selected.offsetTop -
        container.offsetTop -
        container.clientHeight / 2 +
        selected.clientHeight / 2;
      container.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (timeDropdownOpen && isDateTime) {
      const timer = setTimeout(() => {
        scrollToSelected(hoursColRef.current);
        scrollToSelected(minutesColRef.current);
        scrollToSelected(secondsColRef.current);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [
    timeDropdownOpen,
    isDateTime,
    displayHours,
    currentMinutes,
    currentSeconds,
  ]);

  const handleSelectDate = (val: CalendarValue) => {
    if (Array.isArray(val)) {
      const parsedStart = parseDateValue(val[0]);
      const parsedEnd = parseDateValue(val[1]);
      const nextRange: DatePickerRangeValue = [parsedStart, parsedEnd];
      setTempValue(nextRange);
      if (!showActions && !onApply && parsedStart && parsedEnd) {
        setInternalValue(nextRange);
        onChange?.(getOutputValue(nextRange), getChangeContext(nextRange));
        setOpen(false);
      }
    } else {
      const parsed = parseDateValue(val);
      if (parsed) {
        // In datetime mode, preserve exact hours, minutes, and seconds
        if (isDateTime) {
          parsed.setHours(currentHours, currentMinutes, currentSeconds, 0);
        }
        setTempValue(parsed);
        // Only auto-close if time selection is not enabled and actions are hidden
        if (!showActions && !onApply) {
          setInternalValue(parsed);
          onChange?.(getOutputValue(parsed), getChangeContext(parsed));
          if (!isDateTime) {
            setOpen(false);
          }
        }
      } else {
        setTempValue(null);
        if (!showActions && !onApply) {
          setInternalValue(null);
          onChange?.(getOutputValue(null), { date: null, epoch: null, formatted: "" });
        }
      }
    }
  };

  const handleApplyClick = () => {
    const out = getOutputValue(tempValue);
    const ctx = getChangeContext(tempValue);
    setInternalValue(tempValue);
    onChange?.(out, ctx);
    onApply?.(out, ctx);
    setOpen(false);
  };

  const handleCancelClick = () => {
    const orig = isControlled ? (value ?? null) : internalValue;
    setTempValue(normalizeExternalValue(orig));
    onCancel?.();
    setOpen(false);
  };

  const handleClearClick = () => {
    setTempValue(null);
    onClear?.();
    if (!showActions && !onApply) {
      setInternalValue(null);
      onChange?.(getOutputValue(null), { date: null, epoch: null, formatted: "" });
      setOpen(false);
    }
  };

  const handleTriggerClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTempValue(null);
    setInternalValue(null);
    onClear?.();
    onChange?.(getOutputValue(null), { date: null, epoch: null, formatted: "" });
    if (open) setOpen(false);
  };

  const handlePresentClick = () => {
    const today = new Date();
    if (calendarMode === "range") {
      if (Array.isArray(tempValue) && tempValue[0] instanceof Date) {
        const nextVal: DatePickerRangeValue = [tempValue[0], "present"];
        setTempValue(nextVal);
        if (!showActions && !onApply) {
          setInternalValue(nextVal);
          onChange?.(getOutputValue(nextVal), getChangeContext(nextVal));
          setOpen(false);
        }
      } else {
        const nextVal: DatePickerRangeValue = [today, "present"];
        setTempValue(nextVal);
        if (!showActions && !onApply) {
          setInternalValue(nextVal);
          onChange?.(getOutputValue(nextVal), getChangeContext(nextVal));
          setOpen(false);
        }
      }
    } else {
      setTempValue(today);
      if (!showActions && !onApply) {
        setInternalValue(today);
        onChange?.(getOutputValue(today), getChangeContext(today));
        setOpen(false);
      }
    }
  };

  const isPresentActive =
    (calendarMode === "range" &&
      Array.isArray(tempValue) &&
      tempValue[1] === "present") ||
    (calendarMode === "single" &&
      tempValue instanceof Date &&
      tempValue.toDateString() === new Date().toDateString());

  // Resolve Calendar internal value for visual selection
  const calendarValue: CalendarValue | undefined = (() => {
    if (!tempValue) return undefined;
    if (calendarMode === "range" && Array.isArray(tempValue)) {
      const [start, end] = tempValue;
      const startD = parseDateValue(start);
      if (!startD) return undefined;
      const endResolved =
        end === "present" ? new Date() : (parseDateValue(end) ?? undefined);
      return [startD, endResolved];
    }
    const singleD = parseDateValue(tempValue);
    return singleD ?? undefined;
  })();

  const parsedMinDate = parseDateValue(minDate) ?? undefined;
  const parsedMaxDate = parseDateValue(maxDate) ?? undefined;
  const resolvedMaxDate = disableFutureDates ? new Date() : parsedMaxDate;

  const defaultPlaceholder =
    placeholder ??
    (isDateTime
      ? effectiveDateFormat === "epoch"
        ? "Select timestamp (epoch)"
        : "Select date & time"
      : calendarMode === "range"
        ? "Select date range"
        : "Select date");

  const isGlass = variant === "glassmorphic" || variant === "glass";

  const resolvedRightIcon =
    rightIcon ?? (isDateTime ? <DateTimeIcon /> : <CalendarIcon />);

  const pad = (n: number) => String(n).padStart(2, "0");

  const selectedTimePreview = useMemo(() => {
    if (effectiveTimeFormat === "12h") {
      const hStr = pad(displayHours);
      const mStr = pad(currentMinutes);
      const sStr = effectiveShowSeconds ? `:${pad(currentSeconds)}` : "";
      return `${hStr}:${mStr}${sStr} ${currentPeriod}`;
    }
    const hStr = pad(currentHours);
    const mStr = pad(currentMinutes);
    const sStr = effectiveShowSeconds ? `:${pad(currentSeconds)}` : "";
    return `${hStr}:${mStr}${sStr}`;
  }, [
    displayHours,
    currentHours,
    currentMinutes,
    currentSeconds,
    currentPeriod,
    effectiveTimeFormat,
    effectiveShowSeconds,
  ]);

  const popoverContent = (
    <div
      ref={refs.setFloating}
      className={`gy-datepicker-popover ${isPositioned ? "gy-datepicker-popover--positioned" : ""} ${calendarMode === "range" ? "gy-datepicker-popover--range" : ""} ${isGlass ? `gy-datepicker-popover--${variant}` : ""}`.trim()}
      style={{
        ...floatingStyles,
        zIndex,
        visibility: isPositioned ? "visible" : "hidden",
        opacity: isPositioned ? undefined : 0,
        pointerEvents: isPositioned ? undefined : "none",
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
                const val = normalizeExternalValue(p.getValue());
                setTempValue(val);
                if (!showActions && !onApply) {
                  setInternalValue(val);
                  onChange?.(getOutputValue(val), getChangeContext(val));
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
        mode={calendarMode}
        value={calendarValue}
        onChange={(val) => handleSelectDate(val)}
        minDate={parsedMinDate}
        maxDate={resolvedMaxDate}
        firstDayOfWeek={firstDayOfWeek}
      />

      {/* Integrated Time Section with Scrollable Dropdown */}
      {isDateTime && (
        <div className="gy-datepicker-time-panel" ref={timePanelRef}>
          <div className="gy-datepicker-time-row">
            <div className="gy-datepicker-time-label">
              <ClockIcon />
              <Typography variant="span">Time</Typography>
            </div>

            <button
              type="button"
              className={`gy-datepicker-time-dropdown-btn ${timeDropdownOpen ? "gy-datepicker-time-dropdown-btn--open" : ""}`}
              onClick={() => {
                if (!timeDropdownOpen) {
                  resolveTimePlacement();
                }
                setTimeDropdownOpen((prev) => !prev);
              }}
              aria-expanded={timeDropdownOpen}
              title="Click to scroll & select time"
            >
              <Typography
                variant="span"
                className="gy-datepicker-time-dropdown-display"
              >
                {selectedTimePreview}
              </Typography>
              <svg
                className={`gy-datepicker-time-dropdown-chevron ${timeDropdownOpen ? "gy-datepicker-time-dropdown-chevron--open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <button
              type="button"
              className="gy-datepicker-time-now-btn"
              onClick={handleSetNow}
              title="Set to current date & time"
            >
              Now
            </button>
          </div>

          {/* Scrollable Time Dropdown Columns */}
          {timeDropdownOpen && (
            <div
              className={`gy-datepicker-time-dropdown-menu gy-datepicker-time-dropdown-menu--${timePlacement}`}
            >
              <div className="gy-datepicker-time-menu-header">
                <div className="gy-datepicker-time-menu-title-wrap">
                  <ClockIcon />
                  <Typography
                    variant="span"
                    className="gy-datepicker-time-menu-title"
                  >
                    Select Time
                  </Typography>
                </div>
                <button
                  type="button"
                  className="gy-datepicker-time-menu-close"
                  onClick={() => setTimeDropdownOpen(false)}
                  aria-label="Close time selector"
                  title="Close"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="gy-datepicker-time-cols-header">
                <Typography
                  variant="span"
                  className="gy-datepicker-time-col-head"
                >
                  Hour
                </Typography>
                <Typography
                  variant="span"
                  className="gy-datepicker-time-col-head"
                >
                  Min
                </Typography>
                {effectiveShowSeconds && (
                  <Typography
                    variant="span"
                    className="gy-datepicker-time-col-head"
                  >
                    Sec
                  </Typography>
                )}
                {effectiveTimeFormat === "12h" && (
                  <Typography
                    variant="span"
                    className="gy-datepicker-time-col-head"
                  >
                    Period
                  </Typography>
                )}
              </div>

              <div className="gy-datepicker-time-cols">
                {/* Hours column */}
                <div
                  ref={hoursColRef}
                  className="gy-datepicker-time-col"
                  aria-label="Select hour"
                >
                  {hoursList.map((h) => {
                    const isSelected = displayHours === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        data-selected={isSelected ? "true" : undefined}
                        className={`gy-datepicker-time-item ${isSelected ? "gy-datepicker-time-item--selected" : ""}`}
                        onClick={() => {
                          let nextH: number;
                          if (effectiveTimeFormat === "12h") {
                            nextH =
                              currentPeriod === "PM"
                                ? h === 12
                                  ? 12
                                  : h + 12
                                : h === 12
                                  ? 0
                                  : h;
                          } else {
                            nextH = h;
                          }
                          updateTime(nextH, currentMinutes, currentSeconds);
                        }}
                      >
                        {pad(h)}
                      </button>
                    );
                  })}
                </div>

                {/* Minutes column */}
                <div
                  ref={minutesColRef}
                  className="gy-datepicker-time-col"
                  aria-label="Select minute"
                >
                  {minutesList.map((m) => {
                    const isSelected = currentMinutes === m;
                    return (
                      <button
                        key={m}
                        type="button"
                        data-selected={isSelected ? "true" : undefined}
                        className={`gy-datepicker-time-item ${isSelected ? "gy-datepicker-time-item--selected" : ""}`}
                        onClick={() =>
                          updateTime(currentHours, m, currentSeconds)
                        }
                      >
                        {pad(m)}
                      </button>
                    );
                  })}
                </div>

                {/* Seconds column */}
                {effectiveShowSeconds && (
                  <div
                    ref={secondsColRef}
                    className="gy-datepicker-time-col"
                    aria-label="Select second"
                  >
                    {secondsList.map((s) => {
                      const isSelected = currentSeconds === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          data-selected={isSelected ? "true" : undefined}
                          className={`gy-datepicker-time-item ${isSelected ? "gy-datepicker-time-item--selected" : ""}`}
                          onClick={() =>
                            updateTime(currentHours, currentMinutes, s)
                          }
                        >
                          {pad(s)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Period column (AM/PM) */}
                {effectiveTimeFormat === "12h" && (
                  <div
                    className="gy-datepicker-time-col gy-datepicker-time-col--period"
                    aria-label="Select period"
                  >
                    <button
                      type="button"
                      data-selected={
                        currentPeriod === "AM" ? "true" : undefined
                      }
                      className={`gy-datepicker-time-item ${currentPeriod === "AM" ? "gy-datepicker-time-item--selected" : ""}`}
                      onClick={() => togglePeriod("AM")}
                    >
                      AM
                    </button>
                    <button
                      type="button"
                      data-selected={
                        currentPeriod === "PM" ? "true" : undefined
                      }
                      className={`gy-datepicker-time-item ${currentPeriod === "PM" ? "gy-datepicker-time-item--selected" : ""}`}
                      onClick={() => togglePeriod("PM")}
                    >
                      PM
                    </button>
                  </div>
                )}
              </div>

              <div className="gy-datepicker-time-menu-footer">
                <Typography
                  variant="span"
                  className="gy-datepicker-time-preview-chip"
                >
                  {selectedTimePreview}
                </Typography>
                <button
                  type="button"
                  className="gy-datepicker-time-done-btn"
                  onClick={() => setTimeDropdownOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Optional Epoch Pill - hidden by default unless showEpoch is true */}
          {showEpoch && currentEpoch !== null && (
            <div className="gy-datepicker-epoch-row">
              <span
                className="gy-datepicker-epoch-chip"
                title="Unix Epoch timestamp (milliseconds)"
              >
                <span className="gy-datepicker-epoch-dot" />
                <Typography variant="span" className="gy-datepicker-epoch-tag">
                  Epoch:
                </Typography>
                <Typography variant="span" className="gy-datepicker-epoch-val">
                  {currentEpoch}
                </Typography>
              </span>
            </div>
          )}
        </div>
      )}

      {showActions && (
        <div className="gy-datepicker-actions">
          {showPresent && !isDateTime && (
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
      className={`gy-datepicker ${calendarMode === "range" ? "gy-datepicker--range" : ""} ${isGlass ? `gy-datepicker--${variant}` : ""} ${className}`.trim()}
    >
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={`gy-datepicker-${uid}`}
        >
          {label}
        </Typography>
      )}

      <div
        ref={refs.setReference}
        style={{ width: "100%" }}
        className={`gy-datepicker-trigger ${open ? "gy-datepicker-trigger--open" : ""} ${disabled ? "gy-datepicker-trigger--disabled" : ""}`}
        {...getReferenceProps({
          onClick: () => !disabled && setOpen((o) => !o),
        })}
      >
        <Input
          id={`gy-datepicker-${uid}`}
          fullWidth
          isFocused={open}
          placeholder={defaultPlaceholder}
          value={getInputValue()}
          readOnly
          disabled={disabled}
          required={required}
          hasError={hasError}
          variant={
            variant === "range" || isGlass
              ? "default"
              : (variant as InputVariant)
          }
          leftIcon={leftIcon}
          rightIcon={
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
              }}
            >
              {clearable && getInputValue() && !disabled && (
                <ClearButton
                  size="sm"
                  variant="subtle"
                  ariaLabel="Clear date"
                  onClick={handleTriggerClear}
                />
              )}
              {resolvedRightIcon}
            </div>
          }
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
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
