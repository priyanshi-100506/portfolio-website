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
        ink: "#06070a",
        graphite: "#10131a",
        panel: "#151923",
        line: "rgba(255,255,255,0.12)",
        mist: "#c9d2dc",
        pearl: "#f4f7fb",
        cyan: "#64e4ff",
        iris: "#a78bfa",
        brass: "#d7b46a",
        signal: "#7df9c2"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(100, 228, 255, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
