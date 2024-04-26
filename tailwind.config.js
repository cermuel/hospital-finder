/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pry: "#737cde",
        "pry-light": "#bbbfee",
        dark: "#1F2025",
        light: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
