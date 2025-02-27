"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCookingSettings } from "@/app/timer/[id]/[makeId]/_state/useCookingSettings";
import { useSelect, useTimer } from "@/state/useTranslate";
import CustomTimer from "../_component/CustomTimer";
import CustomTimerAside from "../_component/CustomTimerAside";
import * as styles from "./customTimerAction.css";

type Props = {
  id: number;
  makeId: number;
};

export default function CustomTimerAction({ id, makeId }: Props) {
  const { localData } = useCookingSettings({ id, makeId });
  const { setTip } = useSelect();
  const { time: currTime, setTime: setCurrTime, status, setStatus } = useTimer();
  const router = useRouter();

  const ref = useRef<Date | null>(null);

  const sendStatusToFlutter = (status: TimerStatus) => {
    try {
      window.TimerStatusChannel?.postMessage(JSON.stringify(status));
    } catch (e) {
      console.error("Failed to send status to Flutter:", e);
    }
  };

  const tick = () => {
    const now = new Date();
    const timeRemaining = Math.max(Math.floor(((ref.current?.getTime() ?? 0) - now.getTime()) / 1000), 0);

    setCurrTime(timeRemaining);

    if (timeRemaining === 0) {
      setStatus("pause");
      setCurrTime(localData.time);
      setTip(localData.tips.e);
      sendStatusToFlutter({ status: "end" }); // 타이머가 끝났을 때 end 상태 전송

      router.push("/timer/i/end");
    }
  };

  useEffect(() => {
    if (status === "play") {
      ref.current = new Date(Date.now() + currTime * 1000);

      const interval = setInterval(tick, 100);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    setCurrTime(localData.time);

    return () => {
      setCurrTime(0);
      setStatus("pause");
      setTip("");
    };
  }, [localData.time]);

  return (
    <div className={styles.layer()}>
      <CustomTimer time={currTime} theme={localData.theme} />
      {status === "pause" && currTime !== 0 && currTime !== localData.time && <CustomTimerAside />}
    </div>
  );
}
