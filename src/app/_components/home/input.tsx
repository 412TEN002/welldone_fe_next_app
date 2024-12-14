"use client";

import { useState } from "react";
import { useDebounce } from "react-use";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const HomeCombobox = () => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);
  useDebounce(() => setDebounceValue(value), 20, [value]);
  console.log(value);
  return (
    <Command className="gap-2">
      <CommandInput
        value={value}
        onValueChange={(s) => setValue(s)}
        onReset={() => setValue("")}
        placeholder="조리할 채소를 검색해보세요"
      />

      <CommandList className="bg-tertiary">
        {value.length > 0 ? (
          <CommandEmpty className="text-white15">
            <div className="px-4 py-[14px]">검색 결과가 없어요</div>
            <div className="h-[1px] w-full bg-white15" />
            <div className="flex items-center justify-center px-4 py-[14px]">
              <button className="rounded-[28px] border-[1px] border-white15 px-[14px] py-2">{`'${value}' 추가 요청하기`}</button>
            </div>
          </CommandEmpty>
        ) : null}
        {value.length > 0 ? (
          <>
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </>
        ) : null}
      </CommandList>
    </Command>
  );
};
