import { tv } from "tailwind-variants";

export const layer = tv({
  base: ["flex", "h-full", "w-full", "touch-none", "items-center", "justify-center", "overflow-hidden"],
});

export const loading = tv({
  base: ["animate-pulse", "text-white"],
});
