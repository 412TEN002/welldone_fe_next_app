import { DetailTemplate } from "@/components/detail/detailTemplate";
import { cookingToolOptions } from "@/query-options/cooking-tool";
import { integrationDetailOption } from "@/query-options/integration";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(integrationDetailOption(id));
  await queryClient.prefetchQuery(cookingToolOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailTemplate id={id} />
    </HydrationBoundary>
  );
}
