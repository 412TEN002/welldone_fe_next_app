"use client";

import { Tooltip } from "react-tooltip";
import Info from "@/app/icons/timer/info.svg";
import CustomTooltip from "@/app/timer/[id]/[makeId]/_component/CustomTooltip";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import * as styles from "./customFireInfoAction.css";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomFireInfoAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  return (
    <>
      <a id="info" className={styles.textGroup({ color: localData.theme })}>
        {localData.fire === "h" && "강불"}
        {localData.fire === "m" && "중불"}
        {localData.fire === "l" && "약불"}
        <Info />
      </a>
      <Tooltip
        anchorSelect="#info"
        place="top"
        opacity="1"
        style={{ background: "#FBF8F2", padding: 0, zIndex: 99 }}
      >
        <CustomTooltip />
      </Tooltip>
    </>
  );
}
