import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e8ff5c',
        surface: '#0a0a0a',
        'surface-alt': '#111111',
        card: '#141414',
        'card-hover': '#181818',
        ink: '#e8e8e2',
        'ink-soft': '#c8c8c2',
        'ink-muted': '#8a8a85',
        'ink-faint': '#7a7a76',
        line: 'rgba(255,255,255,0.08)',
        'line-strong': 'rgba(255,255,255,0.25)',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        signReveal: {
          from: { clipPath: 'inset(0 100% 0 0)' },
          to: { clipPath: 'inset(0 0 0 0)' },
        },
        featureScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        pulseDot: 'pulseDot 1.6s infinite',
        signReveal: 'signReveal 1.8s ease-out .3s forwards',
        featureScroll: 'featureScroll 24s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
