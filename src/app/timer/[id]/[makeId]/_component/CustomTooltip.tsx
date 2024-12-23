import { cx } from "class-variance-authority";
import * as styles from "./customTooltip.css";

export default function CustomTooltip() {
  return (
    <div className={styles.container()}>
      <div className={styles.leftLayer({ bg: "head" })}>인덕션/가스레인지</div>
      <div className={styles.rightLayer({ bg: "head" })}>전자레인지</div>
      <div className={styles.leftLayer({ bg: "body" })}>
        <span>9</span>
        <span>강불</span>
      </div>
      <div className={cx(styles.rows(), styles.rightLayer({ bg: "body" }))}>700W</div>
      <div className={styles.leftLayer({ bg: "body" })}>
        <span>6</span>
        <span>중불</span>
      </div>
      <div className={styles.leftLayer({ bg: "body" })}>
        <span>3</span>
        <span>약불</span>
      </div>
    </div>
  );
}
