import Link from "next/link";
import { IntegrationType } from "@/query-options/integration";

interface FixedImageProps {
  item: IntegrationType[];
}

export function HomeFixedImage({ item }: FixedImageProps) {
  return (
    <div className="absolute top-16 flex flex-wrap bg-primary">
      {item.map(({ id, home_icon_url }) => (
        <Link key={id} href={`/d/${id}`}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={""} src={home_icon_url} />
          }
        </Link>
      ))}
    </div>
  );
}
