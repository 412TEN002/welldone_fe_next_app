import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["relative", "flex", "items-center", "justify-center"],
});

export const action = tv({
  base: ["absolute", "left-[-52px]", "bottom-[-60px]"],
});

export const icon = tv({
  base: ["absolute", "inset-0", "flex", "items-center", "justify-center", "z-10", "mr-[15px]"],
});
