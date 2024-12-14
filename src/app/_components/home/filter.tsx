import { categoryOption } from "@/app/_query-options/category";
import Refresh from "@/assets/icon/refresh.svg";
import * as Dialog from "@radix-ui/react-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";

interface HomeFilterProps {
  filterId: number | null;
  onFilterIdChange: (_: HomeFilterProps["filterId"]) => void;
}

export function HomeFilter({ filterId }: HomeFilterProps) {
  const { data } = useSuspenseQuery(categoryOption);

  return (
    <Dialog.Content className="fixed bottom-0 flex w-dvw flex-col items-center justify-center gap-[2px] rounded-t-2xl bg-primaryInvert">
      <div className="flex w-full justify-between px-[20px] pt-[22px]">
        <Refresh />
        <Dialog.Close>적용</Dialog.Close>
      </div>
      <Dialog.Title className="text-[18px] font-semibold text-primary">
        식재료 종류를 선택해주세요
      </Dialog.Title>
      <div className="grid-cols-3 gap-3 p-[18px] pb-[46px]">
        {data.map(({ id, name }) => (
          <div key={id} className={id === filterId ? "bg-tabInvert text-tab" : "bg-tab text-tabInvert"}>
            {name}
          </div>
        ))}
      </div>
    </Dialog.Content>
  );
}
