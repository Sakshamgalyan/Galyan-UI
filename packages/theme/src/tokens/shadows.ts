/** Galyan shadow tokens */
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  focus: '0 0 0 3px',  // needs color appended
  modal: '0 32px 64px -12px rgb(0 0 0 / 0.35), 0 0 0 1px rgb(0 0 0 / 0.05)',
  dropdown: '0 4px 16px -2px rgb(0 0 0 / 0.12), 0 2px 6px -1px rgb(0 0 0 / 0.08)',
  popover: '0 8px 24px -4px rgb(0 0 0 / 0.15), 0 2px 8px -2px rgb(0 0 0 / 0.08)',
} as const;

export type ShadowKey = keyof typeof shadows;
