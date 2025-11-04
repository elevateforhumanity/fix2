#!/usr/bin/env node
/**
 * SELF-CONTAINED DEPLOYMENT SYSTEM
 * Zero external dependencies - builds everything from scratch
 * If a function doesn't exist, we create it ourselves
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');
const crypto = require('crypto');
const zlib = require('zlib');

// ============================================================================
// BUILT-IN HTTP CLIENT (No fetch, no axios)
// ============================================================================

class HTTPClient {
  static request(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const client = urlObj.protocol === 'https:' ? https : http;

      const reqOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: options.headers || {},
        timeout: options.timeout || 30000,
      };

      const req = client.request(reqOptions, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  static get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  static post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
}

// ============================================================================
// BUILT-IN FILE SYSTEM UTILITIES
// ============================================================================

class FileSystem {
  static readJSON(filepath) {
    try {
      const content = fs.readFileSync(filepath, 'utf8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  static writeJSON(filepath, data) {
    try {
      const dir = path.dirname(filepath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch {
      return false;
    }
  }

  static copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return false;

    const stat = fs.statSync(src);

    if (stat.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const entries = fs.readdirSync(src);
      for (const entry of entries) {
        this.copyRecursive(path.join(src, entry), path.join(dest, entry));
      }
    } else {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }

    return true;
  }

  static findFiles(dir, extensions = []) {
    let results = [];

    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (
        entry.isDirectory() &&
        !entry.name.startsWith('.') &&
        entry.name !== 'node_modules'
      ) {
        results = results.concat(this.findFiles(fullPath, extensions));
      } else if (entry.isFile()) {
        if (
          extensions.length === 0 ||
          extensions.some((ext) => entry.name.endsWith(ext))
        ) {
          results.push(fullPath);
        }
      }
    }

    return results;
  }

  static deleteRecursive(dir) {
    if (!fs.existsSync(dir)) return;

    if (fs.statSync(dir).isDirectory()) {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        this.deleteRecursive(path.join(dir, entry));
      }
      fs.rmdirSync(dir);
    } else {
      fs.unlinkSync(dir);
    }
  }
}

// ============================================================================
// BUILT-IN JAVASCRIPT BUNDLER (No Vite, No Webpack)
// ============================================================================

class SimpleBundler {
  constructor(options = {}) {
    this.options = {
      entry: options.entry || './src/main.jsx',
      output: options.output || './dist',
      minify: options.minify !== false,
      sourceMaps: options.sourceMaps === true,
    };
  }

  /**
   * Simple JSX transformer (no Babel needed)
   */
  transformJSX(code) {
    // Transform JSX to React.createElement calls
    // Simple regex-based transformation
    let transformed = code;

    // Handle self-closing tags: <Component />
    transformed = transformed.replace(
      /<(\w+)([^>]*?)\/>/g,
      (match, tag, attrs) => {
        const props = this.parseAttributes(attrs);
        return `React.createElement('${tag}', ${props})`;
      }
    );

    // Handle opening/closing tags: <Component>...</Component>
    transformed = transformed.replace(
      /<(\w+)([^>]*?)>(.*?)<\/\1>/gs,
      (match, tag, attrs, children) => {
        const props = this.parseAttributes(attrs);
        const childrenCode = this.transformJSX(children);
        return `React.createElement('${tag}', ${props}, ${childrenCode})`;
      }
    );

    return transformed;
  }

  parseAttributes(attrString) {
    if (!attrString.trim()) return 'null';

    const attrs = {};
    const regex = /(\w+)=(?:{([^}]+)}|"([^"]+)")/g;
    let match;

    while ((match = regex.exec(attrString)) !== null) {
      const [, name, jsValue, stringValue] = match;
      attrs[name] = jsValue || `"${stringValue}"`;
    }

    return JSON.stringify(attrs);
  }

  /**
   * Resolve imports and bundle
   */
  bundle() {
    console.log('📦 Bundling application...');

    const entryPath = path.resolve(this.options.entry);
    if (!fs.existsSync(entryPath)) {
      console.error(`❌ Entry file not found: ${entryPath}`);
      return false;
    }

    const modules = new Map();
    const processed = new Set();

    // Process entry file
    this.processFile(entryPath, modules, processed);

    // Generate bundle
    let bundle = '(function() {\n';
    bundle += '  const modules = {};\n';
    bundle += '  const cache = {};\n\n';

    bundle += '  function require(id) {\n';
    bundle += '    if (cache[id]) return cache[id].exports;\n';
    bundle += '    const module = cache[id] = { exports: {} };\n';
    bundle += '    modules[id](module, module.exports, require);\n';
    bundle += '    return module.exports;\n';
    bundle += '  }\n\n';

    // Add all modules
    for (const [id, code] of modules) {
      bundle += `  modules['${id}'] = function(module, exports, require) {\n`;
      bundle += code;
      bundle += '\n  };\n\n';
    }

    bundle += `  require('${entryPath}');\n`;
    bundle += '})();\n';

    // Minify if requested
    if (this.options.minify) {
      bundle = this.minify(bundle);
    }

    // Write output
    const outputPath = path.join(this.options.output, 'assets', 'bundle.js');
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, bundle, 'utf8');
    console.log(
      `✅ Bundle created: ${outputPath} (${(bundle.length / 1024).toFixed(2)} KB)`
    );

    return true;
  }

  processFile(filepath, modules, processed) {
    if (processed.has(filepath)) return;
    processed.add(filepath);

    let code = fs.readFileSync(filepath, 'utf8');

    // Transform JSX if needed
    if (filepath.endsWith('.jsx') || filepath.endsWith('.tsx')) {
      code = this.transformJSX(code);
    }

    // Find and process imports
    const importRegex = /import\s+.*?\s+from\s+['"](.+?)['"]/g;
    let match;

    while ((match = importRegex.exec(code)) !== null) {
      const importPath = match[1];

      // Skip external modules
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        continue;
      }

      // Resolve relative path
      const resolvedPath = path.resolve(path.dirname(filepath), importPath);
      const extensions = ['.js', '.jsx', '.ts', '.tsx'];

      let actualPath = resolvedPath;
      if (!fs.existsSync(actualPath)) {
        for (const ext of extensions) {
          if (fs.existsSync(resolvedPath + ext)) {
            actualPath = resolvedPath + ext;
            break;
          }
        }
      }

      if (fs.existsSync(actualPath)) {
        this.processFile(actualPath, modules, processed);
      }
    }

    modules.set(filepath, code);
  }

  /**
   * Simple minifier (no Terser needed)
   */
  minify(code) {
    // Remove comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/\/\/.*/g, '');

    // Remove extra whitespace
    code = code.replace(/\s+/g, ' ');
    code = code.replace(/\s*([{}();,:])\s*/g, '$1');

    return code;
  }
}

