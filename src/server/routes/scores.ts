import { Env } from "../types";

// ponytail: Task 14에서 saveScore/leaderboard 구현으로 교체
export async function saveScore(): Promise<Response> {
  return Response.json({ error: "Not implemented" }, { status: 501 });
}

export async function leaderboard(_env?: Env): Promise<Response> {
  return Response.json({ error: "Not implemented" }, { status: 501 });
}
