export const snippets = [
  "const std = @import(\"std\");\n\npub fn main() void {\n    std.debug.print(\"Hello, Zig!\\n\", .{});\n}",
  "const std = @import(\"std\");\n\npub fn main() !void {\n    var gpa = std.heap.GeneralPurposeAllocator(.{}){};\n    const allocator = gpa.allocator();\n    const buf = try allocator.alloc(u8, 16);\n    defer allocator.free(buf);\n    @memset(buf, 0);\n    buf[0] = 'z';\n    std.debug.print(\"{s}\\n\", .{buf});\n}",
  "fn add(a: i32, b: i32) i32 {\n    return a + b;\n}\n\npub fn main() void {\n    std.debug.print(\"{d}\\n\", .{add(2, 3)});\n}",
  "const std = @import(\"std\");\n\npub fn main() void {\n    var i: u8 = 0;\n    while (i < 5) : (i += 1) {\n        std.debug.print(\"i={d}\\n\", .{i});\n    }\n}",
  "const Point = struct {\n    x: f32,\n    y: f32,\n};\n\npub fn main() void {\n    const p = Point{ .x = 1.5, .y = -2.0 };\n    std.debug.print(\"({d}, {d})\\n\", .{ p.x, p.y });\n}",
  "const std = @import(\"std\");\n\npub fn main() !void {\n    const args = try std.process.argsAlloc(std.heap.page_allocator);\n    defer std.process.argsFree(std.heap.page_allocator, args);\n    for (args, 0..) |arg, idx| {\n        std.debug.print(\"[{d}] {s}\\n\", .{ idx, arg });\n    }\n}",
];
