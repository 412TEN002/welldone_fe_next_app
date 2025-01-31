"use client";

import Matter from "matter-js";
import { useEffect, useState } from "react";
import { useAsset } from "@/components/home/_state/useAsset";
import { useBoundary } from "@/components/home/_state/useBoundary";
import { useMouseAction } from "@/components/home/_state/useMouseAction";
import { useRunner } from "@/components/home/_state/useRunner";
import { usePrefetch } from "@/hooks/usePrefetch";
import { IntegrationType } from "@/query-options/integration";
import * as styles from "./animation.css";

interface AnimationProps {
  item: IntegrationType[];
}

export interface CustomBody extends Matter.Body {
  customId?: string;
}

export function HomeAnimation({ item }: AnimationProps) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  usePrefetch(item);

  const { engine, render, width, height } = useRunner({ target: containerRef });
  useBoundary({ engine, width, height });
  useMouseAction({ render, engine });
  const { isLoading } = useAsset({ asset: item, engine, width, height });

  return (
    <div className={styles.layer()} ref={setContainerRef}>
      {isLoading ? <p className={styles.loading()}>로딩 중...</p> : null}
    </div>
  );
}
