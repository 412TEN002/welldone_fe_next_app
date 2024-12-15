import { IntegrationType } from "@/query-options/integration";

interface FixedImageProps {
  item: IntegrationType[];
}

export function HomeFixedImage({ item }: FixedImageProps) {
  return (
    <div className="mt-20">
      {item.map(({ id, home_icon_url }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={""} src={home_icon_url} key={id} />
      ))}
    </div>
  );
}
