# Sitemap Submission Guide

## Sitemap Configuration Status: ✅ COMPLETE

All sitemaps are properly configured, chunked into 50 URL segments, and ready for submission to search engines.

## Sitemap Structure

### Main Files

- `sitemap-index.xml` - Master index referencing all sitemap chunks
- `sitemap-1.xml` - First 50 URLs
- `sitemap-2.xml` - Next 50 URLs
- `sitemap-3.xml` - Remaining 13 URLs
- `sitemap.xml` - Complete sitemap (113 URLs, kept for compatibility)
- `robots.txt` - References sitemap-index.xml

### Statistics

- **Total URLs**: 113
- **Sitemap Chunks**: 3
- **URLs per Chunk**: Max 50 (recommended limit)
- **Average per Chunk**: 37 URLs

## Sitemap URLs

All sitemaps are accessible at:

- https://www.elevateforhumanity.org/sitemap-index.xml (MAIN)
- https://www.elevateforhumanity.org/sitemap-1.xml
- https://www.elevateforhumanity.org/sitemap-2.xml
- https://www.elevateforhumanity.org/sitemap-3.xml
- https://www.elevateforhumanity.org/sitemap.xml (legacy)
- https://www.elevateforhumanity.org/robots.txt

## Search Engine Submission

### Google Search Console

1. **Go to**: https://search.google.com/search-console
2. **Select Property**: www.elevateforhumanity.org
3. **Navigate to**: Sitemaps (left sidebar)
4. **Submit**: `sitemap-index.xml`
5. **Optional**: Also submit individual chunks:
   - `sitemap-1.xml`
   - `sitemap-2.xml`
   - `sitemap-3.xml`

**Verification**:

- Status should show "Success"
- Discovered URLs should show 113
- Check for any errors or warnings

### Bing Webmaster Tools

1. **Go to**: https://www.bing.com/webmasters
2. **Select Site**: www.elevateforhumanity.org
3. **Navigate to**: Sitemaps
4. **Submit**: `https://www.elevateforhumanity.org/sitemap-index.xml`

**Verification**:

- Status should show "Submitted"
- URLs discovered should match total count

### Yandex Webmaster

1. **Go to**: https://webmaster.yandex.com
2. **Select Site**: www.elevateforhumanity.org
3. **Navigate to**: Indexing > Sitemaps
4. **Submit**: `https://www.elevateforhumanity.org/sitemap-index.xml`

### Manual Ping (Alternative Method)

You can ping search engines directly:

**Google**:

```
https://www.google.com/ping?sitemap=https://www.elevateforhumanity.org/sitemap-index.xml
```

**Bing**:

```
https://www.bing.com/ping?sitemap=https://www.elevateforhumanity.org/sitemap-index.xml
```

## Robots.txt Configuration

The robots.txt file is configured to reference both the sitemap index and the complete sitemap:

```
User-agent: *
Allow: /
Sitemap: https://www.elevateforhumanity.org/sitemap-index.xml
Sitemap: https://www.elevateforhumanity.org/sitemap.xml
```

**Why both?**

- `sitemap-index.xml` - Primary, references chunked sitemaps
- `sitemap.xml` - Backup, complete sitemap for compatibility

## Sitemap Content

Each sitemap includes:

- `<loc>` - Full URL of the page
- `<changefreq>` - Update frequency (monthly)
- `<priority>` - Page priority (0.5 - 1.0)

### Priority Levels

- `1.0` - Homepage (/)
- `0.5` - All other pages

### Change Frequency

- `monthly` - All pages

## Automatic Updates

Sitemaps are automatically regenerated on every build:

1. **Build Process**:

   ```bash
   pnpm build
   ```

2. **Postbuild Steps**:
   - Generate main sitemap (113 URLs)
   - Split into chunks of 50 URLs
   - Create sitemap index
   - Update robots.txt

