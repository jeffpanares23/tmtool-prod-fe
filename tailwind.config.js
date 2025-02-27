module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Include all Vue files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Example: Custom color
        secondary: "#F59E0B",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as default sans font
      },
    },
  },
  fontFamily: {
    sans: ["Inter", "sans-serif"],
  },
  plugins: [],
};
