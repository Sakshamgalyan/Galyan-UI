"use client";

import React, { useRef, useState } from "react";
import "./chips.css";

export type ChipVariant =
  | "solid"
  | "soft"
  | "outline"
  | "success"
  | "warning"
  | "danger"
  | "neutral";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
  clickable?: boolean;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({
  children,
  variant = "soft",
  size = "md",
  removable = false,
  onRemove,
  clickable = false,
  selected = false,
  onClick,
  icon,
  className = "",
}: ChipProps) {
  return (
    <span
      className={[
        "gy-chip",
        `gy-chip--${variant}`,
        `gy-chip--${size}`,
        clickable ? "gy-chip--clickable" : "",
        selected ? "gy-chip--selected" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick?.();
            }
          : undefined
      }
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
      {removable && (
        <button
          type="button"
          className="gy-chip__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label="Remove"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <line x1="1" y1="1" x2="7" y2="7" />
            <line x1="7" y1="1" x2="1" y2="7" />
          </svg>
        </button>
      )}
    </span>
  );
}

// ── ChipsInput ────────────────────────────────────────────────────────────────
export interface ChipsInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxItems?: number;
  chipVariant?: ChipVariant;
  className?: string;
}

export function ChipsInput({
  values,
  onChange,
  placeholder = "Add a tag...",
  disabled = false,
  maxItems,
  chipVariant = "soft",
  className = "",
}: ChipsInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addChip = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed || values.includes(trimmed)) return;
    if (maxItems && values.length >= maxItems) return;
    onChange([...values, trimmed]);
    setInput("");
  };

  const removeChip = (idx: number) => {
    onChange(values.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addChip(input);
    }
    if (e.key === "Backspace" && !input && values.length > 0) {
      removeChip(values.length - 1);
    }
  };

  return (
    <div
      className={`gy-chips-input ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {values.map((val, i) => (
        <Chip
          key={i}
          variant={chipVariant}
          size="sm"
          removable={!disabled}
          onRemove={() => removeChip(i)}
        >
          {val}
        </Chip>
      ))}
      {(!maxItems || values.length < maxItems) && (
        <input
          ref={inputRef}
          className="gy-chips-input__field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addChip(input)}
          placeholder={values.length === 0 ? placeholder : ""}
          disabled={disabled}
          aria-label={placeholder}
        />
      )}
    </div>
  );
}
