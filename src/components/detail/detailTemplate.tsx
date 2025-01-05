"use client";

import Image from "next/image";
import BackButtonAction from "@/components/detail/_action/BackButtonAction";
import { integrationDetailOption } from "@/query-options/integration";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CookingToolSelect } from "./cookingToolSelect";
import * as styles from "./deatilTemplate.css";

interface DetailTemplateProps {
  id: number;
}

export function DetailTemplate({ id }: DetailTemplateProps) {
  const { data } = useSuspenseQuery(integrationDetailOption(id));

  return (
    <section className={styles.container()}>
      <BackButtonAction />
      <article className={styles.asset()}>
        <Image layout="fill" objectFit="contain" src={data.icon_url} alt={data.name} />
      </article>
      <div className="mt-[22px] rounded-[40px] bg-white24 px-3 py-[6px] text-sm text-primaryInvert">
        {data.name}
      </div>
      <div className={"mt-[18px] flex gap-3 text-[#888582]"}>
        {data.nutrition_tags.map(({ id, name }) => (
          <p key={id}>#{name}</p>
        ))}
      </div>
      <CookingToolSelect
        id={data.id}
        name={data.name}
        icon={data.icon_url}
        tools={data.available_cooking_tools}
      />
    </section>
  );
}
