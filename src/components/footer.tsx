import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import { useT } from "@/app/locale";

export function Footer() {
  const { t } = useT();
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Logo className="size-5" />
          <div>
            <p className="font-mono text-sm font-semibold text-foreground">CoffeeToCode</p>
            <p className="text-xs text-muted-foreground">{t("footer.desc")}</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <Link to="/terms" className="transition-colors hover:text-foreground">
            {t("nav.terms")}
          </Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">
            {t("nav.privacy")}
          </Link>
          <a
            href="https://github.com/gguatit/Code-Game"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-5xl px-4 py-3 text-xs text-muted-foreground">
          {t("footer.notice")}
        </p>
      </div>
    </footer>
  );
}
