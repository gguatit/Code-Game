export const snippets = [
  "func fetchPrices(ids: [Int]) async throws -> [Price] {\n    var prices: [Price] = []\n    for id in ids {\n        guard let price = try await loadPrice(id) else { continue }\n        prices.append(price)\n    }\n    return prices\n}",
  "extension Array where Element == Int {\n    var sum: Int { reduce(0, +) }\n}\nlet total = [1, 2, 3].sum",
];
