export const snippets = [
  "using System.Text.Json;\n\nnamespace CodeGame.Services;\n\npublic interface ICache\n{\n    T? Get<T>(string key);\n}\n\npublic sealed class MemoryCache : ICache\n{\n    private readonly Dictionary<string, string> store = new();\n\n    public T? Get<T>(string key)\n    {\n        return store.TryGetValue(key, out var raw)\n            ? JsonSerializer.Deserialize<T>(raw)\n            : default;\n    }\n}",
  "app.MapPost(\"/orders\", async (Order order, OrderDb db) =>\n{\n    if (order.Items.Count == 0)\n    {\n        return Results.BadRequest(\"empty order\");\n    }\n\n    db.Orders.Add(order);\n    await db.SaveChangesAsync();\n    return Results.Created($\"/orders/{order.Id}\", order);\n});",
];
