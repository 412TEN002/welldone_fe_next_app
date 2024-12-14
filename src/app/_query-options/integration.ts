import { queryOptions } from "@tanstack/react-query";
import { CategoryType } from "./category";

export interface IntegrationType extends Omit<CategoryType, "description"> {
  category: CategoryType;
}

export const integrationOption = queryOptions({
  queryKey: ["integration"],
  queryFn: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients/`);
    const data: IntegrationType[] = await response.json();
    return data;
  },
});

export const integrationSearchOption = (keyword: string) =>
  queryOptions({
    queryKey: ["integration", keyword],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients/search?keyword=${keyword}&limit=3`,
        );
        const data: IntegrationType[] = await response.json();
        return data;
      } catch (_) {
        return [];
      }
    },
  });
