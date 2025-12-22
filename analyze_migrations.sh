#!/bin/bash
# Extract all CREATE TABLE statements from migrations

OUTPUT="/workspaces/fix2/MIGRATION_ANALYSIS.txt"
echo "=== MIGRATION ANALYSIS ===" > "$OUTPUT"
echo "Generated: $(date)" >> "$OUTPUT"
echo "" >> "$OUTPUT"

echo "=== ALL TABLES DEFINED ===" >> "$OUTPUT"
grep -h "create table" /workspaces/fix2/supabase/migrations/*.sql 2>/dev/null | \
  grep -o "create table[^(]*" | \
  sed 's/create table if not exists //g' | \
  sed 's/create table //g' | \
  sed 's/public\.//g' | \
  sort | uniq -c | sort -rn >> "$OUTPUT"

echo "" >> "$OUTPUT"
echo "=== TABLES DEFINED MULTIPLE TIMES ===" >> "$OUTPUT"
grep -h "create table" /workspaces/fix2/supabase/migrations/*.sql 2>/dev/null | \
  grep -o "create table[^(]*" | \
  sed 's/create table if not exists //g' | \
  sed 's/create table //g' | \
  sed 's/public\.//g' | \
  sort | uniq -c | sort -rn | awk '$1 > 1' >> "$OUTPUT"

echo "" >> "$OUTPUT"
echo "=== FILES PER TABLE ===" >> "$OUTPUT"
for table in $(grep -h "create table" /workspaces/fix2/supabase/migrations/*.sql 2>/dev/null | \
  grep -o "create table[^(]*" | \
  sed 's/create table if not exists //g' | \
  sed 's/create table //g' | \
  sed 's/public\.//g' | \
  sort -u); do
  echo "" >> "$OUTPUT"
  echo "TABLE: $table" >> "$OUTPUT"
  grep -l "create table.*$table" /workspaces/fix2/supabase/migrations/*.sql 2>/dev/null | \
    xargs -I {} basename {} >> "$OUTPUT"
done

chmod +x /workspaces/fix2/analyze_migrations.sh
bash /workspaces/fix2/analyze_migrations.sh
echo "Analysis complete"
