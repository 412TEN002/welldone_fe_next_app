import { tv } from "tailwind-variants";

export const container = tv({
  base: ["grow", "mt-[24px]", "w-full", "flex", "items-end"],
});

export const layerGroup = tv({
  base: ["w-full", "flex", "flex-col", "items-center", "rounded-t-2xl", "bg-primaryInvert", "px-[18px]"],
});

export const title = tv({
  base: ["my-[26px]", "text-lg", "font-semibold", "text-primary"],
});

export const layer = tv({
  base: ["w-full", "flex-1", "overflow-auto", "scroll-none"], // grow 대신 flex-1
});

export const layerOverflow = tv({
  base: ["w-full", "flex", "flex-col"], // absolute, inset-0 제거
});

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
      yes: ["bg-white", "border-[#DED8CF]"],
      no: ["border-primaryInvert"],
    },
  },
});
