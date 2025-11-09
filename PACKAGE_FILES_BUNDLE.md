# Package.json Files Bundle

This document contains all package.json files from the repository for easy sharing.

---

## Root package.json

**Location**: `/workspaces/fix2/package.json`

```json
{
  "name": "efh-autopilot",
  "type": "module",
  "version": "2.0.0",
  "engines": {
    "node": ">=20.11.1 <23"
  },
  "packageManager": "pnpm@9.7.0",
  "lint-staged": {
    "*.{ts,tsx,js,jsx,css,md}": ["prettier --write"]
  },
  "dependencies": {
    "@capacitor/app": "^7.0.2",
    "@capacitor/core": "^7.4.4",
    "@capacitor/haptics": "^7.0.2",
    "@capacitor/keyboard": "^7.0.2",
    "@capacitor/status-bar": "^7.0.2",
    "@hookform/resolvers": "^5.2.2",
    "@stripe/stripe-js": "^8.1.0",
    "@supabase/auth-js": "^2.76.1",
    "@supabase/supabase-js": "2.57.4",
    "@vitejs/plugin-react": "5.1.0",
    "autoprefixer": "^10.4.21",
    "axios": "^1.12.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "compression": "^1.8.1",
    "express": "^5.1.0",
    "glob": "^10.4.5",
    "jsdom": "23.2.0",
    "lucide-react": "^0.545.0",
    "node-fetch": "3.3.2",
    "openai": "^6.7.0",
    "parse-multipart-data": "^1.5.0",
    "postcss": "^8.5.6",
    "prop-types": "15.8.1",
    "react": "19.1.1",
    "react-dom": "19.1.1",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.64.0",
    "react-router-dom": "6.30.1",
    "recharts": "^3.3.0",
    "rollup-plugin-visualizer": "6.0.3",
    "sitemap": "^8.0.1",
    "slugify": "1.6.6",
    "socket.io-client": "^4.8.1",
    "stripe": "^19.1.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^3.4.18",
    "tailwindcss-animate": "^1.0.7",
    "vite": "7.1.12",
    "zod": "^4.1.11",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@capacitor/android": "^7.4.4",
    "@capacitor/cli": "^7.4.4",
    "@capacitor/ios": "^7.4.4",
    "@eslint/js": "^9.38.0",
    "@netlify/functions": "^5.0.1",
    "@tailwindcss/forms": "^0.5.10",
    "@tailwindcss/typography": "^0.5.19",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.7.2",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@typescript-eslint/eslint-plugin": "^8.46.1",
    "@typescript-eslint/parser": "^8.46.1",
    "@vitest/coverage-v8": "^3.2.4",
    "@vitest/ui": "^3.2.4",
    "dotenv": "^17.2.3",
    "eslint": "^9.37.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.0",
    "globals": "^16.4.0",
    "happy-dom": "^20.0.0",
    "husky": "^8.0.0",
    "jest": "^29.7.0",
    "js-yaml": "^4.1.0",
    "linkinator": "^7.4.0",
    "lint-staged": "^16.2.4",
    "netlify-cli": "^23.9.5",
    "netlify-plugin-cache": "^1.0.3",
    "netlify-plugin-submit-sitemap": "^0.4.0",
    "prettier": "^3.6.2",
    "puppeteer": "^24.27.0",
    "rimraf": "5.0.10",
    "sort-package-json": "^3.4.0",
    "stylelint": "^16.25.0",
    "stylelint-config-standard": "^39.0.1",
    "stylelint-config-tailwindcss": "^1.0.0",
    "terser": "^5.44.0",
    "typescript": "^5.9.3",
    "typescript-eslint": "^8.46.1",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-sitemap": "^0.8.2",
    "vite-ssg": "^0.24.0",
    "vitest": "^3.2.4",
    "web-vitals": "^5.1.0",
    "wrangler": "^4.43.0"
  },
  "scripts": {
    "preinstall": "corepack enable || true",
    "ci:install": "pnpm install --frozen-lockfile",
    "ci:build": "pnpm build",
    "ci:check": "pnpm typecheck && pnpm lint",
    "clean:full": "rimraf node_modules dist .vite .turbo && pnpm store prune",
    "autopilot": "node workers/start-autopilot.js",
    "autopilot:bg": "node workers/start-autopilot.js &",
    "dev:with-autopilot": "pnpm autopilot:bg && pnpm dev",
    "predev": "echo 'Starting dev server...'",
    "dev": "vite",
    "make:images": "python3 tools/make_brand_images.py",
    "make:logo": "python3 tools/make_logo_assets.py",
    "prebuild": "node scripts/generate-routes.mjs",
    "build": "node scripts/check-env.js && vite build",
    "postbuild": "node scripts/postbuild.mjs && node scripts/generate-sitemaps.mjs && node scripts/generate-complete-sitemap.mjs && node scripts/fix-broken-links.mjs && node scripts/fix-domain-urls.js && node scripts/update-canonical-urls.js && node scripts/no-source-maps.cjs && bash scripts/copy-bridge-files.sh",
    "preview": "vite preview --host 0.0.0.0 --port 8080 --strictPort",
    "check:links": "linkinator http://127.0.0.1:8080 --recurse --skip 'mailto:|tel:'",
    "ci:lh": "lhci collect --url=http://127.0.0.1:8080 --numberOfRuns=1 --settings.preset=desktop",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "format": "prettier . --write",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:brand": "node scripts/reviewer.js src",
    "lint:brand:all": "node scripts/reviewer.js",
    "fix:brand": "node scripts/fix-brand-colors.js src",
    "fix:brand:dry": "node scripts/fix-brand-colors.js src --dry-run",
    "brand:guard": "node tools/brand-guard.cjs",
    "polish:check": "npm run lint:brand && npm run brand:guard",
    "polish:fix": "npm run fix:brand",
    "tokens:guard": "node tools/brand-guard.cjs",
    "sitemap:gen": "node tools/sitemap-gen.cjs",
    "robots:gen": "node tools/robots-gen.cjs",
    "autopilot:migrate": "node scripts/autopilot-migrate.mjs",
    "autopilot:setup": "node scripts/autopilot-ultimate.mjs",
    "autopilot:fix": "npm run format && npm run fix:brand && npm run sitemap:gen && npm run robots:gen && npm run tokens:guard && echo '✅ Auto-fixes complete'",
    "autopilot:check": "npm run lint && npm run typecheck && npm run tokens:guard && npm run build && echo '✅ All checks passed'",
    "autopilot:prepush": "npm run lint && npm run typecheck && npm run tokens:guard && echo '✅ Pre-push checks passed'",
    "clean": "rimraf dist coverage .cache",
    "prepare": "husky install || true",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "css:lint": "stylelint \"**/*.{css,pcss,scss}\"",
    "css:fix": "stylelint \"**/*.{css,pcss,scss}\" --fix",
    "doctor": "npm run format && npm run lint:fix && npm run css:fix && npm run build --if-present",
    "mobile:copy": "pnpm build && pnpm exec cap copy",
    "mobile:sync": "pnpm build && pnpm exec cap sync",
    "mobile:android": "pnpm build && pnpm exec cap open android",
    "mobile:ios": "pnpm build && pnpm exec cap open ios"
  }
}
```

