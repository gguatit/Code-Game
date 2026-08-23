export const snippets = [
  "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <map>",
  "template <typename T>\nT max_of(const T& a, const T& b) {\n    return a < b ? b : a;\n}",
  "struct Vec3 {\n    float x{};\n    float y{};\n    float z{};\n\n    Vec3 operator+(const Vec3& other) const {\n        return { x + other.x, y + other.y, z + other.z };\n    }\n};",
  "int binary_search(const std::vector<int>& data, int target) {\n    int lo = 0;\n    int hi = static_cast<int>(data.size()) - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (data[mid] == target) return mid;\n        data[mid] < target ? lo = mid + 1 : hi = mid - 1;\n    }\n    return -1;\n}",
  "auto sum = std::accumulate(values.begin(), values.end(), 0.0);",
  "for (const auto& [name, score] : leaderboard) {\n    std::cout << name << \" -> \" << score << '\\n';\n}",
  "class Shape {\npublic:\n    virtual ~Shape() = default;\n    virtual double area() const = 0;\n};",
  "std::unique_ptr<Widget> widget = std::make_unique<Widget>();",
  "constexpr std::size_t kMaxPlayers = 8;",
  "assert(buffer.size() == expected_size && \"buffer size mismatch\");",
];
