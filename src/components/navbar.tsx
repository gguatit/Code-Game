import { Link, useNavigate } from "react-router-dom";
import { LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/app/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { useTheme } from "@/app/theme";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

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
          <Link to="/terms" className="transition-colors hover:text-foreground">
            이용약관
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            개인정보 처리방침
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="테마 전환">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="사용자 메뉴"
                >
                  <Avatar className="size-8">
                    <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {user.displayName}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/leaderboard">내 기록</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="size-4" /> 로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
