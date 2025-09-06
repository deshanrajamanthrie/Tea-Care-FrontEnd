/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f4",
          100: "#dcf4e6",
          200: "#bae8d0",
          300: "#86d5b0",
          400: "#4aba87",
          500: "#22a066",
          600: "#00623A",
          700: "#0d5233",
          800: "#0f422a",
          900: "#0e3724",
        },
        tea: {
          50: "#f0f9f4",
          100: "#dcf4e6",
          200: "#bae8d0",
          300: "#86d5b0",
          400: "#4aba87",
          500: "#22a066",
          600: "#00623A",
          700: "#0d5233",
          800: "#0f422a",
          900: "#0e3724",
        },
        forest: {
          50: "#f0f9f4",
          100: "#dcf4e6",
          200: "#bae8d0",
          300: "#86d5b0",
          400: "#4aba87",
          500: "#22a066",
          600: "#00623A",
          700: "#0d5233",
          800: "#0f422a",
          900: "#0e3724",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
