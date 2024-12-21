"use client";

import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useSelect } from "@/state/useTranslate";
import CustomTitle from "../_component/CustomTitle";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomTitleAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  const { name } = useSelect();

  return <CustomTitle name={name} theme={localData.theme} />;
}
