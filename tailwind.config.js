module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d9bf0",
        primaryText: "#d9d9d9",
        secondaryText: "#6e767d",
      },
    },
    fontFamily: {
      inter: ["Inter"],
    },
  },
  plugins: [],
};
