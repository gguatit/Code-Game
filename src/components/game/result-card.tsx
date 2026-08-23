import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/app/auth-context";
import { useT } from "@/app/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Confetti } from "@/components/game/confetti";
import { WpmChart } from "@/components/game/wpm-chart";
import type { CategoryId } from "@/data/categories";
import type { LanguageDef } from "@/data/languages";
import type { Stats } from "@/engine/types";
import { api } from "@/lib/api";
import { grade } from "@/lib/grade";
import { getBest, isNewRecord, saveBest } from "@/lib/personal-best";
import { useCountUp } from "@/lib/use-count-up";

interface ResultCardProps {
  stats: Stats;
  language: LanguageDef;
  category: CategoryId;
  series: readonly number[];
  onRestart: () => void;
}

export function ResultCard({ stats, language, category, series, onRestart }: ResultCardProps) {
  // ponytail: useMemo([]) — 렌더 시점(저장 전) 최고기록 읽기. StrictMode 이중 effect에도 표시 안정
  const record = useMemo(() => isNewRecord(language.id, category, stats.wpm), []);
  const [best, setBest] = useState<number | null>(() => getBest(language.id, category)?.wpm ?? null);
  const { user } = useAuth();
  const { t } = useT();
  const [saveState, setSaveState] = useState<"saving" | "saved" | "error">("saving");
  const requested = useRef(false);
  const wpmDisplay = useCountUp(stats.wpm);

  useEffect(() => {
    saveBest(language.id, category, stats.wpm);
    setBest(getBest(language.id, category)?.wpm ?? stats.wpm);
    if (!user || requested.current) return;
    requested.current = true;
    api
      .saveScore({
        category,
        language: language.id,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        durationMs: stats.elapsedMs,
      })
      .then(() => setSaveState("saved"))
      .catch(() => setSaveState("error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      className={`relative mx-auto max-w-md overflow-hidden text-center ${record ? "ring-2 ring-sky-500/50 shadow-[0_0_60px_-15px_rgba(14,165,233,0.5)]" : ""}`}
    >
      <Confetti show={record} />
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          {t("result.title")} {record && <Badge>{t("result.newRecord")}</Badge>}
          {user &&
            (saveState === "saved" ? (
              <Badge>{t("result.saved")}</Badge>
            ) : saveState === "error" ? (
              <Badge variant="destructive">{t("result.saveFailed")}</Badge>
            ) : (
              <Badge variant="outline">{t("result.saving")}</Badge>
            ))}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="font-heading text-6xl font-bold tabular-nums text-sky-500">
            {wpmDisplay}
          </div>
          <div className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            WPM
            <Badge variant="outline" className="font-heading text-sky-500">
              {grade(stats.wpm)}
            </Badge>
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <dt className="text-muted-foreground">{t("result.accuracy")}</dt>
            <dd className="font-semibold tabular-nums">{stats.accuracy}%</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("result.time")}</dt>
            <dd className="font-semibold tabular-nums">{(stats.elapsedMs / 1000).toFixed(1)}s</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{t("result.best")}</dt>
            <dd className="font-semibold tabular-nums">{best ?? "-"} WPM</dd>
          </div>
        </dl>
        <div>
          <div className="mb-1 text-xs text-muted-foreground">{t("result.trend")}</div>
          <WpmChart series={series} />
        </div>
        {!user && (
          <p className="text-sm text-muted-foreground">
            <Link to="/login" className="underline hover:text-foreground">
              {t("result.signin")}
            </Link>
            {t("result.toSaveScores")}
          </p>
        )}
        <div className="flex justify-center gap-2 pt-2">
          <Button onClick={onRestart}>{t("result.restart")}</Button>
          <Button variant="outline" asChild>
            <Link to="/leaderboard">{t("result.boardBtn")}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
