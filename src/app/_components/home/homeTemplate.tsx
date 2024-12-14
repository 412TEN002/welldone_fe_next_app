"use client";

import { useMemo, useState } from "react";
import { integrationOption } from "@/app/_query-options/integration";
import FilterIcon from "@/assets/icon/filter.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HomeAnimation } from "./animation";
import { HomeCombobox } from "./combobox";
import { HomeFilter } from "./filter";

export default function HomeTemplate() {
  const { data } = useSuspenseQuery(integrationOption);
  const [filterId, setFilterId] = useState<null | number>(null);

  const filteringData = useMemo(() => {}, [filterId]);
  return (
    <Dialog.Root>
      <div className="h-full w-full bg-primary">
        <div className="flex gap-2 p-5">
          <HomeCombobox />
          <Dialog.Trigger className="h-[40px] rounded-[10px] bg-secondary p-2">
            <FilterIcon />
          </Dialog.Trigger>
        </div>
        <HomeAnimation />
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <HomeFilter filterId={filterId} onFilterIdChange={(fid) => setFilterId(fid)} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
