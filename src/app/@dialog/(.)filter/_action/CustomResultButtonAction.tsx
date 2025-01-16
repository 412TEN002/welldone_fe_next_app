"use client";

import { useRouter } from "next/navigation";
import CustomResultButton from "@/app/@dialog/(.)filter/_component/CustomResultButton";
import { useHomeFilter } from "@/state/useTranslate";

export default function CustomResultButtonAction() {
  const router = useRouter();
  const { selectCategoryId, setCategoryId } = useHomeFilter();

  const onClickResult = () => {
    setCategoryId(selectCategoryId);

    router.back();
  };

  return <CustomResultButton onClick={onClickResult} />;
}
