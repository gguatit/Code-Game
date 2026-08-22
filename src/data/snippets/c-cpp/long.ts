export const snippets = [
  "template <typename T>\nclass Stack {\n  std::vector<T> items;\npublic:\n  void push(T value) { items.push_back(std::move(value)); }\n  T pop() {\n    T top = std::move(items.back());\n    items.pop_back();\n    return top;\n  }\n};",
  "class Matrix {\npublic:\n  Matrix operator+(const Matrix& other) const {\n    Matrix result(rows, cols);\n    for (size_t i = 0; i < data.size(); ++i)\n      result.data[i] = data[i] + other.data[i];\n    return result;\n  }\nprivate:\n  size_t rows, cols;\n  std::vector<double> data;\n};",
  "#include <cstdio>\n\nint main(int argc, char* argv[]) {\n  if (argc < 2) {\n    std::fprintf(stderr, \"usage: %s <file>\\n\", argv[0]);\n    return 1;\n  }\n  std::printf(\"opening %s\\n\", argv[1]);\n  return 0;\n}",
];
