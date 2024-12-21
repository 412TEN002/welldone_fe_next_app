import { tv } from "tailwind-variants";

export const button = tv({
  base: ["outline-none", "border-none", "rounded-[24px]", "h-[80px]", "px-[30px]", "bg-[#3C3731]"],
  variants: {
    bg: {
      white: "bg-[#F3EDE4]",
      black: "bg-[#3C3731]",
    },
  },
});
