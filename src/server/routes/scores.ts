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

  let sql = `SELECT s.user_id AS userId, u.display_name AS displayName, MAX(s.wpm) AS wpm
             FROM scores s JOIN users u ON u.id = s.user_id WHERE s.category = ?`;
  const binds: (string | number)[] = [category];
  if (language) {
    sql += " AND s.language = ?";
    binds.push(language);
  }
  sql += " GROUP BY s.user_id ORDER BY wpm DESC LIMIT ?";
  binds.push(limit);

  const { results: rows } = await env.DB.prepare(sql)
    .bind(...binds)
    .all<{ userId: number; displayName: string; wpm: number }>();

  // 각 유저가 해당 카테고리에서 도전한 언어 목록
  const langMap = new Map<number, string[]>();
  if (rows.length > 0) {
    const ph = rows.map(() => "?").join(",");
    const { results: langRows } = await env.DB.prepare(
      `SELECT user_id, language FROM scores WHERE category = ? AND user_id IN (${ph})
       GROUP BY user_id, language ORDER BY language`
    )
      .bind(category, ...rows.map((r) => r.userId))
      .all<{ user_id: number; language: string }>();
    for (const r of langRows) {
      const list = langMap.get(r.user_id) ?? [];
      list.push(r.language);
      langMap.set(r.user_id, list);
    }
  }

  return Response.json({
    entries: rows.map((r) => ({
      displayName: r.displayName,
      wpm: r.wpm,
      languages: langMap.get(r.userId) ?? [],
    })),
  });
}

export async function myRank(request: Request, env: Env): Promise<Response> {
  const user = await getSessionUser(request, env.DB);
  if (!user) return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });

  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "";
  const language = url.searchParams.get("language") ?? "";
  if (!CATEGORIES.has(category))
    return Response.json({ error: "category 파라미터가 필요합니다" }, { status: 400 });

  const langOk = LANGUAGE_IDS.has(language);
  const langCond = langOk ? " AND s.language = ?" : "";
  const args = langOk ? [language] : [];

  const myBest = await env.DB.prepare(
    `SELECT MAX(wpm) AS w FROM scores WHERE user_id = ? AND category = ?`
  )
    .bind(user.id, category)
    .first<{ w: number | null }>();
  if (!myBest || myBest.w === null) return Response.json({ rank: null, total: null });

  const totalRow = await env.DB.prepare(
    `SELECT COUNT(DISTINCT s.user_id) AS total FROM scores s WHERE s.category = ?${langCond}`
  )
    .bind(category, ...args)
    .first<{ total: number }>();
  const betterRow = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM (
       SELECT user_id FROM scores s WHERE s.category = ?${langCond}
       GROUP BY user_id HAVING MAX(wpm) > ?
     )`
  )
    .bind(category, ...args, myBest.w)
    .first<{ n: number }>();

  return Response.json({ rank: (betterRow?.n ?? 0) + 1, total: totalRow?.total ?? 0 });
}

export async function myScores(request: Request, env: Env): Promise<Response> {
  const user = await getSessionUser(request, env.DB);
  if (!user) return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });

  const totals = await env.DB.prepare(
    "SELECT COUNT(*) AS games, COALESCE(SUM(duration_ms), 0) AS totalMs FROM scores WHERE user_id = ?"
  )
    .bind(user.id)
    .first<{ games: number; totalMs: number }>();
  const best = await env.DB.prepare(
    "SELECT language, category, MAX(wpm) AS wpm FROM scores WHERE user_id = ? GROUP BY language, category"
  )
    .bind(user.id)
    .all();
  const recent = await env.DB.prepare(
    `SELECT category, language, wpm, accuracy, duration_ms AS durationMs, created_at AS createdAt
     FROM scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`
  )
    .bind(user.id)
    .all();

  return Response.json({
    totals: totals ?? { games: 0, totalMs: 0 },
    best: best.results,
    recent: recent.results,
  });
}
