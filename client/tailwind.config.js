/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2874f0", // Flipkart blue-ish
        secondary: "#fb641b", // Flipkart orange-ish
        background: "#f1f3f6", // Light gray background
      }
    },
  },
  plugins: [],
}
