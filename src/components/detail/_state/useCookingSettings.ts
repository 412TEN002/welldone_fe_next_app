import { useMemo } from "react";
import { getCookingSettings } from "@/components/detail/_lib/getCookingSettings";
import { useQuery } from "@tanstack/react-query";

type Props = {
  id: number;
  makeId: number;
};

export const getMake = (id: number) => {
  if (id === 1) return "pot";
  if (id === 2) return "oven";

  return "steamy";
};

export const getMakeId = (key: string) => {
  if (key === "pot") return 1;
  if (key === "oven") return 2;

  return 3;
};

export const getFire = (fire: number) => {
  if (fire <= 3) return "l";
  if (fire <= 6) return "m";

  return "h";
};

export const useCookingSettings = ({ id, makeId }: Props) => {
  const { data } = useQuery({
    queryKey: ["settings", id, makeId],
    queryFn: getCookingSettings,
  });

  const localData = useMemo(() => {
    if (!data)
      return {
        time: 0,
        tips: {
          w: "",
          p: "",
          e: "",
        },
        fire: "h",
      };

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
      fire: getFire(data.temperature),
    };
  }, [data]);
  console.log(data);

  return { localData };
};
