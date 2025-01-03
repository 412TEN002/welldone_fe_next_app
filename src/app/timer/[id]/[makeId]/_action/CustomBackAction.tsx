"use client";

import { useRouter } from "next/navigation";
import BackWhite from "@/app/icons/timer/back-white.svg";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import Back from "../../../../icons/timer/back.svg";
import * as styles from "./customBackAction.css";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomBackAction({ id, makeId }: Props) {
  const router = useRouter();
  const { localData } = useCookingSettings({ id, makeId });

  const onClickBack = () => {
    router.back();
  };

  return (
    <div role="button" tabIndex={0} onClick={onClickBack} className={styles.layer()}>
      {localData.theme === "white" ? <BackWhite /> : <Back />}
    </div>
  );
}
