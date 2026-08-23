import type { BrandTheme } from "../brands/easylife.js";

/**
 * Role overrides — partial token maps keyed by brand, then role.
 *
 * A role override only needs to specify the tokens that differ from the
 * brand default. `customer` within any brand uses the brand defaults
 * (no overrides needed).
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : string;
};

export type RoleOverride = DeepPartial<BrandTheme>;
