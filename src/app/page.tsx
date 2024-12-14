import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { HomeTemplate } from "../components/home/homeTemplate";
import { categoryOption } from "../query-options/category";
import { integrationOption } from "../query-options/integration";
import { getQueryClient } from "../queryClient";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(categoryOption);
  void queryClient.prefetchQuery(integrationOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeTemplate />
    </HydrationBoundary>
  );
}
