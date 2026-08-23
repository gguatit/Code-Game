const ITERATIONS = 100_000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const toB64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function deriveBits(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations }, keyMaterial, 256
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2:${ITERATIONS}:${toB64(salt)}:${toB64(await deriveBits(password, salt, ITERATIONS))}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [, iterStr, saltB64, hashB64] = stored.split(":");
  const iterations = Number(iterStr);
  if (!iterations || !saltB64 || !hashB64) return false;
  const computed = await deriveBits(password, fromB64(saltB64), iterations);
  const expected = fromB64(hashB64);
  // ponytail: 단순 비교 — 타이밍 공격 대비 constant-time compare가 필요해지면 교체
  return computed.length === expected.length && computed.every((b, i) => b === expected[i]);
}

export async function createSession(db: D1Database, userId: number): Promise<string> {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)),
    (b) => b.toString(16).padStart(2, "0")).join("");
  // 만료된 세션 행 정리 (로그인/가입 빈도가 낮아 여기서 일괄 청소)
  await db.prepare("DELETE FROM sessions WHERE expires_at <= ?")
    .bind(new Date().toISOString()).run();
  await db.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, userId, new Date(Date.now() + SESSION_TTL_MS).toISOString()).run();
  return token;
}

export function sessionSetCookie(token: string): string {
  return `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}`;
}
export const sessionClearCookie =
  "session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";

export interface SessionUser { id: number; email: string; displayName: string }

const readToken = (request: Request): string | null =>
  request.headers.get("Cookie")?.match(/(?:^|;\s*)session=([a-f0-9]{64})/)?.[1] ?? null;

export async function getSessionUser(request: Request, db: D1Database): Promise<SessionUser | null> {
  const token = readToken(request);
  if (!token) return null;
  const row = await db.prepare(
    `SELECT u.id, u.email, u.display_name FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token = ? AND s.expires_at > ?`
  ).bind(token, new Date().toISOString()).first<{ id: number; email: string; display_name: string }>();
  return row && { id: row.id, email: row.email, displayName: row.display_name };
}

export async function deleteSession(request: Request, db: D1Database): Promise<void> {
  const token = readToken(request);
  if (token) await db.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
}