---

## Frontend package.json

**Location**: `/workspaces/fix2/frontend/package.json`

```json
{
  "name": "autopilot-dashboard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.5",
    "zustand": "^4.4.7",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.309.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.11"
  }
}
```

---

## Marketing Site package.json

**Location**: `/workspaces/fix2/marketing-site/package.json`

```json
{
  "name": "marketing-site",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.15.3"
  }
}
```

---

## Key Information

### Root Project (Main Application)

- **Name**: efh-autopilot
- **Version**: 2.0.0
- **Type**: ESM (module)
- **Node Version**: >=20.11.1 <23
- **Package Manager**: pnpm@9.7.0
- **Framework**: React 19.1.1 + Vite 7.1.12
- **UI**: Tailwind CSS 3.4.18
- **Backend**: Supabase 2.57.4
- **Payments**: Stripe 19.1.0
- **Mobile**: Capacitor 7.4.4

### Frontend Dashboard

- **Name**: autopilot-dashboard
- **Version**: 1.0.0
- **Framework**: React 18.2.0 + Vite 5.0.11
- **State**: Zustand 4.4.7
- **Data Fetching**: TanStack Query 5.17.0

### Marketing Site

- **Name**: marketing-site
- **Version**: 0.0.1
- **Framework**: Astro 5.15.3

---

## Notable Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm dev:with-autopilot` - Start dev with autopilot worker
- `pnpm preview` - Preview production build

### Build & Deploy

- `pnpm build` - Production build
- `pnpm ci:build` - CI build
- `pnpm ci:check` - Run all checks

### Quality & Linting

- `pnpm typecheck` - TypeScript type checking
- `pnpm lint` - ESLint
- `pnpm lint:fix` - Auto-fix ESLint issues
- `pnpm format` - Prettier formatting
- `pnpm doctor` - Run all fixes

### Autopilot

- `pnpm autopilot` - Start autopilot worker
- `pnpm autopilot:fix` - Auto-fix all issues
- `pnpm autopilot:check` - Run all checks
- `pnpm autopilot:setup` - Setup autopilot

### Mobile

- `pnpm mobile:android` - Open Android project
- `pnpm mobile:ios` - Open iOS project
- `pnpm mobile:sync` - Sync mobile platforms

---

## Dependencies Summary

### Core Framework

- React 19.1.1 (root) / 18.2.0 (frontend)
- Vite 7.1.12 (root) / 5.0.11 (frontend)
- TypeScript 5.9.3

### Backend & Auth

- Supabase 2.57.4
- Stripe 19.1.0
- Express 5.1.0

### UI & Styling

- Tailwind CSS 3.4.18
- Lucide React 0.545.0
- Recharts 3.3.0

### State Management

- Zustand 5.0.8 (root) / 4.4.7 (frontend)
- React Hook Form 7.64.0
- Zod 4.1.11

### Mobile

- Capacitor 7.4.4
- iOS & Android support

### Testing

- Vitest 3.2.4
- Testing Library 16.3.0
- Playwright (configured)

### Build Tools

- pnpm 9.7.0
- ESLint 9.37.0
- Prettier 3.6.2
- Puppeteer 24.27.0

---

## File Locations

1. **Root**: `/workspaces/fix2/package.json`
2. **Frontend**: `/workspaces/fix2/frontend/package.json`
3. **Marketing**: `/workspaces/fix2/marketing-site/package.json`

---

**Generated**: 2025-11-08  
**Purpose**: Easy sharing of all package.json files for debugging and support
