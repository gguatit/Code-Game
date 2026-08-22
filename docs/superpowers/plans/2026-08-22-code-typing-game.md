# Code-Game 구현 계획서

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development (권장) 또는 superpowers:executing-plans로 이 계획을 태스크 단위로 실행할 것. 체크박스(`- [ ]`)로 진행 추적.

**Goal:** 코딩 타자 연습 게임 — 15개 언어 × 용어/단문/장문/실전 콘텐츠를 완주 모드로 측정(WPM·정확도)하고, Cloudflare Workers + D1으로 회원 인증과 리더보드를 제공.

**Architecture:** Vite React SPA를 Cloudflare Worker의 정적 에셋으로 서빙하고, 같은 워커의 `/api/*`에서 인증·점수·리더보드 처리(단일 배포, CORS 없음). 게임 로직은 프레임워크 비종속 순수 TS 엔진(`src/engine`)으로 분리해 유닛 테스트. 콘텐츠는 `src/data/snippets/{lang}/{category}.ts` 파일 추가만으로 확장.

**Tech Stack:** Vite · React · TypeScript(strict) · Tailwind CSS v4 · shadcn/ui(zinc) · react-router · lucide-react · Vitest · Cloudflare Workers + D1

---

## 1. 확정 설계 요약

| 항목 | 결정 |
|---|---|
| 테마 | 다크 기본(zinc), 네비바에 다크/화이트 토글(Sun/Moon), localStorage 저장 |
| 라우트 | `/` 홈 · `/langs` 언어 3열 그리드 · `/play/:lang` 플레이 · `/leaderboard` · `/login` · `/signup` |
| 카테고리 | `terms`(용어) / `short`(단문) / `long`(장문) / `practical`(실전), 기본 선택 terms |
| 게임 규칙 | 텍스트 완주 모드, 영어 전용 입력(IME 불필요), 글자별 실시간 하이라이트(정타/오타), 백스페이스 허용, 첫 키 입력 시 타이머 시작, Esc 재시작(새 문제) |
| 지표 | WPM = (올바른 위치 글자 수 ÷ 5) ÷ 경과 분 · 정확도 = 정타 키수 ÷ 전체 키수 × 100 |
| 언어(15종) | js-ts, python, java, c-cpp, csharp, go, rust, kotlin, swift, php, ruby, shell, sql, html-css, dart |
| 백엔드 | 단일 Worker(SPA 에셋 + API). D1 테이블: users / sessions / scores |
| 인증 | 자체 회원가입(email + password≥8 + 닉네임 2~20자), PBKDF2-SHA256 100k 반복, HttpOnly 세션 쿠키 30일 |
| 저장 정책 | 비회원은 결과만 표시(저장 없음). 로그인 회원은 판 종료 시 자동 저장 → 리더보드 반영 |
| 리더보드 | 사용자별 최고 WPM 순위(TOP 20), 카테고리 필수 + 언어 필터 |
| 위변조 방지 | sanity cap만 적용: wpm≤350, accuracy≤100, durationMs≥2000 (rate limit은 나중 목록) |
| 아이콘 원칙 | 이모지 전면 금지(UI·빈 상태·콘텐츠 모두). UI 아이콘 = lucide-react, 언어 표시 = 자체 LangBadge SVG 컴포넌트(통일된 모노그램 배지) |
| 로고 | `logos/04_code_keyboard.svg`(currentColor+그라데이션) → 헤더 JSX 컴포넌트 + `public/favicon.svg` |

나중 할일(이번 범위 아님): 특이 언어 추가(Haskell/Elixir/Lua 등) · 한글 입력 지원 · 시간제한 모드 · API rate limiting · vitest-pool-workers API 통합 테스트

## 2. 폴더 구조

```
Code-Game/
├─ logos/                  # 기존 로고 SVG 원본
├─ public/favicon.svg      # 04_code_keyboard.svg 복사본
├─ src/
│  ├─ main.tsx             # 엔트리: ThemeProvider > AuthProvider > RouterProvider
│  ├─ index.css            # tailwind import + shadcn 토큰(@custom-variant dark 포함)
│  ├─ app/                 # 앱 골격
│  │  ├─ router.tsx        # 라우트 정의 + Layout
│  │  ├─ layout.tsx        # Navbar + <Outlet/> + Footer
│  │  ├─ theme.tsx         # 다크/라이트 프로바이더(다크 기본)
│  │  └─ auth-context.tsx  # 로그인 상태(useMe, login, signup, logout)
│  ├─ components/
│  │  ├─ ui/               # shadcn 생성 컴포넌트(button, card, tabs…)
│  │  ├─ logo.tsx          # 헤더 로고(JSX 인라인 SVG)
│  │  ├─ navbar.tsx        # 로고·메뉴·테마 토글·유저 메뉴
│  │  └─ game/             # lang-badge.tsx · typing-area.tsx · stats-bar.tsx · result-card.tsx
│  ├─ features/
│  │  ├─ home/HomePage.tsx · langs/LangsPage.tsx · play/PlayPage.tsx
│  │  └─ leaderboard/LeaderboardPage.tsx · auth/LoginPage.tsx · auth/SignupPage.tsx
│  ├─ engine/              # 순수 TS(React 없음) — 유닛 테스트 대상
│  │  ├─ types.ts · typing.ts · stats.ts · typing.test.ts · stats.test.ts
│  ├─ data/
│  │  ├─ languages.ts      # 15개 언어 레지스트리(id/name/monogram/color)
│  │  ├─ categories.ts     # 카테고리 레지스트리(id/label)
│  │  └─ snippets/{lang}/  # terms.ts short.ts long.ts practical.ts index.ts (×15)
│  ├─ lib/
│  │  ├─ utils.ts          # cn() (shadcn 생성)
│  │  ├─ api.ts            # fetch 클라이언트
│  │  └─ personal-best.ts  # localStorage 최고기록
│  └─ server/              # Cloudflare Worker
│     ├─ index.ts          # /api/* 라우팅, 나머지 ASSETS.fetch
│     ├─ types.ts          # Env { DB: D1Database; ASSETS: Fetcher }
│     ├─ auth.ts           # PBKDF2 해시/검증, 세션 CRUD, 쿠키
│     ├─ routes/auth.ts · routes/scores.ts
│     └─ db/schema.sql
├─ vite.config.ts · vitest.config.ts · wrangler.jsonc · package.json
```

