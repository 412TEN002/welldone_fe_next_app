import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

export default withTV({
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        primary: "#3C3731",
        secondary: "#47423D",
        placeholder: "rgba(255,255,255,0.3)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config);
