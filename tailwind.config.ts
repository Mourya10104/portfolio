import type { Config } from "tailwindcss";

// Design tokens mirror the :root variables in globals.css (ported from legacy/index.html).
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-dark": "var(--bg-dark)",
        text: "var(--text)",
        "text-light": "var(--text-light)",
        muted: "var(--muted)",
        "muted-light": "var(--muted-light)",
        accent: "var(--accent)",
        cyan: "var(--cyan)",
        line: "var(--line)",
        "line-dark": "var(--line-dark)",
      },
      fontFamily: {
        disp: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        hand: ["var(--font-covered-by-your-grace)", "cursive"],
      },
      keyframes: {
        spin360: { to: { transform: "rotate(360deg)" } },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "spin-slow": "spin360 20s linear infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
