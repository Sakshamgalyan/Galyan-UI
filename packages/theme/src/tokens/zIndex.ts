/** Galyan z-index tokens */
export const zIndex = {
  hide: "-1",
  auto: "auto",
  base: "0",
  raised: "1",
  sticky: "1100",
  fixed: "1200",
  drawer: "1300",
  modal: "9999",
  dropdown: "10050",
  popover: "10050",
  toast: "10100",
  tooltip: "100000",
  loading: "100050",
} as const;

export type ZIndexKey = keyof typeof zIndex;
