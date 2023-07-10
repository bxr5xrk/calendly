/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {
      gridTemplateRows: {
        autoFr: 'auto 1fr',
      },
    },
  },
  plugins: [],
};
