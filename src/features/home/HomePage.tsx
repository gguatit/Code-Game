import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays, Dices, Keyboard, ListChecks, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LangBadge } from "@/components/game/lang-badge";
import { LANGUAGES } from "@/data/languages";
import { useT } from "@/app/locale";
import { dailyChallenge } from "@/lib/daily";
import { TypingDemo } from "./TypingDemo";
import { TopPlayers } from "./TopPlayers";

const TOTAL_SNIPPETS = 198;

function SectionHeader({ comment, title }: { comment: string; title: string }) {
  return (
    <div className="mb-6 text-left">
      <div className="font-mono text-xs text-sky-500/80">{comment}</div>
      <h2 className="mt-1 text-xl font-semibold">{title}</h2>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useT();

  const randomStart = () => {
    const lang = LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
    const cat = Math.random() < 0.5 ? "long" : "practical";
    navigate(`/play/${lang.id}?category=${cat}`);
  };

  const daily = dailyChallenge();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div className="absolute -top-24 right-[5%] size-96 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-[5%] size-72 rounded-full bg-cyan-600/10 blur-3xl" />
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("home.heroLine1")}
            <br />
            <span className="text-gradient">{t("home.heroLine2")}</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground max-lg:mx-auto">{t("home.heroDesc")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link to="/langs">
                {t("home.start")}
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={randomStart}>
              <Dices />
              {t("home.random")}
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1 lg:justify-start">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/play/${daily.langId}?category=${daily.category}&daily=1`}>
                <CalendarDays />
                {t("home.daily")}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/leaderboard">
                <Trophy />
                {t("nav.leaderboard")}
              </Link>
            </Button>
          </div>
        </div>

        <TypingDemo />
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 divide-x rounded-xl border py-6">
        {[
          { n: "22", label: t("home.statLangs") },
          { n: String(TOTAL_SNIPPETS), label: t("home.statSnippets") },
          { n: "2", label: t("home.statModes") },
        ].map((s) => (
          <div key={s.label} className="px-2 text-center">
            <div className="font-heading text-3xl font-bold text-sky-500">{s.n}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="mt-20 w-full">
        <SectionHeader comment="// how-it-works" title={t("home.howTitle")} />
        <div className="grid gap-4 sm:grid-cols-3">
          {(
            [
              [t("home.step1t"), t("home.step1d"), ListChecks],
              [t("home.step2t"), t("home.step2d"), Keyboard],
              [t("home.step3t"), t("home.step3d"), Trophy],
            ] as const
          ).map(([title, desc, Icon], i) => (
            <div
              key={title}
              className="rounded-xl border p-5 text-left transition-colors hover:border-sky-500/40 hover:bg-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading flex size-8 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  {i + 1}
                </span>
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <div className="mt-3 font-semibold">{title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="mt-20 w-full">
        <div className="flex items-end justify-between">
          <SectionHeader comment="// languages" title={t("home.languagesTitle")} />
          <Link
            to="/langs"
            className="mb-6 flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-sky-500"
          >
            {t("home.viewAll")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-6 justify-items-center gap-y-3 sm:grid-cols-11">
          {LANGUAGES.map((lang) => (
            <Link key={lang.id} to={`/play/${lang.id}`} title={lang.name}>
              <span className="block rounded-lg p-1.5 transition hover:scale-110 hover:bg-card">
                <LangBadge language={lang} size={40} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <TopPlayers />
    </div>
  );
}