핵심 원칙: `engine`은 순수 로직(테스트 용이), `data/snippets`는 콘텐츠만 분리(언어 추가 = 폴더 추가), `server`는 API만, `features`는 페이지별 묶음.

## 3. D1 스키마 (`src/server/db/schema.sql`)

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,           -- pbkdf2:{iter}:{salt_b64}:{hash_b64}
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,                -- 32바이트 hex
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL               -- ISO 8601
);
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('terms','short','long','practical')),
  language TEXT NOT NULL,
  wpm REAL NOT NULL,
  accuracy REAL NOT NULL,                -- 0~100
  duration_ms INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_scores_board ON scores(category, language, wpm DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
```

## 4. API 명세

| Method | Path | 요청 | 응답 |
|---|---|---|---|
| POST | `/api/auth/register` | `{email,password,displayName}` | `201 {user}` + Set-Cookie |
| POST | `/api/auth/login` | `{email,password}` | `{user}` + Set-Cookie |
| POST | `/api/auth/logout` | - | `{}` + Max-Age=0 쿠키 |
| GET | `/api/me` | - | `{user}` 또는 `401` |
| POST | `/api/scores` | `{category,language,wpm,accuracy,durationMs}` | `{saved:true}` 또는 `401`/`422` |
| GET | `/api/leaderboard?category=&language=&limit=` | - | `[{displayName,wpm}]` |

에러 공통 포맷: `{"error":"한국어 메시지"}`. `user`는 `{id,email,displayName}`.

콘텐츠 규격(`src/data/snippets/{lang}/{category}.ts`):

```ts
export const snippets = [
  "def greet(name):\n    return f\"Hello, {name}!\"",
];
```

- 개수/언어: terms 10개 · short 6개 · long 3개 · practical 2개 (= 21개 × 15 언어)
- 스타일 가이드: ASCII만 사용, 이모지 금지, 들여쓰기는 공백 4칸(언어 관례 우선), 각 언어의 관용적 문법 사용. terms는 단어/구(공백 포함 가능), short는 1~2문장 코드, long은 5~10줄, practical는 10~20줄 완성된 함수/스크립트. `\n`으로 줄 구분.

---

### Task 1: 프로젝트 스캐폴딩

**Files:** Create `vite.config.ts`, `vitest.config.ts`, `wrangler.jsonc`, `src/main.tsx`, `src/index.css`, Modify `.gitignore`, `package.json`, `tsconfig.app.json`

- [ ] Vite React-TS 스캐폴딩 + 의존성 설치

```bash
npm create vite@latest . -- --template react-ts
npm i react-router-dom lucide-react tailwindcss @tailwindcss/vite @cloudflare/vite-plugin
npm i -D vitest wrangler @cloudflare/workers-types
```

- [ ] `vite.config.ts` 작성

```ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
```

- [ ] `vitest.config.ts` 작성 (cloudflare 플러그인과 충돌 피하기 위해 별도 구성)

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
```

- [ ] `tsconfig.app.json`에 paths 추가: `"baseUrl": ".", "paths": { "@/*": ["./src/*"] }`, `"types": ["@cloudflare/workers-types"]`
- [ ] `package.json` scripts 교체

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "test": "vitest run",
  "typecheck": "tsc --noEmit",
  "db:migrate:local": "wrangler d1 execute code-game --local --file=src/server/db/schema.sql",
  "db:migrate": "wrangler d1 execute code-game --remote --file=src/server/db/schema.sql",
  "deploy": "npm run build && wrangler deploy"
}
```

- [ ] `wrangler.jsonc` 작성 (`database_id`는 Task 11에서 `wrangler d1 create` 출력값으로 교체)

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "code-game",
  "main": "src/server/index.ts",
  "compatibility_date": "2026-08-01",
  "assets": { "not_found_handling": "single-page-application", "binding": "ASSETS" },
  "d1_databases": [{ "binding": "DB", "database_name": "code-game", "database_id": "" }],
  "observability": { "enabled": true }
}
```

