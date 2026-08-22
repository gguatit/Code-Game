import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useTheme } from "@/app/theme";

export function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <Logo className="size-7" />
          <span className="font-mono text-base font-bold tracking-tight">Code-Game</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/langs" className="transition-colors hover:text-foreground">
            언어
          </Link>
          <Link to="/leaderboard" className="transition-colors hover:text-foreground">
            리더보드
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="테마 전환">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {/* Task 16: 로그인 상태별 유저 메뉴로 교체 */}
          <Button asChild variant="outline" size="sm">
            <Link to="/login">로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
