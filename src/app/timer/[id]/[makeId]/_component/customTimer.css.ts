import { tv } from "tailwind-variants";

export const timer = tv({
  base: ["font-medium", "text-[72px]"],
  variants: {
    color: {
      white: "text-[#F3EDE4]",
      black: "text-[#3C3731]",
    },
  },
});
