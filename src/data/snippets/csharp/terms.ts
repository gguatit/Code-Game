export const snippets = [
  "public delegate void PriceChanged(string symbol, decimal oldPrice, decimal newPrice);\n\npublic sealed class StockTicker {\n    public event PriceChanged? OnPriceChanged;\n}",
  "public record OrderLine(string Sku, int Quantity, decimal UnitPrice) {\n    public decimal Total => Quantity * UnitPrice;\n}",
  "public async Task<string> DownloadAsync(HttpClient client, string url) {\n    using var response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);\n    response.EnsureSuccessStatusCode();\n    return await response.Content.ReadAsStringAsync();\n}",
  "var grouped = orders\n    .Where(o => o.CreatedAt >= DateTime.UtcNow.AddDays(-7))\n    .GroupBy(o => o.CustomerId)\n    .Select(g => new { CustomerId = g.Key, Total = g.Sum(o => o.Total) })\n    .OrderByDescending(x => x.Total)\n    .ToList();",
  "public static class Guard {\n    public static T NotNull<T>(T? value, [CallerArgumentExpression(nameof(value))] string? name = null)\n        where T : class {\n        if (value is null) throw new ArgumentNullException(name);\n        return value;\n    }\n}",
  "public enum GameState { Menu, Playing, Paused, GameOver }\n\npublic sealed class StateMachine {\n    public GameState Current { get; private set; } = GameState.Menu;",
  "public readonly struct Money : IEquatable<Money> {\n    public decimal Amount { get; }\n    public string Currency { get; }\n\n    public Money(decimal amount, string currency) {\n        Amount = decimal.Round(amount, 2);\n        Currency = currency;\n    }\n\n    public bool Equals(Money other) => Amount == other.Amount && Currency == other.Currency;\n}",
  "services.AddHttpClient<GitHubClient>(client => {\n        client.BaseAddress = new Uri(\"https://api.github.com/\");\n        client.DefaultRequestHeaders.UserAgent.ParseAdd(\"code-game/1.0\");\n    })\n    .AddPolicyHandler(RetryPolicy);",
  "public interface IRepository<T> where T : class {\n    Task<T?> FindByIdAsync(Guid id, CancellationToken ct = default);\n    Task AddAsync(T entity, CancellationToken ct = default);\n}",
  "foreach (var (key, values) in index.Select(kvp => (kvp.Key, kvp.Value))) {\n    Console.WriteLine($\"{key}: {string.Join(\\\", \\\", values)}\");\n}",
];
