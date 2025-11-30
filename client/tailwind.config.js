/** @type {import('tailwindcss').Config} */
const themeOptions = require('./theme-config.js')
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      ...themeOptions
    },
  },
  plugins: [],
}