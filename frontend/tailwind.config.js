/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: "#EFE4C6",
          light: "#F7EFDA",
          dark: "#DCCB9E",
          burnt: "#CBB387",
        },
        maroon: {
          DEFAULT: "#5C1A1A",
          deep: "#350D0D",
          light: "#7A2A22",
          darker: "#240707",
        },
        walnut: {
          DEFAULT: "#241811",
          light: "#3B2A1D",
          dark: "#18100A",
        },
        brass: {
          DEFAULT: "#B8945A",
          light: "#D8BD82",
          dark: "#8A6B3B",
          antique: "#6E552F",
        },
        ink: {
          DEFAULT: "#2B231A",
          deep: "#1A140E",
        },
        sage: {
          DEFAULT: "#57624B",
          dark: "#3B4433",
        },
      },
      fontFamily: {
        gothic: ["var(--font-gothic)", "cursive"],
        display: ["var(--font-display)", "serif"],
        medieval: ["var(--font-medieval)", "serif"],
        body: ["var(--font-body)", "serif"],
        deva: ["var(--font-deva)", "serif"],
      },
      boxShadow: {
        frame: "0 0 0 2px #8F724D, 0 0 0 6px #2B2014, 0 0 0 10px #54412C, 0 25px 60px rgba(0,0,0,0.85)",
        insetParchment: "inset 0 0 50px rgba(45,26,12,0.65)",
      },
    },
  },
  plugins: [],
};
