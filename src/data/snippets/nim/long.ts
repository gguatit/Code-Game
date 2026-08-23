export const snippets = [
  "# Memoized Fibonacci with a Table\nimport tables\n\nvar cache = {0: 0, 1: 1}.toTable\n\nproc fib(n: int): int =\n  if cache.hasKey(n):\n    return cache[n]\n  result = fib(n - 1) + fib(n - 2)\n  cache[n] = result\n\necho fib(50)",
  "# Word frequency counter using CountTable\nimport strutils, sequtils, tables\n\nlet text = \"the quick brown fox jumps over the lazy dog the end\"\nlet counts = toCountTable(text.split(' '))\n\nfor word in counts.keys:\n  echo word, \": \", counts[word]",
  "# Simple HTTP status classifier with case and sets\nimport std/[httpclient, strutils]\n\ntype Group = enum gInfo, gOk, gRedirect, gClientErr, gServerErr\n\nfunc classify(code: HttpCode): Group =\n  let c = int(code)\n  case c div 100\n  of 1: gInfo\n  of 2: gOk\n  of 3: gRedirect\n  of 4: gClientErr\n  else: gServerErr",
];
