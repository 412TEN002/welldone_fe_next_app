import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["relative", "flex", "justify-center", "min-h-[250px]"],
});

export const steamy = tv({
  base: ["absolute", "z-[1]"],
});

export const icon = tv({
  base: ["absolute", "top-[-20px]", "transform", "scale-150"],
});

export const fire = tv({
  base: ["absolute", "bottom-0"],
});
