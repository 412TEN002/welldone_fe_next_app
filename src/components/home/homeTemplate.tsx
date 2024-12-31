"use client";

import isNil from "lodash-es/isNil";
import { useMemo, useState } from "react";
import FilterIcon from "@/assets/icon/filter.svg";
import { integrationOption } from "@/query-options/integration";
import * as Dialog from "@radix-ui/react-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HomeAnimation } from "./animation";
import { HomeCombobox } from "./combobox";
import { HomeFilter } from "./filter";

export function HomeTemplate() {
  const { data: integrationData } = useSuspenseQuery(integrationOption);

  const [filterId, setFilterId] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteringData = useMemo(() => {
    if (isNil(filterId)) {
      return integrationData;
    }
    return integrationData.filter((item) => Number(item.category_id) === Number(filterId));
  }, [integrationData, filterId]);

  const handleFilterChange = (newFilterId: number | null) => {
    setFilterId(newFilterId);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="h-full w-full bg-primary">
        <div className="absolute flex w-full gap-2 p-5">
          <HomeCombobox />
          <Dialog.Trigger className="h-[40px] rounded-[10px] bg-secondary p-2">
            <FilterIcon />
          </Dialog.Trigger>
        </div>
        <HomeAnimation item={filteringData} />
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <HomeFilter
          filterId={filterId}
          onFilterIdChange={handleFilterChange}
          onClose={() => setIsOpen(false)}
        />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
