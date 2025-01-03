"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import CustomResultButton from "@/components/detail/CustomResultButton";
import { cookingToolOptions } from "@/query-options/cooking-tool";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as styles from "./cookingToolSelect.css";

export const buttonBase = tv({
  base: ["flex", "items-center", "justify-center", "py-[14px]", "text-white", "flex-grow", "rounded-lg"],
});

type Props = {
  id: number;
  name: string;
  icon: string;
};

export function CookingToolSelect(props: Props) {
  const { data } = useSuspenseQuery(cookingToolOptions);
  const [state, setState] = useState(() => data[0].id);
  const router = useRouter();

  const prefetchNextPage = useCallback(async () => {
    try {
      await Promise.all(data.map(({ id: makeId }) => router.prefetch(`/timer/${props.id}/${makeId}`)));
    } catch (error) {
      console.error("Prefetch failed:", error);
    }
  }, [data, props.id, router]);

  const onClickButton = (id: number) => () => {
    setState(id);
  };

  useEffect(() => {
    prefetchNextPage();
  }, [prefetchNextPage]);

  return (
    <div className={styles.container()}>
      <div className={styles.layerGroup()}>
        <span className={styles.title()}>조리도구를 선택해주세요.</span>
        <div className={styles.layer()}>
          <div className={styles.layerOverflow()}>
            {data.map(({ id, name, icon_url, description }) => (
              <button
                key={id}
                className={styles.button({ select: id === state ? "yes" : "no" })}
                onClick={onClickButton(id)}
              >
                <Image src={icon_url} width={68} height={45} alt={name} />
                <div className="flex flex-col items-start gap-[5px]">
                  <p className="font-bold text-primary">{name}</p>
                  <p className="text-left text-xs text-[#948C84]">{description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={"mb-[20px] mt-4 flex w-full gap-3"}>
          <button className={buttonBase({ class: "bg-[#88847E]" })} onClick={() => router.back()}>
            취소
          </button>
          <CustomResultButton makeId={state} {...props} />
        </div>
      </div>
    </div>
  );
}
