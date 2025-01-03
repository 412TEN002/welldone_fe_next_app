"use client";

import { useRouter } from "next/navigation";
import Back from "@/app/icons/timer/back-white.svg";
import * as styles from "./backButtonAction.css";

export default function BackButtonAction() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <span role="button" tabIndex={0} className={styles.hgroup()} onClick={onClickBack}>
      <Back />
    </span>
  );
}
