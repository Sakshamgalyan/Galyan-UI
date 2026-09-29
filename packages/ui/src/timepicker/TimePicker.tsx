"use client";

import React, { useEffect, useMemo, useRef, useState, useId } from "react";
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
import { Input, InputVariant } from "../input/Input";
import { Button } from "../button/Button";
import { ClearButton } from "../clearbutton/ClearButton";
import "./timepicker.css";
import { Typography } from "../typography";

export type TimeFormat = "12h" | "24h";
export type TimePickerSize = "sm" | "md" | "lg";
export type TimePickerVariant =
  | "default"
  | "filled"
  | "focused"
  | "error"
  | "success"
  | "disabled"
  | "glassmorphic"
  | "glass";

export interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: "AM" | "PM";
}

export interface TimePickerPreset {
  label: string;
  value: string | TimeValue | Date;
}

export interface TimePickerProps {
  /** Selected time value (string "09:30 AM", Date object, or TimeValue) */
  value?: string | Date | TimeValue | null;
  /** Default value for uncontrolled component */
  defaultValue?: string | Date | TimeValue | null;
  /** Callback fired on time selection change */
  onChange?: (formatted: string, value: TimeValue) => void;
  /** Time format: 12-hour (with AM/PM) or 24-hour mode */
  format?: TimeFormat;
  /** Whether to show seconds column */
  showSeconds?: boolean;
  /** Minute step intervals (e.g. 1, 5, 10, 15, 30) */
  minuteStep?: number;
  /** Second step intervals */
  secondStep?: number;
  /** Hour step intervals */
  hourStep?: number;
  /** Placeholder text */
  placeholder?: string;
  /** Text label above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error state */
  hasError?: boolean;
  /** Error text message */
  error?: string;
  /** Whether input is required */
  required?: boolean;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether clear icon is shown */
  clearable?: boolean;
  /** Size variant */
  size?: TimePickerSize;
  /** Visual variant */
  variant?: TimePickerVariant;
  /** Quick time presets (e.g. "Now", "09:00 AM", "12:00 PM", "06:00 PM") */
  presets?: (string | TimePickerPreset)[];
  /** Whether to show footer action buttons (Now, Clear, Apply) */
  showActions?: boolean;
  /** Popover placement */
  placement?: "top" | "bottom";
  /** Popover alignment */
  align?: "left" | "right";
  /**
   * Whether to enable smart positioning that automatically flips between top and bottom.
   * Restricts placement strictly to top and bottom to avoid unwanted horizontal flips.
   * @default true
   */
  smartPosition?: boolean;
  /** Floating popover z-index (defaults to 10050 to render over modals) */
  zIndex?: number;
  /** Use portal for popover */
  usePortal?: boolean;
  /** Custom width for the popover panel (defaults to trigger width, min 260px) */
  popoverWidth?: string | number;
  /** Alias for popoverWidth */
  customWidth?: string | number;
  /** Custom class for root container */
  className?: string;
  /** Custom width for input container */
  width?: string | number;
}

const ClockIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

