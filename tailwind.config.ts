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
        white30: "rgba(255,255,255,0.3)",
        primary: "#3C3731",
        primaryInvert: "#FBF8F2",
        secondary: "#47423D",
        secondaryInvert: "#C0BCB6",
        tab: "#39352F",
        tabInvert: "#F3EDE4",
        tertiary: "#34312E",
        overlay: "rgba(0,0,0,0.6)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(tab|tabInvert)_bg/,
    },
    {
      pattern: /text-(tab|tabInvert)_text/,
    },
  ],
  plugins: [require("tailwindcss-animate")],
} satisfies Config);
