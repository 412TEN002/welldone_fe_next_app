import * as styles from "./customTitle.css";

type Props = {
  name: string;
  theme: "white" | "black";
};

export default function CustomTitle({ name, theme }: Props) {
  return <h4 className={styles.title({ color: theme })}>{name}</h4>;
}
