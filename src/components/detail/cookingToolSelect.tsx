"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tv } from "tailwind-variants";
import CustomResultButton from "@/components/detail/CustomResultButton";
import { cookingToolOptions } from "@/query-options/cooking-tool";
import { useSuspenseQuery } from "@tanstack/react-query";

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

  const { back } = useRouter();

  return (
    <div className="fixed bottom-0 flex w-full flex-col items-center rounded-t-2xl bg-primaryInvert px-[18px]">
      <span className="my-[26px] text-lg font-semibold text-primary">조리도구를 선택해주세요.</span>
      <div className="flex w-full flex-col">
        {data.map(({ id, name, icon_url, description }) => (
          <button
            key={id}
            className={clsx(
              "flex w-full gap-10 rounded-lg px-[10px] py-[18px]",
              id === state && "border-toolSelect bg-white",
            )}
            onClick={() => {
              console.log(state);
              setState(id);
            }}
          >
            <Image src={icon_url} width={68} height={45} alt={name} />
            <div className="flex flex-col items-start gap-[5px]">
              <p className="font-bold text-primary">{name}</p>
              <p className="text-xs text-[#948C84]">{description}</p>
            </div>
          </button>
        ))}
      </div>
      <div className={"mb-[30px] flex w-full gap-3"}>
        <button className={buttonBase({ class: "bg-[#88847E]" })} onClick={back}>
          취소
        </button>
        <CustomResultButton makeId={state} {...props} />
      </div>
    </div>
  );
}
