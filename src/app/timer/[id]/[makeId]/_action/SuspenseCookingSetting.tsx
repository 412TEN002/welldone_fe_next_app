import { ReactNode } from "react";
import { cookingSettingsOptions } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { getQueryClient } from "@/queryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

type Props = {
  children: ReactNode;

  id: number;
  makeId: number;
};

export default async function SuspenseCookingSettings({ id, makeId, children }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(cookingSettingsOptions(id, makeId));

  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
}
