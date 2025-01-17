"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CloseButtonAction from "@/components/detail/_action/CloseButtonAction";
import ResultButtonAction from "@/components/detail/_action/ResultButtonAction";
import CustomAssetItem from "@/components/detail/_component/CustomAssetItem";
import * as styles from "./cookingToolSelect.css";

type Props = {
  id: number;
  name: string;
  icon: string;
  tools: { id: number; name: string; icon_url: string; description: string }[];
};

export function CookingToolSelect(props: Props) {
  const { container, layerGroup, layer, layerOverflow, title, resultLayer } = styles.cooking();

  const [state, setState] = useState(() => props.tools[0].id);
  const router = useRouter();

  const prefetchNextPage = useCallback(async () => {
    try {
      await Promise.all(props.tools.map(({ id: makeId }) => router.prefetch(`/timer/${props.id}/${makeId}`)));
    } catch (error) {
      console.error("Prefetch failed:", error);
    }
  }, [props.tools, props.id, router]);

  const onClickButton = (id: number) => () => {
    setState(id);
  };

  useEffect(() => {
    prefetchNextPage();
  }, [prefetchNextPage]);

  return (
    <div className={container()}>
      <div className={layerGroup()}>
        <span className={title()}>조리도구를 선택해주세요.</span>
        <div className={layer()}>
          <div className={layerOverflow()}>
            {props.tools.map(({ id, name, icon_url, description }) => (
              <CustomAssetItem
                key={id}
                name={name}
                description={description}
                image={icon_url}
                onClick={onClickButton(id)}
                isSelect={id === state}
              />
            ))}
          </div>
        </div>
        <div className={resultLayer()}>
          <CloseButtonAction />
          <ResultButtonAction makeId={state} {...props} />
        </div>
      </div>
    </div>
  );
}
