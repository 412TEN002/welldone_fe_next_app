"use client";

import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";

export function HomeAnimation() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const [{ height, width }, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [width, height]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Composites, Common, Mouse, MouseConstraint, Composite, Bodies } = Matter;

    // 1. 엔진과 월드 생성
    const engine = Engine.create();
    const world = engine.world;

    // 2. 렌더링 설정
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        showAngleIndicator: true,
        wireframes: false, // 변경: 실제 렌더링 스타일
        background: "#3C3731",
      },
    });
    Render.run(render);

    // 3. 러너 생성 및 실행
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 4. 물체 스택 추가
    const stack = Composites.stack(20, 20, 10, 5, 0, 0, (x: number, y: number) => {
      const sides = Math.round(Common.random(1, 8));
      let chamfer = undefined;

      if (sides > 2 && Common.random() > 0.7) {
        chamfer = { radius: 10 };
      }

      if (Math.round(Common.random(0, 1)) === 0) {
        if (Common.random() < 0.8) {
          return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), { chamfer });
        } else {
          return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), { chamfer });
        }
      } else {
        return Bodies.polygon(x, y, sides, Common.random(25, 50), { chamfer });
      }
    });
    Composite.add(world, stack);
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
  }, [width, height]);

  return <div className="w-100 h-100" ref={sceneRef} />;
}
