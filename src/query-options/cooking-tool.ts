import { queryOptions } from "@tanstack/react-query";

interface CookingToolType {
  id: number;
  name: string;
  description: string;
  icon_url: string;
}

export const cookingToolOptions = queryOptions({
  queryKey: ["cooking-tool"],
  queryFn: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cooking-tools/`);
    const data: CookingToolType[] = await response.json();
    return data;
  },
});
