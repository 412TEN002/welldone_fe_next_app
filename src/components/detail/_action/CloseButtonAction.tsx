"use client";

import { useRouter } from "next/navigation";
import CustomButton from "@/components/detail/_component/CustomButton";

export default function CloseButtonAction() {
  const router = useRouter();

  const onClickClose = () => {
    router.back();
  };

  return <CustomButton onClick={onClickClose} text="취소" className="w-full bg-[#88847E]" />;
}