- [ ] `.gitignore`에 `.superpowers/`, `.wrangler/`, `dist/` 추가
- [ ] 검증: `npm run dev` 실행해 SPA가 뜨는지 확인 후 Ctrl+C
- [ ] Commit: `git add -A && git commit -m "chore: scaffold vite react-ts + worker"`

### Task 2: shadcn/ui 초기화

- [ ] 초기화 + 필요한 컴포넌트만 추가

```bash
npx shadcn@latest init -y -b zinc
npx shadcn@latest add button card input label tabs badge table select separator dropdown-menu avatar
```

- [ ] `src/index.css`에 `@custom-variant dark (&:where(.dark, .dark *));` 포함 확인(shadcn v4 템플릿 기본 포함)
- [ ] 검증: `npm run typecheck` 통과
- [ ] Commit: `feat: add shadcn/ui components`

### Task 3: 테마 + 레이아웃 + 라우터 셸

**Files:** Create `src/app/theme.tsx`, `src/components/logo.tsx`, `src/components/navbar.tsx`, `src/app/layout.tsx`, `src/app/router.tsx`, features 빈 페이지들, `public/favicon.svg`; Modify `index.html`, `src/main.tsx`

- [ ] `public/favicon.svg` = `logos/04_code_keyboard.svg` 내용 복사. `index.html` `<html class="dark">`, `<link rel="icon" href="/favicon.svg">`, title `Code-Game`
- [ ] `theme.tsx`: localStorage `theme`에서 읽고 없으면 `"dark"`. useEffect로 `document.documentElement.classList.toggle("dark", theme === "dark")`. `useTheme()` 훅 제공
- [ ] `logo.tsx`: `logos/04_code_keyboard.svg` 마크업을 JSX로 옮긴 컴포넌트(props: className). gradient id 충돌 피하려면 id를 `logo-g`로 변경
- [ ] `navbar.tsx`: 좌측 Logo+`Code-Game`(Link `/`), 메뉴 링크(Langs, Leaderboard), 우측 ThemeToggle(Sun/Moon lucide) + 로그인 버튼(Task 16에서 유저 메뉴로 교체될 자리)
- [ ] `router.tsx`: createBrowserRouter + Layout(children: Outlet). 라우트: `/`, `/langs`, `/play/:lang`, `/leaderboard`, `/login`, `/signup`. 페이지는 일단 제목만 있는 플레이스홀더 컴포넌트
- [ ] `main.tsx`: `ThemeProvider > RouterProvider` 마운트
- [ ] 검증: `npm run dev` — 다크 기본, 토글 동작, 라우트 이동 OK
- [ ] Commit: `feat: theme toggle + layout shell`

### Task 4: 언어 레지스트리 + LangBadge

**Files:** Create `src/data/languages.ts`, `src/data/categories.ts`, `src/components/game/lang-badge.tsx`

- [ ] `languages.ts`

```ts
export interface LanguageDef {
  id: string; name: string; monogram: string; color: string;
}

export const LANGUAGES: LanguageDef[] = [
  { id: "js-ts",    name: "JavaScript / TypeScript", monogram: "TS", color: "#3178c6" },
  { id: "python",   name: "Python",                  monogram: "Py", color: "#3776ab" },
  { id: "java",     name: "Java",                    monogram: "Jv", color: "#f89820" },
  { id: "c-cpp",    name: "C / C++",                 monogram: "C+", color: "#5c9fd8" },
  { id: "csharp",   name: "C#",                      monogram: "C#", color: "#68217a" },
  { id: "go",       name: "Go",                      monogram: "Go", color: "#00add8" },
  { id: "rust",     name: "Rust",                    monogram: "Rs", color: "#dea584" },
  { id: "kotlin",   name: "Kotlin",                  monogram: "Kt", color: "#7f52ff" },
  { id: "swift",    name: "Swift",                   monogram: "Sw", color: "#f05138" },
  { id: "php",      name: "PHP",                     monogram: "Ph", color: "#777bb3" },
  { id: "ruby",     name: "Ruby",                    monogram: "Rb", color: "#cc342d" },
  { id: "shell",    name: "Shell",                   monogram: "Sh", color: "#89e051" },
  { id: "sql",      name: "SQL",                     monogram: "SQ", color: "#e38c00" },
  { id: "html-css", name: "HTML / CSS",              monogram: "<>", color: "#e34c26" },
  { id: "dart",     name: "Dart",                    monogram: "Dt", color: "#027dfd" },
];

export const getLanguage = (id: string) => LANGUAGES.find((l) => l.id === id);
```

- [ ] `categories.ts`: `[{id:"terms",label:"용어"},{id:"short",label:"단문 코드"},{id:"long",label:"장문 코드"},{id:"practical",label:"실전 코드"}]` + `getCategory`
- [ ] `lang-badge.tsx`: 통일 SVG 배지(싸구려 느낌 방지 핵심 — 전 언어 동일 격식)

