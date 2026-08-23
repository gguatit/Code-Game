import { useEffect, useState } from "react";
import { useAuth } from "@/app/auth-context";
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
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { LANGUAGES } from "@/data/languages";
import { api, type LeaderboardEntry } from "@/lib/api";

export function LeaderboardPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState<CategoryId>("terms");
  const [language, setLanguage] = useState<string>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">리더보드</h1>
        <p className="text-sm text-muted-foreground">카테고리·언어별 최고 기록 순위</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={category} onValueChange={(v) => setCategory(v as CategoryId)}>
          <TabsList>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id}>
                {c.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 언어</SelectItem>
            {LANGUAGES.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {entries === null ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            불러오는 중...
          </CardContent>
        </Card>
      ) : entries.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            아직 기록이 없습니다. 첫 기록의 주인이 되어보세요.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">순위</TableHead>
                <TableHead>닉네임</TableHead>
                <TableHead className="text-right">WPM</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e, i) => (
                <TableRow key={`${e.displayName}-${i}`}>
                  <TableCell className="font-medium tabular-nums">{i + 1}</TableCell>
                  <TableCell>
                    {e.displayName}
                    {user?.displayName === e.displayName && (
                      <Badge variant="outline" className="ml-2">
                        나
                      </Badge>
                    )}
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
