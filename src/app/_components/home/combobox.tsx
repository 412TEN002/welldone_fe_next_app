"use client";

import { useState } from "react";
import { useDebounce } from "react-use";
import { integrationSearchOption } from "@/app/_query-options/integration";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useSuspenseQuery } from "@tanstack/react-query";

export const HomeCombobox = () => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);
  useDebounce(() => setDebounceValue(value), 20, [value]);
  const { data } = useSuspenseQuery(integrationSearchOption(debounceValue));
  console.log(data);
  return (
    <Command className="gap-2">
      <CommandInput
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
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
        {Array.isArray(data) ? data.map(({ id, name }) => <CommandItem key={id}>{name}</CommandItem>) : null}
      </CommandList>
    </Command>
  );
};
