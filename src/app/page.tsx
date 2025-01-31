import { HomeTemplate } from "@/components/home/homeTemplate";
import { categoryOption } from "@/query-options/category";
import { cookingToolOptions } from "@/query-options/cooking-tool";
import { integrationOption } from "@/query-options/integration";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  const prefetchPromises = [
    queryClient.prefetchQuery(integrationOption),
    queryClient.prefetchQuery(categoryOption),
  ];

  try {
    await Promise.all(prefetchPromises);
  } catch (error) {
    console.error("Prefetch failed:", error);
  }

  // 초기 상태를 스냅샷으로 저장
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeTemplate />
    </HydrationBoundary>
  );
}
