# Code-Game

코딩 타자 연습 게임. 15개 프로그래밍 언어의 용어·단문·장문·실전 코드를 입력하며 WPM과 정확도를 측정하고, 회원 기록은 리더보드에 집계됩니다.

## 기술 스택

- React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- Cloudflare Workers (정적 에셋 + API 통합 단일 Worker)
- D1 (SQLite) — 회원/세션/기록 저장
- 인증: 자체 PBKDF2 해시 + HttpOnly 세션 쿠키

## 지원 언어

JavaScript/TypeScript, Python, Java, C/C++, C#, Go, Rust, Kotlin, Swift, PHP, Ruby, Shell, SQL, HTML/CSS, Dart

각 언어는 4개 카테고리(용어 10 / 단문 6 / 장문 3 / 실전 2)로 구성됩니다.

## 개발

```bash
npm install
npm run dev          # http://localhost:5173
```

- `Esc`: 새 문제로 재시작
- `Enter`: 줄바꿈 입력
- 첫 키 입력 시 타이머 시작

## 테스트 / 검증

```bash
npm run typecheck
npm test             # vitest (엔진/스니펫/인증 해시)
npm run build        # tsc -b && vite build
```

## D1 마이그레이션

```bash
npm run db:migrate:local   # 로컬 개발용 (.wrangler/state)
npm run db:migrate         # 원격 D1 (배포 전 필수)
```

스키마: `src/server/db/schema.sql` (users / sessions / scores + 리더보드 인덱스)

## 배포

```bash
npx wrangler login   # 최초 1회
npm run deploy       # workers.dev URL 확인
```

배포 전에 반드시 `npm run db:migrate`(원격)를 실행하세요.

## 콘텐츠 추가 방법

1. `src/data/snippets/<언어id>/terms.ts` 등 카테고리 파일의 배열에 문자열 추가
2. 멀티라인은 `\n` 이스케이프 사용, ASCII만 허용(이모지 금지 — 테스트가 잡아줌)
3. 새 언어 추가 시: `src/data/languages.ts`에 항목 추가 → `src/data/snippets/<id>/` 폴더에 terms/short/long/practical/index.ts 작성 → 서버 화이트리스트(`src/server/routes/scores.ts`)와 클라이언트 레지스트리(`src/data/snippets/index.ts`)에 id 추가

개수 규칙(용어 10/단문 6/장문 3/실전 2)과 이모지 금지는 `src/data/snippets.test.ts`가 자동 검증합니다.

## 나중 할일

- 특이 언어 추가: Haskell, Elixir, Lua, Scala, Perl, F#, OCaml, Zig 등
- 한글(IME) 입력 연습 모드
- rate limiting (현재 sanity cap만 적용)
- 문제별 난이도 태그 / 다크모드 외 테마 확장
