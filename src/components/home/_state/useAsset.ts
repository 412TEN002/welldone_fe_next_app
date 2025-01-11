import * as MATTER from "matter-js";
import { useEffect, useState } from "react";

export type AssetTypes = {
  id: number;
  home_icon_url: string;
};

type Props = {
  asset: AssetTypes[];

  engine: MATTER.Engine;
  width: number;
  height: number;
};

export const useAsset = ({ asset, engine, width, height }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (asset.length === 0 || width === 0 || height === 0) return;

    const xPositions = [width * 0.2, width * 0.4, width * 0.6, width * 0.8];

    asset.forEach(async (datum, index) => {
      const img = new Image();
      img.src = datum.home_icon_url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("이미지 업로드 안됨."));
      });

      const scale = 0.7;
      const w = img.width * scale;
      const h = img.height * scale;

      const x = xPositions[index % xPositions.length];
      const y = height - h / 2 - 50 - index * 50;
      const adjustedY = Math.max(y, h / 2); // 화면 위를 넘지 않도록 조정

      const body = MATTER.Bodies.rectangle(x, adjustedY, w, h, {
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
        velocity: {
          x: 0,
          y: -3,
        },
      });

      (body as any).customId = datum.id;

      await new Promise((resolve) => setTimeout(resolve, 100 * index));
      MATTER.Composite.add(engine.world, body);
    });

    setIsLoading(false);

    return () => {
      setIsLoading(true);
      MATTER.Composite.allBodies(engine.world).forEach((body) => {
        if (!body.isStatic) MATTER.Composite.remove(engine.world, body);
      });
    };
  }, [asset, engine, width, height]);

  return { isLoading };
};
