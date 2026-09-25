"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement as FloatingPlacement,
} from "@floating-ui/react";
import "./color-picker.css";

export type ColorPickerSize = "sm" | "md" | "lg";
export type ColorPickerFormat = "hex" | "rgb" | "hsl";

export interface ColorPickerProps {
  /** Selected color value (e.g. "#5223BC" or "rgba(82, 35, 188, 0.8)") */
  value?: string;
  /** Initial color value for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when the color changes */
  onChange?: (color: string) => void;
  /** Label displayed above the input trigger */
  label?: string;
  /** Helper text displayed below the input trigger */
  helperText?: string;
  /** Whether the component has an error state */
  hasError?: boolean;
  /** Whether the component is disabled */
  isDisabled?: boolean;
  /** Alias for isDisabled */
  disabled?: boolean;
  /** Whether the field is required */
  isRequired?: boolean;
  /** Alias for isRequired */
  required?: boolean;
  /** Whether to show the alpha transparency slider */
  showAlpha?: boolean;
  /** Size variant */
  size?: ColorPickerSize;
  /** Additional CSS classes */
  className?: string;
  /** Unique ID */
  id?: string;
  /** Inline style */
  style?: React.CSSProperties;
  /** Placement for the floating popover */
  placement?: "top" | "bottom" | "left" | "right";
  /** Alignment for the floating popover */
  align?: "start" | "end" | "left" | "right" | "center";
  /** Z-index for the popover */
  zIndex?: number;
  /** Array of hex colors for quick preset swatches */
  presets?: string[];
  /** Placeholder text when no color is selected */
  placeholder?: string;
  /** Whether to show the clear button in the popover */
  showClear?: boolean;
  /** Active format mode for input fields */
  format?: ColorPickerFormat;
  /** Callback when clear is clicked */
  onClear?: () => void;
  /** Whether to use portal for floating popover */
  usePortal?: boolean;
}

// ── Color Utilities ──────────────────────────────────────────────────────────

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const sat = s / 100;
  const val = v / 100;
  const c = val * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = val - c;
  let [r, g, b] = [0, 0, 0];
  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6;
    else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
    else h = (rNorm - gNorm) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const v = Math.round(max * 100);
  return [h, s, v];
}

function rgbToHex(r: number, g: number, b: number, a = 1): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, "0");
    return `${hex}${alphaHex}`.toUpperCase();
  }
  return hex.toUpperCase();
}

function hexToRgba(hex: string): [number, number, number, number] {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  } else if (cleaned.length === 4) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (cleaned.length === 6) {
    const r = parseInt(cleaned.slice(0, 2), 16) || 0;
    const g = parseInt(cleaned.slice(2, 4), 16) || 0;
    const b = parseInt(cleaned.slice(4, 6), 16) || 0;
    return [r, g, b, 1];
  }
  if (cleaned.length === 8) {
    const r = parseInt(cleaned.slice(0, 2), 16) || 0;
    const g = parseInt(cleaned.slice(2, 4), 16) || 0;
    const b = parseInt(cleaned.slice(4, 6), 16) || 0;
    const a = +(parseInt(cleaned.slice(6, 8), 16) / 255).toFixed(2);
    return [r, g, b, a];
  }
  return [0, 0, 0, 1];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;
  let r: number;
  let g: number;
  let b: number;
  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tNorm = t;
      if (tNorm < 0) tNorm += 1;
      if (tNorm > 1) tNorm -= 1;
      if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
      if (tNorm < 1 / 2) return q;
      if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
      return p;
    };
    const q =
      lNorm < 0.5
        ? lNorm * (1 + sNorm)
        : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;
    r = hue2rgb(p, q, hNorm + 1 / 3);
    g = hue2rgb(p, q, hNorm);
    b = hue2rgb(p, q, hNorm - 1 / 3);
  }
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ];
}

