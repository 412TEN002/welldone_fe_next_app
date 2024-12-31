"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import * as styles from "./customStartButton.css";

type Props = {
  isLong?: boolean;
  theme: "white" | "black";
};

export default function CustomStartButton(props: Props & HTMLMotionProps<"button">) {
  const { children, isLong, theme, ...rest } = props;

  return (
    <motion.button
      type="button"
      className={styles.button({ className: isLong ? "px-[100px]" : "px-[52px]", bg: theme })}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
