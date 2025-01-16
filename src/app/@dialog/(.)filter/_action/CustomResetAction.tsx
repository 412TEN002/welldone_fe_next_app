"use client";

import { useRouter } from "next/navigation";
import Refresh from "@/assets/icon/refresh.svg";
import { useHomeFilter } from "@/state/useTranslate";

export default function CustomResetAction() {
  const router = useRouter();

  const { setSelectCategoryId, setCategoryId } = useHomeFilter();

  const onClickReset = () => {
    setCategoryId(null);
    setSelectCategoryId(null);

    router.back();
  };

  return (
    <span role="button" tabIndex={0} onClick={onClickReset}>
      <Refresh />
    </span>
  );
}