```tsx
export function LangBadge({ language, size = 40 }: { language: LanguageDef; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <rect x="2" y="2" width="44" height="44" rx="12"
        fill={language.color} fillOpacity="0.14" stroke={language.color} strokeOpacity="0.55" strokeWidth="2" />
      <text x="24" y="30" textAnchor="middle" dominantBaseline="middle"
        fontFamily="ui-monospace, monospace" fontSize="17" fontWeight="700" fill={language.color}>
        {language.monogram}
      </text>
    </svg>
  );
}
```

- [ ] 검증: `npm run typecheck` 통과
- [ ] Commit: `feat: language registry + LangBadge`

### Task 5: stats 엔진 (TDD)

**Files:** Create `src/engine/types.ts`, `src/engine/stats.test.ts`, `src/engine/stats.ts`

- [ ] 실패하는 테스트 먼저 작성

```ts
// src/engine/stats.test.ts
import { describe, expect, it } from "vitest";
import { initState } from "@/engine/typing";
import { computeStats } from "@/engine/stats";

describe("computeStats", () => {
  const base = {
    text: "a".repeat(50),
    input: "a".repeat(50),
    startedAt: 0 as number | null,
    finishedAt: 60_000 as number | null,
    correctKeys: 50,
    wrongKeys: 0,
  };

  it("미시작 상태는 전부 0", () => {
    expect(computeStats(initState("hello"))).toEqual({
      wpm: 0, accuracy: 100, progress: 0, elapsedMs: 0,
    });
  });

  it("WPM = (정확 위치 글자수 / 5) / 경과 분 → 60초에 50자면 10 WPM", () => {
    expect(computeStats(base).wpm).toBe(10);
  });

  it("오타 글자는 WPM에서 제외", () => {
    const s = computeStats({ ...base, input: "a".repeat(49) + "x", wrongKeys: 1 });
    expect(s.wpm).toBe(9); // 정확 49자 = 9.8단어 → 반올림 10 아님 주의: (49/5)/1 = 9.8
  });

  it("정확도 = 정타키 / 전체키 (%)", () => {
    const s = computeStats({ ...base, correctKeys: 45, wrongKeys: 5 });
    expect(s.accuracy).toBe(90);
  });

  it("진행률 = 입력 글자수 / 전체 글자수 (%)", () => {
    const s = computeStats({ ...base, input: "a".repeat(25) });
    expect(s.progress).toBe(50);
  });
});
```

- [ ] `npm test` → FAIL 확인(stats.ts 없음)
- [ ] `types.ts`

```ts
export interface TypingState {
  text: string;
  input: string;
  startedAt: number | null;
  finishedAt: number | null;
  correctKeys: number;
  wrongKeys: number;
}

export interface Stats {
  wpm: number;
  accuracy: number;
  progress: number;
  elapsedMs: number;
}
```

- [ ] `stats.ts` 최소 구현

```ts
import type { Stats, TypingState } from "./types";

function countCorrectChars(s: TypingState): number {
  let n = 0;
  for (let i = 0; i < s.input.length; i++) if (s.input[i] === s.text[i]) n++;
  return n;
}

export function computeStats(s: TypingState): Stats {
  const elapsedMs =
    s.startedAt === null ? 0 : Math.max(0, (s.finishedAt ?? Date.now()) - s.startedAt);
  const minutes = elapsedMs === 0 ? Infinity : elapsedMs / 60000;
  const totalKeys = s.correctKeys + s.wrongKeys;
  return {
    wpm: minutes === Infinity ? 0 : Math.round(countCorrectChars(s) / 5 / minutes),
    accuracy: totalKeys === 0 ? 100 : Math.round((s.correctKeys / totalKeys) * 100),
    progress: s.text.length === 0 ? 0 : Math.round((s.input.length / s.text.length) * 100),
    elapsedMs,
  };
}
```

- [ ] `npm test` → PASS. 테스트 중 계산 미스가 있으면 **구현이 아니라 테스트 기대값을 먼저 검산** 후 수정
- [ ] Commit: `feat(engine): wpm/accuracy/progress stats`

### Task 6: typing 엔진 상태머신 (TDD)

**Files:** Create `src/engine/typing.test.ts`, `src/engine/typing.ts`

- [ ] 실패하는 테스트 먼저 작성

```ts
// src/engine/typing.test.ts
import { describe, expect, it } from "vitest";
import { applyKey, charStatuses, initState } from "./typing";

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

  it("Backspace는 input 마지막 글자 제거, 키 카운터는 그대로(단순화)", () => {
    let s = applyKey(initState("abc"), "a");
    s = applyKey(s, "Backspace");
    expect(s.input).toBe("");
    expect(s.correctKeys).toBe(1); // ponytail: 누적 카운터 유지 — 정확도는 '입력 노력' 기준
  });

  it("마지막 글자 입력 시 finishedAt 설정", () => {
    let s = initState("ab");
    s = applyKey(s, "a");
    s = applyKey(s, "b");
    expect(s.finishedAt).not.toBeNull();
  });

  it("완료 후 추가 키 무시", () => {
    let s = initState("a");
    s = applyKey(s, "a");
    const after = applyKey({ ...s }, "b");
    expect(after.input).toBe("a");
  });

  it("Escape는 새 문제용 — 페이지 레벨에서 처리, 엔진은 미수정 상태 반환", () => {
    const init = initState("abc");
    expect(applyKey(init, "Escape")).toBe(init);
  });

  it("Modifier 키(F5, Shift 등 length>1) 무시", () => {
    const init = initState("abc");
    expect(applyKey(init, "Shift")).toBe(init);
  });
});

describe("charStatuses", () => {
  it("입력 전=pending, 일치=correct, 불일치=wrong", () => {
    let s = applyKey(initState("abc"), "a");
    s = applyKey(s, "z"); // 오타
    expect(charStatuses(s)).toEqual(["correct", "wrong", "pending"]);
  });
});
```

