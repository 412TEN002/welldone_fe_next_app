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
};

type SelectAction = {
  setSelect: (name: SelectState["name"], icon: SelectState["icon"]) => void;
};

export const useSelect = create<SelectState & SelectAction>((set) => ({
  name: "",
  icon: "",

  setSelect: (name, icon) => set(() => ({ name, icon })),
}));

type TimerState = {
  status: "pause" | "play";
  time: number;
};

type TimerAction = {
  setStatus: (status: TimerState["status"]) => void;
  setTime: (time: TimerState["time"]) => void;
};

export const useTimer = create<TimerState & TimerAction>((set) => ({
  status: "pause",
  time: 0,

  setStatus: (status) => set(() => ({ status: status })),
  setTime: (time) => set(() => ({ time: time })),
}));
