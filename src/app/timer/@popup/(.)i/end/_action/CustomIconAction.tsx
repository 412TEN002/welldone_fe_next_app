"use client";

import Image from "next/image";
import { useSelect } from "@/state/useTranslate";
import * as styles from "./customIconAction.css";

export default function CustomIconAction() {
  const { icon } = useSelect();

  return (
    <div className={styles.layer()}>
      <Image src={icon} alt="item" width={100} height={100} unoptimized />
    </div>
  );
}
