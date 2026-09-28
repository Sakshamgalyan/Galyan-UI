"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Skeleton } from "../skeleton/Skeleton";
import { WORLD_COUNTRIES, type WorldCountryPath } from "./world-map-data";
import "./choropleth-map.css";

export interface MapRegionItem {
  id: string; // ISO 2 (e.g. "ZA"), ISO 3 (e.g. "ZAF"), or Country Name / State (e.g. "South Africa", "CA")
  name?: string;
  value?: number;
  color?: string; // Custom fill color override for this country
  tooltip?: React.ReactNode;
  [key: string]: any;
}

export type MapVariant = "world" | "tiles";

export interface ChoroplethMapProps {
  variant?: MapVariant;
  data?: MapRegionItem[];
  selectedRegion?: string | null;
  defaultSelectedRegion?: string | null;
  onRegionClick?: (region: { id: string; name: string; value?: number; item?: MapRegionItem }) => void;
  onRegionHover?: (region: { id: string; name: string; value?: number; item?: MapRegionItem } | null) => void;
  height?: number | string;
  width?: number | string;
  baseColor?: string;
  borderColor?: string;
  activeColor?: string;
  highlightColor?: string;
  colorScale?: string[];
  showZoomControls?: boolean;
  allowPan?: boolean;
  loading?: boolean;
  className?: string;
  tooltipConfig?: {
    show?: boolean;
    formatter?: (region: { id: string; name: string; value?: number; item?: MapRegionItem }) => React.ReactNode;
  };
}

interface StateGridPosition {
  id: string;
  name: string;
  row: number;
  col: number;
}

// US State Grid coordinates for tile grid map layout
const STATE_GRID: StateGridPosition[] = [
  { id: "AK", name: "Alaska", row: 0, col: 0 },
  { id: "ME", name: "Maine", row: 0, col: 11 },
  { id: "WA", name: "Washington", row: 1, col: 1 },
  { id: "ID", name: "Idaho", row: 1, col: 2 },
  { id: "MT", name: "Montana", row: 1, col: 3 },
  { id: "ND", name: "North Dakota", row: 1, col: 4 },
  { id: "MN", name: "Minnesota", row: 1, col: 5 },
  { id: "WI", name: "Wisconsin", row: 1, col: 6 },
  { id: "MI", name: "Michigan", row: 1, col: 7 },
  { id: "NY", name: "New York", row: 1, col: 9 },
  { id: "MA", name: "Massachusetts", row: 1, col: 10 },
  { id: "OR", name: "Oregon", row: 2, col: 1 },
  { id: "NV", name: "Nevada", row: 2, col: 2 },
  { id: "WY", name: "Wyoming", row: 2, col: 3 },
  { id: "SD", name: "South Dakota", row: 2, col: 4 },
  { id: "IA", name: "Iowa", row: 2, col: 5 },
  { id: "IL", name: "Illinois", row: 2, col: 6 },
  { id: "IN", name: "Indiana", row: 2, col: 7 },
  { id: "OH", name: "Ohio", row: 2, col: 8 },
  { id: "PA", name: "Pennsylvania", row: 2, col: 9 },
  { id: "NJ", name: "New Jersey", row: 2, col: 10 },
  { id: "CT", name: "Connecticut", row: 2, col: 11 },
  { id: "CA", name: "California", row: 3, col: 0 },
  { id: "UT", name: "Utah", row: 3, col: 2 },
  { id: "CO", name: "Colorado", row: 3, col: 3 },
  { id: "NE", name: "Nebraska", row: 3, col: 4 },
  { id: "MO", name: "Missouri", row: 3, col: 5 },
  { id: "KY", name: "Kentucky", row: 3, col: 6 },
  { id: "WV", name: "West Virginia", row: 3, col: 7 },
  { id: "VA", name: "Virginia", row: 3, col: 8 },
  { id: "MD", name: "Maryland", row: 3, col: 9 },
  { id: "DE", name: "Delaware", row: 3, col: 10 },
  { id: "RI", name: "Rhode Island", row: 3, col: 11 },
  { id: "AZ", name: "Arizona", row: 4, col: 2 },
  { id: "NM", name: "New Mexico", row: 4, col: 3 },
  { id: "KS", name: "Kansas", row: 4, col: 4 },
  { id: "AR", name: "Arkansas", row: 4, col: 5 },
  { id: "TN", name: "Tennessee", row: 4, col: 6 },
  { id: "NC", name: "North Carolina", row: 4, col: 7 },
  { id: "SC", name: "South Carolina", row: 4, col: 8 },
  { id: "DC", name: "District of Columbia", row: 4, col: 9 },
  { id: "TX", name: "Texas", row: 5, col: 3 },
  { id: "OK", name: "Oklahoma", row: 5, col: 4 },
  { id: "LA", name: "Louisiana", row: 5, col: 5 },
  { id: "MS", name: "Mississippi", row: 5, col: 6 },
  { id: "AL", name: "Alabama", row: 5, col: 7 },
  { id: "GA", name: "Georgia", row: 5, col: 8 },
  { id: "HI", name: "Hawaii", row: 6, col: 0 },
  { id: "FL", name: "Florida", row: 6, col: 9 },
];

