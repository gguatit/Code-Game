import { Link } from "react-router-dom";

export function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">개인정보 처리방침</h1>
        <p className="text-sm text-muted-foreground">시행일: 2026년 8월 23일</p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed">
        <p>
          Code-Game(이하 &quot;서비스&quot;)는 이용자의 개인정보를 소중하게 생각하며, 개인정보보호법
          등 관련 법령을 준수합니다. 본 처리방침은 서비스가 수집하는 정보와 그 이용 방법을 설명합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. 수집하는 개인정보</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>
            <strong>이메일 주소</strong> — 회원가입 및 로그인 시
          </li>
          <li>
            <strong>닉네임</strong> — 회원가입 시 (리더보드 표시용)
          </li>
          <li>
            <strong>게임 기록</strong> — 언어·카테고리별 WPM, 정확도, 소요 시간
          </li>
          <li>
            <strong>세션 쿠키</strong> — 로그인 상태 유지용
          </li>
        </ul>
        <p className="text-sm leading-relaxed">
          비회원은 계정 정보를 수집하지 않습니다. 비회원의 개인 최고 기록은 서버로 전송되지 않고
          브라우저(localStorage)에만 저장됩니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. 수집 방법</h2>
        <p className="text-sm leading-relaxed">
          회원가입·로그인 폼 입력과 게임 결과 자동 저장을 통해서만 수집합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. 이용 목적</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>회원 식별 및 로그인 상태 유지</li>
          <li>리더보드에 닉네임과 기록 표시</li>
          <li>서비스 운영 및 기록 제공</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. 보유 및 이용 기간</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>계정 정보와 게임 기록: 회원탈퇴 또는 삭제 요청 시까지</li>
          <li>세션 쿠키: 발급 후 최대 30일</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. 제3자 제공 및 위탁</h2>
        <p className="text-sm leading-relaxed">
          개인정보를 판매하거나 광고 목적으로 제공하지 않습니다. 서비스 운영을 위해 Cloudflare,
          Inc.(호스팅·데이터베이스 인프라)에 데이터가 저장되며, 이에 대해서는 Cloudflare의
          개인정보 처리방침이 적용됩니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. 쿠키에 관한 사항</h2>
        <p className="text-sm leading-relaxed">
          서비스는 로그인 세션 유지를 위한 필수 쿠키(session) 하나만 사용합니다. 광고, 추적, 분석용
          쿠키는 사용하지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">7. 이용자의 권리</h2>
        <p className="text-sm leading-relaxed">
          이용자는 언제든지 자신의 개인정보 열람·정정·삭제와 회원탈퇴를 요청할 수 있습니다.
          회원탈퇴 시 계정 정보(이메일·닉네임)와 저장된 모든 게임 기록을 즉시 삭제합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">8. 문의처</h2>
        <p className="text-sm leading-relaxed">
          개인정보 관련 문의는{" "}
          <a
            href="https://github.com/gguatit/Code-Game/issues"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub Issues
          </a>{" "}
          로 남겨주세요.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">9. 방침 변경</h2>
        <p className="text-sm leading-relaxed">
          본 방침 내용이 변경되면 서비스 화면을 통해 공지합니다. 변경된 방침은 공지한 날부터
          적용됩니다.
        </p>
      </section>

      <p className="border-t pt-6 text-xs text-muted-foreground">
        본 서비스와 함께{" "}
        <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
          이용약관
        </Link>
        도 함께 적용됩니다.
      </p>
    </article>
  );
}
