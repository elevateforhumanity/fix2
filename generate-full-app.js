const fs = require('fs');
const path = require('path');

// Get all page files
function getAllPages(dir, baseDir = dir) {
  let pages = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith('__')) {
      pages = pages.concat(getAllPages(fullPath, baseDir));
    } else if (file.match(/\.(tsx|jsx)$/) && !file.includes('.test.')) {
      const relativePath = path.relative(baseDir, fullPath);
      const name = relativePath.replace(/\.(tsx|jsx)$/, '').replace(/\//g, '_');
      const importPath = './' + relativePath.replace(/\.(tsx|jsx)$/, '');
      pages.push({ name, importPath, file: relativePath });
    }
  }
  return pages;
}

const pages = getAllPages('src/pages');

// Generate imports
const imports = pages
  .map((p) => `const ${p.name} = lazy(() => import('${p.importPath}'));`)
  .join('\n');

// Generate routes
const routes = pages
  .map((p) => {
    const routePath =
      '/' +
      p.file
        .replace(/\.(tsx|jsx)$/, '')
        .replace(/\\/g, '/')
        .replace(/^auth\//, 'auth/')
        .replace(/^lms\//, 'lms/')
        .replace(/^instructor\//, 'instructor/')
        .replace(/^sisters\//, 'sisters/')
        .toLowerCase()
        .replace(/_/g, '-');

    return `              <Route path="${routePath}" element={<${p.name} />} />`;
  })
  .join('\n');

console.log(`Found ${pages.length} pages`);
console.log('Generating App.tsx...');

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

// Lazy load all pages
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
              
              {/* All Pages */}
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

fs.writeFileSync('src/App-Generated.tsx', appContent);
console.log('✅ Generated src/App-Generated.tsx');
console.log(`✅ ${pages.length} pages routed`);
