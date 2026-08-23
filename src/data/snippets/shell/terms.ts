export const snippets = [
  "grep -rn --include='*.ts' 'TODO' src/",
  "find . -name '*.log' -mtime +7 -delete",
  "tar -czf backup.tar.gz -C /var/www html",
  "awk -F',' '{ sum += $2 } END { print sum }' data.csv",
  "sed -i 's/http:\\/\\/localhost/https:\\/\\/prod.example/g' config.yml",
  "chmod 755 deploy.sh && chown www-data:www-data deploy.sh",
  "ps aux | sort -rk 3 | head -n 10",
  "df -h | awk '$5+0 > 80 { print $6, $5 }'",
  "cat urls.txt | xargs -P 4 -n 1 curl -sO",
  "journalctl -u nginx --since '1 hour ago' --no-pager",
];
