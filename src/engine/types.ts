export interface TypingState {
  text: string;
  input: string;
  startedAt: number | null;
  finishedAt: number | null;
  correctKeys: number;
  wrongKeys: number;
}

export type CharStatus = "pending" | "correct" | "wrong";

export interface Stats {
  wpm: number;
  accuracy: number;
  progress: number;
  elapsedMs: number;
}
