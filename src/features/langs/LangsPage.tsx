import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LangBadge } from "@/components/game/lang-badge";
import { LANGUAGES } from "@/data/languages";
import { useT } from "@/app/locale";

export function LangsPage() {
  const { t } = useT();
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{t("langs.title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("langs.desc")}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LANGUAGES.map((l) => (
          <Link key={l.id} to={`/play/${l.id}`} className="focus-visible:outline-none">
            <Card className="group flex items-center gap-4 p-4 transition-colors hover:border-sky-500/40 hover:bg-accent">
              <LangBadge language={l} size={44} />
              <span className="font-medium">{l.name}</span>
              <ArrowRight className="ml-auto size-4 text-sky-500 opacity-0 transition-opacity group-hover:opacity-100" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
