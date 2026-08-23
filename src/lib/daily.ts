import { CATEGORIES, type CategoryId } from "@/data/categories";
import { LANGUAGES } from "@/data/languages";

const fnv1a = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
};

// UTC 날짜 기준 — 전 유저가 같은 날 같은 문제를 받도록 고정
const todayKey = (): string => new Date().toISOString().slice(0, 10);

export function dailyChallenge(): { langId: string; category: CategoryId } {
  const h = fnv1a(todayKey());
  return {
    langId: LANGUAGES[h % LANGUAGES.length]!.id,
    category: CATEGORIES[(h >>> 8) % CATEGORIES.length]!.id,
  };
}

export function pickDaily<T>(items: readonly T[], seed: string): T {
  return items[fnv1a(`${todayKey()}:${seed}`) % items.length]!;
}
