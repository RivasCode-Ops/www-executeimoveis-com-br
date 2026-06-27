/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F5FDB',
          hover: '#0B4DB4',
          light: '#EFF6FF',
        },
        secondary: '#164E63',
        background: {
          DEFAULT: '#F8FAFC',
          soft: '#EFF6FF',
        },
        surface: '#FFFFFF',
        border: '#D9E2F1',
        text: {
          primary: '#0F172A',
          secondary: '#475569',
        },
        success: '#16A34A',
        accent: '#F59E0B',
        gold: {
          DEFAULT: '#C8A96E',
          light: '#E8D5A3',
          dark: '#A08040',
        },
      },
    },
  },
  plugins: [],
};