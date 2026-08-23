import type { CharStatus, TypingState } from "@/engine/types";
import { charStatuses } from "@/engine/typing";

const STATUS_CLASS: Record<CharStatus, string> = {
  pending: "text-muted-foreground/40",
  correct: "text-foreground",
  wrong: "text-red-500 underline",
};

interface Line {
  start: number;
  end: number;
}

function toLines(text: string): Line[] {
  const lines: Line[] = [];
  let start = 0;
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text[i] === "\n") {
      lines.push({ start, end: i });
      start = i + 1;
    }
  }
  return lines;
}

export function TypingArea({ state }: { state: TypingState }) {
  const statuses = charStatuses(state);
  const showCaret = state.finishedAt === null;
  const lines = toLines(state.text);
  const progress = Math.min((state.input.length / state.text.length) * 100, 100);

  return (
    <div>
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div aria-label="타이핑할 코드" className="font-mono text-lg leading-relaxed">
        {lines.map((line, li) => {
          const caretAtEnd = showCaret && state.input.length >= line.start && state.input.length <= line.end;
          return (
            <div key={li} className="flex">
              <span className="w-8 shrink-0 select-none text-right font-mono text-sm leading-relaxed text-muted-foreground/40">
                {li + 1}
              </span>
              <span className="ml-4 whitespace-pre-wrap break-words">
                {statuses.slice(line.start, line.end).map((status, i) => (
                  <span
                    key={line.start + i}
                    className={`transition-colors duration-75 ${STATUS_CLASS[status]}`}
                  >
                    {showCaret && state.input.length === line.start + i && (
                      <Caret />
                    )}
                    {state.text[line.start + i]}
                  </span>
                ))}
                {caretAtEnd && (state.input.length === line.end || line.start === line.end) && (
                  <Caret />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="[animation:caret-blink_1s_step-end_infinite] border-l-2 border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
    />
  );
}
