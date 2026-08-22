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
});
