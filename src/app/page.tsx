import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import HomeTemplate from "./_components/home/homeTemplate";
import { categoryOption } from "./_query-options/category";
import { integrationOption } from "./_query-options/integration";
import { getQueryClient } from "./queryClient";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(categoryOption);
  void queryClient.prefetchQuery(integrationOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  );
}
