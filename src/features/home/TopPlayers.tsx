import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { api, type LeaderboardEntry } from "@/lib/api";

export function TopPlayers() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    let stale = false;
    api
      .leaderboard("long")
      .then((r) => !stale && setEntries(r.entries.slice(0, 5)))
      .catch(() => !stale && setEntries([]));
    return () => {
      stale = true;
    };
  }, []);

  if (entries !== null && entries.length === 0) return null;

  return (
    <section className="mt-16 w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Trophy className="size-5 text-amber-500" />
          장문 최고 기록
        </h2>
        <Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
          전체 보기
        </Link>
      </div>
      {entries === null ? (
        <div className="h-[120px] animate-pulse rounded-xl border bg-muted/40" />
      ) : (
        <ol className="divide-y rounded-xl border">
          {entries.map((e, i) => (
            <li key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="flex items-center gap-3">
                <span
                  className={
                    i === 0
                      ? "w-5 font-bold text-amber-500"
                      : i === 1
                        ? "w-5 font-bold text-slate-400"
                        : i === 2
                          ? "w-5 font-bold text-orange-700/80 dark:text-orange-400"
                          : "w-5 text-muted-foreground"
                  }
                >
                  {i + 1}
                </span>
                {e.displayName}
              </span>
              <span className="font-mono font-semibold">{Math.round(e.wpm)} WPM</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
