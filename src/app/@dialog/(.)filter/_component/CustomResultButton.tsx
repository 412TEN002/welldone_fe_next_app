import * as styles from "./customResultButton.css";

type Props = {
  onClick?: () => void;
};

export default function CustomResultButton({ onClick }: Props) {
  return (
    <button type="button" onClick={onClick} className={styles.button()}>
      적용
    </button>
  );
}
