# Release Artifacts Management

This document provides guidance on managing large binary artifacts and bundles for the Elevate for Humanity project.

## Problem Statement

The repository previously contained several large bundle files committed directly:
- `deploy.zip` (6.0 MB)
- `deployment-support-bundle.tar.gz` (1.4 MB)
- `COMPLETE_AUTOPILOT_BUNDLE.tar.gz` (47 KB)
- `COMPLETE_AUTOPILOT_BUNDLE.zip` (64 KB)
- `COMPLETE_AUTOPILOT_WITH_EXTENSIONS.tar.gz` (54 KB)
- `COMPLETE_AUTOPILOT_WITH_EXTENSIONS.zip` (72 KB)
- `CERTIFICATION_APPLICATIONS_BUNDLE.tar.gz` (24 KB)
- `CERTIFICATION_APPLICATIONS_BUNDLE.zip` (37 KB)
- Multiple deployment bundles with timestamps

These files add unnecessary bloat to the repository, slow down clones, and don't benefit from version control.

## Solution: GitHub Releases

Use GitHub Releases to distribute binary artifacts. This provides:
- ✅ Separate storage from repository
- ✅ Direct download links
- ✅ Release notes and changelogs
- ✅ Versioning without repository bloat
- ✅ Asset download statistics
- ✅ Easier distribution to users

## Migration Guide

### Step 1: Identify Artifacts to Publish

Current artifacts that should be moved to releases:

#### Deployment Bundles
- `deploy.zip` - Full deployment package
- `deployment-support-bundle.tar.gz` - Support and diagnostic bundle
- `deployment-bundle-*.tar.gz` - Timestamped deployment snapshots

#### Autopilot Bundles
- `COMPLETE_AUTOPILOT_BUNDLE.tar.gz` / `.zip` - Complete autopilot system
- `COMPLETE_AUTOPILOT_WITH_EXTENSIONS.tar.gz` / `.zip` - Extended version
- `CERTIFICATION_APPLICATIONS_BUNDLE.tar.gz` / `.zip` - Application templates

#### Support Bundles
- `support-bundle.tar.gz`
- `support-bundle-*.tar.gz` - Timestamped support bundles

### Step 2: Create a Release

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Authenticate
gh auth login

# Create a release (replace v1.0.0 with your version)
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes "Release notes here"

# Upload artifacts to the release
gh release upload v1.0.0 \
  deploy.zip \
  deployment-support-bundle.tar.gz \
  COMPLETE_AUTOPILOT_BUNDLE.tar.gz \
  COMPLETE_AUTOPILOT_BUNDLE.zip
```

### Step 3: Update Documentation

After publishing to releases, update any references:

```markdown
<!-- Before -->
Download the deployment bundle from `deploy.zip`

