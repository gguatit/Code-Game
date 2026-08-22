export interface PersonalBest {
  wpm: number;
}

const storageKey = (lang: string, category: string) => `pb:${lang}:${category}`;

export function getBest(lang: string, category: string): PersonalBest | null {
  const raw = localStorage.getItem(storageKey(lang, category));
  return raw === null ? null : (JSON.parse(raw) as PersonalBest);
}

export function saveBest(lang: string, category: string, wpm: number): void {
  const prev = getBest(lang, category);
  if (prev === null || wpm > prev.wpm) {
    localStorage.setItem(storageKey(lang, category), JSON.stringify({ wpm }));
  }
}

export function isNewRecord(lang: string, category: string, wpm: number): boolean {
  const prev = getBest(lang, category);
  return prev === null || wpm > prev.wpm;
}