function parseColorToHsv(input?: string): {
  h: number;
  s: number;
  v: number;
  a: number;
} {
  if (!input || typeof input !== "string" || !input.trim()) {
    return { h: 260, s: 80, v: 74, a: 1 }; // Default nice purple #5223BC
  }
  const str = input.trim();
  if (str.startsWith("#")) {
    const [r, g, b, a] = hexToRgba(str);
    const [h, s, v] = rgbToHsv(r, g, b);
    return { h, s, v, a };
  }
  if (str.startsWith("rgb")) {
    const match = str.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/,
    );
    if (match && match[1] && match[2] && match[3]) {
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
      const [h, s, v] = rgbToHsv(r, g, b);
      return { h, s, v, a };
    }
  }
  if (str.startsWith("hsl")) {
    const match = str.match(
      /hsla?\((\d+),\s*(\d+)%?,\s*(\d+)%?(?:,\s*([\d.]+))?\)/,
    );
    if (match && match[1] && match[2] && match[3]) {
      const h = parseInt(match[1], 10);
      const s = parseInt(match[2], 10);
      const l = parseInt(match[3], 10);
      const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
      const [r, g, b] = hslToRgb(h, s, l);
      const [, hsvS, hsvV] = rgbToHsv(r, g, b);
      return { h, s: hsvS, v: hsvV, a };
    }
  }
  const [r, g, b, a] = hexToRgba(str);
  const [h, s, v] = rgbToHsv(r, g, b);
  return { h, s, v, a };
}

const DEFAULT_PRESETS = [
  "#22C55E",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#5223BC",
  "#EC4899",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#10B981",
  "#06B6D4",
  "#0F172A",
  "#64748B",
  "#94A3B8",
  "#FFFFFF",
  "#000000",
];

// ── Icons ───────────────────────────────────────────────────────────────────

const EyedropperIcon = () => (
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
    <path d="m2 22 1-1h3l9-9" />
    <path d="M3 21v-3l9-9" />
    <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9" />
  </svg>
);

