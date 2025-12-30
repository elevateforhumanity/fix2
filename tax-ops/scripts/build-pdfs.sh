#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
IN="$ROOT/tax-ops/agreements/sub-office-mou.md"
OUTDIR="$ROOT/tax-ops/agreements"
OUT="$OUTDIR/sub-office-mou.pdf"

mkdir -p "$OUTDIR"

if [[ ! -f "$IN" ]]; then
  echo "ERROR: Missing $IN"
  exit 1
fi

pandoc "$IN" \
  -o "$OUT" \
  --pdf-engine=pdflatex \
  -V geometry:margin=1in

echo "✅ Built: $OUT"
