/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');

module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
    theme: {
      extend: {},
    },
    plugins: [addDynamicIconSelectors()],
  }