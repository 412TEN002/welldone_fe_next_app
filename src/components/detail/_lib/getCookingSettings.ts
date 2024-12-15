import { QueryFunction } from "@tanstack/react-query";

export type CookingSettingsResponseTypes = {
  id: number;
  temperature: number;
  cooking_time: number;
  color_theme: string;
  tips: {
    tip_type: string;
    message: string;
  }[];
};

export const getCookingSettings: QueryFunction<
  CookingSettingsResponseTypes,
  [_1: string, id: number, makeId: number]
> = async ({ queryKey }) => {
  const [_1, id, makeId] = queryKey;

  const params = new URLSearchParams({
    ingredient_id: `${id}`,
    cooking_tool_id: `${makeId}`,
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cooking-settings?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
