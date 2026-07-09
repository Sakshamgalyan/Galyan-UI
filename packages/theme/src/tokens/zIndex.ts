/** Galyan z-index tokens */
export const zIndex = {
  hide: '-1',
  auto: 'auto',
  base: '0',
  raised: '1',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  drawer: '1300',
  modal: '1400',
  popover: '1500',
  toast: '1600',
  tooltip: '1700',
  loading: '1800',
} as const;

export type ZIndexKey = keyof typeof zIndex;
