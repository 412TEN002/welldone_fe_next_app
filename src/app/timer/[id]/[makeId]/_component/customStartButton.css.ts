import { tv } from "tailwind-variants";

export const button = tv({
  base: ["outline-none", "border-none", "rounded-[24px]", "h-[80px]", "w-auto", "px-[52px]"],
  variants: {
    bg: {
      white: "bg-[#F3EDE4]",
      black: "bg-[#3C3731]",
    },
  },
});
