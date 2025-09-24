/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#CBB26A", // ton or (ajuste si besoin)
          dark: "#A8934F",
          light: "#E5D7A3",
        },
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
