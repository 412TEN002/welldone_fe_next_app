import CustomBackAction from "@/app/timer/i/_action/CustomBackAction";
import CustomMakeAction from "@/app/timer/i/_action/CustomMakeAction";
import CustomResetButtonAction from "@/app/timer/i/_action/CustomResetButtonAction";
import CustomStartButtonAction from "@/app/timer/i/_action/CustomStartButtonAction";
import CustomTimerAction from "@/app/timer/i/_action/CustomTimerAction";
import CustomTitleAction from "@/app/timer/i/_action/CustomTitleAction";
import { TipAccordion } from "@/components/ui/tipAccordion";
import * as styles from "./page.css";

export default function Page() {
  return (
    <section className={styles.section()}>
      <hgroup className={styles.hgroup()}>
        <div className={styles.backLayer()}>
          <CustomBackAction />
        </div>
        <CustomTitleAction />
      </hgroup>
      <div className="w-full">
        <TipAccordion
          trimTip="브로콜리 송이를 한입 크기로 분리합니다."
          cookingTip={"‘9 또는 강불’에서 물이 끓으면 브로콜리를 넣고 타이머를 눌러주세요"}
          className={"top-[50px] px-4"}
        />
      </div>

      <article className={styles.timerLayer()}>
        <CustomTimerAction />
      </article>
      <article className={styles.makeLayer()}>
        <CustomMakeAction />
      </article>
      <article>불 tip</article>
      <div className={styles.buttonLayer()}>
        <CustomStartButtonAction />
        <CustomResetButtonAction />
      </div>
    </section>
  );
}
