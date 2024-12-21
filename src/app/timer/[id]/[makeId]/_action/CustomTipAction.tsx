"use client";

import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { TipAccordion } from "@/components/ui/tipAccordion";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomTipAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  return (
    <TipAccordion trimTip={localData.tips.w} cookingTip={localData.tips.p} className={"top-[50px] px-4"} />
  );
}
