import { create } from "zustand";

type FeedbackState = {
  type: "g" | "m" | "b";
};

type FeedbackAction = {
  setType: (type: FeedbackState["type"]) => void;
};

export const useFeedback = create<FeedbackState & FeedbackAction>((set) => ({
  type: "g",

  setType: (type) => set(() => ({ type: type })),
}));

type SelectState = {
  name: string;
  icon: string;

  time: number;
  tip: {
    w: string;
    p: string;
    e: string;
  };
};

type SelectAction = {
  setSelect: (
    name: SelectState["name"],
    icon: SelectState["icon"],
    time: SelectState["time"],
    tip: SelectState["tip"],
  ) => void;
};

export const useSelect = create<SelectState & SelectAction>((set) => ({
  name: "브로콜리",
  icon: "",
  time: 60,
  tip: {
    w: "브로콜리 송이를 한입 크기로 분리합니다",
    p: "‘9 또는 강불’에서 물이 끓으면 아래의 화력 가이드에 따라 불을 조절한 뒤, 시작 버튼을 눌러 주세요.",
    e: "데친 후 바로 찬물에 헹궈주면 남은 열로 익는 현상을 방지하고, 식감과 색을 유지할 수 있습니다.",
  },

  setSelect: (name, icon, time, tip) => set(() => ({ name: name, icon: icon, time: time, tip: tip })),
}));
