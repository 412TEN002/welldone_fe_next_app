"use client";

import Image from "next/image";
import { integrationDetailOption } from "@/query-options/integration";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CookingToolSelect } from "./cookingToolSelect";

interface DetailTemplateProps {
  id: number;
}

export function DetailTemplate({ id }: DetailTemplateProps) {
  const { data } = useSuspenseQuery(integrationDetailOption(id));

  return (
    <div className={"flex h-full w-full flex-col items-center bg-primary"}>
      <Image width={164} height={164} src={data.icon_url} alt={data.name} className={"mt-9"} />
      <div className="mt-[22px] rounded-[40px] bg-white24 px-3 py-[6px] text-sm text-primaryInvert">
        {data.name}
      </div>
      <div className={"mt-[18px] flex gap-3 text-[#888582]"}>
        {data.nutrition_tags.map(({ id, name }) => (
          <p key={id}>#{name}</p>
        ))}
      </div>
      <CookingToolSelect id={data.id} name={data.name} icon={data.icon_url} />
    </div>
  );
}
