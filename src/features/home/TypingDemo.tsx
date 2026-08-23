import { useEffect, useState } from "react";

const DEMO_TEXT =
  'const wpm = (chars / 5) / minutes;\nconsole.log(`speed: ${wpm} WPM`);';

export function TypingDemo() {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setTyped((n) => (n >= DEMO_TEXT.length ? 0 : n + 1));
    }, 45);
    return () => clearInterval(id);
  }, []);

  const done = typed >= DEMO_TEXT.length;
  const shown = DEMO_TEXT.slice(0, typed).split("\n");

  return (
    <div className="mx-auto mt-10 w-full max-w-xl rounded-xl border bg-card p-4 text-left font-mono text-sm shadow-sm">
      {shown.map((line, i) => (
        <div key={i} className="flex">
          <span className="mr-3 select-none text-muted-foreground/50">{i + 1}</span>
          <span className="whitespace-pre-wrap">
            {line}
            {i === shown.length - 1 && (
              <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-sky-400 align-middle" />
            )}
          </span>
        </div>
      ))}
      {done && (
        <div className="mt-2 text-xs text-emerald-500">ok, finished in demo time</div>
      )}
    </div>
  );
}
