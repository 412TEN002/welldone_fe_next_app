import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

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
      if (keyword.length === 0) return [];
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ingredients/search?keyword=${keyword}&limit=3`,
        );
        const data: IntegrationType[] = await response.json();
        return data;
      } catch (e) {
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

export function useIngredientAddMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/feedback/ingredient-request-feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 요청 본문 형식을 지정
        },
        body: JSON.stringify({ comment }),
      }),
    onSuccess: (_, comment) => {
      queryClient.cancelQueries(integrationSearchOption(comment));
    },
  });
}
