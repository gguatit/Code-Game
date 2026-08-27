import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { Grid } from "@/components/charts/grid";
import { XAxis } from "@/components/charts/x-axis";
import { ChartTooltip } from "@/components/charts/tooltip";

type TrendPoint = {
  date: Date;
  wpm: number;
  accuracy: number;
};

export function TrendChart({ data }: { data: TrendPoint[] }) {
  if (data.length < 2) return null;
  return (
    <div className="w-full">
      <LineChart
        data={data as unknown as Record<string, unknown>[]}
        xDataKey="date"
        aspectRatio="16 / 9"
        margin={{ top: 10, right: 12, bottom: 24, left: 28 }}
        className="w-full"
      >
        <Grid />
        <XAxis />
        <Line
          dataKey="wpm"
          stroke="var(--chart-line-primary)"
          strokeWidth={2.2}
        />
        <Line
          dataKey="accuracy"
          yAxisId="right"
          stroke="oklch(0.6 0.15 162)"
          strokeWidth={1.8}
        />
        <ChartTooltip />
      </LineChart>
      <div className="mt-1 flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[var(--chart-line-primary)]" />
          WPM
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[oklch(0.6_0.15_162)]" />
          정확도
        </span>
      </div>
    </div>
  );
}
