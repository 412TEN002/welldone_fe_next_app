import { create } from "zustand";

type FeedbackState = {
  name: string;
  type: "g" | "m" | "b";
};

type FeedbackAction = {
  setName: (name: FeedbackState["name"]) => void;
  setType: (type: FeedbackState["type"]) => void;
};

export const useFeedback = create<FeedbackState & FeedbackAction>((set) => ({
  name: "브로콜리",
  type: "g",

  setName: (name) => set(() => ({ name: name })),
  setType: (type) => set(() => ({ type: type })),
}));
