"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ArrowDown from "@/assets/icon/arrow-down.svg";
import ChefHat from "@/assets/icon/chef-hat.svg";
import * as styles from "./customTip.css";

type Props = {
  w?: string;
  p?: string;
  className?: string;
};

export default function CustomTip({ w, p }: Props) {
  const [open, setOpen] = useState(false);

  const onClickContainer = () => {
    setOpen(!open);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={styles.container({ rounded: open ? "open" : "close" })}
      onClick={onClickContainer}
    >
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={styles.arrow()}
      >
        <ArrowDown />
      </motion.div>
      <ChefHat />
      <p className={styles.mainText()}>완벽한 &apos;익힘정도&apos;를 위한 필수 팁!</p>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.optionLayer()}
          >
            <div className={styles.layer()}>
              <span className={styles.label()}>손질 팁</span>
              <p className={styles.content()}>{w}</p>
            </div>
            <div className={styles.layer()}>
              <span className={styles.label()}>조리 팁</span>
              <p className={styles.content()}>{p}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