<!-- After -->
Download the deployment bundle from [Releases](https://github.com/elevateforhumanity/fix2/releases/latest)
```

### Step 4: Remove from Repository

After verifying the release:

```bash
# Remove the large files
git rm deploy.zip
git rm *.tar.gz
git rm *-bundle*.zip
git rm support-bundle*.tar.gz

# Commit
git commit -m "chore: Move large artifacts to GitHub Releases

Binary artifacts have been published to GitHub Releases for easier
distribution and to reduce repository size.

Download from: https://github.com/elevateforhumanity/fix2/releases"

# Push
git push origin main
```

### Step 5: Update .gitignore

Already configured in `.gitignore`:

```gitignore
# Large generated bundles and archives (use GitHub Releases instead)
*.tar.gz
*.zip
!.github/**/*.zip
!.github/**/*.tar.gz
```

This prevents future accidental commits.

## Creating Releases via GitHub Actions

Automate release creation with a workflow:

```yaml
name: Create Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build artifacts
        run: |
          # Your build commands here
          npm run build
          tar -czf deployment-bundle.tar.gz dist/
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            deployment-bundle.tar.gz
            COMPLETE_AUTOPILOT_BUNDLE.tar.gz
          body: |
            ## What's Changed
            - See CHANGELOG.md for details
            
            ## Installation
            Download the appropriate bundle for your platform.
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Versioning Strategy

Use Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR**: Breaking changes, major features
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, security patches

Examples:
- `v1.0.0` - Initial stable release
- `v1.1.0` - New features added
- `v1.1.1` - Bug fixes
- `v2.0.0` - Breaking changes

### Tagging Releases

```bash
# Create an annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag
git push origin v1.0.0

# Or push all tags
git push --tags
```

## Bundle Naming Conventions

Use clear, descriptive names:

```
# Good
deployment-bundle-v1.0.0.tar.gz
autopilot-complete-v2.1.0.zip
support-diagnostics-v1.0.0.tar.gz

# Avoid
bundle.zip
package.tar.gz
files-20241109.tar.gz
```

Include:
1. **Purpose**: What the bundle contains
2. **Version**: SemVer tag
3. **Extension**: `.tar.gz` or `.zip`

## What to Include in Bundles

### Deployment Bundle
```
deployment-bundle/
├── dist/                  # Built application
├── migrations/            # Database migrations
├── config/               # Configuration templates
├── scripts/              # Deployment scripts
└── README.md             # Installation instructions
```

### Autopilot Bundle
```
autopilot-bundle/
├── ACTIVATE_ALL_AUTOPILOT.sh
├── scripts/
│   ├── autopilot-health.js
│   └── close-autopilot-issues.sh
├── AUTOPILOT_SYSTEM/
│   ├── README.md
│   ├── status.json
│   └── INCIDENT_GUIDE.md
├── .env.example
└── README.md
```

### Support Bundle
```
support-bundle/
├── logs/                 # Recent log files
├── config/              # Current configuration
├── status.json          # System status
└── diagnostic.txt       # Diagnostic information
```

## Download Links

After migration, artifacts will be available at:

**Latest Release**: https://github.com/elevateforhumanity/fix2/releases/latest

**Specific Versions**:
- v1.0.0: https://github.com/elevateforhumanity/fix2/releases/tag/v1.0.0
- v1.1.0: https://github.com/elevateforhumanity/fix2/releases/tag/v1.1.0

**Direct Asset Links** (replace `TAG` and `ASSET` as needed):
```
https://github.com/elevateforhumanity/fix2/releases/download/TAG/ASSET
```

Example:
```
https://github.com/elevateforhumanity/fix2/releases/download/v1.0.0/deployment-bundle.tar.gz
```

## Generating Bundles Programmatically

### Shell Script

```bash
#!/bin/bash
# create-release-bundle.sh

VERSION="${1:-v1.0.0}"
OUTPUT_DIR="release-bundles"

echo "Creating release bundle for $VERSION..."

mkdir -p "$OUTPUT_DIR"

# Create deployment bundle
tar -czf "$OUTPUT_DIR/deployment-bundle-$VERSION.tar.gz" \
  dist/ \
  migrations/ \
  scripts/ \
  README.md

# Create autopilot bundle
tar -czf "$OUTPUT_DIR/autopilot-bundle-$VERSION.tar.gz" \
  ACTIVATE_ALL_AUTOPILOT.sh \
  scripts/autopilot-*.js \
  scripts/close-autopilot-issues.sh \
  AUTOPILOT_SYSTEM/ \
  .env.example

echo "✅ Bundles created in $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR"
```

### Node.js Script

```javascript
// create-bundle.js
import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

function createBundle(name, files, outputPath) {
  const output = fs.createWriteStream(outputPath);
  const archive = archiver('tar', { gzip: true });

  output.on('close', () => {
    console.log(`✅ ${name}: ${archive.pointer()} bytes`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  files.forEach(file => {
    if (fs.statSync(file).isDirectory()) {
      archive.directory(file, path.basename(file));
    } else {
      archive.file(file, { name: path.basename(file) });
    }
  });

  archive.finalize();
}

// Usage
const version = process.argv[2] || 'v1.0.0';

createBundle(
  'Deployment Bundle',
  ['dist', 'migrations', 'README.md'],
  `release-bundles/deployment-${version}.tar.gz`
);
```

## Archive Formats

### Choosing Between .tar.gz and .zip

**Use .tar.gz when:**
- Targeting Unix/Linux users
- Preserving file permissions
- Better compression needed
- Multi-user collaboration

**Use .zip when:**
- Targeting Windows users
- Wider compatibility needed
- Single-file convenience

**Provide both** for maximum compatibility.

## SHA256 Checksums

Include checksums for security:

```bash
# Generate checksums
sha256sum *.tar.gz *.zip > SHA256SUMS.txt

# Upload with release
gh release upload v1.0.0 SHA256SUMS.txt
```

Users can verify:
```bash
sha256sum -c SHA256SUMS.txt
```

## Changelog

Maintain `CHANGELOG.md` for release notes:

```markdown
## [1.0.0] - 2024-11-09

### Added
- Secure autopilot activation script
- Health monitoring system
- Lock file mechanism

### Changed
- Moved bundles to GitHub Releases
- Updated environment variable handling

### Fixed
- Infinite loop issue in autopilot scripts

### Security
- Removed hard-coded secrets
- Added secret detection ESLint rule
```

## Best Practices

1. **Never commit large binaries** to repository
2. **Use meaningful version numbers** (SemVer)
3. **Include release notes** with every release
4. **Provide checksums** for verification
5. **Test downloads** before announcing
6. **Archive old releases** but keep them available
7. **Document breaking changes** clearly
8. **Automate** bundle creation where possible

## Migration Status

- [x] Documented bundle management strategy
- [x] Updated `.gitignore` to prevent future commits
- [ ] Create initial GitHub Release with existing bundles
- [ ] Remove large files from repository
- [ ] Update documentation links
- [ ] Add automated release workflow (optional)

## Resources

- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Semantic Versioning](https://semver.org/)
- [GitHub CLI Manual](https://cli.github.com/manual/)

---

**Last Updated**: 2024-11-09
**Status**: Documentation complete, migration pending
