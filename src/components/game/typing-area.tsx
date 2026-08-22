import type { CharStatus, TypingState } from "@/engine/types";
import { charStatuses } from "@/engine/typing";

const STATUS_CLASS: Record<CharStatus, string> = {
  pending: "text-muted-foreground/40",
  correct: "text-foreground",
  wrong: "text-red-500 underline",
};

export function TypingArea({ state }: { state: TypingState }) {
  const statuses = charStatuses(state);
  const showCaret = state.finishedAt === null;
  return (
    <p aria-label="타이핑할 코드" className="font-mono text-lg leading-relaxed whitespace-pre-wrap break-words">
      {statuses.map((status, i) => (
        <span key={i} className={STATUS_CLASS[status]}>
          {showCaret && i === state.input.length && (
            <span className="animate-pulse border-l-2 border-sky-400" aria-hidden="true" />
          )}
          {state.text[i]}
        </span>
      ))}
    </p>
  );
}
