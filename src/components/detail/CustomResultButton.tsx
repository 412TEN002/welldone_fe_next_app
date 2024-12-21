"use client";

import { useRouter } from "next/navigation";
import { buttonBase } from "@/components/detail/cookingToolSelect";
import { useSelect } from "@/state/useTranslate";

type Props = {
  id: number;
  makeId: number;
  name: string;
  icon: string;
};

export default function CustomResultButton({ id, makeId, name, icon }: Props) {
  const router = useRouter();
  const { setSelect } = useSelect();

  const onResult = () => {
    setSelect(name, icon);

    router.push(`/timer/${id}/${makeId}`);
  };

  return (
    <button className={buttonBase({ class: "bg-primary" })} onClick={onResult}>
      완료
    </button>
  );
}
