export const snippets = [
  "defmodule Math do\n  def square(n), do: n * n\nend",
  "defmodule Stats do\n  def mean(list) do\n    if list == [] do\n      nil\n    else\n      Enum.sum(list) / length(list)\n    end\n  end\nend",
  "# Recursion over a list building an accumulator\ndefmodule Sum do\n  def of(list), do: do_sum(list, 0)\n\n  defp do_sum([], acc), do: acc\n  defp do_sum([head | tail], acc) do\n    do_sum(tail, acc + head)\n  end\nend",
  "# Pattern matching on function heads\ndefmodule FizzBuzz do\n  def run(n), do: Enum.map(1..n, &value/1)\n\n  defp value(n) when rem(n, 15) == 0, do: \"FizzBuzz\"\n  defp value(n) when rem(n, 3) == 0, do: \"Fizz\"\n  defp value(n) when rem(n, 5) == 0, do: \"Buzz\"\n  defp value(n), do: Integer.to_string(n)\nend",
  "# Struct definition with default values and update syntax\ndefmodule User do\n  defstruct name: \"\", email: \"\", admin: false\n\n  def promote(%__MODULE__{} = user) do\n    %{user | admin: true}\n  end\nend",
  "# Case expression on tuples from File.read\ndefmodule FileReader do\n  def read!(path) do\n    case File.read(path) do\n      {:ok, content} -> content\n      {:error, reason} -> raise \"could not read #{path}: #{reason}\"\n    end\n  end\nend",
];
