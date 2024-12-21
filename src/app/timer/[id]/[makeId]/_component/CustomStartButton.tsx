import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as styles from "./customStartButton.css";

type Props = {
  isLong?: boolean;
  theme: "white" | "black";
};

export default function CustomStartButton(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props,
) {
  const { children, isLong, theme, ...rest } = props;

  return (
    <button
      type="button"
      className={styles.button({ className: isLong ? "px-[100px]" : "px-[52px]", bg: theme })}
      {...rest}
    >
      {children}
    </button>
  );
}
