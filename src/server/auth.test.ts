import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./auth";

describe("password hashing", () => {
  it("올바른 비밀번호는 검증 성공", async () => {
    const stored = await hashPassword("correct horse battery");
    expect(await verifyPassword("correct horse battery", stored)).toBe(true);
  });
  it("틀린 비밀번호는 실패", async () => {
    const stored = await hashPassword("password123");
    expect(await verifyPassword("password124", stored)).toBe(false);
  });
  it("손상된 해시 문자열은 false", async () => {
    expect(await verifyPassword("x", "garbage")).toBe(false);
  });
});
