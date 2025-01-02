import * as MATTER from "matter-js";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  target: HTMLDivElement | null;
};

export const useRunner = ({ target }: Props) => {
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

    engine.current.world.gravity.scale = 0.0008;
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
