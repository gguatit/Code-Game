import { Badge } from "@/components/ui/badge";
import { useT } from "@/app/locale";
import type { Stats } from "@/engine/types";

export function StatsBar({ stats }: { stats: Stats }) {
  const { t } = useT();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary" data-testid="wpm">
        {stats.wpm} WPM
      </Badge>
      <Badge variant="secondary">
        {t("stats.accuracy")} {stats.accuracy}%
      </Badge>
      <Badge variant="secondary">
        {t("stats.progress")} {stats.progress}%
      </Badge>
    </div>
  );
}
