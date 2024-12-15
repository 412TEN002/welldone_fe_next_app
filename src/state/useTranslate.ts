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
  make: "oven" | "pot" | "steamy";
  fire: "h" | "m" | "l";
};

type SelectAction = {
  setSelect: (
    name: SelectState["name"],
    icon: SelectState["icon"],
    time: SelectState["time"],
    tip: SelectState["tip"],
    make: SelectState["make"],
    fire: SelectState["fire"],
  ) => void;
};

export const useSelect = create<SelectState & SelectAction>((set) => ({
  name: "",
  icon: "",
  time: 0,
  tip: {
    w: "",
    p: "",
    e: "",
  },
  make: "steamy",
  fire: "h",

  setSelect: (name, icon, time, tip, make, fire) =>
    set(() => ({ name: name, icon: icon, time: time, tip: tip, make: make, fire: fire })),
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
