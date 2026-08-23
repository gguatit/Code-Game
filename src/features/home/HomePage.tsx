import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Dices, Keyboard, ListChecks, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { LangBadge } from "@/components/game/lang-badge";
import { LANGUAGES } from "@/data/languages";
import { dailyChallenge } from "@/lib/daily";
import { TypingDemo } from "./TypingDemo";
import { TopPlayers } from "./TopPlayers";

const TOTAL_SNIPPETS = 198;
const STEPS = [
  { icon: ListChecks, title: "언어 선택", desc: "22개 언어 중 연습할 언어를 고르세요" },
  { icon: Keyboard, title: "코드 타이핑", desc: "제시된 코드를 최대한 빠르고 정확하게 입력" },
  { icon: Trophy, title: "기록 비교", desc: "WPM과 정확도로 리더보드에 도전하세요" },
];

export function HomePage() {
  const navigate = useNavigate();

  const randomStart = () => {
    const lang = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
    const cat = Math.random() < 0.5 ? "long" : "practical";
    navigate(`/play/${lang.id}?category=${cat}`);
  };

  const daily = dailyChallenge();

  return (
    <div className="flex flex-col items-center py-16 text-center">
      <Logo className="size-28 text-foreground" />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">CoffeeToCode</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        코딩 타자 연습 게임. 22개 언어의 장문·실전 코드로 속도와 정확도를 기록하고
        리더보드에서 겨뤄보세요.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg">
          <Link to="/langs">
            연습 시작하기
            <ArrowRight />
          </Link>
        </Button>
        <Button size="lg" variant="outline" onClick={randomStart}>
          <Dices />
          랜덤 도전
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to={`/play/${daily.langId}?category=${daily.category}&daily=1`}>
            <CalendarDays />
            오늘의 문제
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/leaderboard">
            <Trophy />
            리더보드
          </Link>
        </Button>
      </div>

      <TypingDemo />

      <div className="mt-12 grid w-full max-w-xl grid-cols-3 divide-x rounded-xl border py-5">
        {[
          { n: "22", label: "지원 언어" },
          { n: String(TOTAL_SNIPPETS), label: "문제 수" },
          { n: "2", label: "모드 (장문/실전)" },
        ].map((s) => (
          <div key={s.label} className="px-2">
            <div className="text-3xl font-bold">{s.n}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <section className="mt-16 w-full">
        <h2 className="mb-6 text-lg font-semibold">작동 방식</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-xl border p-5 text-left">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  {i + 1}
                </span>
                <step.icon className="size-5 text-muted-foreground" />
              </div>
              <div className="mt-3 font-semibold">{step.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 w-full">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">지원 언어</h2>
          <Link to="/langs" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            모두 보기
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-6 justify-items-center gap-y-4 sm:grid-cols-11">
          {LANGUAGES.map((lang) => (
            <Link key={lang.id} to={`/play/${lang.id}`} title={lang.name} className="transition hover:scale-110">
              <LangBadge language={lang} size={44} />
            </Link>
          ))}
        </div>
      </section>

      <TopPlayers />
    </div>
  );
}
