"use client";

import React from "react";
import "./inputgroup.css";

export interface InputGroupProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  label?: React.ReactNode;
  helperText?: string;
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function InputGroup({
  leftAddon,
  rightAddon,
  size = "md",
  fullWidth = true,
  label,
  helperText,
  hasError = false,
  disabled = false,
  required = false,
  children,
  className = "",
}: InputGroupProps) {
  const rootClasses = [
    "gy-input-group-wrapper",
    fullWidth ? "gy-input-group-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "gy-input-group",
    `gy-input-group--${size}`,
    fullWidth ? "gy-input-group--full-width" : "",
    leftAddon ? "gy-input-group--has-left" : "",
    rightAddon ? "gy-input-group--has-right" : "",
    hasError ? "gy-input-group--error" : "",
    disabled ? "gy-input-group--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {label && (
        <label
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
        >
          {label}
        </label>
      )}
      <div className={containerClasses}>
        {leftAddon && (
          <div className="gy-input-group__addon gy-input-group__addon--left">
            {leftAddon}
          </div>
        )}
        <div className="gy-input-group__control">{children}</div>
        {rightAddon && (
          <div className="gy-input-group__addon gy-input-group__addon--right">
            {rightAddon}
          </div>
        )}
      </div>
      {helperText && (
        <div
          className={`gy-input-helper ${hasError ? "gy-input-helper--error" : ""}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}

export interface DropdownGroupProps extends Omit<
  InputGroupProps,
  "leftAddon" | "rightAddon"
> {
  dropdown: React.ReactNode;
  dropdownPosition?: "left" | "right";
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export function DropdownGroup({
  dropdown,
  dropdownPosition = "left",
  leftAddon,
  rightAddon,
  size = "md",
  fullWidth = true,
  label,
  helperText,
  hasError = false,
  disabled = false,
  required = false,
  children,
  className = "",
}: DropdownGroupProps) {
  const isLeft = dropdownPosition === "left";
  const isRight = dropdownPosition === "right";

  const renderedLeft = isLeft ? (
    <div className="gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--left">
      {dropdown}
    </div>
  ) : leftAddon ? (
    <div className="gy-input-group__addon gy-input-group__addon--left">
      {leftAddon}
    </div>
  ) : null;

  const renderedRight = isRight ? (
    <div className="gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--right">
      {dropdown}
    </div>
  ) : rightAddon ? (
    <div className="gy-input-group__addon gy-input-group__addon--right">
      {rightAddon}
    </div>
  ) : null;

  const rootClasses = [
    "gy-input-group-wrapper",
    fullWidth ? "gy-input-group-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = [
    "gy-input-group",
    `gy-input-group--${size}`,
    fullWidth ? "gy-input-group--full-width" : "",
    renderedLeft ? "gy-input-group--has-left" : "",
    renderedRight ? "gy-input-group--has-right" : "",
    hasError ? "gy-input-group--error" : "",
    disabled ? "gy-input-group--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {label && (
        <label
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
        >
          {label}
        </label>
      )}
      <div className={containerClasses}>
        {renderedLeft}
        <div className="gy-input-group__control">{children}</div>
        {renderedRight}
      </div>
      {helperText && (
        <div
          className={`gy-input-helper ${hasError ? "gy-input-helper--error" : ""}`}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}
