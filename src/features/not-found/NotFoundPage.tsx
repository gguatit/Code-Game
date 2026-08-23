import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useT } from "@/app/locale";

export function NotFoundPage() {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-heading text-7xl font-bold text-sky-500">404</p>
      <h1 className="text-xl font-semibold">{t("nf.title")}</h1>
      <p className="text-muted-foreground">{t("nf.desc")}</p>
      <Button asChild>
        <Link to="/">{t("nf.home")}</Link>
      </Button>
    </div>
  );
}