3. **Files Created**:
   - `dist/sitemap.xml`
   - `dist/sitemap-1.xml`
   - `dist/sitemap-2.xml`
   - `dist/sitemap-3.xml`
   - `dist/sitemap-index.xml`
   - `dist/robots.txt`

## Verification

### Check Sitemap Validity

**Online Validators**:

- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://technicalseo.com/tools/sitemap-validator/

**Manual Check**:

```bash
# Verify XML is valid
xmllint --noout dist/sitemap-index.xml

# Count URLs in each chunk
grep -o '<url>' dist/sitemap-1.xml | wc -l  # Should be 50
grep -o '<url>' dist/sitemap-2.xml | wc -l  # Should be 50
grep -o '<url>' dist/sitemap-3.xml | wc -l  # Should be 13
```

### Test Accessibility

After deployment, verify sitemaps are accessible:

```bash
# Test sitemap index
curl -I https://www.elevateforhumanity.org/sitemap-index.xml

# Test individual sitemaps
curl -I https://www.elevateforhumanity.org/sitemap-1.xml
curl -I https://www.elevateforhumanity.org/sitemap-2.xml
curl -I https://www.elevateforhumanity.org/sitemap-3.xml

# Test robots.txt
curl https://www.elevateforhumanity.org/robots.txt
```

All should return `200 OK` status.

## Monitoring

### Google Search Console

Monitor sitemap status:

1. Check "Coverage" report for indexing issues
2. Review "Sitemaps" section for errors
3. Monitor "Discovered URLs" count

### Expected Metrics

- **Submitted**: 113 URLs
- **Indexed**: Should gradually increase
- **Errors**: Should be 0

### Common Issues

**Issue**: "Couldn't fetch sitemap"

- **Solution**: Verify sitemap is accessible via URL
- **Check**: Netlify deployment completed successfully

**Issue**: "Sitemap is HTML"

- **Solution**: Ensure XML content-type header
- **Check**: File extension is .xml

**Issue**: "URLs not indexed"

- **Solution**: Wait 1-2 weeks for crawling
- **Check**: Pages are not blocked by robots.txt

## Best Practices

### ✅ Do

- Submit sitemap-index.xml to search engines
- Keep individual sitemaps under 50 URLs
- Update sitemaps on every deployment
- Monitor indexing status regularly
- Include all public pages

### ❌ Don't

- Submit protected/private pages
- Include dynamic parameters in URLs
- Exceed 50,000 URLs per sitemap
- Forget to update after adding new pages
- Block sitemaps in robots.txt

## Resubmission

Sitemaps are automatically updated on each build. After deployment:

1. **Automatic**: Search engines will re-crawl based on robots.txt
2. **Manual**: Resubmit in Search Console if urgent
3. **Frequency**: Weekly crawls are typical

## Troubleshooting

### Sitemap Not Found (404)

**Check**:

```bash
ls -la dist/sitemap*.xml
```

**Fix**: Run build process

```bash
pnpm build
```

### URLs Not Chunked Properly

**Check**:

```bash
grep -o '<url>' dist/sitemap-1.xml | wc -l
```

**Fix**: Verify split-sitemap.mjs script runs in postbuild

### Robots.txt Not Updated

**Check**:

```bash
cat dist/robots.txt
```

**Fix**: Ensure split-sitemap.mjs updates robots.txt

## Additional Resources

- [Google Sitemap Guidelines](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Bing Sitemap Guidelines](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)

## Submission Checklist

- [ ] Verify all sitemap files exist in dist/
- [ ] Confirm sitemaps are chunked (≤50 URLs each)
- [ ] Check sitemap-index.xml references all chunks
- [ ] Verify robots.txt references sitemap-index.xml
- [ ] Deploy to production
- [ ] Test sitemap URLs are accessible
- [ ] Submit sitemap-index.xml to Google Search Console
- [ ] Submit sitemap-index.xml to Bing Webmaster Tools
- [ ] Monitor indexing status after 24-48 hours

---

**Last Updated**: 2025-10-26  
**Status**: ✅ Ready for Submission
