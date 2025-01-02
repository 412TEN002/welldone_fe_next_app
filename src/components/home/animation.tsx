"use client";

import Matter from "matter-js";
import { useState } from "react";
import { useAsset } from "@/components/home/_state/useAsset";
import { useBoundary } from "@/components/home/_state/useBoundary";
import { useMouseAction } from "@/components/home/_state/useMouseAction";
import { useRunner } from "@/components/home/_state/useRunner";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: IntegrationType[];
}

export interface CustomBody extends Matter.Body {
  customId?: string;
}

export function HomeAnimation({ item }: AnimationProps) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const { engine, render, width, height } = useRunner({ target: containerRef });
  useBoundary({ engine, width, height });
  useMouseAction({ render, engine });
  const { isLoading } = useAsset({ asset: item, engine, width, height });

  return (
    <div
      className="flex h-full w-full touch-none items-center justify-center overflow-hidden"
      ref={setContainerRef}
    >
      {isLoading ? <p className="animate-pulse text-white">...로딩 중</p> : null}
    </div>
  );
}
