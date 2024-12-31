import { tv } from "tailwind-variants";

export const textGroup = tv({
  base: ["flex", "gap-[4px]", "items-center", "text-[14px]", "font-semibold"],
  variants: {
    color: {
      white: "text-[#F3EDE4]",
      black: "text-[#51453E]",
    },
  },
});
