import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useT } from "@/app/locale";

export interface LegalBlock {
  h?: string;
  ps?: string[];
  ul?: string[];
}

export interface LegalDoc {
  title: string;
  effective: string;
  intro?: string;
  blocks: LegalBlock[];
  tail?: string;
}

const ISSUES_URL = "https://github.com/gguatit/Code-Game/issues";

function linkClass() {
  return "underline underline-offset-4 hover:text-foreground";
}

function renderText(text: string, labels: Record<string, string>): ReactNode[] {
  return text
    .split(/(\{\{(?:terms|privacy|issues)\}\}|\*\*[^*]+\*\*)/g)
    .map((part, i): ReactNode => {
      if (part === "{{terms}}")
        return (
          <Link key={i} to="/terms" className={linkClass()}>
            {labels.terms}
          </Link>
        );
      if (part === "{{privacy}}")
        return (
          <Link key={i} to="/privacy" className={linkClass()}>
            {labels.privacy}
          </Link>
        );
      if (part === "{{issues}}")
        return (
          <a
            key={i}
            href={ISSUES_URL}
            target="_blank"
            rel="noreferrer"
            className={linkClass()}
          >
            GitHub Issues
          </a>
        );
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      return part;
    });
}

export function LegalDocView({ doc }: { doc: LegalDoc }) {
  const { t } = useT();
  const labels = { terms: t("nav.terms"), privacy: t("nav.privacy") };

  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-sm text-muted-foreground">{doc.effective}</p>
      </header>

      {doc.intro && (
        <section className="space-y-3 text-sm leading-relaxed">
          <p>{renderText(doc.intro, labels)}</p>
        </section>
      )}

      {doc.blocks.map((b, i) => (
        <section key={i} className="space-y-3">
          {b.h && <h2 className="text-lg font-semibold">{b.h}</h2>}
          {b.ps?.map((p, j) => (
            <p key={j} className="text-sm leading-relaxed">
              {renderText(p, labels)}
            </p>
          ))}
          {b.ul && (
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              {b.ul.map((li, j) => (
                <li key={j}>{renderText(li, labels)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {doc.tail && (
        <p className="border-t pt-6 text-xs text-muted-foreground">
          {renderText(doc.tail, labels)}
        </p>
      )}
    </article>
  );
}
