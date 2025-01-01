"use client";

import Image from "next/image";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useSelect, useTimer } from "@/state/useTranslate";
import CustomOven from "../_component/CustomOven";
import CustomOvenPre from "../_component/CustomOvenPre";
import CustomPot from "../_component/CustomPot";
import CustomPotPre from "../_component/CustomPotPre";
import CustomSteamy from "../_component/CustomSteamy";
import CustomSteamyPre from "../_component/CustomSteamyPre";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomMakeAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });

  const { icon } = useSelect();
  const { status } = useTimer();

  if (makeId == 1) {
    if (status === "play")
      return (
        <CustomPot fire={localData.fire}>
          <Image src={icon} alt="item" layout="fill" unoptimized />
        </CustomPot>
      );

    return (
      <CustomPotPre fire={localData.fire}>
        <Image src={icon} alt="item" layout="fill" unoptimized />
      </CustomPotPre>
    );
  }

  if (makeId == 2) {
    if (status === "play")
      return (
        <CustomSteamy fire={localData.fire}>
          <Image src={icon} alt="item" layout="fill" unoptimized />
        </CustomSteamy>
      );

    return (
      <CustomSteamyPre fire={localData.fire}>
        <Image src={icon} alt="item" layout="fill" unoptimized />
      </CustomSteamyPre>
    );
  }

  if (status === "play")
    return (
      <CustomOven>
        <Image src={icon} alt="item" unoptimized width={120} height={80} />
      </CustomOven>
    );

  return (
    <CustomOvenPre>
      <Image src={icon} alt="item" unoptimized width={120} height={80} />
    </CustomOvenPre>
  );
}
