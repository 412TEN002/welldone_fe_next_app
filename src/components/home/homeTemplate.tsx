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
  const [overlayType, setOverlayType] = useState<"search" | "filter" | null>(null);

  const filteringData = useMemo(() => {
    if (isNil(filterId)) {
      return integrationData;
    }
    return integrationData.filter((item) => Number(item.category_id) === Number(filterId));
  }, [integrationData, filterId]);

  const handleFilterChange = (newFilterId: number | null) => {
    setFilterId(newFilterId);
  };

  const closeOverlay = () => setOverlayType(null);

  const MemoizedHomeAnimation = useMemo(() => {
    return <HomeAnimation item={filteringData} />;
  }, [filteringData]);

  return (
    <div className="relative h-full w-full bg-primary">
      {overlayType && <div className="fixed inset-0 z-10 bg-overlay" onClick={closeOverlay} />}

      <div className="absolute z-20 flex w-full gap-2 p-5">
        <HomeCombobox
          isSearchOpen={overlayType === "search"}
          setSearchOpen={(isOpen) => setOverlayType(isOpen ? "search" : null)}
        />
        <Dialog.Root
          open={overlayType === "filter"}
          onOpenChange={(isOpen) => setOverlayType(isOpen ? "filter" : null)}
        >
          <Dialog.Trigger className="h-[40px] rounded-[10px] bg-secondary p-2">
            <FilterIcon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <HomeFilter filterId={filterId} onFilterIdChange={handleFilterChange} />
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      {MemoizedHomeAnimation}
    </div>
  );
}
