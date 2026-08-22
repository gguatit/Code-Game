import type { LanguageDef } from "@/data/languages";

export function LangBadge({ language, size = 40 }: { language: LanguageDef; size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="12"
        fill={language.color}
        fillOpacity="0.14"
        stroke={language.color}
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="17"
        fontWeight="700"
        fill={language.color}
      >
        {language.monogram}
      </text>
    </svg>
  );
}
