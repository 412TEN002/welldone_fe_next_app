import { useMemo } from "react";
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getCookingSettings } from "../_lib/getCookingSettings";

type Props = {
  id: number;
  makeId: number;
};

export const getFire = (fire: number) => {
  if (fire <= 3) return "l";
  if (fire <= 6) return "m";

  return "h";
};

export const cookingSettingsOptions = (id: number, makeId: number) =>
  queryOptions({
    queryKey: ["settings", id, makeId],
    queryFn: getCookingSettings,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10 * 2,
  });

export const useCookingSettings = ({ id, makeId }: Props) => {
  const { data } = useSuspenseQuery(cookingSettingsOptions(id, makeId));

  const localData = useMemo(() => {
    let tips = {
      w: "",
      p: "",
      e: "",
    };

    data.tips.forEach((datum) => {
      if (datum.tip_type === "preparation") tips.w = datum.message;
      if (datum.tip_type === "cooking") tips.p = datum.message;

      if (datum.tip_type === "finishing") tips.e = datum.message;
    });

    return {
      time: data.cooking_time,
      tips: tips,
      fire: getFire(data.temperature) as "l" | "m" | "h",
      theme: data.color_theme as "white" | "black",
    };
  }, [data]);

  return { localData };
};
