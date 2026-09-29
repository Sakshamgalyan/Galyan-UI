"use client";

import React, { useId, useState } from "react";
import "./radiogroup.css";
import { Typography } from "../typography";

export type RadioSize = "sm" | "md" | "lg";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  orientation?: "horizontal" | "vertical";
  label?: string;
  helperText?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
}

export function RadioGroup({
  options,
  name,
  value,
  defaultValue,
  onChange,
  size = "md",
  orientation = "vertical",
  label,
  helperText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  className = "",
}: RadioGroupProps) {
  const uid = useId();
  const groupName = name ?? uid;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  return (
    <div
      role="radiogroup"
      aria-label={typeof label === "string" ? label : undefined}
      className={[
        "gy-radio-group",
        `gy-radio-group--${size}`,
        hasError ? "gy-radio-group--error" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <Typography
          variant="span"
          as="div"
          className={`gy-radio-group__label ${isRequired ? "gy-radio-group__label--required" : ""}`}
        >
          {label}
        </Typography>
      )}
      <div
        className={`gy-radio-group__options ${orientation === "horizontal" ? "gy-radio-group__options--horizontal" : ""}`}
      >
        {options.map((opt) => {
          const isChecked = currentValue === opt.value;
          const optDisabled = isDisabled || opt.disabled;

          return (
            <label
              key={opt.value}
              className={`gy-radio ${optDisabled ? "gy-radio--disabled" : ""}`}
            >
              <span className="gy-radio__control">
                <input
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  checked={isChecked}
                  disabled={optDisabled}
                  required={isRequired}
                  className="gy-radio__input"
                  onChange={() => {
                    if (!isControlled) setInternalValue(opt.value);
                    onChange?.(opt.value);
                  }}
                />
                <span
                  className={`gy-radio__circle ${isChecked ? "gy-radio__circle--checked" : ""} ${hasError ? "gy-radio__circle--error" : ""}`}
                >
                  {isChecked && <span className="gy-radio__dot" />}
                </span>
              </span>
              <Typography variant="span" className="gy-radio__label">
                {opt.label}
              </Typography>
            </label>
          );
        })}
      </div>
      {helperText && (
        <Typography
          variant="span"
          as="div"
          className={`gy-radio-group__helper ${hasError ? "gy-radio-group__helper--error" : ""}`}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
}
