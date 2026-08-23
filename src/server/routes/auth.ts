import { Env } from "../types";
import {
  hashPassword,
  verifyPassword,
  createSession,
  deleteSession,
  getSessionUser,
  sessionSetCookie,
  sessionClearCookie,
  type SessionUser,
} from "../auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bad = (message: string, status = 400) => Response.json({ error: message }, { status });

interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}

async function readJson<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function userResponse(user: SessionUser, cookie: string, status = 200): Response {
  return new Response(JSON.stringify({ user }), {
    status,
    headers: { "Content-Type": "application/json", "Set-Cookie": cookie },
  });
}

export async function register(request: Request, env: Env): Promise<Response> {
  const body = await readJson<Credentials>(request);
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";
  const displayName = (body?.displayName ?? "").trim();
  if (!EMAIL_RE.test(email) || email.length > 254)
    return bad("올바른 이메일 형식이 아닙니다");
  // 최대 길이 제한: PBKDF2가 거대 입력을 해시하는 CPU DoS 방지
  if (password.length < 8 || password.length > 128)
    return bad("비밀번호는 8~128자여야 합니다");
  if (displayName.length < 2 || displayName.length > 20)
    return bad("닉네임은 2~20자여야 합니다");

  const exists = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (exists) return bad("이미 가입된 이메일입니다", 409);

  const result = await env.DB.prepare(
    "INSERT INTO users (email, display_name, password_hash) VALUES (?, ?, ?)"
  )
    .bind(email, displayName, await hashPassword(password))
    .run();
  const user = { id: Number(result.meta.last_row_id), email, displayName };
  return userResponse(user, sessionSetCookie(await createSession(env.DB, user.id)), 201);
}

export async function login(request: Request, env: Env): Promise<Response> {
  const body = await readJson<Credentials>(request);
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";
  const row = await env.DB.prepare(
    "SELECT id, email, display_name, password_hash FROM users WHERE email = ?"
  ).bind(email).first<{ id: number; email: string; display_name: string; password_hash: string }>();
  if (!row || !(await verifyPassword(password, row.password_hash)))
    return bad("이메일 또는 비밀번호가 올바르지 않습니다", 401);
  const user = { id: row.id, email: row.email, displayName: row.display_name };
  return userResponse(user, sessionSetCookie(await createSession(env.DB, user.id)));
}

export async function logout(request: Request, env: Env): Promise<Response> {
  await deleteSession(request, env.DB);
  return new Response(JSON.stringify({}), {
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionClearCookie },
  });
}

export async function me(request: Request, env: Env): Promise<Response> {
  const user = await getSessionUser(request, env.DB);
  return user
    ? Response.json({ user })
    : Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
}