- [ ] `npm test` → FAIL 확인
- [ ] `typing.ts` 구현

```ts
import type { CharStatus, TypingState } from "./types";

const PRINTABLE = /^[\x20-\x7E]$/;

export function initState(text: string): TypingState {
  return { text, input: "", startedAt: null, finishedAt: null, correctKeys: 0, wrongKeys: 0 };
}

export function applyKey(state: TypingState, key: string): TypingState {
  if (state.finishedAt !== null) return state;
  if (key.length !== 1 || !PRINTABLE.test(key)) return state;

  const i = state.input.length;
  if (i >= state.text.length) return state;

  const ok = key === state.text[i];
  const input = state.input + key;
  return {
    text: state.text,
    input,
    startedAt: state.startedAt ?? Date.now(),
    finishedAt: input.length === state.text.length ? Date.now() : null,
    correctKeys: state.correctKeys + (ok ? 1 : 0),
    wrongKeys: state.wrongKeys + (ok ? 0 : 1),
  };
}

export function applyBackspace(state: TypingState): TypingState {
  if (state.finishedAt !== null || state.input.length === 0) return state;
  return { ...state, input: state.input.slice(0, -1) };
}

export function charStatuses(state: TypingState): CharStatus[] {
  return state.text.split("").map((ch, i) =>
    i >= state.input.length ? "pending" : state.input[i] === ch ? "correct" : "wrong"
  );
}
```

참고: `types.ts`의 CharStatus는 `"pending" | "correct" | "wrong"`. Backspace는 페이지의 keydown 핸들러에서 `key === "Backspace"`일 때 `applyBackspace`를 호출(테스트와 일치하도록 applyKey는 printable만 처리).

- [ ] `npm test` → PASS (Task 5 테스트도 회귀 없는지 함께 확인)
- [ ] Commit: `feat(engine): typing state machine`

### Task 7: 스니펫 콘텐츠 데이터

**Files:** Create `src/data/snippets/{lang}/{terms,short,long,practical,index}.ts` ×15, `src/data/snippets.test.ts`

- [ ] Python 4개 파일을 **전부 실제 내용으로** 작성(규격: §4 콘텐츠 규격 — terms 10/short 6/long 3/practical 2). 예시:

```ts
// src/data/snippets/python/terms.ts
export const snippets = [
  "variable", "function", "closure", "generator", "decorator", "dictionary",
  "comprehension", "exception", "iterator", "namespace",
];
```

```ts
// src/data/snippets/python/index.ts
import { snippets as terms } from "./terms";
import { snippets as short } from "./short";
import { snippets as long } from "./long";
import { snippets as practical } from "./practical";

export const snippetsByCategory = { terms, short, long, practical } as const;
```

- [ ] 나머지 14개 언어 동일 구조로 작성(배치 작업 — 서브에이전트에게 언어별 위임 가능). 각 언어 관용 문법: js-ts(ES2022+, 화살표/async), java(클래스/Stream), c-cpp(printf/vector), csharp(var/LINQ), go(func/error), rust(match/?), kotlin(data class/null safety), swift(guard/optional chaining), php(=>/::), ruby(symbol/block), shell(pipe/변수 확장), sql(SELECT/JOIN/GROUP BY), html-css(시맨틱 태그/flex 속성), dart(async/final)
- [ ] `index.ts`(snippets 루트): `getSnippets(langId, categoryId)` — 15개 언어의 `snippetsByCategory`를 매핑한 레지스트리 객체에서 조회, 없으면 빈 배열
- [ ] **완성도 테스트** — 누락 방지 핵심 안전망:

```ts
// src/data/snippets.test.ts
import { describe, expect, it } from "vitest";
import { LANGUAGES } from "@/data/languages";
import { CATEGORIES } from "@/data/categories";
import { MIN_COUNTS, getSnippets } from "@/data/snippets";

describe("snippets completeness", () => {
  it.each(LANGUAGES.map((l) => l.id))("%s — 모든 카테고리 최소 개수 충족", (langId) => {
    for (const cat of CATEGORIES) {
      const pool = getSnippets(langId, cat.id);
      expect(pool.length, `${langId}/${cat.id}`).toBeGreaterThanOrEqual(MIN_COUNTS[cat.id]);
      for (const s of pool) {
        expect(s.length).toBeGreaterThan(0);
        expect(s).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u); // 이모지 금지
      }
    }
  });
});
```

