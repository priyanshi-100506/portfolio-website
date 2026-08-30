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
        ink: "#0f080b",
        graphite: "#180f13",
        panel: "#22141a",
        line: "rgba(226, 180, 189, 0.22)",
        mist: "#e0cbd0",
        pearl: "rgb(255, 245, 245)",
        blush: "rgb(247, 214, 208)",
        rose: "rgb(226, 180, 189)",
        cyan: "rgb(247, 214, 208)",
        iris: "rgb(226, 180, 189)",
        brass: "rgb(247, 214, 208)",
        signal: "rgb(226, 180, 189)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(226, 180, 189, 0.22)",
        card: "0 8px 32px 0 rgba(226, 180, 189, 0.1)"
      }
    }
  },
  plugins: []
};

export default config;
