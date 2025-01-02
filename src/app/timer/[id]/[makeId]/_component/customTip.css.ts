import { tv } from "tailwind-variants";

export const container = tv({
  base: [
    "w-full",
    "h-[50px]",
    "bg-[#F3EDE4]",
    "flex",
    "items-center",
    "relative",
    "px-[16px]",
    "gap-[8px]",
    "transition-all",
    "duration-300",
  ],
  variants: {
    rounded: {
      open: "rounded-t-[12px]",
      close: "rounded-[12px]",
    },
  },
});

export const arrow = tv({
  base: ["absolute", "right-[16px]"],
});

export const mainText = tv({
  base: ["text-[#51453E]", "text-[14px]", "font-semibold"],
});

export const optionLayer = tv({
  base: [
    "absolute",
    "right-0",
    "left-0",
    "top-[50px]",
    "bg-[#F3EDE4]",
    "p-[20px]",
    "pt-[14px]",
    "border-t",
    "border-[#DED8CF]",
    "rounded-b-[12px]",
  ],
});

export const layer = tv({
  base: ["flex", "flex-col", "gap-[10px]"],
});

export const label = tv({
  base: [
    "w-fit",
    "bg-[#E5DED4]",
    "px-2",
    "py-[3px]",
    "rounded-[32px]",
    "text-[14px]",
    "font-medium",
    "text-[#51453E]",
  ],
});

export const content = tv({
  base: [
    "text-[14px]",
    "font-regular",
    "text-[#51453E]",
    "relative",
    "pl-[1.5em]",
    "before:content-['.']",
    "before:left-0",
    "before:text-[#51453E]",
    "before:top-[0.15em]",
  ],
});
