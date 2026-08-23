import { Env } from "../types";
import { getSessionUser } from "../auth";

const CATEGORIES = new Set(["long", "practical"]);
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
  // ponytail: sanity cap + 제출 간격 검사. IP 기반 레이트리밋은 Cloudflare WAF 룰로 처리
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

  // 플레이 시간보다 짧은 간격으로 연속 제출하면 조작으로 간주 (여유 2초)
  const last = await env.DB
    .prepare("SELECT created_at FROM scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 1")
    .bind(user.id)
    .first<{ created_at: string }>();
  if (last) {
    const gapMs = Date.now() - Date.parse(last.created_at);
    if (gapMs < durationMs - 2000)
      return Response.json({ error: "제출이 너무 빠릅니다" }, { status: 429 });
  }

  await env.DB.prepare(
    "INSERT INTO scores (user_id, category, language, wpm, accuracy, duration_ms, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    // created_at을 ISO로 직접 기록(datetime('now')는 초 단위+현지파싱 모호)
    .bind(user.id, category, language, wpm, accuracy, Math.round(durationMs), new Date().toISOString())
    .run();

  return Response.json({ saved: true });
}

export async function leaderboard(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "";
  const language = url.searchParams.get("language") ?? "";
  // SQLite는 LIMIT 음수를 무제한으로 취급하므로 하한도 클램프
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 20, 1), 50);
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
