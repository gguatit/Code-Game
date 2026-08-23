import { useCallback, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ResultCard } from "@/components/game/result-card";
import { StatsBar } from "@/components/game/stats-bar";
import { TypingArea } from "@/components/game/typing-area";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { getLanguage, type LanguageDef } from "@/data/languages";
import { getSnippets, type Snippet } from "@/data/snippets";
import { computeStats } from "@/engine/stats";
import { applyBackspace, applyKey, applyTab, initState } from "@/engine/typing";
import type { TypingState } from "@/engine/types";

const pickSnippet = (snippets: readonly Snippet[]) =>
  snippets[Math.floor(Math.random() * snippets.length)]!;

function Play({ language }: { language: LanguageDef }) {
  // ponytail: LanguageDef.id는 string이지만 스니펫 레지스트리 키와 실제로 동일 — 캐스팅 한 줄로 타협
  const langId = language.id as Parameters<typeof getSnippets>[0];
  const [category, setCategory] = useState<CategoryId>("long");
  const [state, setState] = useState<TypingState>(() =>
    initState(pickSnippet(getSnippets(langId, "long"))),
  );

  const finished = state.finishedAt !== null;
  const stats = computeStats(state);

  const restart = useCallback(
    (cat: CategoryId) => {
      setState(initState(pickSnippet(getSnippets(langId, cat))));
    },
    [langId],
  );

  useEffect(() => {
    if (finished || state.startedAt === null) return;
    const timer = setInterval(() => setState((s) => ({ ...s })), 250);
    return () => clearInterval(timer);
  }, [finished, state.startedAt]);

  useEffect(() => {
    if (finished) return;
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Escape") {
        e.preventDefault();
        restart(category);
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        setState(applyTab);
        return;
      }
      if (e.key === " ") e.preventDefault();
      const key = e.key === "Enter" ? "\n" : e.key;
      setState((s) => (key === "Backspace" ? applyBackspace(s) : applyKey(s, key)));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finished, category, restart]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">{language.name}</h1>
        <Tabs
          value={category}
          onValueChange={(v) => {
            setCategory(v as CategoryId);
            restart(v as CategoryId);
          }}
        >
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {finished ? (
        <div className="mt-8">
          <ResultCard stats={stats} language={language} category={category} onRestart={() => restart(category)} />
        </div>
      ) : (
        <>
          <div className="mt-4">
            <StatsBar stats={stats} />
          </div>
          <Card className="mt-4 p-6">
            <TypingArea state={state} />
            <p className="mt-6 text-xs text-muted-foreground">
              Esc: 새 문제 · Tab: 들여쓰기 · Enter: 줄바꿈 · Backspace: 되돌리기
            </p>
          </Card>
        </>
      )}
    </div>
  );
}

export function PlayPage() {
  const { lang } = useParams();
  const language = lang ? getLanguage(lang) : undefined;
  if (!language) return <Navigate to="/langs" replace />;
  return <Play key={language.id} language={language} />;
}
