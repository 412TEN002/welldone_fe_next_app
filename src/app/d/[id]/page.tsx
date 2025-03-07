import { DetailTemplate } from "@/components/detail/detailTemplate";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailTemplate id={id} />
    </HydrationBoundary>
  );
}
