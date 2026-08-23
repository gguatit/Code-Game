export const snippets = [
  "names=(\"alpha\" \"beta\" \"gamma\")\n\nfor name in \"${names[@]}\"; do\n  echo \"processing ${name}\"\n  mkdir -p \"build/${name}\"\ndone\necho \"done: ${#names[@]} items\"",
  "while IFS= read -r line; do\n  [[ -z \"$line\" || \"$line\" == \\#* ]] && continue\n  echo \"line: $line\"\ndone < config.txt",
  "check_port() {\n  local port=$1\n  if nc -z localhost \"$port\"; then\n    return 0\n  fi\n  return 1\n}\n\nif check_port 8080; then\n  echo \"port 8080 is open\"\nelse\n  echo \"port 8080 is closed\"\nfi",
  "case \"$1\" in\n  start)\n    echo \"starting service\"\n    ;;\n  stop)\n    echo \"stopping service\"\n    ;;\n  restart)\n    \"$0\" stop && sleep 1 && \"$0\" start\n    ;;\n  *)\n    echo \"usage: $0 {start|stop|restart}\"\n    exit 1\n    ;;\nesac",
  "src=\"${1:-.}\"\ndest=\"backup-$(date +%Y%m%d).tar.gz\"\n\ntar -czf \"$dest\" -C \"$src\" .\necho \"created $dest ($(du -h \"$dest\" | cut -f1))\"",
  "set -u\n\nfile=\"$1\"\n\nif [[ ! -f \"$file\" ]]; then\n  echo \"not found: $file\" >&2\n  exit 2\nfi\n\nlines=$(wc -l < \"$file\")\nwords=$(wc -w < \"$file\")\necho \"${lines} lines, ${words} words\"",
];
