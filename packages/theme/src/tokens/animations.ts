/** Galyan animation keyframes and configs */
export const animations = {
  fade: {
    in: { from: { opacity: '0' }, to: { opacity: '1' } },
    out: { from: { opacity: '1' }, to: { opacity: '0' } },
  },
  slide: {
    inUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    inDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    inLeft: { from: { opacity: '0', transform: 'translateX(-8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
    inRight: { from: { opacity: '0', transform: 'translateX(8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
  },
  zoom: {
    in: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
    out: { from: { opacity: '1', transform: 'scale(1)' }, to: { opacity: '0', transform: 'scale(0.95)' } },
  },
  collapse: {
    open: { from: { height: '0', overflow: 'hidden' }, to: { height: 'var(--gy-collapse-height)', overflow: 'hidden' } },
    close: { from: { height: 'var(--gy-collapse-height)' }, to: { height: '0', overflow: 'hidden' } },
  },
  shake: {
    keyframes: {
      '0%, 100%': { transform: 'translateX(0)' },
      '10%, 50%, 90%': { transform: 'translateX(-4px)' },
      '30%, 70%': { transform: 'translateX(4px)' },
    },
  },
  spin: {
    keyframes: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
  bounce: {
    keyframes: {
      '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
      '50%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
    },
  },
  pulse: {
    keyframes: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.4' },
    },
  },
  ripple: {
    keyframes: {
      '0%': { transform: 'scale(0)', opacity: '0.6' },
      '100%': { transform: 'scale(4)', opacity: '0' },
    },
  },
  wave: {
    keyframes: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },
} as const;
