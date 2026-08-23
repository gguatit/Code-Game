export const snippets = [
  "from dataclasses import dataclass, field\n\n@dataclass(order=True)\nclass Task:\n    priority: int\n    title: str = field(compare=False)\n    done: bool = field(default=False, compare=False)",
  "def clamp(value: float, lo: float, hi: float) -> float:\n    return max(lo, min(hi, value))",
  "squares = {n: n ** 2 for n in range(1, 11) if n % 2 == 0}",
  "async def fetch_json(session: 'aiohttp.ClientSession', url: str) -> dict:\n    async with session.get(url) as resp:\n        resp.raise_for_status()\n        return await resp.json()",
  "class Stack:\n    def __init__(self) -> None:\n        self._items: list = []\n\n    def push(self, item) -> None:\n        self._items.append(item)\n\n    def pop(self):\n        if not self._items:\n            raise IndexError('pop from empty stack')\n        return self._items.pop()",
  "from functools import lru_cache\n\n@lru_cache(maxsize=None)\ndef fib(n: int) -> int:\n    return n if n < 2 else fib(n - 1) + fib(n - 2)",
  "with open('data.txt', encoding='utf-8') as file:\n    lines = [line.strip() for line in file if line.strip()]",
  "import argparse\n\nparser = argparse.ArgumentParser(description='Process some integers.')\nparser.add_argument('--count', type=int, default=10, help='how many items')",
  "match command.split():\n    case ['quit']:\n        print('bye')\n    case ['load', filename]:\n        print(f'loading {filename}')\n    case _:",
  "total = sum(price * qty for price, qty in zip(prices, quantities))",
];
