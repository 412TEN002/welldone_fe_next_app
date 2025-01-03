import CustomBackAction from "@/app/timer/[id]/[makeId]/_action/CustomBackAction";
import CustomFireInfoAction from "@/app/timer/[id]/[makeId]/_action/CustomFireInfoAction";
import CustomMakeAction from "@/app/timer/[id]/[makeId]/_action/CustomMakeAction";
import CustomResetButtonAction from "@/app/timer/[id]/[makeId]/_action/CustomResetButtonAction";
import CustomSectionAction from "@/app/timer/[id]/[makeId]/_action/CustomSectionAction";
import CustomStartButtonAction from "@/app/timer/[id]/[makeId]/_action/CustomStartButtonAction";
import CustomTimerAction from "@/app/timer/[id]/[makeId]/_action/CustomTimerAction";
import CustomTipAction from "@/app/timer/[id]/[makeId]/_action/CustomTipAction";
import CustomTitleAction from "@/app/timer/[id]/[makeId]/_action/CustomTitleAction";
import SuspenseCookingSettings from "@/app/timer/[id]/[makeId]/_action/SuspenseCookingSetting";
import * as styles from "./page.css";

type Props = { params: Promise<{ id: number; makeId: number }> };

export default async function Page({ params }: Props) {
  const { id, makeId } = await params;

  return (
    <SuspenseCookingSettings id={id} makeId={makeId}>
      <CustomSectionAction id={id} makeId={makeId}>
        <hgroup className={styles.hgroup()}>
          <div className={styles.backLayer()}>
            <CustomBackAction />
          </div>
          <CustomTitleAction id={id} makeId={makeId} />
        </hgroup>
        <div className={styles.tipLayer()}>
          <CustomTipAction id={id} makeId={makeId} />
        </div>

        <article className={styles.timerLayer()}>
          <CustomTimerAction id={id} makeId={makeId} />
        </article>
        <article className={styles.makeLayer()}>
          <CustomMakeAction id={id} makeId={makeId} />
        </article>
        <article>
          <CustomFireInfoAction id={id} makeId={makeId} />
        </article>
        <div className={styles.buttonLayer()}>
          <CustomStartButtonAction id={id} makeId={makeId} />
          <CustomResetButtonAction id={id} makeId={makeId} />
        </div>
      </CustomSectionAction>
    </SuspenseCookingSettings>
  );
}
