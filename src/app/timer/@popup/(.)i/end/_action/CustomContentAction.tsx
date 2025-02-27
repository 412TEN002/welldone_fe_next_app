"use client";

import CustomContent from "@/app/timer/@popup/(.)i/end/_component/CustomContent";
import { useSelect } from "@/state/useTranslate";

export default function CustomContentAction() {
  const { eTip } = useSelect();

  return <CustomContent content={eTip} />;
}
