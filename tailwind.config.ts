import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

export default withTV({
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        white15: "rgba(255,255,255,0.15)",
        white24: "rgba(255,255,255,0.24)",
        white30: "rgba(255,255,255,0.3)",
        primary: "#3C3731",
        primaryInvert: "#FBF8F2",
        secondary: "#47423D",
        secondaryInvert: "#C0BCB6",
        tab: "#39352F",
        tabInvert: "#F3EDE4",
        tertiary: "#34312E",
        overlay: "rgba(0,0,0,0.6)",
        toolSelect: "#DED8CF",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(tab|tabInvert)/,
    },
    {
      pattern: /text-(primary|primaryInvert)/,
    },
    {
      pattern: /border-(toolSelect)/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config);
