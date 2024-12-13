"use client";

import CustomTitle from "@/app/timer/@popup/(.)i/feedback/_component/CustomTitle";
import { useFeedback } from "@/state/useTranslate";

export default function CustomTitleAction() {
  const name = useFeedback((state) => state.name);

  return <CustomTitle name={name} />;
}
