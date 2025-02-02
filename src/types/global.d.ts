// types/global.d.ts
interface Window {
  TimerStatusChannel?: {
    postMessage: (message: string) => void;
  };
}

type TimerStatus = {
  status: "play" | "pause" | "resume" | "end" | "reset";
};
