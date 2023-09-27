import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        blue: "var(--blue)",
        "blue-2": "var(--blue2)",
        "blue-3": "var(--blue3)",
        red: "var(--red)",
        "red-2": "var(--red2)",
        "white-0": "var(--white0)",
        gold: "var(--gold)",
        "red-1": "var(--red1)",
      },
      screens: {
        "2500px": { max: "2500px" },
        "1920px": { max: "1920px" },
        "1550px": { max: "1550px" },
        "1366px": { max: "1366px" },
        "1280px": { max: "1280px" },
        "1024px": { max: "1024px" },
        "820px": { max: "820px" },
        "640px": { max: "640px" },
        "480px": { max: "480px" },
        "390px": { max: "390px" },
        "375px": { max: "375px" },
        "320px": { max: "320px" },
      },
    },
  },
  plugins: [],
};
export default config;
