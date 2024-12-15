"use client";

import Reset from "@/app/icons/timer/reset.svg";
import CustomResetButton from "@/app/timer/i/_component/CustomResetButton";
import { useSelect, useTimer } from "@/state/useTranslate";

export default function CustomResetButtonAction() {
  const { time } = useSelect();
  const { setStatus, setTime: setCurrTime, time: currTime } = useTimer();

  const onClickReset = () => {
    setStatus("pause");
    setCurrTime(time);
  };

  if (!(currTime !== 0 && currTime !== time)) return <></>;

  return (
    <CustomResetButton onClick={onClickReset}>
      <Reset />
    </CustomResetButton>
  );
}
