export const snippets = [
  "export async function retry<T>(fn: () => Promise<T>, times: number): Promise<T> {\n  let lastError: unknown;\n  for (let i = 0; i < times; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      lastError = err;\n      await new Promise((r) => setTimeout(r, 2 ** i * 100));\n    }\n  }\n  throw lastError;\n}",
  "interface Todo {\n  id: number;\n  title: string;\n  done: boolean;\n}\n\nfunction toggleAll(todos: Todo[], done: boolean): Todo[] {\n  return todos.map((t) => ({ ...t, done }));\n}",
];
