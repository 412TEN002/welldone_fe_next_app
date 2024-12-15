import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["relative", "flex", "justify-center", "min-h-[200px]", "w-[200px]"],
});

export const pot = tv({
  base: ["absolute", "z-[1]"],
});

export const icon = tv({
  base: ["absolute", "top-[-40px]", "left-0", "right-0", "bottom-[120px]"],
});

export const fire = tv({
  base: ["absolute", "bottom-0", "z-[2]"],
});
