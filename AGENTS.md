# CoffeeToCode — 코딩 타자 연습 게임

React 19 + Vite + TypeScript + Tailwind v4 + shadcn/ui, Cloudflare Workers 단일 Worker(SPA 정적 에셋 + `/api/*`) + D1. 프로덕션: https://coffeetocode.kalpha.workers.dev / code.neikos.kr

## 명령어

- 개발 서버: `npm run dev` (포트 5173)
- 검증 순서(변경 후 항상): `npm run typecheck` → `npm test` → `npm run build`
- 단일 테스트: `npx vitest run src/engine/typing.test.ts` 등
- D1 마이그레이션: `npm run db:migrate:local` (로컬) / `npm run db:migrate` (원격)
- 배포: `npm run deploy` — **사용자 승인 후에만 실행**. 원격 D1 스키마 변경 시 `db:migrate` 먼저
- 커밋 메시지는 **한국어**로 작성 (사용자 요구사항)

## 구조

- `src/app/` — router, theme, locale(i18n), auth context
- `src/components/` — `ui/`(shadcn), `game/`(타이핑 UI), navbar/footer/logo
- `src/features/` — home, langs, play, leaderboard, profile, auth, legal, not-found
- `src/data/` — `languages.ts`(22개 언어 레지스트리), `categories.ts`(long|practical만 — terms/short는 제거됨), `snippets/{lang}/{long,practical}.ts`
- `src/engine/` — 순수 TS 타자 엔진(types/typing/stats), TDD로 유지
- `src/lib/` — `api.ts`(fetch 래퍼, ApiError), `i18n/ko|en|ja.ts`, `personal-best.ts`, `daily.ts`
- `src/server/` — Worker 엔드포인트(index.ts 라우팅, auth.ts, routes/auth.ts, routes/scores.ts, db/schema.sql)

## 스니펫 규칙 (테스트가 강제)

- 각 언어 `long.ts`(5개) + `practical.ts`(4개), 문자열 배열 `export const snippets = [...]`
- **각 스니펫 26~36줄**(멀티라인 `\n` 이스케이프), ASCII만(한국어·이모지 금지), 괄호 균형 — `src/data/snippets.test.ts`가 전부 검증
- 코드 문법 오류는 사용자가 민감하게 여김 — 추가/수정 시 로컬 툴체인(node/python/javac/rustc 등)으로 검증 가능한 언어는 반드시 컴파일 확인
- snippet 파일 수정은 **파일 단위 Write 권장** — edit 도구의 이스케이프 혼용(`\n` 리터럴 vs 실제 개행)으로 파일이 망가진 사례 반복됨. Write 후 반드시 `npm test`로 검증

## i18n 규칙

- `src/lib/i18n/ko.ts`가 source of truth. `Dict = Record<keyof typeof ko, string>`라 새 키 추가 시 en/ja 모두 채워야 typecheck 통과
- 화면 문자열은 하드코딩 금지, `useT()` 훅(`t("key", { n })`) 사용

## 주의사항

- 타자 엔진 규칙: Enter→`\n`, Tab→들여쓰기 소진(applyTab), Esc→새 문제, 첫 키 입력 시 타이머 시작
- 게임 규칙/인증/리더보드 상세: `docs/superpowers/plans/2026-08-22-code-typing-game.md` (구현 계획서, 스펙 참조용)
- Write 도구 호출 시 filePath와 content 파라미터 교차 사고 이력 있음 — 작성 직후 파일 확인
- Windows 환경: PowerShell의 `$PID`는 예약변수(다른 이름 사용), `Start-Process "npm"`은 실패 → `cmd.exe /c` 경유
- D1은 `scores`에 카테고리 CHECK(long|practical), 점수 sanity cap(wpm≤350, accuracy≤100, 2초~1시간)과 제출 스로틀(429) 있음 — 서버 로직 변경 시 유지