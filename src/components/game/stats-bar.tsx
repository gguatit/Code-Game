import { Badge } from "@/components/ui/badge";
import type { Stats } from "@/engine/types";

export function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="secondary" data-testid="wpm">
        {stats.wpm} WPM
      </Badge>
      <Badge variant="secondary">정확도 {stats.accuracy}%</Badge>
      <Badge variant="secondary">진행 {stats.progress}%</Badge>
    </div>
  );
}
