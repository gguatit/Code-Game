import { snippetsByCategory as jsTs } from "./js-ts";
import { snippetsByCategory as python } from "./python";
import { snippetsByCategory as java } from "./java";
import { snippetsByCategory as cCpp } from "./c-cpp";
import { snippetsByCategory as csharp } from "./csharp";
import { snippetsByCategory as go } from "./go";
import { snippetsByCategory as rust } from "./rust";
import { snippetsByCategory as kotlin } from "./kotlin";
import { snippetsByCategory as swift } from "./swift";
import { snippetsByCategory as php } from "./php";
import { snippetsByCategory as ruby } from "./ruby";
import { snippetsByCategory as shell } from "./shell";
import { snippetsByCategory as sql } from "./sql";
import { snippetsByCategory as htmlCss } from "./html-css";
import { snippetsByCategory as dart } from "./dart";

export const REGISTRY = {
  "js-ts": jsTs,
  python,
  java,
  "c-cpp": cCpp,
  csharp,
  go,
  rust,
  kotlin,
  swift,
  php,
  ruby,
  shell,
  sql,
  "html-css": htmlCss,
  dart,
} as const;

export type Snippet = string;

export const MIN_COUNTS = {
  terms: 10,
  short: 6,
  long: 3,
  practical: 2,
} as const;

export const getSnippets = (
  langId: keyof typeof REGISTRY,
  categoryId: keyof typeof MIN_COUNTS
): readonly Snippet[] => REGISTRY[langId][categoryId];
