import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0d2018',
          900: '#1B4332',
          800: '#2D6A4F',
          700: '#40916C',
          600: '#52B788',
        },
        sage: {
          100: '#D8F3DC',
          200: '#B7E4C7',
          300: '#95D5B2',
          400: '#74C69D',
        },
        cream: '#F8F4EE',
        tan: '#C9A96E',
        'warm-white': '#FEFCFB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLine: {
          '0%,100%': { opacity: '.3', transform: 'scaleY(.5)' },
          '50%':     { opacity: '1', transform: 'scaleY(1)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp .7s ease forwards',
        'scroll-cue': 'scrollLine 2s ease infinite',
      },
    },
  },
  plugins: [],
}
export default config
