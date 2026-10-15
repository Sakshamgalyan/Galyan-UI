/**
 * resolveTheme — merges a brand's base tokens with a role's overrides.
 *
 * Usage:
 *   const theme = resolveTheme("simantrix", "coral", "dark");
 */

import type { BrandTheme } from "./brands/easylife.js";
import type { RoleOverride } from "./roles/types.js";
import { easylifeBrand } from "./brands/easylife.js";
import { metalixiaBrand } from "./brands/metalixia.js";
import {
  simantrixBrand,
  simantrixDarkBrand,
  simantrixLightBrand,
} from "./brands/simantrix.js";
import {
  coralOverrideSimantrix,
  blueOverrideSimantrix,
  greenOverrideSimantrix,
  violetOverrideSimantrix,
  amberOverrideSimantrix,
  cyanOverrideSimantrix,
  simantrixDefaultOverride,
} from "./roles/simantrix.js";

// ── Brand registry ──────────────────────────────────────────────────────

const brandThemes: Record<string, BrandTheme> = {
  simantrix: simantrixBrand as unknown as BrandTheme,
  easylife: easylifeBrand,
  metalixia: metalixiaBrand,
};

// ── Direct color scheme overrides for Simantrix ──────────────────────────

const simantrixRoleOverrides: Record<string, RoleOverride> = {
  simantrix: simantrixDefaultOverride,
  coral: coralOverrideSimantrix,
  blue: blueOverrideSimantrix,
  green: greenOverrideSimantrix,
  violet: violetOverrideSimantrix,
  amber: amberOverrideSimantrix,
  cyan: cyanOverrideSimantrix,
};

const roleOverrides: Record<string, Record<string, RoleOverride>> = {
  simantrix: simantrixRoleOverrides,
};

// ── Deep merge utility ──────────────────────────────────────────────────

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  overrides: Record<string, unknown>,
): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(overrides)) {
    const baseVal = result[key];
    const overrideVal = overrides[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      );
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

// ── Public API ──────────────────────────────────────────────────────────

/**
 * Resolve the full theme token set for a given brand × role combination.
 * Defaults to Simantrix brand and role if not specified.
 *
 * @param brand - The app/company brand ("simantrix", "easylife", "metalixia")
 * @param role  - The color scheme (e.g. "simantrix", "coral", "green", "blue", "violet", "amber", "cyan")
 * @param mode  - Optional color mode ("light" | "dark")
 * @returns The merged BrandTheme with role-specific overrides applied
 */
export function resolveTheme(
  brand: string = "simantrix",
  role: string = "simantrix",
  mode?: "light" | "dark",
): BrandTheme {
  const normalizedBrand = brand || "simantrix";
  const normalizedRole = role || "simantrix";

  let base = brandThemes[normalizedBrand] ?? (simantrixBrand as unknown as BrandTheme);
  if (normalizedBrand === "simantrix") {
    base = (
      mode === "light" ? simantrixLightBrand : simantrixDarkBrand
    ) as unknown as BrandTheme;
  }

  const overrides = roleOverrides[normalizedBrand]?.[normalizedRole];
  if (!overrides) return base;
  return deepMerge(base, overrides as Record<string, unknown>);
}
