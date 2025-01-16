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

  const getDeviceScale = (screenWidth: number) => {
    if (screenWidth <= 375) return 0.76;
    if (screenWidth <= 428) return 0.792;
    if (screenWidth <= 768) return 0.95;
    if (screenWidth <= 1024) return 0.99;
    return 0.9; // 큰 데스크톱
  };

  useEffect(() => {
    if (asset.length === 0 || width === 0 || height === 0) return;

    const xPositions = [width * 0.05, width * 0.4, width * 0.6, width * 0.95];
    const baseScale = getDeviceScale(width);

    asset.forEach(async (datum, index) => {
      const img = new Image();
      img.src = datum.home_icon_url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("이미지 업로드 안됨."));
      });

      const scale = baseScale;
      const w = img.width * scale;
      const h = img.height * scale;

      const x = xPositions[index % xPositions.length];
      const y = height - h / 2 - 50 - index * 60;
      const adjustedY = Math.max(y, h / 2); // 화면 위를 넘지 않도록 조정

      const body = MATTER.Bodies.rectangle(x, adjustedY, w, h, {
        render: {
          sprite: {
            texture: img.src,
            xScale: scale,
            yScale: scale,
          },
        },
        friction: 0.05, // 마찰 감소
        restitution: 0.3, // 적당한 튀김
        density: 0.001, // 밀도 유지
        chamfer: { radius: 2 }, // 모서리 덜 둥글게
        frictionAir: 0.001,
      });

      (body as any).customId = datum.id;

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