`MIN_COUNTS = { terms: 10, short: 6, long: 3, practical: 2 }`를 `src/data/snippets/index.ts`에 export.
- [ ] 15개 언어 전부 작성될 때까지 `npm test` FAIL → 전부 작성 후 PASS
- [ ] Commit: `data: snippets for 15 languages x 4 categories`

### Task 8: 홈 + /langs 페이지

**Files:** Create `src/features/home/HomePage.tsx`, `src/features/langs/LangsPage.tsx`

- [ ] HomePage: 로고 크게 + 한 줄 소개 + `[연습 시작하기]` 버튼(Link `/langs`) + 리더보드 링크. 이모지 대신 logo SVG 활용
- [ ] LangsPage: 3열 그리드(`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`). 각 셀 = Card + LangBadge + 언어명, 클릭 시 `/play/${l.id}` 이동(Link 감싼 Card, hover 시 ring 강조)
- [ ] 검증: `/langs`에서 15개 언어가 3열로 보이고 클릭 시 `/play/python` 등으로 이동
- [ ] Commit: `feat: home + languages grid page`

### Task 9: 플레이 화면

**Files:** Create `src/features/play/PlayPage.tsx`, `src/components/game/typing-area.tsx`, `src/components/game/stats-bar.tsx`

- [ ] PlayPage 구조: `useParams`로 lang 검증(없으면 `/langs`로 redirect). 카테고리 Tabs(shadcn, value=category, defaultValue="terms"). 현재 스니펫은 카테고리/재시작 시 `pool[Math.floor(Math.random()*pool.length)]`로 선택. `useState<TypingState>` + `useRef`로 텍스트 컨테이너 포커스(`tabIndex={0}`, autoFocus, `outline-none`)
- [ ] keydown 핸들러(컨테이너 div, onKeyDown): `Escape` → 새 랜덤 스니펫으로 `initState` 재설정 / `Backspace` → `applyBackspace` / 그 외 printable(`key.length===1`) → `applyKey`. Space 스크롤 방지 `preventDefault`
- [ ] StatsBar: `useEffect` 250ms interval로 `computeStats(state)` 재계산(실행 중일 때만). Badge 3개: WPM · 정확도% · 진행%
- [ ] TypingArea: `charStatuses(state)` map → `<span>` 렌더. 색: pending=`text-muted-foreground/40`, correct=`text-foreground`, wrong=`text-red-500 underline`. caret: `state.input.length` 위치에 `<span className="border-l-2 border-sky-400 animate-pulse">`. 컨테이너 `font-mono whitespace-pre-wrap leading-relaxed text-lg`
- [ ] 완료 시(finishedAt != null): ResultCard 표시(Task 10), 입력 비활성
- [ ] 검증: 실제 타이핑 → 하이라이트 변화/오타 빨강/백스페이스 취소/Esc 새 문제/완료 시 종료
- [ ] Commit: `feat: play screen wired to engine`

### Task 10: 결과 카드 + 개인 최고기록

**Files:** Create `src/components/game/result-card.tsx`, `src/lib/personal-best.ts`

- [ ] `personal-best.ts`: `getBest(lang, category): {wpm:number}|null`, `saveBest(...)` — key `pb:${lang}:${category}`, 값 JSON
- [ ] ResultCard(Card): WPM(큰 숫자) · 정확도 · 걸린 시간(elapsedMs 초 단위) 표시. 신기록이면 Badge "신기록". 개인 최고 WPM 병기. 하단에 `[다시 연습]`(새 스니펫) + `/leaderboard` 링크. 로그인 여부 문구는 Task 16에서 연결
- [ ] 검증: 두 번 플레이해 신기록/갱신 로직 확인
- [ ] Commit: `feat: result card + personal best`

### Task 11: D1 생성 + 마이그레이션

- [ ] DB 생성 및 ID 반영

```bash
npx wrangler d1 create code-game
# 출력 JSON의 "database_id" 값을 wrangler.jsonc에 붙여넣기
npm run db:migrate:local
```

- [ ] `schema.sql`은 §3 그대로 작성되어 있어야 함
- [ ] 검증: `npx wrangler d1 execute code-game --local --command "SELECT name FROM sqlite_master WHERE type='table'"` → users/sessions/scores 확인
- [ ] Commit: `chore: d1 schema migration`

### Task 12: 서버 auth 코어

**Files:** Create `src/server/types.ts`, `src/server/auth.ts`, `src/server/auth.test.ts`

- [ ] `types.ts`

```ts
export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}
```

- [ ] `auth.ts` — PBKDF2 해시/검증 + 세션

```ts
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
```

- [ ] roundtrip 유닛 테스트(node 환경, WebCrypto 전역 사용)

```ts
// src/server/auth.test.ts
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
```

- [ ] `npm test` PASS 확인
- [ ] Commit: `feat(server): pbkdf2 hashing + session helpers`

### Task 13: 서버 auth 라우트 + 라우팅 골격

**Files:** Create `src/server/routes/auth.ts`, `src/server/routes/scores.ts`(Task 14에서 구현, 여기선 파일만), `src/server/index.ts`

- [ ] `routes/auth.ts` — register/login/logout/me

