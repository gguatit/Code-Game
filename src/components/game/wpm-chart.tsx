// ponytail: 차트 라이브러리 대신 SVG polyline 스파크라인 — 필요해지면 Recharts 도입
export function WpmChart({ series }: { series: readonly number[] }) {
  if (series.length < 2) return null;
  const max = Math.max(...series, 1);
  const pts = series
    .map((w, i) => `${(i / (series.length - 1)) * 100},${38 - (w / max) * 34}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-20 w-full text-sky-500">
      <polygon points={`0,40 ${pts} 100,40`} fill="currentColor" opacity="0.15" />
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
