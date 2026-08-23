import type { CharStatus, TypingState } from "./types";

const TYPEABLE = /^[\x20-\x7E\n]$/;

export function initState(text: string): TypingState {
  return { text, input: "", startedAt: null, finishedAt: null, correctKeys: 0, wrongKeys: 0 };
}

export function applyKey(state: TypingState, key: string): TypingState {
  if (state.finishedAt !== null) return state;
  if (key.length !== 1 || !TYPEABLE.test(key)) return state;

  const i = state.input.length;
  if (i >= state.text.length) return state;

  const ok = key === state.text[i];
  const input = state.input + key;
  const now = Date.now();
  return {
    text: state.text,
    input,
    startedAt: state.startedAt ?? now,
    finishedAt: input.length === state.text.length ? now : null,
    correctKeys: state.correctKeys + (ok ? 1 : 0),
    wrongKeys: state.wrongKeys + (ok ? 0 : 1),
  };
}

export function applyBackspace(state: TypingState): TypingState {
  if (state.finishedAt !== null || state.input.length === 0) return state;
  return { ...state, input: state.input.slice(0, -1) };
}

export function charStatuses(state: TypingState): CharStatus[] {
  return state.text.split("").map((ch, i) =>
    i >= state.input.length ? "pending" : state.input[i] === ch ? "correct" : "wrong"
  );
}