```ts
import { Env } from "../types";
import { hashPassword, verifyPassword, createSession, deleteSession,
         getSessionUser, sessionSetCookie, sessionClearCookie } from "../auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bad = (message: string, status = 400) => Response.json({ error: message }, { status });

interface Credentials { email?: string; password?: string; displayName?: string }

async function readJson<T>(request: Request): Promise<T | null> {
  try { return (await request.json()) as T; } catch { return null; }
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
  if (!EMAIL_RE.test(email)) return bad("올바른 이메일 형식이 아닙니다");
  if (password.length < 8) return bad("비밀번호는 8자 이상이어야 합니다");
  if (displayName.length < 2 || displayName.length > 20) return bad("닉네임은 2~20자여야 합니다");

  const exists = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (exists) return bad("이미 가입된 이메일입니다", 409);

  const result = await env.DB.prepare(
    "INSERT INTO users (email, display_name, password_hash) VALUES (?, ?, ?)"
  ).bind(email, displayName, await hashPassword(password)).run();
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
  return user ? Response.json({ user }) : Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
}
```

- [ ] `index.ts` — 라우팅 + 정적 에셋 fallback

```ts
import { Env } from "./types";
import { register, login, logout, me } from "./routes/auth";
import { saveScore, leaderboard } from "./routes/scores";

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
      return Response.json({ error: "Not Found" }, { status: 404 });
    } catch (err) {
      console.error(err);
      return Response.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
```

(scores 미구현 상태면 임시로 501 반환하는 stub을 scores.ts에 넣었다가 Task 14에서 교체)
- [ ] 검증(curl, `npm run dev` 실행 상태)

```bash
curl -i -X POST localhost:5173/api/auth/register -H "Content-Type: application/json" \
  -d '{"email":"t@t.com","password":"password123","displayName":"tester"}'
# 기대: 201 {"user":{...}} + Set-Cookie: session=...
curl localhost:5173/api/me -H "Cookie: session=<위 토큰>"
# 기대: {"user":{...}}
```

- [ ] Commit: `feat(server): auth endpoints`

### Task 14: scores + leaderboard 라우트

**Files:** Modify `src/server/routes/scores.ts`

```ts
import { Env } from "../types";
import { getSessionUser } from "../auth";

const CATEGORIES = new Set(["terms", "short", "long", "practical"]);
const LANGUAGE_IDS = new Set([
  "js-ts","python","java","c-cpp","csharp","go","rust","kotlin","swift",
  "php","ruby","shell","sql","html-css","dart",
]);

interface ScoreInput { category?: string; language?: string; wpm?: number; accuracy?: number; durationMs?: number }

export async function saveScore(request: Request, env: Env): Promise<Response> {
  const user = await getSessionUser(request, env.DB);
  if (!user) return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });

  let body: ScoreInput;
  try { body = await request.json(); } catch { return Response.json({ error: "잘못된 요청" }, { status: 400 }); }

  const { category, language, wpm, accuracy, durationMs } = body;
  if (!CATEGORIES.has(category ?? "") || !LANGUAGE_IDS.has(language ?? ""))
    return Response.json({ error: "잘못된 카테고리/언어" }, { status: 400 });
  // ponytail: sanity cap만 적용(비정상 값 거부). rate limiting은 나중 할일
  if (typeof wpm !== "number" || typeof accuracy !== "number" || typeof durationMs !== "number"
      || wpm <= 0 || wpm > 350 || accuracy < 0 || accuracy > 100 || durationMs < 2000 || durationMs > 3600_000)
    return Response.json({ error: "비정상적인 기록입니다" }, { status: 422 });

  await env.DB.prepare(
    "INSERT INTO scores (user_id, category, language, wpm, accuracy, duration_ms) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(user.id, category, language, wpm, accuracy, Math.round(durationMs)).run();

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
  if (language) { sql += " AND s.language = ?"; binds.push(language); }
  sql += " GROUP BY s.user_id ORDER BY wpm DESC LIMIT ?";
  binds.push(limit);

  const { results } = await env.DB.prepare(sql).bind(...binds).all();
  return Response.json({ entries: results });
}
```

- [ ] 검증(curl 흐름): register(쿠키 저장 `-c jar.txt`) → login(`-b/-c`) → POST score → `GET /api/leaderboard?category=terms`에 해당 기록 표시 → 미인증 POST score는 401
- [ ] Commit: `feat(server): score save + leaderboard`

### Task 15: api 클라이언트 + AuthContext + 로그인/회원가입

**Files:** Create `src/lib/api.ts`, `src/app/auth-context.tsx`, `src/features/auth/LoginPage.tsx`, `src/features/auth/SignupPage.tsx`; Modify `main.tsx`

- [ ] `lib/api.ts`

