import * as styles from "./customTitle.css";

type Props = {
  text: string;
};

export default function CustomTitle({ text }: Props) {
  return <h3 className={styles.title()}>{text}</h3>;
}
