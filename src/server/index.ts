import { Env } from "./types";
import { register, login, logout, me } from "./routes/auth";
import { saveScore, leaderboard, myRank, myScores } from "./routes/scores";

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      const p = url.pathname;
      if (p === "/api/auth/register" && request.method === "POST") return register(request, env);
      if (p === "/api/auth/login" && request.method === "POST") return login(request, env);
      if (p === "/api/auth/logout" && request.method === "POST") return logout(request, env);
      if (p === "/api/me" && request.method === "GET") return me(request, env);
      if (p === "/api/scores" && request.method === "POST") return saveScore(request, env);
      if (p === "/api/leaderboard" && request.method === "GET") return leaderboard(request, env);
      if (p === "/api/leaderboard/me" && request.method === "GET") return myRank(request, env);
      if (p === "/api/profile" && request.method === "GET") return myScores(request, env);
      return Response.json({ error: "Not Found" }, { status: 404 });
    } catch (err) {
      console.error(err);
      return Response.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
