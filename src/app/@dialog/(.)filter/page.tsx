import CustomAssetAction from "@/app/@dialog/(.)filter/_action/CustomAssetAction";
import CustomOverlayAction from "@/app/@dialog/(.)filter/_action/CustomOverlayAction";
import CustomResetAction from "@/app/@dialog/(.)filter/_action/CustomResetAction";
import CustomResultButtonAction from "@/app/@dialog/(.)filter/_action/CustomResultButtonAction";
import CustomTitle from "@/app/@dialog/(.)filter/_component/CustomTitle";
import * as styles from "./page.css";

export default function DialogFilterPage() {
  return (
    <CustomOverlayAction>
      <div className={styles.content()}>
        <hgroup className={styles.hgroup()}>
          <CustomResetAction />
          <CustomResultButtonAction />
        </hgroup>
        <CustomTitle text="식재료 종류를 선택해주세요" />
        <div className={styles.assetLayer()}>
          <CustomAssetAction />
        </div>
      </div>
    </CustomOverlayAction>
  );
}
