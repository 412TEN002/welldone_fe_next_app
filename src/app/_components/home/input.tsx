"use client";

import { useState } from "react";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export const HomeCombobox = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Command>
        <CommandInput
          value={value}
          onValueChange={(s) => setValue(s)}
          onReset={() => setValue("")}
          placeholder="조리할 채소를 검색해보세요"
        />
        <CommandList>
          <CommandEmpty>검색 결과가 없어요</CommandEmpty>
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandList>
      </Command>
    </>
  );
};
