import * as MATTER from "matter-js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CustomBody } from "@/components/home/animation";

type Props = {
  target: HTMLDivElement | null;
};

export const useRunner = ({ target }: Props) => {
  const router = useRouter();

  const [render, setRender] = useState<MATTER.Render | null>(null);
  const runner = useRef(MATTER.Runner.create());
  const engine = useRef(MATTER.Engine.create());

  const len = useMemo(() => {
    if (!target)
      return {
        width: 0,
        height: 0,
      };

    return {
      width: target.offsetWidth,
      height: target.offsetHeight,
    };
  }, [target?.offsetWidth, target?.offsetHeight]);

  useEffect(() => {
    if (!target || len.width === 0 || len.height === 0) return;

    const render = MATTER.Render.create({
      element: target,
      engine: engine.current,
      options: {
        width: len.width,
        height: len.height,
        wireframes: false,
        background: "#3c3731",
        pixelRatio: window.devicePixelRatio || 2,
        showSleeping: false,
      },
    });

    engine.current.world.gravity.scale = 0.0016;
    engine.current.world.gravity.y = 0.7;

    setRender(render);
    MATTER.Render.run(render);
    MATTER.Runner.run(runner.current, engine.current);

    MATTER.Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: len.width, y: len.height },
    });

    MATTER.Events.on(engine, "beforeUpdate", () => {
      MATTER.Composite.allBodies(engine.current.world).forEach((body) => {
        body.velocity.x = Math.max(Math.min(body.velocity.x, 10), -10);
        body.velocity.y = Math.max(Math.min(body.velocity.y, 10), -10);
      });
    });

    const mouse = MATTER.Mouse.create(render.canvas);
    const mouseConstraint = MATTER.MouseConstraint.create(engine.current, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
        damping: 0.5,
      },
    });

    MATTER.Composite.add(engine.current.world, mouseConstraint);
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
          MATTER.Composite.allBodies(engine.current.world),
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

    return () => {
      MATTER.Render.stop(render);
      MATTER.Runner.stop(runner.current);
      MATTER.Engine.clear(engine.current);
      MATTER.Composite.clear(engine.current.world, false);

      render.canvas.remove();
      render.textures = {};
    };
  }, [target, len]);

  return { render, engine: engine.current, runner: runner.current, width: len.width, height: len.height };
};
