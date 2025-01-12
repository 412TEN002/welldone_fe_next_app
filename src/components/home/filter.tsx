import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import Refresh from "@/assets/icon/refresh.svg";
import { categoryOption } from "@/query-options/category";
import * as Dialog from "@radix-ui/react-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";

interface HomeFilterProps {
  filterId: number | null;
  onFilterIdChange: (_: HomeFilterProps["filterId"]) => void;
}

export function HomeFilter({ filterId, onFilterIdChange }: HomeFilterProps) {
  const { data } = useSuspenseQuery(categoryOption);
  const [currentId, setId] = useState(filterId);

  const handleApply = () => {
    onFilterIdChange(currentId);
  };

  const handleReset = () => {
    setId(null);
    onFilterIdChange(null);
  };

  return (
    <Dialog.Content className="fixed bottom-0 z-30 flex w-dvw flex-col items-center justify-center gap-[2px] rounded-t-2xl bg-primaryInvert">
      <div className="flex w-full justify-between px-[20px] pt-[22px]">
        <button onClick={handleReset} className="focus:outline-none">
          <Refresh />
        </button>
        <Dialog.Close asChild>
          <button onClick={handleApply} className="font-semibold text-primary focus:outline-none">
            적용
          </button>
        </Dialog.Close>
      </div>
      <Dialog.Title className="text-[18px] font-semibold text-primary">
        식재료 종류를 선택해주세요
      </Dialog.Title>
      <div className="grid w-full grid-cols-3 gap-3 p-[18px] pb-[46px]">
        {data.map(({ id, name, icon_url }) => (
          <button
            key={id}
            className={clsx(
              "flex flex-col items-center justify-center gap-[14px] rounded-lg py-[25px] font-bold",
              id !== currentId ? "bg-tabInvert text-primary" : "bg-tab text-primaryInvert",
            )}
            onClick={() => setId(id)}
          >
            <Image alt={name} width={30} height={30} src={icon_url} />
            {name}
          </button>
        ))}
      </div>
    </Dialog.Content>
  );
}
