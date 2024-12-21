"use client";

import { ReactNode } from "react";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import * as styles from "@/app/timer/[id]/[makeId]/page.css";

type Props = {
  id: number;
  makeId: number;
  children: ReactNode;
};

export default function CustomSectionAction({ id, makeId, children }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  return <section className={styles.section({ bg: localData.theme })}>{children}</section>;
}
