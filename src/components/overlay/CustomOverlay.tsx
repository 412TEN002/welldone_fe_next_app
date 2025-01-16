"use client";

import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode } from "react";
import * as styles from "./customOverlay.css";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  children?: ReactNode;

  onClickOverlay?: () => void;
};

export default function CustomOverlay({ onClickOverlay, children }: Props) {
  const onClickContent: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      className={styles.overlay()}
      onClick={onClickOverlay}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        tabIndex={0}
        role="button"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={onClickContent}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
