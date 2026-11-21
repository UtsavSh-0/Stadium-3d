/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stadium-red': '#8B1A1A',
        'stadium-blue': '#1A4B8B',
        'stadium-charcoal': '#1a1a1a',
        'stadium-orange': '#ff6b35',
      },
    },
  },
  plugins: [],
}