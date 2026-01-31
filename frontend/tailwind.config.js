/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'SF Pro Text',
          'Helvetica Neue',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          50: '#F0F0F8',
          100: '#E0E0F1',
          200: '#C1C1E3',
          300: '#9393D0',
          400: '#6464BD',
          500: '#06063D',
          600: '#050536',
          700: '#040430',
          800: '#030329',
          900: '#020220',
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          light: 'rgba(255, 255, 255, 0.15)',
          medium: 'rgba(255, 255, 255, 0.25)',
        },
        apple: {
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F7',
            200: '#E8E8ED',
            300: '#D2D2D7',
            400: '#B0B0B5',
            500: '#86868B',
            600: '#6E6E73',
            700: '#515154',
            800: '#3A3A3C',
            900: '#1D1D1F',
          },
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#AF52DE',
          pink: '#FF2D55',
          teal: '#5AC8FA',
          indigo: '#5856D6',
        },
      },
      boxShadow: {
        'apple-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'apple': '0 2px 8px 0 rgba(0, 0, 0, 0.08), 0 1px 4px 0 rgba(0, 0, 0, 0.05)',
        'apple-lg': '0 4px 16px 0 rgba(0, 0, 0, 0.1), 0 2px 8px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        'apple': '40px',
      },
    },
  },
  plugins: [],
}
