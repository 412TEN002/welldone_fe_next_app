"use client";

import { useState } from "react";
import FilterIcon from "@/assets/icon/filter.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { HomeAnimation } from "./animation";
import { HomeFilter } from "./filter";
import { HomeCombobox } from "./input";

export default function HomeTemplate() {
  // const { data } = useSuspenseQuery(integrationOption);
  const [filterId, setFilterId] = useState<null | number>(null);

  return (
    <Dialog.Root>
      <div className="h-full w-full bg-primary">
        <div className="flex gap-2 p-5">
          <HomeCombobox />
          <Dialog.Trigger className="h-[40px] rounded-[10px] bg-secondary p-2">
            <FilterIcon />
          </Dialog.Trigger>
        </div>
        <HomeAnimation />s
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-overlay" />
        <HomeFilter filterId={filterId} onFilterIdChange={(fid) => setFilterId(fid)} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
