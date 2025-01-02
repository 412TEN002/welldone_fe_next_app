"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
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

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      isNavigating.current = false;
    };
  }, []);

  return (
    <button className={buttonBase({ class: "bg-primary" })} onClick={onResult}>
      완료
    </button>
  );
}
