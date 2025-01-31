import * as MATTER from "matter-js";
import { useEffect, useMemo, useRef, useState } from "react";

type RunnerProps = {
  target: HTMLDivElement | null;
  onEngineCreate?: (engine: MATTER.Engine) => void;
  onRenderCreate?: (render: MATTER.Render) => void;
};

export const useRunner = ({ target, onEngineCreate, onRenderCreate }: RunnerProps) => {
  const [render, setRender] = useState<MATTER.Render | null>(null);
  const runner = useRef(MATTER.Runner.create());
  const engine = useRef(MATTER.Engine.create({ enableSleeping: true }));
  const isInitialized = useRef(false);

  const len = useMemo(() => {
    if (!target) return { width: 0, height: 0 };
    return {
      width: target.clientWidth,
      height: target.clientHeight,
    };
  }, [target?.clientWidth, target?.clientHeight]);

  useEffect(() => {
    if (!target || len.width === 0 || len.height === 0 || isInitialized.current) return;

    const render = MATTER.Render.create({
      element: target,
      engine: engine.current,
      options: {
        width: len.width,
        height: len.height * 1.8,
        wireframes: false,
        background: "#3c3731",
        pixelRatio: window.devicePixelRatio || 2,
        showSleeping: false,
      },
    });

    engine.current.world.gravity.scale = 0.002;
    engine.current.world.gravity.y = 0.9;

    onEngineCreate?.(engine.current);
    onRenderCreate?.(render);

    setRender(render);
    MATTER.Render.run(render);
    MATTER.Runner.run(runner.current, engine.current);

    MATTER.Render.lookAt(render, {
      min: { x: 0, y: len.height * 0.8 },
      max: { x: len.width, y: len.height * 1.8 },
    });

    const updateEvent = MATTER.Events.on(engine.current, "beforeUpdate", () => {
      MATTER.Composite.allBodies(engine.current.world).forEach((body) => {
        body.velocity.x = Math.max(Math.min(body.velocity.x, 10), -10);
        body.velocity.y = Math.max(Math.min(body.velocity.y, 10), -10);
      });
    });

    isInitialized.current = true;

    return () => {
      MATTER.Events.off(engine.current, "beforeUpdate", updateEvent);
      MATTER.Render.stop(render);
      MATTER.Runner.stop(runner.current);
      MATTER.Engine.clear(engine.current);
      MATTER.Composite.clear(engine.current.world, false);
      render.canvas.remove();
      render.textures = {};
      isInitialized.current = false;
    };
  }, [target, len, onEngineCreate, onRenderCreate]);

  // Reset on window resize
  useEffect(() => {
    const handleResize = () => {
      if (render && engine.current) {
        isInitialized.current = false;
        MATTER.Render.stop(render);
        MATTER.Runner.stop(runner.current);
        MATTER.Engine.clear(engine.current);
        MATTER.Composite.clear(engine.current.world, false);
        render.canvas.remove();
        render.textures = {};
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [render]);

  return {
    render,
    engine: engine.current,
    runner: runner.current,
    width: len.width,
    height: len.height,
  };
};
