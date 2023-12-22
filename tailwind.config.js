/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      "app-bg": "#faf8f5",
      "app-primary": "#03d47c",
      "app-text": "#002e22",
      "app-text-light": "#76847e",
      "app-border": "#ebe6df"
    },
  },
  plugins: [],
}

