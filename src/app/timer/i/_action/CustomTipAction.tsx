"use client";

import { TipAccordion } from "@/components/ui/tipAccordion";
import { useSelect } from "@/state/useTranslate";

export default function CustomTipAction() {
  const { tip } = useSelect();

  return <TipAccordion trimTip={tip.w} cookingTip={tip.p} className={"top-[50px] px-4"} />;
}
