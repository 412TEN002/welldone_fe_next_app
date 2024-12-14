"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import CustomTimer from "@/app/timer/i/_component/CustomTimer";
import CustomTimerAside from "@/app/timer/i/_component/CustomTimerAside";
import { useSelect, useTimer } from "@/state/useTranslate";
import * as styles from "./customTimerAction.css";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function CustomTimerAction() {
  const { time } = useSelect();
  const { time: currTime, setTime: setCurrTime, status, setStatus } = useTimer();
  const router = useRouter();

  const ref = useRef<Date | null>(null);

  const tick = () => {
    const now = new Date();
    const timeRemaining = Math.max(Math.floor(((ref.current?.getTime() ?? 0) - now.getTime()) / 1000), 0);

    setCurrTime(timeRemaining);

    if (timeRemaining === 0) {
      setStatus("pause");
      setCurrTime(time);
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
    setCurrTime(time);

    return () => setCurrTime(0);
  }, [time]);

  return (
    <div className={styles.layer()}>
      <CustomTimer time={currTime} />
      <AnimatePresence>
        {status === "pause" && currTime !== 0 && currTime !== time && (
          <motion.div variants={variants} initial="initial" animate="animate" exit="exit">
            <CustomTimerAside />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
