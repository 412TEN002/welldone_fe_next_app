"use client";

import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: IntegrationType[];
}

interface CustomBody extends Matter.Body {
  customId?: string;
}

export function HomeAnimation({ item }: AnimationProps) {
  const [sceneRef, setSceneRef] = useState<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const router = useRouter();

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
    const engine = Engine.create({
      enableSleeping: true,
    });
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
        showSleeping: false,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const initializeScene = (items: (IntegrationType & { img: HTMLImageElement })[]) => {
      items.forEach(({ img, id }) => {
        const x = Common.random(0, width);
        const y = Common.random(0, height);
        const body = Bodies.rectangle(x, y, img.width * 0.65, img.height * 0.65, {
          render: {
            sprite: {
              texture: img.src,
              xScale: 0.7,
              yScale: 0.7,
            },
          },
        });

        (body as any).customId = id;
        return Composite.add(world, body);
      });

      const rectangleOptions = {
        isStatic: true,
        render: { visible: false },
      };
      Composite.add(world, [
        Bodies.rectangle(width / 2, 0, width, 10, rectangleOptions),
        Bodies.rectangle(width / 2, height, width, 20, rectangleOptions),
        Bodies.rectangle(width, height / 2, 10, height, rectangleOptions),
        Bodies.rectangle(0, height / 2, 10, height, rectangleOptions),
      ]);

      // 마우스 상호작용 설정
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      Composite.add(world, mouseConstraint);
      render.mouse = mouse;

      let hasMoved = false;

      Events.on(mouseConstraint, "mousedown", (event: any) => {
        hasMoved = false;
      });

      Events.on(mouseConstraint, "mousemove", (event: any) => {
        if (mouseConstraint.body) {
          hasMoved = true;
        }
      });

      Events.on(mouseConstraint, "mouseup", (event: any) => {
        // 드래그 중이 아니고, 마우스가 이동하지 않았을 때만 클릭으로 처리
        if (!hasMoved) {
          const { mouse } = event;
          const clickedBody = Matter.Query.point(Composite.allBodies(world), mouse.position)[0] as CustomBody;
          if (clickedBody?.customId) {
            router.push(`/d/${clickedBody.customId}`);
          }
        }

        // 상태 초기화
        hasMoved = false;
      });
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
