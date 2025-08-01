/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae2ff',
          300: '#7cc7ff',
          400: '#3ab0ff',
          500: '#0090ff',
          600: '#006fd4',
          700: '#0057a8',
          800: '#004687',
          900: '#003666',
        }
      }
    },
  },
  plugins: [],
}