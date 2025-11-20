# EFH SEO + Prerender Pack

Use this checklist when bringing the Netlify + Cloudflare auto-build flow online.

## 1. Environment Variables

Set these on Netlify and Cloudflare (and optionally in `.env` for local preview):

- `SITE_URL` – canonical production URL (e.g. `https://www.elevateforhumanity.org`).
- `BRAND_NAME`
- `CITY`
- `STATE`
- `PHONE`
- `EMAIL`
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## 2. Dependencies

Install the supporting packages locally:

```bash
pnpm add -D vite-plugin-html vite-plugin-ssg sitemap-generator-cli
```

The repo already lists these in `package.json` so `pnpm install` inside CI will pick them up automatically once committed.

## 3. Build Pipeline

1. Run `pnpm run build` for the SPA bundle (this triggers the postbuild chain that checks for stray source maps).
2. Execute `pnpm run sitemap:gen` and `pnpm run robots:gen` to refresh crawler assets if you are testing the generators independently.
3. In Netlify, prefer a single build command such as `pnpm install --frozen-lockfile && pnpm run build`—the postbuild hook will take care of canonical URLs, domain rewrites, sitemap/robots regeneration, and the no-source-maps guard automatically.

## 4. Prerender Targets

Maintain `ssg.config.js` as the single source of truth for routes, metadata, and program-specific SEO content. The sitemap generator consumes the same file to stay synchronized.

## 5. Media Placeholders

Replace `public/assets/og/efh-hero.png` with a production-ready hero image before launch to avoid duplicate imagery.

## 6. Verification

- Check `dist/` output by running `pnpm run preview`.
- Validate `public/sitemap.xml` and `public/robots.txt` to confirm URL accuracy.
- Use Netlify deploy previews to confirm Cloudflare cache purge + DNS behavior.

## 7. Preview & Access Hardening

- Gate Netlify deploy previews (e.g., Netlify password protection or Cloudflare Access) so only authenticated reviewers can load the bundle.
- Keep `.map` generation disabled in production—`scripts/no-source-maps.cjs` will fail the build if any maps slip through.
- Re-run `pnpm run autopilot:check` before pushing to make sure linting, type checks, token guard, and the build pipeline stay green.

When everything looks good, enable “Deploy to Production on merge” in Netlify so the GitHub → Netlify → Cloudflare workflow stays completely hands-free.
