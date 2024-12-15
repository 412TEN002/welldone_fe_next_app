"use client";

import Image from "next/image";
import CustomOven from "@/app/timer/i/_component/CustomOven";
import CustomOvenPre from "@/app/timer/i/_component/CustomOvenPre";
import CustomPot from "@/app/timer/i/_component/CustomPot";
import CustomPotPre from "@/app/timer/i/_component/CustomPotPre";
import CustomSteamy from "@/app/timer/i/_component/CustomSteamy";
import CustomSteamyPre from "@/app/timer/i/_component/CustomSteamyPre";
import { useSelect, useTimer } from "@/state/useTranslate";

export default function CustomMakeAction() {
  const { make, fire, icon } = useSelect();
  const { status } = useTimer();

  if (make === "pot") {
    if (status === "play")
      return (
        <CustomPot fire={fire}>
          <Image src={icon} alt="item" layout="fill" unoptimized />
        </CustomPot>
      );

    return (
      <CustomPotPre fire={fire}>
        <Image src={icon} alt="item" layout="fill" unoptimized />
      </CustomPotPre>
    );
  }

  if (make === "steamy") {
    if (status === "play")
      return (
        <CustomSteamy fire={fire}>
          <Image src={icon} alt="item" layout="fill" unoptimized />
        </CustomSteamy>
      );

    return (
      <CustomSteamyPre fire={fire}>
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
