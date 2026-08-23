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
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-3xl bg-sky-500/10 blur-2xl"
      />
      <div className="overflow-hidden rounded-xl border bg-card shadow-lg shadow-black/20 transition-transform duration-300 lg:-rotate-1 lg:hover:rotate-0">
        <div className="flex items-center gap-1.5 border-b px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-red-500/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            coffeetocode — zsh
          </span>
        </div>
        <div className="p-4 text-left font-mono text-sm">
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
      </div>
    </div>
  );
}
