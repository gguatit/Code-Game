import { describe, expect, it } from "vitest";
import { applyBackspace, applyKey, charStatuses, initState } from "./typing";

describe("applyKey", () => {
  it("첫 printable 키에서 startedAt 기록", () => {
    const s = applyKey(initState("abc"), "x");
    expect(s.startedAt).not.toBeNull();
    expect(s.input).toBe("x");
    expect(s.correctKeys).toBe(0);
    expect(s.wrongKeys).toBe(1);
  });

  it("정타는 correctKeys 증가", () => {
    const s = applyKey(initState("abc"), "a");
    expect(s.correctKeys).toBe(1);
    expect(s.wrongKeys).toBe(0);
  });

  it("완료 후 추가 키 무시", () => {
    let s = initState("ab");
    s = applyKey(s, "a");
    s = applyKey(s, "b");
    expect(s.finishedAt).not.toBeNull();
    const after = applyKey(s, "c");
    expect(after.input).toBe("ab");
  });

  it("Escape 등 non-printable은 무시(새 문제 재시작은 페이지 레벨에서 처리)", () => {
    const init = initState("abc");
    expect(applyKey(init, "Escape")).toBe(init);
    expect(applyKey(init, "Shift")).toBe(init);
    expect(applyKey(init, "F5")).toBe(init);
  });

  it("줄바꿈(Enter)은 타이핑 가능 문자로 처리", () => {
    let s = applyKey(initState("a\nb"), "a");
    s = applyKey(s, "\n");
    expect(s.input).toBe("a\n");
    expect(s.correctKeys).toBe(2);
  });
});

describe("applyBackspace", () => {
  it("input 마지막 글자 제거, 키 카운터는 누적 유지", () => {
    // ponytail: 누적 카운터 유지 - 정확도를 '입력 노력' 기준으로 단순화
    let s = applyKey(initState("abc"), "a");
    s = applyKey(s, "z");
    s = applyBackspace(s);
    expect(s.input).toBe("a");
    expect(s.correctKeys).toBe(1);
    expect(s.wrongKeys).toBe(1);
  });

  it("빈 input에서 무시", () => {
    const init = initState("abc");
    expect(applyBackspace(init)).toBe(init);
  });
});

describe("charStatuses", () => {
  it("입력 전=pending, 일치=correct, 불일치=wrong", () => {
    let s = initState("abc");
    s = applyKey(s, "a");
    s = applyKey(s, "z"); // 오타
    expect(charStatuses(s)).toEqual(["correct", "wrong", "pending"]);
  });
});

describe("initState", () => {
  it("초기 상태", () => {
    expect(initState("hello")).toEqual({
      text: "hello",
      input: "",
      startedAt: null,
      finishedAt: null,
      correctKeys: 0,
      wrongKeys: 0,
    });
  });
});
