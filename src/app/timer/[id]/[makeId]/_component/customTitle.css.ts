import { tv } from "tailwind-variants";

export const title = tv({
  base: ["font-bold", "text-[16px]"],
  variants: {
    color: {
      white: "text-[#F3EDE4]",
      black: "",
    },
  },
});
