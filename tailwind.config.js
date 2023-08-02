/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        nMb: '425px'
      },
      height: {
        viewport: 'calc(100vh - 1px)',
      },
    },
  },
  plugins: [],
}

