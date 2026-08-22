import { snippets as terms } from "./terms";
import { snippets as short } from "./short";
import { snippets as long } from "./long";
import { snippets as practical } from "./practical";

export const snippetsByCategory = { terms, short, long, practical } as const;
