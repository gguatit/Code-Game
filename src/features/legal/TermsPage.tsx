import { Link } from "react-router-dom";

export function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">이용약관</h1>
        <p className="text-sm text-muted-foreground">시행일: 2026년 8월 23일</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제1조 (목적)</h2>
        <p className="text-sm leading-relaxed">
          본 약관은 CoffeeToCode(이하 &quot;서비스&quot;)의 이용 조건과 절차, 서비스 이용자와 운영자의
          권리·의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제2조 (서비스의 정의)</h2>
        <p className="text-sm leading-relaxed">
          &quot;서비스&quot;란 다양한 프로그래밍 언어 코드를 대상으로 타자 속도(WPM)와 정확도를
          측정하는 온라인 타자 연습 웹게임을 의미합니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제3조 (서비스 이용)</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>서비스는 무료로 제공되며, 회원가입 없이도 연습 기능을 이용할 수 있습니다.</li>
          <li>리더보드에 기록을 저장하려면 회원가입이 필요합니다.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제4조 (회원가입)</h2>
        <p className="text-sm leading-relaxed">
          회원가입 시 이메일 주소, 닉네임, 비밀번호를 입력합니다. 가입자는 입력한 정보가 정확함을
          보증하며,{" "}
          <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
            개인정보 처리방침
          </Link>
          에 따라 정보가 처리되는 데 동의하는 것으로 간주됩니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제5조 (금지행위)</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>매크로, 자동화 프로그램 등을 이용한 비정상 기록 생성</li>
          <li>타인의 계정을 무단으로 사용하거나 침해하는 행위</li>
          <li>서비스의 정상 운영을 방해하는 행위</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제6조 (기록의 관리)</h2>
        <p className="text-sm leading-relaxed">
          비정상적으로 생성된 것으로 판단되는 기록(제5조 위반)은 사전 통지 없이 삭제될 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제7조 (서비스의 변경 및 중단)</h2>
        <p className="text-sm leading-relaxed">
          서비스는 개인이 운영하는 프로젝트로서, 운영상 필요에 따라 사전 공지 없이 일부 또는 전체
          서비스가 변경·중단될 수 있습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제8조 (면책)</h2>
        <p className="text-sm leading-relaxed">
          서비스는 무료로 제공됩니다. 운영자는 서비스 이용과 관련하여 발생한 손해에 대해 고의 또는
          중대한 과실이 없는 한 책임을 지지 않습니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제9조 (준거법)</h2>
        <p className="text-sm leading-relaxed">
          본 약관은 대한민국 법령에 따라 해석됩니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">제10조 (문의)</h2>
        <p className="text-sm leading-relaxed">
          서비스 관련 문의는{" "}
          <a
            href="https://github.com/gguatit/Code-Game/issues"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            GitHub Issues
          </a>
          를 이용해 주세요.
        </p>
      </section>
    </article>
  );
}
