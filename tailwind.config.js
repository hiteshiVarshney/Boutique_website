/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f5f3',
          100: '#e9e7e2',
          200: '#d3cfc6',
          300: '#b3aca0',
          400: '#8e8576',
          500: '#6f6657',
          600: '#564e42',
          700: '#3e382f',
          800: '#272320',
          900: '#15110f',
        },
        rose: {
          50: '#fbf4f2',
          100: '#f7e9e4',
          200: '#eed3ca',
          300: '#e0b3a3',
          400: '#cd8b73',
          500: '#b86a4f',
          600: '#a25640',
          700: '#854536',
          800: '#6b3a30',
          900: '#5a322b',
        },
        gold: {
          50: '#fbf8ef',
          100: '#f6efda',
          200: '#ecdcad',
          300: '#dfc27b',
          400: '#d4a94f',
          500: '#c89438',
          600: '#a8782e',
          700: '#855b29',
          800: '#6e4926',
          900: '#5f3e23',
        },
        sage: {
          50: '#f4f6f2',
          100: '#e6ebe0',
          200: '#ccd8c1',
          300: '#a7bb98',
          400: '#7e9a6b',
          500: '#5e7c4c',
          600: '#475f39',
          700: '#384c30',
          800: '#2d3c27',
          900: '#222d1e',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
