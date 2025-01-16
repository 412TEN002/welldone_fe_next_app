import Image from "next/image";
import * as styles from "./customAssetItem.css";

type Props = {
  image: string;
  name: string;

  isSelect?: boolean;
  onClick?: () => void;
};

export default function CustomAssetItem({ image, name, isSelect = false, onClick }: Props) {
  return (
    <button type="button" className={styles.item({ select: isSelect ? "on" : "off" })} onClick={onClick}>
      <Image src={image} alt="asset_item" width={30} height={30} />
      {name}
    </button>
  );
}
