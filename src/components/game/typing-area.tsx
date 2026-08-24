import { useEffect, useRef } from "react";
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
  const boxRef = useRef<HTMLDivElement>(null);
  const activeLine = lines.findIndex(
    (l) => state.input.length >= l.start && state.input.length <= l.end
  );

  // 커서 줄을 박스 세로 중앙에 고정해 따라오는 스크롤(페이지 스크롤 간섭 없음)
  useEffect(() => {
    const box = boxRef.current;
    if (!box || !showCaret || activeLine < 0) return;
    const el = box.querySelector<HTMLElement>(`[data-line="${activeLine}"]`);
    if (!el) return;
    const target = el.offsetTop - (box.clientHeight - el.offsetHeight) / 2;
    const clamped = Math.max(target, 0);
    if (box.scrollTop !== clamped) box.scrollTop = clamped;
  }, [state.input.length, activeLine, showCaret]);

  return (
    <div>
      <div className="mb-4 h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div
        ref={boxRef}
        aria-label="타이핑할 코드"
        className="relative max-h-[60vh] overflow-y-auto font-mono text-lg leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {lines.map((line, li) => {
          const caretAtEnd = showCaret && state.input.length >= line.start && state.input.length <= line.end;
          return (
            <div key={li} data-line={li} className="flex">
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
      className="[animation:caret-blink_1s_step-end_infinite] border-l-2 border-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
    />
  );
}
