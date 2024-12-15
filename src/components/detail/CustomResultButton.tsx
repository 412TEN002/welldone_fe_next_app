"use client";

import { useRouter } from "next/navigation";
import { getMake, useCookingSettings } from "@/components/detail/_state/useCookingSettings";
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

  const { localData } = useCookingSettings({ id: id, makeId: makeId });

  const onResult = () => {
    setSelect(name, icon, localData.time, localData.tips, getMake(makeId), localData.fire as "l" | "m" | "h");

    router.push("/timer/i");
  };

  return (
    <button className={buttonBase({ class: "bg-primary" })} onClick={onResult}>
      완료
    </button>
  );
}
