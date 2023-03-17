/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "line-number": "#999",
        "editor-dark-mode": "#1e1e1e",
      },
    },
  },
  plugins: [],
};
