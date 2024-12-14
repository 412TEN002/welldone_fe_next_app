"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import { asyncRenderMatter } from "@/lib/utils";
import { IntegrationType } from "@/query-options/integration";

interface AnimationProps {
  item: IntegrationType[];
}

export function HomeAnimation({ item }: AnimationProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Composite, Bodies } = Matter;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 1. 엔진과 월드 생성
    const engine = Engine.create();
    const world = engine.world;

    // 2. 렌더링 설정
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        showAngleIndicator: false,
        wireframes: false, // 변경: 실제 렌더링 스타일
        background: "#3C3731",
      },
    });
    Render.run(render);

    // 3. 러너 생성 및 실행
    const runner = Runner.create();
    Runner.run(runner, engine);
    asyncRenderMatter({ item, Matter, render, engine, world });

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
  }, [item]);

  return <div className="h-full w-full overflow-auto" ref={sceneRef}></div>;
}
