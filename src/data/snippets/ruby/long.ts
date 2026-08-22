export const snippets = [
  "class Stack\n  def initialize\n    @items = []\n  end\n\n  def push(item)\n    @items << item\n    self\n  end\n\n  def pop\n    @items.pop\n  end\nend",
  "prices = orders.each_with_object({}) do |order, acc|\n  acc[order.customer] ||= 0\n  acc[order.customer] += order.total\nend",
  "def slugify(title)\n  title.downcase.strip.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')\nend",
];
