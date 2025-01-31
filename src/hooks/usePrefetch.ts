import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IntegrationType } from "@/query-options/integration";

export const usePrefetch = (items: IntegrationType[]) => {
  const router = useRouter();

  useEffect(() => {
    // 모든 가능한 경로를 prefetch
    const prefetchRoutes = () => {
      items.forEach((item) => {
        router.prefetch(`/d/${item.id}`);
      });
    };

    // 첫 로드 시 모든 경로 prefetch
    prefetchRoutes();

    // 선택적: 주기적으로 prefetch 갱신
    const interval = setInterval(prefetchRoutes, 5 * 60 * 1000); // 5분마다 갱신

    return () => clearInterval(interval);
  }, [items, router]);
};
