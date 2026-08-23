import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/auth-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLanguage } from "@/data/languages";
import { api, type ProfileData } from "@/lib/api";

export function ProfilePage() {
  const { user, loading } = useAuth();
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (!user) return;
    api.profile().then(setData).catch(() => setData(null));
  }, [user]);

  if (!loading && !user) return <Navigate to="/login" replace />;

  const bestMap = new Map(
    data?.best.map((b) => [`${b.language}:${b.category}`, b.wpm] as const)
  );
  const playedLangs = [...new Set(data?.best.map((b) => b.language) ?? [])];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">내 기록</h1>
        <p className="text-sm text-muted-foreground">{user?.displayName}님의 연습 기록</p>
      </div>

      {!data ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            불러오는 중...
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-3 divide-x rounded-xl border py-5 text-center">
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">{data.totals.games}</div>
              <div className="mt-1 text-xs text-muted-foreground">총 판수</div>
            </div>
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">
                {Math.round(data.totals.totalMs / 60000)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">총 연습 시간(분)</div>
            </div>
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">{playedLangs.length}</div>
              <div className="mt-1 text-xs text-muted-foreground">도전한 언어</div>
            </div>
          </div>

          {playedLangs.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">언어별 최고 기록</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>언어</TableHead>
                      <TableHead className="text-right">장문 최고 WPM</TableHead>
                      <TableHead className="text-right">실전 최고 WPM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playedLangs.map((langId) => {
                      const lang = getLanguage(langId);
                      return (
                        <TableRow key={langId}>
                          <TableCell className="font-medium">{lang?.name ?? langId}</TableCell>
                          <TableCell className="text-right tabular-nums">
                            {bestMap.get(`${langId}:long`) ?? "-"}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {bestMap.get(`${langId}:practical`) ?? "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            </section>
          )}

          {data.recent.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">최근 기록</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>언어</TableHead>
                      <TableHead>모드</TableHead>
                      <TableHead className="text-right">WPM</TableHead>
                      <TableHead className="text-right">정확도</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recent.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="tabular-nums">
                          {new Date(r.createdAt).toLocaleDateString("ko-KR")}
                        </TableCell>
                        <TableCell>{getLanguage(r.language)?.name ?? r.language}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{r.category === "long" ? "장문" : "실전"}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">
                          {r.wpm}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{r.accuracy}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </section>
          )}

          {data.totals.games === 0 && (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                아직 연습 기록이 없습니다. 언어를 골라 첫 판을 시작해보세요.
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
