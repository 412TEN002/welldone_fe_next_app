import * as styles from "./customTimer.css";

type Props = {
  time: number;
  theme: "white" | "black";
};

export default function CustomTimer({ time, theme }: Props) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <p className={styles.timer({ color: theme })}>{formatTime(time)}</p>;
}
