"use client";

import React from "react";
import "./inputgroup.css";
import { Typography } from "../typography";

export type InputGroupVariant = "default" | "filled" | "glassmorphic" | "glass";

export interface InputGroupProps {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: InputGroupVariant;
  fullWidth?: boolean;
  label?: React.ReactNode;
  helperText?: string;
  hasError?: boolean;
  disabled?: boolean;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

type ChildProps = Record<string, unknown>;
type NamedComponent = { displayName?: string; name?: string };

function getComponentName(type: unknown): string {
  if (typeof type !== "function" && (typeof type !== "object" || type === null)) {
    return "";
  }
  const named = type as NamedComponent;
  return named.displayName || named.name || "";
}

function hasClassName(props: ChildProps, fragment: string): boolean {
  return typeof props.className === "string" && props.className.includes(fragment);
}

function isButtonElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;
  if (node.type === "button") return true;
  if (getComponentName(node.type).toLowerCase().includes("button")) return true;
  return hasClassName(node.props as ChildProps, "gy-btn");
}

function isDropdownElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;
  if (getComponentName(node.type).toLowerCase().includes("dropdown")) {
    return true;
  }
  const props = node.props as ChildProps;
  return hasClassName(props, "gy-dropdown") || Array.isArray(props.options);
}

function enhanceDropdown(
  dropdown: React.ReactNode,
  variant?: InputGroupVariant,
  size?: "sm" | "md" | "lg",
  disabled?: boolean,
  hasError?: boolean,
): React.ReactNode {
  if (!React.isValidElement(dropdown)) return dropdown;
  const props = dropdown.props as ChildProps;
  const extraProps: ChildProps = {};

  if (variant && props.variant === undefined) {
    extraProps.variant = variant;
  }
  if (size && props.size === undefined) {
    extraProps.size = size;
  }
  if (disabled !== undefined && props.disabled === undefined) {
    extraProps.disabled = disabled;
  }
  if (hasError !== undefined && props.hasError === undefined) {
    extraProps.hasError = hasError;
  }

  return Object.keys(extraProps).length > 0
    ? React.cloneElement(dropdown as React.ReactElement<ChildProps>, extraProps)
    : dropdown;
}

function enhanceControlChild(
  child: React.ReactNode,
  variant?: InputGroupVariant,
  size?: "sm" | "md" | "lg",
  disabled?: boolean,
  hasError?: boolean,
): React.ReactNode {
  if (!React.isValidElement(child)) return child;
  const childProps = child.props as ChildProps;
  const extraProps: ChildProps = {};

  if (variant && childProps.variant === undefined) {
    extraProps.variant =
      variant === "glassmorphic" || variant === "glass" ? "default" : variant;
  }
  if (size && childProps.size === undefined) {
    extraProps.size = size;
  }
  if (
    disabled !== undefined &&
    childProps.disabled === undefined &&
    childProps.isDisabled === undefined
  ) {
    extraProps.disabled = disabled;
    extraProps.isDisabled = disabled;
  }
  if (hasError !== undefined && childProps.hasError === undefined) {
    extraProps.hasError = hasError;
  }

  return Object.keys(extraProps).length > 0
    ? React.cloneElement(child as React.ReactElement<ChildProps>, extraProps)
    : child;
}

export function InputGroup({
  leftAddon,
  rightAddon,
  size = "md",
  variant = "default",
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
    variant ? `gy-input-group--${variant}` : "",
    fullWidth ? "gy-input-group--full-width" : "",
    leftAddon ? "gy-input-group--has-left" : "",
    rightAddon ? "gy-input-group--has-right" : "",
    hasError ? "gy-input-group--error" : "",
    disabled ? "gy-input-group--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const renderAddon = (addon: React.ReactNode, position: "left" | "right") => {
    if (!addon) return null;
    const isButton = isButtonElement(addon);
    const isDropdown = isDropdownElement(addon);

    const enhancedAddon = isDropdown
      ? enhanceDropdown(addon, variant, size, disabled, hasError)
      : addon;

    const addonClasses = [
      "gy-input-group__addon",
      `gy-input-group__addon--${position}`,
      isButton ? "gy-input-group__addon--button" : "",
      isDropdown ? "gy-input-group__addon--dropdown" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return <div className={addonClasses}>{enhancedAddon}</div>;
  };

  const processedChildren = React.Children.map(children, (child) =>
    enhanceControlChild(child, variant, size, disabled, hasError),
  );

  return (
    <div className={rootClasses}>
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
        >
          {label}
        </Typography>
      )}
      <div className={containerClasses}>
        {renderAddon(leftAddon, "left")}
        <div className="gy-input-group__control">{processedChildren}</div>
        {renderAddon(rightAddon, "right")}
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
  variant = "default",
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

  const processedDropdown = enhanceDropdown(
    dropdown,
    variant,
    size,
    disabled,
    hasError,
  );

  const renderedLeft = isLeft ? (
    <div className="gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--left">
      {processedDropdown}
    </div>
  ) : leftAddon ? (
    <div
      className={`gy-input-group__addon gy-input-group__addon--left ${
        isButtonElement(leftAddon)
          ? "gy-input-group__addon--button"
          : isDropdownElement(leftAddon)
            ? "gy-input-group__addon--dropdown"
            : ""
      }`}
    >
      {isDropdownElement(leftAddon)
        ? enhanceDropdown(leftAddon, variant, size, disabled, hasError)
        : leftAddon}
    </div>
  ) : null;

  const renderedRight = isRight ? (
    <div className="gy-input-group__addon gy-input-group__addon--dropdown gy-input-group__addon--right">
      {processedDropdown}
    </div>
  ) : rightAddon ? (
    <div
      className={`gy-input-group__addon gy-input-group__addon--right ${
        isButtonElement(rightAddon)
          ? "gy-input-group__addon--button"
          : isDropdownElement(rightAddon)
            ? "gy-input-group__addon--dropdown"
            : ""
      }`}
    >
      {isDropdownElement(rightAddon)
        ? enhanceDropdown(rightAddon, variant, size, disabled, hasError)
        : rightAddon}
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
    variant ? `gy-input-group--${variant}` : "",
    fullWidth ? "gy-input-group--full-width" : "",
    renderedLeft ? "gy-input-group--has-left" : "",
    renderedRight ? "gy-input-group--has-right" : "",
    hasError ? "gy-input-group--error" : "",
    disabled ? "gy-input-group--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const processedChildren = React.Children.map(children, (child) =>
    enhanceControlChild(child, variant, size, disabled, hasError),
  );

  return (
    <div className={rootClasses}>
      {label && (
        <Typography
          variant="span"
          as="label"
          className={`gy-input-label ${required ? "gy-input-label--required" : ""}`}
        >
          {label}
        </Typography>
      )}
      <div className={containerClasses}>
        {renderedLeft}
        <div className="gy-input-group__control">{processedChildren}</div>
        {renderedRight}
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
    </div>
  );
}
