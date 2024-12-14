import { queryOptions } from "@tanstack/react-query";

export interface CategoryType {
  id: number;
  name: string;
  description: string;
  icon_key: string;
  icon_urls: {};
}
export const categoryOption = queryOptions({
  queryKey: ["category"],
  queryFn: async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories/`);
    const data: CategoryType[] = await response.json();
    return data;
  },
});
