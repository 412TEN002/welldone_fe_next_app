"use client";

import Pause from "@/app/icons/timer/pause.svg";
import Play from "@/app/icons/timer/play.svg";
import CustomStartButton from "@/app/timer/i/_component/CustomStartButton";
import { useSelect, useTimer } from "@/state/useTranslate";

export default function CustomStartButtonAction() {
  const { time } = useSelect();
  const { status, setStatus, time: currTime } = useTimer();

  const onClickStart = () => {
    if (status === "play") {
      setStatus("pause");
    } else {
      setStatus("play");
    }
  };

  return (
    <CustomStartButton isLong={!(currTime !== 0 && currTime !== time)} onClick={onClickStart}>
      {status === "play" ? <Pause /> : <Play />}
    </CustomStartButton>
  );
}
