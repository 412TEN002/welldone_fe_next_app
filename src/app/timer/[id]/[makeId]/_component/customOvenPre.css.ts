import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["relative", "flex", "items-center", "justify-center"],
});

export const action = tv({
  base: ["absolute", "left-[-40px]", "bottom-[-60px]"],
});

export const icon = tv({
  base: ["absolute", "inset-0", "flex", "items-center", "justify-center", "z-30", "mr-[15px]"],
});
