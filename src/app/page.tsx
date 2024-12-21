import { HomeTemplate } from "@/components/home/homeTemplate";
import { categoryOption } from "@/query-options/category";
import { integrationOption } from "@/query-options/integration";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(categoryOption);
  await queryClient.prefetchQuery(integrationOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  );
}
