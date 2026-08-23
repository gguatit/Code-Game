export const snippets = [
  "for ($i = 1; $i <= 20; $i++) {\n    if ($i % 15 === 0) {\n        echo \"FizzBuzz\\n\";\n    } elseif ($i % 3 === 0) {\n        echo \"Fizz\\n\";\n    } elseif ($i % 5 === 0) {\n        echo \"Buzz\\n\";\n    } else {\n        echo $i . \"\\n\";\n    }\n}",
  "class Calculator\n{\n    private float $memory = 0;\n\n    public function push(float $value): self\n    {\n        $this->memory += $value;\n        return $this;\n    }\n\n    public function result(): float\n    {\n        return $this->memory;\n    }\n}",
  "$scores = ['ada' => 91, 'linus' => 87, 'grace' => 95];\n\narsort($scores);\n$top = array_key_first($scores);\n$avg = array_sum($scores) / count($scores);\n\necho \"top: \" . $top . \"\\n\";\necho \"average: \" . round($avg, 1) . \"\\n\";",
  "$raw = \"  Hello, PHP World!  \";\n\n$clean = trim($raw);\n$upper = strtoupper($clean);\n$parts = explode(\",\", $clean);\n$slug = strtolower(str_replace(\" \", \"-\", $clean));",
  "function slugify(string $title): string\n{\n    $slug = strtolower(trim($title));\n    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);\n    return trim($slug, '-');\n}\n\necho slugify(\"  Hello, Typing World! \");",
  "try {\n    $value = (int) $_POST['quantity'];\n    if ($value <= 0) {\n        throw new InvalidArgumentException(\"quantity must be positive\");\n    }\n    echo \"accepted: \" . $value;\n} catch (InvalidArgumentException $e) {\n    http_response_code(422);\n    echo \"error: \" . $e->getMessage();\n}",
];
