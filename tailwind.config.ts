import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#A64D78",
          light: "#C4789A",
          muted: "#F0E0E8",
          pale: "#FAF0F4",
        },
        ink: {
          DEFAULT: "#1C1917",
          muted: "#6B6463",
          faint: "#A8A09C",
        },
        canvas: {
          DEFAULT: "#FAF8F6",
          alt: "#F2EEE9",
          rule: "#E5DDD8",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
