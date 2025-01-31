"use client";

import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";
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
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  usePrefetch(item);

  const { engine, render, width, height } = useRunner({
    target: containerRef,
    onEngineCreate: (e) => (engineRef.current = e),
    onRenderCreate: (r) => (renderRef.current = r),
  });

  useBoundary({ engine, width, height });
  useMouseAction({ render, engine });
  const { isLoading } = useAsset({ asset: item, engine, width, height });

  useEffect(() => {
    return () => {
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
        Matter.Composite.clear(engineRef.current.world, false);
      }
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.textures = {};
      }
    };
  }, []);

  // Force cleanup on visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (engineRef.current) {
          Matter.Engine.clear(engineRef.current);
          Matter.Composite.clear(engineRef.current.world, false);
        }
        if (renderRef.current) {
          Matter.Render.stop(renderRef.current);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className={styles.layer()} ref={setContainerRef}>
      {isLoading ? <p className={styles.loading()}>로딩 중...</p> : null}
    </div>
  );
}
