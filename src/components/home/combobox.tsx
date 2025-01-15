import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDebounce } from "react-use";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useOutsideRef } from "@/hooks/useOutsideRef";
import { integrationSearchOption, useIngredientAddMutation } from "@/query-options/integration";
import { useQuery } from "@tanstack/react-query";

export const HomeCombobox = ({
  isSearchOpen,
  setSearchOpen,
}: {
  isSearchOpen: boolean;
  setSearchOpen: (_: boolean) => void;
}) => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);
  useDebounce(() => setDebounceValue(value), 20, [value]);

  const { data } = useQuery(integrationSearchOption(debounceValue));
  const { ref, setOpen, open } = useOutsideRef<HTMLDivElement>();

  const { mutate, isPending, isSuccess, reset } = useIngredientAddMutation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchOpen(false);
    }
  };

  return (
    <div className="relative w-full">
      <Command
        ref={ref}
        className="relative z-20 gap-2"
        onFocus={() => {
          setOpen(true);
          setSearchOpen(true);
        }}
      >
        <CommandInput
          value={value}
          onChange={({ target }) => {
            if (isSuccess) {
              reset();
            }
            setValue(target.value);
          }}
          onReset={() => setValue("")}
          onKeyDown={handleKeyDown}
          placeholder="조리할 채소를 검색해보세요"
        />
        {open && (
          <CommandList className="bg-tertiary">
            {value.length > 0 ? (
              <CommandEmpty className="min-h-[110px] text-white opacity-15">
                <div className="px-4 py-[14px]">검색 결과가 없어요</div>
                <div className="h-[1px] w-full bg-white" />
                <div className="flex items-center justify-center px-4 py-[14px]">
                  {isPending ? (
                    <div>...로딩 중</div>
                  ) : isSuccess ? (
                    <div className="text-sm">요청 완료! 조금만 기다려주세요</div>
                  ) : (
                    <button
                      className="rounded-[28px] border-[1px] border-white px-[14px] py-2"
                      onClick={() => mutate(value)}
                    >{`'${value}' 추가 요청하기`}</button>
                  )}
                </div>
              </CommandEmpty>
            ) : null}
            {Array.isArray(data)
              ? data.map(({ id, name, icon_url }) => (
                  <Link key={id} href={`/d/${id}`}>
                    <CommandItem className="flex items-center gap-2">
                      <Image width={20} height={20} alt={name} src={icon_url} />
                      {name}
                    </CommandItem>
                  </Link>
                ))
              : null}
          </CommandList>
        )}
      </Command>
    </div>
  );
};
