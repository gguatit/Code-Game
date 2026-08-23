import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/auth-context";
import { useT } from "@/app/locale";
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
  const { t, locale } = useT();
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
        <h1 className="text-2xl font-bold">{t("profile.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("profile.of", { name: user?.displayName ?? "" })}
        </p>
      </div>

      {!data ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            {t("profile.loading")}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-3 divide-x rounded-xl border py-5 text-center">
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">{data.totals.games}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t("profile.games")}</div>
            </div>
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">
                {Math.round(data.totals.totalMs / 60000)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{t("profile.minutes")}</div>
            </div>
            <div className="px-2">
              <div className="text-3xl font-bold tabular-nums">{playedLangs.length}</div>
              <div className="mt-1 text-xs text-muted-foreground">{t("profile.challenged")}</div>
            </div>
          </div>

          {playedLangs.length > 0 && (
            <section>
              <h2 className="mb-3 text-lg font-semibold">{t("profile.bestTitle")}</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("profile.colLang")}</TableHead>
                      <TableHead className="text-right">{t("profile.colLongBest")}</TableHead>
                      <TableHead className="text-right">{t("profile.colPracBest")}</TableHead>
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
              <h2 className="mb-3 text-lg font-semibold">{t("profile.recentTitle")}</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("profile.colDate")}</TableHead>
                      <TableHead>{t("profile.colLang")}</TableHead>
                      <TableHead>{t("profile.colMode")}</TableHead>
                      <TableHead className="text-right">WPM</TableHead>
                      <TableHead className="text-right">{t("profile.colAccuracy")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recent.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="tabular-nums">
                          {new Date(r.createdAt).toLocaleDateString(locale)}
                        </TableCell>
                        <TableCell>{getLanguage(r.language)?.name ?? r.language}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {t(`cat.${r.category}` as "cat.long")}
                          </Badge>
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
                {t("profile.empty")}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
