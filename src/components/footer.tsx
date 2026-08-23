import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-5" />
          <div>
            <p className="font-mono text-sm font-semibold text-foreground">Code-Game</p>
            <p className="text-xs text-muted-foreground">
              개인이 운영하는 비영리 코딩 타자 연습 프로젝트입니다.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link to="/terms" className="transition-colors hover:text-foreground">
            이용약관
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            개인정보 처리방침
          </Link>
          <a
            href="https://github.com/gguatit/Code-Game"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-5xl px-4 py-3 text-xs text-muted-foreground">
          © 2026 Code-Game. 본 사이트는 영리 목적 없이 개인이 운영하며, 광고·추적 쿠키를 사용하지
          않습니다.
        </p>
      </div>
    </footer>
  );
}
