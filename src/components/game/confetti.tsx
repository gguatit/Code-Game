import { useMemo } from "react";

const COLORS = ["#fbbf24", "#fb923c", "#f87171", "#34d399", "#38bdf8"];

interface Piece {
  left: number;
  delay: number;
  duration: number;
  color: string;
  w: number;
  h: number;
}

export function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.2 + Math.random() * 0.9,
        color: COLORS[i % COLORS.length],
        w: 5 + Math.random() * 4,
        h: 8 + Math.random() * 5,
      })),
    []
  );

  if (!show || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: 1,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  );
}
