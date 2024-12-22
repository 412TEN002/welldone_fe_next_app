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

// const HomeAnimation = dynamic(async () => (await import("./animation")).HomeAnimation, { ssr: false });
export function HomeTemplate() {
  const { data } = useSuspenseQuery(integrationOption);
  const [filterId, setFilterId] = useState<null | number>(null);

  const filteringData = useMemo(
    () => (isNil(filterId) ? data : data.filter(({ category_id }) => category_id === filterId)),
    [data],
  );

  return (
    <Dialog.Root>
      <div className="h-full w-full bg-primary">
        <div className="absolute flex w-full gap-2 p-5">
          <HomeCombobox />
          <Dialog.Trigger className="h-[40px] rounded-[10px] bg-secondary p-2">
            <FilterIcon />
          </Dialog.Trigger>
        </div>
        <HomeAnimation item={filteringData} />
        {/* <HomeFixedImage item={filteringData} /> */}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <HomeFilter filterId={filterId} onFilterIdChange={(fid) => setFilterId(fid)} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
