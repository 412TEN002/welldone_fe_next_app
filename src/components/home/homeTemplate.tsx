"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import FilterIcon from "@/assets/icon/filter.svg";
import CustomOverlay from "@/components/overlay/CustomOverlay";
import { integrationOption } from "@/query-options/integration";
import { useHomeFilter } from "@/state/useTranslate";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HomeAnimation } from "./animation";
import { HomeCombobox } from "./combobox";

export function HomeTemplate() {
  const router = useRouter();

  const { data: integrationData } = useSuspenseQuery(integrationOption);

  const [open, setOpen] = useState(false);
  const categoryId = useHomeFilter((state) => state.categoryId);

  const filteringData = useMemo(() => {
    if (!categoryId) return integrationData;

    return integrationData.filter((item) => Number(item.category_id) === Number(categoryId));
  }, [integrationData, categoryId]);

  const onTrackableOpen = (state: boolean) => {
    setOpen(state);
  };

  const onClickFilter = () => {
    router.push("/filter");
  };

  return (
    <div className="relative h-full w-full bg-primary">
      <AnimatePresence>
        {open && <CustomOverlay onClickOverlay={() => onTrackableOpen(false)} />}
      </AnimatePresence>

      <div className="absolute z-30 flex w-full gap-2 p-5">
        <HomeCombobox onTrackable={onTrackableOpen} />
        <span
          tabIndex={0}
          role="button"
          className="h-[40px] rounded-[10px] bg-secondary p-2"
          onClick={onClickFilter}
        >
          <FilterIcon />
        </span>
      </div>
      <HomeAnimation item={filteringData} />
    </div>
  );
}
