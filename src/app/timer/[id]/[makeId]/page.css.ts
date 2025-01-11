import { tv } from "tailwind-variants";

export const section = tv({
  base: ["flex", "flex-col", "items-center", "min-h-screen", "h-full"],
  variants: {
    bg: {
      white: "bg-[#3C3731]",
      black: "bg-[#FBF8F2]",
    },
  },
});

export const hgroup = tv({
  base: ["min-h-[60px]", "flex", "items-center", "justify-center", "relative", "w-full"],
});

export const backLayer = tv({
  base: ["absolute", "left-[16px]"],
});

export const tipLayer = tv({
  base: ["px-[16px]", "w-full"],
});

export const timerLayer = tv({
  base: ["mt-[33px]"],
});

export const makeLayer = tv({
  base: ["mt-[40px]", "w-full"],
});

export const fireInfoLayer = tv({
  base: ["absolute", "bottom-[130px]", "w-full", "flex", "justify-center"],
});

export const buttonLayer = tv({
  base: ["absolute", "bottom-[40px]", "gap-[12px]", "flex"],
});
