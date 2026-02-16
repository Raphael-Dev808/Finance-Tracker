import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#789a99',
          400: '#8dadac',
          500: '#789a99',
          600: '#5f7c7b',
          700: '#4d6463',
          800: '#3b4c4b',
          900: '#2a3736',
        },
        peach: {
          DEFAULT: '#FFD2C2',
          400: '#ffe4dc',
          500: '#FFD2C2',
          600: '#e8b8a8',
        },
        teal: {
          400: '#8dadac',
          500: '#789a99',
          600: '#5f7c7b',
          700: '#4d6463',
          800: '#3b4c4b',
          900: '#2a3736',
        },
        income: '#789a99',
        expense: '#ef4444',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
