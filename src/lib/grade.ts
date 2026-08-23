export type Grade = "S" | "A" | "B" | "C";

// ponytail: 고정 컷 — 데이터 쌓이면 언어·카테고리별 분위수로 조정
export function grade(wpm: number): Grade {
  if (wpm >= 90) return "S";
  if (wpm >= 70) return "A";
  if (wpm >= 50) return "B";
  return "C";
}
