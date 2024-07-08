const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      brand: '#0B2176', // Purple
      highlight: '#F15A29', // Orange
      core: '#FFFFFF',  // White
      utility: '#929292', // Grey
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("daisyui"),
    require('tailwindcss-rtl')
  ],
};
