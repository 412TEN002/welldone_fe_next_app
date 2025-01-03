import * as MATTER from "matter-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CustomBody } from "@/components/home/animation";

type Props = {
  engine: MATTER.Engine;
  render: MATTER.Render | null;
};

export const useMouseAction = ({ engine, render }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!render) return;

    const pixelRatio = window.devicePixelRatio || 2;
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

    MATTER.Events.on(mouseConstraint, "mouseup", () => {
      // 드래그 중이 아니고, 마우스가 이동하지 않았을 때만 클릭으로 처리
      if (!hasMoved) {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < CLICK_DELAY) return;
        lastClickTime = currentTime;

        const rect = render.canvas.getBoundingClientRect();
        const adjustedMousePosition = {
          x: (mouse.position.x - rect.left) * pixelRatio,
          y: (mouse.position.y - rect.top) * pixelRatio,
        };

        const clickedBody = MATTER.Query.point(
          MATTER.Composite.allBodies(engine.world),
          adjustedMousePosition,
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
          const touch = e.touches[0];
          const rect = render.canvas.getBoundingClientRect();
          const adjustedTouchPosition = {
            x: (touch.clientX - rect.left) * pixelRatio,
            y: (touch.clientY - rect.top) * pixelRatio,
          };

          mouse.position.x = adjustedTouchPosition.x;
          mouse.position.y = adjustedTouchPosition.y;
          mouse.button = 0;

          e.preventDefault();
        },
        { passive: false },
      );

      render.canvas.addEventListener(
        "touchend",
        () => {
          mouse.button = -1; // 가상 클릭 해제
        },
        { passive: false },
      );
    }
  }, [render, engine]);
};
