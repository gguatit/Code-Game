export const snippets = [
  "class Stack\n  def initialize\n    @items = []\n  end\n\n  def push(item)\n    @items.push(item)\n    self\n  end\n\n  def pop\n    raise \"stack is empty\" if @items.empty?\n    @items.pop\n  end\nend",
  "report = orders.group_by { |o| o.created_at.strftime('%Y-%m') }\n               .transform_values { |group| group.sum(&:total) }",
];
