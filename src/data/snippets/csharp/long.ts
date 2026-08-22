export const snippets = [
  "public class Order\n{\n    public int Id { get; set; }\n    public string Customer { get; set; }\n\n    public decimal Total(IEnumerable<OrderItem> items)\n    {\n        decimal sum = 0;\n        foreach (var item in items)\n        {\n            sum += item.Price * item.Quantity;\n        }\n        return sum;\n    }\n}",
  "var expensive = orders\n    .Where(o => o.Total > 100)\n    .OrderByDescending(o => o.Total)\n    .Select(o => new { o.Id, o.Customer })\n    .ToList();",
  "public async Task<string> DownloadAsync(HttpClient client, string url)\n{\n    using var response = await client.GetAsync(url);\n    response.EnsureSuccessStatusCode();\n    return await response.Content.ReadAsStringAsync();\n}",
];
