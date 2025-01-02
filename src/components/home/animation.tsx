"use client";

import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
    await Promise.all(promises).then(() => {
      setImagesLoaded(true);
    });
    return await Promise.all(promises);
  }, [item]);

  useEffect(() => {
    if (!sceneRef) return;

    const { Engine, Render, Runner, Composite, Bodies, Common, Mouse, MouseConstraint, Events } = Matter;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Matter.js 엔진, 렌더, 러너 생성
    const engine = Engine.create({ enableSleeping: true });
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
      const wallThickness = 100;

      const rectangleOptions = {
        isStatic: true,
        render: { visible: false },
        friction: 0.2,
        restitution: 0.4,
      };

      const walls = [
        Bodies.rectangle(
          width / 2,
          -wallThickness / 2,
          width + wallThickness * 2,
          wallThickness,
          rectangleOptions,
        ),
        Bodies.rectangle(
          width / 2,
          height + wallThickness / 2,
          width + wallThickness * 2,
          wallThickness,
          rectangleOptions,
        ),
        Bodies.rectangle(
          -wallThickness / 2,
          height / 2,
          wallThickness,
          height + wallThickness * 2,
          rectangleOptions,
        ),
        Bodies.rectangle(
          width + wallThickness / 2,
          height / 2,
          wallThickness,
          height + wallThickness * 2,
          rectangleOptions,
        ),
      ];

      Composite.add(world, walls);

      // 터치 이벤트 최적화를 위한 바운딩 박스 크기 조정
      items.forEach(({ img, id }) => {
        const scale = 0.7;
        const w = img.width * scale;
        const h = img.height * scale;
        const x = Common.random(w / 2 + 50, width - w / 2 - 50);
        const y = Common.random(h / 2 + 50, height - h / 2 - 50);

        const body = Bodies.rectangle(x, y, w, h, {
          render: {
            sprite: {
              texture: img.src,
              xScale: scale,
              yScale: scale,
            },
          },
          friction: 0.1,
          restitution: 0.5,
          density: 0.001,
          chamfer: { radius: 5 }, // 모서리를 부드럽게 하여 충돌 처리 최적화
        });

        (body as any).customId = id;
        return Composite.add(world, body);
      });

      // 터치 이벤트 최적화
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
          damping: 0.5,
        },
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

      let lastClickTime = 0;
      const CLICK_DELAY = 300; // 더블 클릭 방지를 위한 딜레이

      Events.on(mouseConstraint, "mouseup", (event: any) => {
        // 드래그 중이 아니고, 마우스가 이동하지 않았을 때만 클릭으로 처리
        if (!hasMoved) {
          const currentTime = Date.now();
          if (currentTime - lastClickTime < CLICK_DELAY) return;
          lastClickTime = currentTime;

          const { mouse } = event;
          const clickedBody = Matter.Query.point(Composite.allBodies(world), mouse.position)[0] as CustomBody;
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
    };

    preloadImages().then((items) => {
      initializeScene(items);
    });

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
        // 엔진 정리
        Matter.Composite.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, [sceneRef, item]);

  return (
    <div
      className="flex h-full w-full touch-none items-center justify-center overflow-hidden"
      ref={setSceneRef}
    >
      {!imagesLoaded ? <p className="animate-pulse text-white">...로딩 중</p> : null}
    </div>
  );
}
