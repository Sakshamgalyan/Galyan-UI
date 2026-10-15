"use client";

import React, { forwardRef } from "react";
import type { SimantrixLogoProps } from "./types";
import { SimantrixMark } from "./Mark";
import "./logo.css";

export const SimantrixLogo = forwardRef<HTMLDivElement, SimantrixLogoProps>(
  function SimantrixLogo(
    {
      layout = "horizontal",
      size = "md",
      colorMode = "auto",
      markStyle = "vector",
      withTagline,
      taglineText = "VIRTUAL SPACES. REAL CONNECTIONS.",
      href,
      title = "Simantrix",
      className = "",
      themeRole,
      style,
      ...rest
    },
    ref
  ) {
    const isStacked = layout === "stacked";
    const showTagline = withTagline ?? isStacked;
    const isInteractive = Boolean(href);
    const sizeClass = typeof size === "string" ? `gy-logo--${size}` : "";

    const content = (
      <div
        ref={ref}
        className={`gy-logo gy-logo--${layout} ${sizeClass} gy-logo--${colorMode} ${
          isInteractive ? "gy-logo--interactive" : ""
        } ${className}`}
        style={style}
        role={title ? "img" : undefined}
        aria-label={title || undefined}
        data-role={themeRole}
        {...rest}
      >
        {layout !== "wordmark" && (
          <SimantrixMark
            size={size}
            colorMode={colorMode}
            markStyle={markStyle}
            title={layout === "mark" ? title : ""}
          />
        )}

        {layout !== "mark" && (
          <div className="gy-logo__text-wrap">
            <span className="gy-logo__wordmark">Simantrix</span>
            {showTagline && <span className="gy-logo__tagline">{taglineText}</span>}
          </div>
        )}
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          className="gy-logo__link"
          style={{ textDecoration: "none", display: "inline-flex" }}
          aria-label={title}
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

SimantrixLogo.displayName = "SimantrixLogo";
