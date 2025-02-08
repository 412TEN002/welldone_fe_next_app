import { tv } from "tailwind-variants";

export const container = tv({
  base: [
    "w-full",
    "h-[50px]",
    "bg-[#47423D]",
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
  base: ["text-[#C0BCB6]", "text-[14px]", "font-semibold"],
});

export const optionLayer = tv({
  base: ["absolute", "right-0", "left-0", "top-[50px]", "bg-[#47423D]", "rounded-b-[12px]", "z-[999]"],
});

export const innerOptionLayer = tv({
  base: [
    "mx-[16px]",
    "p-[20px]",
    "pt-[14px]",
    "flex",
    "flex-col",
    "border-t-[1px]",
    "border-[#DED8CF]",
    "border-opacity-10",
    "gap-[20px]",
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
  base: ["flex"],
});

export const comma = tv({
  base: ["min-w-[3px]", "h-[3px]", "bg-[#C0BCB6]", "rounded-full", "mr-[8px]", "ml-[10px]", "mt-[7px]"],
});

export const contentText = tv({
  base: ["text-[14px]", "font-regular", "text-[#C0BCB6]"],
});
