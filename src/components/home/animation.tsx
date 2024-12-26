"use client";

import Matter from "matter-js";
import { useCallback, useEffect, useState } from "react";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: IntegrationType[];
}

export function HomeAnimation({ item }: AnimationProps) {
  const [sceneRef, setSceneRef] = useState<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const preloadImages = useCallback(async () => {
    const promises = item.map(({ home_icon_url, ...rest }) => {
      return new Promise<IntegrationType & { img: HTMLImageElement }>((resolve) => {
        const img = new Image();
        img.src = home_icon_url;
        img.onload = () => resolve({ ...rest, home_icon_url, img });
      });
    });
    setImagesLoaded(true);
    return await Promise.all(promises);
  }, [item]);

  useEffect(() => {
    if (!sceneRef) return;

    const { Engine, Render, Runner, Composite, Bodies, Common, Mouse, MouseConstraint, Events } = Matter;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Matter.js 엔진, 렌더, 러너 생성
    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: sceneRef,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "#3C3731",
        pixelRatio: window.devicePixelRatio || 2,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const initializeScene = (items: (IntegrationType & { img: HTMLImageElement })[]) => {
      Composite.add(
        world,
        items.map(({ img, id }) => {
          const x = Common.random(0, width);
          const y = Common.random(0, height);
          const body = Bodies.rectangle(x, y, img.width * 0.8, img.height * 0.8, {
            render: {
              sprite: {
                texture: img.src,
                xScale: 0.8,
                yScale: 0.8,
              },
            },
          });

          body.customId = id;
          return body;
        }),
      );

      const rectangleOptions = { isStatic: true, render: { visible: false } };
      Composite.add(world, [
        Bodies.rectangle(width / 2, 0, width, 10, rectangleOptions),
        Bodies.rectangle(width / 2, height, width, 20, rectangleOptions),
        Bodies.rectangle(width, height / 2, 10, height, rectangleOptions),
        Bodies.rectangle(0, height / 2, 10, height, rectangleOptions),
      ]);

      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Composite.add(world, mouseConstraint);
      render.mouse = mouse;

      Events.on(mouseConstraint, "mousedown", (event: any) => {
        const { mouse } = event;
        const bodies = Composite.allBodies(world);

        bodies.forEach((body: any) => {
          if (Matter.Bounds.contains(body.bounds, mouse.position)) {
            if (body.customId) {
              window.location.href = `/d/${body.customId}`;
            }
          }
        });
      });

      Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: width, y: height } });
    };

    preloadImages().then((items) => {
      initializeScene(items);
    });

    // 클린업
    return () => {
      if (render) {
        Render.stop(render);
        render.canvas.remove();
        render.textures = {};
      }
      if (runner) {
        Runner.stop(runner);
      }
      if (engine) {
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, [sceneRef, item]);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto" ref={setSceneRef}>
      {!imagesLoaded ? <p className="animate-pulse text-white">...로딩 중</p> : null}
    </div>
  );
}
