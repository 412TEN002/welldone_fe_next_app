import { motion } from "framer-motion";
import * as styles from "./customButton.css";

type Props = {
  text: string;
  onClick?: () => void;

  className?: string;
};

export default function CustomButton({ text, onClick, className }: Props) {
  return (
    <motion.button
      className={styles.button({ class: className })}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.button>
  );
}
