import { tv } from "tailwind-variants";

export const item = tv({
  base: [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "gap-[14px]",
    "rounded-lg",
    "py-[25px]",
    "font-bold",
    "transition-all",
    "duration-200",
  ],
  variants: {
    select: {
      off: ["bg-tabInvert", "text-primary"],
      on: ["bg-tab", "text-primaryInvert"],
    },
  },
  defaultVariants: {
    select: "off",
  },
});
