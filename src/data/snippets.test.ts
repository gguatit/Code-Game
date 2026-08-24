import { describe, expect, it } from "vitest";
import { CATEGORIES } from "./categories";
import { LANGUAGES } from "./languages";
import { MIN_COUNTS, REGISTRY, getSnippets } from "./snippets";

describe("snippets", () => {
  it("registry covers every language", () => {
    for (const lang of LANGUAGES) {
      expect(REGISTRY[lang.id]).toBeDefined();
    }
  });

  for (const lang of LANGUAGES) {
    for (const cat of CATEGORIES) {
      it(`${lang.id}/${cat.id} has at least ${MIN_COUNTS[cat.id]} snippets`, () => {
        const snippets = getSnippets(lang.id, cat.id);
        expect(snippets.length).toBeGreaterThanOrEqual(MIN_COUNTS[cat.id]);
      });
    }
  }

  it("no snippet is empty", () => {
    for (const lang of LANGUAGES) {
      for (const cat of CATEGORIES) {
        for (const s of getSnippets(lang.id, cat.id)) {
          expect(s.trim().length).toBeGreaterThan(0);
        }
      }
    }
  });

  it.each(LANGUAGES.map((l) => l.id))("%s: no emoji", (langId) => {
    const emoji =
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F000}-\u{1F02F}]/u;
    for (const lang of LANGUAGES.filter((l) => l.id === langId)) {
      for (const cat of CATEGORIES) {
        for (const s of getSnippets(lang.id, cat.id)) {
          expect(s).not.toMatch(emoji);
        }
      }
    }
  });

  // 모든 문제 길이 통일: 이 밴드를 벗어나면 장문/실전 불일치가 재발한다
  // 실전은 장문보다 길고 복잡한 프로덕션 수준 코드를 지향
  const BANDS: Record<string, { min: number; max: number }> = {
    long: { min: 26, max: 36 },
    practical: { min: 38, max: 54 },
  };

  it("every snippet is within the length band", () => {
    for (const lang of LANGUAGES) {
      for (const cat of CATEGORIES) {
        const band = BANDS[cat.id];
        for (const s of getSnippets(lang.id, cat.id)) {
          const lines = s.split("\n").length;
          expect(
            lines,
            `${lang.id}/${cat.id}: ${lines} lines`
          ).toBeGreaterThanOrEqual(band.min);
          expect(
            lines,
            `${lang.id}/${cat.id}: ${lines} lines`
          ).toBeLessThanOrEqual(band.max);
        }
      }
    }
  });

  it("every snippet is ASCII only", () => {
    for (const lang of LANGUAGES) {
      for (const cat of CATEGORIES) {
        for (const s of getSnippets(lang.id, cat.id)) {
          expect(s).toMatch(/^[\x20-\x7E\n\t]*$/);
        }
      }
    }
  });

  it("brackets are balanced in every snippet", () => {
    const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
    for (const lang of LANGUAGES) {
      for (const cat of CATEGORIES) {
        for (const s of getSnippets(lang.id, cat.id)) {
          // 문자열 리터럴 내용은 무시하고 코드 구조의 괄호만 검사
          // - \( 등 괄호 앞 백슬래시(Haskell 람다)는 제거하지 않음
          // - 식별자 뒤 어포스트로피(foldl' 같은 prime)는 문자열 시작으로 보지 않음
          const stripped = s
            .replace(/\\(?![([{)\]}])/g, "")
            .replace(/"[^"\n]*"/g, "")
            .replace(/(?<![\w])'[^'\n]*'/g, "");
          const stack: string[] = [];
          for (const ch of stripped) {
            if ("([{".includes(ch)) {
              stack.push(ch);
            } else if (ch in pairs) {
              expect(stack.pop(), `${lang.id}/${cat.id}: unbalanced`).toBe(
                pairs[ch]
              );
            }
          }
          expect(stack, `${lang.id}/${cat.id}: unclosed`).toHaveLength(0);
        }
      }
    }
  });
});
