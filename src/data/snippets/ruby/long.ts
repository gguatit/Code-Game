export const snippets = [
  "def fib(n)\n  a, b = 0, 1\n  n.times do\n    a, b = b, a + b\n  end\n  a\nend\n\n[5, 10, 20].each do |n|\n  puts \"fib(#{n}) = #{fib(n)}\"\nend",
  "def quicksort(items)\n  return items if items.length <= 1\n\n  pivot, *rest = items\n  left = rest.select { |x| x < pivot }\n  right = rest.select { |x| x >= pivot }\n  quicksort(left) + [pivot] + quicksort(right)\nend\n\ndata = [42, 7, 19, 3, 88, 23]\np quicksort(data)",
  "def binary_search(items, target)\n  lo = 0\n  hi = items.length - 1\n  while lo <= hi\n    mid = (lo + hi) / 2\n    return mid if items[mid] == target\n\n    if items[mid] < target\n      lo = mid + 1\n    else\n      hi = mid - 1\n    end\n  end\n  -1\nend\n\nsorted = [1, 3, 5, 8, 13, 21, 34]\np binary_search(sorted, 13)\np binary_search(sorted, 4)",
  "def primes_up_to(limit)\n  sieve = Array.new(limit + 1, true)\n  sieve[0] = sieve[1] = false\n  (2..limit).each do |i|\n    next unless sieve[i]\n\n    (i * i).step(limit, i) { |j| sieve[j] = false }\n  end\n  (2..limit).select { |i| sieve[i] }\nend\n\np primes_up_to(30)",
  "def palindrome?(text)\n  clean = text.downcase.gsub(/[^a-z0-9]/, '')\n  clean == clean.reverse\nend\n\nputs palindrome?('Never odd or even')\nputs palindrome?('Hello world')",
];