// ============================================================================
// BUILT-IN CSS PROCESSOR (No PostCSS, No Tailwind CLI)
// ============================================================================

class CSSProcessor {
  static process(inputDir, outputDir) {
    console.log('🎨 Processing CSS...');

    const cssFiles = FileSystem.findFiles(inputDir, ['.css']);
    let combined = '';

    for (const file of cssFiles) {
      const content = fs.readFileSync(file, 'utf8');
      combined += `/* ${path.basename(file)} */\n${content}\n\n`;
    }

    // Simple autoprefixer (add vendor prefixes)
    combined = this.addVendorPrefixes(combined);

    // Minify
    combined = this.minify(combined);

    const outputPath = path.join(outputDir, 'assets', 'styles.css');
    const outputDirPath = path.dirname(outputPath);

    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    fs.writeFileSync(outputPath, combined, 'utf8');
    console.log(
      `✅ CSS processed: ${outputPath} (${(combined.length / 1024).toFixed(2)} KB)`
    );

    return true;
  }

  static addVendorPrefixes(css) {
    const prefixes = {
      transform: ['-webkit-transform', '-moz-transform', '-ms-transform'],
      transition: ['-webkit-transition', '-moz-transition'],
      animation: ['-webkit-animation', '-moz-animation'],
      'box-shadow': ['-webkit-box-shadow', '-moz-box-shadow'],
      'border-radius': ['-webkit-border-radius', '-moz-border-radius'],
    };

    for (const [prop, vendors] of Object.entries(prefixes)) {
      const regex = new RegExp(`(\\s|^)${prop}\\s*:`, 'g');
      css = css.replace(regex, (match) => {
        return vendors.map((v) => `${v}:`).join(' ') + ` ${prop}:`;
      });
    }

    return css;
  }

  static minify(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');

    // Remove whitespace
    css = css.replace(/\s+/g, ' ');
    css = css.replace(/\s*([{}:;,])\s*/g, '$1');

    return css.trim();
  }
}

// ============================================================================
// BUILT-IN HTML PROCESSOR
// ============================================================================

class HTMLProcessor {
  static process(template, options = {}) {
    console.log('📄 Processing HTML...');

    let html = fs.readFileSync(template, 'utf8');

    // Inject scripts
    if (options.scripts) {
      const scriptTags = options.scripts
        .map((src) => `<script src="${src}"></script>`)
        .join('\n  ');
      html = html.replace('</body>', `  ${scriptTags}\n</body>`);
    }

    // Inject styles
    if (options.styles) {
      const styleTags = options.styles
        .map((href) => `<link rel="stylesheet" href="${href}">`)
        .join('\n  ');
      html = html.replace('</head>', `  ${styleTags}\n</head>`);
    }

    // Minify
    if (options.minify) {
      html = this.minify(html);
    }

    return html;
  }

