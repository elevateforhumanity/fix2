#!/usr/bin/env bash
set -euo pipefail

echo "==> Netlify 404 Diagnoser & Fixer (SPA redirects, custom 404, notes/content scaffolding)"

# 1) Detect framework & output dir
if [ -f "package.json" ]; then
  BUILD_CMD=$(jq -r '.scripts.build // empty' package.json 2>/dev/null || echo "")
else
  BUILD_CMD=""
fi

OUT_DIR="dist"
# Try to infer a different out dir for common frameworks
if [ -f "next.config.js" ] || [ -d ".next" ]; then OUT_DIR=".next"; fi
if [ -f "astro.config.mjs" ]; then OUT_DIR="dist"; fi
if [ -f "vite.config.ts" ] || [ -f "vite.config.js" ]; then OUT_DIR="dist"; fi
if [ -d "build" ] && [ -f "public/index.html" ] && [ -f "src/index.js" ]; then OUT_DIR="build"; fi

echo "• Detected publish directory candidate: ${OUT_DIR}"

# 2) Ensure SPA fallback (either _redirects or netlify.toml)
mkdir -p public

if [ ! -f "public/_redirects" ]; then
  cat > public/_redirects <<'EOF'
/*    /index.html   200
EOF
  echo "• Added public/_redirects for SPA fallback"
else
  # Ensure the rule exists
  if ! grep -q "/index.html   200" public/_redirects; then
    echo "/*    /index.html   200" >> public/_redirects
    echo "• Appended SPA rule to public/_redirects"
  else
    echo "• SPA fallback already present in public/_redirects"
  fi
fi

# 3) Ensure netlify.toml aligns (keeps both for safety)
if [ ! -f "netlify.toml" ]; then
  cat > netlify.toml <<EOF
[build]
  command = "npm run build"
  publish = "${OUT_DIR}"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
  echo "• Created netlify.toml with publish='${OUT_DIR}' and SPA redirect"
else
  # Patch publish dir if needed
  if ! grep -q "publish = \"${OUT_DIR}\"" netlify.toml; then
    sed -i.bak "s|^\\s*publish\\s*=\\s*\".*\"|  publish = \"${OUT_DIR}\"|g" netlify.toml || true
    if ! grep -q "publish = \"${OUT_DIR}\"" netlify.toml; then
      # If no publish key existed, append it
      awk -v out="${OUT_DIR}" '
        BEGIN{printed=0}
        /\[build\]/{print; printed=1; getline; print "  publish = \""out"\""; print; next}
        {print}
        END{if(printed==0){print "[build]\n  publish = \""out"\""}}' netlify.toml > netlify.toml.tmp && mv netlify.toml.tmp netlify.toml
    fi
    echo "• netlify.toml publish set to '${OUT_DIR}'"
  else
    echo "• netlify.toml already targets '${OUT_DIR}'"
  fi

  # Ensure SPA redirect block exists
  if ! grep -q '\[\[redirects\]\]' netlify.toml || ! grep -q 'to = "/index.html"' netlify.toml; then
    cat >> netlify.toml <<'EOF'

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
    echo "• Added SPA redirect to netlify.toml"
  fi
fi

# 4) Custom 404 page (friendlier than Netlify's default)
mkdir -p public
if [ ! -f "public/404.html" ]; then
  cat > public/404.html <<'EOF'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page Not Found — Elevate for Humanity</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap" rel="stylesheet"/>
  <style>
    body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#f7f4ee; color:#1f2937; margin:0; }
    .wrap { max-width:720px; margin:10vh auto; padding:24px; background:#fff; border-radius:16px; box-shadow:0 10px 30px rgba(20,20,20,.08); }
    .btn { display:inline-block; margin-right:8px; padding:10px 14px; border-radius:12px; text-decoration:none; font-weight:600; }
    .primary { background:#5aa47a; color:#fff; }
    .ghost { background:#fff; color:#386d53; border:1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>We can't find that page (404)</h1>
    <p>Try the homepage, Programs, or Academy. If you followed a link, it may be out of date.</p>
    <p>
      <a class="btn primary" href="/">Home</a>
      <a class="btn ghost" href="/programs">Programs</a>
      <a class="btn ghost" href="/academy">Academy</a>
    </p>
  </div>
</body>
</html>
EOF
  echo "• Added public/404.html"
else
  echo "• public/404.html already exists"
fi

# 5) Scaffold "notes" and "content" pages so nothing feels empty
mkdir -p public/content public/notes
if [ ! -f "public/notes/index.html" ]; then
  cat > public/notes/index.html <<'EOF'
<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Notes — Elevate for Humanity</title></head>
<body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:0 16px">
<h1>Notes</h1>
<p>Quick updates and internal notes. Replace this with your CMS or static content later.</p>
<ul>
  <li>Status: deploying to Netlify</li>
  <li>Next: connect portal domain, add Supabase keys</li>
</ul>
<p><a href="/">← Back</a></p>
</body></html>
EOF
  echo "• Scaffolded /notes"
fi

if [ ! -f "public/content/index.html" ]; then
  cat > public/content/index.html <<'EOF'
<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Content — Elevate for Humanity</title></head>
<body style="font-family:system-ui;max-width:800px;margin:40px auto;padding:0 16px">
<h1>Content Library</h1>
<p>Upload static brochures, PDFs, and images here so they deploy with the site.</p>
<ul>
  <li><a href="/content/sample.pdf">Sample PDF (replace me)</a></li>
</ul>
<p><a href="/">← Back</a></p>
</body></html>
EOF
  echo "• Scaffolded /content"
fi

# 6) Build locally so you can verify dist/index.html exists
if [ -n "$BUILD_CMD" ] && [ "$BUILD_CMD" != "null" ]; then
  echo "• Running build: npm run build"
  npm run build
else
  # Try pnpm or yarn as fallbacks
  if command -v pnpm >/dev/null && [ -f "pnpm-lock.yaml" ]; then
    echo "• Running build with pnpm"
    pnpm build
  elif command -v yarn >/dev/null && [ -f "yarn.lock" ]; then
    echo "• Running build with yarn"
    yarn build
  else
    echo "• No build script found — skipping build."
  fi
fi

# 7) Verify output has index.html
if [ -f "${OUT_DIR}/index.html" ]; then
  echo "✅ Build OK — ${OUT_DIR}/index.html exists."
else
  echo "❌ Build appears to be missing ${OUT_DIR}/index.html."
  echo "   • Check your framework's output directory or build errors above."
  exit 2
fi

cat <<MSG

----------------------------------------------------------------
Done.

Next steps:
1) In Netlify → Site settings → Build & deploy:
   - Build command:   npm run build
   - Publish directory: ${OUT_DIR}
2) Redeploy (Trigger deploy → Clear cache and deploy).
3) Deep links like /programs will now fall back to /index.html (no 404).
4) Optional content now exists at /notes and /content to avoid "empty" feel.

If you use React Router / Vite, your SPA is now correctly configured.
MSG
