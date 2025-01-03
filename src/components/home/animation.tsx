"use client";

import Matter from "matter-js";
import * as MATTER from "matter-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  // useMouseAction({ render, engine });
  const { isLoading } = useAsset({ asset: item, engine, width, height });

  const router = useRouter();

  useEffect(() => {
    if (!render) return;

    const mouse = MATTER.Mouse.create(render.canvas);
    const mouseConstraint = MATTER.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
        damping: 0.5,
      },
    });

    MATTER.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    let hasMoved = false;

    MATTER.Events.on(mouseConstraint, "mousedown", () => {
      hasMoved = false;
    });

    MATTER.Events.on(mouseConstraint, "mousemove", () => {
      if (mouseConstraint.body) {
        hasMoved = true;
      }
    });

    let lastClickTime = 0;
    const CLICK_DELAY = 300; // 더블 클릭 방지를 위한 딜레이

    MATTER.Events.on(mouseConstraint, "mouseup", (event: any) => {
      // 드래그 중이 아니고, 마우스가 이동하지 않았을 때만 클릭으로 처리
      if (!hasMoved) {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < CLICK_DELAY) return;
        lastClickTime = currentTime;

        const { mouse } = event;

        const clickedBody = MATTER.Query.point(
          MATTER.Composite.allBodies(engine.world),
          mouse.position,
        )[0] as CustomBody;
        if (clickedBody?.customId) {
          router.push(`/d/${clickedBody.customId}`);
        }
      }
    });

    // 터치 이벤트에 대한 추가 최적화
    if ("ontouchstart" in window) {
      render.canvas.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
        },
        { passive: false },
      );
    }
  }, [render, engine, width, height, item]);

  return (
    <div
      className="flex h-full w-full touch-none items-center justify-center overflow-hidden"
      ref={setContainerRef}
    >
      {isLoading ? <p className="animate-pulse text-white">...로딩 중</p> : null}
    </div>
  );
}
