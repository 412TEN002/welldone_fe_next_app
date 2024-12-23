import { tv } from "tailwind-variants";

export const container = tv({
  base: ["grid", "grid-cols-2", "grid-rows-3", "gap-[4px]"],
});

export const rows = tv({
  base: ["row-span-3"],
});

export const leftLayer = tv({
  base: [
    "px-[24px]",
    "py-[2px]",
    "font-semibold",
    "text-[14px]",
    "text-[#51453E]",
    "flex",
    "items-center",
    "justify-around",
    "rounded-[2px]",
  ],
  variants: {
    bg: {
      head: "bg-[#E5DED4]",
      body: "bg-[#EDD8D0]",
    },
  },
});

export const rightLayer = tv({
  base: [
    "px-[12px]",
    "py-[2px]",
    "font-semibold",
    "text-[14px]",
    "text-[#51453E]",
    "flex",
    "items-center",
    "justify-center",
    "rounded-[2px]",
  ],
  variants: {
    bg: {
      head: "bg-[#E5DED4]",
      body: "bg-[#EFDFCA]",
    },
  },
});