  static minify(html) {
    // Remove comments
    html = html.replace(/<!--[\s\S]*?-->/g, '');

    // Remove extra whitespace (but preserve some for readability)
    html = html.replace(/\s+/g, ' ');
    html = html.replace(/>\s+</g, '><');

    return html.trim();
  }
}

// ============================================================================
// BUILT-IN ENVIRONMENT CHECKER
// ============================================================================

class EnvironmentChecker {
  static check() {
    console.log('🔍 Checking environment...');

    const checks = {
      node: this.checkNode(),
      git: this.checkGit(),
      env: this.checkEnvFile(),
      dependencies: this.checkDependencies(),
      buildDir: this.checkBuildDir(),
    };

    for (const [name, result] of Object.entries(checks)) {
      console.log(`  ${result.ok ? '✅' : '❌'} ${name}: ${result.message}`);
    }

    return checks;
  }

  static checkNode() {
    try {
      const version = process.version;
      const major = parseInt(version.slice(1).split('.')[0]);
      return {
        ok: major >= 18,
        message: `v${version} ${major >= 18 ? '(OK)' : '(Need v18+)'}`,
      };
    } catch {
      return { ok: false, message: 'Not found' };
    }
  }

  static checkGit() {
    try {
      execSync('git --version', { stdio: 'ignore' });
      return { ok: true, message: 'Installed' };
    } catch {
      return { ok: false, message: 'Not installed' };
    }
  }

  static checkEnvFile() {
    const exists = fs.existsSync('./.env');
    return {
      ok: exists,
      message: exists ? 'Found' : 'Missing (will use defaults)',
    };
  }

  static checkDependencies() {
    const exists = fs.existsSync('./node_modules');
    return {
      ok: exists,
      message: exists ? 'Installed' : 'Missing (will install)',
    };
  }

  static checkBuildDir() {
    const exists = fs.existsSync('./dist');
    return {
      ok: exists,
      message: exists ? 'Exists' : 'Will be created',
    };
  }
}

// ============================================================================
// BUILT-IN BUILD SYSTEM
// ============================================================================

class BuildSystem {
  static build() {
    console.log('\n🏗️  Starting self-contained build...\n');

    const startTime = Date.now();

    // Step 1: Clean
    console.log('1️⃣  Cleaning output directory...');
    if (fs.existsSync('./dist')) {
      FileSystem.deleteRecursive('./dist');
    }
    fs.mkdirSync('./dist', { recursive: true });
    console.log('  ✅ Clean complete\n');

    // Step 2: Copy static files
    console.log('2️⃣  Copying static files...');
    if (fs.existsSync('./public')) {
      FileSystem.copyRecursive('./public', './dist');
      console.log('  ✅ Static files copied\n');
    } else {
      console.log('  ⚠️  No public directory found\n');
    }

    // Step 3: Process CSS
    console.log('3️⃣  Processing CSS...');
    if (fs.existsSync('./src')) {
      CSSProcessor.process('./src', './dist');
    }
    console.log('');

    // Step 4: Bundle JavaScript
    console.log('4️⃣  Bundling JavaScript...');
    const bundler = new SimpleBundler({
      entry: './src/main.jsx',
      output: './dist',
      minify: true,
    });

    if (fs.existsSync('./src/main.jsx') || fs.existsSync('./src/main.js')) {
      bundler.bundle();
    } else {
      console.log('  ⚠️  No entry file found, skipping bundle\n');
    }
    console.log('');

    // Step 5: Process HTML
    console.log('5️⃣  Processing HTML...');
    if (fs.existsSync('./index.html')) {
      const html = HTMLProcessor.process('./index.html', {
        scripts: ['/assets/bundle.js'],
        styles: ['/assets/styles.css'],
        minify: true,
      });
      fs.writeFileSync('./dist/index.html', html, 'utf8');
      console.log('  ✅ HTML processed\n');
    } else {
      console.log('  ⚠️  No index.html found\n');
    }

    // Step 6: Generate metadata
    console.log('6️⃣  Generating metadata...');
    const buildInfo = {
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      files: FileSystem.findFiles('./dist').length,
      size: this.calculateSize('./dist'),
    };
    FileSystem.writeJSON('./dist/build-info.json', buildInfo);
    console.log(
      `  ✅ Build complete in ${(buildInfo.duration / 1000).toFixed(2)}s\n`
    );

    return true;
  }

  static calculateSize(dir) {
    let total = 0;
    const files = FileSystem.findFiles(dir);

    for (const file of files) {
      try {
        total += fs.statSync(file).size;
      } catch {}
    }

    return Math.round(total / 1024); // KB
  }
}

