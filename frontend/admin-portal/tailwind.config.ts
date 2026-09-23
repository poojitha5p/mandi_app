import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#1A1614",
        charcoal2: "#26201D",
        bone: "#F6F1E7",
        boneDim: "#EDE6D8",
        oxblood: "#7A1F1F",
        oxbloodDeep: "#5C1616",
        ember: "#D8542A",
        slate: "#4B4540",
        slateLight: "#8A8178",
        line: "#DED4C3",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        sm: "3px",
        md: "5px",
      },
    },
  },
  plugins: [],
};

export default config;
