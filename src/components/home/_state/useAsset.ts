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

    asset.forEach(async (datum) => {
      const img = new Image();
      img.src = datum.home_icon_url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("이미지 업로드 안됨."));
      });

      const scale = 0.7;
      const w = img.width * scale;
      const h = img.height * scale;
      const x = MATTER.Common.random(w / 2 + 50, width - w / 2 - 50);
      const y = MATTER.Common.random(h / 2 + 50, height - h / 2 - 50);

      const body = MATTER.Bodies.rectangle(x, y, w, h, {
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
