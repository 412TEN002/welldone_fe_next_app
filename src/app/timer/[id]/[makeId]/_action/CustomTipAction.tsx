"use client";

import CustomTip from "@/app/timer/[id]/[makeId]/_component/CustomTip";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomTipAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  return <CustomTip w={localData.tips.w} p={localData.tips.p} />;
}
