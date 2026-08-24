# CoffeeToCode

코딩 타자 연습 게임. 22개 프로그래밍 언어의 장문·실전 코드를 입력하며 WPM과 정확도를 측정하고, 회원 기록은 리더보드에 집계됩니다.

**https://coffeetocode.kalpha.workers.dev** / **https://code.neikos.kr**

## 기술 스택

- React 19 + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui
- Cloudflare Workers (정적 에셋 + API 통합 단일 Worker)
- D1 (SQLite) — 회원/세션/기록 저장
- 인증: 자체 PBKDF2-SHA256 해시(100k 반복) + HttpOnly 세션 쿠키

## 주요 기능

- **장문 / 실전** 두 모드 — 장문은 알고리즘 코드(fib·퀵소트 등), 실전은 프로덕션 스타일 코드
- 실시간 WPM·정확도·진행률, 결과 화면 카운트업 + WPM 추이 그래프 + 신기록 컨페티
- 개인 최고 기록(브라우저 로컬 저장), 회원 자동 저장 + 리더보드 순위·내 순위·도전 언어 표시
- 마이페이지: 통계, 언어별 최고 기록, 필터 가능한 WPM/정확도 추이 그래프
- 오늘의 문제(날짜 시드 고정), 랜덤 도전
- 한국어 / English / 日本語 지원 (브라우저 자동 감지 + 수동 토글)
- 다크/라이트 테마, 타이핑 중 커서 줄 중앙 고정 자동스크롤
- 보안: 입력 길이 제한, 제출 스로틀(429), 점수 sanity cap, 보안 헤더(`public/_headers`)

## 지원 언어 (22)

JavaScript/TypeScript, Python, Java, C/C++, C#, Go, Rust, Kotlin, Swift, PHP, Ruby, Shell, SQL, HTML/CSS, Dart, Lua, Haskell, Elixir, Scala, Perl, Zig, Nim

각 언어는 장문 5개 + 실전 4개로 구성됩니다.

## 개발

```bash
npm install
npm run dev          # http://localhost:5173
```

게임 조작:

- 첫 키 입력 시 타이머 시작
- `Enter`: 줄바꿈 입력
- `Tab`: 들여쓰기 구간 한 번에 입력
- `Esc`: 새 문제로 재시작, 결과 화면에서 `Enter`/`Esc`로 다시 연습
- 백스페이스: 한 글자 지우기 (키 카운터는 누적 유지)

## 테스트 / 검증

```bash
npm run typecheck
npm test             # vitest (타자 엔진 / 스니펫 완성도 / 인증 해시)
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

1. `src/data/snippets/<언어id>/long.ts` 또는 `practical.ts` 배열에 문자열 추가
2. 멀티라인은 `\n` 이스케이프 사용, ASCII만 허용(한국어·이모지 금지 — 테스트가 잡아줌)
3. 길이 밴드: 장문 26~36줄, 실전 38~54줄 (`src/data/snippets.test.ts`가 카테고리별 BANDS로 검증)
4. 새 언어 추가 시: `src/data/languages.ts`에 항목 추가 → `src/data/snippets/<id>/` 폴더에 long/practical/index.ts 작성 → 서버 화이트리스트(`src/server/routes/scores.ts`)와 클라이언트 레지스트리(`src/data/snippets/index.ts`)에 id 추가

화면 문자열은 하드코딩 금지 — `src/lib/i18n/ko.ts`에 키 추가 후 en/ja도 채워야 typecheck이 통과합니다.

## 나중 할일

- 로그인 브루트포스 방어(Cloudflare Rate Limiting 룰 — 대시보드 설정 필요)
- 비밀번호 찾기(이메일 발송 인프라 필요)
- 한글(IME) 입력 연습 모드
- 문제별 난이도 태그
