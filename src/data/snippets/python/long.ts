export const snippets = [
  "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a",
  "class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, item):\n        self._items.append(item)\n\n    def pop(self):\n        if not self._items:\n            raise IndexError(\"stack is empty\")\n        return self._items.pop()",
  "async def fetch_all(urls):\n    results = []\n    async with aiohttp.ClientSession() as session:\n        for url in urls:\n            async with session.get(url) as resp:\n                results.append(await resp.json())\n    return results",
];
