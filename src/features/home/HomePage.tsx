import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function HomePage() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <Logo className="size-28 text-foreground" />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Code-Game</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        코딩 타자 연습 게임. 용어부터 실전 코드까지, 15개 언어로 속도와 정확도를 기록하세요.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link to="/langs">
            연습 시작하기
            <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/leaderboard">
            <Trophy />
            리더보드
          </Link>
        </Button>
      </div>
    </div>
  );
}
