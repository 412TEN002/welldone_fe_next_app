import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import CustomButton from "@/components/detail/_component/CustomButton";
import { useSelect } from "@/state/useTranslate";

type Props = {
  id: number;
  makeId: number;
  name: string;
  icon: string;
};

export default function ResultButtonAction({ id, makeId, name, icon }: Props) {
  const router = useRouter();
  const { setSelect } = useSelect();
  const isNavigating = useRef(false);

  const onResult = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    setSelect(name, icon);

    // 마이크로태스크 큐를 사용하여 라우팅 최적화
    queueMicrotask(() => {
      router.push(`/timer/${id}/${makeId}`);
    });
  }, [id, makeId, name, icon, router, setSelect]);

  useEffect(() => {
    return () => {
      isNavigating.current = false;
    };
  }, []);

  return <CustomButton text="완료" className="bg-primary" onClick={onResult} />;
}
