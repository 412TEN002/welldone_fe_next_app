import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useOutsideRef } from "@/hooks/useOutsideRef";
import { integrationSearchOption, useIngredientAddMutation } from "@/query-options/integration";
import { useQuery } from "@tanstack/react-query";

type Props = {
  onTrackable?: (state: boolean) => void;
};

export const HomeCombobox = ({ onTrackable }: Props) => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState(value);
  useDebounce(() => setDebounceValue(value), 20, [value]);

  const { data } = useQuery(integrationSearchOption(debounceValue));
  const { ref, setOpen, open } = useOutsideRef<HTMLDivElement>();

  const { mutate, isPending, isSuccess, reset } = useIngredientAddMutation();

  // 정확한 검색어 매칭 결과가 있는지 확인
  const hasExactMatch = React.useMemo(() => {
    if (!Array.isArray(data) || !value) return false;
    return data.some((item) => item.name === value);
  }, [data, value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onTrackable) onTrackable(false);
  };

  const onFocus = () => {
    setOpen(true);
    if (onTrackable) onTrackable(true);
  };

  const MotionCommandList = motion(CommandList);

  // 검색 결과와 추가 요청 버튼을 함께 표시
  const renderResults = () => {
    return (
      <MotionCommandList
        className="bg-tertiary"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* 검색 결과 표시 */}
        {Array.isArray(data) &&
          data.map(({ id, name, icon_url }) => (
            <Link key={id} href={`/d/${id}`}>
              <CommandItem className="flex items-center gap-2">
                <Image width={20} height={20} alt={name} src={icon_url} />
                {name}
              </CommandItem>
            </Link>
          ))}

        {/* 검색 결과가 없을 때 메시지 */}
        {value.length > 0 && (!Array.isArray(data) || data.length === 0) && (
          <CommandEmpty className="text-white opacity-30">
            <div className="px-4 py-[14px]">검색 결과가 없어요</div>
          </CommandEmpty>
        )}

        {/* 정확한 매칭이 없을 때 추가 요청 섹션 표시 */}
        {value.length > 0 && !hasExactMatch && (
          <>
            <div className="h-[1px] w-full bg-white opacity-30" />
            <div className="flex items-center justify-center px-4 py-[10px] text-white opacity-30">
              {isPending ? (
                <div>...로딩 중</div>
              ) : isSuccess ? (
                <div className="text-sm">요청 완료! 조금만 기다려주세요</div>
              ) : (
                <button
                  className="rounded-[28px] border-[1px] border-white px-[14px] py-2 text-sm"
                  onClick={() => mutate(value)}
                >{`'${value}' 추가 요청하기`}</button>
              )}
            </div>
          </>
        )}
      </MotionCommandList>
    );
  };

  return (
    <div className="relative w-full">
      <Command ref={ref} className="relative z-20 gap-2" onFocus={onFocus}>
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
        <AnimatePresence>{open && renderResults()}</AnimatePresence>
      </Command>
    </div>
  );
};
