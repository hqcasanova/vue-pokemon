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
        '4.5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
