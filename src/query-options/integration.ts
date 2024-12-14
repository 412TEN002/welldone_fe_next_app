import { queryOptions } from "@tanstack/react-query";

export interface IntegrationType {
  id: number;
  name: string;
  category_id: number;
  color_theme: "black" | "white";
  home_icon_url: string;
  icon_url: string;
  nutrition_tags: { id: number; name: string; description: string }[];
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

export const integrationDetailOption = (id: number) =>
  queryOptions({
    queryKey: ["integration", id],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients/${id}`);
      const data: IntegrationType = await response.json();
      return data;
    },
  });