const CopyIcon = () => (
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
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── ColorPicker Component ───────────────────────────────────────────────────

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = "#5223BC",
      onChange,
      label,
      helperText,
      hasError = false,
      isDisabled = false,
      disabled,
      isRequired = false,
      required,
      showAlpha = false,
      size = "md",
      className = "",
      id,
      style,
      placement = "bottom",
      align = "start",
      zIndex = 1000,
      presets = DEFAULT_PRESETS,
      placeholder = "#HEX",
      showClear = true,
      format: initialFormat = "hex",
      onClear,
      usePortal = true,
    },
    ref,
  ) => {
    const uid = useId();
    const inputId = id || `gy-colorpicker-${uid}`;
    const effectiveDisabled = isDisabled || disabled;
    const effectiveRequired = isRequired || required;

    const [open, setOpen] = useState(false);
    const [hsv, setHsv] = useState(() =>
      parseColorToHsv(controlledValue ?? defaultValue),
    );
    const [activeFormat, setActiveFormat] =
      useState<ColorPickerFormat>(initialFormat);
    const [copied, setCopied] = useState(false);

    const satAreaRef = useRef<HTMLDivElement>(null);
    const hueSliderRef = useRef<HTMLDivElement>(null);
    const alphaSliderRef = useRef<HTMLDivElement>(null);

    // Synchronize controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        setHsv(parseColorToHsv(controlledValue));
      }
    }, [controlledValue]);

    // Computed RGB & CSS strings
    const [r, g, b] = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const [hslH, hslS, hslL] = rgbToHsl(r, g, b);
    const hexColor = rgbToHex(r, g, b, showAlpha ? hsv.a : 1);
    const cssColor =
      showAlpha && hsv.a < 1
        ? `rgba(${r}, ${g}, ${b}, ${hsv.a})`
        : hexColor;

    const pureHueRgb = hsvToRgb(hsv.h, 100, 100);
    const pureHueColor = `rgb(${pureHueRgb[0]}, ${pureHueRgb[1]}, ${pureHueRgb[2]})`;

    const handleColorCommit = useCallback(
      (newHsv: { h: number; s: number; v: number; a: number }) => {
        setHsv(newHsv);
        const [nr, ng, nb] = hsvToRgb(newHsv.h, newHsv.s, newHsv.v);
        let output: string;
        if (activeFormat === "rgb") {
          output =
            showAlpha && newHsv.a < 1
              ? `rgba(${nr}, ${ng}, ${nb}, ${newHsv.a})`
              : `rgb(${nr}, ${ng}, ${nb})`;
        } else if (activeFormat === "hsl") {
          const [nh, ns, nl] = rgbToHsl(nr, ng, nb);
          output =
            showAlpha && newHsv.a < 1
              ? `hsla(${nh}, ${ns}%, ${nl}%, ${newHsv.a})`
              : `hsl(${nh}, ${ns}%, ${nl}%)`;
        } else {
          output = rgbToHex(nr, ng, nb, showAlpha ? newHsv.a : 1);
        }
        onChange?.(output);
      },
      [activeFormat, showAlpha, onChange],
    );

    // ── Drag Handlers ──

    const handleSatMove = useCallback(
      (e: PointerEvent | React.PointerEvent) => {
        if (!satAreaRef.current) return;
        const rect = satAreaRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        const s = Math.round(x * 100);
        const v = Math.round((1 - y) * 100);
        handleColorCommit({ ...hsv, s, v });
      },
      [hsv, handleColorCommit],
    );

    const handleSatPointerDown = (e: React.PointerEvent) => {
      e.preventDefault();
      handleSatMove(e);
      const onPointerMove = (ev: PointerEvent) => handleSatMove(ev);
      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const handleHueMove = useCallback(
      (e: PointerEvent | React.PointerEvent) => {
        if (!hueSliderRef.current) return;
        const rect = hueSliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const h = Math.round(x * 360) % 360;
        handleColorCommit({ ...hsv, h });
      },
      [hsv, handleColorCommit],
    );

    const handleHuePointerDown = (e: React.PointerEvent) => {
      e.preventDefault();
      handleHueMove(e);
      const onPointerMove = (ev: PointerEvent) => handleHueMove(ev);
      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const handleAlphaMove = useCallback(
      (e: PointerEvent | React.PointerEvent) => {
        if (!alphaSliderRef.current) return;
        const rect = alphaSliderRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const a = parseFloat(x.toFixed(2));
        handleColorCommit({ ...hsv, a });
      },
      [hsv, handleColorCommit],
    );

    const handleAlphaPointerDown = (e: React.PointerEvent) => {
      e.preventDefault();
      handleAlphaMove(e);
      const onPointerMove = (ev: PointerEvent) => handleAlphaMove(ev);
      const onPointerUp = () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    };

    const handleEyedropper = async () => {
      if (typeof window !== "undefined" && "EyeDropper" in window) {
        try {
          const eyeDropper = new (window as any).EyeDropper();
          const result = await eyeDropper.open();
          if (result?.sRGBHex) {
            handleColorCommit(parseColorToHsv(result.sRGBHex));
          }
        } catch {
          // Eyedropper dismissed or canceled
        }
      }
    };

    const handleCopy = () => {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(cssColor);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    };

    const handleClear = () => {
      onClear?.();
      onChange?.("");
      setOpen(false);
    };

    // ── Floating UI ──

    const desiredPlacement: FloatingPlacement =
      `${placement}-${align === "right" || align === "end" ? "end" : "start"}` as FloatingPlacement;

    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: desiredPlacement,
      whileElementsMounted: autoUpdate,
      strategy: "fixed",
      middleware: [
        offset(6),
        flip({ fallbackAxisSideDirection: "start", padding: 8 }),
        shift({ padding: 8 }),
      ],
    });

    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "dialog" });
    const { getReferenceProps, getFloatingProps } = useInteractions([
      dismiss,
      role,
    ]);

    // ── Popover Content ──

    const popoverContent = (
      <div
        ref={refs.setFloating}
        className="gy-colorpicker-popover"
        style={{ ...floatingStyles, zIndex }}
        {...getFloatingProps()}
      >
        {/* Saturation / Value 2D Box */}
        <div
          ref={satAreaRef}
          className="gy-colorpicker-saturation"
          style={{ backgroundColor: pureHueColor }}
          onPointerDown={handleSatPointerDown}
        >
          <div className="gy-colorpicker-saturation-white" />
          <div className="gy-colorpicker-saturation-black" />
          <div
            className="gy-colorpicker-saturation-handle"
            style={{
              left: `${hsv.s}%`,
              top: `${100 - hsv.v}%`,
              backgroundColor: cssColor,
            }}
          />
        </div>

        {/* Sliders & Controls */}
        <div className="gy-colorpicker-controls">
          <div className="gy-colorpicker-sliders">
            {/* Hue Slider */}
            <div
              ref={hueSliderRef}
              className="gy-colorpicker-hue-slider"
              onPointerDown={handleHuePointerDown}
            >
              <div
                className="gy-colorpicker-slider-thumb"
                style={{
                  left: `${(hsv.h / 360) * 100}%`,
                  backgroundColor: pureHueColor,
                }}
              />
            </div>

            {/* Alpha Slider */}
            {showAlpha && (
              <div
                ref={alphaSliderRef}
                className="gy-colorpicker-alpha-slider"
                onPointerDown={handleAlphaPointerDown}
              >
                <div
                  className="gy-colorpicker-alpha-bg"
                  style={{
                    background: `linear-gradient(to right, transparent, rgb(${r}, ${g}, ${b}))`,
                  }}
                />
                <div
                  className="gy-colorpicker-slider-thumb"
                  style={{
                    left: `${hsv.a * 100}%`,
                    backgroundColor: cssColor,
                  }}
                />
              </div>
            )}
          </div>

          {/* Color Preview Swatch */}
          <div
            className="gy-colorpicker-preview-swatch"
            style={{ backgroundColor: cssColor }}
            title={cssColor}
          />
        </div>

        {/* Inputs & Format Switcher */}
        <div className="gy-colorpicker-inputs-row">
          <div className="gy-colorpicker-format-badge">
            <button
              type="button"
              className="gy-colorpicker-format-toggle"
              onClick={() => {
                const formats: ColorPickerFormat[] = ["hex", "rgb", "hsl"];
                const nextIdx = (formats.indexOf(activeFormat) + 1) % formats.length;
                setActiveFormat(formats[nextIdx]!);
              }}
            >
              {activeFormat.toUpperCase()}
            </button>
          </div>

          {activeFormat === "hex" && (
            <div className="gy-colorpicker-field-group">
              <input
                type="text"
                className="gy-colorpicker-text-input"
                value={hexColor}
                onChange={(e) => {
                  const val = e.target.value;
                  if (
                    val.startsWith("#") &&
                    (val.length === 4 || val.length === 7 || val.length === 9)
                  ) {
                    handleColorCommit(parseColorToHsv(val));
                  }
                }}
              />
            </div>
          )}

          {activeFormat === "rgb" && (
            <div className="gy-colorpicker-rgb-fields">
              <input
                type="number"
                min="0"
                max="255"
                className="gy-colorpicker-number-input"
                value={r}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(255, Number(e.target.value)));
                  const [nh, ns, nv] = rgbToHsv(val, g, b);
                  handleColorCommit({ ...hsv, h: nh, s: ns, v: nv });
                }}
              />
              <input
                type="number"
                min="0"
                max="255"
                className="gy-colorpicker-number-input"
                value={g}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(255, Number(e.target.value)));
                  const [nh, ns, nv] = rgbToHsv(r, val, b);
                  handleColorCommit({ ...hsv, h: nh, s: ns, v: nv });
                }}
              />
              <input
                type="number"
                min="0"
                max="255"
                className="gy-colorpicker-number-input"
                value={b}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(255, Number(e.target.value)));
                  const [nh, ns, nv] = rgbToHsv(r, g, val);
                  handleColorCommit({ ...hsv, h: nh, s: ns, v: nv });
                }}
              />
            </div>
          )}

          {activeFormat === "hsl" && (
            <div className="gy-colorpicker-rgb-fields">
              <input
                type="number"
                min="0"
                max="360"
                className="gy-colorpicker-number-input"
                value={hslH}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(360, Number(e.target.value)));
                  const [nr, ng, nb] = hslToRgb(val, hslS, hslL);
                  const [, ns, nv] = rgbToHsv(nr, ng, nb);
                  handleColorCommit({ ...hsv, h: val, s: ns, v: nv });
                }}
              />
              <input
                type="number"
                min="0"
                max="100"
                className="gy-colorpicker-number-input"
                value={hslS}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(100, Number(e.target.value)));
                  const [nr, ng, nb] = hslToRgb(hslH, val, hslL);
                  const [, ns, nv] = rgbToHsv(nr, ng, nb);
                  handleColorCommit({ ...hsv, s: ns, v: nv });
                }}
              />
              <input
                type="number"
                min="0"
                max="100"
                className="gy-colorpicker-number-input"
                value={hslL}
                onChange={(e) => {
                  const val = Math.max(0, Math.min(100, Number(e.target.value)));
                  const [nr, ng, nb] = hslToRgb(hslH, hslS, val);
                  const [, ns, nv] = rgbToHsv(nr, ng, nb);
                  handleColorCommit({ ...hsv, s: ns, v: nv });
                }}
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="gy-colorpicker-actions-inline">
            {typeof window !== "undefined" && "EyeDropper" in window && (
              <button
                type="button"
                className="gy-colorpicker-icon-btn"
                onClick={handleEyedropper}
                title="Pick color from screen"
                aria-label="Pick color from screen"
              >
                <EyedropperIcon />
              </button>
            )}

            <button
              type="button"
              className="gy-colorpicker-icon-btn"
              onClick={handleCopy}
              title={copied ? "Copied!" : "Copy color"}
              aria-label="Copy color"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>

        {/* Swatch Presets */}
        {presets && presets.length > 0 && (
          <div className="gy-colorpicker-presets">
            {presets.map((preset) => (
              <button
                type="button"
                key={preset}
                className={`gy-colorpicker-swatch ${
                  hexColor.toLowerCase() === preset.toLowerCase()
                    ? "gy-colorpicker-swatch--active"
                    : ""
                }`}
                style={{ backgroundColor: preset }}
                onClick={() => handleColorCommit(parseColorToHsv(preset))}
                title={preset}
                aria-label={`Preset ${preset}`}
              />
            ))}
          </div>
        )}

        {/* Popover Footer */}
        {showClear && (
          <div className="gy-colorpicker-footer">
            <button
              type="button"
              className="gy-colorpicker-clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    );

    const rootClasses = [
      "gy-colorpicker",
      `gy-colorpicker--${size}`,
      effectiveDisabled ? "gy-colorpicker--disabled" : "",
      hasError ? "gy-colorpicker--error" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootClasses} style={style}>
        {label && (
          <label htmlFor={inputId} className="gy-colorpicker-label">
            {label}
            {effectiveRequired && (
              <span className="gy-colorpicker-required">*</span>
            )}
          </label>
        )}

        <div
          ref={refs.setReference}
          id={inputId}
          className="gy-colorpicker-trigger"
          tabIndex={effectiveDisabled ? -1 : 0}
          role="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          {...getReferenceProps({
            onClick: () => !effectiveDisabled && setOpen((o) => !o),
            onKeyDown: (e) => {
              if (
                !effectiveDisabled &&
                (e.key === "Enter" || e.key === " ")
              ) {
                e.preventDefault();
                setOpen((o) => !o);
              }
            },
          })}
        >
          <div className="gy-colorpicker-trigger-swatch-wrapper">
            <div
              className="gy-colorpicker-trigger-swatch"
              style={{ backgroundColor: cssColor }}
            />
          </div>

          <span className="gy-colorpicker-trigger-text">
            {cssColor || placeholder}
          </span>
        </div>

        {helperText && (
          <span
            className={`gy-colorpicker-helper ${
              hasError ? "gy-colorpicker-helper--error" : ""
            }`}
          >
            {helperText}
          </span>
        )}

        {open && !effectiveDisabled && (
          usePortal ? (
            <FloatingPortal>{popoverContent}</FloatingPortal>
          ) : (
            popoverContent
          )
        )}
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
