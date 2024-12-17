"use client";

import Matter from "matter-js";
import { useEffect, useState } from "react";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: (IntegrationType & { img?: HTMLImageElement })[];
}

export function HomeAnimation({ item }: AnimationProps) {
  const [sceneRef, setSceneRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sceneRef) return;

    const { Engine, Render, Runner, Composite, Bodies, Common, Mouse, MouseConstraint, Events } = Matter;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 1. 엔진과 월드 생성
    const engine = Engine.create();
    const world = engine.world;

    // 2. 렌더링 설정
    const render = Render.create({
      element: sceneRef,
      engine,
      options: {
        width,
        height,
        showAngleIndicator: false,
        wireframes: false, // 변경: 실제 렌더링 스타일
        background: "#3C3731",
        pixelRatio: window.devicePixelRatio || 2,
      },
    });
    Render.run(render);

    // 3. 러너 생성 및 실행
    const runner = Runner.create();
    Runner.run(runner, engine);
    item.map(({ home_icon_url, id }) => {
      // 랜덤 위치 계산
      const x = Common.random(0, width);
      const y = Common.random(0, height);
      const svgBody = Bodies.rectangle(x, y, 100, 100, {
        render: {
          sprite: {
            texture: home_icon_url,
            xScale: 0.6,
            yScale: 0.6,
          },
        },
      });

      // 사용자 정의 ID 추가
      svgBody.customId = id;
      Composite.add(world, svgBody);
    });
    const rectangleOptions = {
      isStatic: true,
      render: { visible: false },
    };

    // 5. 월드 경계 추가
    Composite.add(world, [
      Bodies.rectangle(width / 2, 0, width, 10, rectangleOptions), // 상단
      Bodies.rectangle(width / 2, height, width, 20, rectangleOptions), // 하단
      Bodies.rectangle(width, height / 2, 10, height, rectangleOptions), // 오른쪽
      Bodies.rectangle(0, height / 2, 10, height, rectangleOptions), // 왼쪽
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // 물체 클릭 이벤트
    Events.on(mouseConstraint, "mousedown", (event: any) => {
      const { mouse } = event;
      const bodies = Composite.allBodies(world);

      bodies.forEach((body: any) => {
        // 마우스가 물체의 경계를 포함하는지 체크
        if (Matter.Bounds.contains(body.bounds, mouse.position)) {
          console.log(`Clicked on body with ID: ${body.id}, Custom ID: ${body.customId}`);

          // 페이지 이동 (예: Custom ID에 따라 페이지 이동)
          const targetId = body.customId;
          if (targetId !== undefined) {
            // 예시: id에 따라 페이지 이동
            window.location.href = `/d/${targetId}`;
          }
        }
      });
    });
    // 7. 렌더링 영역 조정
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    });

    // 8. 클린업
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [item, sceneRef]);

  return <div className="h-full w-full overflow-auto" ref={setSceneRef}></div>;
}
