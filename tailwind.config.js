/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
