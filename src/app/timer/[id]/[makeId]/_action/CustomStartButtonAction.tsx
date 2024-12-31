"use client";

import CustomStartButton from "@/app/timer/[id]/[makeId]/_component/CustomStartButton";
import IconPause from "@/app/timer/[id]/[makeId]/_component/IconPause";
import IconPlay from "@/app/timer/[id]/[makeId]/_component/IconPlay";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useTimer } from "@/state/useTranslate";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomStartButtonAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });
  const { status, setStatus, time: currTime } = useTimer();

  const onClickStart = () => {
    if (status === "play") {
      setStatus("pause");
    } else {
      setStatus("play");
    }
  };

  return (
    <CustomStartButton
      isLong={!(currTime !== 0 && currTime !== localData.time)}
      onClick={onClickStart}
      theme={localData.theme}
      layoutId="start"
    >
      {status === "play" ? <IconPause theme={localData.theme} /> : <IconPlay theme={localData.theme} />}
    </CustomStartButton>
  );
}
