import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["h-full"],
});

export const content = tv({
  base: [
    "fixed",
    "bottom-0",
    "left-0",
    "right-0",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "px-[20px]",
    "pt-[22px]",
    "rounded-t-2xl",
    "bg-primaryInvert",
  ],
});

export const hgroup = tv({
  base: ["flex", "items-center", "justify-between", "w-full"],
});

export const assetLayer = tv({
  base: ["grid", "grid-cols-3", "w-full", "gap-3", "py-[20px]"],
});
