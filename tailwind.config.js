/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        tile: {
          cream: "#F5F0E8",
          sand: "#E8DCC8",
          clay: "#C4956A",
          charcoal: "#2C2C2C",
          slate: "#4A5568",
          accent: "#8B6914",
          light: "#FAF8F5",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        tilegallery: {
          primary: "#8B6914",
          "primary-content": "#ffffff",
          secondary: "#C4956A",
          "secondary-content": "#ffffff",
          accent: "#2C2C2C",
          "accent-content": "#F5F0E8",
          neutral: "#4A5568",
          "base-100": "#FAF8F5",
          "base-200": "#F5F0E8",
          "base-300": "#E8DCC8",
          "base-content": "#2C2C2C",
        },
      },
    ],
  },
};
