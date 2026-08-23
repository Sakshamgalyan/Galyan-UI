/**
 * resolveTheme — merges a brand's base tokens with a role's overrides.
 *
 * Usage:
 *   const theme = resolveTheme("easylife", "professional");
 *   // → EasyLife base + blue primary override
 */

import type { BrandTheme } from "./brands/easylife.js";
import type { RoleOverride } from "./roles/types.js";
import { easylifeBrand } from "./brands/easylife.js";
import { metalixiaBrand } from "./brands/metalixia.js";
import { samantrixBrand } from "./brands/samantrix.js";
import { professionalOverrideEasylife } from "./roles/professional.js";
import { agentOverrideEasylife } from "./roles/agent.js";
import { adminOverrideEasylife } from "./roles/admin.js";

// ── Brand registry ──────────────────────────────────────────────────────

const brandThemes: Record<string, BrandTheme> = {
  easylife: easylifeBrand,
  metalixia: metalixiaBrand,
  samantrix: samantrixBrand,
};

// ── Role override registry (keyed by brand, then role) ──────────────────

const roleOverrides: Record<string, Record<string, RoleOverride>> = {
  easylife: {
    professional: professionalOverrideEasylife,
    agent: agentOverrideEasylife,
    admin: adminOverrideEasylife,
    // customer: {} — brand default, no overrides
  },
  // metalixia: {} — mono brand, all roles use brand defaults
  // samantrix: {} — mono brand for now, add role overrides here in future
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
 *
 * @param brand - The app/company brand ("easylife", "metalixia", "samantrix")
 * @param role  - The user role ("customer", "professional", "agent", "admin")
 * @returns The merged BrandTheme with role-specific overrides applied
 */
export function resolveTheme(brand: string, role: string): BrandTheme {
  const base = brandThemes[brand] ?? easylifeBrand;
  const overrides = roleOverrides[brand]?.[role];
  if (!overrides) return base;
  return deepMerge(base, overrides as Record<string, unknown>);
}
