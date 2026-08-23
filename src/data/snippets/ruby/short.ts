export const snippets = [
  "(1..20).each do |n|\n  if n % 15 == 0\n    puts \"FizzBuzz\"\n  elsif n % 3 == 0\n    puts \"Fizz\"\n  elsif n % 5 == 0\n    puts \"Buzz\"\n  else\n    puts n\n  end\nend",
  "class Counter\n  def initialize(start: 0)\n    @count = start\n    @history = []\n  end\n\n  def increment(by = 1)\n    @count += by\n    @history << @count\n    self\n  end\n\n  attr_reader :count, :history\nend\n\ncounter = Counter.new(start: 10)\ncounter.increment(5)\np counter.history",
  "scores = { ada: 91, linus: 87, grace: 95 }\n\nbest = scores.max_by { |_name, score| score }\naverage = scores.values.sum.to_f / scores.size\nsorted = scores.sort_by { |_name, score| -score }\n\nputs \"best: #{best[0]}\"\nputs \"average: #{average.round(1)}\"\npp sorted",
  "title = \"  Hello, Ruby World!  \"\n\ntrimmed = title.strip\nwords = trimmed.split\nslug = trimmed.downcase.gsub(/[^a-z0-9]+/, '-').delete_prefix('-').delete_suffix('-')\nrepeated = '-' * 20\nputs slug\nputs repeated",
  "def divide(a, b)\n  raise ZeroDivisionError, 'divider is zero' if b.zero?\n\n  a / b.to_f\nrescue StandardError => e\n  warn \"failed: #{e.message}\"\n  nil\nend\n\np divide(10, 4)\np divide(1, 0)",
  "names = %w[kim lee park choi]\n\ntotals = names.each_with_object({}) do |name, acc|\n  acc[name] = name.length\nend\nlongest = names.max_by(&:length)\ninitials = names.map { |name| name[0].upcase }.join('')\n\npp totals\nputs longest\nputs initials",
];
