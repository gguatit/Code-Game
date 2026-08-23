export const snippets = [
  "IO.puts \"Hello, Elixir!\"",
  "sum = Enum.sum([1, 2, 3, 4, 5])",
  "squared = Enum.map(1..5, fn n -> n * n end)",
  "defmodule Greeter do\n  def greet(name), do: \"Hello, #{name}!\"\nend",
  "{ok, value} = Map.fetch(%{a: 1}, :a)\nIO.inspect(value)",
  "1..10\n|> Enum.filter(&rem(&1, 2) == 0)\n|> Enum.sum()\n|> IO.puts()",
];
