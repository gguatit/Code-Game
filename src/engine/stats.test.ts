import { describe, expect, it } from "vitest";
import { initState } from "@/engine/typing";
import { computeStats } from "@/engine/stats";

describe("computeStats", () => {
  const base = {
    text: "a".repeat(50),
    input: "a".repeat(50),
    startedAt: 0 as number | null,
    finishedAt: 60_000 as number | null,
    correctKeys: 50,
    wrongKeys: 0,
  };

  it("미시작 상태는 전부 0", () => {
    expect(computeStats(initState("hello"))).toEqual({
      wpm: 0,
      accuracy: 100,
      progress: 0,
      elapsedMs: 0,
    });
  });

  it("WPM = (정확 위치 글자수 / 5) / 경과 분 -> 60초에 50자면 10 WPM", () => {
    expect(computeStats(base).wpm).toBe(10);
  });

  it("오타 글자는 WPM에서 제외", () => {
    const s = computeStats({ ...base, input: "a".repeat(49) + "x", wrongKeys: 1 });
    expect(s.wpm).toBe(10);
  });

  it("정확도 = 정타키 / 전체키 (%)", () => {
    const s = computeStats({ ...base, correctKeys: 45, wrongKeys: 5 });
    expect(s.accuracy).toBe(90);
  });

  it("진행률 = 입력 글자수 / 전체 글자수 (%)", () => {
    const s = computeStats({ ...base, input: "a".repeat(25) });
    expect(s.progress).toBe(50);
  });

  it("elapsedMs는 진행 중이면 현재 시각 기준 (음수 방지)", () => {
    const now = Date.now();
    const s = computeStats({
      ...base,
      startedAt: now - 1000,
      finishedAt: null,
      input: "",
    });
    expect(s.elapsedMs).toBeGreaterThanOrEqual(999);
  });
});
