import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#120a0d",
        graphite: "#1c1216",
        panel: "#26191f",
        line: "rgba(226, 180, 189, 0.2)",
        mist: "#d8c4c8",
        pearl: "rgb(255, 245, 245)",
        blush: "rgb(247, 214, 208)",
        rose: "rgb(226, 180, 189)",
        cyan: "rgb(247, 214, 208)",
        iris: "rgb(226, 180, 189)",
        brass: "rgb(247, 214, 208)",
        signal: "rgb(226, 180, 189)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(226, 180, 189, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