function parseInputTime(
  raw: string | Date | TimeValue | null | undefined,
  format: TimeFormat,
  showSeconds: boolean,
): TimeValue {
  const now = new Date();

  // Handle null / undefined or "Now"
  if (!raw || (typeof raw === "string" && raw.trim().toLowerCase() === "now")) {
    const rawHours = now.getHours();
    const is12 = format === "12h";
    const period: "AM" | "PM" = rawHours >= 12 ? "PM" : "AM";
    const hours = is12 ? rawHours % 12 || 12 : rawHours;
    return {
      hours,
      minutes: now.getMinutes(),
      seconds: showSeconds ? now.getSeconds() : 0,
      period: is12 ? period : undefined,
    };
  }

  if (raw instanceof Date) {
    const h = raw.getHours();
    const is12 = format === "12h";
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    return {
      hours: is12 ? h % 12 || 12 : h,
      minutes: raw.getMinutes(),
      seconds: raw.getSeconds(),
      period: is12 ? period : undefined,
    };
  }

  if (typeof raw === "object") {
    return {
      hours: raw.hours ?? 12,
      minutes: raw.minutes ?? 0,
      seconds: raw.seconds ?? 0,
      period: raw.period ?? (format === "12h" ? "AM" : undefined),
    };
  }

  // String parsing:
  // 1. With colon: "09:00 AM", "12:00 PM", "9:30", "14:45"
  const str = String(raw).trim();
  const colonMatch = str.match(
    /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)?$/i,
  );
  if (colonMatch && colonMatch[1] && colonMatch[2]) {
    let hours = parseInt(colonMatch[1], 10);
    const minutes = parseInt(colonMatch[2], 10);
    const seconds = colonMatch[3] ? parseInt(colonMatch[3], 10) : 0;
    const periodStr = colonMatch[4]?.toUpperCase() as "AM" | "PM" | undefined;

    if (format === "12h") {
      let period: "AM" | "PM" = periodStr || (hours >= 12 ? "PM" : "AM");
      if (hours > 12) {
        hours = hours % 12 || 12;
        period = "PM";
      } else if (hours === 0) {
        hours = 12;
      }
      return { hours, minutes, seconds, period };
    } else {
      if (periodStr === "PM" && hours < 12) hours += 12;
      if (periodStr === "AM" && hours === 12) hours = 0;
      return { hours: Math.min(23, Math.max(0, hours)), minutes, seconds };
    }
  }

  // 2. Simple hour-only string: "9 AM", "9 am", "12pm", "12 PM", "6pm", "9"
  const simpleMatch = str.match(/^(\d{1,2})\s*(am|pm)?$/i);
  if (simpleMatch && simpleMatch[1]) {
    let hours = parseInt(simpleMatch[1], 10);
    const periodStr = simpleMatch[2]?.toUpperCase() as "AM" | "PM" | undefined;

    if (format === "12h") {
      let period: "AM" | "PM" = periodStr || (hours >= 12 ? "PM" : "AM");
      if (hours > 12) {
        hours = hours % 12 || 12;
        period = "PM";
      } else if (hours === 0) {
        hours = 12;
      }
      return { hours, minutes: 0, seconds: 0, period };
    } else {
      if (periodStr === "PM" && hours < 12) hours += 12;
      if (periodStr === "AM" && hours === 12) hours = 0;
      return {
        hours: Math.min(23, Math.max(0, hours)),
        minutes: 0,
        seconds: 0,
      };
    }
  }

  return {
    hours: format === "12h" ? 12 : 0,
    minutes: 0,
    seconds: 0,
    period: format === "12h" ? "AM" : undefined,
  };
}

function isPresetMatching(
  preset: string | TimePickerPreset,
  current: TimeValue | null | undefined,
  format: TimeFormat,
  showSeconds: boolean,
): boolean {
  if (!current) return false;
  const labelStr = typeof preset === "string" ? preset : preset.label;
  if (labelStr.trim().toLowerCase() === "now") return false;
  const rawVal = typeof preset === "string" ? preset : preset.value;
  const presetTime = parseInputTime(rawVal, format, showSeconds);
  if (format === "12h") {
    return (
      presetTime.hours === current.hours &&
      presetTime.minutes === current.minutes &&
      presetTime.period === current.period &&
      (!showSeconds || presetTime.seconds === current.seconds)
    );
  }
  return (
    presetTime.hours === current.hours &&
    presetTime.minutes === current.minutes &&
    (!showSeconds || presetTime.seconds === current.seconds)
  );
}

function formatTimeString(
  val: TimeValue | null | undefined,
  format: TimeFormat,
  showSeconds: boolean,
): string {
  if (!val) return "";
  const hh = format === "12h" ? pad(val.hours) : pad(val.hours);
  const mm = pad(val.minutes);
  const ss = showSeconds ? `:${pad(val.seconds ?? 0)}` : "";
  const period = format === "12h" ? ` ${val.period ?? "AM"}` : "";
  return `${hh}:${mm}${ss}${period}`;
}

