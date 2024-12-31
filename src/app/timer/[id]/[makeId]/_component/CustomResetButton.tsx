"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import * as styles from "./customResultButton.css";

type Props = {
  theme: "black" | "white";
};

export default function CustomResetButton(props: Props & HTMLMotionProps<"button">) {
  const { children, theme, ...rest } = props;

  return (
    <motion.button type="button" className={styles.button({ bg: theme })} {...rest}>
      {children}
    </motion.button>
  );
}
