import { HomeTemplate } from "@/components/home/homeTemplate";
import { categoryOption } from "@/query-options/category";
import { cookingToolOptions } from "@/query-options/cooking-tool";
import { integrationOption } from "@/query-options/integration";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  );
}
