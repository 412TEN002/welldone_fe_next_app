import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IntegrationType } from "@/query-options/integration";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function asyncRenderMatter({
  item,
  Matter,
  render,
  world,
  engine,
}: {
  item: IntegrationType[];
  Matter: any;
  render: any;
  world: any;
  engine: any;
}) {
  const { Common, Mouse, MouseConstraint, Composite, Bodies, Events } = Matter;
  const width = window.innerWidth;
  const height = window.innerHeight;
  // 비동기적으로 SVG 이미지를 로드하고 물리적 바디로 변환
  const loadSvgAsImage = async (svgUrl: string, id: number) => {
    const img = new Image();
    img.src = svgUrl;

    // Promise로 이미지가 로드될 때까지 기다림
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // 랜덤 위치 계산
    const x = Common.random(0, width);
    const y = Common.random(0, height);
    const svgBody = Bodies.rectangle(x, y, img.width, img.height, {
      render: {
        sprite: {
          texture: img.src,
          xScale: 1,
          yScale: 1,
        },
      },
      chamfer: {
        quality: 100,
      },
    });

    // 사용자 정의 ID 추가
    svgBody.customId = id;
    Composite.add(world, svgBody);
  };

  // 비동기적으로 모든 아이템을 로드하고 물리적 바디 추가

  await Promise.all(
    item.map(async ({ id, home_icon_url }) => {
      return await loadSvgAsImage(home_icon_url, id);
    }),
  );
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
        // 클릭 시 물체 색상 변경
        body.render.fillStyle = "red";

        // 페이지 이동 (예: Custom ID에 따라 페이지 이동)
        const targetId = body.customId;
        if (targetId !== undefined) {
          // 예시: id에 따라 페이지 이동
          window.location.href = `/target-page/${targetId}`;
        }
      }
    });
  });
}
