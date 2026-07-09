'use client';

import { createContext } from 'react';

export type ThemeRole = 'customer' | 'professional';
export type ColorMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  role: ThemeRole;
  colorMode: ColorMode;
  resolvedMode: 'light' | 'dark';
  setRole: (role: ThemeRole) => void;
  setColorMode: (mode: ColorMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  role: 'customer',
  colorMode: 'system',
  resolvedMode: 'light',
  setRole: () => {},
  setColorMode: () => {},
});
