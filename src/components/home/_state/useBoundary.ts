import * as MATTER from "matter-js";
import { useEffect } from "react";

const OPTION = {
  isStatic: true,
  render: { visible: false },
  friction: 0.2,
  restitution: 0,
};

const THICKNESS = 100;

type Props = {
  engine: MATTER.Engine;
  width: number;
  height: number;
};

export const useBoundary = ({ engine, width, height }: Props) => {
  useEffect(() => {
    if (width === 0 || height === 0) return;

    const boundaries = [
      MATTER.Bodies.rectangle(width / 2, -THICKNESS / 2, width + THICKNESS * 2, THICKNESS, OPTION),
      MATTER.Bodies.rectangle(
        width / 2,
        height * 1.8 + THICKNESS / 2,
        width + THICKNESS * 2,
        THICKNESS,
        OPTION,
      ),
      MATTER.Bodies.rectangle(-THICKNESS / 2, height * 0.9, THICKNESS, height * 1.8 + THICKNESS * 2, OPTION),
      MATTER.Bodies.rectangle(
        width + THICKNESS / 2,
        height * 0.9,
        THICKNESS,
        height * 1.8 + THICKNESS * 2,
        OPTION,
      ),
    ];

    MATTER.Composite.add(engine.world, boundaries);

    return () => {
      MATTER.Composite.allBodies(engine.world).forEach((body) => {
        if (body.isStatic) MATTER.Composite.remove(engine.world, body);
      });
    };
  }, [engine, width, height]);
};
