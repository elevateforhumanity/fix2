import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const routerPath = path.resolve('src/router.jsx');
const overridesPath = path.resolve('scripts/routes.json');

function getRouterPaths() {
  if (!existsSync(routerPath)) return [];
  const routerSrc = readFileSync(routerPath, 'utf8');
  const routeRegex = /<Route\s+[^>]*path=["']([^"']+)["']/g;
  const paths = [];
  const seen = new Set();
  let match;

  while ((match = routeRegex.exec(routerSrc)) !== null) {
    const routePath = match[1];
    if (routePath === '*' || routePath.includes('/:')) continue;
    if (seen.has(routePath)) continue;
    seen.add(routePath);
    paths.push(routePath);
  }

  return paths;
}

function getOverrideMap() {
  if (!existsSync(overridesPath)) return new Map();
  const raw = readFileSync(overridesPath, 'utf8');
  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Failed to parse scripts/routes.json: ${error.message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('scripts/routes.json must export an array.');
  }

  const map = new Map();

  parsed.forEach((entry) => {
    if (typeof entry === 'string') {
      map.set(entry, { path: entry });
      return;
    }

    if (!entry || typeof entry.path !== 'string') {
      throw new Error(
        'Invalid route entry in scripts/routes.json; expected string or object with "path".'
      );
    }

    map.set(entry.path, entry);
  });

  return map;
}

const routerPaths = getRouterPaths();
const overrideMap = getOverrideMap();

const orderedPaths = [...routerPaths];
overrideMap.forEach((entry, routePath) => {
  if (!orderedPaths.includes(routePath)) {
    orderedPaths.push(routePath);
  }
});

export const ROUTES = orderedPaths
  .map((routePath) => {
    const override = overrideMap.get(routePath) || {};
    const sitemap = override.sitemap ?? true;

    return {
      path: routePath,
      changefreq: override.changefreq ?? 'monthly',
      priority: override.priority ?? (routePath === '/' ? 1.0 : 0.5),
      sitemap,
    };
  })
  .filter((route) => route.sitemap !== false);
