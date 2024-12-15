"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: IntegrationType[];
}

export function HomeAnimation({ item }: AnimationProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloadImages = (urls: string[]) => {
      return Promise.all(
        urls.map(
          (url) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = url;
              img.onload = () => resolve();
            }),
        ),
      );
    };

    const initializeMatterJs = async () => {
      if (!sceneRef.current) return;

      const { Engine, Render, Runner, Composite, Bodies, Mouse, MouseConstraint, Events, Common } = Matter;

      const engine = Engine.create();
      const world = engine.world;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // 렌더 설정
      const render = Render.create({
        element: sceneRef.current,
        engine,
        options: {
          width,
          height,
          background: "#3C3731",
          wireframes: false,
        },
      });
      Render.run(render);

      const runner = Runner.create();
      Runner.run(runner, engine);

      // 월드 경계 추가
      const boundaryOptions = { isStatic: true, render: { visible: false } };
      Composite.add(world, [
        Bodies.rectangle(width / 2, 0, width, 10, boundaryOptions), // 상단
        Bodies.rectangle(width / 2, height, width, 10, boundaryOptions), // 하단
        Bodies.rectangle(width, height / 2, 10, height, boundaryOptions), // 오른쪽
        Bodies.rectangle(0, height / 2, 10, height, boundaryOptions), // 왼쪽
      ]);

      // 이미지 로드 후 물리 객체 추가
      const addBody = (url: string, id: number) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
          const x = Common.random(50, width - 50);
          const y = Common.random(50, height - 50);

          const body = Bodies.rectangle(x, y, img.width, img.height, {
            render: {
              sprite: {
                texture: img.src,
                xScale: 1,
                yScale: 1,
              },
            },
          });

          body.customId = id;
          Composite.add(world, body);
        };
      };

      item.forEach(({ home_icon_url, id }) => addBody(home_icon_url, id));

      // 마우스 추가
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      Composite.add(world, mouseConstraint);
      render.mouse = mouse;

      // 클릭 이벤트 처리
      Events.on(mouseConstraint, "mousedown", (event: any) => {
        const { mouse } = event;
        const bodies = Composite.allBodies(world);

        bodies.forEach((body: any) => {
          if (Matter.Bounds.contains(body.bounds, mouse.position)) {
            console.log(`Clicked on body with ID: ${body.customId}`);
            body.render.fillStyle = "red";

            const targetId = body.customId;
            if (targetId !== undefined) {
              window.location.href = `/target-page/${targetId}`;
            }
          }
        });
      });

      // 렌더뷰 설정
      Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height },
      });

      // 클린업
      return () => {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        render.canvas.remove();
        render.textures = {};
      };
    };

    const preloadAndInitialize = async () => {
      const imageUrls = item.map(({ home_icon_url }) => home_icon_url);

      // 이미지 미리 로드
      await preloadImages(imageUrls);

      // Matter.js 초기화
      return initializeMatterJs();
    };

    preloadAndInitialize();
  }, [item]);

  return <div className="w-100 h-100" ref={sceneRef}></div>;
}
