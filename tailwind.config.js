/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require('@iconify/tailwind');
const { iconsPlugin, dynamicIconsPlugin } = require('@egoist/tailwindcss-icons');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors(),iconsPlugin(), dynamicIconsPlugin()],
}