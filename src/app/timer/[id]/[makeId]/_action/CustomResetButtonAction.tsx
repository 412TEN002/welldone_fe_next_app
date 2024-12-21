"use client";

import CustomResetButton from "@/app/timer/[id]/[makeId]/_component/CustomResetButton";
import IconReset from "@/app/timer/[id]/[makeId]/_component/IconReset";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useTimer } from "@/state/useTranslate";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomResetButtonAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });
  const { setStatus, setTime: setCurrTime, time: currTime } = useTimer();

  const onClickReset = () => {
    setStatus("pause");
    setCurrTime(localData.time);
  };

  if (!(currTime !== 0 && currTime !== localData.time)) return <></>;

  return (
    <CustomResetButton onClick={onClickReset} theme={localData.theme}>
      <IconReset theme={localData.theme} />
    </CustomResetButton>
  );
}
