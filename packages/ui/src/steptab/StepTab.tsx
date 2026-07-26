"use client";

import React, { useState } from "react";
import "./steptab.css";

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

export interface StepTabProps {
  items: StepTabItem[];
  activeId?: string;
  defaultActiveId?: string;
  onStepChange?: (id: string) => void;
  header?: React.ReactNode;
  size?: StepTabSize;
  className?: string;
}

export function StepTab({
  items,
  activeId,
  defaultActiveId,
  onStepChange,
  header,
  size = "md",
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

  const rootClasses = [
    "gy-steptab-timeline",
    `gy-steptab-timeline--${size}`,
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
                  <div className="gy-steptab-timeline__card-title">
                    {item.title}
                  </div>

                  {item.timestamp && !isActive && (
                    <div className="gy-steptab-timeline__card-time">
                      {item.timestamp}
                    </div>
                  )}

                  {/* Expanded Content / Details inside active card */}
                  {isActive && (
                    <div className="gy-steptab-timeline__card-body">
                      {item.description && (
                        <div className="gy-steptab-timeline__card-desc">
                          {item.description}
                        </div>
                      )}

                      {item.details && item.details.length > 0 && (
                        <div className="gy-steptab-timeline__card-details">
                          {item.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="gy-steptab-timeline__detail-row"
                            >
                              <span className="gy-steptab-timeline__detail-label">
                                {detail.label}:
                              </span>
                              <span className="gy-steptab-timeline__detail-value">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {item.content}

                      {item.timestamp && (
                        <div className="gy-steptab-timeline__card-time gy-steptab-timeline__card-time--bottom">
                          {item.timestamp}
                        </div>
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
