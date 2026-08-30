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
        ink: "#12060f",
        plum: "#12060f",
        "plum-dark": "#0c030a",
        "plum-surface": "#1a0816",
        "plum-panel": "#200b1c",
        magenta: "#ff4fa3",
        "magenta-glow": "rgba(255, 79, 163, 0.4)",
        "magenta-dark": "#8b1d5c",
        "retro-text": "#f5e9f0",
        "retro-dim": "#c2a9ba",
        graphite: "#180f13",
        panel: "#22141a",
        line: "rgba(255, 79, 163, 0.25)",
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
        vt323: ["var(--font-vt323)", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        retro: "4px 4px 0px rgba(0, 0, 0, 0.8)",
        "retro-lg": "6px 6px 0px rgba(0, 0, 0, 0.9)",
        "retro-magenta": "4px 4px 0px #ff4fa3",
        glow: "0 0 40px rgba(255, 79, 163, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
