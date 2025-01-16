"use client";

import CustomAssetItem from "@/app/@dialog/(.)filter/_component/CustomAssetItem";
import { categoryOption } from "@/query-options/category";
import { useHomeFilter } from "@/state/useTranslate";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function CustomAssetAction() {
  const { data } = useSuspenseQuery(categoryOption);

  const { selectCategoryId, setSelectCategoryId } = useHomeFilter();

  const onClickItem = (id: number) => () => {
    if (selectCategoryId === id) setSelectCategoryId(null);
    else setSelectCategoryId(id);
  };

  return (
    <>
      {data.map((datum) => (
        <CustomAssetItem
          key={datum.id}
          image={datum.icon_url}
          name={datum.name}
          isSelect={selectCategoryId === datum.id}
          onClick={onClickItem(datum.id)}
        />
      ))}
    </>
  );
}
