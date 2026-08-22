export const snippets = [
  "#include <stdio.h>\n#include <stdlib.h>\n\nint compare(const void* a, const void* b) {\n  return *(int*)a - *(int*)b;\n}\n\nint main(void) {\n  int nums[] = {5, 2, 8, 1};\n  qsort(nums, 4, sizeof(int), compare);\n  for (int i = 0; i < 4; i++) printf(\"%d \", nums[i]);\n  return 0;\n}",
  "std::optional<std::string> find_user(const std::map<int, std::string>& users, int id) {\n  auto it = users.find(id);\n  if (it == users.end()) {\n    return std::nullopt;\n  }\n  return it->second;\n}",
];
