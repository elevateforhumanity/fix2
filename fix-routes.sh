#!/bin/bash
# Fix routes with incorrect withAuth signatures

files=(
  "app/api/admin/completions/route.ts"
  "app/api/admin/learner/info/route.ts"
  "app/api/admin/learner/notes/route.ts"
  "app/api/admin/program-holders/mou/countersign/route.ts"
  "app/api/admin/program-holders/mou/generate-pdf/route.ts"
  "app/api/admin/program-holders/mou/route.ts"
  "app/api/admin/program-holders/route.ts"
  "app/api/admin/program-holders/signed-mou/route.ts"
  "app/api/admin/program-holders/update/route.ts"
  "app/api/admin/storage/signature/route.ts"
)

for file in "${files[@]}"; do
  # Fix: async (req: Request, user) => to async (req, context, user) =>
  sed -i 's/async (req: Request, user)/async (req, context, user)/g' "$file"
  sed -i 's/async (req: NextRequest, user)/async (req, context, user)/g' "$file"
  sed -i 's/async (req, context, user)/async (req, context, user)/g' "$file"
  echo "Fixed: $file"
done
