export const snippets = [
  "const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);",
  "type Result<T> = { ok: true; value: T } | { ok: false; error: string };",
  "async function fetchJson<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);\n  return (await res.json()) as T;\n}",
  "interface User {\n  readonly id: number;\n  name: string;\n  email?: string;\n  tags: string[];\n}",
  "const groupBy = <T, K extends string>(items: T[], key: (item: T) => K): Record<K, T[]> =>\n  items.reduce((acc, item) => {\n    const k = key(item);\n    (acc[k] ??= []).push(item);\n    return acc;\n  }, {} as Record<K, T[]>);",
  "enum Direction { Up, Down, Left, Right }",
  "function assertNever(value: never): never {\n  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);\n}",
  "const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));",
  "export type DeepReadonly<T> = { readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K] };",
  "const range = (start: number, end: number, step = 1): number[] =>\n  Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);",
];