```ts
export interface SessionUser { id: number; email: string; displayName: string }

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

export const api = {
  me: () => fetch("/api/me").then((r) => (r.ok ? r.json<{ user: SessionUser }>() : null)),
  register: (email: string, password: string, displayName: string) =>
    post("/api/auth/register", { email, password, displayName }).then((r) => data<{ user: SessionUser }>(r)),
  login: (email: string, password: string) =>
    post("/api/auth/login", { email, password }).then((r) => data<{ user: SessionUser }>(r)),
  logout: () => post("/api/auth/logout"),
  saveScore: (s: { category: string; language: string; wpm: number; accuracy: number; durationMs: number }) =>
    post("/api/scores", s).then((r) => data<{ saved: boolean }>(r)),
  leaderboard: (category: string, language?: string) =>
    fetch(`/api/leaderboard?category=${category}${language ? `&language=${language}` : ""}`)
      .then((r) => data<{ entries: { displayName: string; wpm: number }[] }>(r)),
};
```

- [ ] `auth-context.tsx`: 마운트 시 `api.me()` 조회 → `user|null` state. `login/signup/logout` 메서드가 state 갱신. `useAuth()` 훅. `main.tsx`에서 ThemeProvider 안에 AuthProvider 추가
- [ ] LoginPage/SignupPage: shadcn Card + Input(label 이메일/비밀번호/닉네임) + Button. 제출 시 api 호출, 성공 시 `navigate(-1)` 또는 `/`. 실패 시 `error.message`를 `<p className="text-sm text-red-500">` 표시. 회원가입 페이지에 `/login` 링크(로그인 페이지엔 `/signup` 링크)
- [ ] 검증: 회원가입 → 네비바에 사용자 표시(Task 16) 전이라도 새로고침 후 `/api/me` 유지되는 것을 DevTools Network로 확인
- [ ] Commit: `feat: auth client + login/signup pages`

### Task 16: 결과 자동 저장 + 네비바 유저 메뉴

**Files:** Modify `src/features/play/PlayPage.tsx`, `src/components/game/result-card.tsx`, `src/components/navbar.tsx`

- [ ] ResultCard props에 `onRestart` 추가, 내부에서:
  - `useAuth()`의 user 있음 → 판 종료 effect에서 `api.saveScore({...})` 호출. 상태 3종 표시: `저장됨`(Badge, default) / 저장 실패(`destructive` Badge + 메시지) / 저장 중(생략 가능). 이미 저장한 판 재호출 방지(ref)
  - user 없음 → `로그인하면 기록이 리더보드에 저장됩니다` + `/login` Link(text-sm muted)
  - 개인 최고기록 갱신은 저장 성공 여부와 무관하게 항상 수행
- [ ] navbar: user 있으면 Avatar/Fallback 닉네임 첫 글자 + DropdownMenu(내 기록→`/leaderboard`, 로그아웃→`api.logout()` 후 navigate(`/`)), 없으면 기존 로그인 버튼 유지
- [ ] 검증: 회원 플레이 종료 → "저장됨" 배지 + D1 scores 행 증가 확인. 비회원 → 안내 문구만
- [ ] Commit: `feat: auto-save results + user menu`

### Task 17: 리더보드 페이지

**Files:** Create `src/features/leaderboard/LeaderboardPage.tsx`

- [ ] 구성: 상단 Tabs(categories, defaultValue="terms") + Select(언어 필터: "전체" + 15개). Table: 순위/닉네임/WPM. 데이터는 `api.leaderboard(category, language)` — Tab/Select 변경 시 refetch. 빈 경우 "아직 기록이 없습니다. 첫 기록의 주인이 되어보세요."(muted 텍스트, 이모지 금지)
- [ ] 검증: Task 16에서 저장한 기록이 카테고리/언어 필터에 따라 정렬 표시
- [ ] Commit: `feat: leaderboard page`

### Task 18: 최종 검증 + README

- [ ] 전체 검증 명령

```bash
npm run typecheck   # 0 errors
npm test            # engine + snippets + auth 전부 PASS
npm run build       # dist 생성 성공
npm run db:migrate  # remote D1 (배포 전)
npm run deploy      # workers.dev URL 확인
```

- [ ] 수동 E2E 체크리스트: 비회원 플레이(저장 안 됨) → 회원가입 → 플레이 → 결과 "저장됨" → 리더보드 표시 → 테마 토글 후 새로고침 유지 → Esc 재시작
- [ ] README.md: 소개 / `npm run dev` / 마이그레이션 / 배포 / **콘텐츠 추가 방법**(폴더 복사 + snippets 배열 작성) / 나중 할일 목록
- [ ] Commit: `docs: readme + final verification`

---

## Self-Review 기록

- 스펙 커버리지: 테마 토글(Task 3) · /langs 3열(Task 8) · 완주모드 엔진(Task 5-6) · 콘텐츠 15×4(Task 7) · Worker 통합 배포(Task 1,11,13) · 자체 인증(Task 12-13) · 회원만 저장/리더보드(Task 14,16,17) · 이모지 금지(lucide+LangBadge Task 4, snippets 테스트 Task 7) · 로고(Task 3) — 모두 커버
- 타입 일관성: `TypingState`/`Stats`/`SessionUser`/`Env` 명칭이 서버·클라·엔진에서 동일하게 사용됨
- 알려진 절충(ponytail): Backspace 후 키 카운터 미차감(정확도='입력 노력' 기준) · 위변조 sanity cap only · leaderboard는 이름+WPM만 반환