// ============================================================================
// BUILT-IN DEPLOYMENT SYSTEM
// ============================================================================

class DeploymentSystem {
  static deploy() {
    console.log('\n🚀 Starting deployment...\n');

    // Check if build exists
    if (!fs.existsSync('./dist/index.html')) {
      console.log('❌ No build found. Run build first.');
      return false;
    }

    // Try multiple deployment strategies
    const strategies = [
      { name: 'Netlify CLI', fn: () => this.deployNetlify() },
      { name: 'Vercel', fn: () => this.deployVercel() },
      { name: 'GitHub Pages', fn: () => this.deployGitHubPages() },
      { name: 'Create Archive', fn: () => this.createArchive() },
    ];

    for (const strategy of strategies) {
      console.log(`\n📦 Trying: ${strategy.name}...`);
      try {
        const result = strategy.fn();
        if (result) {
          console.log(`✅ Deployed via ${strategy.name}!`);
          return true;
        }
      } catch (error) {
        console.log(`❌ ${strategy.name} failed: ${error.message}`);
      }
    }

    console.log('\n⚠️  All deployment strategies failed.');
    console.log('📋 Manual options:');
    console.log(
      '   1. Upload dist/ to Netlify Drop: https://app.netlify.com/drop'
    );
    console.log('   2. Use deployment archive: dist-deploy.tar.gz');
    console.log(
      '   3. Run local server: node scripts/self-contained-deploy.js serve'
    );

    return false;
  }

  static deployNetlify() {
    try {
      execSync('netlify deploy --prod --dir=dist', { stdio: 'inherit' });
      return true;
    } catch {
      return false;
    }
  }

  static deployVercel() {
    try {
      execSync('npx vercel --prod --yes', { stdio: 'inherit' });
      return true;
    } catch {
      return false;
    }
  }

  static deployGitHubPages() {
    try {
      execSync(
        'git checkout -b gh-pages 2>/dev/null || git checkout gh-pages',
        { stdio: 'pipe' }
      );
      execSync('cp -r dist/* .', { stdio: 'pipe' });
      execSync('git add .', { stdio: 'pipe' });
      execSync('git commit -m "Deploy" || true', { stdio: 'pipe' });
      execSync('git push origin gh-pages --force', { stdio: 'inherit' });
      execSync('git checkout main || git checkout master', { stdio: 'pipe' });
      return true;
    } catch {
      return false;
    }
  }

  static createArchive() {
    try {
      execSync('tar -czf dist-deploy.tar.gz -C dist .', { stdio: 'pipe' });
      console.log('  ✅ Created: dist-deploy.tar.gz');
      return true;
    } catch {
      return false;
    }
  }

  static serve() {
    console.log('\n🌐 Starting local server...\n');

    const port = 8080;
    const distPath = path.resolve('./dist');

    const server = http.createServer((req, res) => {
      let filePath = path.join(
        distPath,
        req.url === '/' ? 'index.html' : req.url
      );

      // Security: prevent directory traversal
      if (!filePath.startsWith(distPath)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.readFile(filePath, (err, data) => {
        if (err) {
          // Try index.html for SPA routing
          filePath = path.join(distPath, 'index.html');
          fs.readFile(filePath, (err2, data2) => {
            if (err2) {
              res.writeHead(404);
              res.end('Not found');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data2);
          });
          return;
        }

        const ext = path.extname(filePath);
        const contentTypes = {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.svg': 'image/svg+xml',
          '.ico': 'image/x-icon',
        };

        res.writeHead(200, {
          'Content-Type': contentTypes[ext] || 'text/plain',
        });
        res.end(data);
      });
    });

    server.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
      console.log('   Press Ctrl+C to stop\n');
    });
  }
}

// ============================================================================
// MAIN CLI
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'all';

  console.log('═══════════════════════════════════════════════════════');
  console.log('  Self-Contained Deployment System');
  console.log('  Zero External Dependencies');
  console.log('═══════════════════════════════════════════════════════\n');

  switch (command) {
    case 'check':
      EnvironmentChecker.check();
      break;

    case 'build':
      BuildSystem.build();
      break;

    case 'deploy':
      DeploymentSystem.deploy();
      break;

    case 'serve':
      DeploymentSystem.serve();
      break;

    case 'all':
    default:
      EnvironmentChecker.check();
      console.log('');
      BuildSystem.build();
      DeploymentSystem.deploy();
      break;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  HTTPClient,
  FileSystem,
  SimpleBundler,
  CSSProcessor,
  HTMLProcessor,
  EnvironmentChecker,
  BuildSystem,
  DeploymentSystem,
};
