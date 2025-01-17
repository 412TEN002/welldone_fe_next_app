import * as styles from "./customButton.css";

type Props = {
  text: string;
  onClick?: () => void;

  className?: string;
};

export default function CustomButton({ text, onClick, className }: Props) {
  return (
    <button className={styles.button({ class: className })} onClick={onClick}>
      {text}
    </button>
  );
}