export function TimePicker({
  value: controlledValue,
  defaultValue,
  onChange,
  format = "12h",
  showSeconds = false,
  minuteStep = 1,
  secondStep = 1,
  hourStep = 1,
  placeholder,
  label,
  helperText,
  hasError = false,
  error,
  required = false,
  disabled = false,
  clearable = true,
  size = "md",
  variant = "default",
  presets = ["Now", "09:00 AM", "12:00 PM", "06:00 PM"],
  showActions = true,
  placement = "bottom",
  align = "left",
  smartPosition = true,
  zIndex = 10050,
  usePortal = true,
  popoverWidth,
  customWidth,
  className = "",
  width,
}: TimePickerProps) {
  const uid = useId();
  const inputId = `gy-timepicker-${uid}`;
  const isControlled = controlledValue !== undefined;

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<TimeValue | null>(() => {
    if (defaultValue) return parseInputTime(defaultValue, format, showSeconds);
    if (controlledValue)
      return parseInputTime(controlledValue, format, showSeconds);
    return null;
  });

  // Create a stable primitive key for controlledValue
  const controlledKey = useMemo(() => {
    if (controlledValue === null || controlledValue === undefined) return "";
    if (controlledValue instanceof Date)
      return String(controlledValue.getTime());
    if (typeof controlledValue === "object") {
      return `${controlledValue.hours}:${controlledValue.minutes}:${controlledValue.seconds ?? 0}:${controlledValue.period ?? ""}`;
    }
    return String(controlledValue);
  }, [controlledValue]);

  // Keep the controlled value reference stable until its content (controlledKey) changes,
  // so inline object/Date values don’t re-trigger parsing and downstream effects every render
  const [stableControlled, setStableControlled] = useState({
    key: controlledKey,
    value: controlledValue,
  });
  if (stableControlled.key !== controlledKey) {
    setStableControlled({ key: controlledKey, value: controlledValue });
  }
  const stableControlledValue = stableControlled.value;

  // Memoized activeValue: only creates a new reference when the underlying value actually changes
  const activeValue = useMemo(() => {
    if (isControlled) {
      return stableControlledValue
        ? parseInputTime(stableControlledValue, format, showSeconds)
        : null;
    }
    return internalValue;
  }, [isControlled, stableControlledValue, format, showSeconds, internalValue]);

  const [tempValue, setTempValue] = useState<TimeValue>(
    () =>
      activeValue ?? parseInputTime(defaultValue ?? null, format, showSeconds),
  );

  const prevOpenRef = useRef(false);
  const prevControlledKeyRef = useRef(controlledKey);
  const isDirtyRef = useRef(false);
  const tempValueRef = useRef(tempValue);
  tempValueRef.current = tempValue;

  const hoursColRef = useRef<HTMLDivElement>(null);
  const minutesColRef = useRef<HTMLDivElement>(null);
  const secondsColRef = useRef<HTMLDivElement>(null);

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

  const effectivePopoverWidth = customWidth ?? popoverWidth;

  const { refs, floatingStyles, context, isPositioned } = useFloating({
    open,
    onOpenChange: (isOpen) => {
      if (!disabled) {
        if (!isOpen && isDirtyRef.current && showActions) {
          commitValue(tempValueRef.current);
        }
        setOpen(isOpen);
      }
    },
    placement: desiredPlacement,
    strategy: "fixed",
    transform: false,
    whileElementsMounted: autoUpdate,
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
          if (effectivePopoverWidth) {
            const w =
              typeof effectivePopoverWidth === "number"
                ? `${effectivePopoverWidth}px`
                : effectivePopoverWidth;
            elements.floating.style.setProperty("--gy-trigger-width", w);
            Object.assign(elements.floating.style, {
              width: w,
            });
          } else {
            const w = `${Math.max(rects.reference.width, 260)}px`;
            elements.floating.style.setProperty("--gy-trigger-width", w);
            Object.assign(elements.floating.style, {
              width: w,
              minWidth: w,
            });
          }
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

  // Sync tempValue ONLY when the popover opens, or when controlledValue externally changes
  useEffect(() => {
    if (open) {
      if (!prevOpenRef.current) {
        // Just opened: load current active value into tempValue
        isDirtyRef.current = false;
        setTempValue(activeValue ?? parseInputTime(null, format, showSeconds));
      } else if (
        isControlled &&
        controlledKey !== prevControlledKeyRef.current
      ) {
        // Controlled value changed externally while popover was open
        setTempValue(activeValue ?? parseInputTime(null, format, showSeconds));
      }
    }
    prevOpenRef.current = open;
    prevControlledKeyRef.current = controlledKey;
  }, [open, isControlled, controlledKey, activeValue, format, showSeconds]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
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
        scrollToSelected(hoursColRef.current);
        scrollToSelected(minutesColRef.current);
        scrollToSelected(secondsColRef.current);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [open, tempValue.hours, tempValue.minutes, tempValue.seconds]);

  const commitValue = (val: TimeValue) => {
    const formatted = formatTimeString(val, format, showSeconds);
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(formatted, val);
  };

  const handleApply = () => {
    commitValue(tempValue);
    setOpen(false);
  };

  const handleNow = () => {
    isDirtyRef.current = true;
    const nowTime = parseInputTime(new Date(), format, showSeconds);
    setTempValue(nowTime);
    commitValue(nowTime);
    setOpen(false);
  };

  const handleSelectPreset = (preset: string | TimePickerPreset) => {
    isDirtyRef.current = true;
    const labelStr = typeof preset === "string" ? preset : preset.label;
    const rawVal = typeof preset === "string" ? preset : preset.value;
    const isNow =
      labelStr.trim().toLowerCase() === "now" ||
      (typeof rawVal === "string" && rawVal.trim().toLowerCase() === "now");

    const presetTime = isNow
      ? parseInputTime(new Date(), format, showSeconds)
      : parseInputTime(rawVal, format, showSeconds);

    setTempValue(presetTime);
    commitValue(presetTime);
    setOpen(false);
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    isDirtyRef.current = false;
    if (!isControlled) {
      setInternalValue(null);
    }
    const emptyTime: TimeValue = {
      hours: format === "12h" ? 12 : 0,
      minutes: 0,
      seconds: 0,
      period: format === "12h" ? "AM" : undefined,
    };
    onChange?.("", emptyTime);
    if (open) setOpen(false);
  };

  const updateHours = (h: number) => {
    isDirtyRef.current = true;
    const next = { ...tempValue, hours: h };
    setTempValue(next);
    if (!showActions) commitValue(next);
  };

  const updateMinutes = (m: number) => {
    isDirtyRef.current = true;
    const next = { ...tempValue, minutes: m };
    setTempValue(next);
    if (!showActions) commitValue(next);
  };

  const updateSeconds = (s: number) => {
    isDirtyRef.current = true;
    const next = { ...tempValue, seconds: s };
    setTempValue(next);
    if (!showActions) commitValue(next);
  };

  const updatePeriod = (p: "AM" | "PM") => {
    isDirtyRef.current = true;
    const next = { ...tempValue, period: p };
    setTempValue(next);
    if (!showActions) commitValue(next);
  };

  // Generate column data
  const hoursList =
    format === "12h"
      ? Array.from(
          { length: Math.floor(12 / hourStep) },
          (_, i) => (i + 1) * hourStep,
        )
      : Array.from(
          { length: Math.floor(24 / hourStep) },
          (_, i) => i * hourStep,
        );

  const minutesList = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, i) => i * minuteStep,
  );

  const secondsList = showSeconds
    ? Array.from(
        { length: Math.floor(60 / secondStep) },
        (_, i) => i * secondStep,
      )
    : [];

  const isGlass = variant === "glassmorphic" || variant === "glass";
  const defaultPlaceholder =
    placeholder ?? (format === "12h" ? "hh:mm aa" : "HH:mm");
  const displayValue = formatTimeString(
    open && tempValue ? tempValue : activeValue,
    format,
    showSeconds,
  );

  const popoverNode = (
    <div
      ref={refs.setFloating}
      className={`gy-timepicker-popover ${isPositioned ? "gy-timepicker-popover--positioned" : ""} ${isGlass ? `gy-timepicker-popover--${variant}` : ""}`.trim()}
      style={{
        ...floatingStyles,
        zIndex,
        visibility: isPositioned ? "visible" : "hidden",
        opacity: isPositioned ? undefined : 0,
        pointerEvents: isPositioned ? undefined : "none",
      }}
      role="dialog"
      aria-label="Choose time"
      {...getFloatingProps()}
    >
      {/* Presets Bar */}
      {presets && presets.length > 0 && (
        <div className="gy-timepicker-presets">
          {presets.map((preset, idx) => {
            const labelStr = typeof preset === "string" ? preset : preset.label;
            const isPresetActive = isPresetMatching(
              preset,
              tempValue,
              format,
              showSeconds,
            );
            return (
              <button
                key={idx}
                type="button"
                className={`gy-timepicker-preset-btn ${isPresetActive ? "gy-timepicker-preset-btn--active" : ""}`}
                onClick={() => handleSelectPreset(preset)}
              >
                {labelStr}
              </button>
            );
          })}
        </div>
      )}

      {/* Header Display */}
      <div className="gy-timepicker-header">
        <Typography variant="span" className="gy-timepicker-header-text">
          {formatTimeString(tempValue, format, showSeconds)}
        </Typography>
      </div>

      {/* Column Headers Row (Fixed, not scrolling) */}
      <div className="gy-timepicker-column-headers">
        <Typography
          variant="span"
          as="div"
          className="gy-timepicker-column-head"
        >
          Hour
        </Typography>
        <Typography
          variant="span"
          as="div"
          className="gy-timepicker-column-head"
        >
          Min
        </Typography>
        {showSeconds && (
          <Typography
            variant="span"
            as="div"
            className="gy-timepicker-column-head"
          >
            Sec
          </Typography>
        )}
        {format === "12h" && (
          <Typography
            variant="span"
            as="div"
            className="gy-timepicker-column-head"
          >
            Period
          </Typography>
        )}
      </div>

      {/* Columns Scrollable Lists */}
      <div className="gy-timepicker-columns">
        {/* Hours Column */}
        <div
          ref={hoursColRef}
          className="gy-timepicker-column"
          aria-label="Hours"
        >
          {hoursList.map((h) => {
            const isSelected = tempValue.hours === h;
            return (
              <button
                key={h}
                type="button"
                data-selected={isSelected ? "true" : undefined}
                className={`gy-timepicker-item ${isSelected ? "gy-timepicker-item--selected" : ""}`}
                onClick={() => updateHours(h)}
              >
                {pad(h)}
              </button>
            );
          })}
        </div>

        {/* Minutes Column */}
        <div
          ref={minutesColRef}
          className="gy-timepicker-column"
          aria-label="Minutes"
        >
          {minutesList.map((m) => {
            const isSelected = tempValue.minutes === m;
            return (
              <button
                key={m}
                type="button"
                data-selected={isSelected ? "true" : undefined}
                className={`gy-timepicker-item ${isSelected ? "gy-timepicker-item--selected" : ""}`}
                onClick={() => updateMinutes(m)}
              >
                {pad(m)}
              </button>
            );
          })}
        </div>

        {/* Seconds Column */}
        {showSeconds && (
          <div
            ref={secondsColRef}
            className="gy-timepicker-column"
            aria-label="Seconds"
          >
            {secondsList.map((s) => {
              const isSelected = tempValue.seconds === s;
              return (
                <button
                  key={s}
                  type="button"
                  data-selected={isSelected ? "true" : undefined}
                  className={`gy-timepicker-item ${isSelected ? "gy-timepicker-item--selected" : ""}`}
                  onClick={() => updateSeconds(s)}
                >
                  {pad(s)}
                </button>
              );
            })}
          </div>
        )}

        {/* AM / PM Column */}
        {format === "12h" && (
          <div
            className="gy-timepicker-column gy-timepicker-column--period"
            aria-label="Period"
          >
            {(["AM", "PM"] as const).map((p) => {
              const isSelected = tempValue.period === p;
              return (
                <button
                  key={p}
                  type="button"
                  data-selected={isSelected ? "true" : undefined}
                  className={`gy-timepicker-item ${isSelected ? "gy-timepicker-item--selected" : ""}`}
                  onClick={() => updatePeriod(p)}
                >
                  {p}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {showActions && (
        <div className="gy-timepicker-footer">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleNow}
            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
          >
            Now
          </Button>
          <div className="gy-timepicker-footer-actions">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleClear()}
              style={{ padding: "0.25rem 0.625rem", fontSize: "0.75rem" }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleApply}
              style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem" }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`gy-timepicker ${isGlass ? `gy-timepicker--${variant}` : ""} ${className}`.trim()}
      style={{ ...(width ? { width } : {}) }}
    >
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
          htmlFor={inputId}
        >
          {label}
        </Typography>
      )}

      <div
        ref={refs.setReference}
        style={{ width: "100%" }}
        className={`gy-timepicker-trigger ${open ? "gy-timepicker-trigger--open" : ""} ${disabled ? "gy-timepicker-trigger--disabled" : ""}`}
        {...getReferenceProps({
          onClick: () => !disabled && setOpen((o) => !o),
        })}
      >
        <Input
          id={inputId}
          fullWidth
          isFocused={open}
          placeholder={defaultPlaceholder}
          value={displayValue}
          readOnly
          disabled={disabled}
          required={required}
          hasError={hasError || Boolean(error)}
          size={size}
          variant={isGlass ? "default" : (variant as InputVariant)}
          rightIcon={
            <div className="gy-timepicker-right-addons">
              {clearable && displayValue && !disabled && (
                <ClearButton
                  size={size === "lg" ? "md" : "sm"}
                  variant="subtle"
                  ariaLabel="Clear time"
                  onClick={handleClear}
                />
              )}
              <ClockIcon />
            </div>
          }
          style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        />
      </div>

      {(error || helperText) && (
        <Typography
          variant="span"
          as="div"
          className={`gy-input-helper ${hasError || Boolean(error) ? "gy-input-helper--error" : ""}`}
        >
          {error || helperText}
        </Typography>
      )}

      {open &&
        !disabled &&
        (usePortal ? (
          <FloatingPortal>{popoverNode}</FloatingPortal>
        ) : (
          popoverNode
        ))}
    </div>
  );
}
