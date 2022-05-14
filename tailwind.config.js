module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#152735",
        secondaryBackground: "#172e40",
        primaryText: "#cfd3d4",
        secondaryText: "#9eabb4",
        hoverBackground: "#17364a",
        primaryColor: "#40d3dc",
        hoverPrimary: "#3ac2ca",
        disabledBg: "#2d8287",
        // primaryText: "#d9d9d9",
        // secondaryText: "#6e767d",
      },
    },
    fontFamily: {
      inter: ["Inter"],
    },
  },
  plugins: [],
};
