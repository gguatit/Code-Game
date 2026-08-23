import { Env } from "../types";
import { getSessionUser } from "../auth";

const CATEGORIES = new Set(["terms", "short", "long", "practical"]);
const LANGUAGE_IDS = new Set([
  "js-ts",
  "python",
  "java",
  "c-cpp",
  "csharp",
  "go",
  "rust",
  "kotlin",
  "swift",
  "php",
  "ruby",
  "shell",
  "sql",
  "html-css",
  "dart",
  "lua",
  "haskell",
  "elixir",
  "scala",
  "perl",
  "zig",
  "nim",
]);

interface ScoreInput {
  category?: string;
  language?: string;
  wpm?: number;
  accuracy?: number;
  durationMs?: number;
}

export async function saveScore(request: Request, env: Env): Promise<Response> {
  const user = await getSessionUser(request, env.DB);
  if (!user) return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });

  let body: ScoreInput;
  try {
    body = (await request.json()) as ScoreInput;
  } catch {
    return Response.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { category, language, wpm, accuracy, durationMs } = body;
  if (!CATEGORIES.has(category ?? "") || !LANGUAGE_IDS.has(language ?? ""))
    return Response.json({ error: "잘못된 카테고리/언어" }, { status: 400 });
  // ponytail: sanity cap만 적용(비정상 값 거부). rate limiting은 나중 할일
  if (
    typeof wpm !== "number" ||
    typeof accuracy !== "number" ||
    typeof durationMs !== "number" ||
    wpm <= 0 ||
    wpm > 350 ||
    accuracy < 0 ||
    accuracy > 100 ||
    durationMs < 2000 ||
    durationMs > 3600_000
  )
    return Response.json({ error: "비정상적인 기록입니다" }, { status: 422 });

  await env.DB.prepare(
    "INSERT INTO scores (user_id, category, language, wpm, accuracy, duration_ms) VALUES (?, ?, ?, ?, ?, ?)"
  )
    .bind(user.id, category, language, wpm, accuracy, Math.round(durationMs))
    .run();

  return Response.json({ saved: true });
}

export async function leaderboard(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "";
  const language = url.searchParams.get("language") ?? "";
  const limit = Math.min(Number(url.searchParams.get("limit")) || 20, 50);
  if (!CATEGORIES.has(category))
    return Response.json({ error: "category 파라미터가 필요합니다" }, { status: 400 });

  let sql = `SELECT u.display_name AS displayName, MAX(s.wpm) AS wpm
             FROM scores s JOIN users u ON u.id = s.user_id WHERE s.category = ?`;
  const binds: (string | number)[] = [category];
  if (language) {
    sql += " AND s.language = ?";
    binds.push(language);
  }
  sql += " GROUP BY s.user_id ORDER BY wpm DESC LIMIT ?";
  binds.push(limit);

  const { results } = await env.DB.prepare(sql).bind(...binds).all();
  return Response.json({ entries: results });
}
