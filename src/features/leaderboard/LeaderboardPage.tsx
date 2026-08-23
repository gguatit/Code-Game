import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth-context";
import { useT } from "@/app/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LangBadge } from "@/components/game/lang-badge";
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { LANGUAGES, getLanguage } from "@/data/languages";
import { api, type LeaderboardEntry, type MyRank } from "@/lib/api";

export function LeaderboardPage() {
  const { user } = useAuth();
  const { t } = useT();
  const [category, setCategory] = useState<CategoryId>("long");
  const [language, setLanguage] = useState<string>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  const [rank, setRank] = useState<MyRank | null>(null);

  useEffect(() => {
    let stale = false;
    setEntries(null);
    api
      .leaderboard(category, language === "all" ? undefined : language)
      .then((r) => !stale && setEntries(r.entries))
      .catch(() => !stale && setEntries([]));
    return () => {
      stale = true;
    };
  }, [category, language]);

  useEffect(() => {
    if (!user) return;
    let stale = false;
    api
      .myRank(category, language === "all" ? undefined : language)
      .then((r) => !stale && setRank(r))
      .catch(() => !stale && setRank(null));
    return () => {
      stale = true;
    };
  }, [user, category, language]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("board.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("board.desc")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryId)}>
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {t(`cat.${c.id}`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("board.allLangs")}</SelectItem>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {user && rank && rank.rank !== null && rank.total !== null && (
        <p className="text-sm text-muted-foreground">
          {t("board.myRank", { n: rank.rank, m: rank.total })}
        </p>
      )}

      {entries === null ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            {t("board.loading")}
          </CardContent>
        </Card>
      ) : entries.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            {t("board.empty")}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">{t("board.rankCol")}</TableHead>
                <TableHead>{t("board.nickCol")}</TableHead>
                <TableHead>{t("board.langCol")}</TableHead>
                <TableHead className="text-right">WPM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e, i) => (
                <TableRow key={`${e.displayName}-${i}`}>
                  <TableCell
                    className={`font-heading font-medium tabular-nums ${
                      ["text-amber-400", "text-zinc-300", "text-orange-600"][i] ?? ""
                    }`}
                  >
                    {i + 1}
                  </TableCell>
                  <TableCell>
                    {e.displayName}
                    {user?.displayName === e.displayName && (
                      <Badge variant="outline" className="ml-2">
                        {t("board.me")}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-1">
                      {(e.languages ?? []).map((id) => {
                        const lang = getLanguage(id);
                        return lang ? (
                          <span key={id} title={lang.name}>
                            <LangBadge language={lang} size={22} />
                          </span>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">{e.wpm}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
