const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0B2176', // Purple
        highlight: '#F15A29', // Orange
        core: '#FFFFFF',  // White
        utility: '#929292', // Grey
        sideNavBG: '#E4E7EA',
        sideNavHighlight: '#D0D6E7',
        headingDark: '#595959',
        textDark: '#505152',
        textLight: '#929292',
        textBlue: '#7890E1',
        progressBad: '#F4470E',
        progressAverage: '#F6B757',
        progressGood: '#8BCB7B',
        progressBasic: '#93A4E0',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    require("daisyui"),
    require('tailwindcss-rtl'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "progress-bad": "#F4470E",
          "progress-average": "#F6B757",
          "progress-good": "#8BCB7B",
          "progress-basic": "#93A4E0",
        },
      },
    ],
  },
};
