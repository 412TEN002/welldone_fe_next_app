import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import * as styles from "./customResultButton.css";

type Props = {
  theme: "black" | "white";
};

export default function CustomResetButton(
  props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & Props,
) {
  const { children, theme, ...rest } = props;

  return (
    <button type="button" className={styles.button({ bg: theme })} {...rest}>
      {children}
    </button>
  );
}
