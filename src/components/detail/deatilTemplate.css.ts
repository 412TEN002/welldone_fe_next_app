import { tv } from "tailwind-variants";

export const container = tv({
  base: ["flex", "flex-col", "items-center", "bg-primary", "h-full", "relative"],
});

export const asset = tv({
  base: ["relative", "w-[160px]", "min-h-[160px]", "mt-[38px]"],
});
