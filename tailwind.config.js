/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        morro: ["Morro"],
        montserrat: ["Montserrat"],
      },
      colors: {
        bg: {
          DEFAULT: "#000",
        },
        text: {
          DEFAULT: "#fff",
        },
        primary: {
          DEFAULT: "#B268FF",
          faded: "#985CD688",

          50: "#EDDEFF",
          100: "#DCBEFF",
          200: "#CDA0FF",
          300: "#BF83FF",
          400: "#B268FF",
          500: "#A85EEC",
          600: "#9D54D9",
          700: "#924BC6",
          800: "#8741B3",
        },
        accent: {
          red: "#FF0000",
          green: "#008000",
          brightGreen: "#33FF74",
          blue: "#118DF0",
          orange: "#FFA500",
        },
      },

      animation: {
        "moving-bg": "movingBackground 8s ease infinite",
        "slow-panning": "infinitePanning 400s linear infinite",
        "slow-spin": "spin 10s linear infinite",
        "slow-spin-reverse": "spin 10s linear infinite reverse",
        "slow-slide": "moveUp 90s linear infinite",
        hover: "hover 3s ease infinite",
      },
      keyframes: {
        movingBackground: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        infinitePanning: {
          "0%": { transform: "translateX(-50%)" },
          // '50%':{transform: 'translateX(0%)'},
          "100%": { transform: "translateX(0%)" },
        },
        moveUp: {
          "0%": { transform: "translateY(%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        hover: {
          from: { transform: "translateY(0%)" },
          "50%": { transform: "translateY(5px)" },
        },
      },
      backgroundSize: {
        oversize: "200% 200%",
      },
      screens: {
        "2xl": { max: "2000px" },
        xl: { max: "1500px" },
        lg: { max: "985px" },
        md: { max: "889px" },
        sm: { max: "519px" },
        xs: { max: "459px" },
        "2xs": { max: "401px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
