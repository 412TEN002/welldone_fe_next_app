"use client";

import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
import CustomResetButton from "@/app/timer/[id]/[makeId]/_component/CustomResetButton";
import IconReset from "@/app/timer/[id]/[makeId]/_component/IconReset";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useTimer } from "@/state/useTranslate";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

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
    <AnimatePresence>
      {!(currTime !== 0 && currTime !== localData.time) ? (
        <Fragment />
      ) : (
        <CustomResetButton
          onClick={onClickReset}
          theme={localData.theme}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, type: "tween", delay: 0.1 }}
        >
          <IconReset theme={localData.theme} />
        </CustomResetButton>
      )}
    </AnimatePresence>
  );
}
