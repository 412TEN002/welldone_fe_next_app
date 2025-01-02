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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
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

  // 컴포넌트 마운트 시 크기 체크
  useEffect(() => {
    if (containerRef.current) {
      const containerSize = {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };

      if (containerSize.width > 0 && containerSize.height > 0) {
        setIsReady(true);
      }
    }
  }, []);

  // Matter.js 초기화
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const { Engine, Render, Runner, Composite, Bodies, Common, Mouse, MouseConstraint, Events } = Matter;

    const containerSize = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };

    const engine = Engine.create({ enableSleeping: true });
    const world = engine.world;

    const render = Render.create({
      element: containerRef.current,
      engine,
      options: {
        width: containerSize.width,
        height: containerSize.height,
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
          containerSize.width / 2,
          -wallThickness / 2,
          containerSize.width + wallThickness * 2,
          wallThickness,
          rectangleOptions,
        ),
        Bodies.rectangle(
          containerSize.width / 2,
          containerSize.height + wallThickness / 2,
          containerSize.width + wallThickness * 2,
          wallThickness,
          rectangleOptions,
        ),
        Bodies.rectangle(
          -wallThickness / 2,
          containerSize.height / 2,
          wallThickness,
          containerSize.height + wallThickness * 2,
          rectangleOptions,
        ),
        Bodies.rectangle(
          containerSize.width + wallThickness / 2,
          containerSize.height / 2,
          wallThickness,
          containerSize.height + wallThickness * 2,
          rectangleOptions,
        ),
      ];

      Composite.add(world, walls);

      items.forEach(({ img, id }) => {
        const scale = 0.7;
        const w = img.width * scale;
        const h = img.height * scale;
        const x = Common.random(w / 2 + 50, containerSize.width - w / 2 - 50);
        const y = Common.random(h / 2 + 50, containerSize.height - h / 2 - 50);

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
          chamfer: { radius: 5 },
        });

        (body as any).customId = id;
        Composite.add(world, body);
      });

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
      Events.on(mouseConstraint, "mousedown", () => {
        hasMoved = false;
      });

      Events.on(mouseConstraint, "mousemove", () => {
        if (mouseConstraint.body) {
          hasMoved = true;
        }
      });

      let lastClickTime = 0;
      const CLICK_DELAY = 300;

      Events.on(mouseConstraint, "mouseup", (event: any) => {
        if (!hasMoved) {
          const currentTime = Date.now();
          if (currentTime - lastClickTime < CLICK_DELAY) return;
          lastClickTime = currentTime;

          const clickedBody = Matter.Query.point(Composite.allBodies(world), mouse.position)[0] as CustomBody;

          if (clickedBody?.customId) {
            router.push(`/d/${clickedBody.customId}`);
          }
        }
      });

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
      Render.stop(render);
      Runner.stop(runner);
      render.canvas.remove();
      render.textures = {};
      Matter.Composite.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, [isReady, item, router, preloadImages]);

  return (
    <div
      className="flex h-full w-full touch-none items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {!imagesLoaded ? <p className="animate-pulse text-white">...로딩 중</p> : null}
    </div>
  );
}
