import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryId } from "@/data/categories";
import type { LanguageDef } from "@/data/languages";
import type { Stats } from "@/engine/types";
import { getBest, isNewRecord, saveBest } from "@/lib/personal-best";

interface ResultCardProps {
  stats: Stats;
  language: LanguageDef;
  category: CategoryId;
  onRestart: () => void;
}

export function ResultCard({ stats, language, category, onRestart }: ResultCardProps) {
  // ponytail: useMemo([]) — 렌더 시점(저장 전) 최고기록 읽기. StrictMode 이중 effect에도 표시 안정
  const record = useMemo(() => isNewRecord(language.id, category, stats.wpm), []);
  const [best, setBest] = useState<number | null>(() => getBest(language.id, category)?.wpm ?? null);

  useEffect(() => {
    saveBest(language.id, category, stats.wpm);
    setBest(getBest(language.id, category)?.wpm ?? stats.wpm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="mx-auto max-w-md text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          결과 {record && <Badge>신기록</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-bold tabular-nums">{stats.wpm}</div>
        <div className="text-sm text-muted-foreground">WPM</div>
        <dl className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <dt className="text-muted-foreground">정확도</dt>
            <dd className="font-semibold tabular-nums">{stats.accuracy}%</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">시간</dt>
            <dd className="font-semibold tabular-nums">{(stats.elapsedMs / 1000).toFixed(1)}s</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">개인 최고</dt>
            <dd className="font-semibold tabular-nums">{best ?? "-"} WPM</dd>
          </div>
        </dl>
        <div className="flex justify-center gap-2 pt-2">
          <Button onClick={onRestart}>다시 연습</Button>
          <Button variant="outline" asChild>
            <Link to="/leaderboard">리더보드</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
