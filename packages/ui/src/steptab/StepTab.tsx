"use client";

import React, { useState } from "react";
import "./steptab.css";
import { Typography } from "../typography";

export type StepTabSize = "sm" | "md" | "lg";

export interface StepTabItemDetail {
  label: string;
  value: React.ReactNode;
}

export interface StepTabItem {
  id: string;
  title: string;
  timestamp?: string;
  details?: StepTabItemDetail[];
  description?: React.ReactNode;
  content?: React.ReactNode;
  status?: "completed" | "active" | "upcoming" | "error";
}

export type StepTabVariant = "default" | "glassmorphic" | "glass";

export interface StepTabProps {
  items: StepTabItem[];
  activeId?: string;
  defaultActiveId?: string;
  onStepChange?: (id: string) => void;
  header?: React.ReactNode;
  size?: StepTabSize;
  variant?: StepTabVariant;
  className?: string;
}

export function StepTab({
  items,
  activeId,
  defaultActiveId,
  onStepChange,
  header,
  size = "md",
  variant = "default",
  className = "",
}: StepTabProps) {
  const [internalId, setInternalId] = useState(
    defaultActiveId ?? items[0]?.id ?? "",
  );
  const currentId = activeId ?? internalId;

  const handleSelect = (id: string) => {
    setInternalId(id);
    onStepChange?.(id);
  };

  const variantClass =
    variant && variant !== "default" ? `gy-steptab-timeline--${variant}` : "";

  const rootClasses = [
    "gy-steptab-timeline",
    `gy-steptab-timeline--${size}`,
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses}>
      {header && <div className="gy-steptab-timeline__header">{header}</div>}

      <div className="gy-steptab-timeline__container">
        {/* Left continuous timeline spine */}
        <div className="gy-steptab-timeline__spine" />

        <div className="gy-steptab-timeline__list">
          {items.map((item) => {
            const isActive = currentId === item.id;

            return (
              <div
                key={item.id}
                className={`gy-steptab-timeline__item ${isActive ? "gy-steptab-timeline__item--active" : ""}`}
              >
                {/* Horizontal branch tick connecting spine to card */}
                <div className="gy-steptab-timeline__tick" />

                {/* Main Card Box */}
                <div
                  className="gy-steptab-timeline__card"
                  onClick={() => handleSelect(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      handleSelect(item.id);
                  }}
                >
                  <Typography
                    variant="span"
                    as="div"
                    className="gy-steptab-timeline__card-title"
                  >
                    {item.title}
                  </Typography>

                  {item.timestamp && !isActive && (
                    <Typography
                      variant="span"
                      as="div"
                      className="gy-steptab-timeline__card-time"
                    >
                      {item.timestamp}
                    </Typography>
                  )}

                  {/* Expanded Content / Details inside active card */}
                  {isActive && (
                    <div className="gy-steptab-timeline__card-body">
                      {item.description && (
                        <Typography
                          variant="span"
                          as="div"
                          className="gy-steptab-timeline__card-desc"
                        >
                          {item.description}
                        </Typography>
                      )}

                      {item.details && item.details.length > 0 && (
                        <div className="gy-steptab-timeline__card-details">
                          {item.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="gy-steptab-timeline__detail-row"
                            >
                              <Typography
                                variant="span"
                                className="gy-steptab-timeline__detail-label"
                              >
                                {detail.label}:
                              </Typography>
                              <Typography
                                variant="span"
                                className="gy-steptab-timeline__detail-value"
                              >
                                {detail.value}
                              </Typography>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.content}

                      {item.timestamp && (
                        <Typography
                          variant="span"
                          as="div"
                          className="gy-steptab-timeline__card-time gy-steptab-timeline__card-time--bottom"
                        >
                          {item.timestamp}
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
