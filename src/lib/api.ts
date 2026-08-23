export interface SessionUser {
  id: number;
  email: string;
  displayName: string;
}

async function post(path: string, body?: unknown): Promise<Response> {
  return fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
}

async function data<T>(res: Response): Promise<T> {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string }).error ?? res.statusText);
  return json as T;
}

export interface ScoreInput {
  category: string;
  language: string;
  wpm: number;
  accuracy: number;
  durationMs: number;
}

export interface LeaderboardEntry {
  displayName: string;
  wpm: number;
}

export interface MyRank {
  rank: number | null;
  total: number | null;
}

export interface ProfileData {
  totals: { games: number; totalMs: number };
  best: { language: string; category: string; wpm: number }[];
  recent: {
    category: string;
    language: string;
    wpm: number;
    accuracy: number;
    durationMs: number;
    createdAt: string;
  }[];
}

export const api = {
  me: async (): Promise<SessionUser | null> => {
    const r = await fetch("/api/me");
    if (!r.ok) return null;
    return ((await r.json()) as { user: SessionUser }).user;
  },
  register: (email: string, password: string, displayName: string) =>
    post("/api/auth/register", { email, password, displayName }).then((r) =>
      data<{ user: SessionUser }>(r)
    ),
  login: (email: string, password: string) =>
    post("/api/auth/login", { email, password }).then((r) => data<{ user: SessionUser }>(r)),
  logout: () => post("/api/auth/logout"),
  saveScore: (s: ScoreInput) =>
    post("/api/scores", s).then((r) => data<{ saved: boolean }>(r)),
  leaderboard: (category: string, language?: string) =>
    fetch(`/api/leaderboard?category=${category}${language ? `&language=${language}` : ""}`).then(
      (r) => data<{ entries: LeaderboardEntry[] }>(r)
    ),
  myRank: async (category: string, language?: string): Promise<MyRank | null> => {
    const r = await fetch(
      `/api/leaderboard/me?category=${category}${language ? `&language=${language}` : ""}`
    );
    if (!r.ok) return null;
    return data<MyRank>(r);
  },
  profile: async (): Promise<ProfileData | null> => {
    const r = await fetch("/api/profile");
    if (!r.ok) return null;
    return data<ProfileData>(r);
  },
};
