/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    transitionDuration: {
      DEFAULT: '300ms',
    },

    extend: {
      colors: {
        white: '#FFF',
        'lightest-grey': '#F1F5F9',
        grey: '#7d8592',
        black: '#0F172A',

        primary: '#FBBF24',
        'light-primary': '#FDE68A',
        'dark-primary': '#D97706',
        secondary: '#F1F5FA',
        'light-secondary': '#F8FAFC',
        'dark-secondary': '#94A3B8',
        'darker-secondary': '#7689A4',

        liked: '#EF4444',
      },

      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },

      fontSize: {
        default: '20px',
        'title-xl': '3.1rem',
        title: '2.4rem',
      },

      keyframes: {
        loading: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      animation: {
        loading: 'loading 1.5s cubic-bezier(0.2, 0.5, 0.4, 0.7) 0.1s infinite',
      },
    },
  },
  plugins: [],
};
