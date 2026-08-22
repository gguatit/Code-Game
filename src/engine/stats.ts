import type { Stats, TypingState } from "./types";

function countCorrectChars(s: TypingState): number {
  let n = 0;
  for (let i = 0; i < s.input.length; i++) if (s.input[i] === s.text[i]) n++;
  return n;
}

export function computeStats(s: TypingState): Stats {
  const elapsedMs =
    s.startedAt === null
      ? 0
      : s.finishedAt !== null
        ? Math.max(0, s.finishedAt - s.startedAt)
        : Math.max(0, Date.now() - s.startedAt);
  const minutes = elapsedMs / 60000;
  const totalKeys = s.correctKeys + s.wrongKeys;
  return {
    wpm: elapsedMs < 1000 ? 0 : Math.round(countCorrectChars(s) / 5 / minutes),
    accuracy: totalKeys === 0 ? 100 : Math.round((s.correctKeys / totalKeys) * 100),
    progress: s.text.length === 0 ? 0 : Math.round((s.input.length / s.text.length) * 100),
    elapsedMs,
  };
}
