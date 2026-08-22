export const snippets = [
  'grep -rn "TODO" src/ | wc -l',
  'find . -name "*.ts" -mtime -7',
  'export PATH="$HOME/.local/bin:$PATH"',
  'cat access.log | awk \'{print $1}\' | sort | uniq -c | head -10',
  'tar -czf backup.tar.gz dist/',
  'for f in *.txt; do mv "$f" "${f%.txt}.md"; done',
];
