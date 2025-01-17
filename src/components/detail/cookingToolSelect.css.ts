import { tv } from "tailwind-variants";

export const cooking = tv({
  slots: {
    container: ["grow", "mt-[24px]", "w-full", "flex", "items-end"],
    layerGroup: [
      "w-full",
      "flex",
      "flex-col",
      "items-center",
      "rounded-t-2xl",
      "bg-primaryInvert",
      "px-[18px]",
    ],
    title: ["my-[26px]", "text-lg", "font-semibold", "text-primary"],
    layer: ["w-full", "flex-1", "overflow-auto", "scroll-none"],
    layerOverflow: ["w-full", "flex", "flex-col"],
    resultLayer: ["mb-[20px]", "mt-4", "flex", "w-full", "gap-3"],
  },
});