export function ChoroplethMap({
  variant = "world",
  data = [],
  selectedRegion,
  defaultSelectedRegion,
  onRegionClick,
  onRegionHover,
  height = 420,
  width = "100%",
  baseColor = "var(--gy-map-base, #ffffff)",
  borderColor = "var(--gy-map-border, #e2e8f0)",
  activeColor = "var(--gy-map-active, #dbeafe)",
  highlightColor = "var(--gy-map-highlight, #4338ca)",
  colorScale,
  showZoomControls = true,
  allowPan = true,
  loading = false,
  className = "",
  tooltipConfig = { show: true },
}: ChoroplethMapProps) {
  const [internalSelected, setInternalSelected] = useState<string | null>(
    defaultSelectedRegion ?? null
  );
  const activeSelected = selectedRegion !== undefined ? selectedRegion : internalSelected;

  const [hoveredRegion, setHoveredRegion] = useState<{
    id: string;
    name: string;
    value?: number;
    item?: MapRegionItem;
  } | null>(null);

  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Map index for fast ID/ISO lookup
  const dataLookup = useMemo(() => {
    const map = new Map<string, MapRegionItem>();
    data.forEach((item) => {
      if (item.id) map.set(item.id.toUpperCase(), item);
      if (item.iso3) map.set(item.iso3.toUpperCase(), item);
      if (item.name) map.set(item.name.toLowerCase(), item);
    });
    return map;
  }, [data]);

  // Compute min/max values for color scale
  const { minVal, maxVal } = useMemo(() => {
    const numericVals = data
      .map((d) => d.value)
      .filter((v): v is number => typeof v === "number" && !isNaN(v));
    if (numericVals.length === 0) return { minVal: 0, maxVal: 100 };
    return {
      minVal: Math.min(...numericVals),
      maxVal: Math.max(...numericVals, 1),
    };
  }, [data]);

  const getColorForValue = useCallback(
    (item: MapRegionItem | undefined, isHighlighted: boolean) => {
      if (isHighlighted) {
        return highlightColor;
      }
      if (!item) {
        return baseColor;
      }
      if (item.color) {
        return item.color;
      }
      if (colorScale && colorScale.length > 0 && typeof item.value === "number") {
        const range = maxVal - minVal || 1;
        const fraction = Math.max(0, Math.min(1, (item.value - minVal) / range));
        const index = Math.min(
          Math.floor(fraction * colorScale.length),
          colorScale.length - 1
        );
        return colorScale[index];
      }
      return activeColor;
    },
    [baseColor, activeColor, highlightColor, colorScale, minVal, maxVal]
  );

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!allowPan || zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && allowPan && zoom > 1) {
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCountryHover = (
    country: WorldCountryPath,
    item: MapRegionItem | undefined,
    e: React.MouseEvent
  ) => {
    const regionObj = {
      id: country.id,
      name: country.name,
      value: item?.value,
      item,
    };
    setHoveredRegion(regionObj);
    onRegionHover?.(regionObj);
  };

  const handleCountryLeave = () => {
    setHoveredRegion(null);
    onRegionHover?.(null);
  };

  const handleCountryClick = (
    country: WorldCountryPath,
    item: MapRegionItem | undefined
  ) => {
    const nextId = activeSelected === country.id ? null : country.id;
    setInternalSelected(nextId);
    onRegionClick?.({
      id: country.id,
      name: country.name,
      value: item?.value,
      item,
    });
  };

  const isSelected = (id: string, iso3?: string, name?: string): boolean => {
    if (!activeSelected) return false;
    const s = activeSelected.toUpperCase();
    if (id.toUpperCase() === s) return true;
    if (iso3 && iso3.toUpperCase() === s) return true;
    if (name && name.toLowerCase() === activeSelected.toLowerCase()) return true;
    return false;
  };

  if (loading) {
    return (
      <div
        className={`gy-choropleth-wrapper ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          style={{ borderRadius: "16px" }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`gy-choropleth-wrapper ${
        variant === "world" ? "gy-choropleth-wrapper--world" : "gy-choropleth-wrapper--tiles"
      } ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        handleCountryLeave();
      }}
    >
      {variant === "world" ? (
        <div
          className="gy-choropleth-svg-container"
          onMouseDown={handleMouseDown}
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 500"
            className="gy-choropleth-svg"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <g className="gy-choropleth-countries">
              {WORLD_COUNTRIES.map((country) => {
                const item =
                  dataLookup.get(country.id.toUpperCase()) ??
                  dataLookup.get(country.iso3.toUpperCase()) ??
                  dataLookup.get(country.name.toLowerCase());
                const highlighted = isSelected(country.id, country.iso3, country.name);
                const fillColor = getColorForValue(item, highlighted);
                const isHovered = hoveredRegion?.id === country.id;

                return (
                  <path
                    key={country.id}
                    id={`country-${country.id}`}
                    d={country.path}
                    className={`gy-choropleth-country ${
                      highlighted ? "gy-choropleth-country--selected" : ""
                    } ${item ? "gy-choropleth-country--active" : ""} ${
                      isHovered ? "gy-choropleth-country--hovered" : ""
                    }`}
                    fill={fillColor}
                    stroke={highlighted ? highlightColor : borderColor}
                    strokeWidth={highlighted ? "1.5" : "0.75"}
                    strokeLinejoin="round"
                    onMouseEnter={(e) => handleCountryHover(country, item, e)}
                    onMouseLeave={handleCountryLeave}
                    onClick={() => handleCountryClick(country, item)}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      ) : (
        /* US State Grid Tiles variant */
        <div className="gy-choropleth-grid">
          {STATE_GRID.map((state) => {
            const item = dataLookup.get(state.id.toUpperCase());
            const highlighted = isSelected(state.id, undefined, state.name);
            const bg = getColorForValue(item, highlighted);
            const hasValue = item !== undefined;

            return (
              <div
                key={state.id}
                className={`gy-choropleth-tile ${
                  highlighted ? "gy-choropleth-tile--selected" : ""
                }`}
                style={{
                  gridRow: state.row + 1,
                  gridColumn: state.col + 1,
                  backgroundColor: bg,
                }}
                onMouseEnter={(e) =>
                  handleCountryHover(
                    { id: state.id, iso3: state.id, name: state.name, path: "" },
                    item,
                    e
                  )
                }
                onMouseLeave={handleCountryLeave}
                onClick={() =>
                  handleCountryClick(
                    { id: state.id, iso3: state.id, name: state.name, path: "" },
                    item
                  )
                }
              >
                <span
                  className={`gy-choropleth-tile-text ${
                    hasValue || highlighted ? "gy-choropleth-tile-text--active" : ""
                  }`}
                >
                  {state.id}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Zoom Controls (Bottom Right) matching screenshot */}
      {showZoomControls && variant === "world" && (
        <div className="gy-choropleth-zoom-controls">
          <button
            type="button"
            className="gy-choropleth-zoom-btn"
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom in"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div className="gy-choropleth-zoom-divider" />
          <button
            type="button"
            className="gy-choropleth-zoom-btn"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      )}

      {/* Interactive Floating Hover Tooltip */}
      {tooltipConfig?.show !== false && hoveredRegion && (
        <div
          className="gy-choropleth-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          {tooltipConfig?.formatter ? (
            tooltipConfig.formatter(hoveredRegion)
          ) : (
            <>
              <div className="gy-choropleth-tooltip-title">
                {hoveredRegion.name} ({hoveredRegion.id})
              </div>
              {hoveredRegion.value !== undefined && (
                <div className="gy-choropleth-tooltip-value">
                  {hoveredRegion.value.toLocaleString()}{" "}
                  {typeof hoveredRegion.value === "number" && hoveredRegion.value <= 100 ? "%" : ""}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
