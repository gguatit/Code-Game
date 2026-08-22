export interface CategoryDef {
  id: "terms" | "short" | "long" | "practical";
  name: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "terms", name: "용어" },
  { id: "short", name: "단문" },
  { id: "long", name: "장문" },
  { id: "practical", name: "실전" },
];

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const getCategory = (id: string | undefined) =>
  CATEGORIES.find((c) => c.id === id);
