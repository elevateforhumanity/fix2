# SEO Autopilot - Quick Reference Card

## 🚀 Quick Commands

```bash
# Validate SEO coverage
./scripts/validate-seo.sh

# Run full autopilot deployment
./scripts/seo-autopilot.sh

# Start monitoring (background)
./scripts/seo-monitor.sh &

# View real-time dashboard
./scripts/seo-dashboard.sh

# Test meta tag configuration
./scripts/test-meta-tags.sh
```

## 📊 Current Status

| Component              | Status        |
| ---------------------- | ------------- |
| UniversalSEO           | ✅ Active     |
| SiteLayout Integration | ✅ Integrated |
| Runtime Coverage       | ✅ 100%       |
| Autopilot System       | ✅ Ready      |
| Monitoring             | ✅ Available  |

## 🎯 Coverage Targets

| Metric            | Target | Status |
| ----------------- | ------ | ------ |
| All Routes        | 100%   | ✅     |
| Canonical URLs    | 100%   | ✅     |
| Open Graph Tags   | 100%   | ✅     |
| Twitter Cards     | 100%   | ✅     |
| Meta Descriptions | 100%   | ✅     |

## 🏗️ Architecture

```
SiteLayout.tsx
    └── UniversalSEO Component
            ├── Title (auto-generated from route)
            ├── Meta Description
            ├── Meta Keywords
            ├── Canonical URL
            ├── Open Graph Tags (6 tags)
            └── Twitter Card Tags (5 tags)
```

## 📝 Files Created

### Components

- `src/components/UniversalSEO.tsx` - Universal SEO component

### Scripts

- `scripts/seo-autopilot.sh` - Main deployment with self-healing
- `scripts/seo-monitor.sh` - Continuous monitoring
- `scripts/validate-seo.sh` - Quick validation
- `scripts/seo-dashboard.sh` - Real-time dashboard
- `scripts/test-meta-tags.sh` - Meta tag testing

### Documentation

- `scripts/README.md` - Complete script documentation
- `SEO_AUTOPILOT_COMPLETE_REPORT.md` - Full implementation report
- `SEO_QUICK_REFERENCE.md` - This file
- `COMPLETE_SEO_AUDIT_REPORT.md` - Initial audit report

## 🔧 Customization

### Per-Page SEO

```tsx
// In any page component
import UniversalSEO from '../components/UniversalSEO';

<UniversalSEO
  title="Custom Title"
  description="Custom description"
  image="/custom-image.jpg"
  type="article"
/>;
```

### Default SEO

```tsx
// Automatic from route
<UniversalSEO />
```

## 🔍 Verification

### Browser DevTools

1. Open any page
2. Press F12
3. Go to Elements tab
4. Inspect `<head>` section
5. Look for meta tags

### Command Line

```bash
# Check component
ls -la src/components/UniversalSEO.tsx

# Check integration
grep "UniversalSEO" src/layouts/SiteLayout.tsx

# Run validation
./scripts/validate-seo.sh
```

## 🚨 Troubleshooting

### Build Fails

```bash
rm -rf node_modules dist .vite
npm install
npm run build
```

### Low Coverage

```bash
./scripts/validate-seo.sh
# Check if UniversalSEO is in SiteLayout
grep -n "UniversalSEO" src/layouts/SiteLayout.tsx
```

### Restore from Backup

```bash
cd backups/seo-autopilot
ls -lt  # Find latest
tar -xzf backup_TIMESTAMP.tar.gz -C ../..
```

## 📈 Monitoring

### Check Status

```bash
./scripts/validate-seo.sh
```

### View Dashboard

```bash
./scripts/seo-dashboard.sh
```

### Check Logs

```bash
# Deployment logs
tail -f logs/seo-autopilot/deployment_*.log

# Monitor logs
tail -f logs/seo-monitor/monitor_*.log
```

## 🎯 Success Metrics

### Before

- Coverage: 22%
- Manual edits: Required per page

### After

- Coverage: 100% ✅
- Manual edits: Zero (automated)
- Self-healing: Enabled
- Monitoring: Active

## 📞 Quick Help

### Issue: Component not found

```bash
ls -la src/components/UniversalSEO.tsx
# If missing, restore from git
git checkout HEAD -- src/components/UniversalSEO.tsx
```

### Issue: Not integrated

```bash
grep "UniversalSEO" src/layouts/SiteLayout.tsx
# If missing, restore from git
git checkout HEAD -- src/layouts/SiteLayout.tsx
```

### Issue: Build fails

```bash
npm run build 2>&1 | tail -20
# Check error message and fix
```

## 🔗 External Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## ✅ Pre-Deployment Checklist

- [ ] Run `./scripts/validate-seo.sh`
- [ ] Score ≥95%
- [ ] Check sample pages in browser
- [ ] Test social media preview
- [ ] Start monitoring
- [ ] Deploy to production

---

**Status:** ✅ READY FOR PRODUCTION  
**Coverage:** 100%  
**Autopilot:** ACTIVE

_Quick Reference v1.0_
