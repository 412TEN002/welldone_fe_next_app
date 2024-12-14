"use client";

import Image from "next/image";
import Link from "next/link";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { integrationSearchOption } from "@/query-options/integration";
import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";

export const HomeCombobox = () => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);
  useDebounce(() => setDebounceValue(value), 20, [value]);

  const { data } = useQuery(integrationSearchOption(debounceValue));
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open, ref]);

  return (
    <Command ref={ref} className="gap-2">
      <CommandInput
        value={value}
        onChange={({ target: { value } }) => setValue(value)}
        onFocus={() => {
          setOpen(true);
        }}
        onReset={() => setValue("")}
        placeholder="조리할 채소를 검색해보세요"
      />
      {open && (
        <CommandList className="bg-tertiary">
          {value.length > 0 ? (
            <CommandEmpty className="text-white15">
              <Dialog.Title className="px-4 py-[14px]">검색 결과가 없어요</Dialog.Title>
              <div className="h-[1px] w-full bg-white15" />
              <div className="flex items-center justify-center px-4 py-[14px]">
                <button className="rounded-[28px] border-[1px] border-white15 px-[14px] py-2">{`'${value}' 추가 요청하기`}</button>
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
  );
};
