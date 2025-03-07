import { motion } from "framer-motion";
import Image from "next/image";
import * as styles from "./customAssetItem.css";

type Props = {
  isSelect?: boolean;
  image: string;
  name: string;
  description: string;
  onClick?: () => void;
};

export default function CustomAssetItem({ isSelect, image, name, description, onClick }: Props) {
  const { layer, name: sName, description: sDescription } = styles.text();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={styles.button({ select: isSelect ? "on" : "off" })}
      whileTap={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
    >
      <Image src={image} alt="asset_item" width={68} height={45} />
      <div className={layer()}>
        <p className={sName()}>{name}</p>
        <p className={sDescription()}>{description}</p>
      </div>
    </motion.button>
  );
}
