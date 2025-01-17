import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "px-[10px]",
    "py-[18px]",
    "rounded-lg",
    "gap-[10px]",
    "w-full",
    "flex",
    "border-[1px]",
    "transition-all",
  ],
  variants: {
    select: {
      on: ["bg-white", "border-[#DED8CF]"],
      off: ["border-primaryInvert"],
    },
  },
});

export const text = tv({
  slots: {
    layer: ["flex", "flex-col", "items-start", "gap-[5px]"],
    name: ["font-bold", "text-primary"],
    description: ["text-left", "text-xs", "text-[#948C84]"],
  },
});
