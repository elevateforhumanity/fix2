import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get all page files
function getAllPages(dir, baseDir = dir) {
  let pages = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('__')) {
      pages = pages.concat(getAllPages(fullPath, baseDir));
    } else if (
      file.match(/\.(tsx|jsx)$/) &&
      !file.includes('.test.') &&
      !file.includes('.backup')
    ) {
      const relativePath = path.relative(baseDir, fullPath);
      pages.push({ relativePath, fullPath });
    }
  }
  return pages;
}

console.log('🔍 Scanning pages...');
const allPages = getAllPages('src/pages');

// Remove duplicates and create unique names
const pageMap = new Map();
const uniquePages = [];

for (const page of allPages) {
  const baseName = path.basename(
    page.relativePath,
    path.extname(page.relativePath)
  );

  // Skip old/backup files
  if (
    baseName.includes('_old') ||
    baseName.includes('_backup') ||
    baseName.includes('.backup')
  )
    continue;

  // Create unique key based on full path
  const key = page.relativePath.toLowerCase().replace(/\.(tsx|jsx)$/, '');

  if (!pageMap.has(key)) {
    const name = page.relativePath
      .replace(/\.(tsx|jsx)$/, '')
      .replace(/\//g, '_')
      .replace(/-/g, '_')
      .replace(/\./g, '_');

    const importPath =
      './pages/' + page.relativePath.replace(/\.(tsx|jsx)$/, '');

    let routePath =
      '/' +
      page.relativePath
        .replace(/\.(tsx|jsx)$/, '')
        .replace(/\\/g, '/')
        .toLowerCase()
        .replace(/_/g, '-');

    // Special cases
    if (baseName === 'EFHLanding') routePath = '/';

    pageMap.set(key, { name, importPath, routePath, file: page.relativePath });
    uniquePages.push({ name, importPath, routePath, file: page.relativePath });
  }
}

console.log(
  `✅ Found ${uniquePages.length} unique pages (${allPages.length} total files)`
);

// Generate imports
const imports = uniquePages
  .map((p) => `const ${p.name} = lazy(() => import('${p.importPath}'));`)
  .join('\n');

// Generate routes
const routes = uniquePages
  .filter((p) => p.routePath !== '/')
  .map(
    (p) =>
      `              <Route path="${p.routePath}" element={<${p.name} />} />`
  )
  .join('\n');

// Generate sitemap
const sitemapUrls = uniquePages
  .map((p) => {
    const url = p.routePath === '/' ? '' : p.routePath;
    return `  <url>
    <loc>https://elevateforhumanity.org${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;

// Generate robots.txt
const robots = `User-agent: *
Allow: /

Sitemap: https://elevateforhumanity.org/sitemap.xml
Sitemap: https://elevateforhumanity.org/sitemap-complete.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /_netlify/
`;

// Create App.tsx
const appContent = `import { Component, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';

// Error Boundary
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-surface">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-brand-text mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-brand-text-muted mb-6">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-info text-white px-6 py-2 rounded-lg hover:bg-brand-info-hover transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
        <p className="mt-2 text-brand-text-muted">Loading...</p>
      </div>
    </div>
  );
}

// Lazy load all ${uniquePages.length} pages
${imports}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SiteLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<EFHLanding />} />
              
              {/* All ${uniquePages.length} Pages */}
${routes}
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
`;

// Write files
fs.writeFileSync('src/App.tsx', appContent);
fs.writeFileSync('public/sitemap-complete.xml', sitemap);
fs.writeFileSync('public/robots.txt', robots);

console.log('✅ Generated src/App.tsx with ALL routes');
console.log(`✅ Generated sitemap with ${uniquePages.length} URLs`);
console.log('✅ Generated robots.txt');
console.log(`\n📊 Total: ${uniquePages.length} pages fully routed and indexed`);
