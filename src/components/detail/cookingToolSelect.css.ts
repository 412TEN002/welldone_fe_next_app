import { tv } from "tailwind-variants";

export const container = tv({
  base: ["grow", "mt-[24px]", "w-full", "flex", "items-end"],
});

export const layerGroup = tv({
  base: [
    "w-full",
    "flex",
    "flex-col",
    "items-center",
    "rounded-t-2xl",
    "bg-primaryInvert",
    "px-[18px]",
    "h-full",
    "max-h-[426px]",
  ],
});

export const title = tv({
  base: ["my-[26px]", "text-lg", "font-semibold", "text-primary"],
});

export const layer = tv({
  base: ["w-full", "grow", "relative", "overflow-scroll", "scroll-none"],
});

export const layerOverflow = tv({
  base: ["absolute", "inset-0", "w-full"],
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
