/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5951A2",
        brand: {
          500: "#5951A2",
        },
      },
    },
  },
  plugins: [],
  // Enable RTL support
  future: {
    hoverOnlyWhenSupported: true,
  },
} 